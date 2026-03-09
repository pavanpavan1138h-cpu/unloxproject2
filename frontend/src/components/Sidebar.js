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
    X,
    Bell,
    Settings
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const menuItems = [
    { name: 'Home', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Accounts', icon: Users, href: '/borrowers' },
    { name: 'Money', icon: ArrowRightLeft, href: '/transactions' },
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
                    className="fixed inset-0 bg-indigo-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-indigo-50 flex flex-col h-screen 
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#6366F1] rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                            <Wallet className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-bold text-[#1E1B4B] tracking-tight font-outfit">Unlox</span>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-indigo-300 hover:text-indigo-600 lg:hidden transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-6 py-4 space-y-2 overflow-y-auto no-scrollbar">
                    <p className="px-4 text-[10px] font-bold text-indigo-300 uppercase tracking-[0.2em] mb-4">Main Menu</p>
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${isActive
                                        ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                                        : 'text-indigo-400 hover:bg-slate-50 hover:text-indigo-600'
                                    }`}
                            >
                                <item.icon size={22} className={isActive ? 'text-indigo-600' : 'group-hover:text-indigo-600 transition-colors'} />
                                <span className="font-bold font-outfit text-[15px]">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-indigo-50 space-y-4">
                    <div className="px-4 py-4 bg-slate-50 rounded-[1.5rem] flex items-center gap-3 border border-indigo-50 shadow-inner group cursor-pointer hover:bg-white transition-all">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white uppercase shrink-0">
                            {user?.name?.charAt(0) || 'M'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-[#1E1B4B] truncate font-outfit">{user?.name || 'Monica Bhalla'}</p>
                            <p className="text-[10px] text-indigo-300 truncate font-semibold">Premium Member</p>
                        </div>
                        <Settings size={16} className="text-indigo-200 group-hover:text-indigo-400 transition-colors" />
                    </div>

                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-4 text-indigo-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group active:scale-95"
                    >
                        <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
                        <span className="font-bold font-outfit text-[15px]">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
