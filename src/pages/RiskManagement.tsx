
import React from 'react';
import { ShieldCheck, AlertTriangle, TrendingDown, CheckSquare } from 'lucide-react';
import { RiskPieChart, RiskTrendChart } from '../components/risk/RiskCharts';
import RiskTable from '../components/risk/RiskTable';
import SafetyOverview from '../components/safety/SafetyOverview';

// Mock Data
const kpiData = [
    { title: 'Total Risks Identified', value: '1,248', change: '+12%', icon: AlertTriangle, color: '#f59e0b' },
    { title: 'Critical Issues Open', value: '3', change: '-2', icon: ShieldCheck, color: '#ef4444' }, // Red for critical
    { title: 'Mitigation Rate', value: '94%', change: '+1.5%', icon: TrendingDown, color: '#22c55e' },
    { title: 'Safety Inspections', value: '85', change: '+5', icon: CheckSquare, color: '#3b82f6' },
];

const pieData = [
    { name: 'Critical', value: 5 },
    { name: 'High', value: 15 },
    { name: 'Medium', value: 45 },
    { name: 'Low', value: 35 },
];

const trendData = [
    { name: 'Jan', open: 65, mitigated: 40 },
    { name: 'Feb', open: 59, mitigated: 45 },
    { name: 'Mar', open: 80, mitigated: 55 },
    { name: 'Apr', open: 81, mitigated: 60 },
    { name: 'May', open: 56, mitigated: 80 },
    { name: 'Jun', open: 55, mitigated: 90 },
];

const RiskManagement = () => {
    return (
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>Risk Management Dashboard</h1>
                    <p style={{ color: '#64748b' }}>Overview of operational risks, safety compliance, and mitigation status.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{
                        padding: '10px 20px',
                        backgroundColor: '#d32f2f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px -1px rgba(211, 47, 47, 0.4)'
                    }}>
                        + Log New Risk
                    </button>
                </div>
            </div>

            {/* KPI Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                {kpiData.map((kpi, index) => (
                    <div key={index} style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                        border: '1px solid #f1f5f9',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div>
                                <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '500', marginBottom: '4px' }}>{kpi.title}</p>
                                <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a' }}>{kpi.value}</h3>
                            </div>
                            <div style={{
                                padding: '12px',
                                borderRadius: '12px',
                                backgroundColor: `${kpi.color}15`, // 15% opacity
                                color: kpi.color
                            }}>
                                <kpi.icon size={24} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                            <span style={{
                                color: kpi.change.startsWith('+') ? '#22c55e' : '#ef4444',
                                fontWeight: '700',
                                backgroundColor: kpi.change.startsWith('+') ? '#dcfce7' : '#fee2e2',
                                padding: '2px 6px',
                                borderRadius: '4px'
                            }}>
                                {kpi.change}
                            </span>
                            <span style={{ color: '#94a3b8' }}>from last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                {/* Risk Distribution Chart */}
                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                    <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>Risk Severity Distribution</h3>
                        <button style={{ color: '#3b82f6', background: 'none', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>View Details</button>
                    </div>
                    <RiskPieChart data={pieData} />
                </div>

                {/* Risk Trend Chart */}
                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                    <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>Risk Identification vs Mitigation</h3>
                        <select style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px' }}>
                            <option>Last 6 Months</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <RiskTrendChart data={trendData} />
                </div>
            </div>

            {/* Risk List / Red List Section */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', overflow: 'hidden', marginBottom: '32px' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>Active Risk Registry (Red List)</h3>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>Detailed view of all open and monitored risks.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <input
                            type="text"
                            placeholder="Search risks..."
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '240px' }}
                        />
                        <button style={{ padding: '8px 16px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Filter</button>
                        <button style={{ padding: '8px 16px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Export</button>
                    </div>
                </div>
                <RiskTable />
                {/* Pagination (Visual Only) */}
                <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', fontSize: '14px' }}>
                    <span>Showing 1-5 of 48 risks</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white', cursor: 'pointer' }}>Previous</button>
                        <button style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white', cursor: 'pointer' }}>Next</button>
                    </div>
                </div>
            </div>

            {/* Safety Overview Section */}
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>Safety Module</h2>
                <SafetyOverview />
            </div>

            <div style={{ height: '40px' }} /> {/* Spacer */}
        </div>
    );
};

export default RiskManagement;
