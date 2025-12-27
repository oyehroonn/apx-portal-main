import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/types';
import { getUserByEmail } from '@/data/mockData';

const API_BASE_URL = 'http://127.0.0.1:5001/api';

interface AuthContextType {
    currentUser: User | null;
    login: (email: string, password?: string) => Promise<void>;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        // Load user from sessionStorage on mount
        const storedUser = sessionStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password?: string) => {
        // Skip API calls for demo logins (password === 'demo')
        const isDemoLogin = password === 'demo';
        
        // Try API login first if password is provided and not demo
        if (password && !isDemoLogin) {
            try {
                // Add timeout to prevent hanging
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 3000); // Reduced to 3 seconds
                
                const response = await fetch(`${API_BASE_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (response.ok) {
                    const data = await response.json();
                    const profile = data.profile;
                    
                    // Convert API profile to User format
                    const user: User = {
                        id: parseInt(profile.profileID?.replace(/\D/g, '') || '0') || 0,
                        name: profile.email?.split('@')[0] || 'User',
                        email: profile.email,
                        role: profile.user_role as User['role'],
                        profileID: profile.profileID,
                    };
                    
                    setCurrentUser(user);
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    return;
                } else {
                    // API returned error, fall through to mock data
                    console.warn('API login failed with status:', response.status);
                }
            } catch (error: any) {
                // Only log if it's not an abort (timeout)
                if (error.name !== 'AbortError') {
                    console.error('API login failed, falling back to mock data:', error);
                }
                // Fall through to mock data
            }
        }
        
        // Fallback to mock data for demo users
        const user = getUserByEmail(email);
        if (user) {
            // Skip profileID fetch for demo logins to speed up
            if (!isDemoLogin) {
                // Try to get profileID from API if available (non-blocking, fire and forget)
                fetch(`${API_BASE_URL}/profiles`)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        return null;
                    })
                    .then(profiles => {
                        if (profiles) {
                            const profile = profiles.find((p: any) => p.email === email);
                            if (profile && user) {
                                user.profileID = profile.profileID;
                                setCurrentUser(user);
                                sessionStorage.setItem('currentUser', JSON.stringify(user));
                            }
                        }
                    })
                    .catch(() => {
                        // Silently fail - profileID is optional
                    });
            }
            
            setCurrentUser(user);
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            throw new Error('User not found');
        }
    };

    const logout = () => {
        setCurrentUser(null);
        sessionStorage.removeItem('currentUser');
    };

    const updateUser = (updates: Partial<User>) => {
        if (currentUser) {
            const updatedUser = { ...currentUser, ...updates };
            setCurrentUser(updatedUser);
            sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                login,
                logout,
                updateUser,
                isAuthenticated: !!currentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

// Helper to get dashboard route by role
export function getDashboardRoute(role: User['role']): string {
    switch (role) {
        case 'admin':
            return '/admin/dashboard';
        case 'fm':
            // FM dashboard is kept in codebase but not exposed in the UI
            return '/login';
        case 'contractor':
            return '/contractor/dashboard';
        case 'investor':
            return '/investor/dashboard';
        case 'customer':
            return '/customer/dashboard';
        default:
            return '/login';
    }
}
