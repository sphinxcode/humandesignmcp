'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  GATE_NAMES,
  GATE_KEYWORDS,
  CENTER_CONFIG,
  CHANNELS,
  PLANET_GLYPHS,
  getAllGatePositions,
  GATE_CONNECTIONS
} from '@/lib/bodygraph/data';

interface GateActivation {
  gate: number;
  line: number;
  planet: string;
  type: 'personality' | 'design' | 'both';
}

interface BodygraphSVGProps {
  definedCenters: string[];
  activeGates: GateActivation[];
  activeChannels: Array<{ gates: [number, number]; name: string }>;
  onGateClick?: (gate: number) => void;
  onGateHover?: (gate: number | null) => void;
  showDebugControls?: boolean;
}

export default function BodygraphSVG({
  definedCenters,
  activeGates,
  activeChannels,
  onGateClick,
  onGateHover,
  showDebugControls = true  // Enable debug by default for now
}: BodygraphSVGProps) {
  const [hoveredGate, setHoveredGate] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Debug controls for sizing
  const [gateRadius, setGateRadius] = useState(10);
  const [centerScale, setCenterScale] = useState(1);

  const activeGateNumbers = new Set(activeGates.map(g => g.gate));

  // Calculate gate positions based on current radius
  const gatePositions = useMemo(() => getAllGatePositions(gateRadius), [gateRadius]);

  const handleGateHover = (gate: number | null, event?: React.MouseEvent) => {
    setHoveredGate(gate);
    if (event && gate) {
      const rect = (event.target as SVGElement).getBoundingClientRect();
      setTooltipPosition({ x: rect.x + rect.width / 2, y: rect.y - 10 });
    }
    onGateHover?.(gate);
  };

  const getGateActivation = (gate: number): GateActivation | undefined => {
    return activeGates.find(g => g.gate === gate);
  };

  const isChannelActive = (gate1: number, gate2: number): boolean => {
    return activeChannels.some(
      c => (c.gates[0] === gate1 && c.gates[1] === gate2) ||
           (c.gates[0] === gate2 && c.gates[1] === gate1)
    );
  };

  // Generate channel path between two gates
  const getChannelPath = (gate1: number, gate2: number): string => {
    const pos1 = gatePositions[gate1];
    const pos2 = gatePositions[gate2];
    if (!pos1 || !pos2) return '';
    return `M${pos1.x},${pos1.y} L${pos2.x},${pos2.y}`;
  };

  return (
    <div className="relative">
      {/* Debug Controls */}
      {showDebugControls && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg space-y-3">
          <div className="text-sm font-semibold text-gray-700">Debug Controls</div>
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-600">
              Gate Size: {gateRadius}
              <input
                type="range"
                min="4"
                max="20"
                value={gateRadius}
                onChange={(e) => setGateRadius(Number(e.target.value))}
                className="ml-2 w-24"
              />
            </label>
            <label className="text-sm text-gray-600">
              Center Scale: {centerScale.toFixed(1)}
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={centerScale}
                onChange={(e) => setCenterScale(Number(e.target.value))}
                className="ml-2 w-24"
              />
            </label>
          </div>
        </div>
      )}

      <svg
        viewBox="0 0 400 620"
        className="w-full max-w-lg mx-auto"
        style={{ filter: 'drop-shadow(0 4px 20px rgba(139, 69, 87, 0.1))' }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="definedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A574" />
            <stop offset="100%" stopColor="#C9A227" />
          </linearGradient>
          <linearGradient id="channelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#D4A574" />
          </linearGradient>
          <linearGradient id="gateSplitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1A1A1A" />
            <stop offset="50%" stopColor="#1A1A1A" />
            <stop offset="50%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#C9A227" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Shadow filter */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#8B4557" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="400" height="620" fill="#FFF8F5" rx="16" />

        {/* Channels - Draw first so they appear behind centers */}
        <g className="channels">
          {CHANNELS.map(({ gates }) => {
            const active = isChannelActive(gates[0], gates[1]);
            const hasOneGate = activeGateNumbers.has(gates[0]) !== activeGateNumbers.has(gates[1]);
            const path = getChannelPath(gates[0], gates[1]);

            if (!path) return null;

            return (
              <motion.path
                key={`${gates[0]}-${gates[1]}`}
                d={path}
                fill="none"
                stroke={active ? 'url(#channelGradient)' : '#E8DDD4'}
                strokeWidth={active ? 4 : 2}
                strokeLinecap="round"
                strokeDasharray={hasOneGate && !active ? '6 4' : 'none'}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                filter={active ? 'url(#glow)' : undefined}
              />
            );
          })}
        </g>

        {/* Centers */}
        <g className="centers">
          {CENTER_CONFIG.map((center) => {
            const isDefined = definedCenters.includes(center.id);
            return (
              <CenterShape
                key={center.id}
                center={center}
                isDefined={isDefined}
                scale={centerScale}
              />
            );
          })}
        </g>

        {/* Gates */}
        <g className="gates">
          {Object.entries(gatePositions).map(([gateStr, pos]) => {
            const gate = parseInt(gateStr);
            const activation = getGateActivation(gate);
            const isActive = !!activation;

            return (
              <motion.g
                key={gate}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + gate * 0.01 }}
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? gateRadius : gateRadius * 0.7}
                  fill={
                    activation?.type === 'both'
                      ? 'url(#gateSplitGradient)'
                      : activation?.type === 'personality'
                        ? '#1A1A1A'
                        : activation?.type === 'design'
                          ? '#C9A227'
                          : '#E8DDD4'
                  }
                  stroke={isActive ? '#FFF8F5' : '#666'}
                  strokeWidth={isActive ? 2 : 0.5}
                  className="cursor-pointer transition-transform hover:scale-125"
                  onMouseEnter={(e) => handleGateHover(gate, e)}
                  onMouseLeave={() => handleGateHover(null)}
                  onClick={() => onGateClick?.(gate)}
                  filter={isActive ? 'url(#shadow)' : undefined}
                />
                {/* Gate number label */}
                <text
                  x={pos.x}
                  y={pos.y + 3}
                  textAnchor="middle"
                  fontSize={gateRadius * 0.8}
                  fill={isActive ? '#FFF' : '#333'}
                  fontWeight="600"
                  pointerEvents="none"
                >
                  {gate}
                </text>
              </motion.g>
            );
          })}
        </g>

        {/* Center Labels */}
        <g className="center-labels" fontSize="10" fill="#8B4557" fontWeight="500">
          {CENTER_CONFIG.map((center) => (
            <text
              key={center.id}
              x={center.x}
              y={center.y + 3}
              textAnchor="middle"
              dominantBaseline="middle"
              opacity={0.7}
            >
              {center.name === 'G Center' ? 'G' :
               center.name === 'Solar Plexus' ? 'Solar' :
               center.name === 'Heart/Ego' ? 'Heart' :
               center.name}
            </text>
          ))}
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredGate && (
        <motion.div
          className="fixed z-50 bg-white border border-[#D4A574] rounded-xl px-4 py-3 shadow-lg pointer-events-none"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="text-sm">
            <div className="font-semibold text-[#8B4557]">
              Gate {hoveredGate}: {GATE_NAMES[hoveredGate]}
            </div>
            <div className="text-[#6B4423] mt-1">
              {GATE_KEYWORDS[hoveredGate]}
            </div>
            {getGateActivation(hoveredGate) && (
              <div className="text-xs text-[#C9A227] mt-1">
                {PLANET_GLYPHS[getGateActivation(hoveredGate)!.planet]} {getGateActivation(hoveredGate)!.planet} - Line {getGateActivation(hoveredGate)!.line}
              </div>
            )}
            <div className="text-xs text-gray-500 mt-1">
              Connects to: {GATE_CONNECTIONS[hoveredGate]?.join(', ') || 'None'}
            </div>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6 text-sm text-[#6B4423]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#1A1A1A]" />
          <span>Personality (Conscious)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#C9A227]" />
          <span>Design (Unconscious)</span>
        </div>
      </div>
    </div>
  );
}

