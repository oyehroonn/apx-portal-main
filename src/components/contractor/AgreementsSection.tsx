import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, X, Scroll } from 'lucide-react';
import { agreements, type Agreement } from '@/data/agreements';

type AgreementStatus = 'pending' | 'signed';

interface AgreementRecord {
  agreementId: string;
  version: string;
  signedName: string;
  signedAt: string;
  status: AgreementStatus;
}

interface AgreementsSectionProps {
  contractorId?: string | number;
}

export default function AgreementsSection({ contractorId }: AgreementsSectionProps) {
  const [agreementStatuses, setAgreementStatuses] = useState<Record<string, AgreementRecord>>({});
  const [selectedAgreement, setSelectedAgreement] = useState<Agreement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [signedName, setSignedName] = useState('');
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [loading, setLoading] = useState(false);
  const contentRef = useState<HTMLDivElement | null>(null);

  // Fetch agreement statuses
  useEffect(() => {
    const fetchStatuses = async () => {
      if (!contractorId) return;
      
      // Try API first
      try {
        const response = await fetch(`http://192.168.100.58:5001/api/agreements/status?contractorId=${contractorId}`);
        if (response.ok) {
          const data = await response.json();
          const statusMap: Record<string, AgreementRecord> = {};
          data.forEach((record: AgreementRecord) => {
            statusMap[record.agreementId] = {
              ...record,
              status: 'signed' as AgreementStatus,
            };
          });
          setAgreementStatuses(statusMap);
          return;
        }
      } catch (error) {
        console.warn('API unavailable, checking localStorage:', error);
      }
      
      // Fallback to localStorage
      try {
        const stored = localStorage.getItem(`agreements_${contractorId}`);
        if (stored) {
          const storedAgreements = JSON.parse(stored);
          const statusMap: Record<string, AgreementRecord> = {};
          storedAgreements.forEach((record: AgreementRecord) => {
            statusMap[record.agreementId] = {
              ...record,
              status: 'signed' as AgreementStatus,
            };
          });
          setAgreementStatuses(statusMap);
        }
      } catch (error) {
        console.error('Failed to read localStorage:', error);
      }
    };

    fetchStatuses();
  }, [contractorId]);

  const getAgreementStatus = (agreementId: string): AgreementStatus => {
    const record = agreementStatuses[agreementId];
    if (!record) return 'pending';
    // If it has signedAt or signedName, it's signed
    if (record.signedAt || record.signedName) {
      return 'signed';
    }
    return record.status || 'pending';
  };

  const handleViewAgreement = (agreement: Agreement) => {
    setSelectedAgreement(agreement);
    setShowModal(true);
    setSignedName('');
    setHasScrolledToBottom(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
    setHasScrolledToBottom(isAtBottom);
  };

  const handleSignAgreement = async () => {
    if (!selectedAgreement || !signedName.trim() || !contractorId) return;

    setLoading(true);
    
    const newRecord: AgreementRecord = {
      agreementId: selectedAgreement.id,
      version: selectedAgreement.version,
      signedName: signedName.trim(),
      signedAt: new Date().toISOString(),
      status: 'signed',
    };

    let apiSuccess = false;

    // Try API first
    try {
      const response = await fetch('http://192.168.100.58:5001/api/agreements/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agreementId: selectedAgreement.id,
          version: selectedAgreement.version,
          signedName: signedName.trim(),
          contractorId: contractorId.toString(),
        }),
      });

      if (response.ok) {
        apiSuccess = true;
      }
    } catch (apiError: any) {
      // API failed - will use localStorage fallback
      console.warn('API unavailable, using localStorage fallback:', apiError);
    }

    // Always save to localStorage (as backup if API worked, or primary if API failed)
    try {
      const stored = localStorage.getItem(`agreements_${contractorId}`);
      const storedAgreements = stored ? JSON.parse(stored) : [];
      const existingIndex = storedAgreements.findIndex(
        (a: AgreementRecord) => a.agreementId === selectedAgreement.id
      );
      if (existingIndex >= 0) {
        storedAgreements[existingIndex] = newRecord;
      } else {
        storedAgreements.push(newRecord);
      }
      localStorage.setItem(`agreements_${contractorId}`, JSON.stringify(storedAgreements));
    } catch (storageError: any) {
      console.error('Failed to save to localStorage:', storageError);
      alert('Failed to save agreement signature. Please try again.');
      setLoading(false);
      return;
    }

    // Update local state immediately (works for both API and localStorage)
    setAgreementStatuses((prev) => ({
      ...prev,
      [selectedAgreement.id]: newRecord,
    }));

    // Close modal and reset
    setShowModal(false);
    setSelectedAgreement(null);
    setSignedName('');
    setLoading(false);
  };

  return (
    <>
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h3 className="text-sm font-medium text-white">Agreements</h3>
        </div>
        <div className="divide-y divide-white/5">
          {agreements.map((agreement) => {
            const status = getAgreementStatus(agreement.id);
            return (
              <div
                key={agreement.id}
                className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.01] transition-colors"
              >
                <div className="flex items-center gap-3">
                  {status === 'signed' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-500" />
                  )}
                  <span className="text-sm text-slate-300">{agreement.title}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      status === 'signed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {status === 'signed' ? 'Signed' : 'Pending'}
                  </span>
                </div>
                <button
                  onClick={() => handleViewAgreement(agreement)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  View
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Agreement Signing Modal */}
      {showModal && selectedAgreement && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-panel rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-white/10 shadow-2xl">
            {/* Header */}
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white mb-1">{selectedAgreement.title}</h2>
                <p className="text-slate-400 text-sm">Version {selectedAgreement.version}</p>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedAgreement(null);
                  setSignedName('');
                  setHasScrolledToBottom(false);
                }}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div
              className="flex-1 overflow-y-auto p-8"
              onScroll={handleScroll}
              ref={(el) => {
                contentRef.current = el;
              }}
            >
              <div className="prose prose-invert max-w-none">
                <div className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                  {selectedAgreement.content}
                </div>
              </div>

              {/* Scroll indicator */}
              {!hasScrolledToBottom && (
                <div className="mt-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3">
                  <Scroll className="w-5 h-5 text-blue-400" />
                  <p className="text-sm text-blue-300">Please scroll to the bottom to enable signing</p>
                </div>
              )}
            </div>

            {/* Signing Controls */}
            {hasScrolledToBottom && (
              <div className="px-8 py-6 border-t border-white/5 space-y-4 bg-white/[0.01]">
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Type your full name to sign
                  </label>
                  <input
                    type="text"
                    value={signedName}
                    onChange={(e) => setSignedName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full glass-input rounded-xl py-3 px-4 text-white text-sm"
                  />
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-white/5">
                  <input
                    type="checkbox"
                    id="agree-checkbox"
                    checked={signedName.trim().length > 0}
                    onChange={() => {}}
                    className="mt-1 text-emerald-500 rounded bg-white/5 border-white/20"
                  />
                  <label htmlFor="agree-checkbox" className="text-xs text-slate-300 flex-1">
                    I agree to the terms and conditions stated in this agreement
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSelectedAgreement(null);
                      setSignedName('');
                      setHasScrolledToBottom(false);
                    }}
                    className="flex-1 py-3 rounded-xl border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSignAgreement}
                    disabled={!signedName.trim() || loading}
                    className="flex-1 py-3 rounded-xl bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? 'Signing...' : 'Sign Agreement'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

