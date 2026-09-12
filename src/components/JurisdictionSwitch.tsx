import React from 'react';
import { Globe, Flag, Info, ShieldCheck } from 'lucide-react';
import { LanguageCode, translations } from '../data/translations';

interface JurisdictionSwitchProps {
  currentJurisdiction: 'IN' | 'INTL';
  onChange: (jurisdiction: 'IN' | 'INTL') => void;
  currentLang: LanguageCode;
}

export const JurisdictionSwitch: React.FC<JurisdictionSwitchProps> = ({
  currentJurisdiction,
  onChange,
  currentLang,
}) => {
  const t = translations[currentLang];

  return (
    <div className="w-full bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 sm:p-5 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-ayur-100 text-ayur-800">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
              {t.jurisdictionLabel}
            </h3>
            <p className="text-xs text-slate-500">
              Select statutory domain to filter legal interpretations and compliance standards
            </p>
          </div>
        </div>

        {/* Current Active Badge Display */}
        <div className="inline-flex items-center gap-1.5 self-start sm:self-center">
          <span className="text-xs text-slate-500 font-medium">Currently Routed:</span>
          {currentJurisdiction === 'IN' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              IN • Domestic Indian Law
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              INTL • WIPO & Global Treaties
            </span>
          )}
        </div>
      </div>

      {/* Prominent Two-Way Switch Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 bg-slate-100/90 rounded-xl border border-slate-200">
        {/* India Toggle Button */}
        <button
          type="button"
          onClick={() => onChange('IN')}
          className={`flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
            currentJurisdiction === 'IN'
              ? 'bg-white shadow-md border-2 border-ayur-600 ring-2 ring-ayur-100'
              : 'hover:bg-white/60 text-slate-600 border border-transparent'
          }`}
          aria-pressed={currentJurisdiction === 'IN'}
        >
          <div
            className={`p-2 rounded-lg flex items-center justify-center shrink-0 ${
              currentJurisdiction === 'IN'
                ? 'bg-ayur-700 text-white shadow-xs'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            <Flag className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-bold ${currentJurisdiction === 'IN' ? 'text-ayur-950' : 'text-slate-800'}`}>
                {t.jurisdictionIndia}
              </span>
              <span
                className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                  currentJurisdiction === 'IN'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                Code: IN
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
              {t.jurisdictionIndiaDesc}
            </p>
          </div>
        </button>

        {/* International Toggle Button */}
        <button
          type="button"
          onClick={() => onChange('INTL')}
          className={`flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
            currentJurisdiction === 'INTL'
              ? 'bg-white shadow-md border-2 border-blue-600 ring-2 ring-blue-100'
              : 'hover:bg-white/60 text-slate-600 border border-transparent'
          }`}
          aria-pressed={currentJurisdiction === 'INTL'}
        >
          <div
            className={`p-2 rounded-lg flex items-center justify-center shrink-0 ${
              currentJurisdiction === 'INTL'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            <Globe className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-bold ${currentJurisdiction === 'INTL' ? 'text-blue-950' : 'text-slate-800'}`}>
                {t.jurisdictionIntl}
              </span>
              <span
                className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                  currentJurisdiction === 'INTL'
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                Code: INTL
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
              {t.jurisdictionIntlDesc}
            </p>
          </div>
        </button>
      </div>

      {/* Jurisdiction Guardrail Note */}
      <div className="mt-2.5 flex items-center gap-2 text-[11px] text-slate-500 bg-sand-50 rounded-lg px-3 py-1.5 border border-sand-200">
        <Info className="w-3.5 h-3.5 text-ayur-600 shrink-0" />
        <span>
          <strong>Anti-Conflation Guarantee:</strong> Responses and bare act citations strictly partition Indian domestic provisions (e.g. Section 3(p)) from cross-border treaties (e.g. Nagoya/WIPO).
        </span>
      </div>
    </div>
  );
};
