"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TurbineModel({ stage = 0, bgLight = false }) {
  const mountRef = useRef(null);
  const stateRef = useRef({
    scene: null,
    renderer: null,
    camera: null,
    frame: null,
    mainGroup: null,
    parts: [],
    blades: [],
    mouse: { x: 0, y: 0 },
    targetRotY: 0,
    targetRotX: 0.25,
    time: 0,
    stage: 0,
    explodeProgress: 0,
    wireMode: false,
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const S = stateRef.current;

    // -- SCENE --------------------------------
    const scene = new THREE.Scene();
    S.scene = scene;

    const w = mount.clientWidth;
    const h = mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 0, 8);
    S.camera = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    S.renderer = renderer;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";

    // -- LIGHTS -------------------------------
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const key = new THREE.DirectionalLight(0xfff8f0, 4);
    key.position.set(5, 8, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 1.5);
    rim.position.set(-6, 2, -4);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0x8899ff, 0.5);
    fill.position.set(0, -5, 3);
    scene.add(fill);
    const glow = new THREE.PointLight(0xff5500, 1.2, 10);
    glow.position.set(0, 0, 1);
    scene.add(glow);
    S.glowLight = glow;

    // -- MATERIALS ----------------------------
    const mkMetal = (color, metalness = 0.92, roughness = 0.18) =>
      new THREE.MeshStandardMaterial({ color, metalness, roughness });

    const matDark = mkMetal(0x181818);
    const matMid = mkMetal(0x282828, 0.88, 0.22);
    const matEdge = mkMetal(0x505050, 0.98, 0.06);
    const matGlow = new THREE.MeshStandardMaterial({
      color: 0xff4400,
      emissive: 0xff2200,
      emissiveIntensity: 0.5,
      metalness: 0.2,
      roughness: 0.7,
    });
    const matWire = new THREE.MeshBasicMaterial({
      color: 0x444444,
      wireframe: true,
    });
    const matWireLight = new THREE.MeshBasicMaterial({
      color: 0x888888,
      wireframe: true,
    });

    S.matGlow = matGlow;

    // -- GROUP --------------------------------
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    S.mainGroup = mainGroup;

    // Helper to register a mesh as a part
    const parts = [];
    const blades = [];
    const reg = (mesh, pos, explodeDir) => {
      mesh.userData.origPos = pos.clone();
      mesh.userData.explodeDir = explodeDir
        ? explodeDir.clone().normalize()
        : pos.clone().normalize();
      mesh.userData.origMats = [];
      const collect = (m) => {
        if (m.isMesh) {
          mesh.userData.origMats.push({ mesh: m, mat: m.material });
        }
        m.children.forEach(collect);
      };
      collect(mesh);
      parts.push(mesh);
      mainGroup.add(mesh);
      return mesh;
    };

    // -- HUB DISK -----------------------------
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 0.95, 0.28, 80),
      matDark,
    );
    hub.rotation.x = Math.PI / 2;
    reg(hub, new THREE.Vector3(0, 0, 0));

    // Hub rings
    [0.38, 0.55, 0.7, 0.82].forEach((r, i) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.022, 14, 100),
        i % 2 === 0 ? matEdge : matMid,
      );
      ring.position.z = 0.14;
      reg(ring, new THREE.Vector3(0, 0, 0.14));
    });

    // Center bore
    const bore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 0.4, 40),
      matEdge,
    );
    bore.rotation.x = Math.PI / 2;
    reg(bore, new THREE.Vector3(0, 0, 0));

    // Nose cone
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.55, 40), matDark);
    cone.rotation.x = -Math.PI / 2;
    cone.position.z = 0.48;
    reg(cone, new THREE.Vector3(0, 0, 0.48), new THREE.Vector3(0, 0, 1));

    // -- BLADES -------------------------------
    const BLADES = 12;
    for (let i = 0; i < BLADES; i++) {
      const angle = (i / BLADES) * Math.PI * 2;
      const g = new THREE.Group();

      // Main airfoil
      const geo = new THREE.BoxGeometry(0.07, 1.15, 0.16);
      const posA = geo.attributes.position;
      for (let v = 0; v < posA.count; v++) {
        const y = posA.getY(v);
        const t = 0.28 + ((y + 0.575) / 1.15) * 0.72;
        posA.setX(v, posA.getX(v) * t);
        posA.setZ(v, posA.getZ(v) * t);
      }
      geo.computeVertexNormals();
      const blade = new THREE.Mesh(geo, matMid);
      blade.position.y = 0.62;
      blade.rotation.y = 0.28;
      blade.rotation.z = 0.07;

      // Leading edge
      const le = new THREE.Mesh(
        new THREE.CylinderGeometry(0.013, 0.007, 1.15, 8),
        matEdge,
      );
      le.position.set(-0.042, 0.62, 0);

      // Root fillet
      const fillet = new THREE.Mesh(
        new THREE.CylinderGeometry(0.13, 0.15, 0.13, 32),
        matDark,
      );
      fillet.rotation.x = Math.PI / 2;
      fillet.position.y = 0.09;

      // Tip
      const tip = new THREE.Mesh(
        new THREE.SphereGeometry(0.042, 10, 10),
        matEdge,
      );
      tip.position.y = 1.22;

      g.add(blade, le, fillet, tip);
      g.rotation.z = angle;
      g.rotation.x = 0.14;

      const bx = Math.sin(angle) * 0.94;
      const by = Math.cos(angle) * 0.94 * 0.15;
      const bPos = new THREE.Vector3(bx, by, 0);
      g.userData.origPos = bPos.clone();
      g.userData.explodeDir = new THREE.Vector3(
        Math.sin(angle) * 0.8,
        0,
        Math.cos(angle) * 0.6 + 0.4,
      ).normalize();
      g.userData.origMats = [];
      const collectBlade = (m) => {
        if (m.isMesh) g.userData.origMats.push({ mesh: m, mat: m.material });
        m.children.forEach(collectBlade);
      };
      collectBlade(g);

      parts.push(g);
      blades.push(g);
      mainGroup.add(g);
    }

    // -- SHROUD RING --------------------------
    const shroud = new THREE.Mesh(
      new THREE.TorusGeometry(1.82, 0.075, 28, 160),
      matEdge,
    );
    reg(shroud, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0.3));

    const shroudBand = new THREE.Mesh(
      new THREE.TorusGeometry(1.82, 0.03, 14, 160),
      matMid,
    );
    shroudBand.position.z = 0.07;
    reg(shroudBand, new THREE.Vector3(0, 0, 0.07));

    // -- GLOW RING ----------------------------
    const glowRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.95, 0.065, 20, 80),
      matGlow,
    );
    glowRing.userData.isGlow = true;
    reg(glowRing, new THREE.Vector3(0, 0, 0));

    // -- BOLTS --------------------------------
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const bx = Math.sin(a) * 0.56;
      const by = Math.cos(a) * 0.56;
      const bolt = new THREE.Mesh(
        new THREE.CylinderGeometry(0.038, 0.038, 0.09, 16),
        matEdge,
      );
      bolt.rotation.x = Math.PI / 2;
      bolt.position.set(bx, by, 0.17);
      reg(bolt, new THREE.Vector3(bx, by, 0.17));
    }

    S.parts = parts;
    S.blades = blades;
    S.matWire = matWire;
    S.matWireLight = matWireLight;
    S.matEdge = matEdge;
    S.matMid = matMid;
    S.matDark = matDark;
    S.matGlow = matGlow;

    // Initial rotation
    mainGroup.rotation.x = 0.25;
    mainGroup.rotation.y = 0.4;

    // -- LABEL LINES (for teardown stage) ------
    const labelLines = [];
    const labelData = [
      {
        from: new THREE.Vector3(0, 0, 0.48),
        to: new THREE.Vector3(3.5, 2.5, 0.5),
        text: "NOSE CONE",
      },
      {
        from: new THREE.Vector3(1.82, 0, 0),
        to: new THREE.Vector3(3.5, 0.5, 0),
        text: "SHROUD RING",
      },
      {
        from: new THREE.Vector3(0.95, 0, 0),
        to: new THREE.Vector3(3.5, -0.8, 0),
        text: "GLOW RING",
      },
      {
        from: new THREE.Vector3(-1.0, 0.8, 0),
        to: new THREE.Vector3(-3.5, 2.0, 0),
        text: "TURBINE BLADE",
      },
      {
        from: new THREE.Vector3(0, 0, 0),
        to: new THREE.Vector3(-3.5, -1.5, 0),
        text: "HUB DISK",
      },
    ];
    labelData.forEach((ld) => {
      const points = [ld.from, ld.to];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x444444,
        transparent: true,
        opacity: 0,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      line.userData.labelText = ld.text;
      line.userData.labelPos = ld.to;
      labelLines.push(line);
      scene.add(line);
    });
    S.labelLines = labelLines;

    // -- MOUSE --------------------------------
    const onMouse = (e) => {
      S.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      S.mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    // -- RESIZE -------------------------------
    const onResize = () => {
      const rw = mount.clientWidth;
      const rh = mount.clientHeight;
      camera.aspect = rw / rh;
      camera.updateProjectionMatrix();
      renderer.setSize(rw, rh);
    };
    window.addEventListener("resize", onResize);

    // -- RENDER LOOP --------------------------
    const tick = () => {
      S.frame = requestAnimationFrame(tick);
      S.time += 0.012;

      // Mouse parallax
      S.targetRotY += (S.mouse.x * 0.35 - S.targetRotY) * 0.04;
      S.targetRotX += (-S.mouse.y * 0.18 + 0.25 - S.targetRotX) * 0.04;
      mainGroup.rotation.y = S.targetRotY;
      mainGroup.rotation.x = S.targetRotX;

      // Slow spin
      mainGroup.rotation.z += 0.003;

      // Glow pulse
      if (S.matGlow) {
        S.matGlow.emissiveIntensity = 0.35 + Math.sin(S.time * 2.2) * 0.18;
      }
      if (S.glowLight) {
        S.glowLight.intensity = 0.9 + Math.sin(S.time * 1.8) * 0.35;
      }

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(S.frame);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
    };
  }, []);

  // -- STAGE CHANGES -------------------------
  useEffect(() => {
    const S = stateRef.current;
    if (!S.mainGroup || !S.parts.length) return;

    const parts = S.parts;
    const matWire = S.matWire;
    const matWireLight = S.matWireLight;

    // Restore all original materials first
    const restoreMats = () => {
      parts.forEach((p) => {
        if (p.userData.origMats) {
          p.userData.origMats.forEach(({ mesh, mat }) => {
            mesh.material = mat;
          });
        }
      });
    };

    // Restore all positions
    const restorePositions = () => {
      parts.forEach((p) => {
        if (p.userData.origPos) {
          p.position.copy(p.userData.origPos);
        } else {
          p.position.set(0, 0, 0);
        }
      });
    };

    // Hide label lines
    const hideLabels = () => {
      if (S.labelLines) {
        S.labelLines.forEach((l) => {
          l.material.opacity = 0;
        });
      }
    };

    // Show label lines
    const showLabels = () => {
      if (S.labelLines) {
        S.labelLines.forEach((l) => {
          l.material.opacity = 0.6;
        });
      }
    };

    if (stage === 0) {
      // ASSEMBLED - full detail, dark
      restoreMats();
      restorePositions();
      hideLabels();
      S.mainGroup.rotation.x = 0.25;
    } else if (stage === 1) {
      // ROTATE - tilt forward, show blade detail
      restoreMats();
      restorePositions();
      hideLabels();
      S.targetRotX = -0.4;
    } else if (stage === 2) {
      // EXPLODE - parts fly outward
      restoreMats();
      hideLabels();
      parts.forEach((p) => {
        if (p.userData.explodeDir) {
          const orig = p.userData.origPos || new THREE.Vector3();
          p.position.copy(orig).addScaledVector(p.userData.explodeDir, 2.2);
        }
      });
      // Show label lines after explode
      setTimeout(showLabels, 400);
    } else if (stage === 3) {
      // WIREFRAME - technical blueprint
      restorePositions();
      hideLabels();
      const wm = bgLight ? matWireLight : matWire;
      parts.forEach((p) => {
        if (p.userData.origMats) {
          p.userData.origMats.forEach(({ mesh }) => {
            mesh.material = wm;
          });
        }
      });
      showLabels();
    } else if (stage === 4) {
      // REASSEMBLE - back to full detail
      restoreMats();
      restorePositions();
      hideLabels();
      S.targetRotX = 0.25;
    }
  }, [stage, bgLight]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "transparent",
      }}
    />
  );
}
