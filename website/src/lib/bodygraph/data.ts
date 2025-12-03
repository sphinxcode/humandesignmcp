// Bodygraph data - Centers, Channels, Gates
// Based on Figma design: https://www.figma.com/design/0NWHzdYNueF6AlCybSCUD0/HD-Bodygraph

export const GATE_NAMES: Record<number, string> = {
  1: "The Creative",
  2: "The Receptive",
  3: "Ordering",
  4: "Youthful Folly",
  5: "Waiting",
  6: "Conflict",
  7: "The Army",
  8: "Contribution",
  9: "Focus",
  10: "Treading",
  11: "Peace",
  12: "Caution",
  13: "The Listener",
  14: "Power Skills",
  15: "Extremes",
  16: "Skills",
  17: "Following",
  18: "Correction",
  19: "Wanting",
  20: "The Now",
  21: "Hunter/Huntress",
  22: "Openness",
  23: "Assimilation",
  24: "Returning",
  25: "Innocence",
  26: "The Egoist",
  27: "Nourishment",
  28: "The Game Player",
  29: "Saying Yes",
  30: "Recognition of Feelings",
  31: "Leading",
  32: "Continuity",
  33: "Privacy",
  34: "Power",
  35: "Change",
  36: "Crisis",
  37: "Friendship",
  38: "The Fighter",
  39: "The Provocateur",
  40: "Aloneness",
  41: "Contraction",
  42: "Growth",
  43: "Insight",
  44: "Alertness",
  45: "The Gatherer",
  46: "Determination of Self",
  47: "Realization",
  48: "Depth",
  49: "Rejection",
  50: "Values",
  51: "Shock",
  52: "Stillness",
  53: "Beginnings",
  54: "Ambition",
  55: "Spirit",
  56: "Stimulation",
  57: "Intuition",
  58: "Aliveness",
  59: "Sexuality",
  60: "Acceptance",
  61: "Mystery",
  62: "Detail",
  63: "Doubt",
  64: "Confusion"
};

export const GATE_KEYWORDS: Record<number, string> = {
  1: "Self-Expression",
  2: "Direction of Self",
  3: "Ordering",
  4: "Formulization",
  5: "Fixed Rhythms",
  6: "Friction",
  7: "Role of the Self",
  8: "Contribution",
  9: "Focus",
  10: "Behavior of the Self",
  11: "Ideas",
  12: "Caution",
  13: "The Listener",
  14: "Power Skills",
  15: "Extremes",
  16: "Skills",
  17: "Opinions",
  18: "Correction",
  19: "Wanting",
  20: "The Now",
  21: "Hunter/Huntress",
  22: "Openness",
  23: "Assimilation",
  24: "Rationalizing",
  25: "Spirit of Self",
  26: "The Egoist",
  27: "Caring",
  28: "The Game Player",
  29: "Saying Yes",
  30: "Recognition of Feelings",
  31: "Leading",
  32: "Continuity",
  33: "Privacy",
  34: "Might",
  35: "Change",
  36: "Crisis",
  37: "Friendship",
  38: "Fighter",
  39: "The Provocateur",
  40: "Aloneness",
  41: "Contraction",
  42: "Growth",
  43: "Insight",
  44: "Alertness",
  45: "Gatherer",
  46: "Determination of Self",
  47: "Realizing",
  48: "Depth",
  49: "Rejection",
  50: "Values",
  51: "Shock",
  52: "Inaction",
  53: "Beginnings",
  54: "Ambition",
  55: "Spirit",
  56: "Stimulation",
  57: "Intuition",
  58: "Aliveness",
  59: "Sexuality",
  60: "Acceptance",
  61: "Mystery",
  62: "Detail",
  63: "Doubt",
  64: "Confusion"
};

// 36 Channels with their gates and connecting centers
export interface ChannelData {
  gates: [number, number];
  centers: [string, string];
  name: string;
  type: 'Individual' | 'Collective' | 'Tribal';
  circuit: string;
}

