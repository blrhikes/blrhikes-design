/* ThemePicker — src/components/ThemePicker.astro's MARKUP only.

   The plan says skip the theme picker, and its *behaviour* is skipped: no
   theme.js, no clicks, no localStorage, and the sixteen other theme
   stylesheets are not imported. Its markup is cloned anyway, because TopBar
   renders it whenever `themePicker` is set and the event page sets it — a
   picker dropped from the markup would be a page-sized blessed difference
   hiding whatever else drifted underneath it. It renders `hidden`, exactly as
   Astro does, so nothing is on screen either way.

   `aria-pressed` is stringified against `defaultTheme` ("kraft"), not against
   the clone's hard-set kraft-gold: it is what the Astro page emits, and this
   file's job is to emit what the Astro page emits. */
import { themes, defaultTheme, shadowModes, shadowCycleKey } from "../../../src/data/themes.js";

type Theme = { id: string; label: string; key: string; dots: string[] };
type ShadowMode = { id: string; label: string };

export default function ThemePicker() {
  return (
    <div className="themepicker" id="themepicker" hidden>
      <div className="container tp-list" role="group" aria-label="Colour themes">
        {(themes as Theme[]).map((t) => (
          <button
            key={t.id}
            className="tp-option"
            data-theme-opt={t.id}
            aria-pressed={t.id === defaultTheme ? "true" : "false"}
          >
            <span className="tp-name">{t.label} <kbd>{t.key}</kbd></span>
            <span className="tp-palette">
              {t.dots.map((d, i) => <span key={i} className="tp-dot" style={{ background: d }}></span>)}
            </span>
          </button>
        ))}
      </div>

      {/* Below the chips and divided from them: it modifies whichever theme is
          showing rather than being one of them. Rendered pressed on the default
          mode; theme.js corrects it from localStorage on load. */}
      <div className="container tp-settings">
        <span className="tp-set-label" id="tp-shadow-label">
          Shadows <kbd>{shadowCycleKey}</kbd>
        </span>
        <div className="tp-seg" role="group" aria-labelledby="tp-shadow-label">
          {(shadowModes as ShadowMode[]).map((m) => (
            <button
              key={m.id}
              className="tp-seg-opt"
              data-shadow-opt={m.id}
              aria-pressed={m.id === "" ? "true" : "false"}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
