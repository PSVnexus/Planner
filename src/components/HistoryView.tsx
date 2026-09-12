import React, { useState, useMemo } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { formatMinutesToReadable, formatSecondsToReadable, formatDisplayDate, format24hTo12h } from '../utils/time';
import { getTodayDateString } from '../data/defaultData';
import { CornerFlourish, PerchedBird } from '../data/botanicalAssets';
import { History, Calendar, CheckCircle2, Clock, BarChart3, ChevronLeft, ChevronRight, Feather } from 'lucide-react';

export const HistoryView: React.FC = () => {
  const { tasks, reflections, categories, setSelectedDate, setCurrentView } = usePlanner();

  const [historyTab, setHistoryTab] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [selectedHistoryDate, setSelectedHistoryDate] = useState(getTodayDateString(0));

  const categoryMap = useMemo(() => new Map(categories.map(c => [c.id, c])), [categories]);

  // Tasks for selected history date
  const dateTasks = useMemo(() => {
    return tasks.filter(t => t.date === selectedHistoryDate);
  }, [tasks, selectedHistoryDate]);

  const dateReflection = reflections[selectedHistoryDate];

  // 7-day week summary data
  const weekData = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${day}`;

      const dayTaskList = tasks.filter(t => t.date === dateStr);
      const plannedMins = dayTaskList.reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);
      const actualMins = Math.round(dayTaskList.reduce((acc, t) => acc + (t.actualDurationSeconds || 0), 0) / 60);
      const completedCount = dayTaskList.filter(t => t.status === 'completed').length;

      days.push({
        dateStr,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        plannedMins,
        actualMins,
        completedCount,
        totalCount: dayTaskList.length,
      });
    }
    return days;
  }, [tasks]);

  const maxWeekMinutes = Math.max(...weekData.map(d => Math.max(d.plannedMins, d.actualMins)), 180);

  return (
    <div className="space-y-6">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
              Retrospective Log
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 flex items-center gap-2.5">
            <History className="w-6 h-6 text-botanical-600" />
            <span>Temporal Archive</span>
          </h2>
          <p className="text-xs text-stone-500 font-serif italic mt-0.5">
            Review your historical rhythms across days, weeks, and seasons.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full border border-stone-200 text-xs">
          <button
            onClick={() => setHistoryTab('weekly')}
            className={`px-3 py-1 rounded-full transition-all ${
              historyTab === 'weekly' ? 'bg-white font-medium text-stone-900 shadow-xs' : 'text-stone-600'
            }`}
          >
            Weekly Trend
          </button>
          <button
            onClick={() => setHistoryTab('daily')}
            className={`px-3 py-1 rounded-full transition-all ${
              historyTab === 'daily' ? 'bg-white font-medium text-stone-900 shadow-xs' : 'text-stone-600'
            }`}
          >
            Daily Archive
          </button>
        </div>
      </div>

      {/* 1. Weekly Retrospective View */}
      {historyTab === 'weekly' && (
        <div className="space-y-6">
          <div className="paper-card rounded-2xl p-6 sm:p-8 relative">
            <CornerFlourish position="top-right" />

            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-serif font-semibold text-stone-900">
                  Past 7 Days Comparison: Planned vs. Actual
                </h3>
                <p className="text-xs text-stone-500">
                  Daily hours invested and completion fidelity over the rolling week
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-stone-600">
                  <span className="w-3 h-3 rounded-xs bg-stone-300 inline-block" /> Planned Hours
                </span>
                <span className="flex items-center gap-1.5 text-botanical-800 font-medium">
                  <span className="w-3 h-3 rounded-xs bg-botanical-600 inline-block" /> Actual Logged
                </span>
              </div>
            </div>

            {/* 7-day Bar Chart */}
            <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-56 pt-6 pb-2 border-b border-stone-200">
              {weekData.map((d) => {
                const plannedHeight = (d.plannedMins / maxWeekMinutes) * 100;
                const actualHeight = (d.actualMins / maxWeekMinutes) * 100;

                return (
                  <div 
                    key={d.dateStr} 
                    onClick={() => {
                      setSelectedHistoryDate(d.dateStr);
                      setHistoryTab('daily');
                    }}
                    className="flex flex-col items-center h-full justify-end group cursor-pointer"
                  >
                    <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-full pb-2">
                      {/* Planned bar */}
                      <div 
                        className="w-2.5 sm:w-4 bg-stone-300 rounded-t-sm group-hover:bg-stone-400 transition-all"
                        style={{ height: `${Math.max(4, plannedHeight)}%` }}
                        title={`Planned: ${formatMinutesToReadable(d.plannedMins)}`}
                      />
                      {/* Actual bar */}
                      <div 
                        className="w-2.5 sm:w-4 bg-botanical-600 rounded-t-sm group-hover:bg-botanical-700 transition-all shadow-xs"
                        style={{ height: `${Math.max(4, actualHeight)}%` }}
                        title={`Actual: ${formatMinutesToReadable(d.actualMins)}`}
                      />
                    </div>

                    <span className="text-[11px] font-medium text-stone-700 mt-1">
                      {d.dayName}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {d.dayNum}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Weekly Insights Footer */}
            <div className="mt-4 pt-2 flex flex-wrap items-center justify-between text-xs text-stone-500 font-serif italic">
              <span>Click on any column to inspect that day's granular log.</span>
              <span>Total week focus: {formatMinutesToReadable(weekData.reduce((acc, d) => acc + d.actualMins, 0))}</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Daily Archive Deep-Dive */}
      {historyTab === 'daily' && (
        <div className="space-y-6">
          {/* Date selector row */}
          <div className="flex items-center justify-between paper-card rounded-xl p-4">
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={selectedHistoryDate}
                onChange={(e) => e.target.value && setSelectedHistoryDate(e.target.value)}
                className="text-xs bg-white border border-stone-200 rounded-md px-2.5 py-1.5 text-stone-800 font-serif cursor-pointer shadow-inner-soft"
              />
              <span className="text-sm font-serif font-semibold text-stone-800">
                {formatDisplayDate(selectedHistoryDate)}
              </span>
            </div>

            <button
              onClick={() => {
                setSelectedDate(selectedHistoryDate);
                setCurrentView('today');
              }}
              className="text-xs px-3 py-1.5 rounded-full bg-botanical-100 text-botanical-800 hover:bg-botanical-200 transition-colors font-medium"
            >
              Open in Active Planner
            </button>
          </div>

          {/* Tasks Logged for that day */}
          <div className="paper-card rounded-2xl p-6">
            <h3 className="text-base font-serif font-semibold text-stone-900 mb-3">
              Archived Intentions ({dateTasks.length})
            </h3>

            {dateTasks.length > 0 ? (
              <div className="space-y-2.5">
                {dateTasks.map(t => {
                  const cat = categoryMap.get(t.categoryId);
                  return (
                    <div key={t.id} className="p-3 rounded-xl bg-stone-50/70 border border-stone-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className={`w-4 h-4 ${t.status === 'completed' ? 'text-botanical-600' : 'text-stone-300'}`} />
                        <div>
                          <span className={`font-serif text-sm font-medium ${t.status === 'completed' ? 'text-stone-800' : 'text-stone-500'}`}>
                            {t.title}
                          </span>
                          <div className="flex items-center gap-2 mt-0.5 text-stone-400">
                            {cat && <span style={{ color: cat.color }}>{cat.name}</span>}
                            <span>·</span>
                            <span>{format24hTo12h(t.plannedStartTime)} - {format24hTo12h(t.plannedEndTime)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="font-mono text-right">
                        <span className="font-semibold text-stone-800 block">
                          Actual: {formatSecondsToReadable(t.actualDurationSeconds)}
                        </span>
                        <span className="text-stone-400 text-[10px]">
                          Planned: {formatMinutesToReadable(t.estimatedMinutes)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-stone-400 font-serif italic py-4">No tasks found for this selected date.</p>
            )}
          </div>

          {/* Reflection for that day */}
          {dateReflection && (
            <div className="paper-card rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Feather className="w-4 h-4 text-warmgold-600" />
                <h3 className="text-base font-serif font-semibold text-stone-900">
                  Daily Reflection for {formatDisplayDate(selectedHistoryDate)}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {dateReflection.whatWentWell && (
                  <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/80">
                    <strong className="text-botanical-700 block mb-1">What went well:</strong>
                    <p className="text-stone-600 font-serif">{dateReflection.whatWentWell}</p>
                  </div>
                )}
                {dateReflection.tookLonger && (
                  <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/80">
                    <strong className="text-taupe-700 block mb-1">What took longer:</strong>
                    <p className="text-stone-600 font-serif">{dateReflection.tookLonger}</p>
                  </div>
                )}
                {dateReflection.changeTomorrow && (
                  <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/80">
                    <strong className="text-dusty-700 block mb-1">Change tomorrow:</strong>
                    <p className="text-stone-600 font-serif">{dateReflection.changeTomorrow}</p>
                  </div>
                )}
                {dateReflection.gratitude && (
                  <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/80">
                    <strong className="text-rose-700 block mb-1">Gratitude:</strong>
                    <p className="text-stone-600 font-serif">{dateReflection.gratitude}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
