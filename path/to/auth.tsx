import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../../interfaces';
import {useRouter} from "next/router";

type AuthContextType = {
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            const userFromToken = JSON.parse(token);
            setUser(userFromToken);
        }
    }, []);
    const jwt = require('jsonwebtoken');
    const secretKey = 'mysecretkey';

    const login = (user: User) => {
        setIsAuthenticated(true);
        const token = jwt.sign({ user: user }, secretKey, { algorithm: 'HS256' });
        localStorage.setItem('token', token);
        setUser(user);
        router.push('/');
    };
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return { ...context };
};