(() => {
  const root = document.documentElement;
  const motion = root.classList.contains("js-anim");
  const $ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ─── 1. PROGRESS BAR SCROLL ─── */
  const bar = document.querySelector(".progress");
  const onScroll = () => {
    if (!bar) return;
    const h = root.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ─── 2. SCROLLSPY (MENU AKTIF SESUAI BAGIAN) ─── */
  const links = $(".nav-links a");
  const spy = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
      }
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $("section[id]").forEach((sec) => spy.observe(sec));

  /* ─── 3. GELOMBANG SINYAL SVG ─── */
  const wave = (amp, period) => {
    let d = `M0 60 Q${period / 4} ${60 - amp} ${period / 2} 60`;
    for (let i = 2; i <= 1800 / (period / 2); i++) d += ` T${(i * period) / 2} 60`;
    return d;
  };
  const paths = $(".wave path");
  if (paths.length >= 2) {
    paths[0].setAttribute("d", wave(34, 200));
    paths[1].setAttribute("d", wave(20, 150));
  }

  /* ─── 4. FITUR GANTI BAHASA (ID / EN) ─── */
  let currentLang = "id";
  const langToggleBtn = document.getElementById("lang-toggle");
  const langLabel = document.getElementById("lang-label");

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      currentLang = currentLang === "id" ? "en" : "id";
      if (langLabel) langLabel.textContent = currentLang === "id" ? "EN" : "ID";

      document.documentElement.lang = currentLang;

      // Reset animasi typing agar langsung ganti bahasa
      li = 0;
      ci = 0;
      del = false;

      // Update semua elemen statis dengan data-id & data-en
      $("[data-id][data-en]").forEach((el) => {
        const translation = el.getAttribute(`data-${currentLang}`);
        if (translation) el.innerText = translation;
      });
    });
  }

  /* ─── 5. ANIMASI (TYPEWRITER, MOUSE GLOW, COUNTER, REVEAL) ─── */
  if (!motion) return;

  // Cahaya kursor di section Hero
  const hero = document.getElementById("beranda");
  if (hero) {
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", e.clientX - r.left + "px");
      hero.style.setProperty("--my", e.clientY - r.top + "px");
    });
  }

  // Running Text / Typewriter (HANYA NAMA DAN INSTANSI)
  const role = document.querySelector(".hero-role");
  const linesData = {
    id: [
      "Muhammad Wildan Handika",
      "Politeknik Negeri Jakarta"
    ],
    en: [
      "Muhammad Wildan Handika",
      "Jakarta State Polytechnic"
    ]
  };

  let li = 0, ci = 0, del = false;

  if (role) {
    role.textContent = "";
    role.classList.add("typing");

    const tick = () => {
      const currentLines = linesData[currentLang];
      const line = currentLines[li % currentLines.length];

      ci += del ? -1 : 1;
      role.textContent = line.slice(0, ci);

      let wait = del ? 22 : 48;
      if (!del && ci === line.length) {
        del = true;
        wait = 1900;
      } else if (del && ci === 0) {
        del = false;
        li = (li + 1) % currentLines.length;
        wait = 350;
      }
      setTimeout(tick, wait);
    };
    setTimeout(tick, 800);
  }

  // Count Up IPK
  const countUp = (n) => {
    const to = parseFloat(n.dataset.count), t0 = performance.now();
    const f = (t) => {
      const k = Math.min((t - t0) / 1200, 1);
      n.textContent = (to * (1 - Math.pow(1 - k, 3))).toFixed(2);
      if (k < 1) requestAnimationFrame(f);
    };
    f(t0);
  };

  // Scroll Reveal Animations
  $(".label, .sub, .profile-grid > div, .tl-item, .skill-col, .project, .contact-head, .contact-email, .social").forEach((el) => {
    el.classList.add("reveal");
    const sibs = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    el.style.setProperty("--d", Math.min(sibs.indexOf(el) * 90, 360) + "ms");
  });

  const io = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
      $("[data-count]", e.target).forEach(countUp);
    }),
    { threshold: 0.15 }
  );

  $(".reveal").forEach((el) => io.observe(el));
})();
