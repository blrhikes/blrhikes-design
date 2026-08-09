#!/usr/bin/env bash
#
# The acceptance test for the React clone: its prerendered HTML has to diff
# clean against the Astro build of the same page.
#
#   scripts/diff-pages.sh              # every cloned page
#   scripts/diff-pages.sh event        # just this one
#   SKIP_BUILD=1 scripts/diff-pages.sh # reuse both builds (iterating on the
#                                      # normaliser rather than on the clone)
#
# Exit status is the number of pages that differ, so it can gate a commit.
#
# Modelled on ~/Projects/people/codeuncode/blip/main/scripts/diff-pages.sh,
# with one deliberate departure: blip pins its reference to a COMMIT, because
# it compares an app against its own past. This harness compares two renderers
# of the SAME working tree — the clone's whole job is to track the design repo
# as it is right now, so pinning would make it pass while being wrong. Both
# sides are therefore built fresh; `astro build` is under two seconds, so the
# cache blip needs buys nothing here.

set -euo pipefail

ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
CLONE="$ROOT/react"

# Every page the clone has translated. Add a page here AND to `prerender` in
# react/react-router.config.ts — a page missing from either is reported, not
# silently skipped.
# The showcase index is the empty string: `rel` below resolves it to
# `index.html` and `label` prints it as "/". Quote it — an unquoted empty
# element would vanish from the array.
DEFAULT_PAGES=(event "")

if [ "$#" -gt 0 ]; then
  PAGES=("$@")
else
  PAGES=("${DEFAULT_PAGES[@]}")
fi

say() { printf '\033[1m%s\033[0m\n' "$*"; }

if [ "${SKIP_BUILD:-}" != "1" ]; then
  say "Building the Astro reference"
  (cd "$ROOT" && ./node_modules/.bin/astro build >/dev/null)

  say "Building the React clone"
  (cd "$CLONE" && ./node_modules/.bin/react-router build >/dev/null 2>&1)
fi

REF_BUILD="$ROOT/dist"
CUR_BUILD="$CLONE/build/client"

# Whitespace matters only where something renders it preserved. Checked rather
# than assumed: if either side grows a <pre>, the page drops to a byte-for-byte
# text comparison instead of quietly comparing collapsed text.
# `<pre>` and `<textarea>` are NO LONGER here: the normaliser now preserves the
# text inside those elements exactly, element by element, so one textarea no
# longer forces a 2,800-line page to byte-compare (which the showcase index
# did, drowning every real finding in Astro's trailing-space formatting).
#
# What is left is the CSS route to preserved whitespace, which the normaliser
# cannot see because it does not read stylesheets. That stays page-wide,
# because a `white-space: pre` rule can apply to anything.
WS_SENSITIVE='whitespace-pre|white-space:[ ]*pre'

failed=0
for page in "${PAGES[@]}"; do
  label="${page:-/}"
  rel="${page:+$page/}index.html"

  if [ ! -f "$REF_BUILD/$rel" ]; then
    printf '  \033[33m?\033[0m %-12s not in the Astro build\n' "$label"
    continue
  fi
  if [ ! -f "$CUR_BUILD/$rel" ]; then
    printf '  \033[31m✘\033[0m %-12s not prerendered by the clone — add it to react-router.config.ts\n' "$label"
    failed=$((failed + 1))
    continue
  fi

  ws_flag=""
  if grep -qE "$WS_SENSITIVE" "$REF_BUILD/$rel" "$CUR_BUILD/$rel"; then
    ws_flag="--strict-ws"
    printf '  \033[2m·\033[0m %-12s renders preserved whitespace — comparing it byte for byte\n' "$label"
  fi

  a=$(mktemp) && b=$(mktemp)
  python3 "$ROOT/scripts/normalise-html.py" $ws_flag "$REF_BUILD/$rel" > "$a"
  python3 "$ROOT/scripts/normalise-html.py" $ws_flag "$CUR_BUILD/$rel" > "$b"

  # Where the clone is deliberately not byte-identical to the Astro page, the
  # difference is written down as a rule rather than tolerated as a dirty diff
  # — so it is reviewable, and so every OTHER difference still fails. The rules
  # rewrite the reference up to the clone's output.
  expected="$ROOT/scripts/expected-diffs/$(echo "${page:-index}" | tr / -).pl"
  if [ -f "$expected" ]; then
    rules=$(grep -cE '^[[:space:]]*s[/{]' "$expected" || true)
    perl -0777 -p "$expected" "$a" > "$a.patched" && mv "$a.patched" "$a"
    printf '  \033[2m·\033[0m %-12s %s expected-difference rule(s) applied — see %s\n' \
      "$label" "$rules" "scripts/expected-diffs/$(basename "$expected")"
  fi

  if diff -q "$a" "$b" >/dev/null; then
    printf '  \033[32m✔\033[0m %-12s identical\n' "$label"
  else
    printf '  \033[31m✘\033[0m %-12s differs\n' "$label"
    diff -u --label "astro/$rel" --label "clone/$rel" "$a" "$b" | sed 's/^/      /'
    failed=$((failed + 1))
  fi
  rm -f "$a" "$b"
done

echo
if [ "$failed" -eq 0 ]; then
  say "All ${#PAGES[@]} page(s) diff clean"
else
  say "$failed of ${#PAGES[@]} page(s) differ"
fi
exit "$failed"
