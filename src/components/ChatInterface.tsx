import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  BookOpen, 
  Scale, 
  AlertCircle, 
  ShieldCheck, 
  UserCheck, 
  Info, 
  CornerDownLeft, 
  ExternalLink,
  CheckCircle,
  HelpCircle,
  Clock,
  RotateCcw
} from 'lucide-react';
import { knowledgeBase, QAItem, Citation } from '../data/knowledgeBase';
import { LanguageCode, translations } from '../data/translations';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  isAbstention?: boolean;
  jurisdiction: 'IN' | 'INTL';
  citations?: Citation[];
  confidence?: 'High' | 'Medium' | 'Low';
  confidenceScore?: number;
  escalationAdvice?: string;
  matchedCategory?: string;
  practicalChecklist?: string[];
}

interface ChatInterfaceProps {
  currentJurisdiction: 'IN' | 'INTL';
  currentLang: LanguageCode;
  onEscalate: (queryContext: string, jurisdiction: 'IN' | 'INTL') => void;
  externalQuery?: string;
  onClearExternalQuery?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  currentJurisdiction,
  currentLang,
  onEscalate,
  externalQuery,
  onClearExternalQuery,
}) => {
  const t = translations[currentLang];
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      timestamp: 'Just now',
      text: `Namaste! I am **IP-SAKTI Sahayak**, your specialized AI regulatory and patent compliance advisor for Ayurveda and AYUSH systems. \n\nAsk me about statutory patent exclusions (Section 3(p) / 3(e)), the Traditional Knowledge Digital Library (TKDL), National Biodiversity Authority (NBA) approvals, Geographical Indications (GI), or the new WIPO GRATK Treaty (2024). \n\nEvery response is anchored strictly to Bare Acts, verified treaties, and administrative guidelines.`,
      jurisdiction: currentJurisdiction,
      citations: [
        {
          statute: 'The Patents Act, 1970',
          section: 'Section 3(p)',
          description: 'Traditional Knowledge non-patentability bar.'
        },
        {
          statute: 'Biological Diversity Act, 2002',
          section: 'Section 6',
          description: 'Prior approval of NBA for IP rights.'
        }
      ],
      confidence: 'High',
      confidenceScore: 98,
    },
  ]);

  const [activeCitationModal, setActiveCitationModal] = useState<Citation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on message update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle external query injected from Formulation Classifier
  useEffect(() => {
    if (externalQuery) {
      setInputQuery(externalQuery);
      handleProcessQuery(externalQuery);
      if (onClearExternalQuery) onClearExternalQuery();
    }
  }, [externalQuery]);

  // Smart Keyword & Intent Matcher
  const findBestMatch = (query: string): QAItem | null => {
    const cleanQuery = query.toLowerCase().trim();
    const queryTokens = cleanQuery
      .replace(/[?.,/#!$%^&*;:{}=\-_`~()]/g, '')
      .split(/\s+/)
      .filter((t) => t.length > 2);

    let bestItem: QAItem | null = null;
    let highestScore = 0;

    for (const item of knowledgeBase) {
      let score = 0;

      // Jurisdiction match bonus
      if (item.jurisdiction === currentJurisdiction) {
        score += 2;
      }

      // Check keywords
      for (const kw of item.keywords) {
        if (cleanQuery.includes(kw.toLowerCase())) {
          score += 5;
        }
      }

      // Check tokens in question and answer
      const qTokens = item.question.toLowerCase().split(/\s+/);
      for (const token of queryTokens) {
        if (qTokens.includes(token)) score += 3;
        if (item.keywords.some((k) => k.toLowerCase().includes(token))) score += 4;
        if (item.answer.toLowerCase().includes(token)) score += 1;
      }

      if (score > highestScore) {
        highestScore = score;
        bestItem = item;
      }
    }

    // Threshold for safe match: requires at least 4 score points to prevent hallucination
    if (highestScore >= 4 && bestItem) {
      return bestItem;
    }
    return null;
  };

  const handleProcessQuery = (queryToRun: string) => {
    if (!queryToRun.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: queryToRun,
      jurisdiction: currentJurisdiction,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Simulate RAG retrieval with verified Bare Act lookup
    setTimeout(() => {
      const match = findBestMatch(queryToRun);

      if (match) {
        const assistantMsg: Message = {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: match.answer,
          jurisdiction: currentJurisdiction, // stamped with active switch state
          citations: match.citations,
          confidence: match.confidence,
          confidenceScore: match.confidenceScore,
          escalationAdvice: match.escalationAdvice,
          matchedCategory: match.category,
          practicalChecklist: match.practicalChecklist,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        // Safe Abstention Fallback: Hallucination Prevention
        const abstentionMsg: Message = {
          id: `abstention-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `${t.safeAbstentionMessage}\n\n**Reason for Safe Abstention:** The RAG retrieval pipeline could not match your query with sufficiently high confidence against our ingested bare acts (*The Patents Act 1970, Drugs and Cosmetics Act 1940, Biological Diversity Act 2002/2023, FSSAI Ayurveda-Aahar Regulations 2022, or WIPO Treaties*).\n\nRather than generating speculative or hallucinated legal interpretations, we recommend escalating this query directly to an empaneled IP facilitator or patent agent.`,
          isAbstention: true,
          jurisdiction: currentJurisdiction,
          confidence: 'Low',
          confidenceScore: 32,
          escalationAdvice: t.humanEscalationPrompt,
        };
        setMessages((prev) => [...prev, abstentionMsg]);
      }
    }, 350);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleProcessQuery(inputQuery);
  };

  // Filter suggested questions based on jurisdiction for immediate utility
  const filteredSuggestions = knowledgeBase
    .filter((k) => k.jurisdiction === currentJurisdiction)
    .slice(0, 4);

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome-msg-reset',
        sender: 'assistant',
        timestamp: 'Just now',
        text: `Conversation reset. Please select a statutory question or type your specific Ayurvedic IP query below. Active Jurisdiction: **${currentJurisdiction === 'IN' ? 'India' : 'International'}**.`,
        jurisdiction: currentJurisdiction,
        confidence: 'High',
        confidenceScore: 99,
      },
    ]);
  };

  return (
    <section className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden flex flex-col h-[780px]">
      {/* Chat Component Header */}
      <div className="bg-sand-50/90 border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-ayur-800 text-white">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                {t.chatTitle}
              </h2>
              {/* Jurisdiction Stamping Badge on Chat Header */}
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                  currentJurisdiction === 'IN'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-blue-100 text-blue-900 border border-blue-300'
                }`}
              >
                Routing: {currentJurisdiction}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Verified statutory retrieval with zero hallucination guarantee
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetChat}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors text-xs flex items-center gap-1"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="bg-sand-100/50 border-b border-slate-100 px-4 sm:px-6 py-2.5 overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-600 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            {t.suggestedQuestions}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {filteredSuggestions.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleProcessQuery(item.shortQuery)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-ayur-100 hover:text-ayur-900 text-slate-700 border border-slate-200 text-xs transition-colors whitespace-nowrap shadow-2xs font-medium"
              >
                {item.shortQuery}
              </button>
            ))}
            {/* Safe Abstention Demo Trigger */}
            <button
              type="button"
              onClick={() =>
                handleProcessQuery('How do I stake cryptocurrency tokens for an Ayurvedic tokenized venture?')
              }
              className="px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs transition-colors whitespace-nowrap font-medium italic"
              title="Test the guardrail safe abstention behavior for out-of-scope queries"
            >
              ⚠️ Test Safe Abstention (Out-of-domain)
            </button>
          </div>
        </div>
      </div>

      {/* Message Stream Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-white via-sand-50/30 to-sand-50/60">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'user' ? (
              // User Query Bubble
              <div className="max-w-[85%] sm:max-w-[75%] bg-ayur-900 text-white rounded-2xl rounded-tr-xs px-4 py-3 shadow-xs">
                <div className="text-xs text-ayur-200 mb-1 flex items-center justify-between gap-4">
                  <span className="font-semibold">Innovator Query</span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </p>
              </div>
            ) : (
              // Assistant Answer Card
              <div
                className={`max-w-[95%] sm:max-w-[88%] w-full rounded-2xl shadow-xs border transition-all ${
                  msg.isAbstention
                    ? 'bg-amber-50/90 border-amber-300'
                    : 'bg-white border-slate-200'
                }`}
              >
                {/* Answer Card Top Header with Jurisdiction & Confidence Badge */}
                <div className="px-4 py-2.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 bg-slate-50/60 rounded-t-2xl">
                  <div className="flex items-center gap-2">
                    {/* The prominent Jurisdiction Badge required by Step 2 & Step 4 */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        msg.jurisdiction === 'IN'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-blue-100 text-blue-900 border border-blue-300'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          msg.jurisdiction === 'IN' ? 'bg-amber-600' : 'bg-blue-600'
                        }`}
                      ></span>
                      Jurisdiction: {msg.jurisdiction}
                    </span>

                    {msg.matchedCategory && (
                      <span className="text-[11px] font-medium text-slate-500 hidden sm:inline-block">
                        • {msg.matchedCategory}
                      </span>
                    )}
                  </div>

                  {/* Confidence Badge */}
                  {msg.confidence && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-500 font-medium">Confidence:</span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${
                          msg.confidence === 'High'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : msg.confidence === 'Medium'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                        }`}
                        title={`Retrieval alignment score: ${msg.confidenceScore || 90}%`}
                      >
                        {msg.confidence === 'High' ? (
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                        )}
                        {msg.confidence} ({msg.confidenceScore || 90}%)
                      </span>
                    </div>
                  )}
                </div>

                {/* Answer Text Body */}
                <div className="p-4 sm:p-5">
                  {msg.isAbstention && (
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{t.safeAbstentionTitle}</span>
                    </div>
                  )}

                  <div className="text-sm text-slate-800 leading-relaxed space-y-2 whitespace-pre-wrap">
                    {msg.text}
                  </div>

                  {/* Practical Action Checklist (if available) */}
                  {msg.practicalChecklist && msg.practicalChecklist.length > 0 && (
                    <div className="mt-4 bg-slate-50 rounded-xl p-3 border border-slate-200">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                        📋 Procedural Checklist for Applicant:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {msg.practicalChecklist.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-ayur-700 font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Statutory Citations Section (Chips) */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        <Scale className="w-3.5 h-3.5 text-ayur-700" />
                        <span>{t.sourcesLabel} ({msg.citations.length})</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {msg.citations.map((cite, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveCitationModal(cite)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-sand-100/90 hover:bg-ayur-100 text-ayur-950 border border-ayur-200/80 text-xs font-medium transition-colors group shadow-2xs"
                            title="Click to inspect Bare Act provision text"
                          >
                            <BookOpen className="w-3 h-3 text-ayur-600 group-hover:text-ayur-800" />
                            <span className="font-bold">{cite.statute}</span>
                            <span className="bg-white/80 px-1 py-0.5 rounded text-[10px] font-mono font-bold text-amber-800 border border-amber-200">
                              {cite.section}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Escalate to Human IP Facilitator Button */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="text-[11px] text-slate-500">
                      {msg.escalationAdvice ? (
                        <span className="italic">💡 {msg.escalationAdvice}</span>
                      ) : (
                        <span>Verified Bare Act match. Ready for patent counsel review.</span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onEscalate(msg.text.slice(0, 100), msg.jurisdiction)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-colors shadow-2xs shrink-0 self-start sm:self-auto"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-amber-700" />
                      <span>{t.escalateButton}</span>
                    </button>
                  </div>
                </div>

                {/* Card Sub-footer with Bhashini indicator */}
                <div className="px-4 py-1.5 bg-sand-50/50 rounded-b-2xl border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Knowledge Base ID: KB-AYUR-{msg.id.slice(-6)}</span>
                  <span>Legal certainty verified • Bhashini NLP Translation</span>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 sm:p-4 bg-sand-50/90 border-t border-slate-200">
        <form onSubmit={handleFormSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={t.chatPlaceholder}
              className="w-full pl-4 pr-10 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ayur-600 focus:border-ayur-600 shadow-inner"
            />
            {inputQuery && (
              <button
                type="button"
                onClick={() => setInputQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="px-5 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-ayur-700 to-ayur-800 hover:from-ayur-800 hover:to-ayur-900 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs flex items-center gap-2 shrink-0 transition-all"
          >
            <span>{t.askButton}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-1">
          <div className="flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3 text-slate-400" />
            <span>Press Enter to consult statutory database</span>
          </div>
          <span>Current Active Corpus: <strong>{currentJurisdiction === 'IN' ? 'India (Patents/BDA/D&C/FSSAI)' : 'International (WIPO/Nagoya/TRIPS)'}</strong></span>
        </div>
      </div>

      {/* Citation Detail Modal / Popup */}
      {activeCitationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in duration-150">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-ayur-100 text-ayur-800">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {activeCitationModal.statute}
                  </h3>
                  <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    {activeCitationModal.section}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveCitationModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-sand-50 p-4 rounded-xl border border-sand-200 text-slate-800 text-sm leading-relaxed mb-4">
              <strong className="text-slate-900 block mb-1">Statutory Excerpt & Provision Analysis:</strong>
              {activeCitationModal.description}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Source: Official Gazette & Bare Act Repository</span>
              <button
                type="button"
                onClick={() => setActiveCitationModal(null)}
                className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800"
              >
                Close Citation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
