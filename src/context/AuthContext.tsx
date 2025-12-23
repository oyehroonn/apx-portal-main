import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/types';
import { getUserByEmail } from '@/data/mockData';

const API_BASE_URL = 'http://192.168.100.58:5001/api';

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
        // Try API login first if password is provided
        if (password) {
            try {
                const response = await fetch(`${API_BASE_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

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
                }
            } catch (error) {
                console.error('API login failed, falling back to mock data:', error);
            }
        }
        
        // Fallback to mock data for demo users
        const user = getUserByEmail(email);
        if (user) {
            // Try to get profileID from API if available
            try {
                const response = await fetch(`${API_BASE_URL}/profiles`);
                if (response.ok) {
                    const profiles = await response.json();
                    const profile = profiles.find((p: any) => p.email === email);
                    if (profile) {
                        user.profileID = profile.profileID;
                    }
                }
            } catch (error) {
                console.error('Failed to fetch profileID:', error);
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
