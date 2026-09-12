import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { formatMinutesToReadable, formatSecondsToReadable } from '../utils/time';
import { BotanicalBranch, CornerFlourish, PerchedBird } from '../data/botanicalAssets';
import { PieChart, Clock, Target, Compass, Flame, TrendingUp, AlertCircle } from 'lucide-react';

export const TimeAnalytics: React.FC = () => {
  const { dayStats, dayTasks, categories } = usePlanner();

  const categoryMap = new Map(categories.map(c => [c.id, c]));

  // Sort tasks by actual time spent to identify most time-consuming
  const mostTimeConsumingTasks = [...dayTasks]
    .filter(t => (t.actualDurationSeconds || 0) > 0)
    .sort((a, b) => (b.actualDurationSeconds || 0) - (a.actualDurationSeconds || 0))
    .slice(0, 5);

  // Donut chart calculations
  const totalCategoryMinutes = dayStats.categoryBreakdown.reduce((acc, c) => acc + c.actualMinutes, 0) || 1;
  let cumulativePercent = 0;

  const donutSlices = dayStats.categoryBreakdown.map((cat) => {
    const percent = cat.actualMinutes / totalCategoryMinutes;
    const startAngle = cumulativePercent * 360;
    cumulativePercent += percent;
    const endAngle = cumulativePercent * 360;

    // SVG arc coordinates
    const radius = 64;
    const center = 90;
    const x1 = center + radius * Math.cos((Math.PI * (startAngle - 90)) / 180);
    const y1 = center + radius * Math.sin((Math.PI * (startAngle - 90)) / 180);
    const x2 = center + radius * Math.cos((Math.PI * (endAngle - 90)) / 180);
    const y2 = center + radius * Math.sin((Math.PI * (endAngle - 90)) / 180);
    const largeArcFlag = percent > 0.5 ? 1 : 0;

    const pathData = percent >= 0.999 
      ? `M ${center} ${center - radius} A ${radius} ${radius} 0 1 1 ${center - 0.01} ${center - radius} Z`
      : `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

    return {
      ...cat,
      percent: Math.round(percent * 100),
      pathData,
    };
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-botanical-800 bg-botanical-50 px-2.5 py-0.5 rounded-full border border-botanical-200">
              Temporal Introspection
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 flex items-center gap-2.5">
            <PieChart className="w-6 h-6 text-botanical-600" />
            <span>Where My Time Went</span>
          </h2>
          <p className="text-xs text-stone-500 font-serif italic mt-0.5">
            Clear, honest metrics examining how intention translated into living reality.
          </p>
        </div>
      </div>

      {/* 1. Summary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="paper-card rounded-xl p-5">
          <span className="text-xs font-medium uppercase tracking-wider text-stone-500 block mb-1">
            Total Time Spent Today
          </span>
          <span className="text-3xl font-serif font-semibold text-stone-800 block">
            {formatMinutesToReadable(dayStats.totalActualMinutes)}
          </span>
          <span className="text-[11px] text-stone-500 mt-1 block">
            Against {formatMinutesToReadable(dayStats.totalPlannedMinutes)} planned
          </span>
        </div>

        <div className="paper-card rounded-xl p-5">
          <span className="text-xs font-medium uppercase tracking-wider text-stone-500 block mb-1">
            Focus & Immersion Time
          </span>
          <span className="text-3xl font-serif font-semibold text-botanical-800 block">
            {formatMinutesToReadable(dayStats.focusMinutes)}
          </span>
          <span className="text-[11px] text-stone-500 mt-1 block">
            Deep work & high-priority endeavors
          </span>
        </div>

        <div className="paper-card rounded-xl p-5">
          <span className="text-xs font-medium uppercase tracking-wider text-stone-500 block mb-1">
            Unplanned Time / Variance
          </span>
          <span className="text-3xl font-serif font-semibold text-taupe-700 block">
            {formatMinutesToReadable(dayStats.unplannedMinutes)}
          </span>
          <span className="text-[11px] text-stone-500 mt-1 block">
            Spontaneous extensions or transitions
          </span>
        </div>

        <div className="paper-card rounded-xl p-5">
          <span className="text-xs font-medium uppercase tracking-wider text-stone-500 block mb-1">
            Task Realization Rate
          </span>
          <span className="text-3xl font-serif font-semibold text-stone-800 block">
            {dayStats.totalCount > 0 ? Math.round((dayStats.completedCount / dayStats.totalCount) * 100) : 0}%
          </span>
          <span className="text-[11px] text-stone-500 mt-1 block">
            {dayStats.completedCount} of {dayStats.totalCount} intentions realized
          </span>
        </div>

      </div>

      {/* 2. Charts Section: Category Donut & Planned vs Actual Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Time By Category (Minimal SVG Donut) */}
        <div className="lg:col-span-6 paper-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
          <CornerFlourish position="top-right" />

          <div>
            <h3 className="text-base font-serif font-semibold text-stone-900 mb-1">
              Time Investment by Category
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Distribution of lived hours across lifestyle domains
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Donut Chart SVG */}
              <div className="relative w-44 h-44 flex-shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 180 180" className="w-full h-full transform -rotate-90">
                  {donutSlices.map((slice, i) => (
                    <path
                      key={i}
                      d={slice.pathData}
                      fill={slice.color}
                      opacity={0.85}
                      className="hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <title>{slice.categoryName}: {formatMinutesToReadable(slice.actualMinutes)} ({slice.percent}%)</title>
                    </path>
                  ))}
                  {/* Central cutout circle for clean minimal donut */}
                  <circle cx="90" cy="90" r="42" fill="#FCFAF7" />
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-xs text-stone-400 font-sans">Total</span>
                  <span className="text-sm font-serif font-semibold text-stone-800">
                    {formatMinutesToReadable(dayStats.totalActualMinutes)}
                  </span>
                </div>
              </div>

              {/* Minimal Legend */}
              <div className="flex-1 space-y-2 w-full">
                {donutSlices.length > 0 ? (
                  donutSlices.map(slice => (
                    <div key={slice.categoryId} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full" 
                          style={{ backgroundColor: slice.color }} 
                        />
                        <span className="text-stone-700 font-medium">{slice.categoryName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-stone-800 font-medium">
                          {formatMinutesToReadable(slice.actualMinutes)}
                        </span>
                        <span className="text-stone-400 font-mono text-[11px] w-8 text-right">
                          {slice.percent}%
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-stone-400 font-serif italic">No time recorded yet.</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-stone-200/60 text-[11px] text-stone-500 font-serif italic">
            A balanced daily rhythm honors study, labor, creative craft, and restorative pause.
          </div>
        </div>

        {/* Right: Planned vs Actual Duration Bar Comparison */}
        <div className="lg:col-span-6 paper-card rounded-2xl p-6 relative flex flex-col justify-between">
          <CornerFlourish position="top-right" />

          <div>
            <h3 className="text-base font-serif font-semibold text-stone-900 mb-1">
              Planned vs. Actual Duration by Domain
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Evaluating precision between envisioned intentions and execution
            </p>

            <div className="space-y-4">
              {dayStats.categoryBreakdown.map(cat => {
                const maxVal = Math.max(cat.plannedMinutes, cat.actualMinutes, 30);
                const plannedWidth = (cat.plannedMinutes / maxVal) * 100;
                const actualWidth = (cat.actualMinutes / maxVal) * 100;
                const diff = cat.actualMinutes - cat.plannedMinutes;

                return (
                  <div key={cat.categoryId} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-stone-800">{cat.categoryName}</span>
                      <span className="text-stone-500 font-mono text-[11px]">
                        Planned: {formatMinutesToReadable(cat.plannedMinutes)} | Actual: <strong>{formatMinutesToReadable(cat.actualMinutes)}</strong>
                        {diff !== 0 && (
                          <span className={`ml-2 px-1 rounded ${diff > 0 ? 'text-taupe-700 bg-taupe-100' : 'text-botanical-700 bg-botanical-100'}`}>
                            {diff > 0 ? `+${diff}m` : `${diff}m`}
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Dual thin bars */}
                    <div className="space-y-1">
                      <div className="w-full bg-stone-200/50 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-stone-400 h-1.5 rounded-full" 
                          style={{ width: `${plannedWidth}%` }}
                          title={`Planned: ${cat.plannedMinutes}m`}
                        />
                      </div>
                      <div className="w-full bg-stone-200/50 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="h-1.5 rounded-full transition-all duration-500" 
                          style={{ width: `${actualWidth}%`, backgroundColor: cat.color }}
                          title={`Actual: ${cat.actualMinutes}m`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded bg-stone-400 inline-block" /> Top: Planned
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded bg-botanical-600 inline-block" /> Bottom: Actual
            </span>
          </div>
        </div>

      </div>

      {/* 3. Most Time-Consuming Tasks Leaderboard */}
      <div className="paper-card rounded-2xl p-6">
        <h3 className="text-base font-serif font-semibold text-stone-900 mb-1">
          Most Time-Consuming Tasks
        </h3>
        <p className="text-xs text-stone-500 mb-4">
          The core milestones that absorbed the majority of your conscious attention today
        </p>

        {mostTimeConsumingTasks.length > 0 ? (
          <div className="space-y-3">
            {mostTimeConsumingTasks.map((t, idx) => {
              const cat = categoryMap.get(t.categoryId);
              const maxTaskSecs = mostTimeConsumingTasks[0]?.actualDurationSeconds || 1;
              const barPercent = Math.min(100, Math.round((t.actualDurationSeconds / maxTaskSecs) * 100));

              return (
                <div key={t.id} className="p-3 rounded-xl bg-stone-50/70 border border-stone-200/80">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-stone-400 font-semibold w-5">#{idx + 1}</span>
                      <span className="font-serif text-sm font-medium text-stone-800">{t.title}</span>
                      {cat && (
                        <span 
                          className="text-[10px] px-2 py-0.2 rounded-full border"
                          style={{ backgroundColor: cat.bgColor, borderColor: cat.borderColor, color: cat.color }}
                        >
                          {cat.name}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-semibold text-stone-900">
                        {formatSecondsToReadable(t.actualDurationSeconds)}
                      </span>
                      <span className="text-stone-400 text-[11px]">
                        (Est: {formatMinutesToReadable(t.estimatedMinutes)})
                      </span>
                    </div>
                  </div>

                  {/* Meter bar */}
                  <div className="w-full bg-stone-200/70 rounded-full h-1 overflow-hidden">
                    <div 
                      className="bg-botanical-600 h-1 rounded-full" 
                      style={{ width: `${barPercent}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-stone-400 font-serif italic text-center py-4">
            No tracked task durations recorded yet for today. Start a timer to observe analytics.
          </p>
        )}
      </div>

    </div>
  );
};
