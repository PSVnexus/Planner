import React, { useState } from 'react';
import { Task, Category } from '../types/planner';
import { usePlanner } from '../context/PlannerContext';
import { 
  format24hTo12h, 
  formatMinutesToReadable, 
  formatSecondsToReadable, 
  formatSecondsToDigital 
} from '../utils/time';
import { 
  Play, 
  Pause, 
  CheckCircle2, 
  Circle, 
  Clock, 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  GripVertical,
  Plus,
  Minus,
  Check
} from 'lucide-react';

interface TaskItemProps {
  task: Task;
  category: Category;
  index: number;
  onDragStart?: (e: React.DragEvent, index: number) => void;
  onDragEnter?: (e: React.DragEvent, index: number) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  isDragging?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  category,
  index,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isDragging = false,
}) => {
  const {
    activeTaskId,
    activeTimerSeconds,
    isTimerRunning,
    startTimer,
    pauseTimer,
    resumeTimer,
    finishTask,
    adjustActualSeconds,
    openEditTaskModal,
    deleteTask,
    toggleSubtask,
  } = usePlanner();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const isCurrentActive = activeTaskId === task.id;
  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in_progress';

  // Calculate difference between actual and planned
  const actualMinutes = Math.round((task.actualDurationSeconds || 0) / 60);
  const plannedMinutes = task.estimatedMinutes || 0;
  const diffMinutes = actualMinutes - plannedMinutes;

  const priorityStyles = {
    high: 'text-rose-700 bg-rose-50 border-rose-200',
    medium: 'text-amber-700 bg-amber-50 border-amber-200',
    low: 'text-stone-600 bg-stone-100 border-stone-200',
    gentle: 'text-botanical-700 bg-botanical-50 border-botanical-200',
  }[task.priority || 'medium'];

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart && onDragStart(e, index)}
      onDragEnter={(e) => onDragEnter && onDragEnter(e, index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      className={`paper-card rounded-xl transition-all duration-200 ${
        isCurrentActive 
          ? 'ring-2 ring-botanical-500/80 bg-[#FDFCFB] shadow-elevated timer-active-pulse' 
          : isCompleted 
            ? 'opacity-85 bg-[#FAF8F5]/80' 
            : 'hover:border-stone-400/80'
      } ${isDragging ? 'opacity-40 scale-95 border-dashed border-botanical-500' : ''}`}
    >
      <div className="p-4 sm:p-5">
        
        {/* Top Row: Drag Handle, Category, Priority, and Menu */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            
            {/* Drag Handle */}
            <div 
              className="cursor-grab active:cursor-grabbing text-stone-400 hover:text-stone-700 p-0.5"
              title="Drag to reorder"
            >
              <GripVertical className="w-4 h-4" />
            </div>

            {/* Category Badge */}
            <span
              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border"
              style={{
                backgroundColor: category.bgColor,
                borderColor: category.borderColor,
                color: category.color,
              }}
            >
              {category.name}
            </span>

            {/* Priority Tag */}
            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold border ${priorityStyles}`}>
              {task.priority}
            </span>
          </div>

          {/* Right: Status Indicator & More Options */}
          <div className="flex items-center gap-2 relative">
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <Check className="w-3 h-3 stroke-[2.5]" /> Completed
              </span>
            )}
            {isInProgress && !isCompleted && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-warmgold-700 bg-warmgold-50 border border-warmgold-200 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-warmgold-500 animate-ping" /> In Progress
              </span>
            )}

            {/* Action Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {showActions && (
                <>
                  <div 
                    className="fixed inset-0 z-20" 
                    onClick={() => setShowActions(false)} 
                  />
                  <div className="absolute right-0 mt-1 w-36 bg-white border border-stone-200 rounded-lg shadow-float py-1 z-30 text-xs">
                    <button
                      onClick={() => {
                        setShowActions(false);
                        openEditTaskModal(task);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-stone-50 flex items-center gap-2 text-stone-700"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-stone-500" />
                      <span>Edit Task</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowActions(false);
                        deleteTask(task.id);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-rose-50 flex items-center gap-2 text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Task Title and Completion Toggle */}
        <div className="flex items-start gap-3 my-2">
          <button
            onClick={() => {
              if (isCompleted) {
                // Toggle back to not started
                adjustActualSeconds(task.id, 0);
              } else {
                finishTask(task.id);
              }
            }}
            title={isCompleted ? "Mark incomplete" : "Mark completed"}
            className="mt-0.5 text-stone-400 hover:text-botanical-600 transition-colors flex-shrink-0"
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-botanical-600 fill-botanical-50" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3 className={`text-base sm:text-lg font-serif font-medium leading-snug ${
              isCompleted ? 'line-through text-stone-400' : 'text-stone-900'
            }`}>
              {task.title}
            </h3>

            {/* Time schedule line */}
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                Planned: {format24hTo12h(task.plannedStartTime)} – {format24hTo12h(task.plannedEndTime)}
              </span>

              <span className="text-stone-400">·</span>

              <span>
                Estimated: <strong className="font-medium text-stone-700">{formatMinutesToReadable(task.estimatedMinutes)}</strong>
              </span>

              <span className="text-stone-400">·</span>

              <span className="flex items-center gap-1">
                Actual: 
                <strong className={`font-semibold ${isCompleted ? 'text-botanical-700' : 'text-stone-800'}`}>
                  {formatSecondsToReadable(task.actualDurationSeconds)}
                </strong>
                {actualMinutes > 0 && plannedMinutes > 0 && isCompleted && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                    diffMinutes <= 0 
                      ? 'bg-botanical-50 text-botanical-700' 
                      : 'bg-taupe-100 text-taupe-700'
                  }`}>
                    {diffMinutes <= 0 ? `${diffMinutes}m` : `+${diffMinutes}m`}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Timer Control Bar (Start Timer / Pause / Finish / Live elapsed) */}
        <div className="mt-4 pt-3 border-t border-stone-200/60 flex flex-wrap items-center justify-between gap-3">
          
          {/* Controls Cluster */}
          <div className="flex items-center gap-2">
            {!isCurrentActive ? (
              <button
                onClick={() => startTimer(task.id)}
                disabled={isCompleted}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isCompleted 
                    ? 'bg-stone-100 text-stone-400 cursor-not-allowed' 
                    : 'bg-[#FAF7F2] text-botanical-800 hover:bg-botanical-100 border border-botanical-200/80 shadow-xs active:scale-95'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Timer</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                {isTimerRunning ? (
                  <button
                    onClick={pauseTimer}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-taupe-100 text-taupe-800 hover:bg-taupe-200 border border-taupe-300 shadow-xs"
                  >
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </button>
                ) : (
                  <button
                    onClick={resumeTimer}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-botanical-600 text-white hover:bg-botanical-700 shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Resume</span>
                  </button>
                )}

                <button
                  onClick={() => finishTask(task.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Finish Task</span>
                </button>
              </div>
            )}

            {!isCompleted && !isCurrentActive && isInProgress && (
              <button
                onClick={() => finishTask(task.id)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Finish</span>
              </button>
            )}

            {/* Quick manual time adjustments (+5m, -5m) */}
            <div className="flex items-center gap-0.5 ml-1 border border-stone-200 rounded-md bg-white/70">
              <button
                onClick={() => adjustActualSeconds(task.id, -300)}
                title="Subtract 5 minutes"
                className="p-1 hover:bg-stone-100 text-stone-500 rounded-l"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-[10px] font-mono text-stone-400 px-1">5m</span>
              <button
                onClick={() => adjustActualSeconds(task.id, 300)}
                title="Add 5 minutes"
                className="p-1 hover:bg-stone-100 text-stone-500 rounded-r"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right: Live Ticking Elapsed Timer Display */}
          <div className="flex items-center gap-3">
            {isCurrentActive && (
              <div className="flex items-center gap-2 font-mono text-sm font-semibold text-botanical-800 bg-botanical-100/70 border border-botanical-200 px-3 py-1 rounded-md">
                <span className="w-2 h-2 rounded-full bg-botanical-600 animate-pulse" />
                <span>{formatSecondsToDigital(activeTimerSeconds)}</span>
              </div>
            )}

            {/* Expand notes button */}
            {(task.notes || (task.subtasks && task.subtasks.length > 0)) && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800"
              >
                <span>{isExpanded ? 'Hide' : 'Details'}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Notes & Subtasks */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-stone-200/50 space-y-2.5 bg-stone-50/50 p-3 rounded-lg text-xs">
            {task.notes && (
              <div>
                <span className="font-semibold text-stone-700 block mb-1">Notes:</span>
                <p className="text-stone-600 whitespace-pre-line leading-relaxed font-serif text-sm">
                  {task.notes}
                </p>
              </div>
            )}

            {task.subtasks && task.subtasks.length > 0 && (
              <div>
                <span className="font-semibold text-stone-700 block mb-1">Subtasks:</span>
                <div className="space-y-1">
                  {task.subtasks.map(sub => (
                    <label 
                      key={sub.id} 
                      className="flex items-center gap-2 cursor-pointer text-stone-700 hover:text-stone-900"
                    >
                      <input
                        type="checkbox"
                        checked={sub.completed}
                        onChange={() => toggleSubtask(task.id, sub.id)}
                        className="rounded border-stone-300 text-botanical-600 focus:ring-botanical-400"
                      />
                      <span className={sub.completed ? 'line-through text-stone-400' : ''}>
                        {sub.title}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
