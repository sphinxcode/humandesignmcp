# Project Ajna - Development Progress

> Human Design Bodygraph Chart Generator Website

## Project Overview

- **Project Name:** Project Ajna
- **Tech Stack:** Next.js 16, Tailwind CSS 4, TypeScript, Zustand, React Hook Form, Zod, Framer Motion
- **Backend API:** https://humandesignmcp-production.up.railway.app
- **Design Theme:** Bali-inspired divine feminine aesthetic (coral, gold, cream, white)
- **Fonts:** Quicksand (body), Great Vibes (accent)

---

## Development Log

### Session 1 - December 3, 2024

#### Initial Setup
- [x] Created Next.js 16 project with TypeScript and Tailwind CSS 4
- [x] Installed dependencies: zustand, react-hook-form, zod, @hookform/resolvers, framer-motion, lucide-react, clsx

#### Design System (`src/app/globals.css`)
- [x] Created custom CSS variables for Bali-inspired color palette:
  - Primary: `--coral-sunset`, `--golden-hour`, `--sacred-gold`, `--blush-pink`
  - Backgrounds: `--lotus-white`, `--temple-cream`, `--soft-blush`
  - Text: `--deep-maroon`, `--warm-brown`, `--charcoal`
  - Bodygraph: `--center-defined`, `--center-undefined`, `--personality-black`, `--design-gold`
- [x] Created utility classes: `.btn-primary`, `.btn-secondary`, `.card`, `.glow-gold`
- [x] Added animations: `fadeIn`, `float`, `pulseGlow`
- [x] Styled form inputs, scrollbars, and tooltips

#### Pages Created

**Landing Page (`src/app/page.tsx`)**
- [x] Hero section with animated gradient background
- [x] "What is Human Design" section with 3 benefit cards
- [x] 5 Human Design Types preview (Generator, MG, Projector, Manifestor, Reflector)
- [x] CTA section with gradient background
- [x] Footer with branding

**Calculate Page (`src/app/calculate/page.tsx`)**
- [x] Form with validation (Zod schema):
  - Full Name (required, min 2 chars)
  - Email (required, valid email)
  - Birth Date (required)
  - Birth Time (optional, defaults to 12:00)
  - Birth City (required, with autocomplete)
- [x] Loading state with spinner
- [x] Error handling with visual feedback
- [x] Redirects to chart page on success

**Chart Results Page (`src/app/chart/[id]/page.tsx`)**
- [x] Interactive bodygraph SVG display
- [x] Summary cards (Type, Authority, Profile, Definition)
- [x] Tabbed interface for detailed information
- [x] Share functionality
- [x] Responsive layout

#### Components

**BodygraphSVG (`src/components/bodygraph/BodygraphSVG.tsx`)**
- [x] 9 centers with proper shapes (Head, Ajna, Throat, G, Heart, Spleen, Solar Plexus, Sacral, Root)
- [x] 36 channel paths connecting centers
- [x] 64 gate markers with positioning
- [x] Hover tooltips showing gate name, line, and planet
- [x] Click-to-expand gate details
- [x] Visual distinction: defined centers (gold fill) vs undefined (outline)
- [x] Gate markers: personality (black), design (gold), both (split gradient)

**PlacesAutocomplete (`src/components/ui/PlacesAutocomplete.tsx`)**
- [x] Debounced search (300ms delay)
- [x] Keyboard navigation (arrow keys, enter, escape)
- [x] Loading indicator
- [x] Clear button
- [x] Dropdown with styled predictions
- [x] Integration with react-hook-form via Controller

#### API Routes

**Calculate Route (`src/app/api/calculate/route.ts`)**
- [x] Proxies requests to Railway backend
- [x] Transforms API response to frontend format
- [x] Maps center names (e.g., "SolarPlexus" → "solar")
- [x] Extracts gates from personality and design activations
- [x] Determines active channels
- [x] Generates strategy based on type
- [x] Error handling with appropriate status codes

**Places Route (`src/app/api/places/route.ts`)**
- [x] Proxies to Google Places API when key is configured
- [x] Fallback to curated list of 22 popular cities
- [x] Includes Philippine cities: Manila, Cebu, Davao, Quezon City, Makati
- [x] Filters based on user input

