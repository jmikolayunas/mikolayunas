# Bonas Studio — Working Rules (Fast)

## Default Mode
Make small, precise edits that preserve the Bonas Studio luxury gallery feel.
Prefer minimal diffs/snippets over full file rewrites.

## Output Format
- Prefer: steps + minimal code snippets
- If code changes are needed: return diff-style blocks + exact paste locations
- Do NOT refactor unless explicitly asked

## Core Style Constraints
- Gallery pacing: generous whitespace, calm transitions, no busy effects
- Neutral palette: gallery-white / charcoal / graphite, brass only as accent
- Minimal drop shadows; avoid heavy “web UI” styling

## Images
- Transparent PNG/WebP should not have box-shadow on the image itself
- If depth is needed, apply subtle shadow to a wrapper (not the <img>)

## Stack Constraints
- Vanilla HTML/CSS/JS only (no frameworks)
- Mobile-first; use clamp() for fluid type/spacing
- Touch as few files as possible

## When You Need More Detail
Only consult the following docs if relevant:
- BRAND_VOICE.md → copywriting, tone, hero lines, artist notes
- PRICING_PROCESS.md → pricing + payment + timeline language
- SITE_ARCHITECTURE.md → tokens, components, file structure, UX patterns

## If Uncertain
Ask 1 direct question OR make the best assumption and proceed with the smallest safe change.
