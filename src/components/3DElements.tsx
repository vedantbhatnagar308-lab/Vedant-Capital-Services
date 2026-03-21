/**
 * Reusable 3D geometric shapes for background decoration
 */

export const FloatingCube = ({ className = '', size = 60 }: { className?: string; size?: number }) => (
  <div className={`pointer-events-none ${className}`}>
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 5L55 18V42L30 55L5 42V18L30 5Z" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.3" />
      <path d="M30 5L55 18L30 31L5 18L30 5Z" fill="hsl(var(--gold))" opacity="0.06" />
      <path d="M30 31L55 18V42L30 55V31Z" fill="hsl(var(--gold))" opacity="0.04" />
      <path d="M30 31L5 18V42L30 55V31Z" fill="hsl(var(--gold))" opacity="0.08" />
    </svg>
  </div>
);

export const FloatingDiamond = ({ className = '', size = 50 }: { className?: string; size?: number }) => (
  <div className={`pointer-events-none ${className}`}>
    <svg width={size} height={size * 1.4} viewBox="0 0 50 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 2L48 25L25 68L2 25L25 2Z" stroke="hsl(var(--blue))" strokeWidth="1" opacity="0.25" />
      <path d="M25 2L48 25L25 35L2 25L25 2Z" fill="hsl(var(--blue))" opacity="0.06" />
      <path d="M25 35L48 25L25 68L2 25L25 35Z" fill="hsl(var(--blue))" opacity="0.03" />
    </svg>
  </div>
);

export const FloatingPyramid = ({ className = '', size = 55 }: { className?: string; size?: number }) => (
  <div className={`pointer-events-none ${className}`}>
    <svg width={size} height={size} viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.5 3L52 48H3L27.5 3Z" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.2" />
      <path d="M27.5 3L52 48H27.5V3Z" fill="hsl(var(--gold))" opacity="0.04" />
      <path d="M27.5 3L3 48H27.5V3Z" fill="hsl(var(--gold))" opacity="0.07" />
    </svg>
  </div>
);

export const FloatingOctahedron = ({ className = '', size = 48 }: { className?: string; size?: number }) => (
  <div className={`pointer-events-none ${className}`}>
    <svg width={size} height={size * 1.2} viewBox="0 0 48 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 2L46 29L24 56L2 29L24 2Z" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.2" />
      <path d="M2 29L24 2L46 29H2Z" fill="hsl(var(--gold))" opacity="0.05" />
      <path d="M2 29L24 56L46 29H2Z" fill="hsl(var(--gold))" opacity="0.08" />
      <line x1="24" y1="2" x2="24" y2="56" stroke="hsl(var(--gold))" strokeWidth="0.5" opacity="0.15" />
    </svg>
  </div>
);

