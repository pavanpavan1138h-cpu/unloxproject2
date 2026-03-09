"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../utils/api';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/auth/profile');
                setUser(res.data);
            } catch (err) {
                setUser(null);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        if (typeof window !== 'undefined' && localStorage.getItem('token')) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        router.push('/dashboard');
    };

    const register = async (name, email, password, phone) => {
        const res = await api.post('/auth/register', { name, email, password, phone });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        router.push('/dashboard');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return { user, loading, login, register, logout };
};