export const CHANNELS: ChannelData[] = [
  // Head-Ajna
  { gates: [64, 47], centers: ['head', 'ajna'], name: 'Abstraction', type: 'Collective', circuit: 'Sensing' },
  { gates: [61, 24], centers: ['head', 'ajna'], name: 'Awareness', type: 'Individual', circuit: 'Knowing' },
  { gates: [63, 4], centers: ['head', 'ajna'], name: 'Logic', type: 'Collective', circuit: 'Understanding' },

  // Ajna-Throat
  { gates: [17, 62], centers: ['ajna', 'throat'], name: 'Acceptance', type: 'Collective', circuit: 'Understanding' },
  { gates: [43, 23], centers: ['ajna', 'throat'], name: 'Structuring', type: 'Individual', circuit: 'Knowing' },
  { gates: [11, 56], centers: ['ajna', 'throat'], name: 'Curiosity', type: 'Collective', circuit: 'Sensing' },

  // G-Throat
  { gates: [7, 31], centers: ['g', 'throat'], name: 'The Alpha', type: 'Collective', circuit: 'Understanding' },
  { gates: [1, 8], centers: ['g', 'throat'], name: 'Inspiration', type: 'Individual', circuit: 'Knowing' },
  { gates: [13, 33], centers: ['g', 'throat'], name: 'The Prodigal', type: 'Collective', circuit: 'Sensing' },

  // Integration channels (G-Throat, G-Sacral, G-Spleen)
  { gates: [10, 20], centers: ['g', 'throat'], name: 'Awakening', type: 'Individual', circuit: 'Integration' },
  { gates: [10, 34], centers: ['g', 'sacral'], name: 'Exploration', type: 'Individual', circuit: 'Integration' },
  { gates: [10, 57], centers: ['g', 'spleen'], name: 'Perfected Form', type: 'Individual', circuit: 'Integration' },

  // G-Heart
  { gates: [25, 51], centers: ['g', 'heart'], name: 'Initiation', type: 'Individual', circuit: 'Centering' },

  // Heart-Throat
  { gates: [21, 45], centers: ['heart', 'throat'], name: 'Money', type: 'Tribal', circuit: 'Ego' },

  // Heart-Spleen
  { gates: [26, 44], centers: ['heart', 'spleen'], name: 'Surrender', type: 'Tribal', circuit: 'Ego' },

  // Heart-Solar Plexus
  { gates: [40, 37], centers: ['heart', 'solar'], name: 'Community', type: 'Tribal', circuit: 'Ego' },

  // G-Sacral
  { gates: [46, 29], centers: ['g', 'sacral'], name: 'Discovery', type: 'Collective', circuit: 'Sensing' },
  { gates: [2, 14], centers: ['g', 'sacral'], name: 'The Beat', type: 'Individual', circuit: 'Knowing' },
  { gates: [15, 5], centers: ['g', 'sacral'], name: 'Rhythm', type: 'Collective', circuit: 'Understanding' },

  // Throat-Spleen
  { gates: [16, 48], centers: ['throat', 'spleen'], name: 'The Wavelength', type: 'Collective', circuit: 'Understanding' },
  { gates: [20, 57], centers: ['throat', 'spleen'], name: 'The Brainwave', type: 'Individual', circuit: 'Integration' },

  // Throat-Solar Plexus
  { gates: [12, 22], centers: ['throat', 'solar'], name: 'Openness', type: 'Individual', circuit: 'Knowing' },
  { gates: [35, 36], centers: ['throat', 'solar'], name: 'Transitoriness', type: 'Collective', circuit: 'Sensing' },

  // Spleen-Sacral
  { gates: [50, 27], centers: ['spleen', 'sacral'], name: 'Preservation', type: 'Tribal', circuit: 'Defense' },
  { gates: [57, 34], centers: ['spleen', 'sacral'], name: 'Power', type: 'Individual', circuit: 'Integration' },

  // Throat-Sacral (Integration)
  { gates: [34, 20], centers: ['sacral', 'throat'], name: 'Charisma', type: 'Individual', circuit: 'Integration' },

  // Spleen-Root
  { gates: [18, 58], centers: ['spleen', 'root'], name: 'Judgment', type: 'Collective', circuit: 'Understanding' },
  { gates: [28, 38], centers: ['spleen', 'root'], name: 'Struggle', type: 'Individual', circuit: 'Knowing' },
  { gates: [32, 54], centers: ['spleen', 'root'], name: 'Transformation', type: 'Tribal', circuit: 'Ego' },

  // Solar Plexus-Sacral
  { gates: [6, 59], centers: ['solar', 'sacral'], name: 'Intimacy', type: 'Tribal', circuit: 'Defense' },

  // Solar Plexus-Root
  { gates: [30, 41], centers: ['solar', 'root'], name: 'Recognition', type: 'Collective', circuit: 'Sensing' },
  { gates: [49, 19], centers: ['solar', 'root'], name: 'Synthesis', type: 'Tribal', circuit: 'Defense' },
  { gates: [55, 39], centers: ['solar', 'root'], name: 'Emoting', type: 'Individual', circuit: 'Knowing' },

  // Sacral-Root
  { gates: [3, 60], centers: ['sacral', 'root'], name: 'Mutation', type: 'Individual', circuit: 'Knowing' },
  { gates: [9, 52], centers: ['sacral', 'root'], name: 'Concentration', type: 'Collective', circuit: 'Understanding' },
  { gates: [42, 53], centers: ['sacral', 'root'], name: 'Maturation', type: 'Collective', circuit: 'Sensing' },
];

