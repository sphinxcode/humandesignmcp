'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GATE_NAMES, GATE_KEYWORDS, CENTER_CONFIG, CHANNEL_PATHS, GATE_POSITIONS, PLANET_GLYPHS } from '@/lib/bodygraph/data';

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
}

export default function BodygraphSVG({
  definedCenters,
  activeGates,
  activeChannels,
  onGateClick,
  onGateHover
}: BodygraphSVGProps) {
  const [hoveredGate, setHoveredGate] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const activeGateNumbers = new Set(activeGates.map(g => g.gate));
  const activeChannelGates = new Set(activeChannels.flatMap(c => c.gates));

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

  return (
    <div className="relative">
      <svg
        viewBox="0 0 360 520"
        className="w-full max-w-md mx-auto"
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
        <rect x="0" y="0" width="360" height="520" fill="#FFF8F5" rx="16" />

        {/* Channels - Draw first so they appear behind centers */}
        <g className="channels">
          {CHANNEL_PATHS.map(({ gates, path }) => {
            const active = isChannelActive(gates[0], gates[1]);
            const hasOneGate = activeGateNumbers.has(gates[0]) !== activeGateNumbers.has(gates[1]);

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
              />
            );
          })}
        </g>

        {/* Gates */}
        <g className="gates">
          {Object.entries(GATE_POSITIONS).map(([gateStr, pos]) => {
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
                  r={isActive ? 8 : 5}
                  fill={
                    activation?.type === 'both'
                      ? 'url(#gateSplitGradient)'
                      : activation?.type === 'personality'
                        ? '#1A1A1A'
                        : activation?.type === 'design'
                          ? '#C9A227'
                          : '#E8DDD4'
                  }
                  stroke={isActive ? '#FFF8F5' : 'none'}
                  strokeWidth={isActive ? 2 : 0}
                  className="cursor-pointer transition-transform hover:scale-125"
                  onMouseEnter={(e) => handleGateHover(gate, e)}
                  onMouseLeave={() => handleGateHover(null)}
                  onClick={() => onGateClick?.(gate)}
                  filter={isActive ? 'url(#shadow)' : undefined}
                />
                {/* Gate number label for active gates */}
                {isActive && (
                  <text
                    x={pos.x}
                    y={pos.y + 18}
                    textAnchor="middle"
                    fontSize="8"
                    fill="#6B4423"
                    fontWeight="600"
                  >
                    {gate}
                  </text>
                )}
              </motion.g>
            );
          })}
        </g>

        {/* Center Labels */}
        <g className="center-labels" fontSize="9" fill="#8B4557" fontWeight="500">
          {CENTER_CONFIG.map((center) => (
            <text
              key={center.id}
              x={center.x}
              y={center.y + 4}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {center.name === 'G Center' ? 'G' : center.name === 'Solar Plexus' ? 'Solar' : center.name === 'Heart/Ego' ? 'Heart' : center.name}
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
                {PLANET_GLYPHS[getGateActivation(hoveredGate)!.planet]} {getGateActivation(hoveredGate)!.planet} • Line {getGateActivation(hoveredGate)!.line}
              </div>
            )}
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
}

function CenterShape({ center, isDefined }: CenterShapeProps) {
  const fill = isDefined ? 'url(#definedGradient)' : 'white';
  const stroke = isDefined ? '#C9A227' : '#E8DDD4';
  const strokeWidth = isDefined ? 3 : 2;
  const filter = isDefined ? 'url(#glow)' : undefined;

  const { x, y, width, height } = center;
  const w = width / 2;
  const h = height / 2;

  switch (center.shape) {
    case 'triangle-up':
      return (
        <motion.polygon
          points={`${x},${y - h} ${x - w},${y + h} ${x + w},${y + h}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          filter={filter}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
      );
    case 'triangle-down':
      return (
        <motion.polygon
          points={`${x},${y + h} ${x - w},${y - h} ${x + w},${y - h}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          filter={filter}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25 }}
        />
      );
    case 'triangle-left':
      return (
        <motion.polygon
          points={`${x - w},${y} ${x + w},${y - h} ${x + w},${y + h}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          filter={filter}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
      );
    case 'triangle-right':
      return (
        <motion.polygon
          points={`${x + w},${y} ${x - w},${y - h} ${x - w},${y + h}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          filter={filter}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
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
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
      );
    case 'square':
    default:
      return (
        <motion.rect
          x={x - w}
          y={y - h}
          width={width}
          height={height}
          rx={4}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          filter={filter}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.45 }}
        />
      );
  }
}