interface CenterShapeProps {
  center: typeof CENTER_CONFIG[0];
  isDefined: boolean;
  scale: number;
}

function CenterShape({ center, isDefined, scale }: CenterShapeProps) {
  const fill = isDefined ? center.color : 'white';
  const stroke = isDefined ? '#8B4557' : '#E8DDD4';
  const strokeWidth = isDefined ? 3 : 2;
  const filter = isDefined ? 'url(#glow)' : undefined;
  const opacity = isDefined ? 0.9 : 0.6;

  const { x, y } = center;
  const w = (center.width / 2) * scale;
  const h = (center.height / 2) * scale;

  switch (center.shape) {
    case 'triangle-up':
      // Points UP - apex at top
      return (
        <motion.polygon
          points={`${x},${y - h} ${x - w},${y + h} ${x + w},${y + h}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          filter={filter}
          opacity={opacity}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity }}
          transition={{ delay: 0.2 }}
        />
      );

    case 'triangle-down':
      // Points DOWN - apex at bottom
      return (
        <motion.polygon
          points={`${x},${y + h} ${x - w},${y - h} ${x + w},${y - h}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          filter={filter}
          opacity={opacity}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity }}
          transition={{ delay: 0.25 }}
        />
      );

    case 'triangle-left':
      // Points LEFT - apex on left side (Spleen points toward body center)
      return (
        <motion.polygon
          points={`${x - w},${y} ${x + w},${y - h} ${x + w},${y + h}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          filter={filter}
          opacity={opacity}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity }}
          transition={{ delay: 0.3 }}
        />
      );

    case 'triangle-right':
      // Points RIGHT - apex on right side (Solar/Heart points away from body)
      return (
        <motion.polygon
          points={`${x + w},${y} ${x - w},${y - h} ${x - w},${y + h}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          filter={filter}
          opacity={opacity}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity }}
          transition={{ delay: 0.35 }}
        />
      );

    case 'diamond':
      return (
        <motion.polygon
          points={`${x},${y - h} ${x + w},${y} ${x},${y + h} ${x - w},${y}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          filter={filter}
          opacity={opacity}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity }}
          transition={{ delay: 0.4 }}
        />
      );

    case 'square':
    default:
      return (
        <motion.rect
          x={x - w}
          y={y - h}
          width={w * 2}
          height={h * 2}
          rx={4}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          filter={filter}
          opacity={opacity}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity }}
          transition={{ delay: 0.45 }}
        />
      );
  }
}