// Center shapes and positions for SVG (ViewBox: 0 0 360 520)
export interface CenterConfig {
  id: string;
  name: string;
  shape: 'triangle-up' | 'triangle-down' | 'square' | 'diamond' | 'triangle-left' | 'triangle-right';
  x: number;
  y: number;
  width: number;
  height: number;
  gates: number[];
  color: string;
  biologicalCorrelation: string;
  theme: string;
}

export const CENTER_CONFIG: CenterConfig[] = [
  {
    id: 'head',
    name: 'Head',
    shape: 'triangle-up',
    x: 180,
    y: 36,
    width: 70,
    height: 42,
    gates: [64, 61, 63],
    color: '#FFCC00',
    biologicalCorrelation: 'Pineal Gland',
    theme: 'Inspiration & Mental Pressure'
  },
  {
    id: 'ajna',
    name: 'Ajna',
    shape: 'triangle-down',
    x: 180,
    y: 90,
    width: 72,
    height: 50,
    gates: [47, 24, 4, 17, 43, 11],
    color: '#D8C4A0',
    biologicalCorrelation: 'Anterior & Posterior Pituitary',
    theme: 'Conceptualization & Mental Awareness'
  },
  {
    id: 'throat',
    name: 'Throat',
    shape: 'square',
    x: 180,
    y: 168,
    width: 80,
    height: 60,
    gates: [62, 23, 56, 16, 20, 31, 8, 33, 45, 35, 12],
    color: '#8F4A56',
    biologicalCorrelation: 'Thyroid & Parathyroid',
    theme: 'Communication & Manifestation'
  },
  {
    id: 'g',
    name: 'G Center',
    shape: 'diamond',
    x: 180,
    y: 268,
    width: 70,
    height: 70,
    gates: [1, 7, 13, 10, 25, 46, 2, 15],
    color: '#FFCC00',
    biologicalCorrelation: 'Liver & Blood',
    theme: 'Identity, Love & Direction'
  },
  {
    id: 'heart',
    name: 'Heart/Ego',
    shape: 'triangle-right',
    x: 260,
    y: 285,
    width: 45,
    height: 40,
    gates: [21, 51, 26, 40],
    color: '#FFD57D',
    biologicalCorrelation: 'Heart, Stomach, Thymus, Gallbladder',
    theme: 'Willpower & Material World'
  },
  {
    id: 'spleen',
    name: 'Spleen',
    shape: 'triangle-left',
    x: 45,
    y: 365,
    width: 55,
    height: 65,
    gates: [48, 57, 44, 50, 32, 28, 18],
    color: '#6D5000',
    biologicalCorrelation: 'Lymphatic System, Spleen',
    theme: 'Survival, Intuition & Health'
  },
  {
    id: 'solar',
    name: 'Solar Plexus',
    shape: 'triangle-right',
    x: 315,
    y: 365,
    width: 55,
    height: 65,
    gates: [36, 22, 37, 6, 49, 55, 30],
    color: '#6D5000',
    biologicalCorrelation: 'Kidneys, Pancreas, Prostate/Ovaries, Nervous System',
    theme: 'Emotions & Feelings'
  },
  {
    id: 'sacral',
    name: 'Sacral',
    shape: 'square',
    x: 180,
    y: 390,
    width: 80,
    height: 55,
    gates: [5, 14, 29, 59, 27, 34, 42, 3, 9],
    color: '#8F4A56',
    biologicalCorrelation: 'Ovaries & Testes',
    theme: 'Life Force, Sexuality & Work'
  },
  {
    id: 'root',
    name: 'Root',
    shape: 'square',
    x: 180,
    y: 478,
    width: 80,
    height: 55,
    gates: [53, 60, 52, 54, 38, 58, 19, 39, 41],
    color: '#FF5F57',
    biologicalCorrelation: 'Adrenal Glands',
    theme: 'Adrenaline & Pressure'
  }
];

