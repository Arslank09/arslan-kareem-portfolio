(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- Loader ---------------- */
  const loader = document.getElementById("loader");
  const bar = document.getElementById("loaderBar");
  const count = document.getElementById("loaderCount");
  const minDuration = reduceMotion ? 300 : 1600;
  const start = performance.now();
  let pageLoaded = false;
  window.addEventListener("load", () => (pageLoaded = true));

  function tickLoader(now) {
    const t = Math.min((now - start) / minDuration, 1);
    // hold at 90% until the page has actually finished loading
    const pct = Math.round((pageLoaded ? t : Math.min(t, 0.9)) * 100);
    bar.style.width = pct + "%";
    count.textContent = pct + "%";
    if (pct < 100) return requestAnimationFrame(tickLoader);
    setTimeout(() => {
      loader.classList.add("is-done");
      document.body.classList.remove("is-loading");
      revealHero();
    }, 200);
    setTimeout(() => loader.remove(), 1300);
  }
  requestAnimationFrame(tickLoader);

  function revealHero() {
    document.querySelectorAll(".hero .reveal").forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------------- Reveal on scroll ---------------- */
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---------------- Count-up stats ---------------- */
  const statIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const dur = reduceMotion ? 0 : 1200;
      const t0 = performance.now();
      const step = (now) => {
        const p = dur ? Math.min((now - t0) / dur, 1) : 1;
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + (p === 1 ? el.dataset.suffix || "" : "");
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      statIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll("[data-count]").forEach((el) => statIO.observe(el));

  /* ---------------- Nav state ---------------- */
  const nav = document.getElementById("nav");
  const links = [...document.querySelectorAll(".nav__links a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href")));

  function updateNav() {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
    const mid = window.innerHeight * 0.4;
    let active = -1;
    sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= mid) active = i; });
    links.forEach((a, i) => a.classList.toggle("is-active", i === active));
  }

  /* ---------------- Parallax ---------------- */
  const yLayers = [...document.querySelectorAll("[data-speed]")];
  const xLayers = [...document.querySelectorAll("[data-speed-x]")];

  function parallax() {
    const y = window.scrollY;
    yLayers.forEach((el) => {
      el.style.transform = `translate3d(0, ${y * parseFloat(el.dataset.speed)}px, 0)`;
    });
    xLayers.forEach((el) => {
      const rect = el.parentElement.getBoundingClientRect();
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2; // 0 when centred
      el.style.transform = `translate3d(${offset * parseFloat(el.dataset.speedX)}px, 0, 0)`;
    });
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateNav();
      if (!reduceMotion) parallax();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();
