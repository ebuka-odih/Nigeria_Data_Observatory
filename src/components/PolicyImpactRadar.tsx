import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { POLICIES, PERSONAS, Policy } from '../data';
import { cn } from '../lib/utils';
import { Info, AlertCircle, Calendar } from 'lucide-react';

interface SectorData {
  persona: string;
  policies: Policy[];
  maxImpact: 'High' | 'Medium' | 'Low' | 'None';
}

export function PolicyImpactRadar() {
  const navigate = useNavigate();
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);

  const radarData = useMemo(() => {
    return PERSONAS.map((persona) => {
      const personaPolicies = POLICIES.filter((p) => p.affectedGroups.includes(persona));
      let maxImpact: 'High' | 'Medium' | 'Low' | 'None' = 'None';
      
      if (personaPolicies.some((p) => p.impactLevel === 'High')) maxImpact = 'High';
      else if (personaPolicies.some((p) => p.impactLevel === 'Medium')) maxImpact = 'Medium';
      else if (personaPolicies.some((p) => p.impactLevel === 'Low')) maxImpact = 'Low';

      return {
        persona,
        policies: personaPolicies,
        maxImpact,
      };
    });
  }, []);

  const size = 600;
  const center = size / 2;
  const radius = size * 0.4;
  const sectorAngle = (2 * Math.PI) / PERSONAS.length;

  const getImpactColor = (impact: string, isHovered: boolean) => {
    switch (impact) {
      case 'High':
        return isHovered ? 'rgba(239, 68, 68, 0.8)' : 'rgba(239, 68, 68, 0.4)';
      case 'Medium':
        return isHovered ? 'rgba(244, 180, 0, 0.8)' : 'rgba(244, 180, 0, 0.4)';
      case 'Low':
        return isHovered ? 'rgba(46, 139, 87, 0.8)' : 'rgba(46, 139, 87, 0.4)';
      default:
        return 'rgba(255, 255, 255, 0.05)';
    }
  };

  const getGlowFilter = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.6))';
      case 'Medium':
        return 'drop-shadow(0 0 15px rgba(244, 180, 0, 0.6))';
      case 'Low':
        return 'drop-shadow(0 0 15px rgba(46, 139, 87, 0.6))';
      default:
        return 'none';
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-slate-950 rounded-3xl p-8 overflow-hidden border border-slate-800 shadow-2xl">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-full max-w-[600px] aspect-square relative">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full h-full drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 0 20px rgba(11, 60, 93, 0.3))' }}
          >
            {/* Background Circles */}
            {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
              <circle
                key={i}
                cx={center}
                cy={center}
                r={radius * r}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
                strokeDasharray={i === 4 ? "0" : "4 4"}
              />
            ))}

            {/* Sector Dividers */}
            {PERSONAS.map((_, i) => {
              const angle = i * sectorAngle - Math.PI / 2;
              const x2 = center + radius * Math.cos(angle);
              const y2 = center + radius * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Impact Sectors */}
            {radarData.map((data, i) => {
              const startAngle = i * sectorAngle - Math.PI / 2;
              const endAngle = (i + 1) * sectorAngle - Math.PI / 2;
              
              const x1 = center + radius * Math.cos(startAngle);
              const y1 = center + radius * Math.sin(startAngle);
              const x2 = center + radius * Math.cos(endAngle);
              const y2 = center + radius * Math.sin(endAngle);

              const pathData = `
                M ${center} ${center}
                L ${x1} ${y1}
                A ${radius} ${radius} 0 0 1 ${x2} ${y2}
                Z
              `;

              const isHovered = hoveredSector === i;

              return (
                <g key={data.persona}>
                  <motion.path
                    d={pathData}
                    fill={getImpactColor(data.maxImpact, isHovered)}
                    stroke={isHovered ? 'rgba(255, 255, 255, 0.4)' : 'transparent'}
                    strokeWidth="2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      filter: isHovered ? getGlowFilter(data.maxImpact) : 'none'
                    }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    onMouseEnter={() => setHoveredSector(i)}
                    onMouseLeave={() => setHoveredSector(null)}
                    onClick={() => navigate(`/impact?persona=${data.persona}`)}
                    className="cursor-pointer transition-all duration-300"
                  />
                  
                  {/* Persona Labels */}
                  <text
                    x={center + (radius + 40) * Math.cos(startAngle + sectorAngle / 2)}
                    y={center + (radius + 40) * Math.sin(startAngle + sectorAngle / 2)}
                    fill={isHovered ? '#fff' : 'rgba(255, 255, 255, 0.5)'}
                    fontSize="12"
                    fontWeight={isHovered ? 'bold' : 'normal'}
                    textAnchor="middle"
                    className="pointer-events-none font-mono uppercase tracking-tighter"
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    {data.persona}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredSector !== null && radarData[hoveredSector].policies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-white rounded-2xl p-4 shadow-2xl pointer-events-none z-20 border border-slate-200"
              >
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-mono font-bold text-accent uppercase">
                    {radarData[hoveredSector].persona}
                  </span>
                  <div className={cn(
                    "text-[8px] px-1.5 py-0.5 rounded font-bold uppercase",
                    radarData[hoveredSector].maxImpact === 'High' ? 'bg-red-100 text-red-600' :
                    radarData[hoveredSector].maxImpact === 'Medium' ? 'bg-amber-100 text-amber-600' :
                    'bg-green-100 text-green-600'
                  )}>
                    {radarData[hoveredSector].maxImpact} Impact
                  </div>
                </div>
                
                <div className="space-y-3">
                  {radarData[hoveredSector].policies.slice(0, 2).map((policy) => (
                    <div key={policy.id} className="space-y-1">
                      <div className="text-xs font-bold text-primary leading-tight line-clamp-2">
                        {policy.title}
                      </div>
                      <div className="flex items-center text-[10px] text-text-secondary">
                        <AlertCircle className="w-3 h-3 mr-1 text-slate-400" />
                        {policy.agency}
                      </div>
                      <div className="flex items-center text-[10px] text-text-secondary">
                        <Calendar className="w-3 h-3 mr-1 text-slate-400" />
                        Eff: {policy.date}
                      </div>
                    </div>
                  ))}
                  {radarData[hoveredSector].policies.length > 2 && (
                    <div className="text-[10px] text-accent font-bold text-center pt-1">
                      + {radarData[hoveredSector].policies.length - 2} more policies
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            <span className="text-xs font-mono text-slate-400 uppercase">High Impact</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-highlight shadow-[0_0_10px_rgba(244,180,0,0.5)]"></div>
            <span className="text-xs font-mono text-slate-400 uppercase">Medium Impact</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(46,139,87,0.5)]"></div>
            <span className="text-xs font-mono text-slate-400 uppercase">Low Impact</span>
          </div>
        </div>
      </div>
    </div>
  );
}
