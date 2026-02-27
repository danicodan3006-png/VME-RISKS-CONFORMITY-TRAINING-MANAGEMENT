import { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, ReferenceLine, Legend
} from 'recharts';
import {
    TrendingUp, AlertCircle,
    Users, Shield, Zap, Activity
} from 'lucide-react';
import { useSafeEquip } from '../context/SafeEquipContext';

// --- Data ---
const HISTORICAL_DATA = [
    { month: 'Jan', y2024: 5, y2025: 5 },
    { month: 'Feb', y2024: 4, y2025: 4 },
    { month: 'Mar', y2024: 6, y2025: 4 },
    { month: 'Apr', y2024: 5, y2025: 5 },
    { month: 'May', y2024: 4, y2025: 4 },
    { month: 'Jun', y2024: 5, y2025: 4 },
    { month: 'Jul', y2024: 6, y2025: 5 },
    { month: 'Aug', y2024: 5, y2025: 4 },
    { month: 'Sep', y2024: 4, y2025: 5 },
    { month: 'Oct', y2024: 5, y2025: 4 },
    { month: 'Nov', y2024: 5, y2025: 5 },
    { month: 'Dec', y2024: 4, y2025: 5 },
];

// --- Real-Time Clock Component ---
const DigitalClock = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    const hh = String(time.getHours()).padStart(2, '0');
    const mm = String(time.getMinutes()).padStart(2, '0');
    const ss = String(time.getSeconds()).padStart(2, '0');
    return (
        <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '14px',
            fontWeight: '700',
            color: '#06b6d4',
            letterSpacing: '2px',
            textShadow: '0 0 8px rgba(6, 182, 212, 0.3)'
        }}>
            {hh}:{mm}:{ss}
        </span>
    );
};

// --- Sub-Component: Incident Ring ---
const IncidentRing = ({ days, isRecent }: { days: number, isRecent: boolean }) => {
    const ringColor = isRecent ? '#f97316' : '#06b6d4';
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    const maxDays = 30;
    const fill = Math.min(days / maxDays, 1);
    const dashoffset = circumference - fill * circumference;

    return (
        <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `2px solid ${ringColor}20`, animation: 'breathPulse 3s ease-in-out infinite' }} />
            <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
                <circle cx="80" cy="80" r={radius} fill="none" stroke={ringColor} strokeWidth="6" strokeLinecap="round"
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: dashoffset,
                        transform: 'rotate(-90deg)',
                        transformOrigin: '80px 80px',
                        transition: 'stroke-dashoffset 1.5s ease',
                        filter: `drop-shadow(0 0 8px ${ringColor}60)`
                    }}
                />
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '42px', fontWeight: '900', color: ringColor, fontFamily: '"JetBrains Mono", monospace' }}>{days}</div>
                <div style={{ fontSize: '8px', color: '#64748b', fontWeight: '800', letterSpacing: '2px' }}>DAYS SAFE</div>
            </div>
        </div>
    );
};

const CommandKPI = ({ title, mainValue, subText, icon: Icon, color, alert }: any) => (
    <div style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '16px',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        height: '100%'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: '#64748b', fontSize: '10px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>{title}</h3>
            <div style={{ padding: '8px', background: `${color}10`, borderRadius: '10px', border: `1px solid ${color}20` }}>
                <Icon size={18} color={color} />
            </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <div style={{ fontSize: '32px', fontWeight: '900', color: 'white', fontFamily: '"JetBrains Mono", monospace' }}>{mainValue}</div>
            {alert && (
                <span style={{
                    fontSize: '9px', fontWeight: '900', color: color, padding: '2px 8px',
                    background: `${color}15`, borderRadius: '4px', letterSpacing: '0.5px'
                }}>{alert}</span>
            )}
        </div>
        <p style={{ color: '#475569', fontSize: '11px', marginTop: '8px', fontWeight: '600' }}>{subText}</p>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: 0.3 }} />
    </div>
);

