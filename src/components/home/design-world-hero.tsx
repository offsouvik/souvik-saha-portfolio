"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const MODEL_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260929_212926_92423081-b0e4-4f5a-b650-14af6c05c058.glb";

export function DesignWorldHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [activeDot, setActiveDot] = useState(1);
  const spinActionRef = useRef<((delta: number) => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId = 0;
    let isDisposed = false;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });
    renderer.setClearColor(0x000000, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    // Camera
    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    // 2D Offscreen Background Canvas
    const bgCanvas = document.createElement("canvas");
    const bgCtx = bgCanvas.getContext("2d")!;
    const bgTexture = new THREE.CanvasTexture(bgCanvas);
    bgTexture.colorSpace = THREE.SRGBColorSpace;
    bgTexture.minFilter = THREE.LinearFilter;
    bgTexture.magFilter = THREE.LinearFilter;
    bgTexture.generateMipmaps = false;

    function renderBackgroundCanvas(W: number, H: number, currentDpr: number) {
      bgCanvas.width = Math.floor(W * currentDpr);
      bgCanvas.height = Math.floor(H * currentDpr);

      bgCtx.save();
      bgCtx.scale(currentDpr, currentDpr);
      bgCtx.fillStyle = "#000000";
      bgCtx.fillRect(0, 0, W, H);

      const mobile = W < 768 || W / H < 1;
      let fs = Math.min(H * 0.21, W * (mobile ? 0.21 : 0.118));
      bgCtx.font = `800 ${fs}px Poppins`;

      const lines = ["Explore", "New", "Ideas"];
      let maxLineWidth = 0;
      for (const line of lines) {
        const m = bgCtx.measureText(line).width;
        if (m > maxLineWidth) maxLineWidth = m;
      }

      const maxAllowedWidth = W * (mobile ? 0.9 : 0.5);
      if (maxLineWidth > maxAllowedWidth && maxLineWidth > 0) {
        fs = fs * (maxAllowedWidth / maxLineWidth);
        bgCtx.font = `800 ${fs}px Poppins`;
      }

      bgCtx.fillStyle = "#e9e9e9";
      bgCtx.textAlign = "center";
      bgCtx.textBaseline = "alphabetic";

      const cx = W * (mobile ? 0.5 : 0.505);
      const cy = H * (mobile ? 0.45 : 0.468);
      const gap = fs * 1.07;
      const cap = fs * 0.7;

      for (let i = 0; i < 3; i++) {
        const lineY = cy + cap / 2 + (i - 1) * gap;
        bgCtx.fillText(lines[i], cx, lineY);
      }

      bgCtx.restore();
      bgTexture.needsUpdate = true;
    }

    // Background Scene with Fullscreen Quad
    const bgScene = new THREE.Scene();
    const bgQuadGeo = new THREE.PlaneGeometry(2, 2);
    const bgQuadMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        #include <common>
        uniform sampler2D uTex;
        varying vec2 vUv;
        void main() {
          gl_FragColor = texture2D(uTex, vUv);
          #include <colorspace_fragment>
        }
      `,
      uniforms: {
        uTex: { value: bgTexture },
      },
      depthTest: false,
      depthWrite: false,
    });
    const bgQuad = new THREE.Mesh(bgQuadGeo, bgQuadMat);
    bgQuad.frustumCulled = false;
    bgScene.add(bgQuad);

    // 3D Scene Graph
    const scene = new THREE.Scene();
    const pivot = new THREE.Group();
    scene.add(pivot);

    const spinner = new THREE.Group();
    pivot.add(spinner);
    spinner.rotation.set(-0.42, 0.62, 0.18);

    let cubeMesh: THREE.Mesh | null = null;

    // Glass Shaders
    const glassVertexShader = `
      varying vec3 vNormal;
      varying vec3 vEye;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vec4 mvPos = viewMatrix * worldPos;
        gl_Position = projectionMatrix * mvPos;
        vNormal = normalize(normalMatrix * normal);
        vEye = normalize(mvPos.xyz);
      }
    `;

    const glassFragmentShader = `
      #include <common>
      uniform sampler2D uTexture;
      uniform vec2 uResolution;
      uniform float uIorR;
      uniform float uIorY;
      uniform float uIorG;
      uniform float uIorC;
      uniform float uIorB;
      uniform float uIorP;
      uniform float uRefractPower;
      uniform float uChromatic;
      uniform float uSaturation;
      uniform float uShininess;
      uniform float uDiffuseness;
      uniform float uFresnelPower;
      uniform vec3 uLight;
      uniform float uBackside;

      varying vec3 vNormal;
      varying vec3 vEye;

      float specular(vec3 lightDir, float shininess, float diffuseness, vec3 n, vec3 eye) {
        vec3 lightVec = normalize(-lightDir);
        vec3 view = -eye;
        vec3 halfVec = normalize(lightVec + view);
        return pow(max(dot(n, halfVec), 0.0), shininess) + max(0.0, dot(n, lightVec)) * diffuseness;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;
        vec3 n = normalize(vNormal);
        if (uBackside > 0.5) n = -n;
        vec3 eye = normalize(vEye);

        vec3 color = vec3(0.0);
        const int LOOP = 16;
        for (int i = 0; i < LOOP; i++) {
          float slide = float(i) / float(LOOP) * 0.045;

          vec3 refrR = refract(eye, n, 1.0 / uIorR);
          vec3 refrY = refract(eye, n, 1.0 / uIorY);
          vec3 refrG = refract(eye, n, 1.0 / uIorG);
          vec3 refrC = refract(eye, n, 1.0 / uIorC);
          vec3 refrB = refract(eye, n, 1.0 / uIorB);
          vec3 refrP = refract(eye, n, 1.0 / uIorP);

          vec4 texR = texture2D(uTexture, uv + refrR.xy * (uRefractPower + slide * 1.0) * uChromatic);
          vec4 texY = texture2D(uTexture, uv + refrY.xy * (uRefractPower + slide * 1.0) * uChromatic);
          vec4 texG = texture2D(uTexture, uv + refrG.xy * (uRefractPower + slide * 2.0) * uChromatic);
          vec4 texC = texture2D(uTexture, uv + refrC.xy * (uRefractPower + slide * 2.5) * uChromatic);
          vec4 texB = texture2D(uTexture, uv + refrB.xy * (uRefractPower + slide * 3.0) * uChromatic);
          vec4 texP = texture2D(uTexture, uv + refrP.xy * (uRefractPower + slide * 1.0) * uChromatic);

          float r = texR.x * 0.5;
          float y = (texY.x * 2.0 + texY.y * 2.0 - texY.z) / 6.0;
          float g = texG.y * 0.5;
          float c = (texC.y * 2.0 + texC.z * 2.0 - texC.x) / 6.0;
          float b = texB.z * 0.5;
          float p = (texP.z * 2.0 + texP.x * 2.0 - texP.y) / 6.0;

          float R = r + (2.0 * p + 2.0 * y - c) / 3.0;
          float G = g + (2.0 * y + 2.0 * c - p) / 3.0;
          float B = b + (2.0 * c + 2.0 * p - y) / 3.0;

          color += vec3(R, G, B);
        }
        color /= float(LOOP);

        float luma = dot(color, vec3(0.2125, 0.7154, 0.0721));
        color = mix(vec3(luma), color, uSaturation);

        float spec = specular(uLight, uShininess, uDiffuseness, n, eye)
                   + 0.6 * specular(vec3(1.0, 1.0, -1.0), uShininess * 0.6, uDiffuseness * 0.5, n, eye);
        color += spec * (uBackside > 0.5 ? 0.35 : 1.0);

        float f = pow(clamp(1.0 + dot(eye, n), 0.0, 1.0), uFresnelPower);
        color = mix(color, vec3(1.0), f * (uBackside > 0.5 ? 0.25 : 0.55));

        color += vec3(0.004, 0.005, 0.007);
        gl_FragColor = vec4(color, 1.0);
        #include <colorspace_fragment>
      }
    `;

    function createGlassMaterial(isBack: boolean) {
      return new THREE.ShaderMaterial({
        vertexShader: glassVertexShader,
        fragmentShader: glassFragmentShader,
        uniforms: {
          uTexture: { value: null },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uIorR: { value: 1.15 },
          uIorY: { value: 1.16 },
          uIorG: { value: 1.18 },
          uIorC: { value: 1.22 },
          uIorB: { value: 1.22 },
          uIorP: { value: 1.22 },
          uRefractPower: { value: isBack ? 0.22 : 0.30 },
          uChromatic: { value: 0.5 },
          uSaturation: { value: 1.08 },
          uShininess: { value: 90.0 },
          uDiffuseness: { value: 0.02 },
          uFresnelPower: { value: 5.0 },
          uLight: { value: new THREE.Vector3(-1.0, 1.0, 1.0) },
          uBackside: { value: isBack ? 1.0 : 0.0 },
        },
        side: isBack ? THREE.BackSide : THREE.FrontSide,
        depthTest: true,
        depthWrite: true,
      });
    }

    const backMat = createGlassMaterial(true);
    const frontMat = createGlassMaterial(false);

    // Render Targets
    const rtParams = {
      type: THREE.HalfFloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      generateMipmaps: false,
    };

    const rtBack = new THREE.WebGLRenderTarget(1, 1, rtParams);
    const rtFront = new THREE.WebGLRenderTarget(1, 1, rtParams);

    backMat.uniforms.uTexture.value = rtBack.texture;
    frontMat.uniforms.uTexture.value = rtFront.texture;

    // Layout
    function layout() {
      if (isDisposed) return;
      const W = window.innerWidth;
      const H = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      renderer.setSize(W, H);
      renderer.setPixelRatio(dpr);

      camera.aspect = W / H;
      camera.updateProjectionMatrix();

      const drawW = Math.floor(W * dpr);
      const drawH = Math.floor(H * dpr);
      rtBack.setSize(drawW, drawH);
      rtFront.setSize(drawW, drawH);

      frontMat.uniforms.uResolution.value.set(drawW, drawH);
      backMat.uniforms.uResolution.value.set(drawW, drawH);

      renderBackgroundCanvas(W, H, dpr);

      const fovRad = THREE.MathUtils.degToRad(camera.fov);
      const visH = 2 * Math.tan(fovRad / 2) * 10;
      const visW = visH * camera.aspect;
      const mobile = W < 768 || W / H < 1;
      const sx = mobile ? 0.5 : 0.517;
      const sy = mobile ? 0.45 : 0.488;
      pivot.position.set((sx - 0.5) * visW, (0.5 - sy) * visH, 0);

      const px = Math.min(H * 0.44, W * (mobile ? 0.45 : 0.29));
      const s = (px / H) * visH;
      pivot.scale.set(s, s, s);
    }

    window.addEventListener("resize", layout);

    // Model Loading
    function setupMesh(geometry: THREE.BufferGeometry) {
      if (isDisposed) return;
      if (cubeMesh) spinner.remove(cubeMesh);
      cubeMesh = new THREE.Mesh(geometry, frontMat);
      spinner.add(cubeMesh);
      setLoaderDone(true);
    }

    function useFallback() {
      const geo = new RoundedBoxGeometry(1, 1, 1, 8, 0.12);
      geo.center();
      geo.computeBoundingBox();
      const sz = new THREE.Vector3();
      geo.boundingBox?.getSize(sz);
      const maxDim = Math.max(sz.x, sz.y, sz.z);
      if (maxDim > 0) geo.scale(1 / maxDim, 1 / maxDim, 1 / maxDim);
      setupMesh(geo);
    }

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      MODEL_URL,
      (gltf) => {
        try {
          const geometries: THREE.BufferGeometry[] = [];
          gltf.scene.updateMatrixWorld(true);
          gltf.scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).geometry) {
              const mesh = child as THREE.Mesh;
              const g = mesh.geometry.clone();
              if (g.attributes.uv) g.deleteAttribute("uv");
              if (g.attributes.color) g.deleteAttribute("color");
              if (g.attributes.tangent) g.deleteAttribute("tangent");
              const merged = BufferGeometryUtils.mergeVertices(g, 1e-4);
              merged.computeVertexNormals();
              merged.applyMatrix4(mesh.matrixWorld);
              geometries.push(merged);
            }
          });

          let finalGeo: THREE.BufferGeometry | null = null;
          if (geometries.length > 1) {
            finalGeo = BufferGeometryUtils.mergeGeometries(geometries);
          } else if (geometries.length === 1) {
            finalGeo = geometries[0];
          }

          if (finalGeo) {
            finalGeo.center();
            finalGeo.computeBoundingBox();
            const sz = new THREE.Vector3();
            finalGeo.boundingBox?.getSize(sz);
            const maxDim = Math.max(sz.x, sz.y, sz.z);
            if (maxDim > 0) finalGeo.scale(1 / maxDim, 1 / maxDim, 1 / maxDim);
            setupMesh(finalGeo);
          } else {
            useFallback();
          }
        } catch {
          useFallback();
        }
      },
      undefined,
      () => useFallback()
    );

    // Interaction & Animation
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let dragDeltaAccumX = 0;
    let dragDeltaAccumY = 0;
    let timeSinceRelease = 10.0;
    let arrowSpinRemaining = 0;

    spinActionRef.current = (deltaRad: number) => {
      arrowSpinRemaining += deltaRad;
      velocityX = 0;
      velocityY = 0;
      timeSinceRelease = 0;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      canvas.setPointerCapture(e.pointerId);
      isDragging = true;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      velocityX = 0;
      velocityY = 0;
      dragDeltaAccumX = 0;
      dragDeltaAccumY = 0;
      arrowSpinRemaining = 0;
      canvas.classList.add("dragging");
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - lastPointerX;
      const deltaY = e.clientY - lastPointerY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;

      const dx = deltaX * 0.008;
      const dy = deltaY * 0.008;

      const rotY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), dx);
      const rotX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), dy);
      spinner.quaternion.premultiply(rotY).premultiply(rotX);

      dragDeltaAccumX += dx;
      dragDeltaAccumY += dy;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      canvas.classList.remove("dragging");
      timeSinceRelease = 0;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    // Loop
    let lastTime = performance.now();

    function animate(currentTime: number) {
      if (isDisposed) return;
      animId = requestAnimationFrame(animate);

      let dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      if (dt > 0.05) dt = 0.05;
      if (dt <= 0) dt = 0.016;

      const frameScale = dt * 60;

      if (isDragging) {
        if (dt > 0.0001) {
          const factor = 1 / 60 / dt;
          velocityX = dragDeltaAccumX * factor;
          velocityY = dragDeltaAccumY * factor;
        }
        dragDeltaAccumX = 0;
        dragDeltaAccumY = 0;
        timeSinceRelease = 0;
      } else {
        timeSinceRelease += dt;

        if (Math.abs(arrowSpinRemaining) > 0.0001) {
          const easeFactor = Math.min(1.0, 0.09 * frameScale);
          const step = arrowSpinRemaining * easeFactor;
          arrowSpinRemaining -= step;
          const rotSpin = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), step);
          spinner.quaternion.premultiply(rotSpin);
          if (Math.abs(arrowSpinRemaining) < 0.0005) {
            const finalSpin = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), arrowSpinRemaining);
            spinner.quaternion.premultiply(finalSpin);
            arrowSpinRemaining = 0;
          }
        } else {
          if (Math.abs(velocityX) > 1e-6 || Math.abs(velocityY) > 1e-6) {
            const stepX = velocityX * frameScale;
            const stepY = velocityY * frameScale;
            const rotY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), stepX);
            const rotX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), stepY);
            spinner.quaternion.premultiply(rotY).premultiply(rotX);

            const damping = Math.pow(0.94, frameScale);
            velocityX *= damping;
            velocityY *= damping;
          }

          if (timeSinceRelease > 0.6) {
            const rampTime = timeSinceRelease - 0.6;
            const blend = Math.min(1.0, rampTime / 1.0);
            const driftY = 0.0035 * frameScale * blend;
            const driftX = 0.0012 * frameScale * blend;
            const rotDriftY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), driftY);
            const rotDriftX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), driftX);
            spinner.quaternion.premultiply(rotDriftY).premultiply(rotDriftX);
          }
        }
      }

      // 3-Pass Render
      renderer.setRenderTarget(rtBack);
      renderer.autoClear = true;
      renderer.render(bgScene, camera);

      renderer.setRenderTarget(rtFront);
      renderer.autoClear = true;
      renderer.render(bgScene, camera);
      if (cubeMesh) {
        renderer.autoClear = false;
        cubeMesh.material = backMat;
        renderer.render(scene, camera);
        renderer.autoClear = true;
      }

      renderer.setRenderTarget(null);
      renderer.autoClear = true;
      renderer.render(bgScene, camera);
      if (cubeMesh) {
        renderer.autoClear = false;
        renderer.clearDepth();
        cubeMesh.material = frontMat;
        renderer.render(scene, camera);
        renderer.autoClear = true;
      }
    }

    // Font readiness
    const fontTimeout = new Promise((resolve) => setTimeout(resolve, 2500));
    const fontReady = typeof document !== "undefined" && document.fonts
      ? Promise.all([document.fonts.load("800 100px Poppins"), document.fonts.ready])
      : Promise.resolve();

    Promise.race([fontReady, fontTimeout]).then(() => {
      if (isDisposed) return;
      layout();
      lastTime = performance.now();
      animId = requestAnimationFrame(animate);
    });

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", layout);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      renderer.dispose();
      rtBack.dispose();
      rtFront.dispose();
      bgQuadGeo.dispose();
      bgQuadMat.dispose();
      backMat.dispose();
      frontMat.dispose();
      bgTexture.dispose();
    };
  }, []);

  return (
    <section className="dw-hero relative w-full h-[100vh] h-[100svh] min-h-[520px] overflow-hidden bg-black text-white select-none">
      <style jsx global>{`
        :root {
          --pad-x: clamp(20px, 6.95vw, 120px);
        }
        .dw-hero {
          font-family: 'Poppins', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .dw-scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          cursor: grab;
          touch-action: none;
        }
        .dw-scene.dragging {
          cursor: grabbing;
        }
        .dw-ui {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }
        .dw-ui a, .dw-ui button {
          pointer-events: auto;
        }
        .dw-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
        }
        .dw-nav {
          position: absolute;
          top: clamp(24px, 4.7vh, 40px);
          left: var(--pad-x);
          right: var(--pad-x);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .dw-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #fff;
          text-decoration: none;
          font-size: 15px;
          letter-spacing: -0.01em;
        }
        .dw-logo-mark {
          width: 20px;
          height: 40px;
          background: #fff;
          border-radius: 0 20px 20px 0;
          display: inline-block;
        }
        .dw-logo b { font-weight: 700; }
        .dw-logo span { font-weight: 400; }
        .dw-nav-links {
          display: flex;
          gap: clamp(20px, 4.1vw, 60px);
          list-style: none;
        }
        .dw-nav-links a {
          color: #fff;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          position: relative;
          cursor: pointer;
        }
        .dw-nav-links a::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -4px;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform .35s ease;
        }
        .dw-nav-links a:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        .dw-arrows {
          position: absolute;
          top: 18.9%;
          left: 76.7%;
          display: flex;
          gap: 32px;
          transform: translate(-19px, -50%);
        }
        .dw-arrow {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2.5px solid #fff;
          background: transparent;
          color: #fff;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: background .25s, color .25s;
          padding: 0;
          outline: none;
        }
        .dw-arrow svg {
          width: 18px;
          height: 18px;
          display: block;
        }
        .dw-arrow:hover {
          background: #fff;
          color: #000;
        }
        .dw-dots {
          position: absolute;
          right: calc(var(--pad-x) - 7px);
          top: 49.4%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 33px;
        }
        .dw-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid #fff;
          background: #fff;
          cursor: pointer;
          transition: background .25s;
          padding: 0;
          outline: none;
        }
        .dw-dot.active {
          background: transparent;
        }
        .dw-tagline {
          position: absolute;
          left: var(--pad-x);
          bottom: clamp(40px, 7.5vh, 70px);
          font-size: clamp(24px, 2.65vw, 44px);
          line-height: 1.2;
          font-weight: 300;
          letter-spacing: -0.01em;
        }
        .dw-tagline strong {
          font-weight: 700;
          display: block;
        }
        .dw-cta-row {
          position: absolute;
          left: 45.6%;
          right: -1vw;
          top: 88.7%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
        }
        .dw-cta {
          flex: none;
          padding: 0 15px;
          height: 48px;
          display: inline-flex;
          align-items: center;
          border: 1.5px solid rgba(255, 255, 255, .85);
          border-radius: 6px;
          background: rgba(0, 0, 0, .15);
          color: #fff;
          font-size: 14px;
          font-weight: 400;
          text-decoration: none;
          cursor: pointer;
          transition: background .25s, color .25s;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .dw-cta:hover {
          background: #fff;
          color: #000;
        }
        .dw-cta-line {
          flex: 1;
          height: 1.5px;
          background: rgba(255, 255, 255, .8);
          min-width: 40px;
        }
        .dw-count {
          flex: none;
          font-size: clamp(140px, 19.8vw, 360px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.02em;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, .9);
          transform: translateY(6%);
          user-select: none;
          pointer-events: none;
        }
        .dw-loader {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
          letter-spacing: .2em;
          text-transform: uppercase;
          opacity: .6;
          transition: opacity .6s;
          pointer-events: none;
        }
        .dw-loader.done {
          opacity: 0;
        }
        @media (max-width: 900px), (max-aspect-ratio: 1/1) {
          .dw-arrows {
            left: auto;
            right: var(--pad-x);
            top: 15%;
            transform: translateY(-50%);
            gap: 14px;
          }
          .dw-tagline {
            bottom: clamp(150px, 20vh, 220px);
          }
          .dw-cta-row {
            left: var(--pad-x);
            right: -3vw;
            top: auto;
            bottom: 24px;
            transform: none;
          }
          .dw-count {
            font-size: clamp(120px, 22vw, 200px);
          }
        }
        @media (max-width: 640px) {
          .dw-nav-links { gap: 16px; }
          .dw-nav-links a, .dw-logo { font-size: 13px; }
          .dw-dots { gap: 20px; right: 16px; }
          .dw-dot { width: 10px; height: 10px; }
          .dw-cta-row { right: -8vw; }
          .dw-count { font-size: 120px; }
        }
        @media (max-width: 420px) {
          .dw-nav-links li:nth-child(2) { display: none; }
        }
      `}</style>

      <canvas ref={canvasRef} className="dw-scene" aria-label="Rotatable glass cube. Drag to rotate." />

      <div className="dw-ui">
        <h1 className="dw-sr-only">Explore New Ideas</h1>
        <header className="dw-nav">
          <Link href="/" className="dw-logo">
            <i className="dw-logo-mark" />
            <b>Design</b>
            <span>World</span>
          </Link>
          <ul className="dw-nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/work">Portfolio</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </header>

        <div className="dw-arrows">
          <button
            type="button"
            className="dw-arrow"
            id="prev"
            aria-label="Previous"
            onClick={() => spinActionRef.current?.(-Math.PI * 0.5)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className="dw-arrow"
            id="next"
            aria-label="Next"
            onClick={() => spinActionRef.current?.(Math.PI * 0.5)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <nav className="dw-dots" aria-label="Pagination">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              className={`dw-dot ${activeDot === idx ? "active" : ""}`}
              aria-label={`Page ${idx + 1}`}
              onClick={() => setActiveDot(idx)}
            />
          ))}
        </nav>

        <p className="dw-tagline">
          Let&apos;s Build the<br />
          Future of <strong>Design.</strong>
        </p>

        <div className="dw-cta-row">
          <Link href="/work" className="dw-cta">
            Explore Now
          </Link>
          <span className="dw-cta-line" />
          <span className="dw-count" aria-hidden="true">
            07
          </span>
        </div>

        <div className={`dw-loader ${loaderDone ? "done" : ""}`}>
          Loading model
        </div>
      </div>
    </section>
  );
}
