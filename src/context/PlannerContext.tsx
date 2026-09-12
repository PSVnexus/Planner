import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { Task, Category, DailyReflection, DayStats, ViewMode } from '../types/planner';
import { DEFAULT_CATEGORIES, INITIAL_TASKS, INITIAL_REFLECTIONS, getTodayDateString } from '../data/defaultData';
import { sound } from '../utils/sound';

interface PlannerContextType {
  tasks: Task[];
  categories: Category[];
  reflections: Record<string, DailyReflection>;
  selectedDate: string;
  currentView: ViewMode;
  activeTaskId: string | null;
  activeTimerSeconds: number;
  isTimerRunning: boolean;
  isSoundEnabled: boolean;
  isTaskModalOpen: boolean;
  editingTask: Task | null;
  isInspirationModalOpen: boolean;
  isSettingsModalOpen: boolean;

  // Actions
  setSelectedDate: (date: string) => void;
  setCurrentView: (view: ViewMode) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'order'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  startTimer: (taskId: string) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  finishTask: (taskId: string) => void;
  adjustActualSeconds: (taskId: string, deltaSeconds: number) => void;
  reorderTasks: (newTasks: Task[]) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  saveReflection: (reflection: DailyReflection) => void;
  toggleSound: () => void;
  resetToDefaultData: () => void;
  exportData: () => void;
  importData: (jsonStr: string) => boolean;

  // Modals
  openCreateTaskModal: () => void;
  openEditTaskModal: (task: Task) => void;
  closeTaskModal: () => void;
  openInspirationModal: () => void;
  closeInspirationModal: () => void;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;

  // Category management
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;

  // Derived state for current selectedDate
  dayTasks: Task[];
  dayStats: DayStats;
  currentActiveTask: Task | null;
  currentReflection: DailyReflection | null;
}

const STORAGE_KEYS = {
  TASKS: 'aura_planner_tasks_v2',
  CATEGORIES: 'aura_planner_categories_v2',
  REFLECTIONS: 'aura_planner_reflections_v2',
  SOUND: 'aura_planner_sound_v2',
  SESSION: 'aura_planner_session_v3',
  UI: 'aura_planner_ui_v3',
};

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);
const getSavedSession = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SESSION);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};


