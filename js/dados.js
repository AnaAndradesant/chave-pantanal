/* =========================================================
   DADOS DA CHAVE — é aqui que você edita o conteúdo do site.

   EXEMPLOS: casos reais (do material "Regras de mapeamento 2026").
   Cada exemplo usa imagens da pasta /imagens:
     antes / depois  → recortes Sentinel do mesmo lugar (viram o comparador deslizante)
     imagem          → uma imagem única (quando não há par antes/depois)
     planet          → faixa com a série Planet
   Os blocos do fluxograma apontam para os exemplos pelo id.
   ========================================================= */

const EXEMPLOS = {
  p28: {
    titulo: "Maquinário progredindo em pouco tempo",
    classe: "sup", slide: 28, coord: "-16.888249, -58.116290",
    texto: "Inserido como supressão porque o solo ficou exposto, com marcas de maquinário progredindo em pouco tempo.",
    antes: { src: "p28_s_antes.jpg", rotulo: "Sentinel-2 2025" },
    depois: { src: "p28_s_depois.jpg", rotulo: "Sentinel-2 2026" },
    planet: { src: "p28_planet.jpg", rotulo: "Planet set → out → nov/2025" }
  },
  p32: {
    titulo: "Sinais de maquinário: com ou sem solo exposto",
    classe: null, slide: 32, coord: "-19.681881, -57.862546",
    texto: "Sinais de maquinário sem raspar a vegetação, sem de fato ver o solo exposto: DEGRADAÇÃO. Limpeza mecanizada mais intensa, raspando a vegetação rente ao solo e deixando o solo exposto: SUPRESSÃO.",
    imagem: { src: "p32_img.jpg", rotulo: "Planet · as duas situações na mesma cena" }
  },
  p35: {
    titulo: "Herbácea com solo exposto evidente",
    classe: "sup", slide: 35, tile: "021015", coord: "-18.935588, -55.507782",
    texto: "Limpeza mecanizada em herbácea com solo exposto evidente, tanto na data de supressão como na de detecção (Sentinel). Alta intensidade de solo exposto.",
    imagem: { src: "p35_s_comp.jpg", rotulo: "Sentinel-2 2025 (esq.) | 2026 (dir., área em vermelho)" },
    planet: { src: "p35_planet.jpg", rotulo: "Planet out/2025 → nov/2025 → jan/2026" }
  },
  p34: {
    titulo: "Herbácea com maquinário, sem solo exposto",
    classe: "deg", slide: 34, tile: "020026", coord: "-19.397656, -56.047377",
    texto: "Sinais de maquinário, sem solo exposto na data de detecção. Limpeza em herbácea que provavelmente vai se recuperar até o PRODES 2027.",
    antes: { src: "p34_s_antes.jpg", rotulo: "Sentinel-2 2025" },
    depois: { src: "p34_s_depois.jpg", rotulo: "Sentinel-2 2026" },
    planet: { src: "p34_planet.jpg", rotulo: "Planet 07/2025 → 07/2026 → 08/2026" }
  },
  p37: {
    titulo: "Limpeza mecanizada não tão intensa",
    classe: "deg", slide: 37, tile: "020026", coord: "-19.355095, -55.965900",
    texto: "Limpeza mecanizada não tão intensa, com baixa a média intensidade de solo exposto. Decisão: não inserir, considerado degradação.",
    antes: { src: "p37_s_antes.jpg", rotulo: "Sentinel-2 2025" },
    depois: { src: "p37_s_depois.jpg", rotulo: "Sentinel-2 2026" },
    planet: { src: "p37_planet.jpg", rotulo: "Planet jul/2025 → mar → jul/2026" }
  },
  p45: {
    titulo: "Arbustos removidos, regeneração parcial",
    classe: null, slide: 45, tile: "021023", coord: "-16.41842, -55.45102",
    texto: "Limpeza mecanizada removendo arbustos, com solo exposto na data de supressão (DETER) e forma sutil na Sentinel na data de detecção. Caso levado como dúvida.",
    antes: { src: "p45_s_antes.jpg", rotulo: "Sentinel-2 2025" },
    depois: { src: "p45_s_depois.jpg", rotulo: "Sentinel-2 2026" },
    planet: { src: "p45_planet.jpg", rotulo: "Planet ago/2025 → 10/2025 → 07/2026" }
  },
  p41: {
    titulo: "Herbácea + arbustos com solo exposto",
    classe: "sup", slide: 41, tile: "018023", coord: "-16.379297, -57.918574",
    texto: "Limpeza mecanizada intensa no estrato herbáceo e arbustivo, mantendo alguns indivíduos arbóreos. Supressão por mecanização com solo exposto.",
    antes: { src: "p41_s_antes.jpg", rotulo: "Sentinel-2 2025" },
    depois: { src: "p41_s_depois.jpg", rotulo: "Sentinel-2 2026" },
    planet: { src: "p41_planet.jpg", rotulo: "Planet 07/2025 → 11/2025 → 12/2026" }
  },
  p43: {
    titulo: "Limpeza moderada, pouco solo exposto",
    classe: "deg", slide: 43, tile: "019024", coord: "-17.73186, -56.91544",
    texto: "Limpeza mecanizada moderada, com pouco formato geométrico. Degradação: não ficou tão solo exposto nem na Planet nem na Sentinel.",
    antes: { src: "p43_s_antes.jpg", rotulo: "Sentinel-2 2025" },
    depois: { src: "p43_s_depois.jpg", rotulo: "Sentinel-2 2026" },
    planet: { src: "p43_planet.jpg", rotulo: "Planet mar → mai/2026" }
  },
  p23: {
    titulo: "Remoção arbórea sem solo exposto na detecção",
    classe: "sup", slide: 23, tile: "020026", coord: "-19.193397, -56.346679",
    texto: "Desmatamento em arbórea/arbustiva mantendo alguns indivíduos. Sem solo exposto na data de detecção, mas com solo exposto em 12/2025 e remoção arbórea.",
    antes: { src: "p23_s_antes.jpg", rotulo: "Sentinel-2 07/2025" },
    depois: { src: "p23_s_depois.jpg", rotulo: "Sentinel-2 07/2026" },
    planet: { src: "p23_planet.jpg", rotulo: "Planet 07/2025 · 12/2025 · 01/2026 · 07/2026" }
  },
  p38: {
    titulo: "Arbustos e arbóreas removidos, herbácea mantida",
    classe: "sup", slide: 38, tile: "019023", coord: "-16.539021, -56.875947",
    texto: "Limpeza mecanizada removendo arbustos, sem solo exposto e com forma sutil na Sentinel. Supressão por causa da remoção de arbustos e arbóreas; ficaram só as herbáceas.",
    antes: { src: "p38_s_antes.jpg", rotulo: "Sentinel-2 2025" },
    depois: { src: "p38_s_depois.jpg", rotulo: "Sentinel-2 2026" },
    planet: { src: "p38_planet.jpg", rotulo: "Planet ago/2024 → 06/2026 → jul/2026" }
  },
  p36: {
    titulo: "Remoção dos três estratos com leiras",
    classe: "sup", slide: 36, tile: "020025", coord: "-18.258884, -55.784167",
    texto: "Local com evidência de maquinário em curto intervalo de tempo, com solo bem exposto e leiras aparentes na data de detecção.",
    antes: { src: "p36_s_antes.jpg", rotulo: "Sentinel-2 2025" },
    depois: { src: "p36_s_depois.jpg", rotulo: "Sentinel-2 2026" },
    planet: { src: "p36_planet.jpg", rotulo: "Planet mai/2026 → jul/2026 → jul/2026 (leiras)" }
  },
  p39: {
    titulo: "Limpeza para inserir pasto exótico",
    classe: "sup", slide: 39, tile: "020026", coord: "-19.30360, -56.02365",
    texto: "Limpeza mecanizada intensa com regeneração quase completa na data de detecção, possivelmente pasto exótico. Supressão pelo solo exposto em meses anteriores e sinais de pasto exótico.",
    antes: { src: "p39_s_antes.jpg", rotulo: "Sentinel-2 2024" },
    depois: { src: "p39_s_depois.jpg", rotulo: "Sentinel-2 2025" },
    planet: { src: "p39_planet.jpg", rotulo: "Planet set/2024 → nov/2024 → jul/2026" }
  },
  p26: {
    titulo: "Verde brilhante (desmat_veg) após limpeza",
    classe: "sup", slide: 26, tile: "020027", coord: "-20.135098, -56.007666",
    texto: "Limpeza mecanizada intensa, sem solo exposto aparente na data de detecção, mas com sinais de desmat_veg brilhante evidente: inserir como supressão.",
    antes: { src: "p26_s_antes.jpg", rotulo: "Sentinel-2 2024" },
    depois: { src: "p26_s_depois.jpg", rotulo: "Sentinel-2 2025" },
    planet: { src: "p26_planet.jpg", rotulo: "Planet 08/25 → 09/25 → 07/26" }
  }
};

