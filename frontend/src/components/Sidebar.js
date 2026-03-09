"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ArrowRightLeft,
    Users,
    Receipt,
    BarChart3,
    LogOut,
    Wallet,
    X
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Transactions', icon: ArrowRightLeft, href: '/transactions' },
    { name: 'Borrowers', icon: Users, href: '/borrowers' },
    { name: 'Payments', icon: Receipt, href: '/payments' },
    { name: 'Reports', icon: BarChart3, href: '/reports' },
];

export default function Sidebar({ isOpen, setIsOpen }) {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-neutral-900 border-r border-neutral-800 flex flex-col h-screen 
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Wallet className="text-white" size={24} />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight font-outfit">Unlox</span>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-neutral-400 hover:text-white lg:hidden transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
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
                    <div className="px-4 py-3 bg-neutral-800/50 rounded-2xl flex items-center gap-3 border border-neutral-700/50 shadow-inner">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white uppercase shrink-0">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
                            <p className="text-[10px] text-neutral-500 truncate">{user?.email || 'user@unlox.com'}</p>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all group active:scale-95"
                    >
                        <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
