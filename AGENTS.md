# AGENTS.md — Jonas Mikolayunas Website

Before changing code, read:
- PROJECT_CONTEXT.md
- CLAUDE.md
- The relevant HTML/CSS/JS files for the task

This is a static HTML/CSS/JS artist website. No frameworks, no build tools, no npm app dependencies.

Use the current split CSS architecture:
- css/global.css
- css/index.css
- css/gallery.css
- css/piece.css
- css/process.css
- css/commission.css
- css/contact.css
- css/about.css
- css/collectors.css
- css/viewer.css
- css/agreement.css

Brand:
- Artist name: Jonas Mikolayunas
- Primary domain: mikolayunas.com
- Email: jonas@mikolayunas.com
- Instagram: @jonasmikolayunas
- Never use Bonas Studio unless explicitly working on legacy replacement.

Tone:
- Unhurried, precise, materially grounded.
- Avoid salesy language.
- Use “commission,” “piece,” “studio,” and “collector.”
- Avoid “product,” “order,” “shop,” “beautiful,” “stunning,” “amazing,” and overt “luxury” language.

Coding rules:
- Keep HTML/CSS/JS simple and static.
- Use existing CSS tokens from global.css.
- Keep mobile-first CSS.
- Prefer min-width breakpoints: 768px, 1024px, 1440px.
- Do not introduce frameworks or build steps.
- Preserve responsive image srcset/sizes patterns.
- Null-check JavaScript DOM queries.
- Do not rewrite large files unnecessarily.

When asked for copy changes:
- Preserve the existing contemplative gallery tone.
- Keep artist notes specific to the piece, not generic brand messaging.