const PASSOS = [
  {
    id: "passo1",
    titulo: "Passo 1 · Confirme que houve remoção",
    sub: "Faixas em linha reta que avançam em intervalo curto (Planet mês a mês, Sentinel a cada poucos dias)",
    exemplos: ["p28"]
  },
  {
    id: "passo2",
    titulo: "Passo 2 · Quais estratos foram removidos? Siga a linha correspondente abaixo",
    sub: "Confirme se houve remoção de um dos estratos: herbácea, arbustos e arbóreas, na Planet ou em alta resolução",
    exemplos: ["p35", "p41", "p38", "p23"]
  }
];

/* Classes finais */
const CLASSES = {
  sup: { nome: "Supressão", tipo: "sup" },
  deg: { nome: "Degradação", tipo: "deg" },
  man: { nome: "Manejo ou degradação", tipo: "deg" }
};

/* Pergunta sobre mecanização: mostra o slide 32 */
const EX_MECANIZACAO = ["p32"];

/* Linhas do fluxograma. "ex" indica os exemplos de cada caixa de classe. */
const LINHAS = [
  {
    id: "herb", estrato: "Só herbácea", sub: "gramíneas e ervas", grupo: "sem",
    principal: "p35",
    perguntas: [
      { texto: "Solo exposto visível na Sentinel do ano?", simRotulo: "sim", naoRotulo: "não",
        nao: { classe: "deg", obs: "pode ser manejo", ex: ["p34"] } },
      { texto: "Identificou limpeza mecanizada intensa?",
        sim: { classe: "sup", obs: "com limpeza intensa", ex: ["p35"] },
        nao: { classe: "man", obs: "", ex: ["p37"] } }
    ]
  },
  {
    id: "arb", estrato: "Só arbustos", sub: "vegetação lenhosa baixa", grupo: "sem",
    perguntas: [
      { texto: "Quanto de solo ficou exposto?", simRotulo: "muito", naoRotulo: "pouco",
        nao: { classe: "deg", obs: "solo pouco exposto", ex: ["p45"] } },
      { texto: "Identificou limpeza mecanizada intensa?",
        sim: { classe: "sup", obs: "com limpeza intensa", ex: ["p45"] },
        nao: { classe: "deg", obs: "sem limpeza intensa", ex: ["p45"] } }
    ]
  },
  {
    id: "herbarb", estrato: "Herbácea + arbustos", sub: "árvores mantidas", grupo: "sem",
    perguntas: [
      { texto: "Quanto de solo ficou exposto?", simRotulo: "muito", naoRotulo: "pouco",
        nao: { classe: "deg", obs: "solo pouco exposto", ex: ["p43"] } },
      { texto: "Identificou limpeza mecanizada intensa?",
        sim: { classe: "sup", obs: "com limpeza intensa", ex: ["p41"] },
        nao: { classe: "deg", obs: "sem limpeza intensa", ex: ["p43"] } }
    ]
  },
  {
    id: "arbo", estrato: "Só arbóreas", sub: "demais estratos mantidos", grupo: "com",
    rotulo: "qualquer tonalidade de solo", direto: { classe: "sup", obs: "independe do tom do solo", ex: ["p23"] }
  },
  {
    id: "arbarbo", estrato: "Arbustos + arbóreas", sub: "estratos lenhosos", grupo: "com",
    rotulo: "solo muito ou pouco exposto", direto: { classe: "sup", obs: "independe do solo", ex: ["p38"] }
  },
  {
    id: "tres", estrato: "Os três estratos", sub: "remoção completa", grupo: "com",
    rotulo: "qualquer nível de solo exposto", direto: { classe: "sup", obs: "independe do solo", ex: ["p36"] }
  }
];

const NOTA_POLIGONO = "Forma do polígono (arbóreas/arbustivas): mapear só onde havia vegetação arbórea na imagem do ano anterior";

const PASTO = {
  id: "pasto",
  titulo: "Regra à parte · Pasto exótico plantado: sempre classificar como SUPRESSÃO",
  texto: "Para confirmar esse uso, verificar evidências de limpeza mecanizada intensa para semeadura, seguida de tonalidade verde-limão brilhante e formato geométrico da área.",
  exemplos: ["p39", "p26"]
};

const FONTE = "Regras de mapeamento PRODES Pantanal 2026";
