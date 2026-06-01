document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-rotate-heading='component']:not([data-rotate-heading='component'] [data-rotate-heading='component'])").forEach((component) => {
    if (component.dataset.scriptInitialized) return;
    component.dataset.scriptInitialized = "true";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const headings = Array.from(component.children);
    if (!headings.length) return;

    const rest = headings.slice(1);
    const HOLD = parseFloat(component.getAttribute("data-hold")) || 1.5;
    const DUR = parseFloat(component.getAttribute("data-duration")) || 0.4;

    component.style.position = "relative";
    rest.forEach((el) => {
      el.style.position = "absolute";
      el.style.top = "0";
      el.style.left = "0";
      el.style.width = "100%";
    });

    let rafId;
    function setWrapHeight() {
      headings.forEach((el) => {
        el.style.position = "static";
        el.style.height = "";
      });
      const maxHeight = Math.max(...headings.map((el) => el.offsetHeight));
      headings.forEach((el, i) => {
        el.style.height = maxHeight + "px";
        el.style.position = i === 0 ? "static" : "absolute";
      });
      component.style.height = maxHeight + "px";
    }

    setWrapHeight();

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setWrapHeight());
    });
    ro.observe(component);

    if (reducedMotion.matches) {
      headings.forEach((el, i) => {
        el.style.visibility = i === 0 ? "visible" : "hidden";
      });
      return;
    }

    if (typeof gsap === "undefined") return;

    gsap.set(rest, { autoAlpha: 0 });

    const tl = gsap.timeline({ repeat: -1 });
    headings.forEach((el) => {
      tl.fromTo(el, { y: "100%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, duration: DUR, ease: "power2.out" }).to(el, { delay: HOLD, y: "-100%", autoAlpha: 0, duration: DUR, ease: "power2.in" });
    });

    reducedMotion.addEventListener("change", (e) => {
      if (e.matches) {
        tl.kill();
        headings.forEach((el, i) => {
          el.style.visibility = i === 0 ? "visible" : "hidden";
        });
      }
    });
  });
});
