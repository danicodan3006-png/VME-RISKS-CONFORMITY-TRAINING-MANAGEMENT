

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { AlertTriangle, TrendingUp, AlertCircle, Shield } from 'lucide-react';

// --- Data & Types ---

// 3-Year Comparison Data
const comparisonData = [
    { month: 'Jan', y2024: 5, y2025: 4, y2026: 4 },
    { month: 'Feb', y2024: 4, y2025: 5, y2026: 3 },
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

const DAYS_ELAPSED = 50;
const CURRENT_ACCIDENTS_YTD = 7;
const CURRENT_ACCIDENTS_MTD = 3; // Feb 2026
const PROJECTION_2026 = Math.round((7 / 50) * 365); // Dynamic calculation based on user data 7 YTD / 50 days

// Calculations
const dailyRate = CURRENT_ACCIDENTS_YTD / DAYS_ELAPSED;
const ceilingRate = 48 / 365;
const isCriticalSpeed = dailyRate > ceilingRate;

// --- Components ---

const SlimCard = ({ title, mainValue, subText, icon: Icon, color, alert }: { title: string, mainValue: string, subText: string, icon: any, color: string, alert?: string }) => (
    <div style={{
        backgroundColor: '#1E1E1E',
        border: '1px solid #333',
        borderRadius: '6px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</h3>
            <div style={{ padding: '6px', backgroundColor: `${color}15`, borderRadius: '6px' }}>
                <Icon size={16} color={color} />
            </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: 'white', lineHeight: 1 }}>
                {mainValue}
            </div>
            {alert && (
                <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#fca5a5', padding: '2px 6px', backgroundColor: 'rgba(239, 68, 68, 0.2)', borderRadius: '4px' }}>
                    ! {alert}
                </span>
            )}
        </div>
        <p style={{ color: '#64748b', fontSize: '11px', marginTop: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {subText}
        </p>
    </div>
);

const MtdSlimCard = () => {
    const monthAccidents = CURRENT_ACCIDENTS_MTD; // 2
    const isSafe = (monthAccidents as number) === 0;
    const progressColor = isSafe ? '#22c55e' : '#f59e0b';
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const fillPercent = Math.min(100, (monthAccidents / 10) * 100);
    const dashoffset = circumference - (fillPercent / 100) * circumference;

    return (
        <div style={{
            backgroundColor: '#1E1E1E',
            border: '1px solid #333',
            borderRadius: '6px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%'
        }}>
            <div>
                <h3 style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Current Month (MTD)</h3>
                <div style={{ fontSize: '32px', fontWeight: '800', color: 'white', lineHeight: 1 }}>
                    {monthAccidents}
                </div>
                <p style={{ color: '#64748b', fontSize: '11px', marginTop: '4px' }}>Feb 2026</p>
            </div>

            <div style={{ position: 'relative', width: '48px', height: '48px' }}>
                <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="24" cy="24" r={radius} fill="none" stroke="#333" strokeWidth="4" />
                    <circle
                        cx="24"
                        cy="24"
                        r={radius}
                        fill="none"
                        stroke={progressColor}
                        strokeWidth="4"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: isSafe ? 0 : dashoffset,
                            transition: 'stroke-dashoffset 0.5s ease'
                        }}
                    />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', color: progressColor }}>
                    {isSafe ? 'OK' : '!'}
                </div>
            </div>
        </div>
    )
}

const SafetyClockCard = () => (
    <div style={{
        backgroundColor: '#1E1E1E',
        border: '1px solid #333',
        borderRadius: '6px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        position: 'relative',
        textAlign: 'center'
    }}>
        <div style={{ position: 'absolute', top: '12px', right: '12px', padding: '6px', backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '6px' }}>
            <Shield size={16} color="#22c55e" />
        </div>
        <h3 style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            DAYS WITHOUT INCIDENT
        </h3>
        <div style={{
            fontSize: '48px',
            fontWeight: '900',
            color: '#22c55e',
            lineHeight: 1,
            textShadow: '0 0 15px rgba(34, 197, 94, 0.4)'
        }}>
            3
        </div>
        <p style={{ color: '#64748b', fontSize: '10px', marginTop: '10px' }}>
            Since last recorded incident (Feb 17, 2026)
        </p>
    </div>
);

const ExecutiveSummary = () => {
    return (
        <div style={{
            backgroundColor: '#121212',
            height: '100%', // Take full height from layout
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            padding: '16px', // Reduced padding
            fontFamily: '"Inter", sans-serif',
            overflow: 'hidden' // Mission Control non-scroll preference
        }}>


            {/* Page Header - Internal Branding */}
            <div style={{ marginBottom: '16px', flexShrink: 0 }}>
                <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#3b82f6', letterSpacing: '1px', lineHeight: 1 }}>
                    VME EXECUTIVE SUMMARY
                </h1>
                <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>
                    2026 Risk Management & Digital Safety Suite
                </p>
            </div>

            {/* Top Banner Row - High Density */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                gap: '16px',
                height: '110px',
                marginBottom: '16px',
                flexShrink: 0
            }}>
                <SlimCard
                    title="Annual Accidents 2026 (YTD)"
                    mainValue={CURRENT_ACCIDENTS_YTD.toString()}
                    subText={`Since Jan 1st - ${DAYS_ELAPSED} days`}
                    icon={AlertCircle}
                    color="#ef4444"
                    alert="CRITICAL PACE"
                />
                <MtdSlimCard />
                <SlimCard
                    title="Projected Year-End"
                    mainValue={PROJECTION_2026.toString()}
                    subText="Based on Q1 velocity"
                    icon={TrendingUp}
                    color="#f59e0b"
                    alert="+21% > Ceiling"
                />
                <SafetyClockCard />
            </div>

            {/* Central Chart Area - Maximized */}
            <div style={{
                flex: 1,
                backgroundColor: '#1E1E1E',
                border: '1px solid #333',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0 // Allow flex shrink
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexShrink: 0 }}>
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>3-Year Safety Trend Analysis</h3>
                        <p style={{ fontSize: '13px', color: '#64748b' }}>Monthly Incident Frequency Comparison (2024 - 2026)</p>
                    </div>
                    {/* Alerts inline if space permits */}
                    {isCriticalSpeed && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                            <AlertTriangle size={16} color="#ef4444" />
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#fca5a5' }}>CRITICAL RUN RATE DETECTED</span>
                        </div>
                    )}
                </div>

                <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={comparisonData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 10]} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: 'white' }}
                                itemStyle={{ color: 'white' }}
                            />
                            <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingBottom: '10px' }} />

                            <ReferenceLine y={4} stroke="#22c55e" strokeDasharray="3 3" label={{ position: 'insideTopRight', value: 'Safety Ceiling (Max 48)', fill: '#22c55e', fontSize: 11, fontWeight: 'bold' }} />

                            <Line
                                name="2024 Historical"
                                type="monotone"
                                dataKey="y2024"
                                stroke="#ef4444"
                                strokeWidth={2}
                                dot={{ r: 3, fill: '#ef4444' }}
                            />
                            <Line
                                name="2025 Historical"
                                type="monotone"
                                dataKey="y2025"
                                stroke="#f59e0b"
                                strokeWidth={2}
                                dot={{ r: 3, fill: '#f59e0b' }}
                            />
                            <Line
                                name="2026 Actual"
                                type="monotone"
                                dataKey="y2026"
                                stroke="#3b82f6"
                                strokeWidth={4}
                                dot={{ r: 5, fill: '#3b82f6', stroke: '#121212', strokeWidth: 2 }}
                                activeDot={{ r: 7 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <style>{`
                /* Scrollbar hiding for main content to enforce mission control feel unless necessary */
                ::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                ::-webkit-scrollbar-track {
                    background: #121212; 
                }
                ::-webkit-scrollbar-thumb {
                    background: #333; 
                    border-radius: 3px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #444; 
                }
            `}</style>
        </div>
    );
};

export default ExecutiveSummary;
