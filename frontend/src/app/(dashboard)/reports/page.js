"use client";
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import {
    BarChart3,
    Download,
    FileText,
    PieChart,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    Users,
    Wallet
} from 'lucide-react';
import {
    ResponsiveContainer,
    PieChart as RePieChart,
    Pie,
    Cell,
    Tooltip as ReTooltip,
    Legend
} from 'recharts';

export default function ReportsPage() {
    const [summary, setSummary] = useState({
        totalGiven: 0,
        totalTaken: 0,
        totalOutstandingBalance: 0,
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

    const pieData = [
        { name: 'Given', value: summary.totalGiven },
        { name: 'Taken', value: summary.totalTaken },
    ];

    const COLORS = ['#6366f1', '#ec4899'];

    const reports = [
        { id: 1, name: 'Monthly Transaction Summary', type: 'PDF', size: '1.2 MB', date: 'Mar 01, 2026' },
        { id: 2, name: 'Interest Earnings Ledger', type: 'CSV', size: '450 KB', date: 'Feb 28, 2026' },
        { id: 3, name: 'Borrower Outstanding Status', type: 'XLSX', size: '2.1 MB', date: 'Feb 25, 2026' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-outfit">Financial Reports</h1>
                    <p className="text-neutral-400 mt-1">Generate and export detailed financial statements.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all border border-neutral-700">
                        <Filter size={20} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                        <Download size={20} />
                        Export All
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Analytics Card */}
                <div className="lg:col-span-1 bg-neutral-900/50 border border-neutral-800 p-6 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center">
                    <h3 className="text-lg font-bold text-white mb-6 font-outfit self-start flex items-center gap-2">
                        <PieChart size={20} className="text-indigo-400" />
                        Distribution
                    </h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <ReTooltip
                                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend iconType="circle" />
                            </RePieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-full mt-4 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-500">Total Money Flow</span>
                            <span className="text-white font-bold">${(summary.totalGiven + summary.totalTaken).toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                            <div
                                className="bg-indigo-500 h-full"
                                style={{ width: `${(summary.totalGiven / (summary.totalGiven + summary.totalTaken || 1)) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Reports List */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold text-white mb-2 font-outfit flex items-center gap-2">
                        <FileText size={20} className="text-indigo-400" />
                        Available Statements
                    </h3>

                    <div className="space-y-3">
                        {reports.map((report) => (
                            <div key={report.id} className="bg-neutral-900/50 border border-neutral-800 p-5 rounded-2xl flex items-center justify-between hover:bg-neutral-800/40 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold group-hover:text-indigo-400 transition-colors">{report.name}</h4>
                                        <p className="text-xs text-neutral-500 flex items-center gap-2 mt-1">
                                            {report.date} • {report.size} • <span className="text-indigo-500/80 font-bold">{report.type}</span>
                                        </p>
                                    </div>
                                </div>
                                <button className="p-3 bg-neutral-800 hover:bg-indigo-600 text-neutral-400 hover:text-white rounded-xl transition-all shadow-sm">
                                    <Download size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-6 rounded-3xl mt-6 relative overflow-hidden group">
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <BarChart3 size={120} />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Generate Custom Report</h4>
                        <p className="text-sm text-neutral-400 mb-6 max-w-md">
                            Need a specific date range or borrower statement? Our custom engine handles
                            complex filtering and interest recalculations automatically.
                        </p>
                        <button className="px-6 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors active:scale-95">
                            Configure Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
