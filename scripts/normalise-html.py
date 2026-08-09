#!/usr/bin/env python3
"""Canonicalise a built HTML page so Astro's output and React's can be diffed.

The whole clone plan rests on this file. Too loose and it blesses real
regressions; too strict and every page drowns in renderer noise that says
nothing about the design. So every transformation below is justified by "the
browser cannot tell these apart", and anything that fails that test is left
alone to show up in the diff.

What it does, in order:

  1. Keeps only <body>. Head is content-hashed stylesheet links and per-page
     <title>; it differs on every build and blocks nothing.
  2. Drops comments, and drops <script> elements entirely — bodies and tags.
     This is where React Router's hydration payload lives (window.__reactRouter*)
     and where Astro's bundled module tags live. We are comparing what the
     design paints, not how it is booted. React's Suspense markers (<!--$-->,
     <!--/$-->) are comments and go with them.
  3. Drops build-tool attributes that no design ever asked for:
     `data-astro-cid-*` (how Astro scopes a component's <style>) and
     `data-discover` (how React Router marks eager-discoverable links).
  4. SORTS ATTRIBUTES within every tag. This is the load-bearing extension over
     the blip harness that this one is modelled on: JSX emits author order,
     Astro emits its own, and the DOM has no opinion. Parsed, not regexed —
     a regex over `<[^>]*>` is wrong the first time an attribute value
     contains a bracket.
  5. Normalises the serialisation the two renderers spell differently but the
     parser reads identically: bare `hidden` and `hidden=""` both become
     `hidden=""`, `<img/>` and `<img>` both become `<img>`, single quotes
     become double, entities are decoded on both sides so `&amp;` and `&`
     compare equal.
  6. Collapses whitespace with the browser's own semantics and puts one tag per
     line, so a diff points at the dropped class rather than at a 4KB line.

Known limitation, stated rather than hidden: step 6 erases whitespace BETWEEN
tags, so `</span> <span>` and `</span><span>` compare equal. Astro's template
formatting and JSX's differ there on nearly every line, and keeping it would
bury real findings under noise. In this design system the inline gaps that
matter are drawn by CSS (`gap`), not by text nodes — and the one component
that depends on the absence of a text node, PillLead, says so in a comment.
The escape hatch is --strict-ws, which the runner turns on automatically for
any page that renders preserved whitespace.

Usage:  normalise-html.py FILE [--strict-ws]
"""

import re
import sys
from html.parser import HTMLParser

DROP_ELEMENTS = {"script"}

# React's streaming-SSR bookkeeping: `<template id="B:0">` marks where a
# suspended boundary will be spliced in and `<div hidden id="S:0">` parks the
# resolved content until the (stripped) inline script moves it. Both are
# emitted at the end of <body>, neither paints anything, and Astro has no
# equivalent. Matched on the id shape rather than on position — a page with
# several boundaries numbers them.
REACT_BOUNDARY_ID = re.compile(r"^[BSPFT]:\d+$")

# Prefixes, not names: Astro's scope attribute carries a per-file hash.
DROP_ATTR_PREFIXES = ("data-astro-cid-",)
DROP_ATTRS = {"data-discover"}

VOID = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "source", "track", "wbr",
}

# Elements whose text content the browser renders verbatim. Text inside these
# is preserved exactly even in the default (non-strict) mode — see PRESERVED
# below. `pre` and `textarea` are the whole set in HTML; `white-space: pre` on
# an arbitrary element is a CSS concern the runner still catches with
# --strict-ws.
WS_SENSITIVE_TAGS = {"pre", "textarea"}

# Sentinel marking a text token that came from inside a WS_SENSITIVE_TAGS
# element. It is a codepoint no HTML document contains, stripped before output.
PRESERVED = "\x00"

class Canonicaliser(HTMLParser):
    def __init__(self, strict_ws: bool):
        # convert_charrefs decodes entities in text for us; attribute values
        # are decoded by the parser regardless.
        super().__init__(convert_charrefs=True)
        self.strict_ws = strict_ws
        self.out: list[str] = []
        self.in_body = False
        self.depth_dropped = 0
        self.dropped_tags: list[str] = []
        # How deep we are inside <pre>/<textarea>. Text emitted while this is
        # non-zero is marked PRESERVED and never trimmed or collapsed.
        self.depth_ws = 0

    # -- helpers ---------------------------------------------------------
    def _tag(self, tag: str, attrs) -> str:
        kept = []
        for name, value in attrs:
            if name in DROP_ATTRS or name.startswith(DROP_ATTR_PREFIXES):
                continue
            # A valueless attribute is `x=""` to the DOM; write it that way so
            # `hidden` and `hidden=""` stop being a difference.
            kept.append((name, "" if value is None else value))
        kept.sort(key=lambda kv: kv[0])
        rendered = "".join(
            ' %s="%s"' % (name, value.replace('"', "&quot;")) for name, value in kept
        )
        return "<%s%s>" % (tag, rendered)

    def _emit(self, text: str):
        if self.in_body and not self.depth_dropped:
            self.out.append(text)

    # -- parser callbacks ------------------------------------------------
    def handle_starttag(self, tag, attrs):
        if tag == "body":
            self.in_body = True
            self._emit(self._tag(tag, attrs))
            return
        if tag in DROP_ELEMENTS or self._is_react_boundary(attrs):
            self.depth_dropped += 1
            self.dropped_tags.append(tag)
            return
        if tag in WS_SENSITIVE_TAGS:
            self.depth_ws += 1
        self._emit(self._tag(tag, attrs))

    @staticmethod
    def _is_react_boundary(attrs) -> bool:
        return any(
            name == "id" and value and REACT_BOUNDARY_ID.match(value)
            for name, value in attrs
        )

    def handle_startendtag(self, tag, attrs):
        # `<img />` and `<img>` are the same element; void elements never get a
        # closing tag either way.
        if tag in DROP_ELEMENTS:
            return
        self._emit(self._tag(tag, attrs))
        if tag not in VOID:
            self._emit("</%s>" % tag)

    def handle_endtag(self, tag):
        if self.dropped_tags and self.dropped_tags[-1] == tag:
            self.dropped_tags.pop()
            self.depth_dropped -= 1
            return
        if tag in VOID:
            # Some serialisers write </br>; the parser tree has no such node.
            return
        if tag in WS_SENSITIVE_TAGS:
            self.depth_ws = max(0, self.depth_ws - 1)
        self._emit("</%s>" % tag)
        if tag == "body":
            self.in_body = False

    def handle_data(self, data):
        if not self.in_body or self.depth_dropped:
            return
        # Inside <pre>/<textarea> the browser renders the text as written, so
        # the two renderers must agree on it exactly. Mark it; the trimming and
        # collapsing below skip anything carrying the sentinel.
        self.out.append(PRESERVED + data if self.depth_ws else data)

    def handle_comment(self, data):
        pass

    def handle_decl(self, decl):
        pass


