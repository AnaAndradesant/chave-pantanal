(function () {
  const IMG = window.IMG_BASE || "imagens/";
  const raiz = document.getElementById("chave-root");
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  /* ---------- blocos ---------- */
  function bloco(cls, titulo, sub, alvo) {
    const b = el("button", "bloco " + cls, `<b>${titulo}</b>${sub ? `<small>${sub}</small>` : ""}`);
    b.type = "button";
    b.addEventListener("click", (ev) => { ev.stopPropagation(); abrir(alvo, b); });
    return b;
  }
  function blocoClasse(r, linha, row) {
    const c = CLASSES[r.classe];
    return bloco("c " + c.tipo, c.nome, r.obs, {
      titulo: `${linha.estrato} → ${c.nome}${r.obs ? " (" + r.obs + ")" : ""}`,
      exemplos: r.ex, container: row
    });
  }
  const seta = () => el("div", "seta");
  const ramo = (r, b) => { const d = el("div", "ramo"); d.append(el("span", "r", r), b); return d; };
  const exemplosDaLinha = l => [...new Set([l.principal || [], l.direto ? l.direto.ex : [l.perguntas[0].nao.ex, l.perguntas[1].sim.ex, l.perguntas[1].nao.ex]].flat(2))];

  /* ---------- montagem ---------- */
  PASSOS.forEach(p => {
    raiz.append(bloco("passo", p.titulo, p.sub, { titulo: p.titulo.split("·")[1].trim(), exemplos: p.exemplos }));
    raiz.append(seta());
  });
  raiz.append(el("div", "cabec", "<span>Se removeu…</span><span>Passo 3 · Responda às perguntas</span><span>Passo 4 · Classe</span>"));
  LINHAS.filter(l => l.grupo === "sem").forEach(l => raiz.append(linhaPerguntas(l)));
  const grupo = el("div", "grupo-com");
  LINHAS.filter(l => l.grupo === "com").forEach(l => grupo.append(linhaDireta(l)));
  grupo.append(el("p", "nota", NOTA_POLIGONO));
  raiz.append(grupo);
  raiz.append(bloco("pasto", PASTO.titulo, PASTO.texto, { titulo: "Pasto exótico plantado", exemplos: PASTO.exemplos }));

  function linhaPerguntas(l) {
    const row = el("div", "linha");
    const c1 = el("div", "col"), c2 = el("div", "col"), c3 = el("div", "col");
    const [q1, q2] = l.perguntas;
    c1.append(bloco("", l.estrato, l.sub, { titulo: l.estrato, exemplos: exemplosDaLinha(l), container: row }));
    c2.append(bloco("q", q1.texto, "", { titulo: q1.texto, exemplos: exemplosDaLinha(l), container: row }));
    c2.append(el("p", "rotulo", "↓ " + q1.simRotulo));
    c2.append(bloco("q", q2.texto, "", { titulo: q2.texto, exemplos: EX_MECANIZACAO.concat(q2.sim.ex, q2.nao.ex), container: row }));
    c3.append(ramo(q1.naoRotulo, blocoClasse(q1.nao, l, row)));
    c3.append(ramo("sim", blocoClasse(q2.sim, l, row)));
    c3.append(ramo("não", blocoClasse(q2.nao, l, row)));
    row.append(c1, c2, c3);
    return row;
  }
  function linhaDireta(l) {
    const row = el("div", "linha direta");
    const c1 = el("div", "col"), c2 = el("div", "col meio"), c3 = el("div", "col");
    c1.append(bloco("", l.estrato, l.sub, { titulo: l.estrato, exemplos: l.direto.ex, container: row }));
    c2.append(el("div", "fio", l.rotulo));
    c3.append(blocoClasse(l.direto, l, row));
    row.append(c1, c2, c3);
    return row;
  }

  /* ---------- painel ---------- */
  let painel = null;
  function limpar() {
    painel && painel.remove(); painel = null;
    raiz.classList.remove("foco");
    raiz.querySelectorAll(".ativa,.sel").forEach(n => n.classList.remove("ativa", "sel"));
  }

  function abrir(alvo, botao) {
    if (botao.classList.contains("sel")) { limpar(); return; }
    limpar();
    raiz.classList.add("foco");
    botao.classList.add("sel");
    (alvo.container || botao).classList.add("ativa");

    const ids = [...new Set(alvo.exemplos || [])].filter(id => EXEMPLOS[id]);
    painel = el("section", "painel");
    painel.setAttribute("aria-live", "polite");
    const fechar = el("button", "fechar", "✕"); fechar.type = "button"; fechar.setAttribute("aria-label", "Fechar");
    fechar.addEventListener("click", e => { e.stopPropagation(); limpar(); });
    painel.addEventListener("click", e => e.stopPropagation());

    const cab = el("div", "p-cab");
    cab.append(el("p", "eyebrow", "Feição na imagem"), el("h2", "p-titulo", alvo.titulo));
    painel.append(fechar, cab);

    if (!ids.length) {
      painel.append(el("p", "p-vazio", "Ainda não há exemplo no material para este caso. Adicione um em <code>js/dados.js</code>."));
    } else {
      const abas = el("div", "abas");
      const corpo = el("div", "p-corpo");
      ids.forEach((id, i) => {
        const ex = EXEMPLOS[id];
        const a = el("button", "aba" + (i ? "" : " on"), `<span class="dot ${ex.classe || "q"}"></span>${ex.titulo}`);
        a.type = "button";
        a.addEventListener("click", () => { abas.querySelectorAll(".aba").forEach(x => x.classList.remove("on")); a.classList.add("on"); mostrar(corpo, ex); });
        abas.append(a);
      });
      if (ids.length > 1) painel.append(abas);
      painel.append(corpo);
      mostrar(corpo, EXEMPLOS[ids[0]]);
    }

    if (alvo.container) alvo.container.append(painel); else botao.after(painel);
    requestAnimationFrame(() => painel.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  }

  function mostrar(corpo, ex) {
    corpo.innerHTML = "";
    const vis = el("div", "p-vis");
    if (ex.antes && ex.depois) vis.append(comparador(ex.antes, ex.depois));
    else if (ex.imagem) vis.append(figura(ex.imagem, "unica"));
    if (ex.planet) vis.append(figura(ex.planet, "planet"));

    const ficha = el("div", "ficha");
    if (ex.classe) { const c = CLASSES[ex.classe]; ficha.append(el("span", "chip " + c.tipo, "Decisão: " + c.nome)); }
    else ficha.append(el("span", "chip", "Caso de referência / dúvida"));
    ficha.append(el("h3", "nome", ex.titulo), el("p", "desc", ex.texto));
    const meta = el("dl", "meta");
    meta.innerHTML = (ex.tile ? `<dt>Tile</dt><dd>${ex.tile}</dd>` : "") + `<dt>Coordenada</dt><dd>${ex.coord}</dd><dt>Fonte</dt><dd>${FONTE}, slide ${ex.slide}</dd>`;
    ficha.append(meta);
    if (ex.antes && ex.depois) ficha.append(el("p", "dica", "↔ Arraste a barra sobre a imagem para comparar as datas da Sentinel."));
    corpo.append(vis, ficha);
  }

  function figura(f, cls) {
    const fig = el("figure", "fig " + cls);
    const img = el("img"); img.src = IMG + f.src; img.alt = f.rotulo; img.loading = "lazy";
    img.addEventListener("click", () => zoom(f));
    fig.append(img, el("figcaption", "", f.rotulo + ' <span class="lupa">⤢ ampliar</span>'));
    return fig;
  }

  function comparador(a, d) {
    const wrap = el("figure", "fig");
    const box = el("div", "comparador");
    box.innerHTML = `
      <div class="img-wrap depois"><img src="${IMG}${d.src}" alt="${d.rotulo}"><span class="tag">${d.rotulo}</span></div>
      <div class="img-wrap antes"><img src="${IMG}${a.src}" alt="${a.rotulo}"><span class="tag">${a.rotulo}</span></div>
      <input class="slider" type="range" min="0" max="100" value="50" aria-label="Comparar ${a.rotulo} e ${d.rotulo}">
      <div class="divisor"><span>⇆</span></div>`;
    const s = box.querySelector(".slider"), antes = box.querySelector(".antes"), div = box.querySelector(".divisor");
    const set = v => { antes.style.clipPath = `inset(0 ${100 - v}% 0 0)`; div.style.left = v + "%"; };
    s.addEventListener("input", () => set(s.value)); set(50);
    wrap.append(box, el("figcaption", "", `Sentinel · ${a.rotulo.replace("Sentinel-2 ", "")} ↔ ${d.rotulo.replace("Sentinel-2 ", "")}`));
    return wrap;
  }

  /* ---------- zoom ---------- */
  const lb = el("div", "lightbox"); lb.innerHTML = '<img alt=""><p></p>'; document.body.append(lb);
  lb.addEventListener("click", e => { e.stopPropagation(); lb.classList.remove("on"); });
  function zoom(f) { lb.querySelector("img").src = IMG + f.src; lb.querySelector("p").textContent = f.rotulo; lb.classList.add("on"); }

  document.addEventListener("click", limpar);
  document.addEventListener("keydown", e => { if (e.key === "Escape") { if (lb.classList.contains("on")) lb.classList.remove("on"); else limpar(); } });
})();
