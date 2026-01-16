// All-in-one script: hero carousel (autoplay + arrows + dots),
// gallery carousel (autoplay + arrows + dots),
// models toggle, lightbox, and progressive reveal.

(() => {
  /* ================= HERO CAROUSEL ================= */
  const hero = document.querySelector(".hero");
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const prevBtn = document.querySelector(".hero-prev");
  const nextBtn = document.querySelector(".hero-next");
  const dotsContainer = document.querySelector(".hero-dots");
  let heroIndex = 0;
  let heroTimer = null;
  const HERO_INTERVAL = 5000;

  function createHeroDots() {
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.className = i === 0 ? "active" : "";
      b.dataset.index = i;
      dotsContainer.appendChild(b);
      b.addEventListener("click", () => {
        goHero(i);
        resetHeroTimer();
      });
    });
  }

  function updateHero() {
    slides.forEach((s, i) => s.classList.toggle("active", i === heroIndex));
    Array.from(dotsContainer.children).forEach((d, i) => d.classList.toggle("active", i === heroIndex));
  }

  function goHero(i) {
    heroIndex = (i + slides.length) % slides.length;
    updateHero();
  }

  function nextHero() { goHero(heroIndex + 1); }
  function prevHero() { goHero(heroIndex - 1); }

  function resetHeroTimer() {
    if (heroTimer) clearInterval(heroTimer);
    heroTimer = setInterval(nextHero, HERO_INTERVAL);
  }

  if (slides.length) {
    createHeroDots();
    updateHero();
    resetHeroTimer();
  }
  if (nextBtn) nextBtn.addEventListener("click", () => { nextHero(); resetHeroTimer(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prevHero(); resetHeroTimer(); });

  /* ================= GALLERY CAROUSEL (TOP) ================= */
  const gcTrack = document.querySelector(".gc-track");
  const gcSlides = Array.from(document.querySelectorAll(".gc-slide"));
  const gcPrev = document.querySelector(".gc-prev");
  const gcNext = document.querySelector(".gc-next");
  const gcDotsContainer = document.querySelector(".gc-dots");
  let gcIndex = 0;
  let gcTimer = null;
  const GC_INTERVAL = 4200;

  function createGCDots() {
    gcSlides.forEach((_, i) => {
      const b = document.createElement("button");
      b.dataset.index = i;
      b.className = i === 0 ? "active" : "";
      gcDotsContainer.appendChild(b);
      b.addEventListener("click", () => {
        goGC(i);
        resetGCTimer();
      });
    });
  }

  function updateGC() {
    const width = gcTrack.clientWidth;
    gcTrack.style.transform = `translateX(-${gcIndex * width}px)`;
    Array.from(gcDotsContainer.children).forEach((d, i) => d.classList.toggle("active", i === gcIndex));
  }

  function goGC(i) {
    gcIndex = (i + gcSlides.length) % gcSlides.length;
    updateGC();
  }

  function nextGC() { goGC(gcIndex + 1); }
  function prevGC() { goGC(gcIndex - 1); }

  function resetGCTimer() {
    if (gcTimer) clearInterval(gcTimer);
    gcTimer = setInterval(() => nextGC(), GC_INTERVAL);
  }

  // initialize GC
  if (gcSlides.length) {
    // wait a tick to measure width
    setTimeout(() => {
      createGCDots();
      updateGC();
      resetGCTimer();
      // adapt on resize
      window.addEventListener("resize", () => updateGC());
    }, 120);
  }
  if (gcNext) gcNext.addEventListener("click", () => { nextGC(); resetGCTimer(); });
  if (gcPrev) gcPrev.addEventListener("click", () => { prevGC(); resetGCTimer(); });

  /* ================= MODELS TOGGLE ================= */
  const toggleBtns = Array.from(document.querySelectorAll(".toggle-btn"));
  const modelCards = { modelA: document.getElementById("modelA"), modelB: document.getElementById("modelB") };

  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      toggleBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const t = btn.dataset.target;
      // show selected, hide other
      Object.keys(modelCards).forEach(k => {
        const el = modelCards[k];
        if (!el) return;
        if (k === t) { el.classList.remove("hidden"); el.classList.add("active-model"); }
        else { el.classList.add("hidden"); el.classList.remove("active-model"); }
      });
    });
  });

  /* ================= GRID LIGHTBOX ================= */
  const items = Array.from(document.querySelectorAll(".gallery-item img"));
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbCaption = document.getElementById("lb-caption");
  const lbClose = document.getElementById("lb-close");
  const lbPrev = document.getElementById("lb-prev");
  const lbNext = document.getElementById("lb-next");
  let index = 0;

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
  function nextLB() { openAt((index + 1) % items.length); }
  function prevLB() { openAt((index - 1 + items.length) % items.length); }

  items.forEach((img, i) => {
    img.addEventListener("click", () => openAt(i));
  });
  if (lbClose) lbClose.addEventListener("click", closeLB);
  if (lbNext) lbNext.addEventListener("click", nextLB);
  if (lbPrev) lbPrev.addEventListener("click", prevLB);
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLB();
    if (e.key === "ArrowRight") nextLB();
    if (e.key === "ArrowLeft") prevLB();
  });

  /* progressive reveal for grid images */
  window.addEventListener("load", () => {
    const imgs = document.querySelectorAll(".gallery-item img");
    imgs.forEach((img, i) => setTimeout(() => img.style.opacity = "1", i * 90));
  });

  /* small safety: ensure hero starts properly if resize */
  window.addEventListener("resize", () => {
    // recalc gallery carousel transform
    if (gcSlides.length) updateGC();
  });
})();
