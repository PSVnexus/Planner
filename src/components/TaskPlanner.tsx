import React, { useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { TaskItem } from './TaskItem';
import { Task } from '../types/planner';
import { BotanicalBranch, CornerFlourish, PerchedBird } from '../data/botanicalAssets';
import { Plus, Search, Filter, Layers, CheckCircle, Clock } from 'lucide-react';

export const TaskPlanner: React.FC = () => {
  const {
    dayTasks,
    categories,
    reorderTasks,
    openCreateTaskModal,
    selectedDate,
  } = usePlanner();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Drag and Drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Filter tasks
  const filteredTasks = dayTasks.filter(task => {
    // Category match
    if (selectedCategory !== 'all' && task.categoryId !== selectedCategory) {
      return false;
    }
    // Status match
    if (statusFilter === 'active' && task.status === 'completed') {
      return false;
    }
    if (statusFilter === 'completed' && task.status !== 'completed') {
      return false;
    }
    // Search query match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(q);
      const matchesNotes = task.notes?.toLowerCase().includes(q);
      if (!matchesTitle && !matchesNotes) return false;
    }
    return true;
  });

  // Drag and drop handlers
  const handleDragStart = (_e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (_e: React.DragEvent, targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const updated = [...dayTasks];
    const itemToMove = updated.splice(draggedIndex, 1)[0];
    updated.splice(targetIndex, 0, itemToMove);

    setDraggedIndex(targetIndex);
    reorderTasks(updated);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const categoryMap = new Map(categories.map(c => [c.id, c]));

  return (
    <div className="space-y-6">
      
      {/* Top Controls Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-botanical-600" />
            <span>Task Planner & Time Log</span>
          </h2>
          <p className="text-xs text-stone-500 font-serif italic mt-0.5">
            Structure your day into conscious, focused intervals. Track every moment truthfully.
          </p>
        </div>

        {/* Search & Add button */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search intentions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-full focus:outline-none focus:border-botanical-500 focus:ring-1 focus:ring-botanical-500 transition-colors shadow-inner-soft"
            />
          </div>

          <button
            onClick={openCreateTaskModal}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-botanical-600 hover:bg-botanical-700 text-white text-xs font-medium shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Category Pills & Status Filter Bar */}
      <div className="space-y-3">
        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-stone-800 text-white shadow-xs'
                : 'bg-white/80 text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            All Categories ({dayTasks.length})
          </button>

          {categories.map(cat => {
            const count = dayTasks.filter(t => t.categoryId === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'ring-1 ring-offset-1 shadow-xs'
                    : 'hover:opacity-90 opacity-75'
                }`}
                style={{
                  backgroundColor: cat.bgColor,
                  borderColor: cat.borderColor,
                  color: cat.color,
                }}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Status Tab Toggle */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-200/50">
          <div className="flex items-center gap-1 bg-stone-100/80 p-1 rounded-lg border border-stone-200">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-md transition-colors ${
                statusFilter === 'all' ? 'bg-white text-stone-900 font-medium shadow-xs' : 'text-stone-500'
              }`}
            >
              All Tasks
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1 rounded-md transition-colors ${
                statusFilter === 'active' ? 'bg-white text-stone-900 font-medium shadow-xs' : 'text-stone-500'
              }`}
            >
              Active / In Progress
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1 rounded-md transition-colors ${
                statusFilter === 'completed' ? 'bg-white text-stone-900 font-medium shadow-xs' : 'text-stone-500'
              }`}
            >
              Completed
            </button>
          </div>

          <span className="text-stone-400 font-serif italic hidden sm:inline">
            Drag cards to reorder sequence
          </span>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        <div className="space-y-3">
          {filteredTasks.map((task, index) => {
            const cat = categoryMap.get(task.categoryId) || {
              id: 'general',
              name: 'General',
              color: '#4A5D4E',
              bgColor: '#EFF4F0',
              borderColor: '#CCD8CD',
              iconName: 'Bookmark',
            };

            return (
              <TaskItem
                key={task.id}
                task={task}
                category={cat}
                index={index}
                onDragStart={handleDragStart}
                onDragEnter={handleDragEnter}
                onDragEnd={handleDragEnd}
                isDragging={draggedIndex === index}
              />
            );
          })}
        </div>
      ) : (
        /* Empty State with Quiet Luxury Botanical Motif */
        <div className="paper-card rounded-2xl p-12 text-center relative overflow-hidden">
          <CornerFlourish position="top-right" />
          <CornerFlourish position="bottom-left" />

          <div className="max-w-md mx-auto space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-botanical-50 border border-botanical-200 flex items-center justify-center text-botanical-600">
              <PerchedBird className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-serif font-semibold text-stone-800">
              No tasks found for this view
            </h3>

            <p className="text-sm text-stone-500 font-serif italic">
              A serene canvas awaits your intentional moments. Plan a gentle block for study, creative contemplation, or focused work.
            </p>

            <button
              onClick={openCreateTaskModal}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-botanical-600 hover:bg-botanical-700 text-white text-xs font-medium shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Task</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
