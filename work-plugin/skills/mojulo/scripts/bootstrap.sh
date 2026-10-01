#!/usr/bin/env bash
set -euo pipefail

WORKSPACE="${1:-$PWD}"
RUNTIME="$WORKSPACE/.mojulo-runtime"
STATE="$WORKSPACE/.mojulo"
BIN="$RUNTIME/bin"
PACKAGE_VERSION="3.0.0"

command -v node >/dev/null 2>&1 || { echo "Mojulo requires Node >=22.14; node was not found." >&2; exit 2; }
command -v npm >/dev/null 2>&1 || { echo "Mojulo bootstrap requires npm; npm was not found." >&2; exit 2; }

NODE_VERSION="$(node -p "process.versions.node")"
node -e "const [a,b]=process.versions.node.split('.').map(Number); if (a<22 || (a===22 && b<14)) process.exit(1)" || {
  echo "Mojulo requires Node >=22.14; found $NODE_VERSION." >&2
  exit 2
}

mkdir -p "$RUNTIME" "$STATE" "$BIN"

if [ ! -x "$RUNTIME/node_modules/.bin/mojulo" ]; then
  npm install --prefix "$RUNTIME" --no-audit --no-fund --save-exact "mojulo@$PACKAGE_VERSION"
fi

INSTALLED="$("$RUNTIME/node_modules/.bin/mojulo" --version)"
if [ "$INSTALLED" != "$PACKAGE_VERSION" ]; then
  echo "Expected mojulo $PACKAGE_VERSION but installed $INSTALLED." >&2
  exit 3
fi

cat > "$BIN/mojulo-work" <<EOF
#!/usr/bin/env bash
set -euo pipefail
export MOJULO_HOME="$STATE"
export MOJULO_SURFACE="box"
exec "$RUNTIME/node_modules/.bin/mojulo" "\$@"
EOF
chmod +x "$BIN/mojulo-work"

echo "Mojulo $INSTALLED ready"
echo "launcher=$BIN/mojulo-work"
echo "MOJULO_HOME=$STATE"
