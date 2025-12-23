import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, getDashboardRoute } from '@/context/AuthContext';
import { users } from '@/data/mockData';
import type { User, UserRole } from '@/types';
import '@/styles/customerPortal.css';
import AuthLayoutSplit from '@/components/auth/AuthLayoutSplit';
import RoleToggle, { RoleOption } from '@/components/auth/RoleToggle';
import GlassInput from '@/components/auth/GlassInput';
import PrimaryButton from '@/components/auth/PrimaryButton';
import DemoLoginList from '@/components/auth/DemoLoginList';

const ROLE_OPTIONS: RoleOption[] = [
    { id: 'admin', label: 'Admin', role: 'admin' },
    { id: 'contractor', label: 'Contractor Pro', role: 'contractor' },
    { id: 'investor', label: 'Investor', role: 'investor' },
    { id: 'customer', label: 'Homeowner', role: 'customer' },
];

const CTA_LABELS: Record<UserRole, string> = {
    admin: 'Enter Admin Console',
    fm: 'Enter FM Dashboard',
    contractor: 'Enter Contractor Cockpit',
    investor: 'Enter Investor Portal',
    customer: 'Access Customer Portal',
};

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState<UserRole>('contractor');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const syncRoleWithEmail = (value: string) => {
        const match = users.find((u) => u.email === value.trim());
        if (match) {
            setSelectedRole(match.role);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            const user = users.find((u) => u.email === email);
            if (user) {
                // Ensure role toggle reflects actual logged-in role
                setSelectedRole(user.role);
                navigate(getDashboardRoute(user.role));
            } else {
                setError('User not found. Please select a demo user or enter a valid email.');
            }
        } catch (err: any) {
            setError(err.message || 'User not found. Please select a demo user or enter a valid email.');
        } finally {
            setLoading(false);
        }
    };

    const handleDemoUser = async (demoUser: User) => {
        setEmail(demoUser.email);
        setPassword('demo');
        setSelectedRole(demoUser.role);

        try {
            await login(demoUser.email);
            // For contractor demo logins, send directly to the main contractor portal
            if (demoUser.role === 'contractor') {
                navigate('/contractor/portal');
            } else {
                navigate(getDashboardRoute(demoUser.role));
            }
        } catch (err) {
            setError('Error logging in');
        }
    };

    return (
        <AuthLayoutSplit>
            {/* Role Switcher */}
            <RoleToggle
                options={ROLE_OPTIONS}
                activeRole={selectedRole}
                onChange={(role) => setSelectedRole(role)}
            />

            {/* Auth Form */}
            <form onSubmit={handleLogin} className="space-y-6">
                <GlassInput
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        syncRoleWithEmail(e.target.value);
                    }}
                    placeholder="pro@apex.inc"
                    required
                />

                <GlassInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                />

                {error && (
                    <div className="text-rose-300 text-xs bg-rose-500/10 border border-rose-400/30 rounded-xl px-3 py-2">
                        {error}
                    </div>
                )}

                <PrimaryButton type="submit" loading={loading}>
                    {CTA_LABELS[selectedRole]}
                </PrimaryButton>

                <button
                    type="button"
                    className="w-full text-[11px] text-slate-500 hover:text-slate-300 text-left underline-offset-4 hover:underline"
                    onClick={() => alert('Password reset is mocked in this demo.')}
                >
                    Forgot password? (Demo only)
                </button>
            </form>

            {/* Customer helper text */}
            <div className="mt-6 text-[11px] text-slate-500 leading-relaxed">
                Are you a customer?
                <br />
                <span className="text-slate-400">
                    Access your portal via the secure link in your quote or invoice email.
                </span>
            </div>

            {/* Demo logins */}
            <DemoLoginList onSelect={handleDemoUser} />

            {/* Customer magic link demos */}
            <div className="mt-6 glass-panel rounded-2xl p-4 border border-white/10 space-y-3">
                <h4 className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                    Customer Magic Link Demos
                </h4>
                <button
                    type="button"
                    onClick={() => {
                        // Login as customer demo user and navigate to dashboard
                        const customerUser = users.find(u => u.role === 'customer');
                        if (customerUser) {
                            login(customerUser.email).then(() => {
                                navigate('/customer/dashboard');
                            });
                        } else {
                            navigate('/customer/dashboard');
                        }
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/25 text-emerald-200 text-xs font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <span>🏠</span> Customer Portal Demo
                </button>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/track/101')}
                        className="px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-white/10 text-slate-200 text-[11px] font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <span>📍</span> Tracker
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/materials/demo-token-101')}
                        className="px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-white/10 text-slate-200 text-[11px] font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <span>📦</span> Materials
                    </button>
                </div>
            </div>
        </AuthLayoutSplit>
    );
}

