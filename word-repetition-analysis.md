# Website Content - Word Repetition Analysis & Fixes

## PRIMARY ISSUE: "RENDER/RENDERS"

Found 6 instances across site. Goal: Reduce to 2-3 maximum.

---

### PIECE DESCRIPTIONS (S2 - Hardwood sentence):

**1. FELLS (fells.html, line 102)**
```
CURRENT: Hardwood renders the reservation's rocky terrain, reservoirs, and wooded rises against the surrounding urban grid.
FIX: Hardwood defines the reservation's rocky terrain, reservoirs, and wooded rises against the surrounding urban grid.
REASON: "Defines" already used successfully in Block Island and Cannon
```

**2. MAHOOSUC (mahoosuc.html, line 86)**
```
CURRENT: Hardwood renders the multi-peak structure and continuous ridge system.
FIX: Hardwood traces the multi-peak structure and continuous ridge system.
REASON: "Traces" suggests following/connecting (matches the range-connection theme)
ALTERNATIVE: Hardwood captures the multi-peak structure and continuous ridge system.
```

**3. NANTUCKET (nantucket.html, line 86)**
```
CURRENT: Hardwood renders the subtle inland elevations.
FIX: Hardwood captures the subtle inland elevations.
REASON: "Captures" works well for subtle/delicate subjects (already used in Highland, Mansfield)
```

---

### ARTIST'S NOTES:

**4. CANNON (cannon.html, line 198)**
```
CURRENT: The carving was kept honest–the mountain's verticality and exposure are rendered without softening.
FIX: The carving was kept honest–the mountain's verticality and exposure remain uncompromised.
REASON: More active, removes passive "are rendered," stronger voice
ALTERNATIVE: The carving preserves the mountain's verticality and exposure without softening.
```

---

### PROCESS/COMMISSION PAGES:

**5. COMMISSION (commission.html, line 239)**
```
CURRENT: I prepare a design proposal with renderings, scale options, and a curated materials/finish palette.
KEEP AS-IS
REASON: "Renderings" is technical term (3D mockups/visualizations), not same as "render" verb usage
```

**6. PROCESS (process.html, line 109)**
```
CURRENT: We discuss wood species, scale, and the process of rendering terrain as sculptural relief.
FIX: We discuss wood species, scale, and the process of translating terrain into sculptural relief.
REASON: "Translating" already established in About page artist statement ("translates real geography"), creates consistency
ALTERNATIVE: ...and the process of transforming terrain into sculptural relief.
```

---

## SUMMARY OF FIXES:

**Piece Descriptions (3 changes):**
- Fells: renders → **defines**
- Mahoosuc: renders → **traces** (or captures)
- Nantucket: renders → **captures**

**Artist's Notes (1 change):**
- Cannon: are rendered → **remain uncompromised** (or preserves)

**Process Page (1 change):**
- rendering terrain → **translating terrain**

**Commission Page:**
- Keep "renderings" (technical term)

**RESULT:** Reduces "render/renders" from 6 instances to 1 (technical use only)

---

---

## SECONDARY ANALYSIS: OTHER REPETITIVE TERMS

### HIGH-FREQUENCY WORDS NEEDING VARIATION:

---

### 1. "TERRAIN" - 41 instances (TOO HIGH)

**Where it appears most:**
- Piece descriptions (S2 - hardwood sentence): 8 times
- Artist's notes: 15+ times
- Process page: 10+ times

**SUGGESTED ALTERNATIVES by context:**

**For mountain pieces:**
- "steep terrain" → "steep slopes" / "vertical relief" / "mountain face"
- "technical terrain" → "technical sections" / "challenging ground"
- "gentle terrain" → "gentle slopes" / "rolling ground"

**For general use:**
- "carved terrain" → "carved topography" / "carved landscape" / "relief surface"
- "terrain's character" → "landscape's character" / "topographic character"
- "terrain readable" → "topography legible" / "landscape clear"

**Specific fixes needed:**

**Highland (highland.html, line 141):**
```
CURRENT: Hardwood captures the technical terrain and purpose-built features across varied pitch.
FIX: Hardwood captures the technical descents and purpose-built features across varied pitch.
```

