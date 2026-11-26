# Website theme

The single reference for how this website looks. Every change to the site follows it.
The style is **Showcase**: a confident, project-first page that an employer can scan in seconds.

## 1. Colour: dark mode, warm neutrals

Dark only. Warm, slightly brown-tinted greys rather than cold blue-blacks, with one sand accent.
These seven tokens (in `src/app.css`) are the only colours on the page.

| Token | Hex | Used for |
|---|---|---|
| `--bg` | `#141413` | Page background |
| `--surface` | `#1B1B19` | Raised areas: experience cards, art frames |
| `--border` | `#2C2B28` | Hairlines, dividers, chip and outline-button borders |
| `--text` | `#E8E5DF` | Main text and headings |
| `--muted` | `#A29F97` | Secondary text: pitches, summaries, labels |
| `--faint` | `#8A877F` | Small labels, the dimmed half of the headline |
| `--accent` | `#D4B27F` | Solid buttons, the status line, the first chip, dates, arrows, focus, selection |

- **Accent is for emphasis**, not decoration: a few touches per screen, never a large fill.
- **Contrast** against `--bg`: text 14.7:1, muted 7.0:1, faint 5.1:1, accent 9.2:1 (all pass WCAG AA).
- **Project art** (`public/art/`) uses the same colours; its glows may use the accent at reduced opacity.

## 2. Layout

- Content is at most 1160px wide, with 32px side padding (20px on phones).
- Order: nav → hero → stats strip → **Selected work** → **Experience** → contact.
- **Hero:** a status line, a huge two-part headline (second part in `--faint`), a short intro and two buttons.
- **Stats strip:** four numbers between hairlines; two per row on phones.
- **Projects:** one large feature row each — 16:10 art (left) and text (right), swapping sides every row, hairlines between rows. On phones the art sits above the text.
- **Experience:** three cards in a row on `--surface`; stacked on phones.
- **Contact:** the email address set very large, then outline buttons and a solid CV button.
- The page must read correctly at 320px wide with no sideways scrolling.

## 3. Type

Both fonts are bundled with the site (`@fontsource-variable`, optical-size axis), never loaded from Google.

| Use | Font | Weight | Size |
|---|---|---|---|
| Headline | Bricolage Grotesque | 800 | 48–112px, line height 0.95, tracking −0.035em |
| Section and project titles | Bricolage Grotesque | 700 | 28–48px, tracking −0.02em |
| Stat numbers | Bricolage Grotesque | 700 | 32–48px |
| Body text | DM Sans | 400 | 17px, line height 1.6 |
| Labels, chips, dates | DM Sans | 400–500 | 13–15px |

## 4. Components

- **Buttons:** pills. Solid = `--accent` background with `--bg` text (hover: `--text`). Outline = `--border` outline (hover: accent outline).
- **Chips:** small pills with a `--border` outline; the first chip of a project is outlined and coloured in `--accent`.
- **Art frames:** 16px corners, 1px `--border`, `--surface` behind.
- **Cards:** 16px corners, 1px `--border`, `--surface` fill.

## 5. Motion

- Short and purposeful: art zooms to 103.5% over 0.6s on hover, arrows nudge 4px, colours fade in 0.15–0.2s.
- Smooth scrolling for in-page links.
- Everything is switched off under `prefers-reduced-motion`.

## 6. Content

- Text comes from the current CV (`public/Adithya_Prakash_CV.pdf`) and lives in `src/data/`.
- Every project has cover art (or a screenshot) at 16:10.
- The page never shows the phone number or full address; those stay in the CV only.
