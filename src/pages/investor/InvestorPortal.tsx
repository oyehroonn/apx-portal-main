import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutGrid,
  Briefcase,
  Users,
  Building2,
  FileText,
  Settings2,
  ChevronRight,
  Search,
  Sun,
  Plus,
  TrendingUp,
  DollarSign,
  Wallet,
  Percent,
  UploadCloud,
  X,
  ArrowRight,
  Filter,
  Download,
  FileBarChart2,
  FileSpreadsheet,
  Hexagon,
  LogOut,
} from 'lucide-react';
import {
  jobs as allJobs,
  investorJobBreakdown,
  investors,
  leads as initialLeads,
} from '@/data/mockData';
import '@/styles/investorPortal.css';

type ViewId = 'overview' | 'work-orders' | 'leads' | 'properties' | 'reports';

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export default function InvestorPortal() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [activeView, setActiveView] = useState<ViewId>('overview');
  const [ordersFilter, setOrdersFilter] = useState<'active' | 'closed' | 'pending'>('active');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Investor data
  const investorId = 901;
  const investor = investors.find(i => i.id === investorId);

  // Compute metrics
  const investorJobs = useMemo(() => 
    allJobs.filter(j => j.type === 'investor' || j.id === 104 || j.id === 101),
    []
  );
  
  const activeProjects = investorJobs.filter(j => ['Open', 'InProgress'].includes(j.status)).length;

  const totalRevenue = useMemo(() => 
    investorJobBreakdown
      .filter(b => b.investorId === investorId)
      .reduce((sum, item) => sum + item.investorShare, 0),
    []
  );

  const netProfit = totalRevenue - (totalRevenue * 0.15);
  const avgRoi = 861.5;

  // Get filtered jobs based on filter
  const filteredJobs = useMemo(() => {
    switch (ordersFilter) {
      case 'active':
        return investorJobs.filter(j => ['Open', 'InProgress'].includes(j.status));
      case 'closed':
        return investorJobs.filter(j => ['Complete', 'Paid'].includes(j.status));
      case 'pending':
        return investorJobs.filter(j => j.status === 'Complete');
      default:
        return investorJobs;
    }
  }, [ordersFilter, investorJobs]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navTo = (viewId: ViewId) => {
    setActiveView(viewId);
  };

  const pageTitles: Record<ViewId, string> = {
    'overview': 'Investor Dashboard',
    'work-orders': 'Work Orders',
    'leads': 'Lead Pipeline',
    'properties': 'Property Portfolio',
    'reports': 'Financial Reports',
  };

  return (
    <div className="h-screen flex text-sm text-slate-400 selection:bg-violet-500/30 selection:text-white font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[#030304] z-0" />
      <div className="fixed top-0 left-0 right-0 h-[800px] bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.15),transparent_70%)] opacity-40 pointer-events-none z-0" />
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

      {/* SIDEBAR (Dock Style) */}
      <aside className="w-20 lg:w-[72px] fixed h-screen z-50 border-r border-white/[0.06] bg-[#0A0A0C]/80 backdrop-blur-xl flex flex-col items-center py-6 transition-all duration-300">
        {/* Logo */}
        <div className="mb-10 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-[0_0_10px_-2px_rgba(124,58,237,0.3)] ring-1 ring-white/10 group cursor-pointer">
          <Hexagon className="text-white fill-white/20 w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6 w-full px-4">
          <button
            onClick={() => navTo('overview')}
            className={`investor-nav-item w-full h-10 flex items-center justify-center rounded-lg hover:bg-white/5 group relative ${activeView === 'overview' ? 'active' : ''}`}
            title="Overview"
          >
            <LayoutGrid className="w-5 h-5 transition-colors group-hover:text-white" />
          </button>

          <button
            onClick={() => navTo('work-orders')}
            className={`investor-nav-item w-full h-10 flex items-center justify-center rounded-lg hover:bg-white/5 group relative ${activeView === 'work-orders' ? 'active' : ''}`}
            title="Work Orders"
          >
            <Briefcase className="w-5 h-5 transition-colors group-hover:text-white" />
          </button>

          <button
            onClick={() => navTo('leads')}
            className={`investor-nav-item w-full h-10 flex items-center justify-center rounded-lg hover:bg-white/5 group relative ${activeView === 'leads' ? 'active' : ''}`}
            title="Leads"
          >
            <Users className="w-5 h-5 transition-colors group-hover:text-white" />
          </button>

          <button
            onClick={() => navTo('properties')}
            className={`investor-nav-item w-full h-10 flex items-center justify-center rounded-lg hover:bg-white/5 group relative ${activeView === 'properties' ? 'active' : ''}`}
            title="Properties"
          >
            <Building2 className="w-5 h-5 transition-colors group-hover:text-white" />
          </button>

          <button
            onClick={() => navTo('reports')}
            className={`investor-nav-item w-full h-10 flex items-center justify-center rounded-lg hover:bg-white/5 group relative ${activeView === 'reports' ? 'active' : ''}`}
            title="Financial Reports"
          >
            <FileText className="w-5 h-5 transition-colors group-hover:text-white" />
          </button>
        </nav>

        {/* Bottom Actions */}
        <div className="space-y-4 w-full px-4">
          <button className="w-full h-10 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-colors">
            <Settings2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleLogout}
            className="w-full h-10 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-500 hover:text-red-400 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 mx-auto rounded-full overflow-hidden border border-white/20 relative group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&fit=facearea&facepad=2"
              alt="Profile"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-20 lg:ml-[72px] flex-1 relative z-10 flex flex-col h-screen overflow-hidden">
        {/* TOP HEADER */}
        <header className="h-20 flex items-center justify-between px-8 z-40">
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-medium text-white tracking-tight">{pageTitles[activeView]}</h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span>Apex Portal</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-400">{activeView === 'overview' ? 'Overview' : pageTitles[activeView]}</span>
            </div>
          </div>

          {/* Global Search */}
          <div className="relative w-[480px] hidden md:block group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for jobs, reports, or settings..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full investor-input text-xs placeholder:text-slate-600 focus:w-full transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <span className="text-[10px] text-slate-600 font-medium px-1.5 py-0.5 rounded border border-white/5 bg-white/5">⌘K</span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
              <Sun className="w-3.5 h-3.5 text-slate-400 group-hover:text-yellow-300 transition-colors" />
              <span className="text-xs font-medium text-slate-400 group-hover:text-white">Light</span>
            </button>

            <div className="flex items-center gap-3 pl-6 border-l border-white/5">
              <div className="text-right hidden lg:block">
                <div className="text-xs font-medium text-white">{investor?.name || currentUser?.name || 'Investor'}</div>
                <div className="text-[10px] text-slate-500">Premium Account</div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&fit=facearea&facepad=2"
                  className="w-9 h-9 rounded-full ring-1 ring-white/10 grayscale-[0.3] hover:grayscale-0 transition-all cursor-pointer"
                  alt="Profile"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0A0A0C]" />
              </div>
            </div>
          </div>
        </header>

        {/* SCROLL AREA */}
        <div className="flex-1 overflow-y-auto relative px-8 pb-12 scroll-smooth">
          
          {/* VIEW: OVERVIEW */}
          {activeView === 'overview' && (
            <div className="investor-fade-enter max-w-[1400px] mx-auto space-y-8 pt-4">
              {/* Welcome Banner */}
              <div className="relative w-full h-40 rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-900 to-indigo-900 opacity-80" />
                <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
                <div className="absolute -right-20 -top-40 w-96 h-96 rounded-full border border-white/10 opacity-20 group-hover:scale-105 transition-transform duration-1000" />
                
                <div className="relative z-10 h-full flex flex-col justify-center px-10">
                  <h2 className="text-3xl font-medium text-white tracking-tight mb-2">Welcome, {investor?.name || 'Investor'}!</h2>
                  <p className="text-indigo-200/80 text-sm font-light max-w-lg">Your portfolio is performing well. You have 3 pending payouts and 5 active leads requiring attention.</p>
                </div>
              </div>

              {/* Primary Tabs */}
              <div className="flex justify-center">
                <div className="inline-flex items-center p-1 rounded-xl bg-[#0A0A0C] border border-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_4px_20px_-5px_rgba(0,0,0,0.3)]">
                  <button onClick={() => navTo('overview')} className={`investor-tab-btn ${activeView === 'overview' ? 'active' : ''} px-6 py-2 rounded-lg text-xs font-medium transition-all`}>Overview</button>
                  <button onClick={() => navTo('work-orders')} className="investor-tab-btn px-6 py-2 rounded-lg text-slate-500 hover:text-slate-300 text-xs font-medium transition-all">Work Orders</button>
                  <button onClick={() => navTo('leads')} className="investor-tab-btn px-6 py-2 rounded-lg text-slate-500 hover:text-slate-300 text-xs font-medium transition-all">Leads</button>
                  <button onClick={() => navTo('properties')} className="investor-tab-btn px-6 py-2 rounded-lg text-slate-500 hover:text-slate-300 text-xs font-medium transition-all">Properties</button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* KPI 1: Active Projects */}
                <div className="investor-glass-card p-6 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Briefcase className="w-16 h-16 text-slate-400" />
                  </div>
                  <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">Active Projects</div>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-semibold text-white tracking-tighter">{activeProjects}</span>
                    <span className="text-xs text-emerald-500 mb-1.5 flex items-center font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">+2 this month</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 mt-6 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 w-[60%] h-full rounded-full" />
                  </div>
                </div>

                {/* KPI 2: Total Revenue */}
                <div className="investor-glass-card p-6 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <DollarSign className="w-16 h-16 text-slate-400" />
                  </div>
                  <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">Total Revenue</div>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-semibold text-white tracking-tighter">{formatCurrency(totalRevenue)}</span>
                    <TrendingUp className="w-4 h-4 text-emerald-500 mb-2" />
                  </div>
                  <div className="w-full bg-white/5 h-1 mt-6 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 w-[75%] h-full rounded-full" />
                  </div>
                </div>

                {/* KPI 3: Net Profit */}
                <div className="investor-glass-card p-6 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Wallet className="w-16 h-16 text-violet-400" />
                  </div>
                  <div className="text-violet-400 text-xs font-medium uppercase tracking-wider mb-2">Net Profit</div>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-semibold text-white tracking-tighter">{formatCurrency(netProfit)}</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 mt-6 rounded-full overflow-hidden">
                    <div className="bg-violet-500 w-[85%] h-full rounded-full" />
                  </div>
                </div>

                {/* KPI 4: ROI */}
                <div className="investor-glass-card p-6 rounded-2xl relative overflow-hidden group border-amber-500/20 bg-amber-900/5">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Percent className="w-16 h-16 text-amber-500" />
                  </div>
                  <div className="text-amber-500 text-xs font-medium uppercase tracking-wider mb-2">ROI</div>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-semibold text-white tracking-tighter">{avgRoi}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 mt-6 rounded-full overflow-hidden">
                    <div className="bg-amber-500 w-[92%] h-full rounded-full" />
                  </div>
                </div>
              </div>

              {/* Earnings Breakdown */}
              <div>
                <h3 className="text-sm font-medium text-white mb-4 pl-1">Earnings Breakdown</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="investor-glass-panel p-6 rounded-xl flex flex-col justify-center items-center text-center border-dashed border-slate-800">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Apex Earnings (Platform)</span>
                    <div className="text-2xl font-semibold text-white mb-1">$750.00</div>
                    <span className="text-xs text-slate-600">15% Service Fee</span>
                  </div>
                  <div className="investor-glass-panel p-6 rounded-xl flex flex-col justify-center items-center text-center bg-gradient-to-b from-emerald-900/10 to-transparent border-emerald-500/20">
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Investor Earnings (Net)</span>
                    <div className="text-3xl font-semibold text-emerald-400 mb-1">{formatCurrency(netProfit)}</div>
                    <span className="text-xs text-emerald-500/50">After Labor & Materials</span>
                  </div>
                  <div className="investor-glass-panel p-6 rounded-xl flex flex-col justify-center items-center text-center">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Total Payouts Received</span>
                    <div className="text-2xl font-semibold text-indigo-300 mb-1">$3,584.00</div>
                    <span className="text-xs text-slate-500">Cash Distributed</span>
                  </div>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="investor-glass-panel p-8 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-medium text-white">Investment Performance</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded text-[10px] bg-white/5 text-white">12M</button>
                    <button className="px-3 py-1 rounded text-[10px] text-slate-500 hover:text-white">6M</button>
                    <button className="px-3 py-1 rounded text-[10px] text-slate-500 hover:text-white">30D</button>
                  </div>
                </div>
                <div className="h-64 w-full relative">
                  <svg viewBox="0 0 1000 300" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="250" x2="1000" y2="250" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="150" x2="1000" y2="150" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="50" x2="1000" y2="50" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
                    <path d="M0,250 C150,240 250,180 350,190 S500,80 650,100 S850,20 1000,40" fill="url(#chartGradient)" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: WORK ORDERS */}
          {activeView === 'work-orders' && (
            <div className="investor-fade-enter max-w-[1400px] mx-auto space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex space-x-1 bg-[#121215] p-1 rounded-lg border border-white/[0.06]">
                  <button 
                    onClick={() => setOrdersFilter('active')}
                    className={`px-4 py-1.5 rounded text-xs font-medium transition-colors ${ordersFilter === 'active' ? 'bg-white/10 text-white shadow' : 'text-slate-500 hover:text-white'}`}
                  >
                    Active Jobs ({investorJobs.filter(j => ['Open', 'InProgress'].includes(j.status)).length})
                  </button>
                  <button 
                    onClick={() => setOrdersFilter('closed')}
                    className={`px-4 py-1.5 rounded text-xs font-medium transition-colors ${ordersFilter === 'closed' ? 'bg-white/10 text-white shadow' : 'text-slate-500 hover:text-white'}`}
                  >
                    Closed
                  </button>
                  <button 
                    onClick={() => setOrdersFilter('pending')}
                    className={`px-4 py-1.5 rounded text-xs font-medium transition-colors ${ordersFilter === 'pending' ? 'bg-white/10 text-white shadow' : 'text-slate-500 hover:text-white'}`}
                  >
                    Pending Payouts
                  </button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
                  <Plus className="w-3 h-3" /> New Work Order
                </button>
              </div>

              {/* Job List */}
              <div className="space-y-3">
                {filteredJobs.map((job, idx) => {
                  const breakdown = investorJobBreakdown.find(b => b.jobId === job.id);
                  const statusColor = job.status === 'InProgress' ? 'emerald' : 'indigo';
                  
                  return (
                    <div 
                      key={job.id} 
                      className={`investor-glass-card p-5 rounded-xl flex items-center justify-between group cursor-pointer border-l-2 border-l-${statusColor}-500`}
                      onClick={() => navigate(`/investor/property/${job.id}`)}
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-lg bg-[#121215] flex items-center justify-center border border-white/[0.06]">
                          <span className="text-xs font-bold text-white">#{job.id}</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">{job.propertyAddress}</h4>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <span>{job.trade || 'Renovation'}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-600" />
                            <span>{job.city}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Status</div>
                          <div className={`text-xs font-medium text-${statusColor}-400 mt-1 flex items-center justify-end gap-1`}>
                            {job.status === 'InProgress' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                            {job.status === 'InProgress' ? 'In Progress' : job.status}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">My Profit</div>
                          <div className="text-sm font-medium text-white mt-0.5">
                            {breakdown ? formatCurrency(breakdown.investorShare) : '$0.00'}
                          </div>
                        </div>
                        <div className="text-right w-16">
                          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">ROI</div>
                          <div className="text-xs font-bold text-amber-500 mt-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block">
                            {breakdown?.roi || 12}%
                          </div>
                        </div>
                        <div className="p-2 rounded-full hover:bg-white/10 text-slate-500 hover:text-white transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredJobs.length === 0 && (
                  <div className="investor-glass-panel p-12 rounded-2xl text-center">
                    <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No jobs found</h3>
                    <p className="text-sm text-slate-500">No jobs in this category yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: LEADS */}
          {activeView === 'leads' && (
            <div className="investor-fade-enter max-w-[1400px] mx-auto space-y-6 pt-4">
              <div className="investor-glass-panel p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-white">Deal Flow</h2>
                  <p className="text-xs text-slate-500 mt-1">Manage potential investments and contractor leads.</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowImportModal(true)} 
                    className="px-4 py-2 rounded-lg border border-white/[0.06] text-xs font-medium text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                    <UploadCloud className="w-3.5 h-3.5" /> Import Angi Leads
                  </button>
                  <button 
                    onClick={() => setShowLeadModal(true)} 
                    className="px-4 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-2 shadow-[0_0_10px_-2px_rgba(124,58,237,0.3)]"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Manual Lead
                  </button>
                </div>
              </div>

              <div className="investor-glass-panel rounded-2xl overflow-hidden">
                <table className="w-full text-left investor-premium-table">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                      <th className="pl-6 py-4 font-medium text-[10px] text-slate-500 uppercase tracking-wider">Lead Name</th>
                      <th className="py-4 font-medium text-[10px] text-slate-500 uppercase tracking-wider">Property</th>
                      <th className="py-4 font-medium text-[10px] text-slate-500 uppercase tracking-wider">Date Added</th>
                      <th className="py-4 font-medium text-[10px] text-slate-500 uppercase tracking-wider">Source</th>
                      <th className="py-4 font-medium text-[10px] text-slate-500 uppercase tracking-wider">Stage</th>
                      <th className="pr-6 py-4 font-medium text-[10px] text-slate-500 uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-xs text-slate-300">
                    {initialLeads.map((lead) => (
                      <tr key={lead.id} className="group cursor-pointer hover:bg-white/[0.02]">
                        <td className="pl-6 py-4 font-medium text-white">{lead.name}</td>
                        <td className="py-4">{lead.property}</td>
                        <td className="py-4 text-slate-500">{lead.date}</td>
                        <td className="py-4">
                          <span className="px-2 py-0.5 rounded border border-white/[0.06] bg-white/5 text-[10px] text-slate-400">{lead.source}</span>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                            lead.stage === 'New' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                            lead.stage === 'Won' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {lead.stage}
                          </span>
                        </td>
                        <td className="pr-6 py-4 text-right text-slate-500 group-hover:text-white transition-colors">
                          <ArrowRight className="w-4 h-4 ml-auto" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW: PROPERTIES */}
          {activeView === 'properties' && (
            <div className="investor-fade-enter max-w-[1400px] mx-auto space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">My Properties</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
                  <Plus className="w-3 h-3" /> Add Property
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Property 1 */}
                <div className="investor-glass-card rounded-2xl overflow-hidden group cursor-pointer">
                  <div className="h-40 bg-slate-800 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1600596542815-2a4b9f0321f6?q=80&w=600&auto=format&fit=crop" 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                      alt="Property"
                    />
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-bold text-white border border-white/10">OWNED</div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-semibold text-white">Highland Residence</h3>
                      <span className="text-emerald-400 text-xs font-bold">12% ROI</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">1248 Highland Ave, Austin TX</p>
                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                      <div className="text-[10px] text-slate-400"><span className="text-white font-bold text-xs">2</span> Active Jobs</div>
                      <div className="text-[10px] text-slate-400"><span className="text-white font-bold text-xs">$450k</span> Value</div>
                    </div>
                  </div>
                </div>

                {/* Property 2 */}
                <div className="investor-glass-card rounded-2xl overflow-hidden group cursor-pointer">
                  <div className="h-40 bg-slate-800 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop" 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                      alt="Property"
                    />
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-bold text-white border border-white/10">MANAGED</div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-semibold text-white">Willow Creek Flip</h3>
                      <span className="text-amber-400 text-xs font-bold">8% ROI</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">882 Willow Creek Rd, Austin TX</p>
                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                      <div className="text-[10px] text-slate-400"><span className="text-white font-bold text-xs">1</span> Active Jobs</div>
                      <div className="text-[10px] text-slate-400"><span className="text-white font-bold text-xs">$320k</span> Value</div>
                    </div>
                  </div>
                </div>

                {/* Add Property Placeholder */}
                <div className="investor-glass-card rounded-2xl border-dashed border-2 border-white/10 flex flex-col items-center justify-center p-8 hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 group-hover:scale-110 transition-all">
                    <Plus className="w-6 h-6 text-slate-400 group-hover:text-white" />
                  </div>
                  <span className="text-xs font-medium text-slate-400">Add New Property</span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: REPORTS */}
          {activeView === 'reports' && (
            <div className="investor-fade-enter max-w-[1400px] mx-auto space-y-6 pt-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search reports..." 
                    className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#0A0A0C] border border-white/[0.06] text-xs text-white placeholder:text-slate-600 focus:border-violet-500 outline-none"
                  />
                </div>
                <button className="px-3 py-2 rounded-lg border border-white/[0.06] hover:bg-white/5 text-xs text-slate-300 flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5" /> Filter
                </button>
                <div className="ml-auto">
                  <select className="bg-[#0A0A0C] border border-white/[0.06] rounded-lg text-xs text-white px-3 py-2 outline-none">
                    <option>All Time</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
              </div>

              <div className="investor-glass-panel rounded-2xl p-2 space-y-1">
                {/* Report Item 1 */}
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
                      <FileBarChart2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">Project P&L: Highland Residence</h4>
                      <div className="text-[10px] text-slate-500 mt-0.5">Job #1024 • Oct 2024 • 2.4 MB</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">Ready</span>
                    <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Report Item 2 */}
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">Q3 Portfolio Performance</h4>
                      <div className="text-[10px] text-slate-500 mt-0.5">Quarterly Report • Sep 2024 • 4.1 MB</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">Ready</span>
                    <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Report Item 3 */}
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">Annual Tax Summary 2024</h4>
                      <div className="text-[10px] text-slate-500 mt-0.5">Tax Document • Dec 2024 • 1.8 MB</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-medium border border-amber-500/20">Pending</span>
                    <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Spacer */}
          <div className="h-20" />
        </div>
      </main>

      {/* MODAL: IMPORT */}
      {showImportModal && (
        <div className="fixed inset-0 z-[100] bg-[#030304]/60 backdrop-blur-sm flex items-center justify-center p-4 investor-fade-enter">
          <div className="bg-[#0A0A0C] border border-white/[0.06] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative">
            <div className="p-6 border-b border-white/[0.06] flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">Import Leads</h3>
              <button onClick={() => setShowImportModal(false)} className="text-slate-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-full mx-auto flex items-center justify-center border border-dashed border-white/20">
                <UploadCloud className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500 mt-1">Supports .CSV from Angi, Thumbtack</p>
              </div>
            </div>
            <div className="p-4 bg-[#121215] border-t border-white/[0.06] flex justify-end gap-3">
              <button onClick={() => setShowImportModal(false)} className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white">Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-[0_0_10px_-2px_rgba(124,58,237,0.3)]">Import File</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: MANUAL LEAD */}
      {showLeadModal && (
        <div className="fixed inset-0 z-[100] bg-[#030304]/60 backdrop-blur-sm flex items-center justify-center p-4 investor-fade-enter">
          <div className="bg-[#0A0A0C] border border-white/[0.06] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative">
            <div className="p-6 border-b border-white/[0.06] flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">Add New Lead</h3>
              <button onClick={() => setShowLeadModal(false)} className="text-slate-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">First Name</label>
                  <input type="text" className="w-full px-3 py-2 rounded-lg investor-input text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Last Name</label>
                  <input type="text" className="w-full px-3 py-2 rounded-lg investor-input text-sm" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Property Address</label>
                <input type="text" className="w-full px-3 py-2 rounded-lg investor-input text-sm" placeholder="123 Main St" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Source</label>
                <select className="w-full px-3 py-2 rounded-lg investor-input text-sm bg-[#0A0A0C]">
                  <option>Manual Entry</option>
                  <option>Referral</option>
                  <option>Direct Mail</option>
                </select>
              </div>
            </div>
            <div className="p-4 bg-[#121215] border-t border-white/[0.06] flex justify-end gap-3">
              <button onClick={() => setShowLeadModal(false)} className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white">Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-white text-black hover:bg-slate-200 text-xs font-bold">Create Lead</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

