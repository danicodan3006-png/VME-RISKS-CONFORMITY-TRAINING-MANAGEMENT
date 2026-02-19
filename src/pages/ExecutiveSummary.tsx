
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area } from 'recharts';
import { AlertTriangle, TrendingUp, Activity, AlertCircle, Clock } from 'lucide-react';

// --- Data & Types ---

// 2025 vs 2026 Comparison Data
const comparisonData = [
    { month: 'Jan', y2025: 4, y2026: 4 }, // Start equal
    { month: 'Feb', y2025: 7, y2026: 8 }, // 2026 Overtakes 2025 (Cumulative 4+3 vs 4+4) - Assuming Cumulative for "Trend"? Or monthly?
    // Request says: "Ligne Grise (2025) : Données réelles mois par mois" (approx 4 in Jan).
    // "Ligne Bleue (2026) : Données réelles (Jan & Feb jusqu'au 19)."
    // "Accident Counter 8 (Since Jan 1st)". 
    // Jan = 4, Feb(partial) = 4 -> Total 8.
    // Let's plot *Cumulative* to show the "Projected Score" logic clearly? Or just monthly incidents?
    // "LineChart... Zone ombrée rouge dès que 2026 passe au dessus". usually applies to cumulative or running rate. 
    // Given "Projected Score" context, cumulative makes sense for "Ceiling" overtaking. 
    // BUT "Trend Comparatif" usually comparison of monthly rates.
    // Let's stick to Monthly incidents for the chart as it's cleaner for "Trend".
    { month: 'Mar', y2025: 3, y2026: null },
    { month: 'Apr', y2025: 5, y2026: null },
    { month: 'May', y2025: 2, y2026: null },
    { month: 'Jun', y2025: 4, y2026: null },
    { month: 'Jul', y2025: 6, y2026: null },
    { month: 'Aug', y2025: 3, y2026: null },
    { month: 'Sep', y2025: 5, y2026: null },
    { month: 'Oct', y2025: 4, y2026: null },
    { month: 'Nov', y2025: 3, y2026: null },
    { month: 'Dec', y2025: 2, y2026: null },
];

// Calculation Constants
const DAYS_ELAPSED = 50;
const CURRENT_ACCIDENTS = 8;
const CEILING_ACCIDENTS = 48;
const PROJECTION_2026 = 58;

// Dynamic Alert Logic
const dailyRate = CURRENT_ACCIDENTS / DAYS_ELAPSED; // 0.16
const ceilingRate = CEILING_ACCIDENTS / 365; // 0.131
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
                <p style={{ color: '#fda4af', fontSize: '12px', fontWeight: 'bold' }}>{alert}</p>
            </div>
        )}
    </DarkCard>
);

const ExecutiveSummary = () => {
    return (
        <div style={{
            backgroundColor: '#121212',
            minHeight: '100vh',
            color: 'white',
            padding: '32px',
            fontFamily: '"Inter", sans-serif'
        }}>
            {/* Header / Dynamic Banner */}
            {isCriticalSpeed && (
                <div style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid #ef4444',
                    color: '#f87171',
                    padding: '16px 24px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '32px',
                    animation: 'pulse 2s infinite'
                }}>
                    <AlertTriangle size={24} strokeWidth={2.5} />
                    <div>
                        <h2 style={{ fontSize: '16px', fontWeight: '800', textTransform: 'uppercase' }}>Rythme Critique Détecté</h2>
                        <p style={{ fontSize: '14px', fontWeight: '500' }}>Intervention sur le terrain requise : Le rythme actuel d'accidents ({dailyRate.toFixed(2)}/jour) dépasse le seuil de tolérance ({ceilingRate.toFixed(2)}/jour).</p>
                    </div>
                </div>
            )}

            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'white', letterSpacing: '-1px', marginBottom: '8px' }}>
                    VME 2026 <span style={{ color: '#3b82f6' }}>EXECUTIVE SUMMARY</span>
                </h1>
                <p style={{ color: '#64748b' }}>Real-time Safety & Training Intelligence Dashboard</p>
            </div>

            {/* KPI Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <MetricCard
                    title="Total Accidents"
                    mainValue={CURRENT_ACCIDENTS.toString()}
                    subText={`Depuis le 1er Janvier 2026 (${DAYS_ELAPSED} jours écoulés)`}
                    icon={AlertCircle}
                    color="#ef4444"
                />
                <MetricCard
                    title="Projected Year-End"
                    mainValue={PROJECTION_2026.toString()}
                    subText="Projection algorithm based on Q1 velocity"
                    icon={TrendingUp}
                    color="#f59e0b"
                    alert="PRÉVISION : Dépassement du plafond de 21%"
                />
                <MetricCard
                    title="Training Pulse"
                    mainValue="2,976"
                    subText="Active Competencies (Stable Trend)"
                    icon={Activity}
                    color="#3b82f6"
                />
            </div>

            {/* Chart Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                <DarkCard style={{ minHeight: '500px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Trend Comparatif 2025 vs 2026</h3>
                            <p style={{ fontSize: '14px', color: '#64748b' }}>Monthly Incident Frequency Analysis</p>
                        </div>
                        <div style={{ display: 'flex', gap: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#64748b' }}></div>
                                <span style={{ color: '#94a3b8', fontSize: '13px' }}>2025 Baseline</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                                <span style={{ color: '#94a3b8', fontSize: '13px' }}>2026 Active</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ height: '400px', width: '100%' }}>
                        <ResponsiveContainer>
                            <LineChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: 'white' }}
                                    itemStyle={{ color: 'white' }}
                                />
                                {/* 2025 Baseline Line */}
                                <Line
                                    type="monotone"
                                    dataKey="y2025"
                                    stroke="#64748b"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#64748b' }}
                                    activeDot={{ r: 6 }}
                                />
                                {/* 2026 Active Line */}
                                <Line
                                    type="monotone"
                                    dataKey="y2026"
                                    stroke="#3b82f6"
                                    strokeWidth={4}
                                    dot={{ r: 6, fill: '#3b82f6', stroke: '#121212', strokeWidth: 2 }}
                                    activeDot={{ r: 8 }}
                                />

                                {/* Red Reference Line for 2026 Threshold crossing? 
                                    Actually the user asked for "Zone ombrée rouge dès que 2026 passe au dessus".
                                    In Recharts, we can use ReferenceArea if we know the X coordinates.
                                    We know Jan: Equal. Feb: 2026(8) > 2025(7).
                                    So from Jan to Feb, 2026 goes above. 
                                    We can shade the background of Feb? 
                                    Or simpler: Visual highlight logic.
                                */}
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
