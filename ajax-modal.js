/* AJAX modal (depends on jQuery + GSAP already present via Webflow) */
window.addEventListener("DOMContentLoaded", () => {
  function adjaxModal() {
    let lightbox = $("[tr-ajaxmodal-element='lightbox']");
    let lightboxClose = $("[tr-ajaxmodal-element='lightbox-close']").attr("aria-label", "Close Modal");
    let lightboxModal = $("[tr-ajaxmodal-element='lightbox-modal']");
    let cmsLink = "[tr-ajaxmodal-element='cms-link']";
    let cmsPageContent = "[tr-ajaxmodal-element='cms-page-content']";
    let initialPageTitle = document.title;
    let initialPageUrl = window.location.href;
    let focusedLink;

    function updatePageInfo(newTitle, newUrl) {
      lightboxModal.empty();
      document.title = newTitle;
      window.history.replaceState({}, "", newUrl);
    }

    let tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => { focusedLink?.focus(); updatePageInfo(initialPageTitle, initialPageUrl); },
      onComplete: () => { lightboxClose.focus(); }
    });
    tl.set("body", { overflow: "hidden" });
    tl.set(lightbox, { display: "block", onComplete: () => lightboxModal.scrollTop(0) });
    tl.from(lightbox, { opacity: 0, duration: 0.2 });
    tl.from(lightboxModal, { y: "5em", duration: 0.2 }, "<");

    $(document).on("click", cmsLink, function (e) {
      focusedLink = $(this); initialPageUrl = window.location.href; e.preventDefault();
      let linkUrl = $(this).attr("href");
      $.ajax({
        url: linkUrl,
        success: function (response) {
          let cmsContent = $(response).find(cmsPageContent);
          let cmsTitle = $(response).filter("title").text();
          let cmsUrl = window.location.origin + linkUrl;
          updatePageInfo(cmsTitle, cmsUrl);
          lightboxModal.append(cmsContent);
          tl.play();
          let lastFocusableChild = lightbox
            .find("button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])")
            .not(":disabled").not("[aria-hidden=true]").last();
          lastFocusableChild.on("focusout", function () { lightboxClose.focus(); });
        }
      });
    });

    lightboxClose.on("click", () => tl.reverse());
    $(document).on("keydown", (e) => { if (e.key === "Escape") tl.reverse(); });
    $(document).on("click", lightbox, (e) => { if (!$(e.target).is(lightbox.find("*"))) tl.reverse(); });
  }
  adjaxModal();
});
