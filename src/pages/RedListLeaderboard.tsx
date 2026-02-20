
import { useState } from 'react';
import {
    Trophy,
    Medal,
    ShieldAlert,
    Star,
    UserCheck,
    Zap,
    Layout
} from 'lucide-react';

// --- Data Engine ---

const departments = [
    { name: 'Mining', risk: 0, x: 50, y: 15 },
    { name: 'Transport', risk: 2, x: 80, y: 30 },
    { name: 'SSHEC', risk: 0, x: 75, y: 70 },
    { name: 'Exploration', risk: 0, x: 50, y: 85 },
    { name: 'Supply Chain', risk: 0, x: 25, y: 70 },
    { name: 'Finance', risk: 0, x: 15, y: 50 },
    { name: 'Hydromet', risk: 0, x: 30, y: 25 },
    { name: 'Tailings', risk: 0, x: 65, y: 20 },
    { name: 'Sulphite', risk: 0, x: 85, y: 50 },
    { name: 'HR & Medical', risk: 0, x: 10, y: 35 },
    { name: 'Compliance', risk: 0, x: 40, y: 10 },
    { name: 'Stakeholder', risk: 0, x: 90, y: 65 },
    { name: 'People Svcs', risk: 0, x: 20, y: 80 },
    { name: 'Project Del', risk: 0, x: 35, y: 90 },
    { name: 'Civil Svcs', risk: 1, x: 60, y: 80 },
    { name: 'Lean Prod', risk: 0, x: 95, y: 40 },
    { name: 'Farm & Camp', risk: 0, x: 5, y: 55 },
    { name: 'Debottlenecking', risk: 0, x: 45, y: 45 },
    { name: 'Central Lab', risk: 0, x: 55, y: 55 },
];

const levels = [
    { level: 'L5', title: 'ELITE DIAMOND', color: '#b9f2ff', stars: 5, icon: Star },
    { level: 'L4', title: 'GOLD BADGE', color: '#ffd700', stars: 4, icon: Medal },
    { level: 'L3', title: 'SILVER BADGE', color: '#c0c0c0', stars: 3, icon: Medal },
    { level: 'L2', title: 'BRONZE BADGE', color: '#cd7f32', stars: 2, icon: Medal },
    { level: 'L1', title: 'BLUE BADGE', color: '#3b82f6', stars: 1, icon: UserCheck },
];

const rankingData = [
    { rank: 1, name: 'Exemple 1', dept: 'Transport', level: 'L5', score: 98 },
    { rank: 2, name: 'Exemple 2', dept: 'Transport', level: 'L5', score: 96 },
    { rank: 3, name: 'Exemple 3', dept: 'Civil Svcs', level: 'L4', score: 94 },
    { rank: 4, name: 'Exemple 4', dept: 'N/A', level: 'L4', score: 92 },
    { rank: 5, name: 'Exemple 5', dept: 'N/A', level: 'L3', score: 88 },
];

// --- Sub-components ---

