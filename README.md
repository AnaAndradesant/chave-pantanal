# Chave de Interpretação · PRODES Pantanal

Site estático: fluxograma Supressão × Degradação. Ao clicar num bloco, aparece a feição com comparador antes/depois.

## Estrutura
- `index.html`: a página
- `js/dados.js`: **todo o conteúdo** (textos, regras, fitofisionomias, nomes das imagens). É aqui que se edita.
- `js/app.js`: monta o fluxograma e os cliques
- `css/estilo.css`: cores e fontes
- `imagens/`: recortes Sentinel e Planet dos exemplos (slides 23 a 45 do material de regras 2026). Para adicionar um exemplo: coloque as imagens aqui e crie uma entrada em `EXEMPLOS` no `js/dados.js`; depois aponte o bloco para ela no campo `ex`.

## Publicar no GitHub Pages
1. Crie um repositório público (ex.: `chave-pantanal`).
2. "uploading an existing file" → arraste o conteúdo desta pasta → Commit changes.
3. Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.
4. Em 1–2 min: `https://SEU-USUARIO.github.io/chave-pantanal/`

## Editar depois
Abra o arquivo no GitHub, clique no lápis, altere e faça Commit. Para imagens: Add file → Upload files dentro de `imagens/`, com o mesmo nome.

