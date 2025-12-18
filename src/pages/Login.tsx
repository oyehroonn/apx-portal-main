import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, getDashboardRoute } from '@/context/AuthContext';
import { users } from '@/data/mockData';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { Home } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email);
            const user = users.find((u) => u.email === email);
            if (user) {
                navigate(getDashboardRoute(user.role));
            }
        } catch (err) {
            setError('User not found. Please select a demo user or enter a valid email.');
        } finally {
            setLoading(false);
        }
    };

    const handleDemoUser = async (userEmail: string) => {
        setEmail(userEmail);
        setPassword('demo');
        try {
            await login(userEmail);
            const user = users.find((u) => u.email === userEmail);
            if (user) {
                navigate(getDashboardRoute(user.role));
            }
        } catch (err) {
            setError('Error logging in');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/src/assets/login-bg.png')`,
                }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/70 to-violet-900/80" />

            {/* Content */}
            <div className="w-full max-w-md space-y-8 animate-fade-in relative z-10">
                {/* Logo and Title */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4 shadow-lg shadow-purple-500/50">
                        <Home className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold gradient-text">Apex Home Services</h1>
                    <p className="mt-2 text-gray-300">Welcome back! Please login to your account.</p>
                </div>

                {/* Login Form */}
                <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border-white/20 dark:border-white/10">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <Input
                            label="Email or Phone"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />

                        {error && (
                            <div className="text-red-300 text-sm bg-red-500/20 border border-red-400/30 rounded-lg p-3">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>

                        <button
                            type="button"
                            className="w-full text-sm text-purple-300 hover:text-purple-200 smooth-transition"
                            onClick={() => alert('Password reset is mocked in this demo.')}
                        >
                            Forgot password?
                        </button>
                    </form>
                </Card>

                {/* Customer Access Info */}
                <div className="text-center">
                    <p className="text-gray-300 text-sm">
                        Are you a customer?
                        <br />
                        <span className="text-purple-300">Access your portal via the link in your quote/invoice email.</span>
                    </p>
                </div>

                {/* Demo User Picker */}
                <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border-white/20 dark:border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Demo Login</h3>
                    <div className="space-y-2">
                        {users.map((user) => (
                            <button
                                key={user.id}
                                onClick={() => handleDemoUser(user.email)}
                                className="w-full px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 smooth-transition text-left group"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-white group-hover:text-purple-200 smooth-transition">{user.name}</p>
                                        <p className="text-sm text-gray-300 group-hover:text-gray-200">{user.email}</p>
                                    </div>
                                    <span className="text-xs px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/40 group-hover:bg-purple-500/40 smooth-transition">
                                        {user.role.toUpperCase()}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Customer Magic Link Demos */}
                    <div className="pt-4 border-t border-white/10 mt-4">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Customer Access (Public Links)</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => navigate('/track/101')}
                                className="px-3 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/20 text-blue-200 text-xs font-medium smooth-transition flex items-center justify-center gap-2"
                            >
                                <span>📍</span> Tracker
                            </button>
                            <button
                                onClick={() => navigate('/materials/demo-token-101')}
                                className="px-3 py-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-400/20 text-green-200 text-xs font-medium smooth-transition flex items-center justify-center gap-2"
                            >
                                <span>📦</span> Materials
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
