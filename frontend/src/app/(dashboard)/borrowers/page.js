"use client";
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import {
    Search,
    Plus,
    MoreHorizontal,
    Phone,
    Mail,
    ChevronRight,
    UserPlus
} from 'lucide-react';

const mockBorrowers = [
    { id: 1, name: 'Shiva', phone: '+91 1234567890', amount: '₹ 100K', avatar: 'SH' },
    { id: 2, name: 'Dhruv', phone: '+91 1234567890', amount: '₹ 50K', avatar: 'DH' },
    { id: 3, name: 'Shreya', phone: '+91 1234567890', amount: '₹ 200K', avatar: 'SR' },
    { id: 4, name: 'Daksh Sathan', phone: '+91 1234567890', amount: '₹ 150K', avatar: 'DS' },
];

export default function BorrowersPage() {
    const [activeTab, setActiveTab] = useState('investors');

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-[#1E1B4B] font-outfit">Accounts</h1>
                <button className="p-3 bg-white shadow-sm border border-indigo-50 rounded-2xl text-indigo-600 active:scale-95">
                    <Search size={24} />
                </button>
            </div>

            {/* Segmented Control */}
            <div className="bg-indigo-50/50 p-1.5 rounded-[1.5rem] flex gap-2 border border-indigo-100/50">
                <button
                    onClick={() => setActiveTab('investors')}
                    className={`flex-1 py-3 px-6 rounded-2xl font-bold font-outfit text-sm transition-all ${activeTab === 'investors'
                            ? 'bg-[#6366F1] text-white shadow-lg shadow-indigo-200'
                            : 'text-indigo-400 hover:text-indigo-600'
                        }`}
                >
                    Investors
                </button>
                <button
                    onClick={() => setActiveTab('myaccounts')}
                    className={`flex-1 py-3 px-6 rounded-2xl font-bold font-outfit text-sm transition-all ${activeTab === 'myaccounts'
                            ? 'bg-[#6366F1] text-white shadow-lg shadow-indigo-200'
                            : 'text-indigo-400 hover:text-indigo-600'
                        }`}
                >
                    My Accounts
                </button>
            </div>

            {/* List Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.2em]">Accounts</p>
                </div>

                <div className="space-y-4">
                    {mockBorrowers.map((person) => (
                        <div key={person.name} className="card-premium flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#6366F1] font-black font-outfit shadow-sm text-lg">
                                    {person.avatar}
                                </div>
                                <div>
                                    <h4 className="text-base font-black text-[#1E1B4B] font-outfit">{person.name}</h4>
                                    <p className="text-[10px] font-bold text-indigo-300">{person.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-bold text-indigo-400">Total</p>
                                    <p className="text-sm font-black text-[#1E1B4B] font-outfit">{person.amount}</p>
                                </div>
                                <button className="text-indigo-500 font-bold text-xs hover:underline flex items-center gap-1 font-outfit">
                                    More <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <button className="w-full py-5 border-2 border-dashed border-indigo-200 rounded-[2rem] flex items-center justify-center gap-3 text-indigo-500 hover:bg-white hover:border-indigo-400 transition-all font-bold font-outfit active:scale-[0.98]">
                        <UserPlus size={20} /> New Investor
                    </button>
                </div>
            </div>

            {/* Search Input Placeholder */}
            <div className="fixed top-0 left-0 w-full h-full bg-black/20 z-50 pointer-events-none opacity-0 transition-opacity">
                {/* Search Modal would go here */}
            </div>

        </div>
    );
}
