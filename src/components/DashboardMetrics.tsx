import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { formatMinutesToReadable, formatSecondsToReadable, getGreetingMessage, formatDisplayDate } from '../utils/time';
import { BotanicalBranch, CornerFlourish, PerchedBird } from '../data/botanicalAssets';
import { Clock, CheckCircle, Hourglass, BarChart2, Flame, Sparkles } from 'lucide-react';

export const DashboardMetrics: React.FC = () => {
  const { dayStats, selectedDate, isTimerRunning } = usePlanner();
  const greeting = getGreetingMessage();

  const percentCompleted = dayStats.totalCount > 0 
    ? Math.round((dayStats.completedCount / dayStats.totalCount) * 100) 
    : 0;

  // Comparison pace
  const timeDifferenceMinutes = dayStats.totalActualMinutes - dayStats.totalPlannedMinutes;
  let paceLabel = "In Perfect Rhythm";
  let paceColor = "text-botanical-700 bg-botanical-50 border-botanical-200";

  if (timeDifferenceMinutes < -15 && dayStats.totalActualMinutes > 0) {
    paceLabel = `Ahead of Pace · ${Math.abs(timeDifferenceMinutes)}m saved`;
    paceColor = "text-dusty-700 bg-dusty-50 border-dusty-200";
  } else if (timeDifferenceMinutes > 15) {
    paceLabel = `Extended Immersion · +${timeDifferenceMinutes}m deeper flow`;
    paceColor = "text-taupe-700 bg-taupe-50 border-taupe-200";
  }

  // Dual meter percentage
  const maxTime = Math.max(dayStats.totalPlannedMinutes, dayStats.totalActualMinutes, 60);
  const plannedPercent = Math.min(100, Math.round((dayStats.totalPlannedMinutes / maxTime) * 100));
  const actualPercent = Math.min(100, Math.round((dayStats.totalActualMinutes / maxTime) * 100));

  return (
    <div className="space-y-6">
      
      {/* 1. Serene Greeting Hero Card */}
      <div className="relative paper-card rounded-2xl p-6 sm:p-8 overflow-hidden">
        <CornerFlourish position="top-right" />
        <CornerFlourish position="bottom-left" />

        {/* Ambient botanical background illustration */}
        <div className="absolute right-0 top-0 bottom-0 pointer-events-none opacity-20 hidden md:block w-72">
          <BotanicalBranch className="w-full h-full text-botanical-800" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest font-sans font-medium text-taupe-500">
            <PerchedBird className="w-4 h-4 text-botanical-600 inline-block" />
            <span>{formatDisplayDate(selectedDate)}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
            {greeting.greeting}
          </h1>

          <p className="mt-2 text-sm sm:text-base text-stone-600 font-serif italic max-w-xl">
            {greeting.subtitle}
          </p>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Daily Progress Indicator */}
        <div className="paper-card rounded-xl p-5 flex flex-col justify-between relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
              Daily Progress
            </span>
            <div className="w-7 h-7 rounded-full bg-botanical-50 text-botanical-600 flex items-center justify-center border border-botanical-200">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>

          <div className="my-3 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-semibold text-stone-800">
              {percentCompleted}%
            </span>
            <span className="text-xs text-stone-500 font-sans">
              ({dayStats.completedCount} of {dayStats.totalCount} completed)
            </span>
          </div>

          {/* Minimalist Progress Bar */}
          <div className="w-full bg-stone-200/80 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-botanical-600 h-1.5 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${percentCompleted}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Total Planned Time */}
        <div className="paper-card rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
              Planned Duration
            </span>
            <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center border border-stone-200">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="my-3">
            <span className="text-3xl font-serif font-semibold text-stone-800">
              {formatMinutesToReadable(dayStats.totalPlannedMinutes)}
            </span>
          </div>

          <span className="text-[11px] text-stone-500">
            Across {dayStats.totalCount} structured time blocks
          </span>
        </div>

        {/* Metric 3: Total Time Actually Spent (Live!) */}
        <div className="paper-card rounded-xl p-5 flex flex-col justify-between relative overflow-hidden">
          {isTimerRunning && (
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-botanical-500 animate-pulse" />
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              Actual Time Spent
              {isTimerRunning && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-botanical-500 animate-ping" />
              )}
            </span>
            <div className="w-7 h-7 rounded-full bg-warmgold-50 text-warmgold-600 flex items-center justify-center border border-warmgold-200">
              <Flame className="w-4 h-4" />
            </div>
          </div>

          <div className="my-3 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-semibold text-stone-800">
              {formatMinutesToReadable(dayStats.totalActualMinutes)}
            </span>
            {isTimerRunning && (
              <span className="text-[11px] px-1.5 py-0.5 rounded bg-botanical-100 text-botanical-800 font-medium animate-pulse">
                Tracking Live
              </span>
            )}
          </div>

          <span className="text-[11px] text-stone-500">
            Focus ratio: {dayStats.totalActualMinutes > 0 ? Math.round((dayStats.focusMinutes / dayStats.totalActualMinutes) * 100) : 0}% deep immersion
          </span>
        </div>

        {/* Metric 4: Remaining Available Time */}
        <div className="paper-card rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
              Available Sanctuary
            </span>
            <div className="w-7 h-7 rounded-full bg-dusty-50 text-dusty-600 flex items-center justify-center border border-dusty-200">
              <Hourglass className="w-4 h-4" />
            </div>
          </div>

          <div className="my-3">
            <span className="text-3xl font-serif font-semibold text-stone-800">
              {formatMinutesToReadable(dayStats.remainingAvailableMinutes)}
            </span>
          </div>

          <span className="text-[11px] text-stone-500">
            Daylight buffer remaining today
          </span>
        </div>

      </div>

      {/* 3. Visual Planned vs Actual Time Comparison Component */}
      <div className="paper-card rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-serif font-semibold text-stone-900 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-botanical-600" />
              Planned vs. Actual Time Comparison
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Reflecting on intention versus lived temporal reality
            </p>
          </div>

          <span className={`self-start sm:self-auto text-xs px-3 py-1 rounded-full font-medium border ${paceColor}`}>
            {paceLabel}
          </span>
        </div>

        {/* Comparison Visual Gauge */}
        <div className="space-y-3.5">
          {/* Planned Bar */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-medium text-stone-600 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-stone-400 inline-block" />
                Total Planned Time
              </span>
              <span className="font-mono text-stone-700 font-medium">
                {formatMinutesToReadable(dayStats.totalPlannedMinutes)}
              </span>
            </div>
            <div className="w-full bg-stone-200/60 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-stone-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${plannedPercent}%` }}
              />
            </div>
          </div>

          {/* Actual Bar */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-medium text-botanical-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-botanical-600 inline-block" />
                Total Time Actually Spent
              </span>
              <span className="font-mono text-botanical-900 font-semibold">
                {formatMinutesToReadable(dayStats.totalActualMinutes)}
              </span>
            </div>
            <div className="w-full bg-stone-200/60 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-botanical-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${actualPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom micro note */}
        <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500">
          <span>Completed: {dayStats.completedCount} of {dayStats.totalCount} tasks</span>
          <span>Difference: {timeDifferenceMinutes >= 0 ? `+${timeDifferenceMinutes}m` : `${timeDifferenceMinutes}m`}</span>
        </div>
      </div>

    </div>
  );
};
