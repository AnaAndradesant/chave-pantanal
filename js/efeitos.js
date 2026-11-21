(function () {
  const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Revelar ao rolar (com atraso escalonado) */
  const alvos = document.querySelectorAll(".revela, .chave > *, .grupo-com > .linha");
  alvos.forEach((n, i) => { n.classList.add("revela"); n.style.setProperty("--d", (i % 6) * 70 + "ms"); });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visto"); io.unobserve(e.target); } }), { threshold: .12 });
  alvos.forEach(n => io.observe(n));

  /* Holofote que segue o mouse nos blocos */
  document.addEventListener("pointermove", e => {
    const b = e.target.closest(".bloco, .regra");
    if (!b) return;
    const r = b.getBoundingClientRect();
    b.style.setProperty("--mx", (e.clientX - r.left) + "px");
    b.style.setProperty("--my", (e.clientY - r.top) + "px");
  });

  /* Contadores do hero */
  document.querySelectorAll("[data-n]").forEach(el => {
    const fim = +el.dataset.n, dur = reduz ? 0 : 1200;
    setTimeout(() => {
      const t0 = performance.now();
      const passo = t => { const p = dur ? Math.min(1, (t - t0) / dur) : 1; el.textContent = Math.round(fim * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(passo); };
      requestAnimationFrame(passo);
    }, 500);
  });

  /* Parallax do hero e nav com fundo ao rolar */
  const bg = document.querySelector(".hero-bg"), nav = document.querySelector(".nav");
  addEventListener("scroll", () => {
    const y = scrollY;
    if (!reduz && bg && y < innerHeight * 1.2) bg.style.transform = `translateY(${y * 0.35}px) scale(${1.08 + y * 0.0002})`;
    nav.classList.toggle("solida", y > 40);
  }, { passive: true });

  /* Inclinação 3D leve nas imagens do painel */
  document.addEventListener("pointermove", e => {
    const f = e.target.closest(".fig.planet, .fig.unica");
    if (!f || reduz) return;
    const r = f.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    f.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
  });
  document.addEventListener("pointerout", e => { const f = e.target.closest && e.target.closest(".fig"); if (f && !f.contains(e.relatedTarget)) f.style.transform = ""; });
})();
