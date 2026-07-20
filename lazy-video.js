document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll("video");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        if (video.dataset.src && !video.src) {
          video.muted = true;
          video.playsInline = true;
          video.src = video.dataset.src;
        }
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { rootMargin: "200px", threshold: 0.1 });

  videos.forEach(video => {
    video.removeAttribute("autoplay");
    video.pause();
    observer.observe(video);
  });
});
