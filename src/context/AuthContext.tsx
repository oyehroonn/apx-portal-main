import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/types';
import { getUserByEmail, users } from '@/data/mockData';

interface AuthContextType {
    currentUser: User | null;
    login: (email: string) => Promise<void>;
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

    const login = async (email: string) => {
        const user = getUserByEmail(email);
        if (user) {
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
            return '/fm/dashboard';
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
