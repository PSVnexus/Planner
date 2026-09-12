import React, { useMemo } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { 
  format24hTo12h, 
  formatMinutesToReadable, 
  formatSecondsToReadable, 
  formatSecondsToDigital 
} from '../utils/time';
import { StaircaseIcon, PerchedBird, FlyingBird } from '../data/botanicalAssets';
import { 
  Play, 
  Pause, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Check, 
  Flame,
  ArrowRight
} from 'lucide-react';

export const StaircaseTimeline: React.FC = () => {
  const {
    dayTasks,
    categories,
    activeTaskId,
    activeTimerSeconds,
    isTimerRunning,
    startTimer,
    pauseTimer,
    resumeTimer,
    finishTask,
    openCreateTaskModal,
    openEditTaskModal,
  } = usePlanner();

  const categoryMap = useMemo(() => new Map(categories.map(c => [c.id, c])), [categories]);

  // Sort tasks chronologically by start time for the staircase progression
  const sortedTasks = useMemo(() => {
    return [...dayTasks].sort((a, b) => {
      const timeA = a.plannedStartTime || '00:00';
      const timeB = b.plannedStartTime || '00:00';
      return timeA.localeCompare(timeB);
    });
  }, [dayTasks]);

  // Calculate current time indicator position (hours 07:00 to 22:00)
  const now = new Date();
  const currentMinutesFromMidnight = now.getHours() * 60 + now.getMinutes();
  const timelineStartMinutes = 7 * 60; // 07:00 AM
  const timelineEndMinutes = 22 * 60;  // 10:00 PM
  const totalTimelineMinutes = timelineEndMinutes - timelineStartMinutes;

  const currentProgressPercent = Math.min(
    100,
    Math.max(0, ((currentMinutesFromMidnight - timelineStartMinutes) / totalTimelineMinutes) * 100)
  );

  return (
    <div className="space-y-6">
      
      {/* Timeline Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-warmgold-700 bg-warmgold-50 px-2.5 py-0.5 rounded-full border border-warmgold-200">
              Architectural Concept
            </span>
            <span className="text-xs text-stone-500 font-serif italic">
              Cantilevered stone steps of time
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 flex items-center gap-2.5">
            <StaircaseIcon className="w-7 h-7 text-botanical-700" />
            <span>Staircase Daily Timeline</span>
          </h2>
          <p className="text-xs text-stone-500 font-serif italic mt-0.5 max-w-xl">
            Ascend through your day step by step, inspired by sculptural limestone architecture and quiet interior serenity.
          </p>
        </div>

        {/* Current Time Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs font-mono text-stone-700 shadow-inner-soft">
          <Clock className="w-3.5 h-3.5 text-botanical-600" />
          <span>Current Time: <strong>{format24hTo12h(`${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`)}</strong></span>
        </div>
      </div>

      {/* Main Architectural Staircase Container */}
      <div className="relative paper-card rounded-2xl p-6 sm:p-10 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F8F4ED] to-[#FAF7F2]">
        
        {/* Subtle architectural vertical spine (Balustrade / Central Riser) */}
        <div className="absolute left-6 sm:left-1/2 top-10 bottom-10 w-0.5 -translate-x-1/2 bg-gradient-to-b from-stone-300/40 via-botanical-300/40 to-stone-300/40 pointer-events-none" />

        {/* Real-time "Now" Glide Marker on the staircase */}
        <div 
          className="absolute left-0 right-0 z-20 pointer-events-none transition-all duration-1000 flex items-center"
          style={{ top: `${Math.max(8, Math.min(92, currentProgressPercent))}%` }}
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-warmgold-500 to-transparent shadow-xs" />
          <div className="absolute right-4 sm:right-8 -top-3 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-warmgold-500 text-white shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>NOW</span>
          </div>
        </div>

        {/* Staircase Steps List */}
        {sortedTasks.length > 0 ? (
          <div className="relative z-10 space-y-8 sm:space-y-12">
            {sortedTasks.map((task, index) => {
              const cat = categoryMap.get(task.categoryId) || {
                id: 'general',
                name: 'General',
                color: '#4A5D4E',
                bgColor: '#EFF4F0',
                borderColor: '#CCD8CD',
                iconName: 'Bookmark',
              };

              const isCurrentActive = activeTaskId === task.id;
              const isCompleted = task.status === 'completed';
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={task.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                    isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Step Card (Cantilevered limestone step) */}
                  <div className={`w-full sm:w-[46%] ${isEven ? 'sm:text-right' : 'sm:text-left'}`}>
                    <div 
                      className={`staircase-step rounded-2xl p-5 border transition-all ${
                        isCurrentActive 
                          ? 'border-botanical-500 bg-white ring-2 ring-botanical-400/30 shadow-elevated timer-active-pulse' 
                          : isCompleted 
                            ? 'border-stone-200/90 bg-[#F7F4ED]/80' 
                            : 'border-stone-300/80 bg-[#FCFAF7]'
                      }`}
                    >
                      {/* Step Header info */}
                      <div className={`flex items-center gap-2 mb-2 ${
                        isEven ? 'sm:justify-end' : 'sm:justify-start'
                      }`}>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                          Step 0{index + 1}
                        </span>

                        <span
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border"
                          style={{
                            backgroundColor: cat.bgColor,
                            borderColor: cat.borderColor,
                            color: cat.color,
                          }}
                        >
                          {cat.name}
                        </span>

                        <span className="text-[10px] font-mono text-stone-500 bg-white/60 px-2 py-0.5 rounded border border-stone-200">
                          {format24hTo12h(task.plannedStartTime)} – {format24hTo12h(task.plannedEndTime)}
                        </span>
                      </div>

                      {/* Task Name */}
                      <h3 
                        onClick={() => openEditTaskModal(task)}
                        className={`text-base sm:text-lg font-serif font-medium cursor-pointer hover:text-botanical-700 transition-colors ${
                          isCompleted ? 'line-through text-stone-400' : 'text-stone-900'
                        }`}
                      >
                        {task.title}
                      </h3>

                      {/* Duration details & Status */}
                      <div className={`mt-3 flex flex-wrap items-center gap-3 text-xs text-stone-500 ${
                        isEven ? 'sm:justify-end' : 'sm:justify-start'
                      }`}>
                        <span className="flex items-center gap-1 font-mono">
                          Planned: <strong className="font-semibold text-stone-700">{formatMinutesToReadable(task.estimatedMinutes)}</strong>
                        </span>

                        <span className="text-stone-300">|</span>

                        <span className="flex items-center gap-1 font-mono">
                          Actual: <strong className={`font-semibold ${isCompleted ? 'text-botanical-700' : 'text-stone-800'}`}>
                            {formatSecondsToReadable(task.actualDurationSeconds)}
                          </strong>
                        </span>

                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <Check className="w-3 h-3 stroke-[2.5]" /> Done
                          </span>
                        )}
                      </div>

                      {/* Inline Step Timer Control */}
                      <div className={`mt-4 pt-3 border-t border-stone-200/60 flex items-center gap-2 ${
                        isEven ? 'sm:justify-end' : 'sm:justify-start'
                      }`}>
                        {!isCurrentActive ? (
                          <button
                            onClick={() => startTimer(task.id)}
                            disabled={isCompleted}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              isCompleted 
                                ? 'bg-stone-100 text-stone-400 cursor-not-allowed' 
                                : 'bg-[#FAF7F2] text-botanical-800 hover:bg-botanical-100 border border-botanical-200/80 shadow-xs'
                            }`}
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Ascend / Start Timer</span>
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            {isTimerRunning ? (
                              <button
                                onClick={pauseTimer}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-taupe-100 text-taupe-800 hover:bg-taupe-200 border border-taupe-300 shadow-xs"
                              >
                                <Pause className="w-3 h-3" />
                                <span>Pause</span>
                              </button>
                            ) : (
                              <button
                                onClick={resumeTimer}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-botanical-600 text-white hover:bg-botanical-700 shadow-xs"
                              >
                                <Play className="w-3 h-3 fill-current" />
                                <span>Resume</span>
                              </button>
                            )}

                            <button
                              onClick={() => finishTask(task.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Complete Step</span>
                            </button>

                            {/* Live timer elapsed badge */}
                            <span className="font-mono text-xs font-semibold text-botanical-800 bg-botanical-100 px-2 py-1 rounded">
                              {formatSecondsToDigital(activeTimerSeconds)}
                            </span>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* Central Staircase Plinth / Landing Node */}
                  <div className="hidden sm:flex flex-col items-center justify-center relative z-20">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCurrentActive
                          ? 'bg-botanical-600 border-white text-white shadow-elevated scale-110'
                          : isCompleted
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                            : 'bg-[#FAF7F2] border-stone-300 text-stone-600'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      ) : isCurrentActive ? (
                        <Flame className="w-4 h-4 animate-pulse" />
                      ) : (
                        <span className="font-serif text-xs font-semibold">{index + 1}</span>
                      )}
                    </div>
                  </div>

                  {/* Empty counterpart column for alternating balance */}
                  <div className="hidden sm:block w-[46%]" />

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-stone-500 font-serif italic">
              No stairs planned for this date yet.
            </p>
            <button
              onClick={openCreateTaskModal}
              className="mt-3 px-4 py-2 rounded-full bg-botanical-600 text-white text-xs font-medium"
            >
              Add First Task to Staircase
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
