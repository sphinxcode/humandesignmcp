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

// Center configuration with shape, position, and dimensions
// ViewBox: 0 0 400 600
export interface CenterConfig {
  id: string;
  name: string;
  shape: 'triangle-up' | 'triangle-down' | 'square' | 'diamond' | 'triangle-left' | 'triangle-right';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  gates: number[];
  theme: string;
}

export const CENTER_CONFIG: CenterConfig[] = [
  {
    id: 'head',
    name: 'Head',
    shape: 'triangle-up',
    x: 200,
    y: 50,
    width: 80,
    height: 70,
    color: '#FFCC00',
    gates: [64, 61, 63],
    theme: 'Inspiration & mental pressure'
  },
  {
    id: 'ajna',
    name: 'Ajna',
    shape: 'triangle-down',
    x: 200,
    y: 120,
    width: 90,
    height: 80,
    color: '#D8C4A0',
    gates: [47, 24, 4, 17, 11, 43],
    theme: 'Awareness & conceptualization'
  },
  {
    id: 'throat',
    name: 'Throat',
    shape: 'square',
    x: 200,
    y: 210,
    width: 100,
    height: 80,
    color: '#8F4A56',
    gates: [62, 23, 56, 16, 20, 31, 8, 33, 35, 12, 45],
    theme: 'Communication & manifestation'
  },
  {
    id: 'g',
    name: 'G Center',
    shape: 'diamond',
    x: 200,
    y: 310,
    width: 90,
    height: 90,
    color: '#FFCC00',
    gates: [1, 7, 13, 10, 25, 15, 46, 2],
    theme: 'Identity & direction'
  },
  {
    id: 'heart',
    name: 'Heart/Ego',
    shape: 'triangle-right',  // Points RIGHT (away from body)
    x: 290,
    y: 340,
    width: 60,
    height: 55,
    color: '#FFD57D',
    gates: [21, 51, 26, 40],
    theme: 'Willpower & self-worth'
  },
  {
    id: 'spleen',
    name: 'Spleen',
    shape: 'triangle-left',  // Points LEFT (toward body center)
    x: 70,
    y: 420,
    width: 70,
    height: 90,
    color: '#6D5000',
    gates: [48, 57, 44, 50, 32, 28, 18],
    theme: 'Intuition & survival'
  },
  {
    id: 'solar',
    name: 'Solar Plexus',
    shape: 'triangle-right',  // Points RIGHT (away from body)
    x: 330,
    y: 420,
    width: 70,
    height: 90,
    color: '#6D5000',
    gates: [36, 22, 37, 6, 49, 55, 30],
    theme: 'Emotions & feelings'
  },
  {
    id: 'sacral',
    name: 'Sacral',
    shape: 'square',
    x: 200,
    y: 460,
    width: 100,
    height: 80,
    color: '#8F4A56',
    gates: [5, 14, 29, 59, 27, 34, 42, 3, 9],
    theme: 'Life force & work energy'
  },
  {
    id: 'root',
    name: 'Root',
    shape: 'square',
    x: 200,
    y: 555,
    width: 100,
    height: 80,
    color: '#FF5F57',
    gates: [53, 60, 52, 19, 54, 38, 58, 39, 41],
    theme: 'Pressure & adrenaline'
  }
];

// Gate positions RELATIVE to their center
// row/col define position within center's gate grid
// Each center has its own layout pattern
export interface GateLayout {
  gate: number;
  center: string;
  row: number;    // Row within center (0 = top)
  col: number;    // Column within center (0 = left, 1 = center, 2 = right)
  edge?: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';  // For gates on edges
}

