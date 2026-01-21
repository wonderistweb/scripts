    /* MODAL */
window.addEventListener("DOMContentLoaded", () => {
	const modalSystem = ((window.lumos ??= {}).modal ??= {
		list: {}, open(id) { this.list[id]?.open?.(); }, closeAll() { Object.values(this.list).forEach((m) => m.close?.()); },
	});
	function createModals() {
		document.querySelectorAll(".modal_dialog").forEach(function (modal) {
		if (modal.dataset.scriptInitialized) return;
		modal.dataset.scriptInitialized = "true";

		const modalId = modal.getAttribute("data-modal-target");
		let lastFocusedElement;

		if (typeof gsap !== "undefined") {
			gsap.context(() => {
				let tl = gsap.timeline({ paused: true, onReverseComplete: resetModal });
				tl.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.out" });
				tl.from(".modal_content", { y: "6rem", duration: 0.3, ease: "power1.out" }, "<");
				modal.tl = tl;
			}, modal);
		}

		function resetModal() {
			typeof lenis !== "undefined" && lenis.start ? lenis.start() : (document.body.style.overflow = "");
			modal.close();
 			if (lastFocusedElement) lastFocusedElement.focus();
			window.dispatchEvent(new CustomEvent("modal-close", { detail: { modal } }));
		}
		function openModal() {
			typeof lenis !== "undefined" && lenis.stop ? lenis.stop() : (document.body.style.overflow = "hidden");
			lastFocusedElement = document.activeElement;
			modal.showModal();
			if (typeof gsap !== "undefined") modal.tl.play();
			modal.querySelectorAll("[data-modal-scroll]").forEach((el) => (el.scrollTop = 0));
			window.dispatchEvent(new CustomEvent("modal-open", { detail: { modal } }));
		}
		function closeModal() {
			typeof gsap !== "undefined" ? modal.tl.reverse() : resetModal();
		}

		if (new URLSearchParams(location.search).get("modal-id") === modalId) openModal(), history.replaceState({}, "", ((u) => (u.searchParams.delete("modal-id"), u))(new URL(location.href)));
		modal.addEventListener("cancel", (e) => (e.preventDefault(), closeModal()));
		modal.addEventListener("click", (e) => e.target.closest("[data-modal-close]") && closeModal());
		document.addEventListener("click", (e) => e.target.closest("[data-modal-trigger='" + modalId + "']") && openModal());
			modalSystem.list[modalId] = { open: openModal, close: closeModal };
		});
	}
	createModals();
});