// Gate positions on the bodygraph (x, y coordinates for each gate marker)
// ViewBox: 0 0 360 520
export const GATE_POSITIONS: Record<number, { x: number; y: number; center: string }> = {
  // Head gates (3)
  64: { x: 157, y: 22, center: 'head' },
  61: { x: 180, y: 22, center: 'head' },
  63: { x: 203, y: 22, center: 'head' },

  // Ajna gates (6)
  47: { x: 157, y: 68, center: 'ajna' },
  24: { x: 180, y: 68, center: 'ajna' },
  4: { x: 203, y: 68, center: 'ajna' },
  17: { x: 157, y: 112, center: 'ajna' },
  43: { x: 180, y: 118, center: 'ajna' },
  11: { x: 203, y: 112, center: 'ajna' },

  // Throat gates (11)
  62: { x: 148, y: 145, center: 'throat' },
  23: { x: 172, y: 152, center: 'throat' },
  56: { x: 212, y: 145, center: 'throat' },
  16: { x: 130, y: 168, center: 'throat' },
  20: { x: 142, y: 180, center: 'throat' },
  31: { x: 158, y: 192, center: 'throat' },
  8: { x: 180, y: 185, center: 'throat' },
  33: { x: 218, y: 192, center: 'throat' },
  45: { x: 142, y: 195, center: 'throat' },
  35: { x: 230, y: 168, center: 'throat' },
  12: { x: 230, y: 182, center: 'throat' },

  // G Center gates (8)
  1: { x: 180, y: 240, center: 'g' },
  7: { x: 165, y: 252, center: 'g' },
  13: { x: 195, y: 252, center: 'g' },
  10: { x: 152, y: 268, center: 'g' },
  25: { x: 200, y: 258, center: 'g' },
  46: { x: 200, y: 285, center: 'g' },
  2: { x: 180, y: 295, center: 'g' },
  15: { x: 160, y: 285, center: 'g' },

  // Heart gates (4)
  21: { x: 252, y: 272, center: 'heart' },
  51: { x: 268, y: 282, center: 'heart' },
  26: { x: 275, y: 305, center: 'heart' },
  40: { x: 268, y: 295, center: 'heart' },

  // Spleen gates (7)
  48: { x: 58, y: 335, center: 'spleen' },
  57: { x: 48, y: 348, center: 'spleen' },
  44: { x: 38, y: 362, center: 'spleen' },
  50: { x: 48, y: 375, center: 'spleen' },
  32: { x: 42, y: 392, center: 'spleen' },
  28: { x: 52, y: 405, center: 'spleen' },
  18: { x: 62, y: 418, center: 'spleen' },

  // Solar Plexus gates (7)
  36: { x: 302, y: 335, center: 'solar' },
  22: { x: 312, y: 348, center: 'solar' },
  37: { x: 305, y: 365, center: 'solar' },
  6: { x: 315, y: 378, center: 'solar' },
  49: { x: 322, y: 392, center: 'solar' },
  55: { x: 318, y: 405, center: 'solar' },
  30: { x: 308, y: 418, center: 'solar' },

  // Sacral gates (9)
  5: { x: 152, y: 368, center: 'sacral' },
  14: { x: 168, y: 375, center: 'sacral' },
  29: { x: 192, y: 375, center: 'sacral' },
  59: { x: 215, y: 385, center: 'sacral' },
  27: { x: 145, y: 395, center: 'sacral' },
  34: { x: 180, y: 398, center: 'sacral' },
  42: { x: 158, y: 415, center: 'sacral' },
  3: { x: 180, y: 418, center: 'sacral' },
  9: { x: 202, y: 415, center: 'sacral' },

  // Root gates (9)
  53: { x: 152, y: 455, center: 'root' },
  60: { x: 168, y: 462, center: 'root' },
  52: { x: 192, y: 462, center: 'root' },
  54: { x: 210, y: 455, center: 'root' },
  38: { x: 165, y: 492, center: 'root' },
  58: { x: 145, y: 485, center: 'root' },
  19: { x: 218, y: 470, center: 'root' },
  39: { x: 225, y: 485, center: 'root' },
  41: { x: 208, y: 498, center: 'root' }
};

