"use client";
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import {
    Users,
    Search,
    Plus,
    MoreVertical,
    Phone,
    Mail,
    ExternalLink
} from 'lucide-react';

export default function BorrowersPage() {
    const [borrowers, setBorrowers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBorrowers = async () => {
            try {
                const res = await api.get('/borrowers');
                setBorrowers(res.data);
            } catch (err) {
                console.error('Failed to fetch borrowers');
            } finally {
                setLoading(false);
            }
        };
        fetchBorrowers();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-outfit">Borrowers</h1>
                    <p className="text-neutral-400 mt-1">Manage profiles and view total debt for your connections.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-600/20">
                    <Plus size={20} />
                    Add Borrower
                </button>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl overflow-hidden backdrop-blur-sm">
                <div className="p-6 border-b border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or phone..."
                            className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl focus:border-indigo-500 outline-none text-sm transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-neutral-800 bg-neutral-800/20">
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Borrower</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider text-right">Outstanding Balance</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {borrowers.length > 0 ? borrowers.map((b) => (
                                <tr key={b._id} className="hover:bg-neutral-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 font-bold">
                                                {b.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-white uppercase">{b.name}</p>
                                                <p className="text-xs text-neutral-500">{b.address || 'No address'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-xs text-neutral-400">
                                                <Phone size={12} /> {b.phone}
                                            </div>
                                            {b.email && (
                                                <div className="flex items-center gap-2 text-xs text-neutral-400">
                                                    <Mail size={12} /> {b.email}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="text-sm font-bold text-white">${b.outstandingBalance.toLocaleString()}</p>
                                        <p className="text-[10px] text-neutral-500 uppercase tracking-tighter">Due soon</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-neutral-500 hover:text-white transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-20 text-center text-neutral-600">
                                        <div className="flex flex-col items-center gap-2">
                                            <Users size={48} className="opacity-20" />
                                            <p>No borrowers found. Add your first borrower to get started.</p>
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
