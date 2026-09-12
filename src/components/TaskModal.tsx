import React, { useState, useEffect } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { Task, Priority, Subtask } from '../types/planner';
import { calculateMinutesBetween, formatMinutesToReadable } from '../utils/time';
import { CornerFlourish } from '../data/botanicalAssets';
import { X, Plus, Trash2, Clock, Calendar, Bookmark, AlertCircle } from 'lucide-react';

export const TaskModal: React.FC = () => {
  const {
    isTaskModalOpen,
    editingTask,
    closeTaskModal,
    addTask,
    updateTask,
    categories,
    selectedDate,
  } = usePlanner();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(selectedDate);
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'work');
  const [priority, setPriority] = useState<Priority>('medium');
  const [plannedStartTime, setPlannedStartTime] = useState('09:00');
  const [plannedEndTime, setPlannedEndTime] = useState('10:30');
  const [estimatedMinutes, setEstimatedMinutes] = useState(90);
  const [notes, setNotes] = useState('');
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  // Auto-calculate estimated minutes whenever start or end times change
  useEffect(() => {
    const diff = calculateMinutesBetween(plannedStartTime, plannedEndTime);
    if (diff > 0) {
      setEstimatedMinutes(diff);
    }
  }, [plannedStartTime, plannedEndTime]);

  // Populate when editing or reset when adding
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDate(editingTask.date);
      setCategoryId(editingTask.categoryId);
      setPriority(editingTask.priority);
      setPlannedStartTime(editingTask.plannedStartTime);
      setPlannedEndTime(editingTask.plannedEndTime);
      setEstimatedMinutes(editingTask.estimatedMinutes);
      setNotes(editingTask.notes || '');
      setSubtasks(editingTask.subtasks || []);
    } else {
      setTitle('');
      setDate(selectedDate);
      setCategoryId(categories[0]?.id || 'work');
      setPriority('medium');
      setPlannedStartTime('10:00');
      setPlannedEndTime('11:30');
      setEstimatedMinutes(90);
      setNotes('');
      setSubtasks([]);
    }
  }, [editingTask, isTaskModalOpen, selectedDate, categories]);

  if (!isTaskModalOpen) return null;

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    setSubtasks([
      ...subtasks,
      {
        id: `sub-${Date.now()}`,
        title: newSubtaskTitle.trim(),
        completed: false,
      },
    ]);
    setNewSubtaskTitle('');
  };

  const handleRemoveSubtask = (id: string) => {
    setSubtasks(subtasks.filter(s => s.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTask) {
      updateTask({
        ...editingTask,
        title: title.trim(),
        date,
        categoryId,
        priority,
        plannedStartTime,
        plannedEndTime,
        estimatedMinutes,
        notes,
        subtasks,
      });
    } else {
      addTask({
        title: title.trim(),
        date,
        categoryId,
        priority,
        plannedStartTime,
        plannedEndTime,
        estimatedMinutes,
        actualDurationSeconds: 0,
        status: 'not_started',
        notes,
        subtasks,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      
      {/* Modal Surface */}
      <div className="relative w-full max-w-xl bg-[#FCFAF7] border border-stone-200/90 rounded-2xl shadow-float p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col">
        <CornerFlourish position="top-right" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/60 mb-5">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400">
              {editingTask ? 'Edit Intention' : 'New Daily Intention'}
            </span>
            <h2 className="text-2xl font-serif font-semibold text-stone-900">
              {editingTask ? 'Refine Task Details' : 'Plan a Conscious Task'}
            </h2>
          </div>

          <button
            onClick={closeTaskModal}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1 flex-1">
          
          {/* Task Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Task Name *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="e.g. Study Mathematics, Architectural Blueprint, Garden Walk..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm px-3.5 py-2 rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-botanical-500 focus:ring-1 focus:ring-botanical-500 transition-colors font-serif shadow-inner-soft"
            />
          </div>

          {/* Category & Priority Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-botanical-500 transition-colors cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-botanical-500 transition-colors cursor-pointer"
              >
                <option value="high">High (Deep Immersion)</option>
                <option value="medium">Medium (Steady Focus)</option>
                <option value="low">Low (Light Task)</option>
                <option value="gentle">Gentle (Restorative)</option>
              </select>
            </div>
          </div>

          {/* Planned Timing: Start, End, and Estimated Duration */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-botanical-600" />
              <span>Planned Schedule</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] text-stone-500 mb-1">Start Time</label>
                <input
                  type="time"
                  required
                  value={plannedStartTime}
                  onChange={(e) => setPlannedStartTime(e.target.value)}
                  className="w-full text-xs p-1.5 rounded-lg bg-white border border-stone-200 focus:outline-none focus:border-botanical-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] text-stone-500 mb-1">End Time</label>
                <input
                  type="time"
                  required
                  value={plannedEndTime}
                  onChange={(e) => setPlannedEndTime(e.target.value)}
                  className="w-full text-xs p-1.5 rounded-lg bg-white border border-stone-200 focus:outline-none focus:border-botanical-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] text-stone-500 mb-1">Estimated Mins</label>
                <input
                  type="number"
                  min={5}
                  step={5}
                  value={estimatedMinutes}
                  onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                  className="w-full text-xs p-1.5 rounded-lg bg-white border border-stone-200 focus:outline-none focus:border-botanical-500 font-mono"
                />
              </div>
            </div>

            <div className="text-[11px] text-stone-500 font-serif italic">
              Estimated duration: <strong>{formatMinutesToReadable(estimatedMinutes)}</strong>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Notes & Contemplations
            </label>
            <textarea
              rows={2}
              placeholder="Add key insights, reference pages, or specific objectives..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-3 rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-botanical-500 transition-colors font-serif shadow-inner-soft"
            />
          </div>

          {/* Subtasks Checklist */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Checklist / Sub-items
            </label>

            {/* List of subtasks */}
            {subtasks.length > 0 && (
              <div className="space-y-1.5 mb-2">
                {subtasks.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-white border border-stone-200 text-xs">
                    <span className="text-stone-700 truncate">{sub.title}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubtask(sub.id)}
                      className="text-stone-400 hover:text-rose-600 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add subtask input */}
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                placeholder="Add subtask step..."
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSubtask(e);
                  }
                }}
                className="flex-1 text-xs px-3 py-1.5 rounded-lg bg-white border border-stone-200 focus:outline-none focus:border-botanical-500 shadow-inner-soft"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium border border-stone-200"
              >
                Add
              </button>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-stone-200/60 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeTaskModal}
              className="px-4 py-2 rounded-full text-xs font-medium text-stone-600 hover:bg-stone-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-botanical-600 hover:bg-botanical-700 text-white text-xs font-medium shadow-sm transition-all active:scale-95"
            >
              {editingTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
