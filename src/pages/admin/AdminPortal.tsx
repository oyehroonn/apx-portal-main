import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
    LayoutGrid,
    Briefcase,
    Users,
    Calendar,
    DollarSign,
    FileBarChart,
    Shield,
    AlertTriangle,
    Hexagon,
    Search,
    Bell,
    Moon,
    ChevronRight,
    X,
    ArrowLeft,
    Plus,
    Clock,
    CheckCircle,
    XCircle,
    ShieldAlert,
    AlertOctagon,
    TrendingUp,
    LogOut,
} from 'lucide-react';
import { jobs, disputes, contractorPayouts, contractors, leads } from '@/data/mockData';

type ViewId = 'dashboard' | 'jobs' | 'leads' | 'payouts' | 'disputes' | 'compliance' | 'meetings' | 'ledger';

export default function AdminPortal() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [currentView, setCurrentView] = useState<ViewId>('dashboard');
    const [showJobDetail, setShowJobDetail] = useState(false);
    const [selectedJob, setSelectedJob] = useState<any>(null);

    // Memoize expensive computations
    const pendingDisputes = useMemo(() => disputes.filter(d => d.status === 'Open'), []);
    const pendingPayouts = useMemo(() => contractorPayouts.filter(p => p.status === 'Processing'), []);
    const blockedContractors = useMemo(() => contractors.filter(c => c.complianceStatus === 'blocked'), []);
    const activeJobs = useMemo(() => jobs.filter(j => j.status === 'InProgress' || j.status === 'Open'), []);
    const totalPendingPayouts = useMemo(() => pendingPayouts.reduce((sum, p) => sum + p.amount, 0), [pendingPayouts]);

    const navTo = (viewId: ViewId) => {
        setCurrentView(viewId);
        setShowJobDetail(false);
        setSelectedJob(null);
    };

    const showJobDetailView = (job: any) => {
        setSelectedJob(job);
        setShowJobDetail(true);
    };

    const hideJobDetail = () => {
        setShowJobDetail(false);
        setSelectedJob(null);
    };

    const pageTitles: Record<ViewId, string> = {
        dashboard: 'Dashboard',
        jobs: 'Job Management',
        leads: 'Lead Pipeline',
        payouts: 'Payout Approvals',
        disputes: 'Dispute Resolution',
        compliance: 'Compliance Hub',
        meetings: 'Scheduled Meetings',
        ledger: 'Accounting Ledger',
    };

    return (
        <div className="h-screen flex text-sm antialiased font-sans bg-[#05060A] text-slate-200 overflow-hidden">
            {/* Background Ambience */}
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
            <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-violet-900/10 via-[#05060A]/50 to-[#05060A] pointer-events-none z-0"></div>
            <div className="fixed -top-[200px] -right-[200px] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

            {/* SIDEBAR */}
            <aside className="w-20 lg:w-64 fixed h-screen z-50 border-r border-white/5 bg-[#08090F]/95 backdrop-blur-xl flex flex-col justify-between transition-all duration-300">
                <div>
                    {/* Logo */}
                    <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_-5px_rgba(139,92,246,0.4)] ring-1 ring-white/10">
                                <Hexagon className="text-white fill-white/20 w-5 h-5" />
                            </div>
                            <div className="hidden lg:block">
                                <span className="text-lg font-bold tracking-tight text-white block leading-none">Apex</span>
                                <span className="text-[10px] uppercase tracking-widest text-violet-400 font-semibold">Admin</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="p-3 space-y-1 mt-4">
                        <div className="hidden lg:block px-3 py-2 text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Overview</div>
                        
                        <button
                            onClick={() => navTo('dashboard')}
                            className={`nav-item w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative ${
                                currentView === 'dashboard'
                                    ? 'bg-gradient-to-r from-violet-500/15 to-transparent border-l-3 border-violet-500 text-violet-400'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <LayoutGrid className="w-5 h-5 flex-shrink-0 transition-colors" />
                            <span className="hidden lg:block font-medium">Dashboard</span>
                            <div className="lg:hidden absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">Dashboard</div>
                        </button>

                        <div className="hidden lg:block px-3 py-2 text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1 mt-4">Management</div>

                        <button
                            onClick={() => navTo('jobs')}
                            className={`nav-item w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative ${
                                currentView === 'jobs'
                                    ? 'bg-gradient-to-r from-violet-500/15 to-transparent border-l-3 border-violet-500 text-violet-400'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <Briefcase className="w-5 h-5 flex-shrink-0 transition-colors" />
                            <span className="hidden lg:block font-medium">All Jobs</span>
                            <div className="lg:hidden absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">Jobs</div>
                        </button>

                        <button
                            onClick={() => navTo('leads')}
                            className={`nav-item w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative ${
                                currentView === 'leads'
                                    ? 'bg-gradient-to-r from-violet-500/15 to-transparent border-l-3 border-violet-500 text-violet-400'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <Users className="w-5 h-5 flex-shrink-0 transition-colors" />
                            <span className="hidden lg:block font-medium">Lead Pipeline</span>
                            <div className="lg:hidden absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">Leads</div>
                        </button>

                        <button
                            onClick={() => navTo('meetings')}
                            className={`nav-item w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative ${
                                currentView === 'meetings'
                                    ? 'bg-gradient-to-r from-violet-500/15 to-transparent border-l-3 border-violet-500 text-violet-400'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <Calendar className="w-5 h-5 flex-shrink-0 transition-colors" />
                            <span className="hidden lg:block font-medium">Schedule</span>
                            <div className="lg:hidden absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">Schedule</div>
                        </button>

                        <div className="hidden lg:block px-3 py-2 text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1 mt-4">Finance & Legal</div>

                        <button
                            onClick={() => navTo('payouts')}
                            className={`nav-item w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative ${
                                currentView === 'payouts'
                                    ? 'bg-gradient-to-r from-violet-500/15 to-transparent border-l-3 border-violet-500 text-violet-400'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <DollarSign className="w-5 h-5 flex-shrink-0 transition-colors" />
                            <span className="hidden lg:block font-medium">Payouts</span>
                            {pendingPayouts.length > 0 && (
                                <span className="hidden lg:flex ml-auto w-5 h-5 bg-violet-600 text-white text-[10px] rounded items-center justify-center font-bold">{pendingPayouts.length}</span>
                            )}
                            <div className="lg:hidden absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">Payouts</div>
                        </button>

                        <button
                            onClick={() => navTo('ledger')}
                            className={`nav-item w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative ${
                                currentView === 'ledger'
                                    ? 'bg-gradient-to-r from-violet-500/15 to-transparent border-l-3 border-violet-500 text-violet-400'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <FileBarChart className="w-5 h-5 flex-shrink-0 transition-colors" />
                            <span className="hidden lg:block font-medium">Accounting</span>
                            <div className="lg:hidden absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">Accounting</div>
                        </button>

                        <button
                            onClick={() => navTo('compliance')}
                            className={`nav-item w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative ${
                                currentView === 'compliance'
                                    ? 'bg-gradient-to-r from-violet-500/15 to-transparent border-l-3 border-violet-500 text-violet-400'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <Shield className="w-5 h-5 flex-shrink-0 transition-colors" />
                            <span className="hidden lg:block font-medium">Compliance</span>
                            <div className="lg:hidden absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">Compliance</div>
                        </button>
                        
                        <button
                            onClick={() => navTo('disputes')}
                            className={`nav-item w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative ${
                                currentView === 'disputes'
                                    ? 'bg-gradient-to-r from-violet-500/15 to-transparent border-l-3 border-violet-500 text-violet-400'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <AlertTriangle className="w-5 h-5 flex-shrink-0 transition-colors" />
                            <span className="hidden lg:block font-medium">Disputes</span>
                            <div className="lg:hidden absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">Disputes</div>
                        </button>
                    </div>
                </div>

                {/* Admin Profile */}
                <div className="p-4 border-t border-white/5 space-y-2">
                    <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-white/5 transition-colors group">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Admin"
                                className="w-9 h-9 rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all"
                            />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#08090F]"></div>
                        </div>
                        <div className="hidden lg:block text-left">
                            <div className="text-xs font-semibold text-white">{currentUser?.name || 'Alice Admin'}</div>
                            <div className="text-[10px] text-slate-500">Super Admin</div>
                        </div>
                        <Moon className="w-4 h-4 ml-auto text-slate-500 hover:text-white hidden lg:block" />
                    </button>
                    <button
                        onClick={() => {
                            logout();
                            navigate('/login');
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-rose-500/10 border border-rose-500/20 hover:border-rose-500/30 transition-colors group"
                    >
                        <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-400 transition-colors" />
                        <span className="text-xs font-medium text-slate-400 group-hover:text-rose-400 transition-colors hidden lg:block">Logout</span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="ml-20 lg:ml-64 flex-1 relative z-10 flex flex-col h-screen overflow-hidden">
                {/* HEADER */}
                <header className="h-16 border-b border-white/5 bg-[rgba(18,20,28,0.7)] backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center text-slate-400 text-xs">
                            <span className="text-slate-500">Admin Portal</span>
                            <ChevronRight className="w-3 h-3 mx-2 text-slate-600" />
                            <span className="text-white font-medium tracking-wide">{pageTitles[currentView]}</span>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative w-96 hidden md:block group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search for jobs, contractors, or reports..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/30 border border-white/10 text-xs placeholder:text-slate-600 text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-slate-500">⌘K</kbd>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/5 transition-all text-slate-400 hover:text-white relative">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                        </button>
                        <div className="h-6 w-[1px] bg-white/10"></div>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 hover:border-white/20 transition-all">
                            <Moon className="w-3 h-3 text-violet-400" />
                            <span className="text-xs text-slate-300">Dark</span>
                        </button>
                    </div>
                </header>

                {/* CONTENT SCROLL AREA */}
                <div className="flex-1 overflow-y-auto relative p-8 scroll-smooth">
                    {/* VIEW: DASHBOARD */}
                    {currentView === 'dashboard' && (
                        <div className="fade-in max-w-7xl mx-auto space-y-6">
                            {/* KPI GRID */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* KPI 1: Disputes */}
                                <div
                                    onClick={() => navTo('disputes')}
                                    className="glass-card p-5 rounded-2xl cursor-pointer group hover:bg-white/5 transition-all"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs font-medium text-slate-400">Pending Disputes</span>
                                        <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 group-hover:bg-rose-500/20 transition-colors">
                                            <AlertTriangle className="w-4 h-4 text-rose-400" />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-white tracking-tight">{pendingDisputes.length}</div>
                                    <div className="text-xs text-rose-400 mt-1">Requires immediate attention</div>
                                </div>

                                {/* KPI 2: Payouts */}
                                <div
                                    onClick={() => navTo('payouts')}
                                    className="glass-card p-5 rounded-2xl cursor-pointer group hover:bg-white/5 relative overflow-hidden"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs font-medium text-slate-400">Pending Payouts</span>
                                        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                                            <DollarSign className="w-4 h-4 text-amber-400" />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-white tracking-tight">{pendingPayouts.length}</div>
                                    <div className="text-xs text-slate-400 mt-1">${totalPendingPayouts.toFixed(2)} Total Volume</div>
                                </div>

                                {/* KPI 3: Blocked */}
                                <div
                                    onClick={() => navTo('compliance')}
                                    className="glass-card p-5 rounded-2xl cursor-pointer group hover:bg-white/5"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs font-medium text-slate-400">Blocked Contractors</span>
                                        <div className="p-2 rounded-lg bg-slate-700/50 border border-white/10 group-hover:bg-slate-700 transition-colors">
                                            <ShieldAlert className="w-4 h-4 text-slate-300" />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-white tracking-tight">{blockedContractors.length}</div>
                                    <div className="text-xs text-slate-500 mt-1">Due to expired insurance</div>
                                </div>

                                {/* KPI 4: Active Jobs */}
                                <div
                                    onClick={() => navTo('jobs')}
                                    className="glass-card p-5 rounded-2xl cursor-pointer group hover:bg-white/5"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs font-medium text-slate-400">Active Jobs</span>
                                        <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 group-hover:bg-violet-500/20 transition-colors">
                                            <Briefcase className="w-4 h-4 text-violet-400" />
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-white tracking-tight">{activeJobs.length}</div>
                                    <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" /> +2 this week
                                    </div>
                                </div>
                            </div>

                            {/* Secondary KPI Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div
                                    onClick={() => navTo('meetings')}
                                    className="glass-card p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-white/5"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-white">3</div>
                                            <div className="text-xs text-slate-400">Scheduled Meetings</div>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-600" />
                                </div>
                                <div
                                    onClick={() => navTo('leads')}
                                    className="glass-card p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-white/5"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-white">5</div>
                                            <div className="text-xs text-slate-400">Active Leads</div>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-600" />
                                </div>
                            </div>

                            {/* CHARTS ROW */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Revenue Chart */}
                                <div className="glass-panel p-6 rounded-2xl">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-semibold text-white text-sm">Revenue Overview</h3>
                                        <select className="bg-transparent border border-white/10 rounded-lg text-[10px] text-slate-400 px-2 py-1 outline-none focus:border-violet-500">
                                            <option>Last 6 Months</option>
                                        </select>
                                    </div>
                                    <div className="relative h-48 w-full">
                                        <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
                                            <defs>
                                                <linearGradient id="gradientRev" x1="0" x2="0" y1="0" y2="1">
                                                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5"></stop>
                                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"></stop>
                                                </linearGradient>
                                            </defs>
                                            <line x1="0" y1="0" x2="300" y2="0" stroke="rgba(255,255,255,0.05)" strokeDasharray="4"></line>
                                            <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="4"></line>
                                            <line x1="0" y1="100" x2="300" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="4"></line>
                                            <path
                                                d="M0,80 Q50,90 100,50 T200,60 T300,20"
                                                fill="none"
                                                stroke="#8b5cf6"
                                                strokeWidth="2"
                                                className="chart-path"
                                            ></path>
                                            <path
                                                d="M0,80 Q50,90 100,50 T200,60 T300,20 V100 H0 Z"
                                                fill="url(#gradientRev)"
                                                className="opacity-50"
                                            ></path>
                                        </svg>
                                        <div className="flex justify-between text-[10px] text-slate-500 mt-2">
                                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Job Status Chart */}
                                <div className="glass-panel p-6 rounded-2xl">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-semibold text-white text-sm">Job Status Distribution</h3>
                                    </div>
                                    <div className="h-48 flex items-end justify-between gap-4 px-2">
                                        <div className="w-full flex flex-col items-center gap-2 group">
                                            <div className="w-full bg-blue-500/20 rounded-t-sm h-[40%] relative group-hover:bg-blue-500/30 transition-all bar-anim">
                                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">4</div>
                                            </div>
                                            <span className="text-[10px] text-slate-500">Open</span>
                                        </div>
                                        <div className="w-full flex flex-col items-center gap-2 group">
                                            <div className="w-full bg-indigo-500/20 rounded-t-sm h-[60%] relative group-hover:bg-indigo-500/30 transition-all bar-anim" style={{ animationDelay: '0.1s' }}>
                                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">6</div>
                                            </div>
                                            <span className="text-[10px] text-slate-500">In Prog</span>
                                        </div>
                                        <div className="w-full flex flex-col items-center gap-2 group">
                                            <div className="w-full bg-emerald-500/20 rounded-t-sm h-[30%] relative group-hover:bg-emerald-500/30 transition-all bar-anim" style={{ animationDelay: '0.2s' }}>
                                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">3</div>
                                            </div>
                                            <span className="text-[10px] text-slate-500">Done</span>
                                        </div>
                                        <div className="w-full flex flex-col items-center gap-2 group">
                                            <div className="w-full bg-violet-500/20 rounded-t-sm h-[80%] relative group-hover:bg-violet-500/30 transition-all bar-anim" style={{ animationDelay: '0.3s' }}>
                                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">8</div>
                                            </div>
                                            <span className="text-[10px] text-slate-500">Paid</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VIEW: JOBS */}
                    {currentView === 'jobs' && (
                        <div className="max-w-7xl mx-auto h-full flex flex-col">
                            {!showJobDetail ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between glass-panel p-2 rounded-xl">
                                        <div className="flex gap-2">
                                            <div className="bg-slate-900/50 p-1 rounded-lg border border-white/5 flex">
                                                <button className="px-3 py-1.5 rounded bg-white/10 text-white text-xs font-medium">All Jobs</button>
                                                <button className="px-3 py-1.5 rounded text-slate-400 hover:text-white text-xs transition-colors">Active</button>
                                                <button className="px-3 py-1.5 rounded text-slate-400 hover:text-white text-xs transition-colors">Completed</button>
                                            </div>
                                        </div>
                                        <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2">
                                            <Plus className="w-3 h-3" /> New Job
                                        </button>
                                    </div>

                                    <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] uppercase tracking-wider text-slate-500">
                                                    <th className="px-6 py-4 font-medium">Job ID</th>
                                                    <th className="px-6 py-4 font-medium">Property</th>
                                                    <th className="px-6 py-4 font-medium">Customer</th>
                                                    <th className="px-6 py-4 font-medium">Type</th>
                                                    <th className="px-6 py-4 font-medium">Status</th>
                                                    <th className="px-6 py-4 font-medium">Assigned To</th>
                                                    <th className="px-6 py-4 font-medium text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                                                {jobs.slice(0, 5).map((job) => (
                                                    <tr
                                                        key={job.id}
                                                        onClick={() => showJobDetailView(job)}
                                                        className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                                                    >
                                                        <td className="px-6 py-4 font-mono text-violet-400">#{job.id}</td>
                                                        <td className="px-6 py-4">{job.propertyAddress}</td>
                                                        <td className="px-6 py-4">{job.customerName}</td>
                                                        <td className="px-6 py-4">{job.type}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                                                job.status === 'InProgress' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                                job.status === 'Open' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                                'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                                            }`}>
                                                                {job.status.toUpperCase()}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {job.assignedContractor ? (
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-5 h-5 rounded-full bg-slate-700"></div>
                                                                    {job.assignedContractor}
                                                                </div>
                                                            ) : (
                                                                <span className="text-slate-500 italic">Unassigned</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <ChevronRight className="w-4 h-4 text-slate-600 inline group-hover:text-white" />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex-col">
                                    <div className="flex items-center gap-4 mb-6">
                                        <button
                                            onClick={hideJobDetail}
                                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                        </button>
                                        <div>
                                            <h2 className="text-xl font-semibold text-white">Job #{selectedJob?.id}</h2>
                                            <p className="text-xs text-slate-400">{selectedJob?.type || 'Job Details'}</p>
                                        </div>
                                        <div className="ml-auto flex gap-3">
                                            <button className="px-4 py-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs hover:bg-rose-500/20">Open Dispute</button>
                                            <button className="px-4 py-2 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-500">Create Payout</button>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-2 space-y-6">
                                            {/* Timeline */}
                                            <div className="glass-panel p-6 rounded-2xl">
                                                <h3 className="text-sm font-medium text-white mb-4">Activity Timeline</h3>
                                                <div className="space-y-6 relative pl-2">
                                                    <div className="absolute left-[3px] top-2 bottom-2 w-0.5 bg-white/5"></div>
                                                    <div className="flex gap-4 relative">
                                                        <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] z-10"></div>
                                                        <div>
                                                            <p className="text-xs text-white">Job Started</p>
                                                            <p className="text-[10px] text-slate-500">Oct 24, 2024 at 9:00 AM</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-4 relative">
                                                        <div className="w-2 h-2 mt-1.5 rounded-full bg-slate-600 border border-slate-900 z-10"></div>
                                                        <div>
                                                            <p className="text-xs text-slate-300">Material Delivery Confirmed</p>
                                                            <p className="text-[10px] text-slate-500">Oct 22, 2024</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-span-1 space-y-6">
                                            {/* Financials */}
                                            <div className="glass-card p-5 rounded-2xl">
                                                <h3 className="text-sm font-medium text-white mb-4">Financials</h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-slate-400">Labor Estimate</span>
                                                        <span className="text-white">$3,200.00</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-slate-400">Materials</span>
                                                        <span className="text-white">$1,050.00</span>
                                                    </div>
                                                    <div className="h-px bg-white/10 my-2"></div>
                                                    <div className="flex justify-between text-sm font-bold">
                                                        <span className="text-white">Total</span>
                                                        <span className="text-emerald-400">$4,250.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* VIEW: LEADS */}
                    {currentView === 'leads' && (
                        <div className="max-w-7xl mx-auto space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-white">Lead Pipeline</h2>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 rounded-lg border border-white/10 text-xs text-slate-300 hover:bg-white/5">Import Angi Leads</button>
                                    <button className="px-4 py-2 rounded-lg bg-white text-slate-900 text-xs font-bold hover:bg-slate-200">Add Manual Lead</button>
                                </div>
                            </div>
                            
                            <div className="glass-panel rounded-2xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] uppercase tracking-wider text-slate-500">
                                            <th className="px-6 py-4">Lead Name</th>
                                            <th className="px-6 py-4">Property</th>
                                            <th className="px-6 py-4">Source</th>
                                            <th className="px-6 py-4">Date Added</th>
                                            <th className="px-6 py-4">Stage</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                                        {leads.slice(0, 5).map((lead) => (
                                            <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="px-6 py-4 font-medium text-white">{lead.name}</td>
                                                <td className="px-6 py-4">{lead.property}</td>
                                                <td className="px-6 py-4"><span className="text-slate-500">{lead.source || 'Manual'}</span></td>
                                                <td className="px-6 py-4">{new Date(lead.date).toLocaleDateString()}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                                                        lead.stage === 'New' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                        lead.stage === 'Proposal Sent' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                                                        'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                                    }`}>
                                                        {lead.stage}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right"><button className="text-violet-400 hover:text-violet-300">View</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* VIEW: PAYOUTS */}
                    {currentView === 'payouts' && (
                        <div className="max-w-5xl mx-auto space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="glass-card p-4 rounded-xl border-l-4 border-l-amber-500">
                                    <div className="text-xs text-slate-400 mb-1">Pending Approval</div>
                                    <div className="text-2xl font-bold text-white">{pendingPayouts.length}</div>
                                    <div className="text-xs text-slate-500">${totalPendingPayouts.toFixed(2)} Volume</div>
                                </div>
                                <div className="glass-card p-4 rounded-xl border-l-4 border-l-emerald-500">
                                    <div className="text-xs text-slate-400 mb-1">Approved (This Week)</div>
                                    <div className="text-2xl font-bold text-white">12</div>
                                    <div className="text-xs text-slate-500">$14,200.00 Volume</div>
                                </div>
                            </div>

                            <h3 className="text-sm font-semibold text-white mt-8">Pending Requests</h3>
                            
                            {pendingPayouts.length > 0 && (
                                <div className="glass-panel rounded-2xl overflow-hidden border border-amber-500/20">
                                    <div className="p-6 flex items-center justify-between border-b border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500">
                                                <Clock className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-white">Contractor Payment #{pendingPayouts[0].id}</h4>
                                                <p className="text-xs text-slate-400">Cory Anderson • Job #{pendingPayouts[0].jobId} (Kitchen)</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-white">${pendingPayouts[0].amount.toFixed(2)}</div>
                                            <div className="text-[10px] text-slate-500">Submitted 2 hrs ago</div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900/30 p-4 flex justify-end gap-3">
                                        <button className="px-4 py-2 rounded-lg border border-white/10 text-xs text-slate-300 hover:bg-white/5 hover:text-rose-400">Decline</button>
                                        <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]">Approve Payout</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* VIEW: DISPUTES */}
                    {currentView === 'disputes' && (
                        <div className="max-w-5xl mx-auto space-y-6">
                            {pendingDisputes.length > 0 && (
                                <div className="glass-panel p-5 rounded-2xl border border-rose-500/30 bg-rose-500/[0.02]">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-4">
                                            <div className="p-3 bg-rose-500/10 rounded-lg text-rose-500 h-fit">
                                                <AlertOctagon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-base font-semibold text-white">{pendingDisputes[0].title}</h3>
                                                    <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold">URGENT</span>
                                                </div>
                                                <p className="text-xs text-slate-300 mb-2">{pendingDisputes[0].description}</p>
                                                <div className="text-[10px] text-slate-500">Job #{pendingDisputes[0].jobId} • Reported by {pendingDisputes[0].raisedByRole}</div>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10">Review Case</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* VIEW: COMPLIANCE */}
                    {currentView === 'compliance' && (
                        <div className="max-w-5xl mx-auto space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {blockedContractors.map((contractor) => (
                                    <div key={contractor.id} className="glass-card p-6 rounded-2xl border border-rose-500/30 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4">
                                            <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold">BLOCKED</span>
                                        </div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold">
                                                {contractor.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold text-white">{contractor.name}</h3>
                                                <p className="text-xs text-slate-500">{contractor.trade || 'Contractor'}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center justify-between text-xs p-2 rounded bg-slate-800/50">
                                                <span className="text-slate-400 flex items-center gap-2">
                                                    <CheckCircle className="w-3 h-3 text-emerald-500" /> W-9 Form
                                                </span>
                                                <span className="text-emerald-500">Verified</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs p-2 rounded bg-rose-500/10 border border-rose-500/20">
                                                <span className="text-rose-200 flex items-center gap-2">
                                                    <XCircle className="w-3 h-3 text-rose-500" /> Insurance
                                                </span>
                                                <span className="text-rose-400 font-medium">Expired Oct 01</span>
                                            </div>
                                        </div>
                                        <button className="w-full py-2 rounded-lg border border-white/10 text-xs text-slate-400 hover:bg-white/5">Send Reminder</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* VIEW: MEETINGS */}
                    {currentView === 'meetings' && (
                        <div className="max-w-5xl mx-auto space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-white">Upcoming Schedule</h2>
                                <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2">
                                    <Plus className="w-3 h-3" /> Schedule Meeting
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="glass-card p-4 rounded-xl flex items-center gap-4 border-l-4 border-l-indigo-500">
                                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-indigo-500/10 text-indigo-400">
                                        <span className="text-[10px] font-bold uppercase">Nov</span>
                                        <span className="text-lg font-bold leading-none">24</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-white">Site Walkthrough - Highland Ave</h4>
                                        <p className="text-xs text-slate-400">With Sarah Jenkins (Customer) and Cory Anderson</p>
                                    </div>
                                    <div className="text-xs font-mono text-slate-500">10:00 AM</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VIEW: LEDGER */}
                    {currentView === 'ledger' && (
                        <div className="max-w-7xl mx-auto space-y-6">
                            <h2 className="text-lg font-semibold text-white">Accounting Ledger</h2>
                            <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] uppercase tracking-wider text-slate-500">
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Transaction ID</th>
                                            <th className="px-6 py-4">Type</th>
                                            <th className="px-6 py-4">Description</th>
                                            <th className="px-6 py-4 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                                        <tr className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4 text-slate-500">Nov 21, 2024</td>
                                            <td className="px-6 py-4 font-mono">TX-9921</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 text-[10px]">Payout</span>
                                            </td>
                                            <td className="px-6 py-4">Contractor Payment - Job #J-1020</td>
                                            <td className="px-6 py-4 text-right font-mono text-white">-$1,200.00</td>
                                        </tr>
                                        <tr className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4 text-slate-500">Nov 20, 2024</td>
                                            <td className="px-6 py-4 font-mono">TX-9920</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px]">Expense</span>
                                            </td>
                                            <td className="px-6 py-4">Home Depot - Materials</td>
                                            <td className="px-6 py-4 text-right font-mono text-white">-$350.25</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Footer Spacer */}
                    <div className="h-20"></div>
                </div>
            </main>
        </div>
    );
}

