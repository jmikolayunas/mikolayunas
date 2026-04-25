# PROJECT_CONTEXT.md — Current Site State

This file summarizes decisions from ChatGPT Website Project conversations so VS Code agents can work with the same context.

## Current direction
The site has rebranded from Bonas Studio to Jonas Mikolayunas.
The positioning is artist-led, commission-based, contemplative, materially specific, and story-based.

## Current site structure
Current core pages include:
- index.html
- gallery.html
- process.html
- commission.html
- collectors.html
- about.html
- contact.html
- agreement.html
- viewer.html
- process-viewer.html

Current piece pages include:
- block.html
- bromley.html
- cannon.html
- capeann.html
- fells.html
- highland.html
- mahoosuc.html
- mansfield.html
- maui.html
- nantucket.html

Current CSS is split across page-specific files and global.css.
Current JS includes scripts.js, gallery.js, process.js, commission.js, contact.js, viewer-scripts.js, and agreement.js.

## Voice and positioning
The work should not feel like generic “custom topo maps.”
It should read as sculptural, story-based, place-based artwork using terrain, material, and craft to hold memory.

Use:
- commission
- piece
- studio
- collector
- artist note
- place
- terrain
- relief
- material
- story

Avoid:
- product
- order
- shop
- buy now
- stunning
- amazing
- beautiful
- luxury as a direct claim

## Maui note
The frameless resin edge represents openness, continuation, distance, friendship, and the Pacific extending beyond a fixed border.
Avoid repeating the exact line “left room to continue” if already used elsewhere.
Fix typo: “choicereflects” should be “choice reflects.”
Avoid duplicated koa sentence about figure/chatoyance.

## Process page note
Discovery should emphasize a conversation about place, personal meaning, and story.
Dimensions, timing, and practical needs are part of the discussion, but not the center.

## Current technical preference
Use the current split CSS files. Do not follow older guidance that says everything must live in one styles.css file.