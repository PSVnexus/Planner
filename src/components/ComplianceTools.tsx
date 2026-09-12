import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  Search, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Building, 
  Globe2,
  HelpCircle
} from 'lucide-react';
import { LanguageCode, translations } from '../data/translations';

interface ComplianceToolsProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'tkdl' | 'abs' | 'registries';
  currentLang: LanguageCode;
}

export const ComplianceTools: React.FC<ComplianceToolsProps> = ({
  isOpen,
  onClose,
  defaultTab = 'tkdl',
  currentLang,
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'tkdl' | 'abs' | 'registries'>(defaultTab);

  // TKDL Search Simulator State
  const [tkdlQuery, setTkdlQuery] = useState('Withania somnifera');
  const [tkdlResult, setTkdlResult] = useState<any>({
    botanicalName: 'Withania somnifera (L.) Dunal',
    sanskritName: 'Ashwagandha (अश्वगन्धा)',
    ipcClass: 'A61K 36/81 (Solanaceae)',
    treatiseSource: 'Charaka Samhita, Chikitsasthana 1.1/41; Bhavaprakasha Nighantu, Haritakyadi Varga 189',
    knownIndications: ['Rasayana (Rejuvenator)', 'Balya (Strength promoter)', 'Nidrajanana (Sedative/Anxiolytic)'],
    defensiveStatus: 'Documented in TKDL since 2001. Successfully cited in 47 third-party observations at EPO & USPTO.',
  });

  // ABS Helper Interactive Decision Tree State
  const [entityType, setEntityType] = useState<'domestic' | 'foreign'>('domestic');
  const [activityType, setActivityType] = useState<'patent' | 'commercial' | 'research'>('patent');
  const [sourceType, setSourceType] = useState<'wild' | 'cultivated'>('cultivated');

  if (!isOpen) return null;

  const handleSimulateTkdl = (botanical: string) => {
    setTkdlQuery(botanical);
    if (botanical.toLowerCase().includes('curcuma') || botanical.toLowerCase().includes('turmeric')) {
      setTkdlResult({
        botanicalName: 'Curcuma longa L.',
        sanskritName: 'Haridra (हरिद्रा)',
        ipcClass: 'A61K 36/9066 (Zingiberaceae)',
        treatiseSource: 'Sushruta Samhita, Sutrasthana 38/27; Ashtanga Hridaya, Uttarasthana 36/12',
        knownIndications: ['Vrana Ropana (Wound healing)', 'Kushthaghna (Dermatological)', 'Pramehahara (Anti-diabetic)'],
        defensiveStatus: 'Famous 1997 USPTO landmark revocation case (US Patent 5,401,504). Fully cataloged in TKDL.',
      });
    } else if (botanical.toLowerCase().includes('terminalia') || botanical.toLowerCase().includes('triphala')) {
      setTkdlResult({
        botanicalName: 'Terminalia chebula Retz. (with T. bellirica & Phyllanthus emblica)',
        sanskritName: 'Triphala (त्रिफला)',
        ipcClass: 'A61K 36/185 (Combretaceae)',
        treatiseSource: 'Charaka Samhita, Sutrasthana 4/16; Sharangadhara Samhita, Madhyama Khanda 6/8',
        knownIndications: ['Chakshushya (Ophthalmic)', 'Deepana-Pachana (Digestive)', 'Rasayana (Longevity)'],
        defensiveStatus: 'Public domain classical formulation. Over 120 prior-art citations issued to international patent examiners.',
      });
    } else {
      setTkdlResult({
        botanicalName: 'Withania somnifera (L.) Dunal',
        sanskritName: 'Ashwagandha (अश्वगन्धा)',
        ipcClass: 'A61K 36/81 (Solanaceae)',
        treatiseSource: 'Charaka Samhita, Chikitsasthana 1.1/41; Bhavaprakasha Nighantu',
        knownIndications: ['Rasayana', 'Balya', 'Medhya'],
        defensiveStatus: 'Active TKDL entry. Barred under Section 3(p) for crude formulations.',
      });
    }
  };

  // Compute ABS Decision Outcome
  const getAbsOutcome = () => {
    if (activityType === 'patent') {
      return {
        form: 'NBA Form III (Application for IPR on Biological Resources)',
        authority: 'National Biodiversity Authority (NBA, Chennai)',
        timeline: 'Mandatory prior approval before sealing/grant of patent (Domestic & Foreign)',
        rate: '0.2% - 0.5% of ex-factory sale price or lump sum royalty sharing',
        isExempt: false,
        note: 'Section 6 of BDA 2002 mandates that Form III approval must be granted before commercial exploitation or patent issuance.',
      };
    }

    if (entityType === 'domestic') {
      if (sourceType === 'cultivated') {
        return {
          form: 'Self-Declaration / SBB Intimation (Simplified)',
          authority: 'State Biodiversity Board (SBB)',
          timeline: 'Prior intimation before commercial manufacturing',
          rate: 'Exempt or nominal (under 2023 Amendment for cultivated NTAC medicinal plants)',
          isExempt: true,
          note: 'Biological Diversity (Amendment) Act 2023 exempts cultivated medicinal herbs traded as commodities (NTAC list) from onerous ABS fees.',
        };
      } else {
        return {
          form: 'SBB Form 1 / Prior Intimation under Section 7',
          authority: 'Respective State Biodiversity Board (SBB)',
          timeline: 'Prior intimation mandatory',
          rate: '0.1% to 0.5% of annual gross ex-factory price',
          isExempt: false,
          note: 'Wild collection from reserve forests or community lands requires consultation with local Biodiversity Management Committees (BMCs).',
        };
      }
    } else {
      // Foreign entity
      return {
        form: 'NBA Form I (Application for Access to Biological Resources)',
        authority: 'National Biodiversity Authority (NBA, Chennai)',
        timeline: 'Mandatory prior approval before procurement or commercial use',
        rate: '1% to 3% of purchase price or 0.1% - 0.5% of turnover',
        isExempt: false,
        note: 'Section 3 of BDA 2002 strictly bars non-citizens or foreign-controlled entities from obtaining Indian bio-resources without prior NBA approval.',
      };
    }
  };

  const absOutcome = getAbsOutcome();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-ayur-800 text-white">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                AYUSH IP & Regulatory Toolkits
              </h3>
              <p className="text-xs text-slate-500">
                Quick-access utilities for prior-art searching, biodiversity compliance, and official registries
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 text-base font-bold"
          >
            ✕
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 mt-4 shrink-0 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('tkdl')}
            className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'tkdl'
                ? 'border-ayur-700 text-ayur-900 bg-ayur-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-ayur-600" />
            <span>TKDL Prior-Art Search</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('abs')}
            className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'abs'
                ? 'border-ayur-700 text-ayur-900 bg-ayur-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-saffron-600" />
            <span>ABS Compliance Helper</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('registries')}
            className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'registries'
                ? 'border-ayur-700 text-ayur-900 bg-ayur-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-blue-600" />
            <span>Official Registries</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 text-slate-700 text-xs sm:text-sm">
          {/* TAB 1: TKDL PRIOR-ART SEARCH */}
          {activeTab === 'tkdl' && (
            <div className="space-y-4">
              <div className="bg-sand-50 p-3.5 rounded-xl border border-sand-200">
                <h4 className="font-bold text-slate-900 text-xs mb-1 flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-ayur-700" />
                  <span>Simulated Traditional Knowledge Digital Library (TKDL) Explorer</span>
                </h4>
                <p className="text-xs text-slate-600">
                  Search through 450,000+ codified Ayurvedic formulations across ancient Sanskrit treatises to inspect prior-art classifications used by global patent examiners.
                </p>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="text-[11px] font-semibold text-slate-500 self-center">Try:</span>
                  {['Withania somnifera (Ashwagandha)', 'Curcuma longa (Turmeric)', 'Terminalia chebula (Triphala)'].map(
                    (herb) => (
                      <button
                        key={herb}
                        type="button"
                        onClick={() => handleSimulateTkdl(herb)}
                        className="px-2.5 py-1 text-xs rounded-full bg-white hover:bg-ayur-100 text-ayur-900 border border-slate-300 font-medium transition-colors"
                      >
                        {herb}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Simulation Result Card */}
              {tkdlResult && (
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-2.5">
                    <div>
                      <h5 className="font-bold text-base text-slate-900 font-serif">
                        {tkdlResult.sanskritName}
                      </h5>
                      <span className="font-mono text-xs italic text-slate-600">
                        {tkdlResult.botanicalName}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-ayur-800 bg-ayur-100 px-2.5 py-1 rounded-md border border-ayur-200">
                      IPC: {tkdlResult.ipcClass}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-900 block mb-1">
                        Codified Treatise Citations:
                      </span>
                      <p className="text-slate-700 leading-relaxed font-serif text-[12px]">
                        {tkdlResult.treatiseSource}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-900 block mb-1">
                        Classical Therapeutic Actions:
                      </span>
                      <ul className="list-disc list-inside text-slate-700 space-y-0.5">
                        {tkdlResult.knownIndications.map((ind: string, i: number) => (
                          <li key={i}>{ind}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-emerald-50/80 p-3 rounded-lg border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>Defensive IP Status:</strong> {tkdlResult.defensiveStatus}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ABS COMPLIANCE HELPER */}
          {activeTab === 'abs' && (
            <div className="space-y-4">
              <div className="bg-sand-50 p-3 rounded-xl border border-sand-200 text-xs">
                <strong>Biological Diversity Act (BDA) Decision Matrix:</strong> Complete this 3-question assessment to determine your exact NBA approval path and mandatory benefit-sharing levies.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* Question 1: Entity */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <label className="font-bold text-slate-900 block mb-1.5">
                    1. Applicant Entity Type
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="entity"
                        checked={entityType === 'domestic'}
                        onChange={() => setEntityType('domestic')}
                        className="text-ayur-700 focus:ring-ayur-600"
                      />
                      <span>Indian Citizen / Domestic MSME</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="entity"
                        checked={entityType === 'foreign'}
                        onChange={() => setEntityType('foreign')}
                        className="text-ayur-700 focus:ring-ayur-600"
                      />
                      <span>Foreign National / Foreign Shareholding</span>
                    </label>
                  </div>
                </div>

                {/* Question 2: Purpose */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <label className="font-bold text-slate-900 block mb-1.5">
                    2. Intended Activity
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="activity"
                        checked={activityType === 'patent'}
                        onChange={() => setActivityType('patent')}
                        className="text-ayur-700 focus:ring-ayur-600"
                      />
                      <span>Applying for Patent / IPR (Sec 6)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="activity"
                        checked={activityType === 'commercial'}
                        onChange={() => setActivityType('commercial')}
                        className="text-ayur-700 focus:ring-ayur-600"
                      />
                      <span>Commercial Manufacturing / Sales</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="activity"
                        checked={activityType === 'research'}
                        onChange={() => setActivityType('research')}
                        className="text-ayur-700 focus:ring-ayur-600"
                      />
                      <span>Pure Academic / R&D Study</span>
                    </label>
                  </div>
                </div>

                {/* Question 3: Source */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <label className="font-bold text-slate-900 block mb-1.5">
                    3. Botanical Raw Material Source
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="source"
                        checked={sourceType === 'cultivated'}
                        onChange={() => setSourceType('cultivated')}
                        className="text-ayur-700 focus:ring-ayur-600"
                      />
                      <span>Cultivated / Agro-Farmed (NTAC)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="source"
                        checked={sourceType === 'wild'}
                        onChange={() => setSourceType('wild')}
                        className="text-ayur-700 focus:ring-ayur-600"
                      />
                      <span>Wild Forest Collection</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Assessment Diagnosis Card */}
              <div className="bg-white rounded-xl border-2 border-ayur-600 p-4 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Statutory Compliance Diagnosis
                  </span>
                  {absOutcome.isExempt ? (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Simplified / Low-Levy Track
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      Mandatory Prior Approval Track
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="font-semibold text-slate-600">Required Application Form:</span>{' '}
                    <span className="font-mono font-bold text-ayur-900 text-sm block sm:inline">
                      {absOutcome.form}
                    </span>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-600">Designated Regulatory Authority:</span>{' '}
                    <span className="text-slate-800 font-medium">{absOutcome.authority}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-600">Statutory Timeline:</span>{' '}
                    <span className="text-slate-800">{absOutcome.timeline}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-600">Benefit Sharing Obligation:</span>{' '}
                    <span className="text-amber-900 font-bold">{absOutcome.rate}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded text-[11px] text-slate-600 mt-2 border border-slate-200">
                  ℹ️ <strong>Legal Analysis:</strong> {absOutcome.note}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REGISTRY LINKS */}
          {activeTab === 'registries' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                Official regulatory portals and bare act repositories for IP and AYUSH compliance filings:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Registry 1 */}
                <a
                  href="https://ipindia.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-slate-50 hover:bg-ayur-50/70 border border-slate-200 hover:border-ayur-300 rounded-xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between font-bold text-slate-900 text-xs group-hover:text-ayur-900">
                      <span>Intellectual Property India (IP India)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-ayur-700" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Patent Office & Trade Marks Registry public search portal. Check Class 5 trademarks and patent status.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-ayur-700 mt-2 block">ipindia.gov.in</span>
                </a>

                {/* Registry 2 */}
                <a
                  href="http://nbaindia.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-slate-50 hover:bg-ayur-50/70 border border-slate-200 hover:border-ayur-300 rounded-xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between font-bold text-slate-900 text-xs group-hover:text-ayur-900">
                      <span>National Biodiversity Authority (NBA)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-ayur-700" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Access and Benefit Sharing portal. File Form I (Access) and Form III (Patent IPR approvals).
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-ayur-700 mt-2 block">nbaindia.org</span>
                </a>

                {/* Registry 3 */}
                <a
                  href="https://foscos.fssai.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-slate-50 hover:bg-ayur-50/70 border border-slate-200 hover:border-ayur-300 rounded-xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between font-bold text-slate-900 text-xs group-hover:text-ayur-900">
                      <span>FSSAI FoSCoS (Ayurveda Aahar)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-ayur-700" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Food Safety and Standards portal for licensing Ayurvedic food supplements & nutraceuticals.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-ayur-700 mt-2 block">foscos.fssai.gov.in</span>
                </a>

                {/* Registry 4 */}
                <a
                  href="https://patentscope.wipo.int"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-slate-50 hover:bg-ayur-50/70 border border-slate-200 hover:border-ayur-300 rounded-xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between font-bold text-slate-900 text-xs group-hover:text-ayur-900">
                      <span>WIPO PATENTSCOPE</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-ayur-700" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      International Patent System (PCT) search covering 110M+ patent documents with genetic resource queries.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-blue-700 mt-2 block">patentscope.wipo.int</span>
                </a>

                {/* Registry 5 */}
                <a
                  href="https://search.ipindia.gov.in/GIRPublic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-slate-50 hover:bg-ayur-50/70 border border-slate-200 hover:border-ayur-300 rounded-xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between font-bold text-slate-900 text-xs group-hover:text-ayur-900">
                      <span>Geographical Indications Registry</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-ayur-700" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Official GI Registry Chennai portal for inspecting authorized users and traditional botanical territory claims.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-ayur-700 mt-2 block">search.ipindia.gov.in/GIRPublic</span>
                </a>

                {/* Registry 6 */}
                <a
                  href="https://www.tkdl.res.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-slate-50 hover:bg-ayur-50/70 border border-slate-200 hover:border-ayur-300 rounded-xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between font-bold text-slate-900 text-xs group-hover:text-ayur-900">
                      <span>Traditional Knowledge Digital Library</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-ayur-700" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Official portal of CSIR-TKDL detailing access guidelines and international patent office partnerships.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-ayur-700 mt-2 block">tkdl.res.in</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Provided for AYUSH MSMEs and Institutional Innovators</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
