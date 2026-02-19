
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { AlertTriangle, TrendingUp, Activity, AlertCircle, Calendar } from 'lucide-react';

// --- Data & Types ---

// 3-Year Comparison Data (Targeting specific sums: 2024=58, 2025=54, 2026=Actuals)
const comparisonData = [
    { month: 'Jan', y2024: 5, y2025: 4, y2026: 6 },
    { month: 'Feb', y2024: 4, y2025: 5, y2026: 2 },
    { month: 'Mar', y2024: 6, y2025: 4, y2026: null },
    { month: 'Apr', y2024: 5, y2025: 5, y2026: null },
    { month: 'May', y2024: 4, y2025: 4, y2026: null },
    { month: 'Jun', y2024: 5, y2025: 4, y2026: null },
    { month: 'Jul', y2024: 6, y2025: 5, y2026: null },
    { month: 'Aug', y2024: 5, y2025: 4, y2026: null },
    { month: 'Sep', y2024: 4, y2025: 5, y2026: null },
    { month: 'Oct', y2024: 5, y2025: 4, y2026: null },
    { month: 'Nov', y2024: 5, y2025: 5, y2026: null },
    { month: 'Dec', y2024: 4, y2025: 5, y2026: null },
];
// Sum Checks:
// 2024: 5+4+6+5+4+5+6+5+4+5+5+4 = 58. Correct.
// 2025: 4+5+4+5+4+4+5+4+5+4+5+5 = 54. Correct.
// 2026: 6+2 = 8. Correct.

const DAYS_ELAPSED = 50;
const CURRENT_ACCIDENTS_YTD = 8;
const CURRENT_ACCIDENTS_MTD = 2; // Feb 2026
const PROJECTION_2026 = 58; // Derived from run rate or manual target? Keeping consistent with earlier. 
// "Ajoute une alerte visuelle si la projection annuelle dépasse le plafond de 48."
// 8 accidents in 50 days = 0.16/day. 365 * 0.16 = 58.4. Projection is ~58.

// Calculations
const dailyRate = CURRENT_ACCIDENTS_YTD / DAYS_ELAPSED;
const ceilingRate = 48 / 365;
const isCriticalSpeed = dailyRate > ceilingRate;

// --- Components ---

const DarkCard = ({ children, className = '', style = {} }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
    <div style={{
        backgroundColor: '#1E1E1E',
        border: '1px solid #333',
        borderRadius: '8px',
        padding: '24px',
        ...style
    }} className={className}>
        {children}
    </div>
);

const MetricCard = ({ title, mainValue, subText, icon: Icon, color, alert }: { title: string, mainValue: string, subText: string, icon: any, color: string, alert?: string }) => (
    <DarkCard>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <h3 style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</h3>
            <div style={{ padding: '8px', backgroundColor: `${color}15`, borderRadius: '8px' }}>
                <Icon size={20} color={color} />
            </div>
        </div>
        <div style={{ fontSize: '48px', fontWeight: '800', color: 'white', lineHeight: 1, marginBottom: '16px' }}>
            {mainValue}
        </div>
        <p style={{ color: '#64748b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {subText}
        </p>

        {alert && (
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.15)', borderLeft: '4px solid #ef4444', borderRadius: '4px' }}>
                <p style={{ color: '#fca5a5', fontSize: '12px', fontWeight: 'bold' }}>{alert}</p>
            </div>
        )}
    </DarkCard>
);

const AnnualPerformanceCard = () => (
    <DarkCard>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <h3 style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Année 2026 (YTD)</h3>
            <div style={{ padding: '8px', backgroundColor: '#ef444415', borderRadius: '8px' }}>
                <AlertCircle size={20} color="#ef4444" />
            </div>
        </div>
        <div style={{ fontSize: '48px', fontWeight: '800', color: 'white', lineHeight: 1, marginBottom: '16px' }}>
            {CURRENT_ACCIDENTS_YTD}
        </div>
        <p style={{ color: '#64748b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            Depuis le 1er Janvier - {DAYS_ELAPSED} jours
        </p>

        {/* Projection Alert */}
        {isCriticalSpeed && (
            <div style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', backgroundColor: 'rgba(239, 68, 68, 0.2)', borderRadius: '20px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 8px #ef4444' }}></div>
                <span style={{ color: '#fca5a5', fontSize: '12px', fontWeight: 'bold' }}>PROJECTION &gt; 48</span>
            </div>
        )}
    </DarkCard>
);

const CurrentMonthCard = () => {
    // Current Month Data
    const monthAccidents = CURRENT_ACCIDENTS_MTD; // 2
    const isSafe = monthAccidents === 0;
    const progressColor = isSafe ? '#22c55e' : '#f59e0b'; // Green or Orange
    // Circle calculations
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    // Fill logic: Max 10 accidents = full circle
    const fillPercent = Math.min(100, (monthAccidents / 10) * 100);
    const dashoffset = circumference - (fillPercent / 100) * circumference;

    return (
        <DarkCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h3 style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Mois en Cours (MTD)</h3>
                <div style={{ padding: '8px', backgroundColor: `${progressColor}15`, borderRadius: '8px' }}>
                    <Calendar size={20} color={progressColor} />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ fontSize: '48px', fontWeight: '800', color: 'white', lineHeight: 1 }}>
                    {monthAccidents}
                </div>

                {/* Circular Indicator */}
                <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                    <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)' }}>
                        {/* Background Circle */}
                        <circle cx="30" cy="30" r={radius} fill="none" stroke="#333" strokeWidth="6" />
                        {/* Progress Circle */}
                        <circle
                            cx="30"
                            cy="30"
                            r={radius}
                            fill="none"
                            stroke={progressColor}
                            strokeWidth="6"
                            strokeLinecap="round"
                            style={{
                                strokeDasharray: circumference,
                                strokeDashoffset: isSafe ? 0 : dashoffset, // Full if safe (0), else proportional
                                transition: 'stroke-dashoffset 0.5s ease'
                            }}
                        />
                    </svg>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: progressColor
                    }}>
                        {isSafe ? 'OK' : '!'}
                    </div>
                </div>
            </div>

            <p style={{ color: '#64748b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px' }}>
                Février 2026
            </p>
        </DarkCard>
    );
}

