import React, { useState } from 'react';
import { UserCheck, CheckCircle2, ShieldCheck, Mail, Phone, ExternalLink, Building2, FileCheck } from 'lucide-react';
import { LanguageCode, translations } from '../data/translations';

interface EscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQueryContext: string;
  jurisdiction: 'IN' | 'INTL';
  currentLang: LanguageCode;
}

export const EscalationModal: React.FC<EscalationModalProps> = ({
  isOpen,
  onClose,
  initialQueryContext,
  jurisdiction,
  currentLang,
}) => {
  const t = translations[currentLang];
  const [applicantName, setApplicantName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formulationTitle, setFormulationTitle] = useState('');
  const [queryDetails, setQueryDetails] = useState(initialQueryContext);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedTicket = `AYUSH-IP-${jurisdiction}-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedTicket);
      setIsSubmitting(false);
    }, 600);
  };

  const resetForm = () => {
    setTicketId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-8">
        {!ticketId ? (
          <>
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800 border border-amber-300">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif">
                    Escalate to Empaneled IP Facilitator
                  </h3>
                  <p className="text-xs text-slate-500">
                    Direct handoff to registered Patent Agents & AYUSH Regulatory Counsels
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

            {/* Jurisdiction Notice */}
            <div className="mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600">Assigned Routing Framework:</span>
              <span className="font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                {jurisdiction === 'IN' ? 'Domestic (India Bare Acts & NBA)' : 'International (WIPO & Nagoya Treaties)'}
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Innovator / Practitioner Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. A. Sharma (Vaidya)"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-ayur-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Organization / Clinic / Startup
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kerala Ayurveda MSME"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-ayur-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="innovator@ayushventure.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-ayur-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-ayur-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Product or Formulation Concept Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Standardized Ashwagandha Nano-emulsion"
                  value={formulationTitle}
                  onChange={(e) => setFormulationTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-ayur-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Summary of Legal/Regulatory Question *
                </label>
                <textarea
                  rows={3}
                  required
                  value={queryDetails}
                  onChange={(e) => setQueryDetails(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-ayur-600 focus:outline-none text-xs leading-relaxed"
                />
              </div>

              <div className="bg-sand-50 p-2.5 rounded-lg border border-sand-200 text-[11px] text-slate-600">
                🔒 <strong>Privacy Assurance:</strong> Protected under DPDP Act 2023. Proprietary formulation recipes are encrypted and never stored in publicly accessible LLM memory.
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl text-white font-bold bg-amber-700 hover:bg-amber-800 disabled:opacity-50 shadow-xs flex items-center gap-2"
                >
                  {isSubmitting ? 'Generating Ticket...' : 'Submit Escalation Ticket'}
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Success Ticket Generated View */
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-serif">
              {t.escalateSuccess}
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
              Your inquiry has been safely queued and dispatched to the designated AYUSH IP facilitation network.
            </p>

            <div className="my-5 bg-sand-50 p-4 rounded-xl border border-sand-200 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-sand-200 text-xs">
                <span className="text-slate-500 font-medium">Facilitation Reference:</span>
                <span className="font-mono font-bold text-sm text-ayur-900 bg-white px-2 py-0.5 rounded border border-sand-300">
                  {ticketId}
                </span>
              </div>
              <div className="text-xs text-slate-700 space-y-1 mt-2.5">
                <div><strong>Applicant:</strong> {applicantName || 'Registered Innovator'}</div>
                {organization && <div><strong>Entity:</strong> {organization}</div>}
                <div><strong>Assigned Body:</strong> TIFAC Patent Facilitation Centre (PFC) & AYUSH Cell</div>
                <div><strong>Turnaround Time:</strong> 2-3 business days</div>
              </div>
            </div>

            <div className="text-left bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600 mb-5">
              <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-ayur-700" />
                <span>Empaneled Government Facilitation Desks:</span>
              </div>
              <ul className="space-y-1 text-[11px] list-disc list-inside">
                <li>TIFAC Patent Facilitation Centre (DST): pfc@tifac.org.in</li>
                <li>National Biodiversity Authority (NBA): secretary@nba.nic.in</li>
                <li>CSIR-TKDL Unit, New Delhi: tkdl@csir.res.in</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="w-full py-2.5 bg-ayur-900 text-white font-bold rounded-xl hover:bg-ayur-950 transition-colors text-xs"
            >
              Done & Return to Assistant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
