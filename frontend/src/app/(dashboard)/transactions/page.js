"use client";
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import {
    ArrowRightLeft,
    Search,
    Filter,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    Plus
} from 'lucide-react';

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await api.get('/transactions');
                setTransactions(res.data);
            } catch (err) {
                console.error('Failed to fetch transactions');
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-outfit">Transactions</h1>
                    <p className="text-neutral-400 mt-1">Full history of all financial exchanges and interest logs.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-600/20">
                    <Plus size={20} />
                    Create New
                </button>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl overflow-hidden backdrop-blur-sm">
                <div className="p-6 border-b border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 max-w-md">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl focus:border-indigo-500 outline-none text-sm transition-all"
                            />
                        </div>
                        <button className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-400 hover:text-white transition-all">
                            <Filter size={20} />
                        </button>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-indigo-400 transition-colors">
                        <Download size={18} />
                        Export CSV
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-neutral-800 bg-neutral-800/20">
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Borrower</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Interest</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {transactions.length > 0 ? transactions.map((t) => (
                                <tr key={t._id} className="hover:bg-neutral-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${t.transactionType === 'Given' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                            {t.transactionType === 'Given' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold text-white">{t.borrowerName}</p>
                                        <p className="text-xs text-neutral-500">{t.contactNumber}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className={`text-sm font-bold ${t.transactionType === 'Given' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            ${t.principalAmount.toLocaleString()}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="px-2.5 py-1 bg-neutral-800 rounded-lg inline-block">
                                            <p className="text-xs font-medium text-neutral-300">{t.interestRate}% {t.interestType}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-neutral-400">
                                        {new Date(t.transactionDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${t.status === 'Active' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-neutral-800 text-neutral-500'}`}>
                                            {t.status}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-20 text-center text-neutral-600">
                                        <div className="flex flex-col items-center gap-2">
                                            <ArrowRightLeft size={48} className="opacity-20" />
                                            <p>No transactions yet. Start by lending or borrowing money.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
