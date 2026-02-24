import { useState } from 'react';
import {
    Medal,
    ShieldAlert,
    Star,
    UserCheck,
    Zap,
    Layout as LayoutIcon,
    Award,
    ShieldCheck,
    Trophy
} from 'lucide-react';
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';
import { useSafeEquip } from '../context/SafeEquipContext';

// --- Data Engine ---

const levels = [
    { level: 'L5', title: 'ELITE DIAMOND', color: '#bae6fd', stars: 5, icon: Star },
    { level: 'L4', title: 'GOLD BADGE', color: '#fbbf24', stars: 4, icon: Medal },
    { level: 'L3', title: 'SILVER BADGE', color: '#cbd5e1', stars: 3, icon: Medal },
    { level: 'L2', title: 'BRONZE BADGE', color: '#d97706', stars: 2, icon: Medal },
    { level: 'L1', title: 'BLUE BADGE', color: '#3b82f6', stars: 1, icon: UserCheck },
];

const RadarGradient = () => (
    <svg style={{ height: 0, width: 0 }}>
        <defs>
            <radialGradient id="radarRiskGrad" cx="50%" cy="50%" r="65%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="60%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
            </radialGradient>
        </defs>
    </svg>
);

const EXCELLENCE_OPERATORS = [
    {
        id: 'OP-01',
        name: 'Lukoka Kyembe Alexandre',
        company: 'MEXCO',
        unit: 'Rigid Truck 100T',
        hours: 7200,
        record: '4 Years',
        rank: 'L1 - Elite Gold Standard',
        score: '98.8%'
    },
    {
        id: 'OP-02',
        name: 'Kimba Ngandwe Omer',
        company: 'MEXCO',
        unit: 'Excavator',
        hours: 7200,
        record: '4 Years',
        rank: 'L1 - Elite Gold Standard',
        score: '97.5%'
    },
    {
        id: 'OP-03',
        name: 'Feruzi Yuma FeFe',
        company: 'MMG',
        unit: 'Excavator',
        hours: 3400,
        record: '3 Years',
        rank: 'L1 - Gold Excellence',
        score: '96.2%'
    },
];

// Static Radar Capture Visual from real audit
const StaticRadarCapture = ({ isHighTech }: { isHighTech: boolean }) => (
    <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isHighTech ? 'rgba(0,0,0,0.2)' : 'transparent',
        borderRadius: '12px',
        overflow: 'hidden'
    }}>
        <img
            src="/initial_radar_capture.png"
            alt="Initial Radar Audit"
            style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                filter: isHighTech ? 'brightness(1.2) contrast(1.1)' : 'none'
            }}
        />
    </div>
);

