# Bonas Studio — Site Architecture & Design System

## Design System Tokens

### Color Palette
--color-gallery-white: #F7F6F3
--color-graphite: #2E2E2E
--color-charcoal: #121212
--color-black: #000000
--color-brass: #C7A86A

### Typography
- Primary: Libre Baskerville (headlines, titles, placards)
- Secondary: Source Sans 3 (body, UI)
- Type scale: fluid clamp() (320px–1440px)
- Line heights: 1.1 / 1.3 / 1.5 / 1.7

### Spacing Rhythm
- Base unit: 8px
- Section padding: clamp(4rem, 8vw, 8rem)
- Grid gap: 2rem
- Container max-width: 1440px
- Narrow container: 800px

### Transitions
- Fast: 0.2s ease (hover)
- Smooth: 0.3s ease (standard)
- Slow: 0.6s ease (larger movements)
- Luxury: 0.8s ease-out (hero + scrollytelling)

### Gallery Presentation Rules
- Generous breathing room between elements
- Neutral backgrounds (gallery-white or charcoal)
- Minimal drop shadows (subtle, not heavy)
- Remove box-shadows from transparent PNG/WebP images
- Contemplative pacing (fade-in animations, scroll triggers)

---

## Technical Architecture

### File Structure
/
├── index.html, gallery.html, process.html, about.html, commission.html, contact.html
├── scripts.js (global navigation, scroll effects)
├── commission.js, gallery.js, contact.js, process.js (page scripts)
├── css/
│   ├── global.css (design system)
│   └── pages/
│       ├── about.css, commission.css, contact.css, gallery.css
│       ├── index.css, piece.css, process.css, stories.css
│       └── viewer.css
├── pieces/
│   └── [piece-name].html
├── stories/
│   ├── stories.html
│   └── stories.js
├── explore/
│   ├── explore.html
│   └── explore.js
├── clients/
│   ├── viewer.html
│   ├── viewer-scripts.js
│   ├── hdri/
│   └── models/
├── GoodWords/
│   └── nomenclature.md
└── images/
    └── [piece-name]/

### Development Workflow
- Editor: VS Code + Live Server
- Version control: Git + GitHub
- Hosting: GitHub Pages
- Domain: Namecheap, Google Workspace email

### Stack
- Vanilla HTML/CSS/JS (no frameworks)
- model-viewer components for 3D terrain
- Flatpickr for date selection
- Lucide icons
- Three.js for advanced 3D interactions

### CSS Standards
- Tokens via CSS custom properties in :root
- Mobile-first
- clamp() for fluid type/spacing
- Intersection Observer for fade-in scroll

---

## UX Patterns

### Navigation
- Fixed header with subtle background blur on scroll
- “Commission” link styled as CTA (brass accent)
- Mobile: hamburger menu with smooth slide-in
- Footer: minimal, elegant, consistent

### Gallery & Lightbox
- Filterable (location, materials, scale)
- Full-screen lightbox on click
- Keyboard navigation (arrows + ESC)
- Gallery spacing + brass separators

### Scrollytelling (Process Page)
- Sticky media + stage progression
- Fade-in transitions triggered by scroll
- Brass stage numbers

### Forms (Commission Inquiry)
- Dark graphite background + brass accents
- Custom select styling
- Flatpickr theme matches site
- Arrow bullets (→)
- Custom file upload button

---

## Photography Standards

### Image Treatment
- Transparent PNG/WebP when possible (gallery-wall presentation)
- No box-shadows on transparent images
- WebP preferred, JPG fallback
- Naming: descriptive, lowercase, hyphenated (e.g., mahoosuc-hero.webp)

### Lighting Strategy
- Reveal topographic relief via directional light
- Bathymetric pieces: dramatic side-lighting for depth
- Arc lighting: show terrain across changing angles
- Cross-polarization for epoxy resin to reduce glare

### Studio Setup
- Strip lights / softboxes
- C-stand + boom arm for overhead angles
- Controlled backgrounds (white seamless / neutral)
- High resolution capture for cropping flexibility

---

## File Naming Conventions

### Pages
- Lowercase + hyphens: pieces/mahoosuc.html
- Piece pages: pieces/[piece-name].html
- Stories/explore: stories/stories.html, explore/explore.html

### Assets
- Lowercase + hyphens
- images/[piece-name]/
- Suffixes: -hero, -detail, -full, -bb

### Code Files
- Component scripts: commission.js, gallery.js, contact.js, process.js
- Global: scripts.js
- Global CSS: css/global.css
- Page CSS: css/pages/[page].css

### Business Nomenclature
Use named “entities” to reference full component patterns.
Reference: GoodWords/nomenclature.md

- Page Entities: Site Shell, Hero, Section, CTA
- Gallery Entities: Gallery Item, Work Item, Filter Bar
- Piece Entities: Piece Hero, Details Grid, Piece Gallery, Artist’s Note, Back Button
- Navigation: Header, Footer
- Forms: Form rows/groups/labels/inputs
- Viewer: Review Header, Model Viewer, Viewer Controls, Lighting Controls
- Components: Button, Split Layout, Section Divider
- Animations: Fade In Scroll, FadeInUp

---

## Critical Reminders

### Luxury Psychology First
- Filter every decision through “exclusive, crafted, heirloom”
- Generous spacing beats density
- Confidence beats defensive explanation

### Language Audit Checklist
- No apologetic phrasing
- No corporate jargon
- No defensive explanations
- Active voice
- Collaborative language

### Presentation Checklist
- Breathing room
- Neutral backgrounds
- Slow, subtle pacing
- No busy effects
- Elegant typography

### Technical Checklist
- HTML/CSS/JS separation
- Modular components
- Mobile responsiveness
- Performance: optimized images, minimal deps
- Accessibility: semantic HTML, keyboard support, ARIA where needed

---

## Version Control
- GitHub repo
- Clear commit messages (e.g., “Refine commission page pricing section”)
- Main branch for production; feature branches for development
- GitHub Pages deploy on push to main
