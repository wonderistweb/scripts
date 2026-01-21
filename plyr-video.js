/* Plyr init + behaviors */
document.addEventListener("DOMContentLoaded", function () {
  const playersList = [];
  document.querySelectorAll(".plyr_component").forEach((component) => {
    const videoEl = component.querySelector(".plyr_video");
    if (!videoEl) return;

    const player = new Plyr(videoEl, {
      controls: ["play", "progress", "current-time", "mute", "fullscreen"],
      resetOnEnd: true
    });
    playersList.push(player);

    const cover = component.querySelector(".plyr_cover");
    if (cover) cover.addEventListener("click", () => player.play());

    player.on("play", () => {
      document.querySelectorAll(".plyr_component").forEach((c) => c.classList.remove("hide-cover"));
      component.classList.add("hide-cover");
      playersList.forEach((other) => { if (other !== player && !other.paused) other.pause(); });
    });

    player.on("ended", () => {
      component.classList.remove("hide-cover");
      if (player.fullscreen?.active) player.fullscreen.exit();
    });

    const pauseBtn = component.querySelector(".plyr_pause-trigger");
    if (pauseBtn) pauseBtn.addEventListener("click", () => player.pause());

    player.on("enterfullscreen", () => component.classList.add("contain-video"));
    player.on("exitfullscreen", () => component.classList.remove("contain-video"));
  });

  document.querySelectorAll('[data-slider="next"], [data-slider="previous"], [data-modal-close]')
    .forEach((btn) => btn.addEventListener("click", () => {
      playersList.forEach((p) => { if (!p.paused) p.pause(); });
    }));
});