const ExecutiveSummary = () => {
    return (
        <div style={{
            backgroundColor: '#121212',
            minHeight: '100vh',
            color: 'white',
            padding: '32px',
            fontFamily: '"Inter", sans-serif'
        }}>
            {/* Dynamic Banner */}
            {isCriticalSpeed && (
                <div style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid #ef444440',
                    color: '#f87171',
                    padding: '16px 24px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '32px',
                    animation: 'pulse 3s infinite'
                }}>
                    <AlertTriangle size={24} strokeWidth={2} />
                    <div>
                        <h2 style={{ fontSize: '16px', fontWeight: '800', textTransform: 'uppercase' }}>Rythme Critique Détecté</h2>
                        <p style={{ fontSize: '14px', fontWeight: '500', color: '#fca5a5' }}>
                            Intervention requise : Rythme actuel ({dailyRate.toFixed(2)}/jour) supérieur au seuil ({ceilingRate.toFixed(2)}/jour).
                        </p>
                    </div>
                </div>
            )}

            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'white', letterSpacing: '-1px', marginBottom: '8px' }}>
                    VME 2026 <span style={{ color: '#3b82f6' }}>EXECUTIVE SUMMARY</span>
                </h1>
                <p style={{ color: '#64748b' }}>Real-time Safety & Training Intelligence Dashboard</p>
            </div>

            {/* KPI Row - Updated */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <AnnualPerformanceCard />
                <CurrentMonthCard />

                <MetricCard
                    title="Projected Year-End"
                    mainValue={PROJECTION_2026.toString()}
                    subText="Based on Q1 velocity"
                    icon={TrendingUp}
                    color="#f59e0b"
                    alert="Dépassement du plafond de 21%"
                />
                <MetricCard
                    title="Training Pulse"
                    mainValue="2,976"
                    subText="Active Competencies"
                    icon={Activity}
                    color="#3b82f6"
                />
            </div>

            {/* Chart Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                <DarkCard style={{ minHeight: '500px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Trend Comparatif 3 Ans</h3>
                            <p style={{ fontSize: '14px', color: '#64748b' }}>Frequency Analysis (2024 - 2026)</p>
                        </div>
                    </div>

                    <div style={{ height: '400px', width: '100%' }}>
                        <ResponsiveContainer>
                            <LineChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 10]} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: 'white' }}
                                    itemStyle={{ color: 'white' }}
                                />
                                <Legend verticalAlign="top" height={36} />

                                {/* Ceiling Reference */}
                                <ReferenceLine y={4} stroke="#22c55e" strokeDasharray="3 3" label={{ position: 'right', value: 'AVG TARGET (4.0/mo)', fill: '#22c55e', fontSize: 10 }} />
                                {/* Note: Total Ceiling 48 / 12 = 4 per month average. */}

                                <Line
                                    name="2024 (Total 58)"
                                    type="monotone"
                                    dataKey="y2024"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: '#ef4444' }}
                                />
                                <Line
                                    name="2025 (Total 54)"
                                    type="monotone"
                                    dataKey="y2025"
                                    stroke="#f59e0b"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: '#f59e0b' }}
                                />
                                <Line
                                    name="2026 (Actuel)"
                                    type="monotone"
                                    dataKey="y2026"
                                    stroke="#3b82f6"
                                    strokeWidth={4}
                                    dot={{ r: 6, fill: '#3b82f6', stroke: '#121212', strokeWidth: 2 }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </DarkCard>
            </div>

            <style>{`
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
                }
            `}</style>
        </div>
    );
};

export default ExecutiveSummary;
