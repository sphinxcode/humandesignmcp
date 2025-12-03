# Human Design Bodygraph Specification

## Overview

This document provides a complete technical specification for rendering the Human Design bodygraph based on the Figma design at: https://www.figma.com/design/0NWHzdYNueF6AlCybSCUD0/HD-Bodygraph

The bodygraph consists of:
- **9 Centers** (energy hubs with specific shapes)
- **64 Gates** (entry/exit points on centers)
- **36 Channels** (connections between two gates on different centers)

---

## 1. The Nine Centers

### Center Shapes and Colors (from Figma)

| Center | Shape | Color (Defined) | Color (Undefined) | Position |
|--------|-------|-----------------|-------------------|----------|
| Head | Triangle pointing UP | Gold (#FFCC00) | White outline | Top |
| Ajna | Triangle pointing DOWN | Tan (#D8C4A0) | White outline | Below Head |
| Throat | Rounded Square | Maroon (#8F4A56) | White outline | Center-upper |
| G Center | Diamond | Gold (#FFCC00) | White outline | Heart area |
| Heart/Ego | Triangle pointing RIGHT | Light Gold (#FFD57D) | White outline | Left of G |
| Spleen | Triangle pointing LEFT | Olive (#6D5000) | White outline | Left-lower |
| Solar Plexus | Triangle pointing RIGHT | Olive (#6D5000) | White outline | Right-lower |
| Sacral | Rounded Square | Maroon (#8F4A56) | White outline | Lower-center |
| Root | Rounded Square | Coral/Red (#FF5F57) | White outline | Bottom |

---

## 2. Gates by Center

### HEAD CENTER (3 Gates)
*Triangle pointing UP - Pressure center for mental inspiration*

| Gate | Position on Center | Connects To | Channel Name |
|------|-------------------|-------------|--------------|
| 64 | Left | Gate 47 (Ajna) | Abstraction |
| 61 | Center | Gate 24 (Ajna) | Awareness |
| 63 | Right | Gate 4 (Ajna) | Logic |

### AJNA CENTER (6 Gates)
*Triangle pointing DOWN - Conceptualization center*

| Gate | Position on Center | Connects To | Channel Name |
|------|-------------------|-------------|--------------|
| 47 | Upper Left | Gate 64 (Head) | Abstraction |
| 24 | Upper Center | Gate 61 (Head) | Awareness |
| 4 | Upper Right | Gate 63 (Head) | Logic |
| 17 | Lower Left | Gate 62 (Throat) | Acceptance |
| 23 | Lower Center | Gate 43 (Throat) | Structuring |
| 11 | Lower Right | Gate 56 (Throat) | Curiosity |

### THROAT CENTER (11 Gates)
*Rounded Square - Communication/Manifestation center*

| Gate | Position on Center | Connects To | Channel Name |
|------|-------------------|-------------|--------------|
| 62 | Upper Left | Gate 17 (Ajna) | Acceptance |
| 23 | Upper Center | Gate 43 (Ajna) | Structuring |
| 56 | Upper Right | Gate 11 (Ajna) | Curiosity |
| 16 | Left outer | Gate 48 (Spleen) | The Wavelength |
| 20 | Left inner | Gates 10, 34, 57 | Awakening/Charisma/Brainwave |
| 31 | Lower Center | Gate 7 (G) | The Alpha |
| 8 | Center | Gate 1 (G) | Inspiration |
| 33 | Right inner | Gate 13 (G) | The Prodigal |
| 45 | Left side | Gate 21 (Heart) | Money |
| 35 | Right outer | Gate 36 (Solar) | Transitoriness |
| 12 | Right side | Gate 22 (Solar) | Openness |

### G CENTER (8 Gates)
*Diamond shape - Identity/Love/Direction center*

| Gate | Position on Center | Connects To | Channel Name |
|------|-------------------|-------------|--------------|
| 1 | Upper Center | Gate 8 (Throat) | Inspiration |
| 7 | Upper area | Gate 31 (Throat) | The Alpha |
| 13 | Upper Right | Gate 33 (Throat) | The Prodigal |
| 10 | Left side | Gates 20, 34, 57 | Awakening/Exploration/Perfected Form |
| 25 | Upper area | Gate 51 (Heart) | Initiation |
| 15 | Lower Left | Gate 5 (Sacral) | Rhythm |
| 2 | Lower Center | Gate 14 (Sacral) | The Beat |
| 46 | Lower Right | Gate 29 (Sacral) | Discovery |

### HEART/EGO CENTER (4 Gates)
*Small triangle pointing RIGHT - Willpower center*

| Gate | Position on Center | Connects To | Channel Name |
|------|-------------------|-------------|--------------|
| 21 | Upper | Gate 45 (Throat) | Money |
| 51 | Upper Right | Gate 25 (G) | Initiation |
| 26 | Lower | Gate 44 (Spleen) | Surrender |
| 40 | Right | Gate 37 (Solar) | Community |

### SPLEEN CENTER (7 Gates)
*Triangle pointing LEFT - Survival/Intuition center*

| Gate | Position on Center | Connects To | Channel Name |
|------|-------------------|-------------|--------------|
| 48 | Upper | Gate 16 (Throat) | The Wavelength |
| 57 | Upper area | Gates 10, 20, 34 | Perfected Form/Brainwave/Power |
| 44 | Middle | Gate 26 (Heart) | Surrender |
| 50 | Center | Gate 27 (Sacral) | Preservation |
| 32 | Lower | Gate 54 (Root) | Transformation |
| 28 | Lower area | Gate 38 (Root) | Struggle |
| 18 | Bottom | Gate 58 (Root) | Judgment |

### SOLAR PLEXUS CENTER (7 Gates)
*Triangle pointing RIGHT - Emotional center*

| Gate | Position on Center | Connects To | Channel Name |
|------|-------------------|-------------|--------------|
| 36 | Upper | Gate 35 (Throat) | Transitoriness |
| 22 | Upper area | Gate 12 (Throat) | Openness |
| 37 | Middle | Gate 40 (Heart) | Community |
| 6 | Center | Gate 59 (Sacral) | Intimacy |
| 49 | Lower area | Gate 19 (Root) | Synthesis |
| 55 | Lower | Gate 39 (Root) | Emoting |
| 30 | Bottom | Gate 41 (Root) | Recognition |

### SACRAL CENTER (9 Gates)
*Rounded Square - Life force/Sexuality center*

| Gate | Position on Center | Connects To | Channel Name |
|------|-------------------|-------------|--------------|
| 5 | Upper Left | Gate 15 (G) | Rhythm |
| 14 | Upper area | Gate 2 (G) | The Beat |
| 29 | Upper Right | Gate 46 (G) | Discovery |
| 59 | Right | Gate 6 (Solar) | Intimacy |
| 27 | Left | Gate 50 (Spleen) | Preservation |
| 34 | Center | Gates 10, 20, 57 | Exploration/Charisma/Power |
| 42 | Lower Left | Gate 53 (Root) | Maturation |
| 3 | Lower Center | Gate 60 (Root) | Mutation |
| 9 | Lower area | Gate 52 (Root) | Concentration |

### ROOT CENTER (9 Gates)
*Rounded Square (coral/red) - Adrenaline/Pressure center*

| Gate | Position on Center | Connects To | Channel Name |
|------|-------------------|-------------|--------------|
| 53 | Upper Left | Gate 42 (Sacral) | Maturation |
| 60 | Upper Center | Gate 3 (Sacral) | Mutation |
| 52 | Upper area | Gate 9 (Sacral) | Concentration |
| 54 | Upper Right | Gate 32 (Spleen) | Transformation |
| 38 | Center | Gate 28 (Spleen) | Struggle |
| 58 | Left | Gate 18 (Spleen) | Judgment |
| 19 | Right area | Gate 49 (Solar) | Synthesis |
| 39 | Right | Gate 55 (Solar) | Emoting |
| 41 | Lower Right | Gate 30 (Solar) | Recognition |

---

## 3. Complete Channel Reference (36 Channels)

### Format: Gate1-Gate2 | Center1 to Center2 | Channel Name | Circuit

```
HEAD to AJNA (3 channels)
├── 64-47 | Head → Ajna | Abstraction | Collective Sensing
├── 61-24 | Head → Ajna | Awareness | Individual Knowing
└── 63-4  | Head → Ajna | Logic | Collective Understanding

AJNA to THROAT (3 channels)
├── 17-62 | Ajna → Throat | Acceptance | Collective Understanding
├── 43-23 | Ajna → Throat | Structuring | Individual Knowing
└── 11-56 | Ajna → Throat | Curiosity | Collective Sensing

G to THROAT (4 channels)
├── 7-31  | G → Throat | The Alpha | Collective Understanding
├── 1-8   | G → Throat | Inspiration | Individual Knowing
├── 13-33 | G → Throat | The Prodigal | Collective Sensing
└── 10-20 | G → Throat | Awakening | Integration

G to HEART (1 channel)
└── 25-51 | G → Heart | Initiation | Individual Centering

G to SACRAL (3 channels)
├── 15-5  | G → Sacral | Rhythm | Collective Understanding
├── 2-14  | G → Sacral | The Beat | Individual Knowing
└── 46-29 | G → Sacral | Discovery | Collective Sensing

G to SPLEEN (1 channel)
└── 10-57 | G → Spleen | Perfected Form | Integration

HEART to THROAT (1 channel)
└── 21-45 | Heart → Throat | Money | Tribal Ego

HEART to SPLEEN (1 channel)
└── 26-44 | Heart → Spleen | Surrender | Tribal Ego

HEART to SOLAR PLEXUS (1 channel)
└── 40-37 | Heart → Solar Plexus | Community | Tribal Ego

THROAT to SPLEEN (2 channels)
├── 16-48 | Throat → Spleen | The Wavelength | Collective Understanding
└── 20-57 | Throat → Spleen | The Brainwave | Integration

THROAT to SOLAR PLEXUS (2 channels)
├── 35-36 | Throat → Solar Plexus | Transitoriness | Collective Sensing
└── 12-22 | Throat → Solar Plexus | Openness | Individual Knowing

THROAT to SACRAL (1 channel)
└── 34-20 | Sacral → Throat | Charisma | Integration

SPLEEN to SACRAL (2 channels)
├── 50-27 | Spleen → Sacral | Preservation | Tribal Defense
└── 57-34 | Spleen → Sacral | Power | Integration

SPLEEN to ROOT (3 channels)
├── 18-58 | Spleen → Root | Judgment | Collective Understanding
├── 28-38 | Spleen → Root | Struggle | Individual Knowing
└── 32-54 | Spleen → Root | Transformation | Tribal Ego

SOLAR PLEXUS to SACRAL (1 channel)
└── 6-59  | Solar Plexus → Sacral | Intimacy | Tribal Defense

SOLAR PLEXUS to ROOT (3 channels)
├── 30-41 | Solar Plexus → Root | Recognition | Collective Sensing
├── 49-19 | Solar Plexus → Root | Synthesis | Tribal Defense
└── 55-39 | Solar Plexus → Root | Emoting | Individual Knowing

SACRAL to ROOT (3 channels)
├── 3-60  | Sacral → Root | Mutation | Individual Knowing
├── 9-52  | Sacral → Root | Concentration | Collective Understanding
└── 42-53 | Sacral → Root | Maturation | Collective Sensing
```

---

## 4. Visual Layout Coordinates (Precise - Based on Figma)

### SVG ViewBox: 0 0 360 520

*Coordinates scaled from Figma design (1289x2514) to fit 360x520 viewBox*

### Center Positions (Precise)

| Center | X | Y | Width | Height | Shape |
|--------|---|---|-------|--------|-------|
| Head | 180 | 36 | 70 | 42 | Triangle UP |
| Ajna | 180 | 90 | 72 | 50 | Triangle DOWN |
| Throat | 180 | 168 | 80 | 60 | Rounded Square |
| G Center | 180 | 268 | 70 | 70 | Diamond |
| Heart | 260 | 285 | 45 | 40 | Triangle RIGHT |
| Spleen | 45 | 365 | 55 | 65 | Triangle LEFT |
| Solar Plexus | 315 | 365 | 55 | 65 | Triangle RIGHT |
| Sacral | 180 | 390 | 80 | 55 | Rounded Square |
| Root | 180 | 478 | 80 | 55 | Rounded Square |

---

### Gate Positions (Precise Coordinates)

#### HEAD CENTER GATES (3 gates)
*Positioned along top edge of upward triangle*

| Gate | X | Y | Connects To |
|------|---|---|-------------|
| 64 | 157 | 22 | 47 (Ajna) |
| 61 | 180 | 22 | 24 (Ajna) |
| 63 | 203 | 22 | 4 (Ajna) |

#### AJNA CENTER GATES (6 gates)
*Upper row connects to Head, lower row connects to Throat*

| Gate | X | Y | Connects To |
|------|---|---|-------------|
| 47 | 157 | 68 | 64 (Head) |
| 24 | 180 | 68 | 61 (Head) |
| 4 | 203 | 68 | 63 (Head) |
| 17 | 157 | 112 | 62 (Throat) |
| 43 | 180 | 118 | 23 (Throat) |
| 11 | 203 | 112 | 56 (Throat) |

#### THROAT CENTER GATES (11 gates)
*Most connected center - hub of manifestation*

| Gate | X | Y | Connects To |
|------|---|---|-------------|
| 62 | 148 | 145 | 17 (Ajna) |
| 23 | 172 | 152 | 43 (Ajna) |
| 56 | 212 | 145 | 11 (Ajna) |
| 16 | 130 | 168 | 48 (Spleen) |
| 20 | 142 | 180 | 10, 34, 57 (Integration) |
| 31 | 158 | 192 | 7 (G) |
| 8 | 180 | 185 | 1 (G) |
| 33 | 218 | 192 | 13 (G) |
| 45 | 142 | 195 | 21 (Heart) |
| 35 | 230 | 168 | 36 (Solar) |
| 12 | 230 | 182 | 22 (Solar) |

#### G CENTER GATES (8 gates)
*Diamond shape - identity center*

| Gate | X | Y | Connects To |
|------|---|---|-------------|
| 1 | 180 | 240 | 8 (Throat) |
| 7 | 165 | 252 | 31 (Throat) |
| 13 | 195 | 252 | 33 (Throat) |
| 10 | 152 | 268 | 20, 34, 57 (Integration) |
| 25 | 200 | 258 | 51 (Heart) |
| 46 | 200 | 285 | 29 (Sacral) |
| 2 | 180 | 295 | 14 (Sacral) |
| 15 | 160 | 285 | 5 (Sacral) |

#### HEART/EGO CENTER GATES (4 gates)
*Small triangle pointing right*

| Gate | X | Y | Connects To |
|------|---|---|-------------|
| 21 | 252 | 272 | 45 (Throat) |
| 51 | 268 | 282 | 25 (G) |
| 26 | 275 | 305 | 44 (Spleen) |
| 40 | 268 | 295 | 37 (Solar) |

#### SPLEEN CENTER GATES (7 gates)
*Triangle pointing left - intuition/survival*

| Gate | X | Y | Connects To |
|------|---|---|-------------|
| 48 | 58 | 335 | 16 (Throat) |
| 57 | 48 | 348 | 10, 20, 34 (Integration) |
| 44 | 38 | 362 | 26 (Heart) |
| 50 | 48 | 375 | 27 (Sacral) |
| 32 | 42 | 392 | 54 (Root) |
| 28 | 52 | 405 | 38 (Root) |
| 18 | 62 | 418 | 58 (Root) |

#### SOLAR PLEXUS CENTER GATES (7 gates)
*Triangle pointing right - emotional center*

| Gate | X | Y | Connects To |
|------|---|---|-------------|
| 36 | 302 | 335 | 35 (Throat) |
| 22 | 312 | 348 | 12 (Throat) |
| 37 | 305 | 365 | 40 (Heart) |
| 6 | 315 | 378 | 59 (Sacral) |
| 49 | 322 | 392 | 19 (Root) |
| 55 | 318 | 405 | 39 (Root) |
| 30 | 308 | 418 | 41 (Root) |

#### SACRAL CENTER GATES (9 gates)
*Life force center - rounded square*

| Gate | X | Y | Connects To |
|------|---|---|-------------|
| 5 | 152 | 368 | 15 (G) |
| 14 | 168 | 375 | 2 (G) |
| 29 | 192 | 375 | 46 (G) |
| 59 | 215 | 385 | 6 (Solar) |
| 27 | 145 | 395 | 50 (Spleen) |
| 34 | 180 | 398 | 10, 20, 57 (Integration) |
| 42 | 158 | 415 | 53 (Root) |
| 3 | 180 | 418 | 60 (Root) |
| 9 | 202 | 415 | 52 (Root) |

#### ROOT CENTER GATES (9 gates)
*Pressure center - rounded square (coral/red)*

| Gate | X | Y | Connects To |
|------|---|---|-------------|
| 53 | 152 | 455 | 42 (Sacral) |
| 60 | 168 | 462 | 3 (Sacral) |
| 52 | 192 | 462 | 9 (Sacral) |
| 54 | 210 | 455 | 32 (Spleen) |
| 38 | 165 | 492 | 28 (Spleen) |
| 58 | 145 | 485 | 18 (Spleen) |
| 19 | 218 | 470 | 49 (Solar) |
| 39 | 225 | 485 | 55 (Solar) |
| 41 | 208 | 498 | 30 (Solar) |

---

## 5. Integration Circuit (Special Multi-Connection System)

The Integration Circuit is unique in Human Design - it's the only circuit where gates can form multiple channels. These four gates (10, 20, 34, 57) create a special interconnected system.

### Integration Gates Overview

```
                    THROAT
                   /  |  \
               [20]  [8]  [33]
                /\    |
               /  \   |
              /    \  |
           [57]    [10]----[34]
          SPLEEN    G     SACRAL
              \    /  \    /
               \  /    \  /
                \/      \/
               [57]----[34]
```

### Integration Channels (4 channels)

| Channel | Gates | Centers | Name | Description |
|---------|-------|---------|------|-------------|
| 10-20 | G ↔ Throat | G → Throat | Awakening | Self-expression through behavior |
| 10-34 | G ↔ Sacral | G → Sacral | Exploration | Power through conviction |
| 10-57 | G ↔ Spleen | G → Spleen | Perfected Form | Survival through behavior |
| 20-34 | Throat ↔ Sacral | Sacral → Throat | Charisma | Manifesting power |
| 20-57 | Throat ↔ Spleen | Spleen → Throat | The Brainwave | Intuitive awareness |
| 34-57 | Sacral ↔ Spleen | Sacral → Spleen | Power | Survival power |

### Integration Gate Positions

| Gate | Center | X | Y | Multiple Connections |
|------|--------|---|---|---------------------|
| 10 | G Center | 152 | 268 | → 20, 34, 57 |
| 20 | Throat | 142 | 180 | → 10, 34, 57 |
| 34 | Sacral | 180 | 398 | → 10, 20, 57 |
| 57 | Spleen | 48 | 348 | → 10, 20, 34 |

### Rendering Integration Channels

When rendering integration channels, note these path requirements:

1. **10-20 (G to Throat)**: Curved path from G left side up to Throat left
   - Path: `M152,268 Q130,220 142,180`

2. **10-34 (G to Sacral)**: Near-vertical path down
   - Path: `M152,268 Q160,330 180,398`

3. **10-57 (G to Spleen)**: Diagonal path down-left
   - Path: `M152,268 Q100,310 48,348`

4. **20-34 (Throat to Sacral)**: Long vertical path down center
   - Path: `M142,180 Q160,290 180,398`

5. **20-57 (Throat to Spleen)**: Diagonal path down-left
   - Path: `M142,180 Q95,265 48,348`

6. **34-57 (Sacral to Spleen)**: Horizontal-ish path left
   - Path: `M180,398 Q115,380 48,348`

### Visual Differentiation

When multiple integration channels are active, use these visual cues:
- **Single channel active**: Standard gold gradient stroke
- **Two channels active**: Slightly thicker stroke (5px instead of 4px)
- **Three+ channels active**: Pulsing glow effect to highlight the integration

---

## 6. Channel Path Specifications

### Vertical Channels (Straight/Near-Straight Lines)

| Channel | Path Description |
|---------|------------------|
| 64-47 | `M157,22 L157,68` |
| 61-24 | `M180,22 L180,68` |
| 63-4 | `M203,22 L203,68` |
| 17-62 | `M157,112 L148,145` |
| 43-23 | `M180,118 L172,152` |
| 11-56 | `M203,112 L212,145` |
| 7-31 | `M165,252 L158,192` |
| 1-8 | `M180,240 L180,185` |
| 13-33 | `M195,252 L218,192` |
| 15-5 | `M160,285 L152,368` |
| 2-14 | `M180,295 L168,375` |
| 46-29 | `M200,285 L192,375` |
| 42-53 | `M158,415 L152,455` |
| 3-60 | `M180,418 L168,462` |
| 9-52 | `M202,415 L192,462` |

### Diagonal Channels (Curved Paths)

| Channel | Path Description |
|---------|------------------|
| 16-48 | `M130,168 Q90,250 58,335` |
| 35-36 | `M230,168 Q270,250 302,335` |
| 12-22 | `M230,182 Q270,265 312,348` |
| 21-45 | `M252,272 Q200,235 142,195` |
| 25-51 | `M200,258 Q235,270 268,282` |
| 26-44 | `M275,305 Q150,340 38,362` |
| 40-37 | `M268,295 Q290,330 305,365` |
| 50-27 | `M48,375 Q95,385 145,395` |
| 6-59 | `M315,378 Q265,380 215,385` |
| 18-58 | `M62,418 Q100,455 145,485` |
| 28-38 | `M52,405 Q100,450 165,492` |
| 32-54 | `M42,392 Q125,420 210,455` |
| 49-19 | `M322,392 Q270,430 218,470` |
| 55-39 | `M318,405 Q270,445 225,485` |
| 30-41 | `M308,418 Q260,460 208,498` |

---

## 6. Color Coding Rules

### Gate Activation Colors
| State | Fill Color | Stroke |
|-------|------------|--------|
| Personality (Conscious) | Black (#1A1A1A) | White |
| Design (Unconscious) | Gold (#C9A227) | White |
| Both (Personality + Design) | Half black/Half gold | White |
| Inactive | Light gray (#E8DDD4) | None |

### Channel Activation States
| State | Stroke | Style |
|-------|--------|-------|
| Active (both gates defined) | Gold gradient | Solid, 4px |
| Hanging (one gate defined) | Gray | Dashed |
| Inactive | Light gray (#E8DDD4) | Solid, 2px |

### Center Defined States
| State | Fill | Stroke |
|-------|------|--------|
| Defined | Center color (per table above) | Gold glow |
| Undefined | White/transparent | Light gray outline |

---

## 7. Harmonic Gate Pairs (Opposite Gates on Rave Mandala)

These gates are always 180° apart on the Rave Mandala wheel:

```
25 ↔ 46    17 ↔ 18    21 ↔ 48    51 ↔ 57
42 ↔ 32    3 ↔ 50     27 ↔ 28    24 ↔ 44
2 ↔ 1      23 ↔ 43    8 ↔ 14     20 ↔ 34
16 ↔ 9     35 ↔ 5     45 ↔ 26    12 ↔ 11
15 ↔ 10    52 ↔ 58    39 ↔ 38    53 ↔ 54
62 ↔ 61    56 ↔ 60    31 ↔ 41    33 ↔ 19
7 ↔ 13     4 ↔ 49     29 ↔ 30    59 ↔ 55
40 ↔ 37    64 ↔ 63    47 ↔ 22    6 ↔ 36
```

---

## 8. Implementation Checklist

### Required SVG Elements
- [ ] 9 center shapes with correct geometry
- [ ] 64 gate markers (circles) at correct positions
- [ ] 36 channel paths connecting gates
- [ ] Gate number labels
- [ ] Center name labels
- [ ] Gradient definitions for defined states
- [ ] Glow/shadow filters for defined centers

### Interactive Features
- [ ] Gate hover tooltips (Gate name, keyword, planet)
- [ ] Gate click for detailed info
- [ ] Channel highlighting on hover
- [ ] Center info on click
- [ ] Responsive scaling

### State Management
- [ ] Track defined/undefined centers
- [ ] Track active gates (personality/design/both)
- [ ] Track active channels
- [ ] Calculate channel state from gate activations

---

## 9. Reference Links

- **Figma Design**: https://www.figma.com/design/0NWHzdYNueF6AlCybSCUD0/HD-Bodygraph
- **hdkit Source**: `/hdkit/` folder
- **API Endpoint**: https://humandesignmcp-production.up.railway.app
- **Current Implementation**: `/website/src/components/bodygraph/`

---

*Document created for Project Ajna bodygraph implementation.*