const Hotspot = ({ dept, onHover, onLeave, onMove }: { dept: any, onHover: any, onLeave: any, onMove: any }) => {
    const isRed = dept.risk >= 2;
    const isOrange = dept.risk === 1;
    const isZero = dept.risk === 0;

    const color = isRed ? '#ef4444' : isOrange ? '#f59e0b' : 'rgba(148, 163, 184, 0.4)';
    const size = isRed ? '48px' : isOrange ? '36px' : '20px';

    return (
        <div
            style={{
                position: 'absolute',
                left: `${dept.x}%`,
                top: `${dept.y}%`,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: dept.risk > 0 ? 10 : 1,
                cursor: 'pointer',
                padding: '20px' // Invisible hit area
            }}
            onMouseEnter={(e) => onHover(dept, e)}
            onMouseLeave={onLeave}
            onMouseMove={onMove}
        >
            {/* Radial Pulse Effect for 1+ Risk */}
            {dept.risk > 0 && (
                <div style={{
                    position: 'absolute',
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    border: `2px solid ${color}`,
                    animation: 'radialPulse 2s infinite cubic-bezier(0.24, 0, 0.38, 1)'
                }}></div>
            )}

            <div
                className="bubble"
                style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    backgroundColor: isZero ? 'rgba(30, 30, 30, 0.9)' : color,
                    border: `1px solid ${isZero ? 'rgba(148, 163, 184, 0.2)' : '#fff'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isZero ? '#94a3b8' : 'white',
                    fontSize: isZero ? '10px' : '16px',
                    fontWeight: '900',
                    transition: 'all 0.3s ease-in-out',
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: isZero ? 'none' : '0 0 10px rgba(0,0,0,0.5)'
                }}
            >
                {dept.risk}
            </div>
            <span style={{
                marginTop: '8px',
                fontSize: '9px',
                fontWeight: dept.risk > 0 ? '900' : '500',
                color: dept.risk > 0 ? 'white' : '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                whiteSpace: 'nowrap',
                backgroundColor: dept.risk > 0 ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                padding: '2px 6px',
                borderRadius: '4px',
                pointerEvents: 'none',
                transition: 'all 0.3s ease'
            }}>
                {dept.name}
            </span>
        </div>
    );
};

const RedListLeaderboard = () => {
    const [hoveredDept, setHoveredDept] = useState<any>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleHover = (dept: any, e: any) => {
        setHoveredDept(dept);
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleLeave = () => {
        setHoveredDept(null);
    };

    const handleMove = (e: any) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const getStatusText = (risk: number) => {
        if (risk >= 2) return 'CRITICAL';
        if (risk === 1) return 'ACTION REQUIRED';
        return 'SAFE';
    };

    const getStatusColor = (risk: number) => {
        if (risk >= 2) return '#ef4444';
        if (risk === 1) return '#f59e0b';
        return '#22c55e';
    };

    return (
        <div style={{
            backgroundColor: '#121212',
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            padding: '24px',
            fontFamily: '"Inter", sans-serif',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            <style>{`
                @keyframes radialPulse {
                    0% { transform: scale(1); opacity: 0.8; }
                    100% { transform: scale(2.5); opacity: 0; }
                }
                .bubble:hover {
                    transform: scale(1.3);
                    box-shadow: 0 0 30px rgba(255,255,255,0.2);
                    border-color: #fff !important;
                }
                .radar-bg {
                    background: radial-gradient(circle at center, transparent 0%, rgba(30,30,30, 0.4) 100%),
                                repeating-radial-gradient(circle at center, transparent, transparent 15%, rgba(255, 255, 255, 0.02) 15.1%);
                }
                .glass-tooltip {
                    background: rgba(20, 20, 20, 0.8);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                    border-radius: 12px;
                    padding: 16px;
                    pointer-events: none;
                    z-index: 9999;
                    position: fixed;
                    min-width: 220px;
                    transition: opacity 0.2s ease;
                }
            `}</style>

            {/* Floating Glassmorphism Tooltip */}
            {hoveredDept && (
                <div
                    style={{
                        left: mousePos.x + 24,
                        top: mousePos.y + 24,
                    }}
                    className="glass-tooltip"
                >
                    <h3 style={{ fontSize: '15px', fontWeight: '900', color: 'white', marginBottom: '8px', letterSpacing: '0.5px' }}>
                        {hoveredDept.name}
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>INCIDENT COUNT:</span>
                        <span style={{ fontSize: '16px', fontWeight: '900', color: getStatusColor(hoveredDept.risk) }}>{hoveredDept.risk}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>RISK STATUS:</span>
                        <span style={{
                            fontSize: '10px',
                            fontWeight: '900',
                            color: 'white',
                            backgroundColor: getStatusColor(hoveredDept.risk),
                            padding: '2px 8px',
                            borderRadius: '4px'
                        }}>
                            {getStatusText(hoveredDept.risk)}
                        </span>
                    </div>
                </div>
            )}

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexShrink: 0 }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#ef4444', letterSpacing: '2px', lineHeight: 1 }}>
                        CONTRACTOR RISK RADAR <span style={{ color: 'white', fontSize: '12px', fontWeight: '400', letterSpacing: 'normal' }}>v4.0 REAL-TIME</span>
                    </h1>
                    <p style={{ fontSize: '14px', color: '#475569', marginTop: '6px', fontWeight: '500' }}> Interactive Geography & Operator Exclusion Zones</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ padding: '8px 20px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef444444', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ShieldAlert size={18} color="#ef4444" />
                        <span style={{ fontSize: '12px', fontWeight: '900', color: '#ef4444' }}>3 CRITICAL THREATS DETECTED</span>
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 420px', gap: '32px', minHeight: 0 }}>

                {/* 1. INTERACTIVE RADAR AREA */}
                <div style={{
                    backgroundColor: '#1E1E1E',
                    border: '1px solid #333',
                    borderRadius: '16px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} className="radar-bg">

                    {/* Radar Scars/Grid */}
                    <div style={{ position: 'absolute', width: '90%', height: '90%', border: '1px solid rgba(255,255,255,0.02)', borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', width: '70%', height: '70%', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', width: '50%', height: '50%', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '50%' }}></div>

                    {/* Crosshair lines */}
                    <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.02)' }}></div>
                    <div style={{ position: 'absolute', width: '1px', height: '100%', backgroundColor: 'rgba(255,255,255,0.02)' }}></div>

                    {/* Hotspots Container */}
                    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                        {departments.map((dept, i) => (
                            <Hotspot
                                key={i}
                                dept={dept}
                                onHover={handleHover}
                                onLeave={handleLeave}
                                onMove={handleMove}
                            />
                        ))}
                    </div>

                    {/* Proactive Legend */}
                    <div style={{ position: 'absolute', bottom: '32px', left: '32px', display: 'flex', gap: '20px', backgroundColor: 'rgba(10, 10, 10, 0.9)', padding: '16px', borderRadius: '12px', border: '1px solid #333' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 10px #ef4444' }}></div>
                            <span style={{ fontSize: '11px', fontWeight: '800' }}>CRITICAL</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#f59e0b', boxShadow: '0 0 10px #f59e0b' }}></div>
                            <span style={{ fontSize: '11px', fontWeight: '800' }}>THREAT</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgba(30, 30, 30, 0.8)', border: '1px solid #475569' }}></div>
                            <span style={{ fontSize: '11px', fontWeight: '800', color: '#475569' }}>NOMINAL</span>
                        </div>
                    </div>
                </div>

                {/* 2. SIDEBAR CONTENT */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: 0 }}>

                    {/* Premium Ranking */}
                    <div style={{
                        backgroundColor: '#1E1E1E',
                        border: '1px solid #333',
                        borderRadius: '16px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 0
                    }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Trophy color="#fbbf24" size={20} />
                            <h3 style={{ fontSize: '15px', fontWeight: '900', letterSpacing: '1px' }}>CONFIDENTIAL PERFORMANCE</h3>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <tbody>
                                    {rankingData.map((driver) => (
                                        <tr key={driver.rank} style={{ borderBottom: '1px solid #2a2a2a' }}>
                                            <td style={{ padding: '14px 0' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                    <div style={{ width: '32px', height: '32px', backgroundColor: '#2a2a2a', border: '1px solid #333', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '900', color: '#fbbf24' }}>
                                                        {driver.rank}
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span style={{ fontSize: '14px', fontWeight: '700' }}>{driver.name}</span>
                                                        <span style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>{driver.dept}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '14px 0', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                    <span style={{ fontSize: '12px', fontWeight: '900', color: driver.level === 'L5' ? '#b9f2ff' : '#fbbf24' }}>{driver.level}</span>
                                                    <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: '900' }}>{driver.score}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* L1-L5 Legend */}
                    <div style={{
                        backgroundColor: '#1E1E1E',
                        border: '1px solid #333',
                        borderRadius: '16px',
                        padding: '24px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <Layout size={18} color="#3b82f6" />
                            <h3 style={{ fontSize: '13px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Level Protocol Legend</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {levels.map((lvl) => (
                                <div key={lvl.level} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '10px 16px',
                                    backgroundColor: 'rgba(30, 30, 30, 0.4)',
                                    borderRadius: '10px',
                                    borderLeft: `4px solid ${lvl.color}`
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <lvl.icon size={14} color={lvl.color} />
                                        <span style={{ fontSize: '12px', fontWeight: '900', color: lvl.color }}>{lvl.level}</span>
                                        <span style={{ fontSize: '11px', color: 'white', opacity: 0.7, fontWeight: 'bold' }}>{lvl.title}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '2px' }}>
                                        {[...Array(lvl.stars)].map((_, i) => (
                                            <Star key={i} size={8} fill={lvl.color} color={lvl.color} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mission Notification */}
                    <div style={{ padding: '20px', backgroundColor: 'rgba(59, 130, 246, 0.05)', borderRadius: '16px', border: '1px dashed #3b82f644' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <Zap size={16} color="#3b82f6" fill="#3b82f6" />
                            <span style={{ fontSize: '12px', fontWeight: '900', color: '#3b82f6', letterSpacing: '1px' }}>RADAR INTERACTIVITY ENABLED</span>
                        </div>
                        <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.6, fontWeight: '500' }}>
                            Hover over any hotspot to access real-time exclusion metrics. Transitions are synced to mission-control protocol v4.0.
                        </p>
                    </div>

                </div>
            </div>

            {/* Global Footer */}
            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #2a2a2a', paddingTop: '20px', flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>VERSION: 2026.RADAR.PRO</div>
                    <div style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>STATUS: ACTIVE TELEMETRY</div>
                </div>
                <div style={{ fontSize: '11px', color: '#3b82f6', fontWeight: '900', letterSpacing: '1px' }}>ANALYST: DAN KAHILU</div>
            </div>
        </div>
    );
};

export default RedListLeaderboard;