// Channel paths for SVG rendering
export interface ChannelPath {
  gates: [number, number];
  path: string; // SVG path d attribute
}

export const CHANNEL_PATHS: ChannelPath[] = [
  // Head-Ajna channels (vertical)
  { gates: [64, 47], path: "M157,22 L157,68" },
  { gates: [61, 24], path: "M180,22 L180,68" },
  { gates: [63, 4], path: "M203,22 L203,68" },

  // Ajna-Throat channels
  { gates: [17, 62], path: "M157,112 L148,145" },
  { gates: [43, 23], path: "M180,118 L172,152" },
  { gates: [11, 56], path: "M203,112 L212,145" },

  // G-Throat channels
  { gates: [7, 31], path: "M165,252 L158,192" },
  { gates: [1, 8], path: "M180,240 L180,185" },
  { gates: [13, 33], path: "M195,252 L218,192" },

  // Integration channels
  { gates: [10, 20], path: "M152,268 Q130,220 142,180" },
  { gates: [10, 34], path: "M152,268 Q160,330 180,398" },
  { gates: [10, 57], path: "M152,268 Q100,310 48,348" },
  { gates: [20, 57], path: "M142,180 Q95,265 48,348" },
  { gates: [20, 34], path: "M142,180 Q160,290 180,398" },
  { gates: [34, 57], path: "M180,398 Q115,380 48,348" },

  // G-Heart channel
  { gates: [25, 51], path: "M200,258 Q235,270 268,282" },

  // Heart-Throat channel
  { gates: [21, 45], path: "M252,272 Q200,235 142,195" },

  // Heart-Spleen channel
  { gates: [26, 44], path: "M275,305 Q150,340 38,362" },

  // Heart-Solar Plexus channel
  { gates: [40, 37], path: "M268,295 Q290,330 305,365" },

  // G-Sacral channels
  { gates: [46, 29], path: "M200,285 L192,375" },
  { gates: [2, 14], path: "M180,295 L168,375" },
  { gates: [15, 5], path: "M160,285 L152,368" },

  // Throat-Spleen channels
  { gates: [16, 48], path: "M130,168 Q90,250 58,335" },

  // Throat-Solar Plexus channels
  { gates: [12, 22], path: "M230,182 Q270,265 312,348" },
  { gates: [35, 36], path: "M230,168 Q270,250 302,335" },

  // Spleen-Sacral channels
  { gates: [50, 27], path: "M48,375 Q95,385 145,395" },

  // Spleen-Root channels
  { gates: [18, 58], path: "M62,418 Q100,455 145,485" },
  { gates: [28, 38], path: "M52,405 Q100,450 165,492" },
  { gates: [32, 54], path: "M42,392 Q125,420 210,455" },

  // Solar Plexus-Sacral channel
  { gates: [6, 59], path: "M315,378 Q265,380 215,385" },

  // Solar Plexus-Root channels
  { gates: [30, 41], path: "M308,418 Q260,460 208,498" },
  { gates: [49, 19], path: "M322,392 Q270,430 218,470" },
  { gates: [55, 39], path: "M318,405 Q270,445 225,485" },

  // Sacral-Root channels
  { gates: [3, 60], path: "M180,418 L168,462" },
  { gates: [9, 52], path: "M202,415 L192,462" },
  { gates: [42, 53], path: "M158,415 L152,455" }
];

