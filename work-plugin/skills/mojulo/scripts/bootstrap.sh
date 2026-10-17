#!/usr/bin/env bash
set -euo pipefail

WORKSPACE="${1:-$PWD}"
if [ "$#" -gt 0 ]; then shift; fi
MODE="reuse"
REQUESTED=""
case "${1:-}" in
  "") ;;
  --upgrade) MODE="latest"; shift ;;
  --version) MODE="exact"; REQUESTED="${2:-}"; [ "$#" -ge 2 ] || { echo "--version needs an exact version." >&2; exit 2; }; shift 2 ;;
  *) echo "Usage: bootstrap.sh [workspace] [--upgrade | --version X.Y.Z]" >&2; exit 2 ;;
esac
[ "$#" -eq 0 ] || { echo "Unexpected bootstrap arguments." >&2; exit 2; }

RUNTIME="$WORKSPACE/.mojulo-runtime"
STATE="$WORKSPACE/.mojulo"
BIN="$RUNTIME/bin"
MOJULO_BIN="$RUNTIME/node_modules/.bin/mojulo"

command -v node >/dev/null 2>&1 || { echo "Mojulo requires Node >=22.14; node was not found." >&2; exit 2; }
command -v npm >/dev/null 2>&1 || { echo "Mojulo bootstrap requires npm; npm was not found." >&2; exit 2; }
NODE_VERSION="$(node -p "process.versions.node")"
node -e 'const [a,b]=process.versions.node.split(".").map(Number); if(a<22 || (a===22 && b<14)) process.exit(1)' || {
  echo "Mojulo requires Node >=22.14; found $NODE_VERSION." >&2; exit 2
}
valid_version() {
  node -e 'if(!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(process.argv[1])) process.exit(1)' "$1"
}
installed_version() {
  [ -x "$MOJULO_BIN" ] || return 1
  local output
  output="$("$MOJULO_BIN" --version 2>/dev/null)" || return 1
  printf '%s\n' "${output#mojulo }"
}
CURRENT="$(installed_version || true)"
SOURCE="existing"
if [ "$MODE" = exact ]; then
  valid_version "$REQUESTED" || { echo "Expected an exact Mojulo version, got: $REQUESTED" >&2; exit 2; }
  TARGET="$REQUESTED"
  SOURCE="explicit"
elif [ "$MODE" = latest ] || [ -z "$CURRENT" ]; then
  # Resolve once, then install exactly that release and retain npm's lockfile.
  TARGET="$(npm view mojulo@latest version --json | node -e 'let s="";process.stdin.on("data",x=>s+=x);process.stdin.on("end",()=>{const v=JSON.parse(s);if(typeof v!=="string")process.exit(1);process.stdout.write(v)})')"
  valid_version "$TARGET" || { echo "npm latest did not resolve to an exact version." >&2; exit 3; }
  SOURCE="npm:latest"
else
  TARGET="$CURRENT"
  valid_version "$TARGET" || { echo "Existing Mojulo version is invalid: $TARGET" >&2; exit 3; }
fi

mkdir -p "$RUNTIME" "$STATE" "$BIN"
if [ "$CURRENT" != "$TARGET" ]; then
  echo "Installing Mojulo $TARGET ($SOURCE) in the workspace-local runtime."
  npm install --prefix "$RUNTIME" --no-audit --no-fund --save-exact "mojulo@$TARGET"
fi
INSTALLED="$(installed_version || true)"
[ "$INSTALLED" = "$TARGET" ] || { echo "Expected mojulo $TARGET but installed ${INSTALLED:-unknown}." >&2; exit 3; }

# Shell-quote absolute paths so spaces, quotes and dollar signs survive the launcher.
node - "$MOJULO_BIN" "$STATE" "$BIN/mojulo-work" <<'NODE'
const fs = require('fs'), path = require('path');
const [bin, state, launcher] = process.argv.slice(2).map(x => path.resolve(x));
const quote = x => "'" + x.replace(/'/g, "'\\''") + "'";
fs.writeFileSync(launcher, '#!/usr/bin/env bash\nset -euo pipefail\nexport MOJULO_HOME=' + quote(state) + '\nexport MOJULO_SURFACE="box"\nexec ' + quote(bin) + ' "$@"\n', {mode: 0o755});
fs.chmodSync(launcher, 0o755);
NODE
if [ "$CURRENT" != "$TARGET" ] || [ ! -f "$RUNTIME/mojulo-version.json" ]; then
  node - "$RUNTIME/mojulo-version.json" "$INSTALLED" "$SOURCE" <<'NODE'
const fs = require('fs');
fs.writeFileSync(process.argv[2], JSON.stringify({version:process.argv[3], selectedFrom:process.argv[4], recordedAt:new Date().toISOString()}, null, 2) + '\n');
NODE
fi

echo "Mojulo $INSTALLED ready"
echo "launcher=$BIN/mojulo-work"
echo "MOJULO_HOME=$STATE"
