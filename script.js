// ====== FORZAR ANIMACIÓN GALERÍA ======
window.addEventListener("load", () => {
  const imgs = document.querySelectorAll(".gallery img");

  imgs.forEach((img, i) => {
    setTimeout(() => {
      img.classList.add("show");
    }, i * 120);
  });
});

// ====== HERO FADE SUAVE ======
const heroImg = document.querySelector(".hero img");

if (heroImg) {
  heroImg.style.opacity = "0";
  heroImg.style.transition = "opacity 1.5s ease";

  window.addEventListener("load", () => {
    heroImg.style.opacity = "1";
  });
}
