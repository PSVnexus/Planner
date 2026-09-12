import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Scale, 
  HelpCircle, 
  FileText, 
  ArrowRight, 
  Printer, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { LanguageCode, translations } from '../data/translations';

interface PatentRiskEvaluatorProps {
  currentLang: LanguageCode;
  onEscalate: (context: string) => void;
}

export const PatentRiskEvaluator: React.FC<PatentRiskEvaluatorProps> = ({
  currentLang,
  onEscalate,
}) => {
  const t = translations[currentLang];

  // Assessment answers state
  const [ingredientOrigin, setIngredientOrigin] = useState<'traditional' | 'novel_wild' | 'isolated'>('traditional');
  const [extractionLevel, setExtractionLevel] = useState<'crude' | 'standardized' | 'nano_novel'>('crude');
  const [synergyEvidence, setSynergyEvidence] = useState<'none' | 'literature' | 'validated_trials'>('none');
  const [deliverySystem, setDeliverySystem] = useState<'classical' | 'modified_release' | 'nanocarrier'>('classical');

  // Compute risk score (0 to 100, where 100 = highest risk of Section 3(p) patent rejection)
  const computeRisk = () => {
    let score = 100;

    // Ingredient deduction
    if (ingredientOrigin === 'novel_wild') score -= 25;
    if (ingredientOrigin === 'isolated') score -= 35;

    // Extraction deduction
    if (extractionLevel === 'standardized') score -= 20;
    if (extractionLevel === 'nano_novel') score -= 35;

    // Synergy deduction
    if (synergyEvidence === 'literature') score -= 10;
    if (synergyEvidence === 'validated_trials') score -= 30;

    // Delivery system deduction
    if (deliverySystem === 'modified_release') score -= 15;
    if (deliverySystem === 'nanocarrier') score -= 30;

    return Math.max(10, Math.min(98, score));
  };

  const riskScore = computeRisk();

  const getRiskCategory = (score: number) => {
    if (score >= 70) {
      return {
        level: 'High Section 3(p) Rejection Risk',
        color: 'text-red-700 bg-red-100 border-red-300',
        barColor: 'bg-red-600',
        summary: 'Under Section 3(p) of the Patents Act, 1970, this invention will face an immediate absolute statutory bar as a duplication or mere aggregation of traditional Ayurvedic knowledge.',
        recommendation: 'Pivot your IP strategy: Protect brand equity via Trademark (Class 5), proprietary manufacturing know-how as Trade Secrets, and publish defensively in TKDL.',
      };
    } else if (score >= 40) {
      return {
        level: 'Moderate Section 3(e) Admixture Risk',
        color: 'text-amber-800 bg-amber-100 border-amber-300',
        barColor: 'bg-amber-500',
        summary: 'Eligible for examination, but the Patent Office will issue a First Examination Report (FER) objection under Section 3(e) (mere admixture) and Section 3(p).',
        recommendation: 'Generate statistically validated comparative synergy data (e.g. isobologram or Chou-Talalay Combination Index < 0.8) proving unexpected therapeutic enhancement over individual ingredients.',
      };
    } else {
      return {
        level: 'Low Risk • High Patent Eligibility Track',
        color: 'text-emerald-800 bg-emerald-100 border-emerald-300',
        barColor: 'bg-emerald-600',
        summary: 'Strong prima facie technical character. The invention incorporates standardized bioactive fractions, novel delivery vehicles, or proven synergistic enhancements overcoming Section 3(p).',
        recommendation: 'Draft claims focused on the specific extraction methodology, quantitative biomarker fingerprint, and novel carrier matrix. Concurrently file NBA Form III before requesting examination.',
      };
    }
  };

  const currentRisk = getRiskCategory(riskScore);

  const handlePrintDossier = () => {
    window.print();
  };

  const handleReset = () => {
    setIngredientOrigin('traditional');
    setExtractionLevel('crude');
    setSynergyEvidence('none');
    setDeliverySystem('classical');
  };

  return (
    <section className="bg-white rounded-2xl shadow-xs border border-slate-200 p-4 sm:p-6 mb-6">
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                Section 3(p) Patent Bar Risk Calculator
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase font-mono">
                Patents Act 1970
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Interactive diagnostic tool to assess patent rejection probability under Traditional Knowledge statutory bars
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={handlePrintDossier}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-300"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      {/* 4 Diagnostic Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-5">
        {/* Question 1: Ingredient Origin */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <span className="font-bold text-slate-900 block mb-2 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-ayur-800 text-white text-[10px] flex items-center justify-center font-bold">1</span>
            <span>Botanical Ingredient Origin & Prior Codification</span>
          </span>
          <div className="space-y-2">
            <label className="flex items-start gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-ayur-400 transition-colors">
              <input
                type="radio"
                name="ingredient"
                checked={ingredientOrigin === 'traditional'}
                onChange={() => setIngredientOrigin('traditional')}
                className="mt-0.5 text-ayur-700 focus:ring-ayur-600"
              />
              <div>
                <strong className="text-slate-800 block">Codified Traditional Botanical</strong>
                <span className="text-slate-500 text-[11px]">Directly listed in 54 First Schedule texts (e.g. Ashwagandha, Neem, Turmeric, Tulsi).</span>
              </div>
            </label>

            <label className="flex items-start gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-ayur-400 transition-colors">
              <input
                type="radio"
                name="ingredient"
                checked={ingredientOrigin === 'novel_wild'}
                onChange={() => setIngredientOrigin('novel_wild')}
                className="mt-0.5 text-ayur-700 focus:ring-ayur-600"
              />
              <div>
                <strong className="text-slate-800 block">Non-Classical Wild / Rare Botanical</strong>
                <span className="text-slate-500 text-[11px]">Indigenous plant not mentioned in classical treatises; folklore/ethnomedicinal usage.</span>
              </div>
            </label>

            <label className="flex items-start gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-ayur-400 transition-colors">
              <input
                type="radio"
                name="ingredient"
                checked={ingredientOrigin === 'isolated'}
                onChange={() => setIngredientOrigin('isolated')}
                className="mt-0.5 text-ayur-700 focus:ring-ayur-600"
              />
              <div>
                <strong className="text-slate-800 block">Synthetically Modified Bioactive Derivative</strong>
                <span className="text-slate-500 text-[11px]">Semi-synthetic chemical derivative or newly crystallized phytocomplex.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Question 2: Extraction & Processing Level */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <span className="font-bold text-slate-900 block mb-2 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-ayur-800 text-white text-[10px] flex items-center justify-center font-bold">2</span>
            <span>Extraction, Fractionation & Technical Character</span>
          </span>
          <div className="space-y-2">
            <label className="flex items-start gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-ayur-400 transition-colors">
              <input
                type="radio"
                name="extraction"
                checked={extractionLevel === 'crude'}
                onChange={() => setExtractionLevel('crude')}
                className="mt-0.5 text-ayur-700 focus:ring-ayur-600"
              />
              <div>
                <strong className="text-slate-800 block">Crude Powder, Decoction, or Hydroalcoholic Extract</strong>
                <span className="text-slate-500 text-[11px]">Standard traditional extraction with no quantified marker enrichment.</span>
              </div>
            </label>

            <label className="flex items-start gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-ayur-400 transition-colors">
              <input
                type="radio"
                name="extraction"
                checked={extractionLevel === 'standardized'}
                onChange={() => setExtractionLevel('standardized')}
                className="mt-0.5 text-ayur-700 focus:ring-ayur-600"
              />
              <div>
                <strong className="text-slate-800 block">Standardized Fraction (Phytopharmaceutical Grade)</strong>
                <span className="text-slate-500 text-[11px]">Purified fraction with 4+ validated biomarkers quantified via HPLC/HPTLC.</span>
              </div>
            </label>

            <label className="flex items-start gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-ayur-400 transition-colors">
              <input
                type="radio"
                name="extraction"
                checked={extractionLevel === 'nano_novel'}
                onChange={() => setExtractionLevel('nano_novel')}
                className="mt-0.5 text-ayur-700 focus:ring-ayur-600"
              />
              <div>
                <strong className="text-slate-800 block">Novel Extraction Process / Molecular Entrapment</strong>
                <span className="text-slate-500 text-[11px]">Supercritical fluid extraction with patentable operating parameters or stereoselective isolation.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Question 3: Synergy / Pharmacological Evidence */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <span className="font-bold text-slate-900 block mb-2 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-ayur-800 text-white text-[10px] flex items-center justify-center font-bold">3</span>
            <span>Synergy Demonstration (Section 3(e) Bar)</span>
          </span>
          <div className="space-y-2">
            <label className="flex items-start gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-ayur-400 transition-colors">
              <input
                type="radio"
                name="synergy"
                checked={synergyEvidence === 'none'}
                onChange={() => setSynergyEvidence('none')}
                className="mt-0.5 text-ayur-700 focus:ring-ayur-600"
              />
              <div>
                <strong className="text-slate-800 block">No Quantitative Synergy Data</strong>
                <span className="text-slate-500 text-[11px]">Relying on traditional clinical lore and textual quotes without comparative data.</span>
              </div>
            </label>

            <label className="flex items-start gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-ayur-400 transition-colors">
              <input
                type="radio"
                name="synergy"
                checked={synergyEvidence === 'literature'}
                onChange={() => setSynergyEvidence('literature')}
                className="mt-0.5 text-ayur-700 focus:ring-ayur-600"
              />
              <div>
                <strong className="text-slate-800 block">Published Academic Literature References</strong>
                <span className="text-slate-500 text-[11px]">Literature reviews citing third-party general studies on individual components.</span>
              </div>
            </label>

            <label className="flex items-start gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-ayur-400 transition-colors">
              <input
                type="radio"
                name="synergy"
                checked={synergyEvidence === 'validated_trials'}
                onChange={() => setSynergyEvidence('validated_trials')}
                className="mt-0.5 text-ayur-700 focus:ring-ayur-600"
              />
              <div>
                <strong className="text-slate-800 block">Empirical In-Vitro / In-Vivo Synergy Matrices</strong>
                <span className="text-slate-500 text-[11px]">Strict mathematical synergy indices (CI &lt; 0.8) comparing combination vs isolated controls.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Question 4: Delivery System Vehicle */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <span className="font-bold text-slate-900 block mb-2 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-ayur-800 text-white text-[10px] flex items-center justify-center font-bold">4</span>
            <span>Dosage Form & Delivery Technology</span>
          </span>
          <div className="space-y-2">
            <label className="flex items-start gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-ayur-400 transition-colors">
              <input
                type="radio"
                name="delivery"
                checked={deliverySystem === 'classical'}
                onChange={() => setDeliverySystem('classical')}
                className="mt-0.5 text-ayur-700 focus:ring-ayur-600"
              />
              <div>
                <strong className="text-slate-800 block">Classical Dosage Form</strong>
                <span className="text-slate-500 text-[11px]">Vati (tablets), Churna (powders), Asava/Arishta (fermentations), Taila (oils).</span>
              </div>
            </label>

            <label className="flex items-start gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-ayur-400 transition-colors">
              <input
                type="radio"
                name="delivery"
                checked={deliverySystem === 'modified_release'}
                onChange={() => setDeliverySystem('modified_release')}
                className="mt-0.5 text-ayur-700 focus:ring-ayur-600"
              />
              <div>
                <strong className="text-slate-800 block">Modified-Release / Enteric Coated Matrix</strong>
                <span className="text-slate-500 text-[11px]">Gastro-retentive, colon-targeted, or sustained-release polymer matrix.</span>
              </div>
            </label>

            <label className="flex items-start gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-ayur-400 transition-colors">
              <input
                type="radio"
                name="delivery"
                checked={deliverySystem === 'nanocarrier'}
                onChange={() => setDeliverySystem('nanocarrier')}
                className="mt-0.5 text-ayur-700 focus:ring-ayur-600"
              />
              <div>
                <strong className="text-slate-800 block">Nano-Delivery / Phytosome / Liposomal Vehicle</strong>
                <span className="text-slate-500 text-[11px]">Liposomes, nano-emulsions, or phospholipid complex exhibiting 3x+ bioavailability.</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Dynamic Results Dashboard */}
      <div className="bg-gradient-to-br from-sand-50 to-white rounded-xl border border-ayur-200 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3 mb-3">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
              Section 3(p) Statutory Risk Assessment
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-sm sm:text-base font-bold px-2.5 py-0.5 rounded-full border ${currentRisk.color}`}>
                {currentRisk.level}
              </span>
              <span className="font-mono text-xs font-bold text-slate-700">
                Score: {riskScore}/100
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEscalate(`Section 3(p) Risk Assessment (${riskScore}/100) - ${currentRisk.level}`)}
              className="px-3.5 py-1.5 text-xs font-bold text-amber-950 bg-amber-200 hover:bg-amber-300 border border-amber-400 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Consult Patent Attorney</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-900" />
            </button>
          </div>
        </div>

        {/* Visual Score Bar */}
        <div className="mb-3">
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-300 ${currentRisk.barColor}`}
              style={{ width: `${riskScore}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-medium">
            <span>0 (Low Risk • High Patentability)</span>
            <span>50 (FER Section 3(e) Challenge)</span>
            <span>100 (Absolute Bar Sec 3(p))</span>
          </div>
        </div>

        {/* Narrative & Prosecution Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <strong className="text-slate-900 block mb-1">Statutory Impact Analysis:</strong>
            <p className="text-slate-700 leading-relaxed">
              {currentRisk.summary}
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <strong className="text-slate-900 block mb-1">Strategic Prosecution Advice:</strong>
            <p className="text-slate-700 leading-relaxed">
              {currentRisk.recommendation}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
