
import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { AlertTriangle, TrendingUp, AlertCircle, Copy, FileDown, ChevronRight } from 'lucide-react';
import { useSafeEquip } from '../context/SafeEquipContext';

// --- Data ---

const HISTORICAL_DATA = [
    { month: 'Jan', y2024: 5, y2025: 4 },
    { month: 'Feb', y2024: 4, y2025: 5 },
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
            fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
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

// --- Pulsing Incident Ring ---
const IncidentRing = ({ days, isRecent }: { days: number, isRecent: boolean }) => {
    const ringColor = isRecent ? '#f97316' : '#3b82f6';
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    const maxDays = 30;
    const fill = Math.min(days / maxDays, 1);
    const dashoffset = circumference - fill * circumference;

    return (
        <div style={{
            position: 'relative',
            width: '160px',
            height: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        }}>
            {/* Outer glow pulse ring */}
            <div style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '50%',
                border: `2px solid ${ringColor}20`,
                animation: 'breathPulse 3s ease-in-out infinite'
            }} />
            <div style={{
                position: 'absolute',
                inset: '-12px',
                borderRadius: '50%',
                border: `1px solid ${ringColor}10`,
                animation: 'breathPulse 3s ease-in-out 0.5s infinite'
            }} />

            <svg width="160" height="160" viewBox="0 0 160 160">
                {/* Background track */}
                <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
                {/* Glowing arc */}
                <circle
                    cx="80" cy="80" r={radius}
                    fill="none"
                    stroke={ringColor}
                    strokeWidth="6"
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: dashoffset,
                        transform: 'rotate(-90deg)',
                        transformOrigin: '80px 80px',
                        transition: 'stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        filter: `drop-shadow(0 0 6px ${ringColor}60)`
                    }}
                />
                {/* Tick marks */}
                {[...Array(12)].map((_, i) => {
                    const angle = (i / 12) * 360 - 90;
                    const rad = (angle * Math.PI) / 180;
                    const x1 = 80 + (radius + 8) * Math.cos(rad);
                    const y1 = 80 + (radius + 8) * Math.sin(rad);
                    const x2 = 80 + (radius + 12) * Math.cos(rad);
                    const y2 = 80 + (radius + 12) * Math.sin(rad);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
                })}
            </svg>

            {/* Center content */}
            <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{
                    fontSize: '42px',
                    fontWeight: '900',
                    color: ringColor,
                    lineHeight: 1,
                    textShadow: `0 0 20px ${ringColor}50`,
                    fontFamily: '"JetBrains Mono", monospace'
                }}>{days}</div>
                <div style={{
                    fontSize: '8px',
                    fontWeight: '800',
                    color: '#64748b',
                    letterSpacing: '3px',
                    marginTop: '4px',
                    textTransform: 'uppercase'
                }}>DAYS SAFE</div>
            </div>
        </div>
    );
};

// --- Semi-Circular Tachometer ---
const Tachometer = ({ value, maxValue, label, color, unit = '%' }: {
    value: number, maxValue: number, label: string, color: string, unit?: string
}) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Spring-like animation
        const timeout = setTimeout(() => setAnimatedValue(value), 200);
        return () => clearTimeout(timeout);
    }, [value]);

    const radius = 50;
    const circumference = Math.PI * radius; // semicircle
    const percent = Math.min(animatedValue / maxValue, 1);
    const dashoffset = circumference - percent * circumference;

    // Color thresholds
    const displayColor = percent >= 0.8 ? '#22c55e' : percent >= 0.6 ? color : '#ef4444';

    return (
        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ position: 'relative', width: '120px', height: '68px', overflow: 'hidden' }}>
                <svg width="120" height="68" viewBox="0 0 120 68">
                    {/* Track */}
                    <path
                        d="M 10 60 A 50 50 0 0 1 110 60"
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />
                    {/* Fill arc */}
                    <path
                        d="M 10 60 A 50 50 0 0 1 110 60"
                        fill="none"
                        stroke={displayColor}
                        strokeWidth="8"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: dashoffset,
                            transition: 'stroke-dashoffset 1.8s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.5s ease',
                            filter: `drop-shadow(0 0 4px ${displayColor}40)`
                        }}
                    />
                </svg>
                {/* Value */}
                <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center'
                }}>
                    <span style={{
                        fontSize: '22px',
                        fontWeight: '900',
                        color: displayColor,
                        fontFamily: '"JetBrains Mono", monospace'
                    }}>
                        {Math.round(animatedValue)}{unit}
                    </span>
                </div>
            </div>
            <span style={{ fontSize: '9px', fontWeight: '700', color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center' }}>{label}</span>
        </div>
    );
};