export const FloatingSphere = ({ className = '', size = 80 }: { className?: string; size?: number }) => (
  <div className={`pointer-events-none ${className}`}>
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" stroke="hsl(var(--gold))" strokeWidth="0.8" opacity="0.15" />
      <ellipse cx="40" cy="40" rx="38" ry="14" stroke="hsl(var(--gold))" strokeWidth="0.5" opacity="0.1" />
      <ellipse cx="40" cy="40" rx="14" ry="38" stroke="hsl(var(--gold))" strokeWidth="0.5" opacity="0.1" />
      <circle cx="40" cy="40" r="38" fill="url(#sphereGrad)" opacity="0.05" />
      <defs>
        <radialGradient id="sphereGrad" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor="hsl(var(--gold))" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

export const FloatingRing = ({ className = '', size = 70 }: { className?: string; size?: number }) => (
  <div className={`pointer-events-none ${className}`}>
    <svg width={size} height={size * 0.5} viewBox="0 0 70 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="35" cy="17.5" rx="33" ry="15.5" stroke="hsl(var(--blue))" strokeWidth="1" opacity="0.2" />
      <ellipse cx="35" cy="17.5" rx="25" ry="10" stroke="hsl(var(--blue))" strokeWidth="0.5" opacity="0.1" />
    </svg>
  </div>
);

export const Chart3D = ({ className = '' }: { className?: string }) => (
  <div className={`pointer-events-none ${className}`}>
    <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 3D bar chart */}
      {[
        { x: 10, h: 50 },
        { x: 30, h: 70 },
        { x: 50, h: 40 },
        { x: 70, h: 85 },
        { x: 90, h: 60 },
      ].map((bar, i) => (
        <g key={i}>
          {/* Front face */}
          <rect x={bar.x} y={95 - bar.h} width="14" height={bar.h} fill="hsl(var(--gold))" opacity="0.15" rx="2" />
          {/* Top face (3D) */}
          <path d={`M${bar.x} ${95 - bar.h} L${bar.x + 6} ${89 - bar.h} L${bar.x + 20} ${89 - bar.h} L${bar.x + 14} ${95 - bar.h} Z`}
            fill="hsl(var(--gold))" opacity="0.25" />
          {/* Right face (3D) */}
          <path d={`M${bar.x + 14} ${95 - bar.h} L${bar.x + 20} ${89 - bar.h} L${bar.x + 20} ${89} L${bar.x + 14} ${95} Z`}
            fill="hsl(var(--gold))" opacity="0.1" />
        </g>
      ))}
      {/* Base line */}
      <line x1="5" y1="95" x2="115" y2="95" stroke="hsl(var(--gold))" strokeWidth="0.5" opacity="0.2" />
    </svg>
  </div>
);

export const PieChart3D = ({ className = '' }: { className?: string }) => (
  <div className={`pointer-events-none ${className}`}>
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 3D pie chart - elliptical with depth */}
      <ellipse cx="50" cy="50" rx="40" ry="20" fill="hsl(var(--gold))" opacity="0.08" />
      <ellipse cx="50" cy="45" rx="40" ry="20" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.2" />
      {/* Slice lines */}
      <path d="M50 45 L90 45" stroke="hsl(var(--gold))" strokeWidth="0.5" opacity="0.15" />
      <path d="M50 45 L25 28" stroke="hsl(var(--gold))" strokeWidth="0.5" opacity="0.15" />
      <path d="M50 45 L30 60" stroke="hsl(var(--gold))" strokeWidth="0.5" opacity="0.15" />
      {/* Depth sides */}
      <path d="M10 45 L10 50 Q10 70 50 70 Q90 70 90 50 L90 45" stroke="hsl(var(--gold))" strokeWidth="0.5" opacity="0.1" />
      {/* Filled slices */}
      <path d="M50 45 L90 45 A40 20 0 0 1 25 28 Z" fill="hsl(var(--gold))" opacity="0.1" />
      <path d="M50 45 L25 28 A40 20 0 0 1 30 60 Z" fill="hsl(var(--blue))" opacity="0.08" />
    </svg>
  </div>
);

export const LineGraph3D = ({ className = '' }: { className?: string }) => (
  <div className={`pointer-events-none ${className}`}>
    <svg width="130" height="80" viewBox="0 0 130 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Grid */}
      {[20, 35, 50, 65].map(y => (
        <line key={y} x1="10" y1={y} x2="120" y2={y} stroke="hsl(var(--gold))" strokeWidth="0.3" opacity="0.1" />
      ))}
      {/* Area fill */}
      <path d="M10 65 L30 50 L50 55 L70 35 L90 28 L110 20 L120 22 L120 70 L10 70 Z"
        fill="url(#lineGrad3d)" opacity="0.15" />
      {/* Line */}
      <path d="M10 65 L30 50 L50 55 L70 35 L90 28 L110 20 L120 22"
        stroke="hsl(var(--gold))" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots */}
      {[[10,65],[30,50],[50,55],[70,35],[90,28],[110,20]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="hsl(var(--navy))" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.5" />
      ))}
      <defs>
        <linearGradient id="lineGrad3d" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--gold))" />
          <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);
