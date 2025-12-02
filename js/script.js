console.log("SCRIPT connected ✔️");

document.addEventListener("DOMContentLoaded", () => {

  const enterBtn = document.getElementById("enter-btn");
  const overlay = document.getElementById("entry-overlay");
  const main = document.getElementById("main");
  const audio = document.getElementById("bg-audio");

  const balloonsContainer = document.getElementById("global-balloons");
  const crackersContainer = document.getElementById("global-crackers");

  const modal = document.getElementById("img-modal");
  const modalImg = document.getElementById("modal-img");
  const closeModal = document.getElementById("close-modal");

  if (modal && !modal.classList.contains("hidden"))
    modal.classList.add("hidden");

  /* ---------------------------------------------------------
      ENTRY BUTTON
  ----------------------------------------------------------- */
  if (enterBtn) {
    enterBtn.addEventListener("click", () => {

      overlay.style.transition = "opacity .6s ease";
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";

      if (main) main.classList.remove("hidden");

      if (audio) {
        audio.play().catch(() => {});
      }

      setTimeout(() => {
        if (overlay?.parentNode) overlay.remove();
      }, 700);
    });
  }

  /* ---------------------------------------------------------
      BALLOONS
  ----------------------------------------------------------- */
  function spawnBalloon() {
    const b = document.createElement("div");
    b.className = "balloon";

    const left = Math.random() * 110 - 5;
    b.style.left = `${left}vw`;

    const palettes = [
      ["#FFD54A","#FF6B6B"],
      ["#FF8A65","#FF4081"],
      ["#FFB74D","#FF5252"],
      ["#FFD180","#FF6DAA"],
      ["#FFEE58","#FF8A65"]
    ];
    const p = palettes[Math.floor(Math.random() * palettes.length)];
    b.style.background = `linear-gradient(180deg, ${p[0]}, ${p[1]})`;

    const dur = 7 + Math.random() * 6;
    b.style.animationDuration = dur + "s";
    b.style.transform = `rotate(${Math.random()*30-15}deg)`;

    balloonsContainer.appendChild(b);
    setTimeout(() => b.remove(), (dur + 1) * 1000);
  }

  setInterval(spawnBalloon, 700);

  /* ---------------------------------------------------------
      CRACKERS
  ----------------------------------------------------------- */
  function spawnCrackers() {
    const cx = Math.random() * window.innerWidth;
    const cy = Math.random() * window.innerHeight;
    const pieces = 12 + Math.floor(Math.random() * 12);

    for (let i = 0; i < pieces; i++) {
      const s = document.createElement("div");
      s.className = "spark";
      s.style.left = cx + "px";
      s.style.top = cy + "px";

      const dx = (Math.random() * 260 - 130) + "px";
      const dy = (Math.random() * 260 - 130) + "px";

      s.style.setProperty("--x", dx);
      s.style.setProperty("--y", dy);

      if (Math.random() > 0.6) s.style.background = "#FFEA00";
      if (Math.random() > 0.85) s.style.background = "#FF8A65";

      crackersContainer.appendChild(s);
      setTimeout(() => s.remove(), 650);
    }
  }

  setInterval(spawnCrackers, 3500);

  /* ---------------------------------------------------------
      MODAL HANDLING (IMG + VIDEO)
  ----------------------------------------------------------- */
  function openModal(src) {
    modalImg.src = src;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModalFn() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
  }

  // images
  document.querySelectorAll(".photo img").forEach(img => {
    img.addEventListener("click", () => openModal(img.src));
  });

  // videos
  document.querySelectorAll(".video video").forEach(v => {
    v.addEventListener("click", () => openModal(v.src));
  });

  if (closeModal) closeModal.addEventListener("click", closeModalFn);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModalFn();
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) closeModalFn();
  });

  /* ---------------------------------------------------------
      SCROLL HINT FADE
  ----------------------------------------------------------- */
  const scrollHints = document.querySelectorAll(".scroll-hint, .entry-scroll-hint");

  function hideScrollHints() {
    scrollHints.forEach(el => el.style.opacity = "0");
    window.removeEventListener("scroll", hideScrollHints);
  }

  window.addEventListener("scroll", hideScrollHints, { passive: true });

  /* ---------------------------------------------------------
      RANDOM ROTATION FOR SCATTER PHOTOS
  ----------------------------------------------------------- */
  document.querySelectorAll(".photo, .video").forEach(el => {
    const r = (Math.random() * 1).toFixed(2);
    el.style.setProperty("--r", r);
  });

});
