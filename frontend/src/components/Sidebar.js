"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ArrowRightLeft,
    Users,
    Receipt,
    BarChart3,
    Settings,
    LogOut,
    Wallet
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Transactions', icon: ArrowRightLeft, href: '/transactions' },
    { name: 'Borrowers', icon: Users, href: '/borrowers' },
    { name: 'Payments', icon: Receipt, href: '/payments' },
    { name: 'Reports', icon: BarChart3, href: '/reports' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    return (
        <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col h-screen sticky top-0">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Wallet className="text-white" size={24} />
                </div>
                <span className="text-xl font-bold text-white tracking-tight font-outfit">Unlox</span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'
                                }`}
                        >
                            <item.icon size={20} className={isActive ? 'text-indigo-400' : 'group-hover:text-neutral-200'} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-neutral-800 space-y-4">
                <div className="px-4 py-3 bg-neutral-800/50 rounded-2xl flex items-center gap-3 border border-neutral-700/50">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white uppercase">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
                        <p className="text-[10px] text-neutral-500 truncate">{user?.email || 'user@unlox.com'}</p>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all group"
                >
                    <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
