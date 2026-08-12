"use client";

import { useEffect, useRef } from "react";

/**
 * Applies mouse-driven parallax to layers inside the returned container ref.
 * Each child with [data-depth] is translated proportionally to its depth,
 * writing directly to style.transform (no React state) to stay off the render path.
 */
export function useParallax<T extends HTMLElement>(intensity = 24) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    function handleMove(e: MouseEvent) {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = el!.getBoundingClientRect();
        const x = (e.clientX - bounds.left) / bounds.width - 0.5;
        const y = (e.clientY - bounds.top) / bounds.height - 0.5;
        const layers = el!.querySelectorAll<HTMLElement>("[data-depth]");
        layers.forEach((layer) => {
          const depth = Number(layer.dataset.depth ?? 0);
          layer.style.transform = `translate3d(${x * intensity * depth}px, ${y * intensity * depth}px, 0)`;
        });
      });
    }

    function handleLeave() {
      const layers = el!.querySelectorAll<HTMLElement>("[data-depth]");
      layers.forEach((layer) => {
        layer.style.transform = "translate3d(0,0,0)";
      });
    }

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [intensity]);

  return containerRef;
}
