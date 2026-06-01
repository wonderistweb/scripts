document.addEventListener("DOMContentLoaded", () => {
  const SELECTOR = ".c-heading";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll(".heading-animate_wrapper").forEach(initRotate);

  function initRotate(wrap) {
    if (wrap.dataset.scriptInitialized === "true") return;
    wrap.dataset.scriptInitialized = "true";

    const headings = Array.from(wrap.querySelectorAll(SELECTOR));
    if (!headings.length) return;

    // First heading stays in flow to set wrapper height.
    // All others are taken out of flow so they don't affect it.
    wrap.style.position = "relative";
    headings.slice(1).forEach((el) => {
      el.style.position = "absolute";
      el.style.top = "0";
      el.style.left = "0";
      el.style.width = "100%";
    });

    setWrapHeight(wrap, headings);

    const ro = new ResizeObserver(() => setWrapHeight(wrap, headings));
    ro.observe(wrap);

    if (reducedMotion.matches) {
      applyStaticFallback(headings);
      return;
    }

    if (typeof gsap === "undefined") return;

    gsap.set(headings.slice(1), { autoAlpha: 0 });
    createTimeline(headings, wrap);

    reducedMotion.addEventListener("change", (e) => {
      if (e.matches) {
        gsap.globalTimeline.clear();
        applyStaticFallback(headings);
      }
    });
  }

  function setWrapHeight(wrap, headings) {
    // Briefly put all headings back in flow for accurate measurement
    headings.forEach((el) => (el.style.position = "static"));
    const maxHeight = Math.max(...headings.map((el) => el.offsetHeight));
    wrap.style.height = maxHeight + "px";
    // Restore — first heading stays static, rest go absolute
    headings[0].style.position = "static";
    headings.slice(1).forEach((el) => (el.style.position = "absolute"));
  }

  function applyStaticFallback(headings) {
    headings.forEach((el, i) => {
      el.style.visibility = i === 0 ? "visible" : "hidden";
    });
  }

  function createTimeline(headings, parent) {
    const HOLD = parseFloat(parent.getAttribute("data-hold")) || 1.5;
    const DUR = parseFloat(parent.getAttribute("data-duration")) || 0.4;

    const tl = gsap.timeline({ repeat: -1 });

    headings.forEach((el) => {
      tl.fromTo(el, { y: "1em", autoAlpha: 0 }, { y: "0em", autoAlpha: 1, duration: DUR, ease: "power2.out" }).to(el, {
        delay: HOLD,
        y: "-1em",
        autoAlpha: 0,
        duration: DUR,
        ease: "power2.in",
      });
    });
  }
});
