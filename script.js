// Lightbox + gallery behavior (works with the markup provided)
(() => {
  const items = Array.from(document.querySelectorAll(".gallery-item img"));
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbCaption = document.getElementById("lb-caption");
  const lbClose = document.getElementById("lb-close");
  const lbPrev = document.getElementById("lb-prev");
  const lbNext = document.getElementById("lb-next");

  let index = 0;

  if (!lightbox) return;

  function openAt(i) {
    index = i;
    const img = items[index];
    lbImg.src = img.src;
    lbImg.alt = img.alt || "";
    lbCaption.textContent = img.dataset.caption || img.alt || "";
    lightbox.classList.remove("hidden");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLB() {
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");
    lbImg.src = "";
  }

  function next() { openAt((index + 1) % items.length); }
  function prev() { openAt((index - 1 + items.length) % items.length); }

  items.forEach((img, i) => {
    img.addEventListener("click", () => openAt(i));
  });

  lbClose.addEventListener("click", closeLB);
  lbNext.addEventListener("click", next);
  lbPrev.addEventListener("click", prev);

  // keyboard
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLB();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  // progressive reveal for gallery images (staggered)
  window.addEventListener("load", () => {
    const imgs = document.querySelectorAll(".gallery-item img");
    imgs.forEach((img, i) => {
      setTimeout(() => img.style.opacity = "1", i * 90);
    });
  });

  // hero fade-in
  const heroImg = document.querySelector(".hero img");
  if (heroImg) {
    heroImg.style.opacity = 0;
    heroImg.style.transition = "opacity 1.4s ease, transform 1.6s ease";
    window.addEventListener("load", () => {
      heroImg.style.opacity = 1;
      heroImg.style.transform = "scale(1)";
    });
  }
})();
