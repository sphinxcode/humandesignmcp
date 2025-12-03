// Coordinate scaling utilities for Bodygraph
// Maps from our data.ts coordinate system (400x620) to Canva SVG (1190.25x1683.75)

import { getAllGatePositions } from './data';

// Canva SVG dimensions
export const CANVA_VIEWBOX = {
  width: 1190.25,
  height: 1683.75
};

// Data.ts coordinate system
export const DATA_VIEWBOX = {
  width: 400,
  height: 620
};

// Scale factors
export const SCALE = {
  x: CANVA_VIEWBOX.width / DATA_VIEWBOX.width,  // ~2.976
  y: CANVA_VIEWBOX.height / DATA_VIEWBOX.height  // ~2.716
};

/**
 * Scale a position from data.ts coordinates to Canva SVG coordinates
 */
export function scalePosition(x: number, y: number): { x: number; y: number } {
  return {
    x: x * SCALE.x,
    y: y * SCALE.y
  };
}

/**
 * Get all gate positions scaled to Canva SVG coordinates
 */
export function getScaledGatePositions(gateRadius: number = 8) {
  const dataPositions = getAllGatePositions(gateRadius);
  const scaledPositions: Record<number, { x: number; y: number; center: string }> = {};

  for (const [gate, pos] of Object.entries(dataPositions)) {
    const scaled = scalePosition(pos.x, pos.y);
    scaledPositions[parseInt(gate)] = {
      x: scaled.x,
      y: scaled.y,
      center: pos.center
    };
  }

  return scaledPositions;
}

/**
 * Scale a radius value
 */
export function scaleRadius(radius: number): number {
  return radius * Math.min(SCALE.x, SCALE.y);
}