const RedListLeaderboard = () => {
    const { dataset, theme } = useSafeEquip();
    const isHighTech = theme === 'high-tech';
    const [activeTab, setActiveTab] = useState<'radar' | 'excellence'>('radar');

    // Sync data: Mining:3, Civil:3, Transport:3, Lean:2, Commercial:1
    const radarData = dataset
        .filter(d => ['Mining', 'Civil Svcs', 'Transport', 'Lean Prod', 'Commercial'].includes(d.department))
        .map(d => ({
            axis: d.department === 'Civil Svcs' ? 'CIVIL SVCS' : d.department.toUpperCase(),
            value: d.risk_level, // Audited data restored
            fullMark: 5
        }));

    return (
        <div style={{
            backgroundColor: isHighTech ? '#0a0a0c' : '#f8fafc',
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            color: isHighTech ? 'white' : '#1e293b',
            padding: '24px',
            fontFamily: '"Inter", sans-serif',
            overflow: 'hidden',
        }}>
            <RadarGradient />
            <style>{`
                @keyframes pulse-neon {
                    0% { transform: scale(1); opacity: 0.2; }
                    50% { transform: scale(1.05); opacity: 0.4; }
                    100% { transform: scale(1); opacity: 0.2; }
                }
                .gold-card:hover {
                    box-shadow: 0 0 30px rgba(251,191,36,0.2) !important;
                    background: rgba(251,191,36,0.02) !important;
                }
            `}</style>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '900', color: isHighTech ? '#3b82f6' : '#2563eb', letterSpacing: '2px', margin: 0 }}>
                        CONTRACTOR RISK RADAR <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '400' }}>v5.0</span>
                    </h1>
                    <p style={{ fontSize: '11px', color: '#64748b', fontWeight: '800', margin: '4px 0 0 0' }}>AUDITED LEVELS L1-L5</p>
                </div>

                {/* Tab Switcher - Glassmorphism */}
                <div style={{
                    display: 'flex',
                    background: isHighTech ? 'rgba(255,255,255,0.03)' : '#e2e8f0',
                    padding: '4px',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <button
                        onClick={() => setActiveTab('radar')}
                        style={{
                            padding: '8px 24px',
                            backgroundColor: activeTab === 'radar' ? (isHighTech ? '#3b82f6' : '#2563eb') : 'transparent',
                            color: activeTab === 'radar' ? 'white' : '#64748b',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontWeight: '900',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <Zap size={14} /> RADAR VIEW
                    </button>
                    <button
                        onClick={() => setActiveTab('excellence')}
                        style={{
                            padding: '8px 24px',
                            backgroundColor: activeTab === 'excellence' ? '#fbbf24' : 'transparent',
                            color: activeTab === 'excellence' ? '#000' : '#64748b',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontWeight: '900',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <Award size={14} /> EXCELLENCE BOARD
                    </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px 16px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ShieldAlert size={16} color="#3b82f6" />
                        <span style={{ fontSize: '11px', fontWeight: '900', color: '#3b82f6' }}>{radarData.length} SECTORS AUDITED</span>
                    </div>
                </div>
            </div>

            {activeTab === 'radar' ? (
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 420px', gap: '24px', minHeight: 0 }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px'
                    }}>
                        {/* Main Radar Display */}
                        <div style={{
                            flex: 1,
                            background: isHighTech ? '#121214' : '#fff',
                            borderRadius: '24px',
                            border: isHighTech ? '1px solid #1e1e24' : '1px solid #e2e8f0',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', border: '1px solid #3b82f6', borderRadius: '50%', animation: 'pulse-neon 4s infinite' }} />
                            </div>

                            <ResponsiveContainer width="90%" height="90%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke={isHighTech ? "rgba(59,130,246,0.2)" : "#e2e8f0"} />
                                    <PolarAngleAxis
                                        dataKey="axis"
                                        tick={{ fill: isHighTech ? '#94a3b8' : '#1e293b', fontSize: 13, fontWeight: '900' }}
                                    />
                                    <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Risk Level"
                                        dataKey="value"
                                        stroke={isHighTech ? "#3b82f6" : "#2563eb"}
                                        fill={isHighTech ? "rgba(59,130,246,0.2)" : "rgba(37,99,235,0.2)"}
                                        strokeWidth={3}
                                        dot={{ r: 6, fill: '#ef4444', stroke: '#fff', strokeWidth: 2 }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>

                            <div style={{ position: 'absolute', bottom: '24px', left: '24px', display: 'flex', gap: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                                    <span style={{ fontSize: '10px', fontWeight: '800' }}>CRITICAL</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                                    <span style={{ fontSize: '10px', fontWeight: '800' }}>THREAT</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom KPI Grids */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                            {[
                                { label: 'TOTAL CONFISCATED CARDS', value: '0', icon: ShieldAlert, color: '#ef4444' },
                                { label: 'TOTAL DEPARTMENTS UNDER RADAR', value: radarData.length.toString(), icon: Zap, color: '#3b82f6' },
                                { label: 'OPERATORS TO REWARD', value: EXCELLENCE_OPERATORS.length.toString(), icon: Trophy, color: '#fbbf24' }
                            ].map((kpi, idx) => (
                                <div key={idx} style={{
                                    background: isHighTech ? '#121214' : '#fff',
                                    padding: '20px',
                                    borderRadius: '20px',
                                    border: isHighTech ? '1px solid #1e1e24' : '1px solid #e2e8f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px'
                                }}>
                                    <div style={{
                                        width: '40px', height: '40px',
                                        borderRadius: '10px',
                                        background: `${kpi.color}10`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <kpi.icon size={20} color={kpi.color} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '9px', fontWeight: '900', color: '#64748b', margin: 0 }}>{kpi.label}</p>
                                        <p style={{ fontSize: '20px', fontWeight: '900', color: isHighTech ? '#fff' : '#1e293b', margin: 0 }}>{kpi.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ background: isHighTech ? '#121214' : '#fff', padding: '32px', borderRadius: '24px', border: isHighTech ? '1px solid #1e1e24' : '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <ShieldCheck size={20} color="#3b82f6" />
                                <h3 style={{ fontSize: '14px', fontWeight: '900', margin: 0, letterSpacing: '1px' }}>STATIC AUDIT CAPTURE</h3>
                            </div>
                            <div style={{ height: '240px', width: '100%', position: 'relative' }}>
                                <StaticRadarCapture isHighTech={isHighTech} />
                            </div>
                        </div>

                        <div style={{ background: isHighTech ? '#121214' : '#fff', padding: '24px', borderRadius: '24px', border: isHighTech ? '1px solid #1e1e24' : '1px solid #e2e8f0', flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                <LayoutIcon size={20} color="#3b82f6" />
                                <h3 style={{ fontSize: '14px', fontWeight: '900', margin: 0, letterSpacing: '1px' }}>LEVEL PROTOCOL LEGEND</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {levels.map(l => (
                                    <div key={l.level} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '12px 16px',
                                        background: isHighTech ? 'rgba(255,255,255,0.02)' : '#f8fafc',
                                        borderRadius: '12px',
                                        position: 'relative',
                                        borderLeft: `2px solid transparent`,
                                        overflow: 'hidden'
                                    }}>
                                        {/* Left Blue Glow Arc */}
                                        <div style={{
                                            position: 'absolute',
                                            left: '-10px',
                                            top: '10%',
                                            height: '80%',
                                            width: '20px',
                                            borderRadius: '50%',
                                            borderLeft: `3px solid #3b82f6`,
                                            filter: 'drop-shadow(0 0 5px rgba(59,130,246,0.5))',
                                            opacity: 0.6
                                        }} />

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <l.icon size={16} color={l.color} />
                                            <span style={{ fontSize: '13px', fontWeight: '900', color: l.color, minWidth: '25px' }}>{l.level}</span>
                                            <span style={{ fontSize: '11px', fontWeight: '800', opacity: 0.8, letterSpacing: '0.5px' }}>{l.title}</span>
                                        </div>

                                        <div style={{ display: 'flex', gap: '2px' }}>
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={10}
                                                    fill={i < l.stars ? l.color : 'transparent'}
                                                    stroke={i < l.stars ? l.color : (isHighTech ? 'rgba(255,255,255,0.1)' : '#e2e8f0')}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '24px' }}>
                        {EXCELLENCE_OPERATORS.map((op) => {
                            const progress = (op.hours / 8000) * 100;
                            return (
                                <div key={op.id} className="gold-card" style={{
                                    background: isHighTech ? 'linear-gradient(135deg, #1a1a20, #0d0d10)' : '#fff',
                                    border: '1px solid rgba(251,191,36,0.3)',
                                    borderRadius: '24px',
                                    padding: '24px',
                                    display: 'flex',
                                    gap: '24px',
                                    position: 'relative',
                                    transition: 'all 0.3s'
                                }}>
                                    <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
                                        <svg width="120" height="120" viewBox="0 0 120 120">
                                            <circle cx="60" cy="60" r="54" fill="none" stroke={isHighTech ? "rgba(255,255,255,0.05)" : "#f1f5f9"} strokeWidth="8" />
                                            <circle
                                                cx="60" cy="60" r="54" fill="none"
                                                stroke="#fbbf24" strokeWidth="8"
                                                strokeDasharray={`${3.39 * progress} 339`}
                                                strokeLinecap="round"
                                                transform="rotate(-90 60 60)"
                                            />
                                            <text x="60" y="55" fontSize="14" fontWeight="900" textAnchor="middle" fill="#fbbf24">{op.hours}H</text>
                                            <text x="60" y="75" fontSize="9" fontWeight="700" textAnchor="middle" fill="#94a3b8">MASTERED</text>
                                        </svg>
                                        <div style={{ position: 'absolute', bottom: 0, right: 0, background: '#fbbf24', color: '#000', padding: '4px', borderRadius: '50%', boxShadow: '0 0 10px rgba(251,191,36,0.5)' }}>
                                            <Trophy size={14} strokeWidth={3} />
                                        </div>
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                            <div>
                                                <h3 style={{ fontSize: '18px', fontWeight: '900', margin: 0 }}>{op.name}</h3>
                                                <p style={{ fontSize: '11px', color: '#fbbf24', fontWeight: '900', margin: '4px 0' }}>{op.rank.toUpperCase()}</p>
                                                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                                    <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '800' }}>{op.company}</span>
                                                    <span style={{ color: '#333' }}>|</span>
                                                    <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '800' }}>{op.unit}</span>
                                                </div>
                                            </div>
                                            <div style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: '900' }}>
                                                {op.record} SAFE
                                            </div>
                                        </div>

                                        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                                            <div>
                                                <p style={{ fontSize: '8px', color: '#64748b', fontWeight: '900', margin: 0 }}>VME CERTIFIED SCORE</p>
                                                <p style={{ fontSize: '16px', fontWeight: '900', color: '#fbbf24', margin: 0 }}>{op.score}</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                                                <Award size={16} color="#fbbf24" />
                                                <span style={{ fontSize: '9px', fontWeight: '900', color: '#fbbf24' }}>VME 2026 CERTIFIED</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Footer */}
            <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: isHighTech ? '1px solid #1e1e24' : '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                        <span style={{ fontSize: '10px', fontWeight: '900', color: '#64748b' }}>SYSTEM LOCK: AUDITED</span>
                    </div>
                    <div style={{ fontSize: '10px', fontWeight: '900', color: '#64748b' }}>TOTAL POPULATION: 2,976</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/MMG_Logo.svg/1000px-MMG_Logo.svg.png" alt="MMG" style={{ height: '16px', opacity: 0.6 }} />
                    <div style={{ fontSize: '10px', fontWeight: '900', color: isHighTech ? '#3b82f6' : '#2563eb' }}>ADMIN: DAN KAHILU</div>
                </div>
            </div>
        </div>
    );
};

export default RedListLeaderboard;
