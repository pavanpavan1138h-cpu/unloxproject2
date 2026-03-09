"use client";
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import {
    Receipt,
    Search,
    Plus,
    Calendar,
    CreditCard,
    User,
    ArrowRight
} from 'lucide-react';

export default function PaymentsPage() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await api.get('/payments');
                setPayments(res.data);
            } catch (err) {
                console.error('Failed to fetch payments');
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-outfit">Payments</h1>
                    <p className="text-neutral-400 mt-1">Track repayments and maintain a clear record of collections.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                    <Plus size={20} />
                    Record Payment
                </button>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl overflow-hidden backdrop-blur-sm">
                <div className="p-6 border-b border-neutral-800">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search by transaction or notes..."
                            className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl focus:border-indigo-500 outline-none text-sm transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-neutral-800 bg-neutral-800/20">
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Payment Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Transaction Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider text-right">Amount Paid</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider text-right">Method</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {payments.length > 0 ? payments.map((p) => (
                                <tr key={p._id} className="hover:bg-neutral-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                                                <Calendar size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-white">
                                                    {new Date(p.paymentDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                                </p>
                                                <p className="text-xs text-neutral-500 truncate max-w-[200px]">{p.notes || 'No notes added'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-sm text-white font-medium">
                                                <User size={14} className="text-neutral-500" />
                                                {p.transactionId?.borrowerName || 'Unknown Borrower'}
                                            </div>
                                            <div className="text-[10px] text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                                                Original Principal: ${p.transactionId?.principalAmount?.toLocaleString()}
                                                <ArrowRight size={8} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="text-base font-bold text-emerald-400">
                                            ${p.amountPaid.toLocaleString()}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-400">
                                            <CreditCard size={12} />
                                            {p.paymentMode}
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-20 text-center text-neutral-600">
                                        <div className="flex flex-col items-center gap-2">
                                            <Receipt size={48} className="opacity-20" />
                                            <p>No repayment records found.</p>
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
