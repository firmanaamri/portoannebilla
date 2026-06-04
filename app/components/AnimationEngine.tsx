"use client";

import { useEffect } from "react";

/* ─────────────────────────────────────────────────────────────
   AnimationEngine — Premium Micro-Interactions (Vanilla JS)
   • Custom magnetic cursor trail (mix-blend mode glow)
   • Parallax background orbs reacting to mouse movements
   • Interactive typing effect helper
   • Smooth scroll-progress indicator at page top
───────────────────────────────────────────────────────────── */

export default function AnimationEngine() {
  useEffect(() => {
    /* ── 1. CUSTOM GLOW CURSOR ─────────────────────────── */
    const cursor = document.createElement("div");
    cursor.id = "js-cursor";
    cursor.innerHTML = `<div id="js-cursor-dot"></div><div id="js-cursor-ring"></div>`;
    document.body.appendChild(cursor);

    let mouseX = -200, mouseY = -200;
    let ringX = -200, ringY = -200;
    let rafId: number;

    const dot  = document.getElementById("js-cursor-dot")!;
    const ring = document.getElementById("js-cursor-ring")!;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      dot.style.transform  = `translate(${mouseX}px, ${mouseY}px)`;
      
      // Lerp effect for luxurious drag inertia
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      rafId = requestAnimationFrame(animateCursor);
    };

    const onHoverIn  = () => ring.classList.add("cursor-hover");
    const onHoverOut = () => ring.classList.remove("cursor-hover");

    // Dynamic hover attachers
    const refreshHoverEvents = () => {
      const interactables = document.querySelectorAll(
        "a, button, .card, .badge, .contact-link, .timeline-item, [role='button']"
      );
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", onHoverIn);
        el.addEventListener("mouseleave", onHoverOut);
      });
    };

    refreshHoverEvents();
    document.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animateCursor);

    // Watch DOM changes to bind new elements
    const observer = new MutationObserver(refreshHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    /* ── 2. SCROLL PROGRESS BAR ───────────────────────── */
    const progressBar = document.getElementById("js-scroll-progress");
    let scrollTarget = 0;
    let scrollCurrent = 0;
    let scrollRafId: number;

    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.body.scrollHeight - window.innerHeight;
      if (total > 0) {
        scrollTarget = scrolled / total;
      }
    };

    const animateProgress = () => {
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.08;
      if (Math.abs(scrollCurrent - scrollTarget) < 0.001) {
        scrollCurrent = scrollTarget;
      }
      if (progressBar) {
        progressBar.style.transform = `scaleX(${scrollCurrent})`;
      }
      scrollRafId = requestAnimationFrame(animateProgress);
    };

    scrollRafId = requestAnimationFrame(animateProgress);
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ── 3. PARALLAX DEPTH BACKGROUND ORBS ────────────── */
    const orb1 = document.querySelector<HTMLElement>(".orb-1");
    const orb2 = document.querySelector<HTMLElement>(".orb-2");
    const orb3 = document.querySelector<HTMLElement>(".orb-3");

    const onParallax = (e: MouseEvent) => {
      const cx = e.clientX / window.innerWidth  - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;

      if (orb1) orb1.style.transform = `translate(${cx * 45}px, ${cy * 35}px)`;
      if (orb2) orb2.style.transform = `translate(${cx * -35}px, ${cy * -30}px)`;
      if (orb3) orb3.style.transform = `translate(${cx * 25}px, ${cy * 20}px) translate(-50%, -50%)`;
    };

    window.addEventListener("mousemove", onParallax);

    /* ── 4. STATS COUNTER ANIMATION TRIGGERS ──────────── */
    const counterEls = document.querySelectorAll<HTMLElement>("[data-count]");

    const animateCounter = (el: HTMLElement) => {
      const target   = parseFloat(el.dataset.count!);
      const suffix   = el.dataset.countSuffix ?? "";
      const duration = 2000;
      const start    = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current  = Math.round(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterEls.forEach((el) => {
      el.textContent = "0" + (el.dataset.countSuffix ?? "");
      counterObserver.observe(el);
    });

    /* ── CLEANUP ──────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(scrollRafId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", onParallax);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      counterObserver.disconnect();
      cursor.remove();
    };
  }, []);

  return null;
}
