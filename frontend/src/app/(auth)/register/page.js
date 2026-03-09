"use client";
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { User, Mail, Lock, Phone, UserPlus } from 'lucide-react';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: ''
    });
    const { register } = useAuth();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData.name, formData.email, formData.password, formData.phone);
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to register');
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-indigo-500/10 to-transparent pointer-events-none" />

            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl shadow-xl overflow-hidden relative backdrop-blur-3xl z-10 transition-transform duration-500 hover:scale-[1.01]">

                {/* Header */}
                <div className="px-8 pt-10 pb-6 text-center">
                    <div className="mx-auto bg-purple-500/20 text-purple-400 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                        <UserPlus size={32} />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2 font-outfit">Create Account</h2>
                    <p className="text-neutral-400">Join Unlox to manage your financial tracking effortlessly.</p>
                </div>

                {/* Form */}
                <div className="px-8 pb-10">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-6 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1 relative">
                            <label className="text-sm font-medium text-neutral-300 ml-1">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-white outline-none transition-all"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1 relative">
                            <label className="text-sm font-medium text-neutral-300 ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-white outline-none transition-all"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1 relative">
                            <label className="text-sm font-medium text-neutral-300 ml-1">Phone Number (Optional)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                                    <Phone size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-white outline-none transition-all"
                                    placeholder="+1 234 567 890"
                                />
                            </div>
                        </div>

                        <div className="space-y-1 relative">
                            <label className="text-sm font-medium text-neutral-300 ml-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl text-white outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-2 w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium rounded-xl shadow-[0_4px_14px_0_rgba(168,85,247,0.39)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.23)] transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-neutral-500">
                        Already have an account?{' '}
                        <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
