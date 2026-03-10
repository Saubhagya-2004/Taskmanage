import { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return { token, username };
        }
        return null;
    });

    const login = (data) => {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('username', data.username);
        setUser({ token: data.access_token, username: data.username });
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
