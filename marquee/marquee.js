document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll("[data-marquee='component']:not([data-marquee='component'] [data-marquee='component'])").forEach((component) => {
    if (component.dataset.scriptInitialized) return;
    component.dataset.scriptInitialized = 'true';

    const track = component.querySelector("[data-marquee='track']");
    if (!track) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    component.appendChild(clone);

    const marqueeGroup = [track, clone];
    const pxPerSecond = parseFloat(component.getAttribute('data-speed')) || 100;

    gsap.set(marqueeGroup, { xPercent: 0 });

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(marqueeGroup, {
      xPercent: -100,
      duration: track.scrollWidth / pxPerSecond,
      ease: 'linear',
    });

    if (prefersReduced) {
      tl.pause();
      return;
    }

    if (component.getAttribute('data-pause-hover') === 'True') {
      component.addEventListener('mouseenter', () => tl.pause());
      component.addEventListener('mouseleave', () => tl.resume());
    }

    const ro = new ResizeObserver(() => {
      const newDuration = track.scrollWidth / pxPerSecond;
      tl.duration(newDuration);
    });
    ro.observe(track);
  });
});
