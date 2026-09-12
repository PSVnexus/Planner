import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { CornerFlourish, BotanicalBranch, StaircaseIcon } from '../data/botanicalAssets';
import { X, Sparkles, Palette, Layers, Compass } from 'lucide-react';

export const InspirationModal: React.FC = () => {
  const { isInspirationModalOpen, closeInspirationModal } = usePlanner();

  if (!isInspirationModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-3xl bg-[#FCFAF7] border border-stone-200 rounded-3xl shadow-float p-6 sm:p-8 overflow-hidden max-h-[92vh] flex flex-col">
        <CornerFlourish position="top-right" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/60 mb-5">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-warmgold-700 bg-warmgold-50 px-2 py-0.5 rounded border border-warmgold-200">
              Aesthetic Provenance
            </span>
            <h2 className="text-2xl font-serif font-semibold text-stone-900 mt-1">
              The Architecture of Quiet Luxury
            </h2>
          </div>

          <button
            onClick={closeInspirationModal}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-6 overflow-y-auto pr-1">
          
          {/* Embedded High-Res Aesthetic Reference Image */}
          <div className="relative rounded-2xl overflow-hidden border border-stone-300 shadow-md">
            <img
              src="/interior_reference.jpg"
              alt="Quiet Luxury Architectural Interior with Helical Staircase and Botanical Chinoiserie"
              className="w-full h-auto object-cover max-h-[360px]"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent p-4 text-white">
              <span className="font-serif text-sm italic">
                “A harmonious dialogue between sculptural travertine steps, natural diffused morning light, and delicate hand-painted chinoiserie garden murals.”
              </span>
            </div>
          </div>

          {/* Design Pillars Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            
            <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200/80 space-y-1.5">
              <div className="flex items-center gap-2 font-serif text-sm font-semibold text-stone-800">
                <StaircaseIcon className="w-4 h-4 text-botanical-700" />
                <span>The Staircase Timeline</span>
              </div>
              <p className="text-stone-600 leading-relaxed font-serif">
                The vertical daily timeline mirrors the cantilevered limestone steps — creating an ascending spatial journey through each hour of the day.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200/80 space-y-1.5">
              <div className="flex items-center gap-2 font-serif text-sm font-semibold text-stone-800">
                <Palette className="w-4 h-4 text-taupe-700" />
                <span>Stone & Paper Palette</span>
              </div>
              <p className="text-stone-600 leading-relaxed font-serif">
                Warm ivory plaster, soft travertine beige, muted taupe, botanical sage greens, and delicate gold leaf accents — completely free of corporate glare or neon tones.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200/80 space-y-1.5">
              <div className="flex items-center gap-2 font-serif text-sm font-semibold text-stone-800">
                <Sparkles className="w-4 h-4 text-warmgold-600" />
                <span>Quiet Time Tracking</span>
              </div>
              <p className="text-stone-600 leading-relaxed font-serif">
                Real-time timers with breathing pulses and crystal singing bowl chimes bring mindfulness and truthful clarity to how life is spent.
              </p>
            </div>

          </div>

          {/* Close button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={closeInspirationModal}
              className="px-5 py-2 rounded-full bg-botanical-600 hover:bg-botanical-700 text-white text-xs font-medium shadow-sm transition-all"
            >
              Return to Sanctuary
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