#### State Management (`src/stores/chartStore.ts`)
- [x] Zustand store with persistence
- [x] Stores current chart and birth data
- [x] Saves chart history
- [x] Clear functions for data management

#### Data Files

**Bodygraph Data (`src/lib/bodygraph/data.ts`)**
- [x] 64 gate names from I Ching
- [x] Gate keywords for tooltips
- [x] Center configuration (positions, shapes, gates)
- [x] Channel path definitions
- [x] Gate positions on SVG
- [x] Planet glyphs for display

**Types (`src/types/humandesign.ts`)**
- [x] TypeScript interfaces for all data structures
- [x] PlanetPosition, ChartActivations, HumanDesignChart, BirthData

#### Configuration
- [x] `.env.local` with Railway API token
- [x] `.env.example` for deployment reference
- [x] Placeholder for Google Maps API key

---

## File Structure

```
website/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page
│   │   ├── layout.tsx               # Root layout with fonts
│   │   ├── globals.css              # Design system
│   │   ├── calculate/
│   │   │   └── page.tsx             # Birth data form
│   │   ├── chart/
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Chart results
│   │   └── api/
│   │       ├── calculate/
│   │       │   └── route.ts         # Railway API proxy
│   │       └── places/
│   │           └── route.ts         # Google Places proxy
│   ├── components/
│   │   ├── bodygraph/
│   │   │   ├── BodygraphSVG.tsx     # Interactive SVG
│   │   │   └── index.ts
│   │   └── ui/
│   │       ├── PlacesAutocomplete.tsx
│   │       └── index.ts
│   ├── lib/
│   │   ├── api.ts                   # Client API functions
│   │   ├── utils.ts                 # Utility functions
│   │   └── bodygraph/
│   │       └── data.ts              # HD data (gates, channels, centers)
│   ├── stores/
│   │   └── chartStore.ts            # Zustand state
│   └── types/
│       └── humandesign.ts           # TypeScript definitions
├── .env.local                       # Environment variables
├── .env.example                     # Example env file
└── PROGRESS.md                      # This file
```

---

## API Integration

### Railway Backend Endpoint
```
POST https://humandesignmcp-production.up.railway.app/api/human-design
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "birthDate": "1993-02-05",
  "birthTime": "11:53",
  "birthLocation": "Manila"
}

Response:
{
  "success": true,
  "data": {
    "type": "Generator",
    "authority": "Emotional",
    "profile": "4/6",
    "definedCenters": ["Ajna", "G", "Root", "Sacral", "SolarPlexus", "Throat"],
    "channels": ["19-49", "2-14", "23-43", "9-52"],
    "personality": { "Sun": { "gate": 49, "line": 4 }, ... },
    "design": { "Sun": { "gate": 19, "line": 4 }, ... }
  }
}
```

---

## Tested Scenarios

- [x] API connection to Railway backend (verified with curl)
- [x] Sample birth data: Feb 5, 1993, 11:53 AM, Manila → Generator, Emotional Authority, 4/6 Profile
- [x] Build passes with no TypeScript errors
- [x] Places autocomplete with fallback cities

---

## Known Issues / TODOs

### High Priority
- [ ] Add Google Maps API key for full places autocomplete
- [ ] Test end-to-end chart generation flow
- [ ] Verify bodygraph SVG rendering with real data

### Medium Priority
- [ ] Add loading skeleton for chart page
- [ ] Implement chart sharing (copy link, social media)
- [ ] Add print/PDF export for charts
- [ ] Mobile responsive testing

### Low Priority
- [ ] Add more incarnation cross names
- [ ] Implement chart comparison feature
- [ ] Add user accounts for saving charts
- [ ] SEO optimization

---

## Deployment Notes

### Railway Deployment
```bash
# Environment variables needed:
HD_API_URL=https://humandesignmcp-production.up.railway.app
HD_API_TOKEN=<token>
NEXT_PUBLIC_APP_URL=https://your-domain.up.railway.app
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<optional>
```

---

## Session Notes

### Session 1 Summary
- Full project setup completed
- All 3 main pages created (Landing, Calculate, Chart)
- API integration working
- Places autocomplete with fallback implemented
- Build passing

**Next Session Goals:**
- Test full user flow
- Verify bodygraph rendering
- Add any missing UI polish
