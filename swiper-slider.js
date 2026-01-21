  /* Swiper Slider */
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-slider='component']:not([data-slider='component'] [data-slider='component'])").forEach((component) => {
    if (component.dataset.scriptInitialized) return;
    component.dataset.scriptInitialized = "true";

    const swiperElement = component.querySelector(".slider_element");
    const swiperWrapper = component.querySelector(".slider_list");
    if (!swiperElement || !swiperWrapper) return;
    const cmsList = swiperWrapper.querySelector(".swiper-wrapper");
    if (cmsList) {
      const staticWrapper = [...swiperWrapper.children];
      [...cmsList.children].forEach((element) => swiperWrapper.appendChild(element));
      staticWrapper.forEach((element) => element.remove());
    }
    [...swiperWrapper.children].forEach((el) => el.classList.add("swiper-slide"));

    const loop = swiperElement.getAttribute("data-loop-mode") === "true",
          followFinger = swiperElement.getAttribute("data-follow-finger") === "true",
          freeMode = swiperElement.getAttribute("data-free-mode") === "true",
          mousewheel = swiperElement.getAttribute("data-mousewheel") === "true",
          slideToClickedSlide = swiperElement.getAttribute("data-slide-to-clicked") === "true",
          centeredSlides = swiperElement.getAttribute("data-centered-slides") === "true",
          autoplay = swiperElement.getAttribute("data-autoplay") === "true",
          autoplayDelay = +swiperElement.getAttribute("data-autoplay-delay") || 3000,
          speed = +swiperElement.getAttribute("data-speed") || 600;

    const swiperInstance = new Swiper(swiperElement, {
      slidesPerView: "auto",
      loop: loop,
      followFinger: followFinger,
      loopAdditionalSlides: 10,
      freeMode: freeMode,
      slideToClickedSlide: slideToClickedSlide,
      centeredSlides: centeredSlides,
      autoHeight: false,
      speed: speed,
      autoplay: autoplay ? {
        delay: autoplayDelay,
        disableOnInteraction: false,
      } : false,
      mousewheel: {
        enabled: mousewheel,
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      navigation: {
        nextEl: component.querySelector("[data-slider='next']"),
        prevEl: component.querySelector("[data-slider='previous']"),
      },
      pagination: {
        el: component.querySelector(".slider_bullet_list"),
        bulletActiveClass: "is-active",
        bulletClass: "slider_bullet_item",
        bulletElement: "button",
        clickable: true,
      },
      slideActiveClass: "is-active",
      slideDuplicateActiveClass: "is-active",
    });
  });
  });