// Planet glyphs for displaying planetary activations
export const PLANET_GLYPHS: Record<string, string> = {
  Sun: '\u2609',
  Earth: '\u2A01',
  NorthNode: '\u260A',
  SouthNode: '\u260B',
  Moon: '\u263D',
  Mercury: '\u263F',
  Venus: '\u2640',
  Mars: '\u2642',
  Jupiter: '\u2643',
  Saturn: '\u2644',
  Uranus: '\u2645',
  Neptune: '\u2646',
  Pluto: '\u2647'
};

// Harmonic gates (opposite gates on the Rave Mandala)
export const HARMONIC_GATES: Record<number, number> = {
  1: 2, 2: 1,
  3: 50, 50: 3,
  4: 49, 49: 4,
  5: 35, 35: 5,
  6: 36, 36: 6,
  7: 13, 13: 7,
  8: 14, 14: 8,
  9: 16, 16: 9,
  10: 15, 15: 10,
  11: 12, 12: 11,
  17: 18, 18: 17,
  19: 33, 33: 19,
  20: 34, 34: 20,
  21: 48, 48: 21,
  22: 47, 47: 22,
  23: 43, 43: 23,
  24: 44, 44: 24,
  25: 46, 46: 25,
  26: 45, 45: 26,
  27: 28, 28: 27,
  29: 30, 30: 29,
  31: 41, 41: 31,
  32: 42, 42: 32,
  37: 40, 40: 37,
  38: 39, 39: 38,
  51: 57, 57: 51,
  52: 58, 58: 52,
  53: 54, 54: 53,
  55: 59, 59: 55,
  56: 60, 60: 56,
  61: 62, 62: 61,
  63: 64, 64: 63
};

// Gate connections (which gates form channels)
export const GATE_CONNECTIONS: Record<number, number[]> = {
  1: [8],
  2: [14],
  3: [60],
  4: [63],
  5: [15],
  6: [59],
  7: [31],
  8: [1],
  9: [52],
  10: [20, 34, 57],  // Integration gate
  11: [56],
  12: [22],
  13: [33],
  14: [2],
  15: [5],
  16: [48],
  17: [62],
  18: [58],
  19: [49],
  20: [10, 34, 57],  // Integration gate
  21: [45],
  22: [12],
  23: [43],
  24: [61],
  25: [51],
  26: [44],
  27: [50],
  28: [38],
  29: [46],
  30: [41],
  31: [7],
  32: [54],
  33: [13],
  34: [10, 20, 57],  // Integration gate
  35: [36],
  36: [35],
  37: [40],
  38: [28],
  39: [55],
  40: [37],
  41: [30],
  42: [53],
  43: [23],
  44: [26],
  45: [21],
  46: [29],
  47: [64],
  48: [16],
  49: [19],
  50: [27],
  51: [25],
  52: [9],
  53: [42],
  54: [32],
  55: [39],
  56: [11],
  57: [10, 20, 34],  // Integration gate
  58: [18],
  59: [6],
  60: [3],
  61: [24],
  62: [17],
  63: [4],
  64: [47]
};
