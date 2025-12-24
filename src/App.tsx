import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages - will be created next
import Login from './pages/Login';

// Lazy load portal components for faster initial load
const ContractorPortal = lazy(() => import('./pages/contractor/ContractorPortal'));
const ContractorDashboard = lazy(() => import('./pages/contractor/ContractorDashboard'));
const ComplianceHub = lazy(() => import('./pages/contractor/ComplianceHub'));
const JobBoard = lazy(() => import('./pages/contractor/JobBoard'));
const ActiveJobView = lazy(() => import('./pages/contractor/ActiveJobView'));
const Wallet = lazy(() => import('./pages/contractor/Wallet'));
const ContractorJobFlowDemo = lazy(() => import('./pages/contractor/ContractorJobFlowDemo'));
const JobSummaryView = lazy(() => import('./pages/contractor/JobSummaryView'));

// Admin Portal
const AdminPortal = lazy(() => import('./pages/admin/AdminPortal'));
const LegalCompliance = lazy(() => import('./pages/admin/LegalCompliance'));
const DisputeList = lazy(() => import('./pages/admin/DisputeList'));
const DisputeDetail = lazy(() => import('./pages/admin/DisputeDetail'));
const Ledger = lazy(() => import('./pages/admin/Ledger'));
const PayoutApproval = lazy(() => import('./pages/admin/PayoutApproval'));
const InvestorAccounting = lazy(() => import('./pages/admin/InvestorAccounting'));
const AdminJobList = lazy(() => import('./pages/admin/AdminJobList'));
const AdminMeetings = lazy(() => import('./pages/admin/AdminMeetings'));
const AdminLeads = lazy(() => import('./pages/admin/AdminLeads'));

// Investor Portal
const InvestorDashboard = lazy(() => import('./pages/investor/InvestorDashboard'));
const InvestorReports = lazy(() => import('./pages/investor/InvestorReports'));
const PropertyDetailView = lazy(() => import('./pages/investor/PropertyDetailView'));

// Customer Portal (Magic Links)
const QuoteApproval = lazy(() => import('./pages/customer/QuoteApproval'));
const ReportIssue = lazy(() => import('./pages/customer/ReportIssue'));
const MaterialPurchaseStatus = lazy(() => import('./pages/customer/MaterialPurchaseStatus'));
const MaterialDeliveryConfirmation = lazy(() => import('./pages/customer/MaterialDeliveryConfirmation'));
const CustomerTracker = lazy(() => import('./pages/customer/CustomerTracker'));
const CustomerCredentials = lazy(() => import('./pages/customer/CustomerCredentials'));
const CustomerJobView = lazy(() => import('./pages/customer/CustomerJobView'));
const CustomerPortalLayout = lazy(() => import('./layouts/CustomerPortalLayout'));
const TestAPI = lazy(() => import('./pages/TestAPI'));

// Loading fallback component
const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#05060A]">
        <div className="text-center">
            <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 text-sm">Loading...</p>
        </div>
    </div>
);

function App() {
    const { isAuthenticated, currentUser } = useAuth();

    return (
        <div className="min-h-screen">
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
                <Route path="/test-api" element={
                    <Suspense fallback={<LoadingFallback />}>
                        <TestAPI />
                    </Suspense>
                } />
                <Route path="/track/:jobId" element={
                    <Suspense fallback={<LoadingFallback />}>
                        <CustomerTracker />
                    </Suspense>
                } />

                {/* Contractor Portal */}
                <Route
                    path="/contractor/portal"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['contractor']}>
                                <ContractorPortal />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/contractor/dashboard"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['contractor']}>
                                <ContractorDashboard />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/contractor/job-flow-demo"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['contractor']}>
                                <ContractorJobFlowDemo />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/contractor/project/:jobId"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['contractor']}>
                                <JobSummaryView />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/contractor/compliance"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['contractor']}>
                                <ComplianceHub />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/contractor/jobs"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['contractor']}>
                                <JobBoard />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/contractor/jobs/:jobId"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['contractor']}>
                                <ActiveJobView />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/contractor/wallet"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['contractor']}>
                                <Wallet />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />

                {/* Field Manager Portal - routes intentionally hidden */}

                {/* Admin Portal */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminPortal />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/admin/legal-compliance"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['admin']}>
                                <LegalCompliance />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/admin/disputes"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['admin']}>
                                <DisputeList />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/admin/disputes/:disputeId"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['admin']}>
                                <DisputeDetail />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/admin/ledger"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['admin']}>
                                <Ledger />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/admin/payouts"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['admin']}>
                                <PayoutApproval />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/admin/investors"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['admin']}>
                                <InvestorAccounting />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/admin/jobs"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminJobList />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/admin/meetings"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminMeetings />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/admin/leads"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminLeads />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />

                {/* Investor Portal */}
                <Route
                    path="/investor/dashboard"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['investor']}>
                                <InvestorDashboard />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/investor/orders"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['investor']}>
                                <InvestorDashboard />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/investor/properties"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['investor']}>
                                <InvestorDashboard />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/investor/leads"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['investor']}>
                                <InvestorDashboard />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/investor/reports"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['investor']}>
                                <InvestorReports />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route
                    path="/investor/property/:address"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['investor']}>
                                <PropertyDetailView />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />

                {/* Customer Portal - Dashboard (uses LayoutShell with its own sidebar) */}
                <Route
                    path="/customer/dashboard"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ProtectedRoute allowedRoles={['customer']}>
                                <CustomerJobView />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />

                {/* Customer Portal - Other pages (use CustomerPortalLayout) */}
                <Route element={
                    <Suspense fallback={<LoadingFallback />}>
                        <ProtectedRoute allowedRoles={['customer']}>
                            <CustomerPortalLayout />
                        </ProtectedRoute>
                    </Suspense>
                }>
                    <Route path="/materials/:token" element={
                        <Suspense fallback={<LoadingFallback />}>
                            <MaterialPurchaseStatus />
                        </Suspense>
                    } />
                    <Route path="/materials/:token/delivery" element={
                        <Suspense fallback={<LoadingFallback />}>
                            <MaterialDeliveryConfirmation />
                        </Suspense>
                    } />
                    <Route path="/issue/:token" element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ReportIssue />
                        </Suspense>
                    } />
                </Route>

                {/* Public Magic Links */}
                <Route path="/quote/:token" element={
                    <Suspense fallback={<LoadingFallback />}>
                        <QuoteApproval />
                    </Suspense>
                } />
                <Route path="/customer/credentials" element={
                    <Suspense fallback={<LoadingFallback />}>
                        <CustomerCredentials />
                    </Suspense>
                } />

                {/* Redirect root to login or dashboard based on auth */}
                <Route
                    path="/"
                    element={
                        isAuthenticated && currentUser ? (
                            <Navigate to={
                                currentUser.role === 'admin' ? '/admin/dashboard' :
                                    currentUser.role === 'fm' ? '/fm/dashboard' :
                                        currentUser.role === 'contractor' ? '/contractor/portal' :
                                            currentUser.role === 'investor' ? '/investor/dashboard' :
                                                currentUser.role === 'customer' ? '/customer/dashboard' :
                                                    '/login'
                            } replace />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </div >
    );
}

export default App;
