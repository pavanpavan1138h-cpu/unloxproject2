"use client";
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    Plus
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import Link from 'next/link';

const data = [
    { name: 'Jan', interest: 400 },
    { name: 'Feb', interest: 300 },
    { name: 'Mar', interest: 600 },
    { name: 'Apr', interest: 800 },
    { name: 'May', interest: 500 },
    { name: 'Jun', interest: 900 },
];

export default function DashboardPage() {
    const [summary, setSummary] = useState({
        totalGiven: 0,
        totalTaken: 0,
        totalOutstandingBalance: 0,
        recentTransactions: []
    });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await api.get('/dashboard/summary');
                setSummary(res.data);
            } catch (err) {
                console.error('Failed to fetch summary');
            }
        };
        fetchSummary();
    }, []);

    const stats = [
        { title: 'Total Given', value: summary.totalGiven, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { title: 'Total Taken', value: summary.totalTaken, icon: TrendingDown, color: 'text-rose-400', bg: 'bg-rose-500/10' },
        { title: 'Outstanding', value: summary.totalOutstandingBalance, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        { title: 'Total Revenue', value: summary.totalGiven * 0.05, icon: DollarSign, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-outfit">Financial Dashboard</h1>
                    <p className="text-neutral-400 mt-1">Review your lending activity and interest growth.</p>
                </div>
                <Link
                    href="/transactions"
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                >
                    <Plus size={20} />
                    New Transaction
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.title} className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-3xl backdrop-blur-sm transition-transform hover:translate-y-[-4px]">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-neutral-500 text-sm font-medium">{stat.title}</p>
                        <p className="text-2xl font-bold text-white mt-1 font-outfit">
                            ${stat.value.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-neutral-900/50 border border-neutral-800 p-6 rounded-3xl backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-white mb-6 font-outfit">Interest Over Time</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorInt" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '12px', color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="interest" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorInt)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-3xl backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-white mb-6 font-outfit">Recent Activity</h3>
                    <div className="space-y-4">
                        {summary.recentTransactions.length > 0 ? summary.recentTransactions.map((t) => (
                            <div key={t._id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-neutral-800/50 transition-colors">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.transactionType === 'Given' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                    {t.transactionType === 'Given' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-semibold text-white truncate">{t.borrowerName}</p>
                                    <p className="text-xs text-neutral-500">{new Date(t.transactionDate).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-bold ${t.transactionType === 'Given' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {t.transactionType === 'Given' ? '+' : '-'}${t.principalAmount}
                                    </p>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-12 text-neutral-600">
                                <p>No recent transactions</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
