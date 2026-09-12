import React, { useState } from 'react';
import { 
  ScrollText, 
  FlaskConical, 
  Sparkles, 
  Microscope, 
  Salad, 
  Sparkle, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  ShieldAlert, 
  Scale, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { formulationCategories, FormulationCategory } from '../data/classifierData';
import { LanguageCode, translations } from '../data/translations';

interface FormulationClassifierProps {
  currentLang: LanguageCode;
  onSelectCategoryForChat?: (query: string) => void;
}

export const FormulationClassifier: React.FC<FormulationClassifierProps> = ({
  currentLang,
  onSelectCategoryForChat,
}) => {
  const [selectedId, setSelectedId] = useState<string>('classical');
  const t = translations[currentLang];

  const selectedCategory: FormulationCategory = 
    formulationCategories.find((c) => c.id === selectedId) || formulationCategories[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ScrollText': return <ScrollText className="w-5 h-5" />;
      case 'FlaskConical': return <FlaskConical className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Microscope': return <Microscope className="w-5 h-5" />;
      case 'Salad': return <Salad className="w-5 h-5" />;
      case 'Sparkle': return <Sparkle className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getSection3pBadge = (status: FormulationCategory['ipPosture']['section3pStatus']) => {
    switch (status) {
      case 'Absolute Bar':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            Section 3(p): Absolute Bar
          </span>
        );
      case 'Conditional / Novel Delivery Only':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Scale className="w-3.5 h-3.5" />
            Section 3(p): Conditional Bar
          </span>
        );
      case 'Full Patentability':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Section 3(p): Eligible for Patent
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-xs border border-slate-200 p-4 sm:p-6 mb-6">
      {/* Questionnaire Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-ayur-700 text-white text-xs font-bold">
              3
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
              {t.classifierTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {t.classifierSubtitle}
          </p>
        </div>
        <div className="text-xs text-ayur-800 bg-ayur-50 border border-ayur-200/70 px-2.5 py-1 rounded-lg self-start flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-ayur-600" />
          <span>Rule 158-B & BDA Decision Engine</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          {t.classifierSelectPrompt}
        </label>

        {/* 6 Category Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
          {formulationCategories.map((cat) => {
            const isSelected = cat.id === selectedId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedId(cat.id)}
                className={`flex flex-col items-start p-3 rounded-xl text-left border transition-all duration-150 ${
                  isSelected
                    ? 'bg-ayur-900 text-white border-ayur-900 shadow-sm ring-2 ring-ayur-600/30'
                    : 'bg-slate-50 hover:bg-ayur-50/70 text-slate-700 border-slate-200 hover:border-ayur-300'
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg mb-2 ${
                    isSelected ? 'bg-ayur-800 text-emerald-300' : 'bg-white text-ayur-700 shadow-2xs border border-slate-200'
                  }`}
                >
                  {getIcon(cat.iconName)}
                </div>
                <span className={`text-xs font-bold leading-tight line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {cat.nameEn}
                </span>
                <span className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-ayur-200' : 'text-slate-500'}`}>
                  {cat.nameHi}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Category Deep Dive Explainer Card */}
      <div className="bg-gradient-to-br from-sand-50 to-white rounded-xl border border-ayur-200/80 p-4 sm:p-5 shadow-inner">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-ayur-100 text-ayur-800 border border-ayur-200 shrink-0">
              {getIcon(selectedCategory.iconName)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  {selectedCategory.nameEn} ({selectedCategory.nameHi})
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-semibold">
                  CLASS: {selectedCategory.code}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                {selectedCategory.tagline}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            {getSection3pBadge(selectedCategory.ipPosture.section3pStatus)}
            {onSelectCategoryForChat && (
              <button
                type="button"
                onClick={() =>
                  onSelectCategoryForChat(
                    `What are the exact IP and regulatory rules for ${selectedCategory.nameEn}?`
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-ayur-900 bg-ayur-100 hover:bg-ayur-200 border border-ayur-300 rounded-lg transition-colors"
              >
                <span>Ask in Chat</span>
                <ArrowRight className="w-3.5 h-3.5 text-ayur-700" />
              </button>
            )}
          </div>
        </div>

        {/* 3 Structured Columns: Requirements, IP Posture, ABS Posture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
          {/* Column 1: Regulatory & Clinical Requirements */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-2 pb-1 border-b border-slate-100">
                <FileText className="w-4 h-4 text-ayur-600" />
                <span>{t.categoryRequirements}</span>
              </div>
              <div className="text-[11px] text-ayur-900 bg-ayur-50 font-medium px-2 py-1 rounded mb-2.5 border border-ayur-200/60">
                <strong>Statutory Basis:</strong> {selectedCategory.statutoryBasis}
              </div>
              <ul className="space-y-1.5 text-slate-600 text-xs list-disc list-inside">
                {selectedCategory.regulatoryRequirements.map((req, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <strong>Examples:</strong> {selectedCategory.examples.join(', ')}
            </div>
          </div>

          {/* Column 2: IP Posture & Patent Eligibility */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-2 pb-1 border-b border-slate-100">
                <Scale className="w-4 h-4 text-amber-600" />
                <span>{t.ipPosture}</span>
              </div>
              <p className="text-slate-700 mb-2.5 leading-relaxed">
                {selectedCategory.ipPosture.patentability}
              </p>
              <div className="bg-sand-50 p-2 rounded border border-sand-200 text-slate-600 mb-2">
                <strong className="text-slate-900">Trademark Guidance:</strong>{' '}
                {selectedCategory.ipPosture.trademarkRules}
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-amber-900 bg-amber-50/70 p-2 rounded border border-amber-200/60">
              💡 <strong>Strategy Tip:</strong> {selectedCategory.ipPosture.keyTip}
            </div>
          </div>

          {/* Column 3: Biological Diversity & ABS Posture */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-2 pb-1 border-b border-slate-100">
                <ShieldAlert className="w-4 h-4 text-emerald-700" />
                <span>{t.absPosture}</span>
              </div>
              <p className="text-slate-700 mb-2.5 leading-relaxed">
                {selectedCategory.absPosture.nbaApproval}
              </p>
              <div className="space-y-1.5 bg-slate-50 p-2.5 rounded border border-slate-200">
                <div>
                  <span className="font-semibold text-slate-800">Mandatory Filing:</span>{' '}
                  <span className="font-mono text-ayur-800 font-bold">
                    {selectedCategory.absPosture.formRequired}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-slate-800">Benefit Sharing Rate:</span>{' '}
                  <span className="text-slate-700">
                    {selectedCategory.absPosture.benefitSharingRate}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded border border-emerald-200/50">
              🌿 <strong>Biodiversity Act:</strong> Prior intimation to SBB / NBA Form III must precede any patent grant.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
