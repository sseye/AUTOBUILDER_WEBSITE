"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const runtimeRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.Camera;
    geometry?: THREE.PlaneGeometry;
    material?: THREE.ShaderMaterial;
    uniforms?: {
      time: { type: string; value: number };
      resolution: { type: string; value: THREE.Vector2 };
    };
    frameId?: number;
    resizeObserver?: ResizeObserver;
    contextLost?: (event: Event) => void;
    contextRestored?: () => void;
  }>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `;

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time*0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
          }
        }
        
        gl_FragColor = vec4(color[0],color[1],color[2],1.0);
      }
    `;

    const cleanup = () => {
      const runtime = runtimeRef.current;
      if (runtime.frameId) {
        cancelAnimationFrame(runtime.frameId);
      }
      runtime.resizeObserver?.disconnect();
      if (runtime.renderer) {
        if (runtime.contextLost) {
          runtime.renderer.domElement.removeEventListener("webglcontextlost", runtime.contextLost);
        }
        if (runtime.contextRestored) {
          runtime.renderer.domElement.removeEventListener("webglcontextrestored", runtime.contextRestored);
        }
        if (container.contains(runtime.renderer.domElement)) {
          container.removeChild(runtime.renderer.domElement);
        }
        runtime.renderer.dispose();
      }
      runtime.geometry?.dispose();
      runtime.material?.dispose();
      runtimeRef.current = {};
    };

    const startScene = () => {
      cleanup();

      const camera = new THREE.Camera();
      camera.position.z = 1;

      const scene = new THREE.Scene();
      const geometry = new THREE.PlaneGeometry(2, 2);

      const uniforms = {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";

      container.appendChild(renderer.domElement);

      const setSize = () => {
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;
        renderer.setSize(width, height, false);
        uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
      };

      setSize();

      const resizeObserver = new ResizeObserver(() => setSize());
      resizeObserver.observe(container);

      const TIME_WRAP = 1024;
      let start = performance.now();
      const animate = () => {
        const now = performance.now();
        const delta = (now - start) / 1000;
        start = now;
        uniforms.time.value = (uniforms.time.value + delta * 2.4) % TIME_WRAP;
        renderer.render(scene, camera);
        runtimeRef.current.frameId = requestAnimationFrame(animate);
      };

      const handleContextLost = (event: Event) => {
        event.preventDefault();
        cleanup();
      };

      const handleContextRestored = () => {
        startScene();
      };

      renderer.domElement.addEventListener("webglcontextlost", handleContextLost, false);
      renderer.domElement.addEventListener("webglcontextrestored", handleContextRestored, false);

      runtimeRef.current = {
        renderer,
        scene,
        camera,
        geometry,
        material,
        uniforms,
        resizeObserver,
        contextLost: handleContextLost,
        contextRestored: handleContextRestored,
      };

      animate();
    };

    startScene();

    return () => {
      cleanup();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      style={{
        background: "#000",
        overflow: "hidden",
      }}
    />
  );
}
