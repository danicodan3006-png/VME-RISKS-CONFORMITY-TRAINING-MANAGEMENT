
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { AlertTriangle, CheckCircle, TrendingUp, AlertCircle, Calendar } from 'lucide-react';

// --- Data & Types ---

const chartData = [
    { year: '2024', accidents: 48 },
    { year: '2025', accidents: 54 },
    { year: '2026', accidents: 58 },
];

const riskDepartments = [
    { name: 'Mining Ops', riskScore: 92, trend: 'up' },
    { name: 'Heavy Maintenance', riskScore: 85, trend: 'stable' },
    { name: 'Logistics', riskScore: 78, trend: 'down' },
];

// --- Components ---

const DarkCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div style={{
        backgroundColor: '#1E1E1E',
        border: '1px solid #333',
        borderRadius: '8px',
        padding: '24px',
        ...((children as any)?.props?.style || {})
    }} className={className}>
        {children}
    </div>
);

const KPICard = ({ title, value, subtext, status }: { title: string, value: string, subtext?: string, status?: 'critical' | 'success' | 'neutral' }) => {
    let statusColor = '#94a3b8'; // neutral
    let badgeBg = '#333';
    let badgeText = '#ccc';

    if (status === 'critical') {
        statusColor = '#ef4444';
        badgeBg = 'rgba(239, 68, 68, 0.2)';
        badgeText = '#ef4444';
    } else if (status === 'success') {
        statusColor = '#22c55e';
        badgeBg = 'rgba(34, 197, 94, 0.2)';
        badgeText = '#22c55e';
    }

    return (
        <DarkCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h3 style={{ color: '#94a3b8', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</h3>
                {status === 'critical' && <AlertTriangle size={20} color={statusColor} />}
                {status === 'success' && <CheckCircle size={20} color={statusColor} />}
            </div>
            <div style={{ fontSize: '42px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                {value}
            </div>
            {subtext && (
                <div style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: badgeBg,
                    color: badgeText,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                }}>
                    {subtext}
                </div>
            )}
        </DarkCard>
    );
};

const ExecutiveSummary = () => {
    const [dateRange, setDateRange] = useState('Monthly');

    return (
        <div style={{
            backgroundColor: '#121212',
            minHeight: '100vh',
            color: 'white',
            padding: '32px',
            fontFamily: '"Inter", sans-serif'
        }}>
            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', letterSpacing: '-0.5px' }}>
                        EXECUTIVE SUMMARY
                    </h1>
                    <p style={{ color: '#64748b' }}>VME 2026 Strategic Risk Overview</p>
                </div>

                {/* Date Selector */}
                <div style={{ display: 'flex', backgroundColor: '#1E1E1E', borderRadius: '8px', padding: '4px', border: '1px solid #333' }}>
                    {['Weekly', 'Monthly'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setDateRange(range)}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: dateRange === range ? '#333' : 'transparent',
                                color: dateRange === range ? 'white' : '#64748b',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '13px',
                                transition: 'all 0.2s'
                            }}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <KPICard
                    title="Accidents 2026"
                    value="58"
                    subtext="CRITICAL OVERFLOW"
                    status="critical"
                />
                <KPICard
                    title="Competencies"
                    value="2,976"
                    subtext="TARGET EXCEEDED"
                    status="success"
                />
                <KPICard
                    title="Fleet Compliance"
                    value="50%"
                    subtext="123 / 246 UNITS ID"
                    status="neutral"
                />
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>

                {/* Main Chart Section */}
                <DarkCard>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>The Strategic Trend</h3>
                            <p style={{ fontSize: '13px', color: '#64748b' }}>Annual Accident Frequency Analysis</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#ef4444' }}>
                            <div style={{ width: '12px', height: '2px', backgroundColor: '#ef4444', borderTop: '2px dashed #ef4444' }}></div>
                            Max Ceiling (48)
                        </div>
                    </div>

                    <div style={{ height: '400px', width: '100%' }}>
                        <ResponsiveContainer>
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="year" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#333', opacity: 0.4 }}
                                    contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: 'white' }}
                                />
                                <ReferenceLine y={48} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: 'Max Ceiling', fill: '#ef4444', fontSize: 12 }} />
                                <Bar dataKey="accidents" radius={[4, 4, 0, 0]} barSize={60}>
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.year === '2026' ? '#ef4444' : '#3b82f6'}
                                            style={{
                                                filter: entry.year === '2026' ? 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.4))' : 'none'
                                            }}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </DarkCard>

                {/* Analytic Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Top Risks */}
                    <DarkCard>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <TrendingUp size={18} color="#ef4444" />
                            Top 3 Risk Departments
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {riskDepartments.map((dept, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: i < 2 ? '1px solid #333' : 'none' }}>
                                    <div>
                                        <p style={{ fontWeight: '600', color: '#e2e8f0', fontSize: '14px' }}>{dept.name}</p>
                                        <p style={{ fontSize: '12px', color: '#64748b' }}>Risk Score: {dept.riskScore}</p>
                                    </div>
                                    <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{dept.trend === 'up' ? '↗' : '→'}</span>
                                </div>
                            ))}
                        </div>
                    </DarkCard>

                    {/* QA/QC Insight */}
                    <DarkCard className="border-l-4 border-l-yellow-500 !border-l-[#f59e0b]">
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                            <AlertCircle size={24} color="#f59e0b" />
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#f59e0b' }}>QA/QC Insight</h3>
                        </div>
                        <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#cbd5e1' }}>
                            Alerte : Le volume de formation n'impacte pas encore la courbe de sécurité. Révision des protocoles VOC suggérée.
                        </p>
                    </DarkCard>

                </div>
            </div>
        </div>
    );
};

export default ExecutiveSummary;
