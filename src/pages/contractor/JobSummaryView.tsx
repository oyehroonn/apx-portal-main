import { useParams, useNavigate } from 'react-router-dom';
import { useContractorJobs } from '@/context/ContractorJobsContext';
import { useJobs } from '@/context/JobsContext';
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  MapPin,
  User,
  DollarSign,
  FileText,
  Check,
  Info,
} from 'lucide-react';
import '@/styles/customerPortal.css';

export default function JobSummaryView() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { completedJobs } = useContractorJobs();
  const { getJobById } = useJobs();

  // Find the completed job
  const completedJob = completedJobs.find((j) => j.id === jobId);
  // Also try to get from JobsContext for additional details
  const jobDetails = jobId ? getJobById(jobId) : null;

  if (!completedJob) {
    return (
      <div className="min-h-screen bg-[#05060A] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Job not found</p>
          <button
            onClick={() => navigate('/contractor/portal')}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition-colors"
          >
            Back to Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05060A] text-white">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#05060A]/80 to-[#05060A] pointer-events-none z-0" />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 glass-panel backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/contractor/portal')}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 transition-colors text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white">{completedJob.jobName}</h1>
            <p className="text-xs text-slate-400">Project Summary</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto p-8 space-y-8">
        {/* Completion Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-semibold text-white tracking-tight mb-2">Project Completed</h2>
          <p className="text-slate-400 text-sm">Job completed on {completedJob.completedDate}</p>
        </div>

        {/* Job Details Card */}
        <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
            Job Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-800 border border-white/5">
                <MapPin className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Property Address</p>
                <p className="text-sm text-white font-medium">{completedJob.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-800 border border-white/5">
                <User className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Customer</p>
                <p className="text-sm text-white font-medium">{completedJob.customerName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-800 border border-white/5">
                <Calendar className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Completed Date</p>
                <p className="text-sm text-white font-medium">{completedJob.completedDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-800 border border-white/5">
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Estimated Pay</p>
                <p className="text-sm text-white font-medium">{completedJob.estimatedPay}</p>
              </div>
            </div>
          </div>

          {completedJob.description && (
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-800 border border-white/5">
                  <FileText className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Job Description</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{completedJob.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Completion Summary */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
            Completion Summary
          </h3>

          <div className="space-y-6">
            {/* Step 1: Acknowledgment */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Step 1: Job Acknowledgment
              </h4>
              <div className="pl-5 space-y-2">
                <div className="flex items-center gap-2 text-sm text-white">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Job details reviewed and acknowledged</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Contractor availability confirmed</span>
                </div>
              </div>
            </div>

            {/* Step 2: Walkthrough */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Step 2: Site Walkthrough
              </h4>
              <div className="pl-5 space-y-2">
                <div className="flex items-center gap-2 text-sm text-white">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Site visit completed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Measurements and scope verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Site conditions documented</span>
                </div>
              </div>
            </div>

            {/* Step 3: Quote */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Step 3: Quote Approval
              </h4>
              <div className="pl-5 space-y-2">
                <div className="flex items-center gap-2 text-sm text-white">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Quote submitted and approved</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Payment terms agreed upon</span>
                </div>
              </div>
            </div>

            {/* Step 4: Progress */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Step 4: Work Progress
              </h4>
              <div className="pl-5 space-y-2">
                <div className="flex items-center gap-2 text-sm text-white">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Milestone tasks completed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Progress documentation submitted</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Quality checks passed</span>
                </div>
              </div>
            </div>

            {/* Step 5: Completion */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Step 5: Final Completion
              </h4>
              <div className="pl-5 space-y-2">
                <div className="flex items-center gap-2 text-sm text-white">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>All fixtures installed and tested</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Site cleanup completed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Final report submitted</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Job marked as complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Payment Status</h4>
              <p className="text-xs text-slate-400">
                Payment of {completedJob.estimatedPay} will be automatically released 24 hours after customer
                confirmation and project rating.
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/contractor/portal')}
            className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Portal
          </button>
        </div>
      </main>
    </div>
  );
}

