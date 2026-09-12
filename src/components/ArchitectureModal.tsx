import React, { useState } from 'react';
import { 
  Cpu, 
  Database, 
  Layers, 
  ShieldCheck, 
  Compass, 
  FileCode, 
  Lock, 
  Users, 
  CheckCircle,
  ExternalLink,
  BookOpen,
  ArrowDown
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'layers' | 'guardrails' | 'dpdp'>('flow');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-6 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-ayur-900 text-emerald-300 shadow-md">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                  IP-SAKTI Production RAG Architecture
                </h2>
                <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  Target Spec v2.0
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                Full-stack blueprint: Curated statutory corpus, dual-gate jurisdiction routing, and hallucination guardrails
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 rounded-lg hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mt-4 shrink-0 overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('flow')}
            className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'flow'
                ? 'border-ayur-700 text-ayur-900 bg-ayur-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>End-to-End Pipeline</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('layers')}
            className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'layers'
                ? 'border-ayur-700 text-ayur-900 bg-ayur-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Curated Bare Act Corpus</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guardrails')}
            className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'guardrails'
                ? 'border-ayur-700 text-ayur-900 bg-ayur-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Safe Abstention & Section 3(p) Guardrail</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dpdp')}
            className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'dpdp'
                ? 'border-ayur-700 text-ayur-900 bg-ayur-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>DPDP Act 2023 & Trade Secret Vault</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 text-slate-700 text-xs sm:text-sm">
          {activeTab === 'flow' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900 text-xs">
                <strong>Judges Briefing:</strong> This demo app serves as the complete UX, client validation, and keyword-guided prototype. The production system implements the following 6-stage RAG inference pipeline.
              </div>

              {/* Interactive Pipeline Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Step 1 */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-ayur-800 text-emerald-300 text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-400">Ingestion</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs mb-1">Curated Bare Act Parsing</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Official gazetted XML/PDF bare acts (Patents Act 1970, Drugs & Cosmetics 1940, BDA 2002/2023, WIPO treaties) chunked strictly by Section, Rule, and Schedule to preserve statutory sanctity.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-ayur-800 text-emerald-300 text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-400">Routing</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs mb-1">Dual-Gate Jurisdiction Router</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Explicit UI switch + LLM classifier separates domestic Indian statutes (Section 3(p), Rule 158-B) from cross-border treaties (Nagoya Protocol, WIPO GRATK Treaty 2024).
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-ayur-800 text-emerald-300 text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-400">Retrieval</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs mb-1">Hybrid Dense + BM25 Search</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Combines lexical BM25 matching (for exact statutory section references like "Section 3(e)") with dense semantic embeddings (BGE-M3 / IndicBERT) reranked via Cohere Rerank.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-amber-700 text-amber-100 text-xs font-bold flex items-center justify-center">
                      4
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-400">Guardrail</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs mb-1">AyushGuardrail Hallucination Filter</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Deterministic verification layer: if top-k statutory confidence &lt; 85%, the engine executes <em>Safe Abstention</em> to eliminate hallucinated legal advice.
                  </p>
                </div>

                {/* Step 5 */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-amber-700 text-amber-100 text-xs font-bold flex items-center justify-center">
                      5
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-400">Localization</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs mb-1">Bhashini Multilingual Pipeline</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    National Bhashini AI engine performs bidirectional Indic translation across 22 scheduled languages while preserving exact statutory terminology in legal citations.
                  </p>
                </div>

                {/* Step 6 */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold flex items-center justify-center">
                      6
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-400">Escalation</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs mb-1">Human-in-the-Loop Handover</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Automated ticket generation dispatching complex patentability assessments to TIFAC Patent Facilitation Centre (PFC) and empaneled patent attorneys.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'layers' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                Authoritative Legal Corpus Ingestion (Ground Truth)
              </h4>
              <p className="text-xs text-slate-600">
                Unlike generic LLMs trained on internet scraping, IP-SAKTI indexes verified legal Bare Acts and administrative gazette notifications directly:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="font-bold text-ayur-900 mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-ayur-700" />
                    <span>Domestic Indian Corpus (IN)</span>
                  </div>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li>The Patents Act, 1970 (amended 2005 & Rules 2024)</li>
                    <li>Drugs and Cosmetics Act, 1940 (Rule 158-B, First Schedule)</li>
                    <li>Biological Diversity Act, 2002 & Amendment Act, 2023</li>
                    <li>FSSAI (Ayurveda Aahar) Regulations, 2022</li>
                    <li>Trade Marks Act, 1999 & GI of Goods Act, 1999</li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-700" />
                    <span>International Treaties Corpus (INTL)</span>
                  </div>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li>WIPO Treaty on IP, GR and ATK (GRATK 2024)</li>
                    <li>Nagoya Protocol on Access and Benefit-Sharing (ABS)</li>
                    <li>WTO TRIPS Agreement (Art. 27.3(b), Art. 29)</li>
                    <li>CSIR TKDL International Access Protocols (EPO, USPTO)</li>
                    <li>EU Due Diligence Regulation (EU) 511/2014</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'guardrails' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                Safe Abstention & Hallucination Defense Protocol
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                In legal compliance for medicines, a false positive or hallucinated patent advice can lead to commercial failure or criminal penalties under the Biological Diversity Act. IP-SAKTI incorporates two distinct deterministic guardrails:
              </p>

              <div className="space-y-2.5 mt-2">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                  <div className="font-bold text-emerald-900 mb-1">
                    1. Section 3(p) Traditional Knowledge Deterministic Veto
                  </div>
                  <p className="text-emerald-800 leading-relaxed">
                    Whenever an innovator enters a classical combination (e.g. Triphala churna, Sitopaladi, Chyawanprash), the rule engine intercepts the query and automatically triggers the absolute patent bar notification before any creative text generation occurs.
                  </p>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs">
                  <div className="font-bold text-amber-900 mb-1">
                    2. Graceful Safe Abstention on Low Confidence
                  </div>
                  <p className="text-amber-800 leading-relaxed">
                    If the retrieved Bare Act chunks fail semantic alignment verification (&lt; 0.82 cosine similarity score), the model refuses to answer and outputs the standardized Safe Abstention card with direct human escalation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dpdp' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                Digital Personal Data Protection (DPDP) Act 2023 Compliance
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ayurvedic innovators frequently possess confidential trade secrets, novel extraction ratios, and proprietary clinical recipes. IP-SAKTI adheres to zero-retention principles:
              </p>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-800 font-semibold">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Ephemeral Inference: Prompt payloads are destroyed immediately after retrieval.</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800 font-semibold">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>No Model Retraining: Formulation inputs are never used to train public LLM weights.</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800 font-semibold">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Encrypted Facilitation Handoff: Escalated tickets utilize AES-256 encrypted relay.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Developed for AYUSH Hackathons & Patent Facilitation Cells</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-ayur-900 hover:bg-ayur-950 text-white font-bold rounded-xl"
          >
            Close Architecture View
          </button>
        </div>
      </div>
    </div>
  );
};
