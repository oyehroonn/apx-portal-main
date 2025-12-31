import { useState } from 'react';
import { X, User, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { createMockJob } from '@/data/customerPortalJobsMock';
import type { Contractor } from '@/types/customerPortal';

interface RebookModalProps {
  contractor: Contractor;
  onClose: () => void;
  onJobCreated: (jobId: string) => void;
}

export default function RebookModal({ contractor, onClose, onJobCreated }: RebookModalProps) {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    jobName: '',
    propertyAddress: '',
    city: '',
    trade: '',
    estimatedPay: '',
    description: '',
    scheduledTime: '',
    squareFootage: '',
  });
  const [loading, setLoading] = useState(false);

  const handleRebook = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!currentUser?.profileID) {
      alert('Profile ID is required. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const newJob = createMockJob({
        jobName: formData.jobName,
        propertyAddress: formData.propertyAddress,
        city: formData.city,
        customerName: currentUser.name,
        customerEmail: currentUser.email,
        trade: formData.trade,
        estimatedPay: formData.estimatedPay,
        description: formData.description,
        scheduledTime: formData.scheduledTime || undefined,
        squareFootage: formData.squareFootage || undefined,
        profileID: currentUser.profileID,
        // Pre-assign the contractor
        assignedContractorId: contractor.id,
      });

      setLoading(false);
      onClose();
      onJobCreated(newJob.id);
    } catch (error: any) {
      console.error('Failed to rebook job:', error);
      alert(`Failed to rebook job: ${error.message || 'Unknown error'}`);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-panel rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-white/10 shadow-2xl">
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Rebook with {contractor.name}</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleRebook} className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Contractor Field (Unchangeable) */}
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Contractor (Pre-selected)
            </label>
            <div className="relative">
              <div className="w-full glass-input rounded-xl py-3 px-4 text-slate-400 text-sm flex items-center gap-3 bg-slate-900/50 border-slate-700/50">
                <User className="w-4 h-4 text-slate-500" />
                <span className="flex-1">{contractor.name}</span>
                <Lock className="w-4 h-4 text-slate-500" />
              </div>
              <p className="text-xs text-slate-500 mt-1 ml-1">This contractor worked on your previous job</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Job Name / Title
            </label>
            <input
              type="text"
              required
              value={formData.jobName}
              onChange={(e) => setFormData({ ...formData, jobName: e.target.value })}
              className="w-full glass-input rounded-xl py-3 px-4 text-white text-sm"
              placeholder="e.g., Master Bathroom Renovation"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Property Address
              </label>
              <input
                type="text"
                required
                value={formData.propertyAddress}
                onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                className="w-full glass-input rounded-xl py-3 px-4 text-white text-sm"
                placeholder="123 Main St"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                City
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full glass-input rounded-xl py-3 px-4 text-white text-sm"
                placeholder="Los Angeles"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Trade Type
              </label>
              <select
                required
                value={formData.trade}
                onChange={(e) => setFormData({ ...formData, trade: e.target.value })}
                className="w-full glass-input rounded-xl py-3 px-4 text-white text-sm"
              >
                <option value="">Select trade...</option>
                <option value="painting">Painting</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="flooring">Flooring</option>
                <option value="drywall">Drywall</option>
                <option value="tiling">Tiling</option>
                <option value="handyman">Handyman</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Estimated Pay
              </label>
              <input
                type="text"
                required
                value={formData.estimatedPay}
                onChange={(e) => setFormData({ ...formData, estimatedPay: e.target.value })}
                className="w-full glass-input rounded-xl py-3 px-4 text-white text-sm"
                placeholder="$5,000.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Scheduled Start Date
              </label>
              <input
                type="date"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                className="w-full glass-input rounded-xl py-3 px-4 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Square Footage (Optional)
              </label>
              <input
                type="text"
                value={formData.squareFootage}
                onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                className="w-full glass-input rounded-xl py-3 px-4 text-white text-sm"
                placeholder="350 sqft"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Description / Scope of Work
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full glass-input rounded-xl py-3 px-4 text-white text-sm h-32 resize-none"
              placeholder="Describe the work to be done in detail..."
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 rounded-xl border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Rebook Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

