import React, { useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { Category } from '../types/planner';
import { CornerFlourish } from '../data/botanicalAssets';
import { X, Plus, Volume2, VolumeX, Download, Upload, RotateCcw, Sliders, Check } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const {
    isSettingsModalOpen,
    closeSettingsModal,
    categories,
    addCategory,
    isSoundEnabled,
    toggleSound,
    resetToDefaultData,
    exportData,
    importData,
  } = usePlanner();

  const [newCatName, setNewCatName] = useState('');
  const [newCatColor, setNewCatColor] = useState('#4A5D4E');
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isSettingsModalOpen) return null;

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      color: newCatColor,
      bgColor: '#F5F2EC',
      borderColor: '#DDD6CB',
      iconName: 'Bookmark',
      isCustom: true,
    };

    addCategory(newCat);
    setNewCatName('');
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const success = importData(importText.trim());
    if (success) {
      setImportStatus('Data successfully restored.');
      setTimeout(() => {
        setImportStatus(null);
        closeSettingsModal();
      }, 1500);
    } else {
      setImportStatus('Invalid JSON format. Please verify file content.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-xl bg-[#FCFAF7] border border-stone-200 rounded-3xl shadow-float p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col">
        <CornerFlourish position="top-right" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/60 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-700">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-semibold text-stone-900">
                Atelier Preferences
              </h2>
              <p className="text-xs text-stone-500">Customize categories, soundscapes, and data</p>
            </div>
          </div>

          <button
            onClick={closeSettingsModal}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto pr-1 flex-1 text-xs">
          
          {/* Soundscapes */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-semibold text-stone-800 block">Singing Bowl Chime</span>
              <p className="text-stone-500 text-[11px]">
                Synthesized 528 Hz harmonic resonance upon task realization
              </p>
            </div>

            <button
              onClick={toggleSound}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-medium transition-colors border ${
                isSoundEnabled
                  ? 'bg-botanical-50 text-botanical-800 border-botanical-300'
                  : 'bg-stone-200 text-stone-500 border-stone-300'
              }`}
            >
              {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{isSoundEnabled ? 'Chimes Active' : 'Muted'}</span>
            </button>
          </div>

          {/* Categories Management */}
          <div className="space-y-3">
            <h3 className="font-semibold text-stone-800 uppercase tracking-wider text-[11px]">
              Categories ({categories.length})
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {categories.map(c => (
                <span
                  key={c.id}
                  className="px-2.5 py-1 rounded-full border text-[11px] font-medium"
                  style={{ backgroundColor: c.bgColor, borderColor: c.borderColor, color: c.color }}
                >
                  {c.name}
                </span>
              ))}
            </div>

            {/* Add custom category */}
            <form onSubmit={handleAddCategory} className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="New category name..."
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-stone-200 focus:outline-none focus:border-botanical-500 text-xs"
              />
              <input
                type="color"
                value={newCatColor}
                onChange={(e) => setNewCatColor(e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border border-stone-200 p-0.5"
                title="Select botanical accent hue"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-stone-800 text-white font-medium hover:bg-stone-900 transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Data Backup & Restore */}
          <div className="space-y-3 pt-3 border-t border-stone-200/60">
            <h3 className="font-semibold text-stone-800 uppercase tracking-wider text-[11px]">
              Data Persistence & Migration
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={exportData}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white border border-stone-200 hover:border-botanical-400 hover:bg-botanical-50/50 text-stone-700 transition-all font-medium"
              >
                <Download className="w-4 h-4 text-botanical-600" />
                <span>Export JSON Backup</span>
              </button>

              <button
                onClick={resetToDefaultData}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white border border-stone-200 hover:border-rose-400 hover:bg-rose-50/50 text-stone-700 transition-all font-medium"
              >
                <RotateCcw className="w-4 h-4 text-rose-600" />
                <span>Reset Sample Data</span>
              </button>
            </div>

            {/* Import JSON Area */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] text-stone-500 block">Restore from JSON backup:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste JSON string here..."
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={handleImport}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 font-medium"
                >
                  Restore
                </button>
              </div>
              {importStatus && (
                <span className="text-[11px] text-botanical-700 font-medium block mt-1">
                  {importStatus}
                </span>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
