"use client";
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Wallet, Bell, Search } from 'lucide-react';

export default function DashboardLayout({ children }) {
    const { user, loading } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user && typeof window !== 'undefined' && !localStorage.getItem('token')) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4F7FF] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin shadow-lg" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-[#F4F7FF] text-[#1E1B4B] selection:bg-indigo-100 selection:text-indigo-900 font-inter">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col min-w-0 relative">
                {/* Desktop/Mobile Common Header */}
                <header className="h-20 lg:h-24 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-30 bg-[#F4F7FF]/80 backdrop-blur-md">
                    {/* Mobile Menu Icon */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden p-2.5 bg-white shadow-sm border border-indigo-50 rounded-2xl text-indigo-600 active:scale-95"
                    >
                        <Menu size={24} />
                    </button>

                    {/* User Welcome (Desktop) / App Branding (Mobile) */}
                    <div className="flex flex-col">
                        <h2 className="text-lg lg:text-2xl font-bold font-outfit text-[#1E1B4B]">
                            Hello {user?.name?.split(' ')[0] || 'Monica'}!
                        </h2>
                        <p className="text-xs lg:text-sm text-indigo-400 font-semibold italic">Welcome back</p>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-4">
                        <button className="p-3 bg-white shadow-sm border border-indigo-50 rounded-2xl text-indigo-400 hover:text-indigo-600 transition-all active:scale-95">
                            <Search size={22} />
                        </button>
                        <button className="p-3 bg-white shadow-sm border border-indigo-50 rounded-2xl text-indigo-400 hover:text-indigo-600 transition-all active:scale-95 relative">
                            <Bell size={22} />
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                    </div>
                </header>

                <main className="flex-1 p-6 lg:p-12 overflow-y-auto no-scrollbar pb-32 lg:pb-12">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

                <BottomNav />
            </div>
        </div>
    );
}
