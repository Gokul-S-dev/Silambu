// Legacy JS config for Tailwind v4 — loaded from globals.css via @config.
// Prefixes every Tailwind utility with `tw` using v4's VARIANT-STYLE separator:
// write `tw:leading-relaxed` in markup (colon, NOT hyphen). Tailwind then emits
// `.tw\:leading-relaxed`, so our Bootstrap utilities (container, row, col-*,
// mt-*, text-center …) never collide with Tailwind's own utility names.
/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw',
  // Without `content`, v4 auto-source-detection starts from the CSS file's
  // directory (src/styles) and never sees the JSX. Declare the scan globs.
  content: ['./src/**/*.{js,jsx}'],
}
