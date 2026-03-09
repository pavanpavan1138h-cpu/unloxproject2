"use client";
import { useState } from 'react';
import {
    Calculator,
    ArrowLeft,
    ChevronDown,
    Info,
    RefreshCw,
    Wallet
} from 'lucide-react';
import Link from 'next/link';

export default function InterestCalculatorPage() {
    const [amount, setAmount] = useState('100000');
    const [interest, setInterest] = useState('2');
    const [type, setType] = useState('Simple Interest');
    const [frequency, setFrequency] = useState('Monthly');
    const [period, setPeriod] = useState('1');

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-top-6 duration-700 pb-20">
            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="p-3 bg-white shadow-sm border border-indigo-50 rounded-2xl text-indigo-600 active:scale-95 transition-all">
                    <ArrowLeft size={22} />
                </Link>
                <h1 className="text-2xl font-black text-[#1E1B4B] font-outfit">Interest Calculator</h1>
            </div>

            {/* Results Card */}
            <div className="card-premium bg-gradient-to-br from-[#6366F1] to-[#818CF8] p-8 border-none text-white shadow-2xl shadow-indigo-200 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                    <div className="space-y-4">
                        <div>
                            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">Net Interest</p>
                            <p className="text-3xl font-black font-outfit">₹ 20,000.00</p>
                        </div>
                        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-semibold text-white/50">Loan:</span>
                                <span className="text-xs font-bold">₹ 1000K</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-semibold text-white/50">Total Payable:</span>
                                <span className="text-xs font-bold">₹ 1200K</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
                        <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">Total Period</p>
                        <p className="text-lg font-black font-outfit">10 months <span className="text-white/40 text-xs font-normal ml-2">(₹ 200K / month)</span></p>
                    </div>
                </div>
            </div>

            {/* Form Card */}
            <div className="card-premium p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest ml-1">Principal Amount</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-slate-50 border border-indigo-50 rounded-2xl px-5 py-4 font-bold text-[#1E1B4B] focus:bg-white focus:border-[#6366F1] focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                            />
                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-indigo-200 font-bold">₹</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest ml-1">Interest (%)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={interest}
                                onChange={(e) => setInterest(e.target.value)}
                                className="w-full bg-slate-50 border border-indigo-50 rounded-2xl px-5 py-4 font-bold text-[#1E1B4B] focus:bg-white focus:border-[#6366F1] focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                            />
                            <button className="absolute right-5 top-1/2 -translate-y-1/2 text-indigo-400 group">
                                <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest ml-1">Interest Frequency</label>
                    <div className="relative">
                        <select
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            className="w-full bg-slate-50 border border-indigo-50 rounded-2xl px-5 py-4 font-bold text-[#1E1B4B] focus:bg-white focus:border-[#6366F1] appearance-none outline-none transition-all"
                        >
                            <option>Monthly</option>
                            <option>Yearly</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-indigo-200 pointer-events-none" size={20} />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest ml-1">Interest Type</label>
                    <div className="relative">
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full bg-slate-50 border border-indigo-50 rounded-2xl px-5 py-4 font-bold text-[#1E1B4B] focus:bg-white focus:border-[#6366F1] appearance-none outline-none transition-all"
                        >
                            <option>Simple Interest</option>
                            <option>Compound Interest</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-indigo-200 pointer-events-none" size={20} />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest ml-1">Interest Period</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                            className="w-full bg-slate-50 border border-indigo-50 rounded-2xl px-5 py-4 font-bold text-[#1E1B4B] focus:bg-white focus:border-[#6366F1] focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                        />
                        <button className="absolute right-5 top-1/2 -translate-y-1/2 text-indigo-200 hover:text-[#6366F1] transition-colors">
                            <Calculator size={20} />
                        </button>
                    </div>
                </div>

                <div className="pt-4 flex gap-4">
                    <button className="btn-indigo flex-1 py-5 rounded-[1.8rem]">Calculate Now</button>
                    <button className="p-5 bg-indigo-50 text-indigo-600 rounded-[1.8rem] hover:bg-indigo-100 transition-all">
                        <RefreshCw size={24} />
                    </button>
                </div>
            </div>

        </div>
    );
}
