"use client";
import { useState } from 'react';
import {
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    ArrowRight,
    MoreHorizontal
} from 'lucide-react';

const transactions = [
    { id: 1, name: 'Siva', amount: '₹ 5000', label: 'To Pay', date: '21.03 | Today', type: 'out' },
    { id: 2, name: 'Reekshia', amount: '125', label: 'To Pay', date: '21.03 | Today', type: 'out' },
    { id: 3, name: 'Tamishq', amount: '₹ 5000', label: 'To Pay', date: '21.03 | Today', type: 'out' },
    { id: 4, name: 'Tamishq', amount: '₹ 5000', label: 'To Pay', date: '21.03 | Today', type: 'out' },
];

export default function TransactionsPage() {
    const [activeTab, setActiveTab] = useState('upcoming');

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-[#1E1B4B] font-outfit text-primary">Money</h1>
                <div className="flex gap-2">
                    <button className="p-3 bg-white shadow-sm border border-indigo-50 rounded-2xl text-indigo-600 active:scale-95">
                        <Search size={22} />
                    </button>
                    <button className="p-3 bg-white shadow-sm border border-indigo-50 rounded-2xl text-indigo-600 active:scale-95">
                        <Filter size={22} />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-indigo-50 font-outfit">
                {['upcoming', 'outstanding', 'transactions'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 px-2 text-sm font-bold capitalize transition-all relative ${activeTab === tab
                                ? 'text-indigo-600'
                                : 'text-indigo-300'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Transaction List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.2em] font-outfit">Accounts</p>
                    <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider underline">Download Statement</button>
                </div>

                <div className="grid gap-4">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="card-premium flex items-center justify-between p-5">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${tx.type === 'out' ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-600'
                                    }`}>
                                    <div className="w-full h-full rounded-2xl bg-indigo-50 flex items-center justify-center font-bold text-indigo-600">
                                        {tx.name.charAt(0)}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-[#1E1B4B] font-outfit">{tx.name}</h4>
                                    <p className="text-[10px] font-bold text-indigo-300">{tx.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{tx.label}</p>
                                    <p className="text-base font-black text-[#1E1B4B] font-outfit">{tx.amount}</p>
                                </div>
                                <button className="text-indigo-200 hover:text-indigo-400 transition-colors p-1">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Floating Card Indicator */}
            <div className="fixed bottom-28 left-0 right-0 px-6 lg:hidden">
                <div className="max-w-md mx-auto bg-[#6366F1] text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between shadow-indigo-300/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <ArrowUpRight size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase opacity-60">Total to pay today</p>
                            <p className="text-lg font-black font-outfit">₹ 15,225</p>
                        </div>
                    </div>
                    <button className="bg-white text-[#6366F1] p-3 rounded-2xl shadow-sm active:scale-95">
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>

        </div>
    );
}