export const GATE_LAYOUTS: GateLayout[] = [
  // HEAD (3 gates in 1 row at bottom edge)
  { gate: 64, center: 'head', row: 0, col: 0, edge: 'bottom' },
  { gate: 61, center: 'head', row: 0, col: 1, edge: 'bottom' },
  { gate: 63, center: 'head', row: 0, col: 2, edge: 'bottom' },

  // AJNA (6 gates: 3 top row, 2 middle, 1 bottom)
  { gate: 47, center: 'ajna', row: 0, col: 0, edge: 'top' },
  { gate: 24, center: 'ajna', row: 0, col: 1, edge: 'top' },
  { gate: 4, center: 'ajna', row: 0, col: 2, edge: 'top' },
  { gate: 17, center: 'ajna', row: 1, col: 0 },
  { gate: 11, center: 'ajna', row: 1, col: 2 },
  { gate: 43, center: 'ajna', row: 2, col: 1, edge: 'bottom' },

  // THROAT (11 gates in organized rows)
  { gate: 62, center: 'throat', row: 0, col: 0, edge: 'top' },
  { gate: 23, center: 'throat', row: 0, col: 1, edge: 'top' },
  { gate: 56, center: 'throat', row: 0, col: 2, edge: 'top' },
  { gate: 16, center: 'throat', row: 1, col: 0, edge: 'left' },
  { gate: 35, center: 'throat', row: 1, col: 2, edge: 'right' },
  { gate: 20, center: 'throat', row: 2, col: 0, edge: 'left' },
  { gate: 12, center: 'throat', row: 2, col: 2, edge: 'right' },
  { gate: 31, center: 'throat', row: 3, col: 0, edge: 'bottom' },
  { gate: 8, center: 'throat', row: 3, col: 1, edge: 'bottom' },
  { gate: 33, center: 'throat', row: 3, col: 2, edge: 'bottom' },
  { gate: 45, center: 'throat', row: 2, col: 1 },

  // G CENTER (8 gates in diamond pattern)
  { gate: 1, center: 'g', row: 0, col: 1, edge: 'top' },
  { gate: 7, center: 'g', row: 1, col: 0 },
  { gate: 13, center: 'g', row: 1, col: 2 },
  { gate: 10, center: 'g', row: 2, col: 0, edge: 'left' },
  { gate: 25, center: 'g', row: 1, col: 1 },
  { gate: 15, center: 'g', row: 3, col: 0 },
  { gate: 46, center: 'g', row: 3, col: 2 },
  { gate: 2, center: 'g', row: 4, col: 1, edge: 'bottom' },

  // HEART/EGO (4 gates)
  { gate: 21, center: 'heart', row: 0, col: 0, edge: 'top' },
  { gate: 51, center: 'heart', row: 1, col: 0 },
  { gate: 26, center: 'heart', row: 2, col: 0, edge: 'bottom' },
  { gate: 40, center: 'heart', row: 1, col: 1, edge: 'right' },

  // SPLEEN (7 gates along left edge, vertically arranged)
  { gate: 48, center: 'spleen', row: 0, col: 0, edge: 'top' },
  { gate: 57, center: 'spleen', row: 1, col: 0 },
  { gate: 44, center: 'spleen', row: 2, col: 0 },
  { gate: 50, center: 'spleen', row: 3, col: 0 },
  { gate: 32, center: 'spleen', row: 4, col: 0 },
  { gate: 28, center: 'spleen', row: 5, col: 0 },
  { gate: 18, center: 'spleen', row: 6, col: 0, edge: 'bottom' },

  // SOLAR PLEXUS (7 gates along right edge, vertically arranged)
  { gate: 36, center: 'solar', row: 0, col: 0, edge: 'top' },
  { gate: 22, center: 'solar', row: 1, col: 0 },
  { gate: 37, center: 'solar', row: 2, col: 0 },
  { gate: 6, center: 'solar', row: 3, col: 0 },
  { gate: 49, center: 'solar', row: 4, col: 0 },
  { gate: 55, center: 'solar', row: 5, col: 0 },
  { gate: 30, center: 'solar', row: 6, col: 0, edge: 'bottom' },

  // SACRAL (9 gates in 3x3 grid)
  { gate: 5, center: 'sacral', row: 0, col: 0, edge: 'top' },
  { gate: 14, center: 'sacral', row: 0, col: 1, edge: 'top' },
  { gate: 29, center: 'sacral', row: 0, col: 2, edge: 'top' },
  { gate: 27, center: 'sacral', row: 1, col: 0 },
  { gate: 34, center: 'sacral', row: 1, col: 1 },
  { gate: 59, center: 'sacral', row: 1, col: 2 },
  { gate: 42, center: 'sacral', row: 2, col: 0, edge: 'bottom' },
  { gate: 3, center: 'sacral', row: 2, col: 1, edge: 'bottom' },
  { gate: 9, center: 'sacral', row: 2, col: 2, edge: 'bottom' },

  // ROOT (9 gates in 3x3 grid)
  { gate: 53, center: 'root', row: 0, col: 0, edge: 'top' },
  { gate: 60, center: 'root', row: 0, col: 1, edge: 'top' },
  { gate: 52, center: 'root', row: 0, col: 2, edge: 'top' },
  { gate: 54, center: 'root', row: 1, col: 0 },
  { gate: 19, center: 'root', row: 1, col: 2 },
  { gate: 38, center: 'root', row: 2, col: 0, edge: 'bottom' },
  { gate: 58, center: 'root', row: 2, col: 1, edge: 'bottom' },
  { gate: 39, center: 'root', row: 1, col: 1 },
  { gate: 41, center: 'root', row: 2, col: 2, edge: 'bottom' }
];

