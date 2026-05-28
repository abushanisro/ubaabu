"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export type PartType =
  | "bracket"
  | "shaft"
  | "housing"
  | "valve"
  | "flange"
  | "fitting"
  | "connector"
  | "blade"
  | "assembly";

interface Props {
  part: PartType;
  className?: string;
}

// Shared teal metallic material factory
function mkMetal(hex: number, emissive = 0x48d2be, emissiveIntensity = 0.14) {
  return new THREE.MeshStandardMaterial({
    color: hex,
    metalness: 0.88,
    roughness: 0.12,
    emissive: emissive,
    emissiveIntensity,
  });
}

function buildBracket(group: THREE.Group) {
  const mat = mkMetal(0x2a3a3a);
  const matLight = mkMetal(0x3d5252, 0x48d2be, 0.22);

  // Vertical leg
  const v = new THREE.Mesh(new THREE.BoxGeometry(0.28, 2.2, 0.28), mat);
  v.position.set(-0.8, 0, 0);
  group.add(v);

  // Horizontal leg
  const h = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.28, 0.28), matLight);
  h.position.set(0, -0.96, 0);
  group.add(h);

  // Gusset
  const gusset = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.9, 0.24), mat);
  gusset.position.set(-0.49, -0.51, 0);
  gusset.rotation.z = Math.PI / 4;
  group.add(gusset);

  // Bolt holes (cylinders punched through)
  const boltMat = mkMetal(0x1a2828);
  [[-0.8, 0.7], [-0.8, -0.2], [0.4, -0.96], [0.9, -0.96]].forEach(([x, y]) => {
    const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.35, 16), boltMat);
    bolt.rotation.z = Math.PI / 2;
    bolt.position.set(x, y, 0);
    group.add(bolt);
  });
}

function buildShaft(group: THREE.Group) {
  const mat = mkMetal(0x2e4040);
  const matFlange = mkMetal(0x3d5555, 0x48d2be, 0.25);

  // Main shaft body
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 3.0, 48), mat);
  group.add(shaft);

  // Flanges
  [-1.2, 1.2].forEach((y) => {
    const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.22, 48), matFlange);
    flange.position.y = y;
    group.add(flange);
    // Bolt holes in flange
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.25, 12), mkMetal(0x1a2828));
      hole.position.set(Math.sin(angle) * 0.52, y, Math.cos(angle) * 0.52);
      group.add(hole);
    }
  });

  // Keyway slot (flat on shaft)
  const key = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.8, 0.12), mkMetal(0x1a2828));
  key.position.set(0.3, 0, 0);
  group.add(key);
}

function buildHousing(group: THREE.Group) {
  const mat = mkMetal(0x263535);
  const matAccent = mkMetal(0x3d5555, 0x48d2be, 0.28);

  // Main box body
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.6, 1.4), mat);
  group.add(body);

  // Top cover with different color
  const cover = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.18, 1.4), matAccent);
  cover.position.y = 0.89;
  group.add(cover);

  // Central bore
  const bore = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 1.5, 40), mkMetal(0x1a2828));
  bore.rotation.z = Math.PI / 2;
  group.add(bore);

  // Corner bolts
  [[-0.95, 0.68, 0.5], [0.95, 0.68, 0.5], [-0.95, 0.68, -0.5], [0.95, 0.68, -0.5]].forEach(([x, y, z]) => {
    const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.28, 12), mkMetal(0x4d6666, 0x48d2be, 0.3));
    bolt.position.set(x, y, z);
    group.add(bolt);
  });

  // Port stubs
  [-0.6, 0.6].forEach((z) => {
    const port = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.5, 32), matAccent);
    port.rotation.z = Math.PI / 2;
    port.position.set(-1.45, 0, z);
    group.add(port);
  });
}

