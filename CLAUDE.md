# Bonas Studio Project Guidelines

## Brand Philosophy & Luxury Positioning

### Core Principles
- **Commission-based model**: Every piece requires client collaboration through an intentionally iterative process
- **Gallery-style presentation**: Emphasize contemplation and breathing room over typical web conventions
- **"Slowing visitors down"**: Create museum-quality experiences that prioritize thoughtfulness over energy
- **Exclusive atelier positioning**: Position as custom studio, not e-commerce operation
- **Heirloom quality**: Every decision reinforces craftsmanship and legacy over mass production

### Psychology of Luxury Clientele
- Wealthy clients prefer **confident, direct language** over defensive or apologetic phrasing
- Avoid corporate-sounding justifications or excessive meta-commentary
- Position custom work as **collaborative creative partnership** between equals
- Use warm, accessible tone while maintaining exclusivity
- Never apologize for pricing, timelines, or process requirements
- Eliminate defensive language like "I understand this may seem..." or "Please note that..."

---

## Design System

### Color Palette
```css
--color-gallery-white: #F7F6F3    /* Primary background */
--color-graphite: #2E2E2E         /* Primary text */
--color-charcoal: #121212         /* Dark backgrounds */
--color-black: #000000            /* Accents */
--color-brass: #C7A86A            /* Accent color */
```

### Typography
- **Primary**: Libre Baskerville (serif) - Headlines, titles, gallery placards
- **Secondary**: Source Sans 3 (sans-serif) - Body text, UI elements
- **Type Scale**: Fluid responsive (clamp functions, 320px–1440px)
- **Line Heights**: 1.1 (tight), 1.3 (snug), 1.5 (normal), 1.7 (relaxed)

### Spacing Rhythm
- **Base unit**: 8px scale
- **Section padding**: clamp(4rem, 8vw, 8rem) vertical
- **Grid gap**: 2rem (32px)
- **Container max-width**: 1440px
- **Narrow container**: 800px

### Transitions & Effects
- **Fast**: 0.2s ease (hover states)
- **Smooth**: 0.3s ease (standard transitions)
- **Slow**: 0.6s ease (larger movements)
- **Luxury**: 0.8s ease-out (hero animations, scrollytelling)

### Gallery-Style Presentation
- Generous breathing room between elements
- Neutral backgrounds (gallery-white or charcoal)
- Minimal drop shadows (subtle depth, not heavy)
- **Remove box-shadows from transparent PNG/WebP images**
- Contemplative pacing (fade-in animations, scroll triggers)

---

## Tone & Voice Guidelines

### Language Standards
✅ **DO:**
- Use confident, direct assertions: "We transform terrain into heirloom artwork"
- Emphasize collaboration: "Together, we refine...", "You shape the vision"
- Lead with value: "Precision-built, hand-finished, artist-guided"
- Use active voice: "I'll guide you through..." not "Guidance will be provided"
- Be warm but professional: "Let's explore options" not "Please consider..."

❌ **DON'T:**
- Use defensive language: "I understand this may seem expensive, but..."
- Apologize for process: "Please note that revisions are limited..."
- Use corporate jargon: "Going forward", "At this time", "Please be advised"
- Over-explain decisions: "This is important because... and here's why..."
- Use tentative phrasing: "I hope to...", "We try to...", "Ideally we'd..."

### Avoiding "Investment" Language
- The term "investment" can feel sales-y to luxury clients
- Use contextually: "Investment breakdown" in proposals is acceptable
- Prefer alternatives: "pricing", "cost", "commission range", or simply state the price
- Never use "investment in quality" or similar justifications

### Artist-Guided Process Language
- Emphasize **guided exploration** vs. unlimited revisions
- "I'll test options and share results" not "You can request changes"
- "We'll refine at key milestones" not "Revisions available upon request"
- "Decisions made as the piece evolves" not "Subject to approval"

---

## Content Patterns