// Calculate actual gate positions based on center position and layout
export function calculateGatePosition(
  gate: number,
  gateRadius: number = 8
): { x: number; y: number; center: string } | null {
  const layout = GATE_LAYOUTS.find(g => g.gate === gate);
  if (!layout) return null;

  const center = CENTER_CONFIG.find(c => c.id === layout.center);
  if (!center) return null;

  // Calculate position based on center type and gate layout
  let x = center.x;
  let y = center.y;

  const halfW = center.width / 2;
  const halfH = center.height / 2;

  // Different positioning logic based on center shape
  switch (center.shape) {
    case 'triangle-up': {
      // Gates at bottom edge of upward triangle
      const gateCount = center.gates.length;
      const spacing = center.width / (gateCount + 1);
      x = center.x - halfW + spacing * (layout.col + 1);
      y = center.y + halfH - gateRadius;
      break;
    }

    case 'triangle-down': {
      // Ajna: gates at top and bottom
      if (layout.edge === 'top') {
        const spacing = center.width / 4;
        x = center.x - halfW + spacing * (layout.col + 1);
        y = center.y - halfH + gateRadius;
      } else if (layout.edge === 'bottom') {
        x = center.x;
        y = center.y + halfH - gateRadius;
      } else {
        // Middle gates
        const spacing = center.width / 4;
        x = center.x - halfW + spacing * (layout.col + 1);
        y = center.y;
      }
      break;
    }

    case 'triangle-left': {
      // Spleen: gates arranged vertically along the right edge (pointing toward center)
      const gateCount = center.gates.length;
      const vertSpacing = center.height / (gateCount + 1);
      x = center.x + halfW - gateRadius - 5;  // Near right edge (the base of left-pointing triangle)
      y = center.y - halfH + vertSpacing * (layout.row + 1);
      break;
    }

    case 'triangle-right': {
      // Solar/Heart: gates arranged vertically along the left edge (the base)
      if (center.id === 'heart') {
        // Heart has fewer gates, different layout
        const vertSpacing = center.height / 4;
        if (layout.edge === 'right') {
          x = center.x + halfW - gateRadius;
          y = center.y;
        } else {
          x = center.x - halfW + gateRadius + 5;
          y = center.y - halfH + vertSpacing * (layout.row + 1);
        }
      } else {
        // Solar plexus - vertical arrangement
        const gateCount = center.gates.length;
        const vertSpacing = center.height / (gateCount + 1);
        x = center.x - halfW + gateRadius + 5;  // Near left edge (the base of right-pointing triangle)
        y = center.y - halfH + vertSpacing * (layout.row + 1);
      }
      break;
    }

    case 'diamond': {
      // G Center: gates in diamond pattern
      const rows = 5;
      const rowHeight = center.height / rows;

      if (layout.edge === 'top') {
        x = center.x;
        y = center.y - halfH + gateRadius;
      } else if (layout.edge === 'bottom') {
        x = center.x;
        y = center.y + halfH - gateRadius;
      } else if (layout.edge === 'left') {
        x = center.x - halfW + gateRadius;
        y = center.y;
      } else {
        // Interior gates
        const colOffset = (layout.col - 1) * 25;
        x = center.x + colOffset;
        y = center.y - halfH + rowHeight * (layout.row + 0.5);
      }
      break;
    }

    case 'square':
    default: {
      // Throat, Sacral, Root: grid layout
      const cols = 3;
      const rows = center.id === 'throat' ? 4 : 3;
      const colSpacing = center.width / (cols + 1);
      const rowSpacing = center.height / (rows + 1);

      x = center.x - halfW + colSpacing * (layout.col + 1);
      y = center.y - halfH + rowSpacing * (layout.row + 1);
      break;
    }
  }

  return { x, y, center: layout.center };
}

// Get all gate positions
export function getAllGatePositions(gateRadius: number = 8): Record<number, { x: number; y: number; center: string }> {
  const positions: Record<number, { x: number; y: number; center: string }> = {};

  for (let gate = 1; gate <= 64; gate++) {
    const pos = calculateGatePosition(gate, gateRadius);
    if (pos) {
      positions[gate] = pos;
    }
  }

  return positions;
}

