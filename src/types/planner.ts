export type Priority = 'high' | 'medium' | 'low' | 'gentle';

export type TaskStatus = 'not_started' | 'in_progress' | 'completed';

export interface Category {
  id: string;
  name: string;
  color: string;       // main text/accent color
  bgColor: string;     // subtle background color
  borderColor: string; // border outline
  iconName: string;
  isCustom?: boolean;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  categoryId: string;
  priority: Priority;
  plannedStartTime: string; // "HH:mm" (24h)
  plannedEndTime: string;   // "HH:mm" (24h)
  estimatedMinutes: number; // in minutes
  actualDurationSeconds: number; // in seconds
  status: TaskStatus;
  notes: string;
  subtasks: Subtask[];
  order: number;
  createdAt: string;
  completedAt?: string;
}

export interface DailyReflection {
  date: string; // YYYY-MM-DD
  mood: 'peaceful' | 'focused' | 'centered' | 'gentle' | 'restorative' | 'tiring';
  whatWentWell: string;
  tookLonger: string;
  changeTomorrow: string;
  gratitude: string;
  savedAt: string;
}

export interface DayStats {
  totalPlannedMinutes: number;
  totalActualMinutes: number;
  completedCount: number;
  totalCount: number;
  remainingAvailableMinutes: number;
  focusMinutes: number;
  unplannedMinutes: number;
  categoryBreakdown: {
    categoryId: string;
    categoryName: string;
    color: string;
    plannedMinutes: number;
    actualMinutes: number;
  }[];
}

export type ViewMode = 'today' | 'planner' | 'timeline' | 'analytics' | 'history' | 'settings';
