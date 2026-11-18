#!/usr/bin/env bash
# Roda o Lighthouse (mobile, padrão) 3x por página e guarda a execução mediana (por Performance).
# Uso: migration/lighthouse.sh <baseUrl> <pastaSaida> [paginas...]
# Ex.: migration/lighthouse.sh https://uni-robots.github.io migration/baseline/lighthouse index equipe
set -euo pipefail

BASE="${1:?baseUrl}"; OUT="${2:?pastaSaida}"; shift 2
if [ $# -eq 0 ]; then PAGES=(index equipe); else PAGES=("$@"); fi
RUNS=3

# Usa o Chromium do Playwright se não houver CHROME_PATH definido.
if [ -z "${CHROME_PATH:-}" ]; then
  CHROME_PATH="$(ls -d "$HOME"/.cache/ms-playwright/chromium-*/chrome-linux64/chrome 2>/dev/null | sort -V | tail -1)"
  export CHROME_PATH
fi

mkdir -p "$OUT"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

OUT="$(cd "$OUT" && pwd)"
for page in "${PAGES[@]}"; do
  for i in $(seq 1 "$RUNS"); do
    # No WSL o chrome-launcher cria o perfil do Chrome numa pasta relativa com
    # nome de caminho do Windows; rodar dentro de $TMP faz o lixo ir junto no trap.
    (cd "$TMP" && npx -y lighthouse@13.6.0 "${BASE%/}/${page}.html" \
      --quiet --output=json --output-path="$TMP/${page}-${i}.json" \
      --chrome-flags="--headless=new --no-sandbox")
  done
  # Escolhe a execução mediana pelo score de Performance.
  node -e '
    const fs = require("fs");
    const [dir, page, runs, out] = process.argv.slice(1);
    const all = [...Array(+runs)].map((_, i) => {
      const f = `${dir}/${page}-${i + 1}.json`;
      return { f, score: JSON.parse(fs.readFileSync(f)).categories.performance.score };
    }).sort((a, b) => a.score - b.score);
    fs.copyFileSync(all[Math.floor(all.length / 2)].f, `${out}/${page}.json`);
    console.log(page, "scores:", all.map(r => Math.round(r.score * 100)).join(", "));
  ' "$TMP" "$page" "$RUNS" "$OUT"
done

# Resumo em Markdown.
node -e '
  const fs = require("fs");
  const [out, base, ...pages] = process.argv.slice(1);
  const rows = pages.map(p => {
    const r = JSON.parse(fs.readFileSync(`${out}/${p}.json`));
    const a = r.audits;
    return `| ${p} | ${Math.round(r.categories.performance.score * 100)} | ${a["first-contentful-paint"].displayValue} | ${a["largest-contentful-paint"].displayValue} | ${a["total-blocking-time"].displayValue} | ${a["cumulative-layout-shift"].displayValue} | ${Math.round(a["total-byte-weight"].numericValue / 1024)} KB |`;
  });
  fs.writeFileSync(`${out}/summary.md`, [
    `# Lighthouse (mobile, mediana de 3 execuções)`, ``,
    `Fonte: \`${base}\` — ${new Date().toISOString().slice(0, 10)}. Peso total = o que o Lighthouse baixa no carregamento inicial (sem rolar a página).`, ``,
    `| Página | Performance | FCP | LCP | TBT | CLS | Peso total |`,
    `|---|---:|---:|---:|---:|---:|---:|`, ...rows, ``].join("\n"));
' "$OUT" "$BASE" "${PAGES[@]}"
cat "$OUT/summary.md"