def coalesce(tokens: list[str]) -> list[str]:
    """Merge adjacent text runs into one.

    React separates two adjacent text children with an empty comment
    (`Kraft<!-- --> <kbd>`) so hydration can find the boundary again; Astro
    emits the same characters as a single text node. Once the comments are
    gone the two are the same string, and this is what makes them compare that
    way. Purely a renderer artifact — no browser can tell the two apart.
    """
    merged: list[str] = []
    for tok in tokens:
        if not tok.startswith("<") and merged and not merged[-1].startswith("<"):
            # Both runs sit inside the same element, so they are both PRESERVED
            # or both not. Strip the incoming sentinel so it cannot land in the
            # middle of the merged string, where nothing would recognise it.
            merged[-1] += tok[len(PRESERVED):] if tok.startswith(PRESERVED) else tok
        else:
            merged.append(tok)
    return merged


def normalise(html: str, strict_ws: bool) -> str:
    p = Canonicaliser(strict_ws)
    p.feed(html)
    p.close()
    p.out = coalesce(p.out)

    if strict_ws:
        # Byte-for-byte on the text, but still one tag per line and still
        # attribute-sorted — the point of strict mode is the whitespace, not
        # the renderer noise.
        parts = []
        for tok in p.out:
            if tok.startswith("<"):
                parts.append("\n" + tok)
            else:
                # Strict mode preserves every text run anyway, so the marker
                # has no work to do here beyond getting out of the output.
                parts.append(tok[len(PRESERVED):] if tok.startswith(PRESERVED) else tok)
        return re.sub(r"\n+", "\n", "".join(parts)).strip() + "\n"

    # Trim at an element's own INSIDE EDGES — the run right after its opening
    # tag, and the run right before its closing tag.
    #
    # This is where the two formatters disagree hardest and the browser does
    # not care at all. JSX discards whitespace that spans lines; Astro's
    # compiler keeps it as a single collapsed space. So the same source, laid
    # out the same way, yields `<button> Theme </button>` from Astro and
    # `<button>Theme</button>` from React — and both render "Theme", because
    # whitespace at the start of the first line box in a block, or the end of
    # the last, collapses away.
    #
    # What this deliberately does NOT touch is whitespace between two SIBLINGS.
    # `<i></i> Theme` keeps its space, and a clone that drops it (JSX will,
    # given the chance) fails — that gap is real, it is what separates an icon
    # from its label. The cost is a second blind spot alongside the one in the
    # docstring: a trailing space before an inline element's own close tag,
    # `<span>a </span><span>b</span>`, is not compared. Same trade, same
    # reason, and the same escape hatch (--strict-ws).
    tokens = p.out
    for i, tok in enumerate(tokens):
        if tok.startswith("<") or tok.startswith(PRESERVED):
            # PRESERVED text is <pre>/<textarea> content: the browser renders
            # it verbatim, so trimming its edges would hide a real difference.
            continue
        after_open = i > 0 and tokens[i - 1].startswith("<") and not tokens[i - 1].startswith("</")
        before_close = i + 1 < len(tokens) and tokens[i + 1].startswith("</")
        if after_open:
            tok = tok.lstrip()
        if before_close:
            tok = tok.rstrip()
        tokens[i] = tok

    lines = []
    for tok in tokens:
        if tok.startswith("<"):
            lines.append(tok)
            continue
        if tok.startswith(PRESERVED):
            # Verbatim, sentinel stripped — including a whitespace-only run,
            # which inside a <pre> is content rather than formatting.
            lines.append(tok[len(PRESERVED):])
            continue
        if tok.strip() == "":
            # A whitespace-only run left between two tags: dropped. See the
            # module docstring — the harness's one deliberate blind spot, and
            # it exists because Astro's source indentation lands here on nearly
            # every line while JSX's does not.
            continue
        # Collapse the rest the way the browser does.
        lines.append(re.sub(r"\s+", " ", tok))

    return "\n".join(lines) + "\n"


def main() -> int:
    args = [a for a in sys.argv[1:]]
    strict = "--strict-ws" in args
    files = [a for a in args if not a.startswith("--")]
    if len(files) != 1:
        print(__doc__, file=sys.stderr)
        return 2
    with open(files[0], encoding="utf-8") as fh:
        sys.stdout.write(normalise(fh.read(), strict))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