function buildValve(group: THREE.Group) {
  const mat = mkMetal(0x2a3d3d);
  const matAccent = mkMetal(0x3f5858, 0x48d2be, 0.28);

  // Body cylinder
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.8, 48), mat);
  group.add(body);

  // Bonnet (dome top)
  const bonnet = new THREE.Mesh(new THREE.SphereGeometry(0.56, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2), matAccent);
  bonnet.position.y = 0.9;
  group.add(bonnet);

  // Stem
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.8, 24), matAccent);
  stem.position.y = 1.5;
  group.add(stem);

  // Handwheel
  const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.055, 12, 48), mkMetal(0x4d6666, 0x48d2be, 0.35));
  wheel.position.y = 2.0;
  group.add(wheel);
  // Spokes
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI;
    const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.9, 8), matAccent);
    spoke.rotation.z = angle;
    spoke.position.y = 2.0;
    group.add(spoke);
  }

  // Inlet/outlet ports
  [Math.PI / 2, -Math.PI / 2].forEach((angle) => {
    const port = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.6, 32), mat);
    port.rotation.z = Math.PI / 2;
    port.position.set(Math.cos(angle) * 0.95, -0.4, 0);
    group.add(port);
    // Flange on port
    const pFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32), matAccent);
    pFlange.rotation.z = Math.PI / 2;
    pFlange.position.set(Math.cos(angle) * 1.3, -0.4, 0);
    group.add(pFlange);
  });
}

function buildFlange(group: THREE.Group) {
  const mat = mkMetal(0x2e4444);
  const matBolt = mkMetal(0x4d6868, 0x48d2be, 0.3);

  // Main flange disk
  const disk = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.28, 64), mat);
  group.add(disk);

  // Center hub
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.6, 40), mkMetal(0x3a5555, 0x48d2be, 0.22));
  group.add(hub);

  // Center bore
  const bore = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.7, 32), mkMetal(0x1a2828));
  group.add(bore);

  // Bolt holes (8)
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const bx = Math.sin(angle) * 0.78;
    const bz = Math.cos(angle) * 0.78;
    const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.35, 12), matBolt);
    bolt.position.set(bx, 0, bz);
    group.add(bolt);
  }

  // Relief grooves (thin torus rings)
  [0.55, 0.92].forEach((r) => {
    const groove = new THREE.Mesh(new THREE.TorusGeometry(r, 0.018, 10, 64), mkMetal(0x1e3232));
    groove.rotation.x = Math.PI / 2;
    group.add(groove);
  });
}

function buildFitting(group: THREE.Group) {
  const mat = mkMetal(0x2a3d3d);
  const matAccent = mkMetal(0x3f5858, 0x48d2be, 0.28);

  // Elbow tube via QuadraticBezierCurve3
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, -1.1, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1.1, 0, 0),
  );
  const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.24, 16, false);
  const elbow = new THREE.Mesh(tubeGeo, mat);
  group.add(elbow);

  // End flanges
  [
    { pos: new THREE.Vector3(0, -1.1, 0), rot: [0, 0, 0] },
    { pos: new THREE.Vector3(1.1, 0, 0), rot: [0, 0, Math.PI / 2] },
  ].forEach(({ pos, rot }) => {
    const f = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32), matAccent);
    f.position.copy(pos);
    f.rotation.set(...(rot as [number, number, number]));
    group.add(f);
    // Bolt holes on flange
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.14, 8), mkMetal(0x4d6666, 0x48d2be, 0.3));
      bolt.position.copy(pos).addScaledVector(new THREE.Vector3(Math.sin(a), 0, Math.cos(a)), 0.28);
      bolt.rotation.set(...(rot as [number, number, number]));
      group.add(bolt);
    }
  });
}

function buildConnector(group: THREE.Group) {
  const mat = mkMetal(0x263535);
  const matPin = mkMetal(0x4a6464, 0x48d2be, 0.35);

  // Housing block
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 0.85), mat);
  group.add(body);

  // Pin rows (2×3)
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.45, 12), matPin);
      pin.position.set(-0.48 + col * 0.48, 0, row === 0 ? 0.25 : -0.25);
      group.add(pin);
      // Pin tip sphere
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), matPin);
      tip.position.set(-0.48 + col * 0.48, 0.28, row === 0 ? 0.25 : -0.25);
      group.add(tip);
    }
  }

  // Locking tab
  const tab = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.14, 0.85), mkMetal(0x3a5050, 0x48d2be, 0.25));
  tab.position.set(0.9, 0, 0);
  group.add(tab);

  // Cable entry
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 0.4, 24), mat);
  cable.rotation.z = Math.PI / 2;
  cable.position.set(-1.0, 0, 0);
  group.add(cable);
}

