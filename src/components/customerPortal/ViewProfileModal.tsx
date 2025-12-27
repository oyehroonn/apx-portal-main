import { X, Star, Briefcase, MapPin, Calendar, ShieldCheck, CheckCircle } from 'lucide-react';
import type { Contractor } from '@/types/customerPortal';

interface ViewProfileModalProps {
  contractor: Contractor;
  onClose: () => void;
}

export default function ViewProfileModal({ contractor, onClose }: ViewProfileModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-panel rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Contractor Profile</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Profile Header */}
          <div className="flex items-start gap-6 pb-6 border-b border-white/5">
            <div className="relative">
              <img
                src={contractor.avatar}
                alt={contractor.name}
                className="w-24 h-24 rounded-2xl object-cover border border-white/10"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-2 border-slate-800 rounded-full" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-white mb-2">{contractor.name}</h3>
              <p className="text-sm text-slate-400 uppercase tracking-wider mb-3">{contractor.role}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-white font-semibold">{contractor.rating}</span>
                  <span className="text-slate-400 text-sm">({contractor.jobsCount} Jobs)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Total Jobs</p>
                  <p className="text-lg font-semibold text-white">{contractor.jobsCount}</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Star className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Rating</p>
                  <p className="text-lg font-semibold text-white">{contractor.rating}/5.0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Verifications</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-white">Identity Verified</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-white">Background Checked</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-white">Insurance Verified</span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">About</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Experienced professional contractor with a proven track record of delivering high-quality work. 
              Specialized in {contractor.role.toLowerCase()} with attention to detail and customer satisfaction.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