export const PlannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial persistent state
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TASKS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_CATEGORIES;
  });

  const [reflections, setReflections] = useState<Record<string, DailyReflection>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REFLECTIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REFLECTIONS;
  });

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UI);
      const parsed = saved ? JSON.parse(saved) : null;
      return parsed?.selectedDate || getTodayDateString(0);
    } catch {
      return getTodayDateString(0);
    }
  });
  const [currentView, setCurrentView] = useState<ViewMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UI);
      const parsed = saved ? JSON.parse(saved) : null;
      return parsed?.currentView || 'today';
    } catch {
      return 'today';
    }
  });
  
  // Timer State - restored from local storage so the app can continue where it left off.
  const [activeTaskId, setActiveTaskId] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SESSION);
      return saved ? JSON.parse(saved)?.activeTaskId || null : null;
    } catch {
      return null;
    }
  });
  const [activeTimerSeconds, setActiveTimerSeconds] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SESSION);
      return saved ? Number(JSON.parse(saved)?.activeTimerSeconds || 0) : 0;
    } catch {
      return 0;
    }
  });
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SESSION);
      return saved ? Boolean(JSON.parse(saved)?.isTimerRunning) : false;
    } catch {
      return false;
    }
  });
  const lastTickTimeRef = useRef<number | null>(getSavedSession()?.lastTickTime ?? null);

  // Sound State
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOUND);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Modal States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isInspirationModalOpen, setIsInspirationModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(reflections));
  }, [reflections]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SOUND, JSON.stringify(isSoundEnabled));
    sound.setEnabled(isSoundEnabled);
  }, [isSoundEnabled]);

  // Remember the exact planner location so reopening the app returns to the same place.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.UI, JSON.stringify({ selectedDate, currentView }));
  }, [selectedDate, currentView]);

  // Persist the active timer/session. This is separate from task data so a running timer
  // can be restored even after the browser tab/app has been closed.
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.SESSION,
      JSON.stringify({
        activeTaskId,
        activeTimerSeconds,
        isTimerRunning,
        lastTickTime: lastTickTimeRef.current,
        savedAt: Date.now(),
      })
    );
  }, [activeTaskId, activeTimerSeconds, isTimerRunning]);

  // Restore elapsed time that passed while the app was closed/backgrounded.
  // The normal timer engine below then takes over from the restored timestamp.
  useEffect(() => {
    if (!isTimerRunning || !activeTaskId || !lastTickTimeRef.current) return;

    const elapsedSeconds = Math.max(0, Math.floor((Date.now() - lastTickTimeRef.current) / 1000));
    if (elapsedSeconds > 0) {
      setActiveTimerSeconds(prev => prev + elapsedSeconds);
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === activeTaskId
            ? {
                ...t,
                actualDurationSeconds: (t.actualDurationSeconds || 0) + elapsedSeconds,
                status: t.status === 'not_started' ? 'in_progress' : t.status,
              }
            : t
        )
      );
    }

    lastTickTimeRef.current = Date.now();
  // Run once after the persisted session has been loaded.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Real-time Timer Engine with background-safe delta calculation
  useEffect(() => {
    if (!isTimerRunning || !activeTaskId) {
      lastTickTimeRef.current = null;
      return;
    }

    lastTickTimeRef.current = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const lastTick = lastTickTimeRef.current || now;
      const deltaSeconds = Math.max(1, Math.round((now - lastTick) / 1000));
      lastTickTimeRef.current = now;

      setActiveTimerSeconds(prev => prev + deltaSeconds);

      setTasks(prevTasks =>
        prevTasks.map(t => {
          if (t.id === activeTaskId) {
            return {
              ...t,
              actualDurationSeconds: (t.actualDurationSeconds || 0) + deltaSeconds,
              status: t.status === 'not_started' ? 'in_progress' : t.status,
            };
          }
          return t;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, activeTaskId]);

  // Current active task
  const currentActiveTask = useMemo(() => {
    if (!activeTaskId) return null;
    return tasks.find(t => t.id === activeTaskId) || null;
  }, [tasks, activeTaskId]);

  // Day tasks filtered for selectedDate and sorted by order
  const dayTasks = useMemo(() => {
    return tasks
      .filter(t => t.date === selectedDate)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [tasks, selectedDate]);

  // Day stats
  const dayStats = useMemo((): DayStats => {
    let totalPlannedMinutes = 0;
    let totalActualSeconds = 0;
    let completedCount = 0;
    let focusMinutes = 0;

    const catMap: Record<string, { planned: number; actual: number }> = {};
    categories.forEach(c => {
      catMap[c.id] = { planned: 0, actual: 0 };
    });

    dayTasks.forEach(t => {
      totalPlannedMinutes += t.estimatedMinutes || 0;
      totalActualSeconds += t.actualDurationSeconds || 0;

      if (t.status === 'completed') {
        completedCount++;
      }

      if (t.priority === 'high') {
        focusMinutes += Math.round((t.actualDurationSeconds || 0) / 60);
      }

      if (catMap[t.categoryId]) {
        catMap[t.categoryId].planned += t.estimatedMinutes || 0;
        catMap[t.categoryId].actual += Math.round((t.actualDurationSeconds || 0) / 60);
      }
    });

    const totalActualMinutes = Math.round(totalActualSeconds / 60);
    // Assuming a conscious 14-hour daytime span (e.g. 840 mins)
    const dailyBudgetMinutes = 840;
    const remainingAvailableMinutes = Math.max(0, dailyBudgetMinutes - totalActualMinutes);
    const unplannedMinutes = Math.max(0, totalActualMinutes - totalPlannedMinutes);

    const categoryBreakdown = categories.map(cat => ({
      categoryId: cat.id,
      categoryName: cat.name,
      color: cat.color,
      plannedMinutes: catMap[cat.id]?.planned || 0,
      actualMinutes: catMap[cat.id]?.actual || 0,
    })).filter(c => c.plannedMinutes > 0 || c.actualMinutes > 0);

    return {
      totalPlannedMinutes,
      totalActualMinutes,
      completedCount,
      totalCount: dayTasks.length,
      remainingAvailableMinutes,
      focusMinutes,
      unplannedMinutes,
      categoryBreakdown,
    };
  }, [dayTasks, categories]);

  // Reflection for selected date
  const currentReflection = useMemo(() => {
    return reflections[selectedDate] || null;
  }, [reflections, selectedDate]);

  // Timer Controls
  const startTimer = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    sound.playSoftTap();
    setActiveTaskId(taskId);
    setActiveTimerSeconds(task.actualDurationSeconds || 0);
    setIsTimerRunning(true);
    lastTickTimeRef.current = Date.now();

    // Ensure task is marked in_progress
    setTasks(prev =>
      prev.map(t => (t.id === taskId && t.status === 'not_started' ? { ...t, status: 'in_progress' } : t))
    );
  };

  const pauseTimer = () => {
    sound.playSoftTap();
    setIsTimerRunning(false);
  };

  const resumeTimer = () => {
    if (activeTaskId) {
      sound.playSoftTap();
      lastTickTimeRef.current = Date.now();
      setIsTimerRunning(true);
    }
  };

  const finishTask = (taskId: string) => {
    sound.playGentleChime();
    const nowIso = new Date().toISOString();

    if (activeTaskId === taskId) {
      setIsTimerRunning(false);
      setActiveTaskId(null);
    }

    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            status: 'completed',
            completedAt: nowIso,
            subtasks: t.subtasks.map(s => ({ ...s, completed: true })),
          };
        }
        return t;
      })
    );
  };

  const adjustActualSeconds = (taskId: string, deltaSeconds: number) => {
    sound.playSoftTap();
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const newSecs = Math.max(0, (t.actualDurationSeconds || 0) + deltaSeconds);
          if (activeTaskId === taskId) {
            setActiveTimerSeconds(newSecs);
          }
          return { ...t, actualDurationSeconds: newSecs };
        }
        return t;
      })
    );
  };

  // Task CRUD
  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'order'>) => {
    sound.playSoftTap();
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      order: dayTasks.length,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
    setIsTaskModalOpen(false);
  };

  const updateTask = (updated: Task) => {
    sound.playSoftTap();
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const deleteTask = (taskId: string) => {
    sound.playSoftTap();
    if (activeTaskId === taskId) {
      setIsTimerRunning(false);
      setActiveTaskId(null);
    }
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const reorderTasks = (newTasks: Task[]) => {
    const updatedTasksWithOrder = newTasks.map((t, index) => ({
      ...t,
      order: index,
    }));

    setTasks(prev => {
      const otherTasks = prev.filter(t => t.date !== selectedDate);
      return [...otherTasks, ...updatedTasksWithOrder];
    });
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    sound.playSoftTap();
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const updatedSubtasks = t.subtasks.map(s =>
            s.id === subtaskId ? { ...s, completed: !s.completed } : s
          );
          return { ...t, subtasks: updatedSubtasks };
        }
        return t;
      })
    );
  };

  // Reflection
  const saveReflection = (reflection: DailyReflection) => {
    sound.playGentleChime();
    setReflections(prev => ({
      ...prev,
      [reflection.date]: reflection,
    }));
  };

  // Categories
  const addCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
  };

  const updateCategory = (category: Category) => {
    setCategories(prev => prev.map(c => (c.id === category.id ? category : c)));
  };

  // Toggles
  const toggleSound = () => {
    setIsSoundEnabled(prev => !prev);
  };

  const resetToDefaultData = () => {
    if (window.confirm('Reset all tasks and reflections to quiet luxury default sample data?')) {
      setTasks(INITIAL_TASKS);
      setCategories(DEFAULT_CATEGORIES);
      setReflections(INITIAL_REFLECTIONS);
      setActiveTaskId(null);
      setIsTimerRunning(false);
      localStorage.removeItem(STORAGE_KEYS.TASKS);
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      localStorage.removeItem(STORAGE_KEYS.REFLECTIONS);
      localStorage.removeItem(STORAGE_KEYS.SESSION);
      localStorage.removeItem(STORAGE_KEYS.UI);
    }
  };

  const exportData = () => {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      tasks,
      categories,
      reflections,
      ui: { selectedDate, currentView },
      session: { activeTaskId, activeTimerSeconds, isTimerRunning, lastTickTime: lastTickTimeRef.current },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aura-planner-backup-${getTodayDateString(0)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.tasks && Array.isArray(parsed.tasks)) {
        setTasks(parsed.tasks);
        if (parsed.categories) setCategories(parsed.categories);
        if (parsed.reflections) setReflections(parsed.reflections);
        if (parsed.ui) {
          if (parsed.ui.selectedDate) setSelectedDate(parsed.ui.selectedDate);
          if (parsed.ui.currentView) setCurrentView(parsed.ui.currentView);
        }
        if (parsed.session) {
          setActiveTaskId(parsed.session.activeTaskId || null);
          setActiveTimerSeconds(Number(parsed.session.activeTimerSeconds || 0));
          setIsTimerRunning(Boolean(parsed.session.isTimerRunning));
          lastTickTimeRef.current = typeof parsed.session.lastTickTime === 'number' ? parsed.session.lastTickTime : Date.now();
        }
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // Modal open/close handlers
  const openCreateTaskModal = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const openEditTaskModal = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const openInspirationModal = () => setIsInspirationModalOpen(true);
  const closeInspirationModal = () => setIsInspirationModalOpen(false);
  const openSettingsModal = () => setIsSettingsModalOpen(true);
  const closeSettingsModal = () => setIsSettingsModalOpen(false);

  // Keyboard shortcut: Press 'N' to add new task when not in an input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === 'n' || e.key === 'N') &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        openCreateTaskModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <PlannerContext.Provider
      value={{
        tasks,
        categories,
        reflections,
        selectedDate,
        currentView,
        activeTaskId,
        activeTimerSeconds,
        isTimerRunning,
        isSoundEnabled,
        isTaskModalOpen,
        editingTask,
        isInspirationModalOpen,
        isSettingsModalOpen,

        setSelectedDate,
        setCurrentView,
        addTask,
        updateTask,
        deleteTask,
        startTimer,
        pauseTimer,
        resumeTimer,
        finishTask,
        adjustActualSeconds,
        reorderTasks,
        toggleSubtask,
        saveReflection,
        toggleSound,
        resetToDefaultData,
        exportData,
        importData,

        openCreateTaskModal,
        openEditTaskModal,
        closeTaskModal,
        openInspirationModal,
        closeInspirationModal,
        openSettingsModal,
        closeSettingsModal,

        addCategory,
        updateCategory,

        dayTasks,
        dayStats,
        currentActiveTask,
        currentReflection,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
};

export const usePlanner = () => {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error('usePlanner must be used within a PlannerProvider');
  }
  return context;
};