function buildBlade(group: THREE.Group) {
  const matMid = mkMetal(0x2e4444);
  const matEdge = mkMetal(0x4d6868, 0x48d2be, 0.3);

  // Main airfoil (same vertex deformation as TurbineModel)
  const geo = new THREE.BoxGeometry(0.18, 2.4, 0.38);
  const pos = geo.attributes.position;
  for (let v = 0; v < pos.count; v++) {
    const y = pos.getY(v);
    const t = 0.28 + ((y + 1.2) / 2.4) * 0.72;
    pos.setX(v, pos.getX(v) * t);
    pos.setZ(v, pos.getZ(v) * t);
  }
  geo.computeVertexNormals();
  const blade = new THREE.Mesh(geo, matMid);
  blade.rotation.y = 0.25;
  blade.position.y = 0.6;
  group.add(blade);

  // Leading edge
  const le = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.018, 2.4, 10), matEdge);
  le.position.set(-0.1, 0.6, 0);
  group.add(le);

  // Root platform
  const root = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.22, 0.55), matEdge);
  root.position.y = -0.62;
  group.add(root);

  // Dovetail root
  const dt = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.44, 0.52), matMid);
  dt.position.y = -1.0;
  group.add(dt);

  // Tip shroud
  const tip = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.4), matEdge);
  tip.position.y = 1.82;
  group.add(tip);
}

function buildAssembly(group: THREE.Group) {
  // Bracket (offset left)
  const bGroup = new THREE.Group();
  buildBracket(bGroup);
  bGroup.scale.setScalar(0.65);
  bGroup.position.set(-0.7, 0, 0);
  group.add(bGroup);

  // Shaft (offset right + rotated)
  const sGroup = new THREE.Group();
  buildShaft(sGroup);
  sGroup.scale.setScalar(0.48);
  sGroup.rotation.z = Math.PI / 2;
  sGroup.position.set(0.9, 0.1, 0);
  group.add(sGroup);
}

function buildPart(partType: PartType, group: THREE.Group) {
  switch (partType) {
    case "bracket":  return buildBracket(group);
    case "shaft":    return buildShaft(group);
    case "housing":  return buildHousing(group);
    case "valve":    return buildValve(group);
    case "flange":   return buildFlange(group);
    case "fitting":  return buildFitting(group);
    case "connector":return buildConnector(group);
    case "blade":    return buildBlade(group);
    case "assembly": return buildAssembly(group);
  }
}

export default function CncPartViewer({ part, className = "" }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let mounted = true;
    let rafId: number;

    const w = mount.clientWidth || 300;
    const h = mount.clientHeight || 220;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.set(0, 1.2, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    mount.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { position: "absolute", inset: "0", width: "100%", height: "100%" });

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xfff8f0, 3.5);
    key.position.set(4, 6, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x48d2be, 1.2);
    rim.position.set(-5, 2, -3);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0x8899ff, 0.4);
    fill.position.set(0, -4, 3);
    scene.add(fill);
    const tealPoint = new THREE.PointLight(0x48d2be, 0.8, 12);
    tealPoint.position.set(0, 2, 2);
    scene.add(tealPoint);

    // Build part
    const group = new THREE.Group();
    buildPart(part, group);
    scene.add(group);

    // Auto-rotate
    let t = 0;
    const tick = () => {
      if (!mounted) return;
      rafId = requestAnimationFrame(tick);
      t += 0.006;
      group.rotation.y = t;
      group.rotation.x = 0.18 + Math.sin(t * 0.4) * 0.06;
      // Subtle teal pulse on point light
      tealPoint.intensity = 0.7 + Math.sin(t * 1.5) * 0.2;
      renderer.render(scene, camera);
    };
    tick();

    // Resize
    const ro = new ResizeObserver(() => {
      if (!mount || !mounted) return;
      const rw = mount.clientWidth;
      const rh = mount.clientHeight;
      camera.aspect = rw / rh;
      camera.updateProjectionMatrix();
      renderer.setSize(rw, rh);
    });
    ro.observe(mount);

    return () => {
      mounted = false;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [part]);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ position: "relative", width: "100%", height: "100%", background: "transparent" }}
    />
  );
}
