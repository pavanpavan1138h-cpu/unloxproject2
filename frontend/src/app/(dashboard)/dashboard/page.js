"use client";
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import {
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Plus,
    ArrowRight,
    TrendingUp,
    History,
    Wallet
} from 'lucide-react';

const stats = [
    { name: 'Total Borrowed', value: '$45,987', sub: 'Today', color: 'indigo' },
    { name: 'Total Returned', value: '$30,000', sub: 'View History', color: 'emerald' },
];

const paymentsDue = [
    { id: 1, name: 'Suresh', amount: '₹ 4000', label: 'today', avatar: 'SP' },
    { id: 2, name: 'Jagrati', amount: '₹ 2400', label: 'today', avatar: 'JT' },
    { id: 3, name: 'Shiva', amount: '₹ 3000', label: 'tomorrow', avatar: 'SH' },
    { id: 4, name: 'Rohit', amount: '₹ 2000', label: 'tomorrow', avatar: 'RH' },
];

const investorPerformance = [
    { id: 1, name: 'Suresh Prabha', date: '03.07.2024', amount: '₹ 200K', rate: '1.5% (3K)', avatar: 'SP' },
    { id: 2, name: 'Jagrati Thakur', date: '03.07.2024', amount: '₹ 100K', rate: '3.0% (3K)', avatar: 'JT' },
    { id: 3, name: 'Shiva', date: '03.07.2024', amount: '₹ 100K', rate: '2.0% (4K)', avatar: 'SH' },
];

export default function DashboardPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">

            {/* Ready to Redeem Card */}
            <section>
                <div className="card-premium bg-white p-8 relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50 group-hover:bg-indigo-100 transition-all duration-700" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <p className="text-sm font-bold text-indigo-300 uppercase tracking-widest mb-2 font-outfit">Ready to redeem</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl md:text-5xl font-black text-[#1E1B4B] font-outfit">₹ 45,987.15</span>
                                <span className="text-indigo-400 font-bold">today</span>
                            </div>
                            <div className="mt-4 flex items-center gap-6">
                                <div>
                                    <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1">Total redeemed</p>
                                    <p className="text-emerald-500 font-bold font-outfit text-base">₹ 30,000.00</p>
                                </div>
                                <button className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 hover:underline">
                                    View History <ArrowRight size={10} />
                                </button>
                            </div>
                        </div>

                        <button className="btn-indigo">
                            Redeem Now
                        </button>
                    </div>
                </div>
            </section>

            {/* Payments Due Horizontal List */}
            <section className="space-y-4">
                <h3 className="text-xl font-bold text-[#1E1B4B] font-outfit flex items-center justify-between">
                    Payments Due
                    <button className="text-xs text-indigo-500 hover:underline">View All</button>
                </h3>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
                    {paymentsDue.map((item) => (
                        <div key={item.id} className="min-w-[120px] bg-white rounded-3xl p-4 shadow-sm border border-indigo-50 flex flex-col items-center gap-3 active:scale-95 transition-all text-center">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-bold text-red-500 mb-1">{item.amount}</span>
                                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{item.label}</span>
                            </div>
                            <div className="w-14 h-14 rounded-full p-0.5 border-2 border-indigo-50">
                                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-indigo-600 font-bold font-outfit">
                                    {item.avatar}
                                </div>
                            </div>
                            <p className="text-xs font-bold text-[#1E1B4B]">{item.name}</p>
                        </div>
                    ))}
                    <button className="min-w-[120px] bg-[#6366F1]/5 border-2 border-dashed border-[#6366F1]/20 rounded-3xl p-4 flex flex-col items-center justify-center gap-2 group hover:bg-[#6366F1]/10 transition-all">
                        <div className="w-12 h-12 rounded-full bg-[#6366F1] flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                            <Plus size={24} />
                        </div>
                        <span className="text-[10px] font-black text-[#6366F1] uppercase tracking-wider">Add More</span>
                    </button>
                </div>
            </section>

            {/* Action Buttons */}
            <section className="grid grid-cols-2 gap-4">
                <button className="btn-indigo w-full py-4 rounded-[2rem] flex items-center justify-center gap-2">
                    <Plus size={20} /> Add Transactions
                </button>
                <button className="bg-[#FF8C42] hover:bg-[#F97316] text-white py-4 rounded-[2rem] font-bold shadow-lg shadow-orange-100 transition-all active:scale-95 flex items-center justify-center gap-2">
                    <TrendingUp size={20} /> Invest Now
                </button>
            </section>

            {/* Investor Performance List */}
            <section className="space-y-4">
                <h3 className="text-xl font-bold text-[#1E1B4B] font-outfit">Investor Performance</h3>
                <div className="space-y-4">
                    {investorPerformance.map((item) => (
                        <div key={item.id} className="card-premium flex items-center justify-between p-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#6366F1] font-black font-outfit shadow-sm">
                                    {item.avatar}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-[#1E1B4B] font-outfit">{item.name}</h4>
                                    <p className="text-[10px] font-bold text-indigo-300">{item.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-black text-[#1E1B4B] font-outfit">{item.amount}</p>
                                <p className="text-[10px] font-bold text-emerald-500">{item.rate}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full py-4 text-xs font-bold text-indigo-500 hover:text-indigo-700 transition-colors uppercase tracking-widest font-outfit">
                    View All Transactions
                </button>
            </section>

        </div>
    );
}
