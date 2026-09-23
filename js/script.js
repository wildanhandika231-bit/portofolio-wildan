(() => {
  const root = document.documentElement;
  const motion = root.classList.contains("js-anim");
  const $ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* progress bar scroll */
  const bar = document.querySelector(".progress");
  const onScroll = () => {
    const h = root.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* menu aktif sesuai bagian yang sedang dibaca */
  const links = $(".nav-links a");
  const spy = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $("section[id]").forEach((sec) => spy.observe(sec));

  /* gelombang sinyal (gambar statis, bergerak kalau animasi aktif) */
  const wave = (amp, period) => {
    let d = `M0 60 Q${period / 4} ${60 - amp} ${period / 2} 60`;
    for (let i = 2; i <= 1800 / (period / 2); i++) d += ` T${(i * period) / 2} 60`;
    return d;
  };
  const paths = $(".wave path");
  paths[0].setAttribute("d", wave(34, 200));
  paths[1].setAttribute("d", wave(20, 150));

  if (!motion) return;

  /* cahaya hijau mengikuti kursor di hero */
  const hero = document.getElementById("beranda");
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", e.clientX - r.left + "px");
    hero.style.setProperty("--my", e.clientY - r.top + "px");
  });

  /* teks peran diketik bergantian */
  const role = document.querySelector(".hero-role");
  const lines = [
    role.textContent,
    "sistem monitoring dan instrumentasi berbasis sensor",
    "otomasi industri: SCADA, PLC, dan DCS",
    "tertarik di transmisi siaran dan operasional teknis",
  ];
  role.textContent = "";
  role.classList.add("typing");
  let li = 0, ci = 0, del = false;
  const tick = () => {
    const line = lines[li];
    ci += del ? -1 : 1;
    role.textContent = line.slice(0, ci);
    let wait = del ? 22 : 48;
    if (!del && ci === line.length) { del = true; wait = 1900; }
    else if (del && ci === 0) { del = false; li = (li + 1) % lines.length; wait = 350; }
    setTimeout(tick, wait);
  };
  setTimeout(tick, 800);

  /* angka IPK naik dari 0 */
  const countUp = (n) => {
    const to = parseFloat(n.dataset.count), t0 = performance.now();
    const f = (t) => {
      const k = Math.min((t - t0) / 1200, 1);
      n.textContent = (to * (1 - Math.pow(1 - k, 3))).toFixed(2);
      if (k < 1) requestAnimationFrame(f);
    };
    f(t0);
  };

  /* muncul pelan-pelan saat di-scroll */
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
