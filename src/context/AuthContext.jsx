import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await authService.login(email, password);
            setUser(response.user);
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                error: error.message || 'Invalid email or password. Please try again.'
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        const currentLanguage = localStorage.getItem('language');
        setUser(null);
        localStorage.removeItem('user');
        if (currentLanguage) {
            localStorage.setItem('language', currentLanguage);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;