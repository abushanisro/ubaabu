'use client'

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { time: "pre-dawn" | "sunrise" | "daytime" | "dusk" | "sunset" | "night"; playing: boolean };

// Color palette per time of day for the globe + arcs
const PALETTE: Record<Props["time"], { dots: string; arcs: string[]; glow: string }> = {
  "pre-dawn": { dots: "#7aa5ff", arcs: ["#9bb8ff", "#c9b6ff", "#6e8cff"], glow: "#3050a0" },
  sunrise:   { dots: "#ffb37a", arcs: ["#ffd29b", "#ff8b6e", "#ffd86e"], glow: "#ff8a3d" },
  daytime:   { dots: "#1f3a66", arcs: ["#2a5fb8", "#3b8acb", "#1f3a66"], glow: "#5aa0ff" },
  dusk:      { dots: "#ffaecf", arcs: ["#ff9bd0", "#a87dff", "#ffb37a"], glow: "#c46cff" },
  sunset:    { dots: "#ff8b6e", arcs: ["#ff7a4f", "#ffb37a", "#a87dff"], glow: "#ff5e3a" },
  night:     { dots: "#9fc8ff", arcs: ["#7df0d1", "#7aa5ff", "#c9b6ff"], glow: "#3a6cff" },
};

// Convert lat/lng (degrees) to point on sphere radius r
function latLngToVec3(lat: number, lng: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

// Build a fibonacci-sphere dot pattern (continents-like density via mask)
function buildDots(count: number, r: number) {
  const positions: number[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    // simple "land" mask — pseudo-noise to thin out for ocean look
    const n = Math.sin(x * 5.3) * Math.cos(z * 4.1) + Math.sin(y * 6.7);
    if (n > -0.2) positions.push(x * r, y * r, z * r);
  }
  return new Float32Array(positions);
}

// City coords for arc endpoints
const CITIES: [number, number][] = [
  [40.7, -74.0],   // NYC
  [51.5, -0.1],    // London
  [35.7, 139.7],   // Tokyo
  [1.35, 103.8],   // Singapore
  [-33.9, 151.2],  // Sydney
  [19.0, 72.8],    // Mumbai
  [52.5, 13.4],    // Berlin
  [-23.5, -46.6],  // São Paulo
  [37.7, -122.4],  // SF
  [25.2, 55.3],    // Dubai
  [-1.3, 36.8],    // Nairobi
  [55.7, 37.6],    // Moscow
  [22.3, 114.2],   // Hong Kong
  [48.8, 2.3],     // Paris
  [-34.6, -58.4],  // Buenos Aires
];

function makeArcCurve(a: THREE.Vector3, b: THREE.Vector3) {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const dist = a.distanceTo(b);
  mid.normalize().multiplyScalar(a.length() + Math.min(1.4, dist * 0.55));
  return new THREE.QuadraticBezierCurve3(a, mid, b);
}

export function DataVizGlobe({ time, playing }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(playing);
  const timeRef = useRef(time);

  useEffect(() => { playingRef.current = playing; }, [playing]);
  useEffect(() => { timeRef.current = time; }, [time]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    camera.position.set(0, 0.4, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Dot sphere
    const R = 2.2;
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(buildDots(3500, R), 3));
    const dotMat = new THREE.PointsMaterial({
      size: 0.025,
      color: new THREE.Color(PALETTE[time].dots),
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dots);

    // Soft outer halo
    const haloGeo = new THREE.SphereGeometry(R * 1.08, 48, 48);
    const haloMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: { uColor: { value: new THREE.Color(PALETTE[time].glow) } },
      vertexShader: `
        varying vec3 vN; varying vec3 vP;
        void main() { vN = normalize(normalMatrix * normal); vec4 p = modelViewMatrix * vec4(position,1.0); vP = p.xyz; gl_Position = projectionMatrix * p; }
      `,
      fragmentShader: `
        uniform vec3 uColor; varying vec3 vN; varying vec3 vP;
        void main() {
          float rim = pow(1.0 - abs(dot(normalize(vN), normalize(-vP))), 2.5);
          gl_FragColor = vec4(uColor, rim * 0.55);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    globeGroup.add(new THREE.Mesh(haloGeo, haloMat));

    // Arcs
    type Arc = {
      curve: THREE.QuadraticBezierCurve3;
      line: THREE.Line;
      head: THREE.Mesh;
      mat: THREE.LineBasicMaterial;
      headMat: THREE.MeshBasicMaterial;
      progress: number;
      speed: number;
      color: THREE.Color;
    };
    const arcs: Arc[] = [];
    const ARC_COUNT = 14;

    const palette = PALETTE[time];
    for (let i = 0; i < ARC_COUNT; i++) {
      const a = CITIES[Math.floor(Math.random() * CITIES.length)];
      let b = CITIES[Math.floor(Math.random() * CITIES.length)];
      while (b === a) b = CITIES[Math.floor(Math.random() * CITIES.length)];

      const vA = latLngToVec3(a[0], a[1], R);
      const vB = latLngToVec3(b[0], b[1], R);
      const curve = makeArcCurve(vA, vB);
      const pts = curve.getPoints(64);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const color = new THREE.Color(palette.arcs[i % palette.arcs.length]);
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.0 });
      const line = new THREE.Line(geo, mat);
      globeGroup.add(line);

      const headGeo = new THREE.SphereGeometry(0.035, 12, 12);
      const headMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0 });
      const head = new THREE.Mesh(headGeo, headMat);
      globeGroup.add(head);

      arcs.push({
        curve, line, head, mat, headMat, color,
        progress: Math.random(),
        speed: 0.0035 + Math.random() * 0.005,
      });
    }

    // Resize
    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      camera.aspect = nw / nh; camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    // Animate
    let raf = 0;
    const tick = () => {
      if (playingRef.current) {
        globeGroup.rotation.y += 0.0018;
        globeGroup.rotation.x = Math.sin(Date.now() * 0.00015) * 0.08;
      }

      // update colors when time changes
      const pal = PALETTE[timeRef.current];
      dotMat.color.lerp(new THREE.Color(pal.dots), 0.04);
      (haloMat.uniforms.uColor.value as THREE.Color).lerp(new THREE.Color(pal.glow), 0.04);

      arcs.forEach((a, i) => {
        if (playingRef.current) a.progress += a.speed;
        if (a.progress >= 1.2) {
          // recycle arc
          const c1 = CITIES[Math.floor(Math.random() * CITIES.length)];
          let c2 = CITIES[Math.floor(Math.random() * CITIES.length)];
          while (c2 === c1) c2 = CITIES[Math.floor(Math.random() * CITIES.length)];
          const vA = latLngToVec3(c1[0], c1[1], R);
          const vB = latLngToVec3(c2[0], c2[1], R);
          a.curve = makeArcCurve(vA, vB);
          const pts = a.curve.getPoints(64);
          a.line.geometry.dispose();
          a.line.geometry = new THREE.BufferGeometry().setFromPoints(pts);
          a.progress = 0;
          const newColor = new THREE.Color(pal.arcs[i % pal.arcs.length]);
          a.mat.color.copy(newColor);
          a.headMat.color.copy(newColor);
        }
        // draw range
        const p = Math.min(1, Math.max(0, a.progress));
        const drawCount = Math.floor(p * 64);
        a.line.geometry.setDrawRange(0, drawCount);
        // fade in then out
        const fadeIn = Math.min(1, p * 4);
        const fadeOut = a.progress > 1 ? Math.max(0, 1 - (a.progress - 1) * 5) : 1;
        a.mat.opacity = 0.9 * fadeIn * fadeOut;
        a.headMat.opacity = fadeIn * fadeOut;
        // head position
        const headPos = a.curve.getPoint(p);
        a.head.position.copy(headPos);
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      dotGeo.dispose(); dotMat.dispose();
      haloGeo.dispose(); haloMat.dispose();
      arcs.forEach((a) => { a.line.geometry.dispose(); a.mat.dispose(); a.head.geometry.dispose(); a.headMat.dispose(); });
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