// --- Mini Sparkline SVG ---
const Sparkline = ({ data, color = 'rgba(59, 130, 246, 0.3)', height = 40 }: { data: number[], color?: string, height?: number }) => {
    const width = 100;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const points = data.map((v, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((v - min) / range) * (height - 4);
        return `${x},${y}`;
    }).join(' ');
    const areaPoints = `0,${height} ${points} ${width},${height}`;

    return (
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, opacity: 0.5 }}>
            <defs>
                <linearGradient id={`spark-${color.replace(/[^a-z0-9]/gi, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon points={areaPoints} fill={`url(#spark-${color.replace(/[^a-z0-9]/gi, '')})`} />
            <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
    );
};

// --- KPI Card with Sparkline ---
const CommandKPI = ({ title, mainValue, subText, icon: Icon, color, alert, sparkData }: {
    title: string, mainValue: string, subText: string, icon: any, color: string, alert?: string, sparkData: number[]
}) => (
    <div style={{
        backgroundColor: 'rgba(30, 30, 30, 0.6)',
        border: '1px solid #2a2a2a',
        borderRadius: '10px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)'
    }}>
        <Sparkline data={sparkData} color={color} />
        <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <h3 style={{ color: '#64748b', fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</h3>
                <div style={{ padding: '5px', backgroundColor: `${color}12`, borderRadius: '6px', border: `1px solid ${color}20` }}>
                    <Icon size={14} color={color} />
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <div style={{
                    fontSize: '28px',
                    fontWeight: '900',
                    color: 'white',
                    lineHeight: 1,
                    fontFamily: '"JetBrains Mono", monospace'
                }}>
                    {mainValue}
                </div>
                {alert && (
                    <span style={{
                        fontSize: '8px',
                        fontWeight: '800',
                        color: alert.includes('CRITICAL') || alert.includes('>') ? '#fca5a5' : '#86efac',
                        padding: '2px 6px',
                        backgroundColor: alert.includes('CRITICAL') || alert.includes('>') ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                        borderRadius: '4px',
                        letterSpacing: '0.5px'
                    }}>
                        {alert}
                    </span>
                )}
            </div>
            <p style={{ color: '#475569', fontSize: '10px', marginTop: '4px' }}>{subText}</p>
        </div>
    </div>
);

// --- MTD Mini Ring ---
const MtdRing = ({ mtdValue }: { mtdValue: number }) => {
    const isSafe = mtdValue === 0;
    const color = isSafe ? '#22c55e' : '#f59e0b';
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const fillPercent = Math.min(100, (mtdValue / 6) * 100);
    const dashoffset = circumference - (fillPercent / 100) * circumference;

    return (
        <div style={{
            backgroundColor: 'rgba(30, 30, 30, 0.6)',
            border: '1px solid #2a2a2a',
            borderRadius: '10px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            backdropFilter: 'blur(8px)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Sparkline data={[0, 1, 2, 1, 2, mtdValue, mtdValue]} color={color} />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ color: '#64748b', fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>MTD (FEB)</h3>
                <div style={{ fontSize: '28px', fontWeight: '900', color: 'white', lineHeight: 1, fontFamily: '"JetBrains Mono", monospace' }}>{mtdValue}</div>
                <p style={{ color: '#475569', fontSize: '10px', marginTop: '4px' }}>Feb 2026</p>
            </div>
            <div style={{ position: 'relative', width: '44px', height: '44px', zIndex: 1 }}>
                <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="22" cy="22" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                    <circle cx="22" cy="22" r={radius} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: isSafe ? 0 : dashoffset,
                            transition: 'stroke-dashoffset 1s ease',
                            filter: `drop-shadow(0 0 4px ${color}50)`
                        }}
                    />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '900', color }}>
                    {isSafe ? 'OK' : '!'}
                </div>
            </div>
        </div>
    );
};


