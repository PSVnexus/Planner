import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { ViewMode } from '../types/planner';
import { formatSecondsToDigital, formatDisplayDate } from '../utils/time';
import { getTodayDateString } from '../data/defaultData';
import { StaircaseIcon, FlyingBird } from '../data/botanicalAssets';
import { 
  Play, 
  Pause, 
  CheckCircle2, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Calendar, 
  Sliders, 
  Sparkles,
  Compass,
  PieChart,
  Layers,
  History,
  Clock
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    selectedDate,
    setSelectedDate,
    activeTaskId,
    activeTimerSeconds,
    isTimerRunning,
    currentActiveTask,
    pauseTimer,
    resumeTimer,
    finishTask,
    openCreateTaskModal,
    openInspirationModal,
    openSettingsModal,
    isSoundEnabled,
    toggleSound,
  } = usePlanner();

  const isToday = selectedDate === getTodayDateString(0);

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    setSelectedDate(`${y}-${m}-${day}`);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    setSelectedDate(`${y}-${m}-${day}`);
  };

  const handleGoToday = () => {
    setSelectedDate(getTodayDateString(0));
  };

  const navItems: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: 'today', label: 'Today', icon: <Compass className="w-4 h-4" /> },
    { id: 'planner', label: 'Planner', icon: <Layers className="w-4 h-4" /> },
    { id: 'timeline', label: 'Timeline', icon: <StaircaseIcon className="w-4 h-4 text-inherit" /> },
    { id: 'analytics', label: 'Analytics', icon: <PieChart className="w-4 h-4" /> },
    { id: 'history', label: 'History', icon: <History className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FCFAF7]/90 backdrop-blur-md border-b border-[#E6DFD5]/80 transition-all">
      {/* Top micro bar for ambient status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Luxury Brand Title */}
          <div className="flex items-center gap-4">
            <div 
              onClick={() => setCurrentView('today')}
              className="cursor-pointer group flex items-center gap-3"
            >
              <div className="relative w-10 h-10 rounded-full bg-botanical-50 border border-botanical-200 flex items-center justify-center text-botanical-600 shadow-inner-soft group-hover:scale-105 transition-transform">
                <span className="font-serif text-2xl font-bold tracking-tighter">A</span>
                <div className="absolute -top-1 -right-1">
                  <FlyingBird className="w-4 h-4 text-botanical-500 opacity-80" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-wide font-semibold text-[#2D2A26] flex items-center gap-2">
                  AURA
                  <span className="text-[10px] tracking-[0.25em] font-sans uppercase font-medium text-stone-500 px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200">
                    Quiet Luxury
                  </span>
                </span>
                <span className="text-[11px] tracking-wider text-taupe-500 font-serif italic -mt-1">
                  Atelier of Time & Daily Sanctuary
                </span>
              </div>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F5F0E8]/70 p-1.5 rounded-full border border-stone-200/80 shadow-inner-soft">
            {navItems.map(item => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#FCFAF7] text-botanical-700 shadow-sm border border-stone-200 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Active Live Timer Pill (Persistent Floating Control) */}
            {activeTaskId && currentActiveTask && (
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-botanical-50 border border-botanical-300 shadow-sm timer-active-pulse">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    {isTimerRunning && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-botanical-400 opacity-75"></span>
                    )}
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-botanical-600"></span>
                  </span>
                  <span className="hidden sm:inline text-xs font-medium text-botanical-800 max-w-[110px] truncate">
                    {currentActiveTask.title}
                  </span>
                </div>

                <div className="font-mono text-xs font-semibold text-botanical-900 bg-white/70 px-2 py-0.5 rounded-md border border-botanical-200">
                  {formatSecondsToDigital(activeTimerSeconds)}
                </div>

                <div className="flex items-center gap-1">
                  {isTimerRunning ? (
                    <button
                      onClick={pauseTimer}
                      title="Pause Timer"
                      className="p-1 rounded-full text-botanical-700 hover:bg-botanical-200 transition-colors"
                    >
                      <Pause className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={resumeTimer}
                      title="Resume Timer"
                      className="p-1 rounded-full text-botanical-700 hover:bg-botanical-200 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                  )}
                  <button
                    onClick={() => finishTask(activeTaskId)}
                    title="Finish & Save Actual Time"
                    className="p-1 rounded-full text-emerald-700 hover:bg-emerald-100 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Inspiration Aesthetic Reference Modal Trigger */}
            <button
              onClick={openInspirationModal}
              title="View Aesthetic Reference Interior"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-stone-600 bg-white/60 hover:bg-white border border-stone-200 shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-warmgold-500" />
              <span className="hidden lg:inline">Aesthetic Reference</span>
            </button>

            {/* Audio Feedback Toggle */}
            <button
              onClick={toggleSound}
              title={isSoundEnabled ? "Acoustic Chime: Enabled" : "Acoustic Chime: Muted"}
              className="p-2 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200/70 transition-colors"
            >
              {isSoundEnabled ? (
                <Volume2 className="w-4 h-4 text-botanical-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-stone-400" />
              )}
            </button>

            {/* Settings Trigger */}
            <button
              onClick={openSettingsModal}
              title="Planner Settings & Custom Categories"
              className="p-2 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200/70 transition-colors"
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Primary Action: + Add Task */}
            <button
              onClick={openCreateTaskModal}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-botanical-600 hover:bg-botanical-700 text-white text-xs font-medium shadow-sm transition-all hover:shadow hover:scale-[1.02] active:scale-95 group"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              <span className="tracking-wide">Add Task</span>
              <kbd className="hidden sm:inline ml-1 px-1.5 py-0.5 text-[10px] bg-botanical-800/40 rounded text-botanical-100 font-mono">
                N
              </kbd>
            </button>
          </div>

        </div>

        {/* Date Navigator Bar */}
        <div className="py-2.5 flex flex-wrap items-center justify-between border-t border-stone-200/50 text-xs">
          
          {/* Day & Date Stepper */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevDay}
              title="Previous Day"
              className="p-1 rounded-md text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 font-serif text-base font-semibold text-stone-800 px-2 py-0.5 rounded bg-stone-100/60">
              <Calendar className="w-3.5 h-3.5 text-botanical-600" />
              <span>{formatDisplayDate(selectedDate)}</span>
            </div>

            <button
              onClick={handleNextDay}
              title="Next Day"
              className="p-1 rounded-md text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {!isToday && (
              <button
                onClick={handleGoToday}
                className="ml-2 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-botanical-100 text-botanical-800 hover:bg-botanical-200 transition-colors"
              >
                Return to Today
              </button>
            )}
          </div>

          {/* Quick Date Picker input */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-stone-400 font-serif italic text-xs">
              "Quiet moments shape enduring days."
            </span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
              className="text-xs bg-white/70 border border-stone-200 rounded-md px-2 py-1 text-stone-700 hover:border-botanical-400 focus:outline-none focus:ring-1 focus:ring-botanical-400 transition-colors cursor-pointer"
            />
          </div>

        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-stone-200/40">
          {navItems.map(item => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center gap-1 text-[11px] px-3 py-1 rounded-md transition-colors ${
                  isActive ? 'text-botanical-700 font-semibold bg-botanical-50' : 'text-stone-500'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