// 36 Channels
export interface ChannelData {
  gates: [number, number];
  centers: [string, string];
  name: string;
}

export const CHANNELS: ChannelData[] = [
  // Head-Ajna
  { gates: [64, 47], centers: ['head', 'ajna'], name: 'Abstraction' },
  { gates: [61, 24], centers: ['head', 'ajna'], name: 'Awareness' },
  { gates: [63, 4], centers: ['head', 'ajna'], name: 'Logic' },

  // Ajna-Throat
  { gates: [17, 62], centers: ['ajna', 'throat'], name: 'Acceptance' },
  { gates: [43, 23], centers: ['ajna', 'throat'], name: 'Structuring' },
  { gates: [11, 56], centers: ['ajna', 'throat'], name: 'Curiosity' },

  // G-Throat
  { gates: [7, 31], centers: ['g', 'throat'], name: 'The Alpha' },
  { gates: [1, 8], centers: ['g', 'throat'], name: 'Inspiration' },
  { gates: [13, 33], centers: ['g', 'throat'], name: 'The Prodigal' },

  // Integration channels
  { gates: [10, 20], centers: ['g', 'throat'], name: 'Awakening' },
  { gates: [10, 34], centers: ['g', 'sacral'], name: 'Exploration' },
  { gates: [10, 57], centers: ['g', 'spleen'], name: 'Perfected Form' },
  { gates: [20, 57], centers: ['throat', 'spleen'], name: 'The Brainwave' },
  { gates: [20, 34], centers: ['throat', 'sacral'], name: 'Charisma' },
  { gates: [34, 57], centers: ['sacral', 'spleen'], name: 'Power' },

  // G-Heart
  { gates: [25, 51], centers: ['g', 'heart'], name: 'Initiation' },

  // Heart-Throat
  { gates: [21, 45], centers: ['heart', 'throat'], name: 'Money' },

  // Heart-Spleen
  { gates: [26, 44], centers: ['heart', 'spleen'], name: 'Surrender' },

  // Heart-Solar Plexus
  { gates: [40, 37], centers: ['heart', 'solar'], name: 'Community' },

  // G-Sacral
  { gates: [46, 29], centers: ['g', 'sacral'], name: 'Discovery' },
  { gates: [2, 14], centers: ['g', 'sacral'], name: 'The Beat' },
  { gates: [15, 5], centers: ['g', 'sacral'], name: 'Rhythm' },

  // Throat-Spleen
  { gates: [16, 48], centers: ['throat', 'spleen'], name: 'The Wavelength' },

  // Throat-Solar Plexus
  { gates: [12, 22], centers: ['throat', 'solar'], name: 'Openness' },
  { gates: [35, 36], centers: ['throat', 'solar'], name: 'Transitoriness' },

  // Spleen-Sacral
  { gates: [50, 27], centers: ['spleen', 'sacral'], name: 'Preservation' },

  // Spleen-Root
  { gates: [18, 58], centers: ['spleen', 'root'], name: 'Judgment' },
  { gates: [28, 38], centers: ['spleen', 'root'], name: 'Struggle' },
  { gates: [32, 54], centers: ['spleen', 'root'], name: 'Transformation' },

  // Solar Plexus-Sacral
  { gates: [6, 59], centers: ['solar', 'sacral'], name: 'Intimacy' },

  // Solar Plexus-Root
  { gates: [30, 41], centers: ['solar', 'root'], name: 'Recognition' },
  { gates: [49, 19], centers: ['solar', 'root'], name: 'Synthesis' },
  { gates: [55, 39], centers: ['solar', 'root'], name: 'Emoting' },

  // Sacral-Root
  { gates: [3, 60], centers: ['sacral', 'root'], name: 'Mutation' },
  { gates: [9, 52], centers: ['sacral', 'root'], name: 'Concentration' },
  { gates: [42, 53], centers: ['sacral', 'root'], name: 'Maturation' }
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
  10: [20, 34, 57],
  11: [56],
  12: [22],
  13: [33],
  14: [2],
  15: [5],
  16: [48],
  17: [62],
  18: [58],
  19: [49],
  20: [10, 34, 57],
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
  34: [10, 20, 57],
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
  57: [10, 20, 34],
  58: [18],
  59: [6],
  60: [3],
  61: [24],
  62: [17],
  63: [4],
  64: [47]
};
