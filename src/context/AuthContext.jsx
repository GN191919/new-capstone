import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email === 'test@example.com' && password === 'password123') {
                    const userData = {
                        email,
                        name: 'Test User',
                        role: 'admin',
                        language: localStorage.getItem('language') || 'en'
                    };
                    setUser(userData);
                    localStorage.setItem('user', JSON.stringify(userData));
                    resolve({ success: true });
                } else {
                    resolve({ 
                        success: false, 
                        error: 'Invalid credentials. Use test@example.com / password123'
                    });
                }
                setLoading(false);
            }, 800);
        });
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