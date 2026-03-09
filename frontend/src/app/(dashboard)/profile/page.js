"use client";
import { useAuth } from '@/hooks/useAuth';
import {
    User,
    Settings,
    Lock,
    HelpCircle,
    ChevronRight,
    Camera,
    Globe,
    Database,
    ShieldCheck,
    Smartphone,
    Info
} from 'lucide-react';

const settingsGroups = [
    {
        title: 'General',
        items: [
            { id: 'lang', name: 'Change Language', icon: Globe },
            { id: 'theme', name: 'Theme', icon: Smartphone, extra: 'Light Mode' },
            { id: 'set', name: 'Settings', icon: Settings },
        ]
    },
    {
        title: 'Security',
        items: [
            { id: 'sec', name: 'Security', icon: ShieldCheck },
            { id: 'st', name: 'Storage', icon: Database },
            { id: 'ex', name: 'Export', icon: Lock },
        ]
    },
    {
        title: 'Support',
        items: [
            { id: 'sup', name: 'Support Portal', icon: HelpCircle },
            { id: 'man', name: 'User Manual', icon: Info },
            { id: 'con', name: 'Contact', icon: User },
        ]
    }
];

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <div className="max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-32">
            <h1 className="text-3xl font-black text-[#1E1B4B] font-outfit px-2">Profile</h1>

            {/* User Profile Header */}
            <div className="flex flex-col items-center">
                <div className="relative group cursor-pointer active:scale-95 transition-all">
                    <div className="w-28 h-28 rounded-[2.5rem] bg-indigo-50 border-4 border-white shadow-xl flex items-center justify-center text-4xl font-black text-indigo-600 font-outfit">
                        {user?.name?.charAt(0) || 'M'}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[#6366F1] text-white p-2.5 rounded-2xl shadow-lg border-2 border-white">
                        <Camera size={18} />
                    </div>
                </div>
                <h2 className="mt-6 text-xl font-black text-[#1E1B4B] font-outfit">{user?.name || 'Monica Bhalla'}</h2>
                <p className="text-xs font-bold text-indigo-300 italic">Financial Advisor</p>
            </div>

            {/* Settings Sections */}
            {settingsGroups.map((group) => (
                <div key={group.title} className="space-y-3">
                    <p className="px-5 text-[10px] font-bold text-indigo-200 uppercase tracking-[0.2em]">{group.title}</p>
                    <div className="card-premium p-1 space-y-px overflow-hidden">
                        {group.items.map((item, idx) => (
                            <button
                                key={item.id}
                                className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-all group active:bg-indigo-50/50 ${idx !== group.items.length - 1 ? 'border-b border-indigo-50/50' : ''
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <item.icon size={20} className="text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                                    <span className="text-sm font-bold text-[#474554] group-hover:text-[#1E1B4B] font-outfit">{item.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {item.extra && <span className="text-[10px] font-bold text-indigo-300 italic">{item.extra}</span>}
                                    <ChevronRight size={18} className="text-indigo-100 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            <button className="w-full py-5 text-red-500 font-black font-outfit text-sm hover:underline active:scale-95 transition-all">
                Log Out Account
            </button>
        </div>
    );
}
