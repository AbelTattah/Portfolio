// Reveal-on-scroll animations matching the Drake theme's data-animation values.
// Elements are visible by default; the hidden state is applied only by this
// script, so content can never get stuck invisible if JavaScript fails.
const VALID = [
  "fade_from_bottom",
  "fade_from_top",
  "fade_from_left",
  "fade_from_right",
  "fade_in",
  "rotate_up",
];

export function initScrollAnimations() {
  if (typeof IntersectionObserver === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  const elements = [...document.querySelectorAll(".scroll-animation")];
  elements.forEach((el) => {
    if (!VALID.includes(el.dataset.animation)) {
      el.dataset.animation = "fade_from_bottom";
    }
    // Apply the hidden state without animating from the visible state.
    el.style.transition = "none";
    el.classList.add("anim-ready");
    void el.offsetWidth;
    el.style.transition = "";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // reveal once, never hide again
      });
    },
    { rootMargin: "0px 0px 20% 0px", threshold: 0 },
  );

  elements.forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
    elements.forEach((el) => {
      el.classList.remove("anim-ready", "is-visible");
      el.style.transition = "";
      el.dataset.animation = "";
    });
  };
}
