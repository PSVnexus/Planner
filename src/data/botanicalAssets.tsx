import React from 'react';

// Delicate Hand-drawn Botanical Chinoiserie Willow Branch
export const BotanicalBranch: React.FC<{ className?: string }> = ({ className = "w-24 h-16 text-botanical-500 opacity-60" }) => (
  <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Main curving branch */}
    <path
      d="M10 100 C 60 95, 90 60, 140 45 C 165 37, 185 25, 195 15"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeMiterlimit="10"
    />
    {/* Sub branch 1 */}
    <path
      d="M70 78 C 85 70, 105 75, 120 70 C 135 65, 145 55, 150 50"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    {/* Sub branch 2 */}
    <path
      d="M115 52 C 125 40, 140 38, 155 35"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
    {/* Weeping tendril */}
    <path
      d="M135 48 C 145 65, 142 85, 148 105"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeDasharray="2 1"
      strokeLinecap="round"
    />
    
    {/* Delicate willow leaves */}
    <path d="M50 88 C 45 78, 55 70, 62 76 C 58 84, 52 88, 50 88 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="0.8" />
    <path d="M85 70 C 90 60, 102 62, 98 72 C 92 74, 87 72, 85 70 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="0.8" />
    <path d="M125 46 C 130 36, 142 38, 138 48 C 132 50, 127 48, 125 46 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="0.8" />
    <path d="M165 32 C 172 24, 182 28, 178 36 C 172 37, 167 35, 165 32 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="0.8" />
    <path d="M145 75 C 150 70, 156 75, 152 82 C 148 83, 144 80, 145 75 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.6" />
    <path d="M147 95 C 151 90, 157 93, 154 99 C 150 100, 147 98, 147 95 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.6" />

    {/* Small wild cherry/plum blossom buds */}
    <circle cx="108" cy="65" r="2.5" fill="#E6A89B" fillOpacity="0.85" />
    <circle cx="152" cy="48" r="2" fill="#E6A89B" fillOpacity="0.85" />
    <circle cx="185" cy="20" r="2" fill="#E6A89B" fillOpacity="0.85" />
    <circle cx="138" cy="38" r="1.5" fill="#C8AD6D" fillOpacity="0.8" />
  </svg>
);

// Elegant Chinoiserie Perched Songbird
export const PerchedBird: React.FC<{ className?: string }> = ({ className = "w-10 h-10 text-stone-600 opacity-70" }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Bird perch line */}
    <path d="M10 65 C 30 63, 50 63, 75 64" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    {/* Perched bird body */}
    <path
      d="M32 55 C 28 45, 32 35, 42 32 C 48 30, 56 34, 58 40 C 60 45, 58 52, 52 58 C 45 62, 36 60, 32 55 Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    {/* Head & beak */}
    <circle cx="48" cy="28" r="7" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
    <path d="M55 27 L 63 29 L 55 31 Z" fill="currentColor" />
    <circle cx="50" cy="27" r="1" fill="currentColor" />
    {/* Sleek folded wing */}
    <path
      d="M38 40 C 44 38, 52 42, 50 50 C 46 56, 36 64, 30 70 C 33 63, 35 55, 38 40 Z"
      fill="currentColor"
      fillOpacity="0.35"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Graceful tail feathers */}
    <path d="M33 58 C 26 66, 20 74, 16 78 C 22 74, 28 68, 35 62" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    {/* Gentle feet */}
    <path d="M42 59 L 42 64 M 46 59 L 47 64" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// Graceful Flying Crane / Garden Bird
export const FlyingBird: React.FC<{ className?: string }> = ({ className = "w-8 h-8 text-botanical-600 opacity-60" }) => (
  <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Wings in glide */}
    <path
      d="M5 20 C 18 10, 26 6, 33 16 C 38 7, 48 5, 55 12 C 45 15, 37 20, 34 22 C 30 25, 20 25, 12 28 C 10 24, 8 22, 5 20 Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Beak & eye */}
    <path d="M34 22 L 40 23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <circle cx="33" cy="21" r="0.8" fill="currentColor" />
    {/* Tail feathers */}
    <path d="M12 28 L 7 34 M 14 27 L 9 32" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
);

// Sculptural Cantilevered Staircase Motif (Inspired by Reference Interior)
export const StaircaseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6 text-stone-700" }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Curved helical wall silhouette */}
    <path
      d="M8 36 C 8 24, 18 14, 32 10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Cantilevered steps */}
    <path d="M8 34 H 20 V 30 H 26 V 25 H 30 V 19 H 34 V 12" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    {/* Step stone depth lines */}
    <line x1="8" y1="36" x2="20" y2="36" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
    <line x1="20" y1="32" x2="26" y2="32" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
    <line x1="26" y1="27" x2="30" y2="27" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
    {/* Golden accent dot */}
    <circle cx="34" cy="12" r="1.5" fill="#C8AD6D" />
  </svg>
);

// Subtle Botanical Divider
export const BotanicalDivider: React.FC<{ className?: string }> = ({ className = "my-6" }) => (
  <div className={`flex items-center justify-center gap-3 text-stone-400 ${className}`}>
    <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent flex-1 max-w-xs" />
    <div className="flex items-center gap-1.5 opacity-70">
      <svg className="w-4 h-4 text-botanical-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.6 8.4-.1-1.2.2-2.5 1-3.4 1.3-1.4 3.4-1.8 5-1 1.7.9 2.5 2.8 2 4.6 2.8-.9 4.9-3.4 5.3-6.4C20.3 8.3 16.7 2 12 2z"/>
      </svg>
      <div className="w-1 h-1 rounded-full bg-warmgold-500" />
      <svg className="w-4 h-4 text-botanical-500 transform scale-x-[-1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.6 8.4-.1-1.2.2-2.5 1-3.4 1.3-1.4 3.4-1.8 5-1 1.7.9 2.5 2.8 2 4.6 2.8-.9 4.9-3.4 5.3-6.4C20.3 8.3 16.7 2 12 2z"/>
      </svg>
    </div>
    <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent flex-1 max-w-xs" />
  </div>
);

// Corner flourish for cards
export const CornerFlourish: React.FC<{ position?: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right' }> = ({
  position = 'top-right'
}) => {
  const rotationClass = {
    'top-right': 'top-1 right-1',
    'bottom-left': 'bottom-1 left-1 rotate-180',
    'top-left': 'top-1 left-1 -rotate-90',
    'bottom-right': 'bottom-1 right-1 rotate-90',
  }[position];

  return (
    <div className={`absolute ${rotationClass} pointer-events-none opacity-40 text-stone-400`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22 2 C 12 2, 2 12, 2 22" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M22 6 C 14 6, 6 14, 6 22" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
        <circle cx="21" cy="3" r="1" fill="#C8AD6D" />
      </svg>
    </div>
  );
};
