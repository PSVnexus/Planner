import React from 'react';
import { PlannerProvider, usePlanner } from './context/PlannerContext';
import { Header } from './components/Header';
import { DashboardMetrics } from './components/DashboardMetrics';
import { TaskPlanner } from './components/TaskPlanner';
import { StaircaseTimeline } from './components/StaircaseTimeline';
import { TimeAnalytics } from './components/TimeAnalytics';
import { DailyReflection } from './components/DailyReflection';
import { HistoryView } from './components/HistoryView';
import { TaskModal } from './components/TaskModal';
import { InspirationModal } from './components/InspirationModal';
import { SettingsModal } from './components/SettingsModal';
import { BotanicalBranch, BotanicalDivider, PerchedBird, FlyingBird } from './data/botanicalAssets';

const PlannerContent: React.FC = () => {
  const { currentView } = usePlanner();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* 1. Sticky Luxury Navigation & Live Timer Header */}
      <Header />

      {/* 2. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentView === 'today' && (
          <div className="space-y-10">
            {/* Dashboard Hero & Key Metrics */}
            <DashboardMetrics />

            {/* Visual Botanical Section Divider */}
            <BotanicalDivider />

            {/* Dual Grid: Task Planner & Architectural Staircase Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <TaskPlanner />
              </div>

              <div className="lg:col-span-5 space-y-6">
                <StaircaseTimeline />
              </div>
            </div>

            {/* Visual Botanical Section Divider */}
            <BotanicalDivider />

            {/* "Where My Time Went" Quick Insights */}
            <TimeAnalytics />

            {/* Visual Botanical Section Divider */}
            <BotanicalDivider />

            {/* Daily Evening Reflection Journal: "How did today feel?" */}
            <DailyReflection />
          </div>
        )}

        {currentView === 'planner' && (
          <div className="space-y-8">
            <TaskPlanner />
          </div>
        )}

        {currentView === 'timeline' && (
          <div className="space-y-8">
            <StaircaseTimeline />
          </div>
        )}

        {currentView === 'analytics' && (
          <div className="space-y-8">
            <TimeAnalytics />
          </div>
        )}

        {currentView === 'history' && (
          <div className="space-y-8">
            <HistoryView />
          </div>
        )}
      </main>

      {/* 3. Quiet Luxury Editorial Footer */}
      <footer className="mt-16 border-t border-stone-200/80 bg-[#FCFAF7]/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-stone-500">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-botanical-50 border border-botanical-200 flex items-center justify-center text-botanical-700">
              <PerchedBird className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-base font-semibold text-stone-800 block">
                AURA · Atelier of Time
              </span>
              <span className="font-serif italic text-stone-400">
                Inspired by classical botanical chinoiserie and sculptural stone architecture.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 font-serif italic text-stone-400">
            <span>“Calm is the cradle of power.”</span>
            <span className="text-stone-300">·</span>
            <span>Handcrafted for conscious daily rhythms.</span>
          </div>

        </div>
      </footer>

      {/* 4. Modals */}
      <TaskModal />
      <InspirationModal />
      <SettingsModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PlannerProvider>
      <PlannerContent />
    </PlannerProvider>
  );
};

export default App;
