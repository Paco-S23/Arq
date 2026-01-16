// FADE-IN DE IMÁGENES AL HACER SCROLL
const galleryImages = document.querySelectorAll(".gallery img");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

galleryImages.forEach(img => observer.observe(img));

// HERO SLIDER (si después agregas más imágenes)
let heroIndex = 0;
const heroImages = document.querySelectorAll(".hero img");

if (heroImages.length > 1) {
  setInterval(() => {
    heroImages.forEach(img => img.style.display = "none");
    heroIndex = (heroIndex + 1) % heroImages.length;
    heroImages[heroIndex].style.display = "block";
  }, 5000);
}