// =====================================================
// === EXECUTIVE SUMMARY - COMMAND CENTER ===
// =====================================================

const ExecutiveSummary = () => {
    const { dataset } = useSafeEquip();
    const [showReport, setShowReport] = useState(false);

    const totalAccidents2026 = dataset.reduce((sum, item) => sum + item.incidents, 0);
    const mtdAccidents = dataset
        .filter(item => new Date(item.timestamp).getMonth() === 1)
        .reduce((sum, item) => sum + item.incidents, 0);

    const daysElapsed = 51;
    const projection = Math.round((totalAccidents2026 / daysElapsed) * 365);
    const dailyRate = totalAccidents2026 / daysElapsed;
    const ceilingRate = 48 / 365;
    const isCriticalSpeed = dailyRate > ceilingRate;

    // Fleet compliance
    const totalVehicles = dataset.reduce((s, d) => s + d.vehicles_total, 0);
    const compliantVehicles = dataset.reduce((s, d) => s + d.vehicles_compliant, 0);
    const fleetCompliance = totalVehicles > 0 ? (compliantVehicles / totalVehicles) * 100 : 0;

    // Training progress
    const avgTheory = dataset.reduce((s, d) => s + d.training_theory, 0) / (dataset.length || 1);
    const avgPractice = dataset.reduce((s, d) => s + d.training_practice, 0) / (dataset.length || 1);
    const globalTraining = (avgTheory + avgPractice) / 2;

    const comparisonData = HISTORICAL_DATA.map(d => ({
        ...d,
        y2026: d.month === 'Jan' ? 4 : (d.month === 'Feb' ? mtdAccidents : null)
    }));

    const lastIncidentDate = dataset
        .filter(d => d.incidents > 0)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]?.timestamp;

    const daysSinceLast = lastIncidentDate
        ? Math.floor((new Date().getTime() - new Date(lastIncidentDate).getTime()) / (1000 * 3600 * 24))
        : 3;

    const isRecent = daysSinceLast <= 1;

    // Sparkline data (simulated 7-day trends)
    const sparkAccidents = [3, 2, 4, 3, 5, 4, totalAccidents2026 % 10];
    const sparkProjection = [52, 50, 55, 48, 51, 49, projection % 60];

    const generateFlashReport = () => {
        const report = `VME 2026 WEEKLY FLASH REPORT
---------------------------
Date: ${new Date().toLocaleDateString()}
Status: ${isCriticalSpeed ? 'CRITICAL ALERT' : 'NOMINAL'}

1. INCIDENT TELEMETRY
- Annual YTD: ${totalAccidents2026}
- Monthly MTD: ${mtdAccidents}
- Days Since Last: ${daysSinceLast}
- Projected Year-End: ${projection} (Ceiling: 48)

2. DEPARTMENTAL THREATS
${dataset.filter(d => d.red_list_status).map(d => `- ${d.department}: Level ${d.risk_level} (${d.incidents} incidents)`).join('\n')}

3. FLEET COMPLIANCE
- Global Compliance: ${fleetCompliance.toFixed(1)}%

END OF REPORT | VME 2026 COMMAND CENTER`;
        return report;
    };

    return (
        <div style={{
            backgroundColor: '#121212',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            padding: '16px 20px',
            fontFamily: '"Inter", sans-serif',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Background Grid */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.015) 1px, transparent 0)',
                backgroundSize: '28px 28px',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            {/* ══════ COMMAND HEADER ══════ */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '14px',
                flexShrink: 0,
                position: 'relative',
                zIndex: 1,
                padding: '8px 12px',
                backgroundColor: 'rgba(30, 30, 30, 0.4)',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.04)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: isCriticalSpeed ? '#ef4444' : '#22c55e',
                        boxShadow: `0 0 10px ${isCriticalSpeed ? '#ef4444' : '#22c55e'}`,
                        animation: 'statusPulse 2s infinite'
                    }} />
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{
                                fontFamily: '"JetBrains Mono", monospace',
                                fontSize: '11px',
                                fontWeight: '800',
                                color: isCriticalSpeed ? '#fca5a5' : '#86efac',
                                letterSpacing: '2px'
                            }}>
                                VME 2026 STATUS: {isCriticalSpeed ? 'ALERT' : 'OPERATIONAL'}
                            </span>
                            <span style={{ fontSize: '10px', color: '#334155' }}>|</span>
                            <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', letterSpacing: '1px' }}>
                                ADMIN: DAN KAHILU
                            </span>
                        </div>
                        <p style={{ fontSize: '10px', color: '#334155', marginTop: '2px', letterSpacing: '0.5px' }}>
                            Risk Management & Digital Safety Suite · Operational Core Sync
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <DigitalClock />
                    <button
                        onClick={() => setShowReport(true)}
                        style={{
                            backgroundColor: 'rgba(59, 130, 246, 0.08)',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            color: '#3b82f6',
                            padding: '6px 14px',
                            borderRadius: '6px',
                            fontSize: '10px',
                            fontWeight: '800',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            letterSpacing: '0.5px'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#3b82f6'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.08)'; e.currentTarget.style.color = '#3b82f6'; }}
                    >
                        <FileDown size={12} /> FLASH REPORT
                    </button>
                </div>
            </div>

            {/* ══════ MIDDLE ROW: Ring + KPIs + Tachometers ══════ */}
            <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '14px',
                flexShrink: 0,
                position: 'relative',
                zIndex: 1,
                height: '180px'
            }}>
                {/* The Heartbeat - Incident Ring */}
                <div style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.6)',
                    border: '1px solid #2a2a2a',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 24px',
                    backdropFilter: 'blur(8px)',
                    width: '200px',
                    flexShrink: 0
                }}>
                    <IncidentRing days={daysSinceLast} isRecent={isRecent} />
                    <span style={{ fontSize: '8px', color: '#475569', letterSpacing: '2px', fontWeight: '700', marginTop: '4px' }}>
                        DAYS WITHOUT INCIDENT
                    </span>
                </div>

                {/* KPI Strip */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', flex: 1 }}>
                    <CommandKPI
                        title="Annual YTD 2026"
                        mainValue={totalAccidents2026.toString()}
                        subText="Jan 1 – Feb 20 Sync"
                        icon={AlertCircle}
                        color="#ef4444"
                        alert={isCriticalSpeed ? "CRITICAL PACE" : "ON TARGET"}
                        sparkData={sparkAccidents}
                    />
                    <MtdRing mtdValue={mtdAccidents} />
                    <CommandKPI
                        title="Projected YE"
                        mainValue={projection.toString()}
                        subText="Based on Q1 velocity"
                        icon={TrendingUp}
                        color="#f59e0b"
                        alert={projection > 48 ? `+${projection - 48} > Ceiling` : "UNDER CEILING"}
                        sparkData={sparkProjection}
                    />
                </div>

                {/* Tachometer Gauges */}
                <div style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.6)',
                    border: '1px solid #2a2a2a',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 16px',
                    backdropFilter: 'blur(8px)',
                    width: '280px',
                    flexShrink: 0,
                    gap: '4px'
                }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <Tachometer value={fleetCompliance} maxValue={100} label="Fleet Compliance" color="#3b82f6" />
                        <Tachometer value={globalTraining} maxValue={100} label="Training Progress" color="#f59e0b" />
                    </div>
                    <span style={{ fontSize: '7px', color: '#334155', letterSpacing: '1px', fontWeight: '700' }}>
                        REAL-TIME GAUGE TELEMETRY
                    </span>
                </div>
            </div>

            {/* ══════ BOTTOM: 3-Year Chart ══════ */}
            <div style={{
                flex: 1,
                backgroundColor: 'rgba(30, 30, 30, 0.5)',
                border: '1px solid #2a2a2a',
                borderRadius: '12px',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                position: 'relative',
                zIndex: 1,
                backdropFilter: 'blur(4px)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexShrink: 0 }}>
                    <div>
                        <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'white', letterSpacing: '0.5px' }}>3-YEAR SAFETY TREND ANALYSIS</h3>
                        <p style={{ fontSize: '10px', color: '#475569', marginTop: '2px' }}>Live Data Distribution from VME Core Engine</p>
                    </div>
                    {isCriticalSpeed && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 12px',
                            backgroundColor: 'rgba(239, 68, 68, 0.08)',
                            borderRadius: '6px',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            animation: 'alertFlash 2s ease-in-out infinite'
                        }}>
                            <AlertTriangle size={14} color="#ef4444" />
                            <span style={{ fontSize: '10px', fontWeight: '800', color: '#fca5a5', letterSpacing: '1px' }}>CRITICAL RUN RATE</span>
                        </div>
                    )}
                </div>

                <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={comparisonData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                            <XAxis dataKey="month" stroke="#475569" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
                            <YAxis stroke="#475569" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 10]} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1a1a1e', borderColor: '#2a2a2a', color: 'white', borderRadius: '8px', fontSize: '11px' }}
                                itemStyle={{ color: 'white' }}
                            />
                            <Legend verticalAlign="top" height={30} wrapperStyle={{ paddingBottom: '6px', fontSize: '10px' }} />
                            <ReferenceLine y={4} stroke="#22c55e" strokeDasharray="3 3" label={{
                                position: 'insideTopRight', value: 'Ceiling (Max 4)', fill: '#22c55e', fontSize: 10, fontWeight: 'bold'
                            }} />
                            <Line name="2024" type="monotone" dataKey="y2024" stroke="#ef4444" strokeWidth={2} dot={{ r: 2, fill: '#ef4444' }} />
                            <Line name="2025" type="monotone" dataKey="y2025" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2, fill: '#f59e0b' }} />
                            <Line name="2026 Actual" type="monotone" dataKey="y2026" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', stroke: '#121212', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ══════ FLASH REPORT MODAL ══════ */}
            {showReport && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: '100vw', height: '100vh',
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px'
                }}>
                    <div style={{
                        backgroundColor: '#1a1a1e',
                        width: '100%',
                        maxWidth: '600px',
                        borderRadius: '12px',
                        border: '1px solid #2a2a2a',
                        padding: '32px',
                        boxShadow: '0 24px 80px rgba(0,0,0,0.5)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '16px', fontWeight: '900', letterSpacing: '2px', color: '#06b6d4' }}>WEEKLY FLASH REPORT</h2>
                            <button onClick={() => setShowReport(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                                <ChevronRight size={24} />
                            </button>
                        </div>
                        <pre style={{
                            backgroundColor: '#121212',
                            padding: '24px',
                            borderRadius: '8px',
                            color: '#22c55e',
                            fontSize: '12px',
                            fontFamily: '"JetBrains Mono", monospace',
                            whiteSpace: 'pre-wrap',
                            border: '1px solid #1a1a1a',
                            maxHeight: '400px',
                            overflowY: 'auto'
                        }}>
                            {generateFlashReport()}
                        </pre>
                        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(generateFlashReport());
                                    alert('Report copied to clipboard');
                                }}
                                style={{
                                    flex: 1,
                                    backgroundColor: '#3b82f6',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    color: 'white',
                                    fontWeight: '800',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    fontSize: '12px'
                                }}
                            >
                                <Copy size={14} /> Copy to Clipboard
                            </button>
                            <button
                                onClick={() => setShowReport(false)}
                                style={{
                                    flex: 1,
                                    backgroundColor: '#2a2a2a',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #333',
                                    color: 'white',
                                    fontWeight: '800',
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ══════ ANIMATIONS ══════ */}
            <style>{`
                @keyframes breathPulse {
                    0%, 100% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.08); opacity: 1; }
                }
                @keyframes statusPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
                @keyframes alertFlash {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.6; }
                }
                ::-webkit-scrollbar { width: 4px; height: 4px; }
                ::-webkit-scrollbar-track { background: #121212; }
                ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }
            `}</style>
        </div>
    );
};

export default ExecutiveSummary;
