// Tabs modelos
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById("model-" + tab.dataset.tab).classList.add("active");
  });
});

// Carrusel
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel figure");
let index = 0;

document.querySelector(".arrow.right").onclick = () => {
  index = (index + 1) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
};

document.querySelector(".arrow.left").onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
};