**Bromley (bromley.html, line 86):**
```
CURRENT: Hardwood forms the mountain's characteristic rounded ridgelines and gentle terrain.
FIX: Hardwood forms the mountain's characteristic rounded ridgelines and gentle slopes.
```

**Fells (fells.html, line 102):**
```
CURRENT: Hardwood renders the reservation's rocky terrain, reservoirs, and wooded rises...
FIX: Hardwood defines the reservation's rocky topography, reservoirs, and wooded rises...
(Also fixes "renders" issue)
```

**Cannon artist's note (cannon.html, line 199):**
```
CURRENT: ...making the terrain's verticality readable.
FIX: ...making the topography's verticality readable.
OR: ...making the mountain's verticality readable.
```

---

### 2. "RELIEF" - 42 instances

**Analysis:** This is mostly acceptable because:
- "Relief" is the technical term for the art form
- Every piece description starts "Relief of [Place]" (10 instances)
- Used correctly in "sculptural relief" (technical term)

**Only 1 fix needed:**

**Cannon (cannon.html, line 199):**
```
CURRENT: ...accentuating the relief and making the terrain's verticality readable.
FIX: ...accentuating the carved depth and making the topography's verticality readable.
REASON: "Relief" used twice in same sentence (line 198 + 199), reduce once
```

---

### 3. "CARVED/CARVING" - 21 instances

**Analysis:** Mostly acceptable - this is a core process term

**Only 1 redundancy:**

**Maui artist's note (maui.html, line 179):**
```
CURRENT: ...accentuating depth across the carved terrain.
FIX: ...accentuating depth across the topography.
REASON: "Carved" is implied (whole piece is carved), can be omitted
```

---

### 4. "LASER-ETCHED/ETCHED" - 22 instances

**Analysis:** Acceptable - technical term, appears in S3 of most descriptions

**Suggested variation for prose sections:**

Instead of always "laser-etched trails," occasionally use:
- "etched trail network"
- "burned-in trail system"
- "etched routing"

**Example fix:**

**Mahoosuc (mahoosuc.html, line 87):**
```
CURRENT: Laser-etched forest defines ski trails linking terrain across summits.
FIX: Etched forest defines ski trails linking terrain across summits.
REASON: S3 formula can sometimes drop "laser-" prefix (implied)
```

---

---

## PATTERN ACROSS OCEAN SERIES DESCRIPTIONS

**Current S2 verb distribution (after fixes):**

- **defines** - Block Island, Cannon, Fells (3)
- **forms** - Bromley, Cape Ann (2)
- **captures** - Highland, Mansfield, Nantucket (3)
- **traces** - Mahoosuc (1)
- **embodies** - Maui (1)

**RESULT:** Good distribution, no verb used more than 3 times

---

---

## IMPLEMENTATION PRIORITY

### HIGH PRIORITY (Reduce "renders"):
1. Fells description: renders → defines
2. Mahoosuc description: renders → traces
3. Nantucket description: renders → captures
4. Cannon artist's note: are rendered → remain uncompromised
5. Process page: rendering → translating

### MEDIUM PRIORITY (Reduce "terrain"):
6. Highland: technical terrain → technical descents
7. Bromley: gentle terrain → gentle slopes
8. Fells: rocky terrain → rocky topography
9. Cannon note: terrain's verticality → topography's verticality
10. Maui note: carved terrain → topography

### LOW PRIORITY (Polish):
11. Cannon note: the relief → the carved depth
12. Mahoosuc: Laser-etched → Etched

---

## WORDS TO CONTINUE USING FREELY

These are core vocabulary and don't need reduction:
- **piece** (the work itself)
- **work** (the artwork)
- **commission** (business term)
- **carving/carved** (core process)
- **relief** (technical art term)
- **etched/laser-etched** (technical process)

---

## FINAL NOTES

**"Renders" should be reserved for:**
- Technical 3D modeling context ("renderings" as noun = mockups/visualizations)
- Avoided as verb in descriptions and artist's notes

**"Terrain" should be varied with:**
- topography (technical)
- slopes/descents (mountains)
- landscape (general)
- ground/surface (functional)

**Overall goal:** Each piece description should feel unique while maintaining Ocean series structure. Verb variation in S2 helps achieve this without violating the formula.
