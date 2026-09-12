import React, { useState, useEffect } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { DailyReflection as DailyReflectionType } from '../types/planner';
import { BotanicalBranch, CornerFlourish, PerchedBird } from '../data/botanicalAssets';
import { Feather, Heart, Sparkles, Check, Smile, Sun, Moon, Wind } from 'lucide-react';

export const DailyReflection: React.FC = () => {
  const { selectedDate, currentReflection, saveReflection } = usePlanner();

  const [mood, setMood] = useState<DailyReflectionType['mood']>(
    currentReflection?.mood || 'peaceful'
  );
  const [whatWentWell, setWhatWentWell] = useState(currentReflection?.whatWentWell || '');
  const [tookLonger, setTookLonger] = useState(currentReflection?.tookLonger || '');
  const [changeTomorrow, setChangeTomorrow] = useState(currentReflection?.changeTomorrow || '');
  const [gratitude, setGratitude] = useState(currentReflection?.gratitude || '');
  const [isSavedRecently, setIsSavedRecently] = useState(false);

  // Sync with selected date
  useEffect(() => {
    if (currentReflection) {
      setMood(currentReflection.mood);
      setWhatWentWell(currentReflection.whatWentWell || '');
      setTookLonger(currentReflection.tookLonger || '');
      setChangeTomorrow(currentReflection.changeTomorrow || '');
      setGratitude(currentReflection.gratitude || '');
    } else {
      setMood('peaceful');
      setWhatWentWell('');
      setTookLonger('');
      setChangeTomorrow('');
      setGratitude('');
    }
  }, [selectedDate, currentReflection]);

  const handleSave = () => {
    const entry: DailyReflectionType = {
      date: selectedDate,
      mood,
      whatWentWell,
      tookLonger,
      changeTomorrow,
      gratitude,
      savedAt: new Date().toISOString(),
    };
    saveReflection(entry);
    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 3000);
  };

  const moods: { id: DailyReflectionType['mood']; label: string; icon: string; color: string }[] = [
    { id: 'peaceful', label: 'Peaceful', icon: '🌿', color: 'bg-botanical-50 text-botanical-700 border-botanical-200' },
    { id: 'focused', label: 'Deeply Focused', icon: '✨', color: 'bg-warmgold-50 text-warmgold-700 border-warmgold-200' },
    { id: 'centered', label: 'Centered', icon: '🪨', color: 'bg-stone-100 text-stone-700 border-stone-200' },
    { id: 'gentle', label: 'Gentle & Calm', icon: '🕊️', color: 'bg-dusty-50 text-dusty-700 border-dusty-200' },
    { id: 'restorative', label: 'Restorative', icon: '🍵', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'tiring', label: 'Tiring / Heavy', icon: '🍂', color: 'bg-taupe-100 text-taupe-700 border-taupe-200' },
  ];

  return (
    <div className="paper-card rounded-2xl p-6 sm:p-10 relative overflow-hidden">
      <CornerFlourish position="top-right" />
      <CornerFlourish position="bottom-left" />

      {/* Decorative botanical branch background */}
      <div className="absolute right-2 bottom-2 pointer-events-none opacity-15 hidden sm:block w-64">
        <BotanicalBranch className="w-full h-full text-botanical-900" />
      </div>

      <div className="relative z-10 max-w-3xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-warmgold-700 bg-warmgold-50 px-2.5 py-0.5 rounded-full border border-warmgold-200">
                Evening Contemplation
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 flex items-center gap-2.5">
              <Feather className="w-6 h-6 text-warmgold-600" />
              <span>How did today feel?</span>
            </h2>
            <p className="text-xs text-stone-500 font-serif italic mt-0.5">
              A quiet sanctuary to honor your lived hours, release what took longer, and plant gentle seeds for tomorrow.
            </p>
          </div>

          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium transition-all shadow-sm active:scale-95 ${
              isSavedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-botanical-600 hover:bg-botanical-700 text-white'
            }`}
          >
            {isSavedRecently ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Reflection Saved</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-warmgold-300" />
                <span>Save Reflection</span>
              </>
            )}
          </button>
        </div>

        {/* Mood Selector */}
        <div className="mb-6">
          <label className="text-xs font-medium text-stone-700 uppercase tracking-wider block mb-2">
            Today’s Underlying Energy
          </label>
          <div className="flex flex-wrap gap-2">
            {moods.map(m => {
              const isSelected = mood === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMood(m.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all border ${
                    isSelected
                      ? `${m.color} ring-1 ring-botanical-500/50 font-semibold shadow-xs`
                      : 'bg-white/70 text-stone-600 border-stone-200/80 hover:bg-white'
                  }`}
                >
                  <span>{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The 4 Mindful Journal Prompts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Prompt 1: What went well? */}
          <div className="space-y-1.5">
            <label className="font-serif text-sm font-semibold text-stone-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-botanical-500" />
              What went well?
            </label>
            <textarea
              rows={3}
              value={whatWentWell}
              onChange={(e) => setWhatWentWell(e.target.value)}
              placeholder="Cherish steady focus, completed intentions, or peaceful intervals..."
              className="w-full text-xs p-3 rounded-xl bg-white/80 border border-stone-200 focus:outline-none focus:border-botanical-500 focus:ring-1 focus:ring-botanical-500 transition-colors shadow-inner-soft placeholder:text-stone-400 font-serif leading-relaxed"
            />
          </div>

          {/* Prompt 2: What took longer than expected? */}
          <div className="space-y-1.5">
            <label className="font-serif text-sm font-semibold text-stone-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-taupe-500" />
              What took longer than expected?
            </label>
            <textarea
              rows={3}
              value={tookLonger}
              onChange={(e) => setTookLonger(e.target.value)}
              placeholder="Observe without judgment: deep research, unexpected conversations, or transitions..."
              className="w-full text-xs p-3 rounded-xl bg-white/80 border border-stone-200 focus:outline-none focus:border-botanical-500 focus:ring-1 focus:ring-botanical-500 transition-colors shadow-inner-soft placeholder:text-stone-400 font-serif leading-relaxed"
            />
          </div>

          {/* Prompt 3: What would I change tomorrow? */}
          <div className="space-y-1.5">
            <label className="font-serif text-sm font-semibold text-stone-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-dusty-500" />
              What would I change tomorrow?
            </label>
            <textarea
              rows={3}
              value={changeTomorrow}
              onChange={(e) => setChangeTomorrow(e.target.value)}
              placeholder="A gentle adjustment in timing, more restorative buffer, earlier tea..."
              className="w-full text-xs p-3 rounded-xl bg-white/80 border border-stone-200 focus:outline-none focus:border-botanical-500 focus:ring-1 focus:ring-botanical-500 transition-colors shadow-inner-soft placeholder:text-stone-400 font-serif leading-relaxed"
            />
          </div>

          {/* Prompt 4: One thing I'm grateful for */}
          <div className="space-y-1.5">
            <label className="font-serif text-sm font-semibold text-stone-800 flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-50" />
              One thing I'm grateful for
            </label>
            <textarea
              rows={3}
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              placeholder="Warm morning light through the window, a quiet breath, a nourishing tea..."
              className="w-full text-xs p-3 rounded-xl bg-white/80 border border-stone-200 focus:outline-none focus:border-botanical-500 focus:ring-1 focus:ring-botanical-500 transition-colors shadow-inner-soft placeholder:text-stone-400 font-serif leading-relaxed"
            />
          </div>

        </div>

        {/* Bottom micro quote */}
        <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500 font-serif italic">
          <span>Every evening is an invitation to begin anew with gentleness.</span>
          <span className="text-[11px] text-stone-400 font-sans">
            Auto-saved securely on your device
          </span>
        </div>

      </div>
    </div>
  );
};
