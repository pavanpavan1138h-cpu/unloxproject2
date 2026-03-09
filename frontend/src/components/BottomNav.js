"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    Users,
    ArrowRightLeft,
    Receipt,
    UserCircle
} from 'lucide-react';

const mobileItems = [
    { name: 'Home', icon: Home, href: '/dashboard' },
    { name: 'Accounts', icon: Users, href: '/borrowers' },
    { name: 'Money', icon: ArrowRightLeft, href: '/transactions' },
    { name: 'Payments', icon: Receipt, href: '/payments' },
    { name: 'Profile', icon: UserCircle, href: '/profile' },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
            <div className="max-w-md mx-auto bg-indigo-900/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] flex items-center justify-between px-2 py-2 shadow-2xl pointer-events-auto">
                {mobileItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center justify-center p-3 rounded-full transition-all active:scale-90 ${isActive
                                    ? 'bg-white text-indigo-900 shadow-lg'
                                    : 'text-white/60 hover:text-white'
                                }`}
                        >
                            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            <span className={`text-[10px] font-bold mt-1 ${isActive ? 'block' : 'hidden'}`}>{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