### Hero Messaging
- **Primary tagline**: "Where Landscape Becomes Legacy"
- **Supporting**: "The art of place, handcrafted and captured in collaboration"
- Lead with emotion and meaning, follow with precision and craft

### Process Descriptions
- Balance technical precision with emotional resonance
- Structure: What happens → Why it matters → How it serves the story
- Use specific details: "12–36 hours of carving time" vs. "extended carving process"
- Include sensory language: "The surface is sanded through multiple grits, following the terrain's natural flow"

### Artist's Notes (Individual Pieces)
- **Format**: Gallery voice + personal narrative
- **Opening**: Drop cap on first letter (3.5em, brass color)
- **Structure**: Context → Technical approach → Personal reflection
- **Length**: 3–5 paragraphs, conversational but thoughtful
- **Example opening**: "This piece began as a question about scale..."

### Commission Copy
- Emphasize **collaborative exploration** over transactional process
- "Fill out the form to begin the conversation" not "Submit your inquiry"
- "We'll refine the design together until it feels right" not "Design revisions included"
- "I'll guide you toward the right scale" not "I will help you determine..."

---

## Business Model

### Pricing Structure
- **Small** (18" × 24"): $4,500–$6,500
- **Signature** (24" × 36" to 30" × 40"): $6,500–$9,500
- **Statement** (36" × 48"): $8,500–$14,000
- **Installation** (48"+ / multi-panel): $15,000+
- All pieces include artist-made frame + custom-engraved nameplate

### Payment Terms
- **Initial consultation**: No charge (private, 30–45 minutes)
- **Retainer**: 50% after design approval (reserves build window)
- **Final balance**: Due before delivery/dispatch
- **Delivery**: Crated to art-shipping standards, white-glove available

### Timeline & Process
- **Typical lead time**: 8–12 weeks from consultation
- **Phase 1**: Consultation + design proposal (2–3 days after call)
- **Phase 2**: Iterative refinement at key milestones (ongoing during build)
- **Phase 3**: Fabrication (precision carving + hand-finishing)
- **Phase 4**: Crating + delivery

### Collaboration Model
- **No fixed revision limits** - process is guided and iterative
- Decisions made at **key checkpoints**: mockups, materials, finish, final detailing
- Artist shares options, tests, and samples as work progresses
- Client involvement is required (not optional) - this is a collaborative commission

---

## Technical Architecture

### File Structure
```
/
├── index.html, gallery.html, process.html, etc.
├── styles.css (global design system)
├── scripts.js (global navigation, scroll effects)
├── commission.js, gallery.js, etc. (page-specific)
├── pieces_[name].html (individual artwork pages)
└── images/[piece-name]/ (organized by piece)
```

### Development Workflow
- **Editor**: VS Code with Live Server for local preview
- **Version control**: Git with commits, push to GitHub
- **Hosting**: GitHub Pages (automatic deployment)
- **Domain**: Managed via Namecheap, Google Workspace for email

### Technology Stack
- Custom HTML/CSS/JavaScript (no frameworks)
- Model-viewer web components for 3D terrain display
- Flatpickr for date selection (commission forms)
- Lucide Icons for minimal UI elements
- Three.js for advanced 3D interactions

### CSS Standards
- **Design tokens**: CSS custom properties in `:root`
- **Mobile-first**: clamp() for fluid typography and spacing
- **Animations**: Intersection Observer for scroll-triggered fade-ins
- **Components**: Modular, reusable patterns (buttons, cards, forms)

---

## UX & Interactive Elements

### Navigation
- Fixed header with subtle background blur on scroll
- "Commission" link styled as CTA (brass accent)
- Mobile: Hamburger menu with smooth slide-in
- Footer: Minimal, elegant, consistent across all pages

### Gallery & Lightbox
- Filterable by location, materials, scale
- Click to open full-screen lightbox
- Keyboard navigation (arrow keys, ESC to close)
- Gallery-style spacing with brass separators

### Scrollytelling (Process Page)
- Stage-by-stage progression with sticky media
- Fade-in animations triggered by scroll position
- Brass stage numbers for visual hierarchy
- Content reveals as user scrolls through narrative

### Forms (Commission Inquiry)
- Dark graphite background with brass accents
- Custom-styled select boxes (no default browser chrome)
- Flatpickr date picker (graphite theme, brass highlights)
- Arrow bullets (→) instead of standard bullets for lists
- File upload with custom-styled button

---

## Photography Standards

### Image Treatment
- **Background**: Transparent PNG/WebP when possible (gallery-wall presentation)
- **NO box-shadows** on transparent images (interferes with clean edges)
- **Format**: WebP for web delivery, fallback to JPG
- **Naming**: Descriptive, lowercase, hyphenated (e.g., `mahoosuc-hero.webp`)

### Lighting Strategy
- Strategic lighting to **reveal topographic relief**
- Bathymetric (ocean) pieces: dramatic side lighting to show depth
- Arc lighting setups: demonstrate how light reveals terrain throughout day
- Cross-polarization for epoxy resin (eliminates glare)

### Studio Setup
- Professional strip lights and softboxes
- C-stand and boom arm configurations for overhead angles
- Controlled backgrounds (white seamless or neutral)
- High-resolution capture for detail and cropping flexibility

---

## File Naming Conventions

### Pages
- Lowercase with underscores: `pieces_mahoosuc.html`
- Descriptive: `commission.html`, `gallery.html`, `contact.html`
- Consistent structure for piece pages: `pieces_[location-name].html`

### Assets
- Lowercase with hyphens: `mahoosuc-hero.webp`
- Organized in subdirectories: `images/mahoosuc/`, `images/process/`
- Descriptive suffixes: `-hero`, `-detail`, `-full`, `-bb` (black background)

### Code Files
- Component-specific: `commission.js`, `gallery.js`
- Global utilities: `scripts.js` (navigation, scroll effects)
- Styles: `styles.css` (global design system)
- Specialized viewers: `clients_viewer.html`, `clients_viewer-scripts.js`

---

## Critical Reminders

### Luxury Psychology First
- **ALWAYS** evaluate decisions through the lens of high-end craftsmanship
- Ask: "Does this reinforce exclusivity and quality, or does it feel mass-market?"
- Generous spacing beats information density
- Confidence beats defensive explanation

### Language Audit Checklist
- [ ] No apologetic phrasing ("Please understand...", "We try to...")
- [ ] No corporate jargon ("going forward", "at this time")
- [ ] No defensive explanations (justify through value, not excuses)
- [ ] Active voice throughout
- [ ] Collaborative language ("we", "together", "I'll guide you")

### Gallery-Quality Presentation
- [ ] Ample breathing room around all visual elements
- [ ] Neutral backgrounds (gallery-white or charcoal)
- [ ] Contemplative pacing (slow animations, scroll reveals)
- [ ] No busy web effects (parallax, auto-carousels, pop-ups)
- [ ] Typography appropriate for art context (readable, elegant)

### Technical Patterns
- [ ] Clean separation: HTML, CSS, JavaScript in separate files
- [ ] Modular components (reusable, maintainable)
- [ ] Mobile-responsive with luxury feel maintained
- [ ] Performance: optimized images, minimal dependencies
- [ ] Accessibility: semantic HTML, keyboard navigation, ARIA labels

### Content Quality Standards
- [ ] Artist's notes: gallery voice + personal narrative
- [ ] Process descriptions: precision + emotional resonance
- [ ] Commission copy: collaborative exploration, not transaction
- [ ] No over-formatting (avoid bullets/headers unless essential)
- [ ] Lead with value, follow with details

---

## Version Control

- **Repository**: GitHub (private or public as specified)
- **Commit messages**: Clear, descriptive (e.g., "Refine commission page pricing section")
- **Branch strategy**: Main branch for production, feature branches for development
- **Deployment**: Automatic via GitHub Pages on push to main

---

*Last updated: January 2026*