const ExecutiveSummary = () => {
    useSafeEquip(); // Keep context hook but ignore values
    const [chartMode, setChartMode] = useState<'HISTORY' | 'CUMULATIVE'>('HISTORY');
    const [showReport, setShowReport] = useState(false);

    const totalAccidents2026 = 10;
    const projection = 63;
    const daysSinceLast = 1;
    const totalSensibilisations = 264;

    // Cumulative Data Calculation
    const cumulativeData = HISTORICAL_DATA.map((d, i) => {
        const prevJan25 = i === 0 ? 0 : HISTORICAL_DATA.slice(0, i).reduce((sum, item) => sum + item.y2025, 0);
        const cum2025 = prevJan25 + d.y2025;

        let val2026 = null;
        if (d.month === 'Jan') val2026 = 4;
        if (d.month === 'Feb') val2026 = 10; // 4 + 6

        return {
            month: d.month,
            y2025_cum: cum2025,
            y2026_cum: val2026
        };
    });

    const comparisonData = HISTORICAL_DATA.map(d => ({
        ...d,
        y2026: d.month === 'Jan' ? 4 : (d.month === 'Feb' ? 6 : null)
    }));

    return (
        <div style={{
            backgroundColor: '#0a0a0f',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            padding: '24px',
            fontFamily: '"Inter", sans-serif',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Background Effects */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.015) 1px, transparent 0)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

            <style>{`
                @keyframes breathPulse { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.05); opacity: 0.6; } }
                .tab-toggle { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 4px; display: flex; gap: 4px; }
                .tab-toggle button { border: none; padding: 8px 16px; border-radius: 8px; font-size: 10px; font-weight: 800; letter-spacing: 1px; cursor: pointer; transition: all 0.3s; color: #64748b; background: transparent; }
                .tab-toggle button.active { background: #06b6d4; color: black; box-shadow: 0 0 15px rgba(6,182,212,0.4); }
            `}</style>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '8px 12px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '8px' }}>
                        <Zap size={20} color="#06b6d4" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>
                            VME 2026 <span style={{ color: '#06b6d4' }}>COMMAND CENTER</span>
                        </h1>
                        <p style={{ fontSize: '10px', color: '#475569', letterSpacing: '1px', fontWeight: '700', marginTop: '2px' }}>EXECUTIVE SAFETY STRATEGY • LIVE TELEMETRY</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <DigitalClock />
                    <button onClick={() => setShowReport(true)} style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid #06b6d440', color: '#06b6d4', padding: '10px 20px', borderRadius: '10px', fontSize: '11px', fontWeight: '900', letterSpacing: '1px', cursor: 'pointer' }}>
                        FLASH REPORT
                    </button>
                </div>
            </div>

            {/* KPI Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'min-content 1fr', gap: '20px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '30px', width: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <IncidentRing days={daysSinceLast} isRecent={daysSinceLast <= 3} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                    <CommandKPI
                        title="ANNUAL YTD 2026"
                        mainValue={totalAccidents2026}
                        subText="Total Audited Accidents"
                        icon={AlertCircle}
                        color="#ef4444"
                        alert="10 RECORDS"
                    />
                    <CommandKPI
                        title="SAFETY AWARENESS"
                        mainValue={totalSensibilisations}
                        subText="Sensibilisation Training"
                        icon={Users}
                        color="#06b6d4"
                        alert="LIVE DATA"
                    />
                    <CommandKPI
                        title="PROJECTED YE"
                        mainValue={projection}
                        subText="Velocity Calculation"
                        icon={TrendingUp}
                        color={projection > 48 ? "#ef4444" : "#f59e0b"}
                        alert="OVER TARGET"
                    />
                </div>
            </div>

            {/* Chart Section */}
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '30px', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div>
                        <h2 style={{ fontSize: '16px', fontWeight: '900', letterSpacing: '1px' }}>{chartMode === 'HISTORY' ? 'INCIDENT HISTORY (3-YEAR)' : 'YTD CUMULATIVE GROWTH'}</h2>
                        <p style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>Comparaison Velocity Analysis • 2025 vs 2026</p>
                    </div>
                    <div className="tab-toggle">
                        <button className={chartMode === 'HISTORY' ? 'active' : ''} onClick={() => setChartMode('HISTORY')}>3-YEAR HISTORY</button>
                        <button className={chartMode === 'CUMULATIVE' ? 'active' : ''} onClick={() => setChartMode('CUMULATIVE')}>YTD CUMULATIVE</button>
                    </div>
                </div>

                <div style={{ flex: 1, width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        {chartMode === 'HISTORY' ? (
                            <LineChart data={comparisonData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="month" stroke="#475569" tick={{ fill: '#475569', fontSize: 11, fontWeight: '700' }} axisLine={false} />
                                <YAxis stroke="#475569" tick={{ fill: '#475569', fontSize: 11, fontWeight: '700' }} axisLine={false} />
                                <Tooltip contentStyle={{ background: '#0a0a0f', border: '1px solid #06b6d440', borderRadius: '12px' }} />
                                <Legend verticalAlign="top" align="right" />
                                <Line name="2024" type="monotone" dataKey="y2024" stroke="#475569" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                                <Line name="2025" type="monotone" dataKey="y2025" stroke="#06b6d4" strokeWidth={2} dot={false} />
                                <Line name="2026 ACTUAL" type="monotone" dataKey="y2026" stroke="#f97316" strokeWidth={4} dot={{ r: 6, fill: '#f97316' }} style={{ filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.6))' }} />
                                <ReferenceLine y={4} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'CEILING', fill: '#ef4444', fontSize: 10, position: 'right' }} />
                            </LineChart>
                        ) : (
                            <LineChart data={cumulativeData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="month" stroke="#475569" tick={{ fill: '#475569', fontSize: 11, fontWeight: '700' }} axisLine={false} />
                                <YAxis stroke="#475569" tick={{ fill: '#475569', fontSize: 11, fontWeight: '700' }} axisLine={false} />
                                <Tooltip contentStyle={{ background: '#0a0a0f', border: '1px solid #06b6d440', borderRadius: '12px' }} />
                                <Legend verticalAlign="top" align="right" />
                                <Line name="2025 REFERENCE" type="monotone" dataKey="y2025_cum" stroke="#06b6d4" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                                <Line name="2026 CUMULATIVE" type="monotone" dataKey="y2026_cum" stroke="#f97316" strokeWidth={5} dot={{ r: 6, fill: '#f97316' }} style={{ filter: 'drop-shadow(0 0 12px rgba(249, 115, 22, 0.7))' }} />
                            </LineChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Analytics Grid Footer Overlay */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '16px', position: 'relative', zIndex: 1 }}>
                <div style={{ background: 'rgba(6,182,212,0.03)', border: '1px solid rgba(6,182,212,0.1)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', letterSpacing: '1px' }}>EVENT CONTROL RATIO</span>
                        <Activity size={14} color="#06b6d4" />
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', display: 'flex', overflow: 'hidden' }}>
                            <div style={{ width: '70%', background: '#06b6d4', boxShadow: '0 0 10px rgba(6,182,212,0.4)' }} />
                            <div style={{ width: '30%', background: '#ef4444', animation: 'breathPulse 2s infinite' }} />
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: '900', color: 'white' }}>70 / 30</span>
                    </div>
                    <div style={{ fontSize: '9px', color: '#475569', fontWeight: '700' }}>
                        <span style={{ color: '#06b6d4' }}>CONTROLLED: 7</span> | <span style={{ color: '#ef4444' }}>UNCONTROLLED: 3 (TR464, TR447, FORTUNER)</span>
                    </div>
                </div>

                <div style={{ background: 'rgba(239,68,68,0.03)', border: '1px solid rgba(239,68,68,0.1)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', letterSpacing: '1px' }}>PRIMARY ROOT CAUSE</span>
                        <AlertCircle size={14} color="#ef4444" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontSize: '20px', fontWeight: '900', color: 'white', fontFamily: '"JetBrains Mono", monospace' }}>90%</span>
                        <span style={{ fontSize: '10px', fontWeight: '800', color: '#ef4444', letterSpacing: '0.5px' }}>BEHAVIORAL & OPERATOR ERROR</span>
                    </div>
                    <div style={{ fontSize: '9px', color: '#475569', fontWeight: '700' }}>Audit reflects fatigue, poor judgement & procedural failure.</div>
                </div>
            </div>

            {/* Footer */}
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', gap: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Shield size={14} color="#06b6d4" />
                        <span style={{ fontSize: '10px', color: '#475569', fontWeight: '800' }}>VME COMPLIANCE ARCHITECTURE</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '10px', color: '#475569', fontWeight: '800', letterSpacing: '1px' }}>CHIEF SYSTEMS ARCHITECT | VME 2026</span>
                    <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.1)' }} />
                    <span style={{ fontSize: '11px', color: 'white', fontWeight: '900', letterSpacing: '2px' }}>DAN KAHILU</span>
                </div>
            </div>

            {/* Modal for Flash Report */}
            {showReport && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#0a0a0f', border: '1px solid #06b6d440', padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
                        <h2 style={{ color: 'white', marginBottom: '20px' }}>STRATEGIC FLASH REPORT</h2>
                        <p style={{ color: '#64748b' }}>Generating real-time safety telemetry...</p>
                        <button onClick={() => setShowReport(false)} style={{ marginTop: '20px', background: '#06b6d4', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>CLOSE</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExecutiveSummary;
