
import {
    Medal,
    ShieldAlert,
    Star,
    UserCheck,
    Zap,
    Layout,
    TrendingUp
} from 'lucide-react';
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';
import { useSafeEquip } from '../context/SafeEquipContext';

// --- Data Engine ---

const levels = [
    { level: 'L5', title: 'FATAL/CRITICAL', color: '#ef4444', stars: 5, icon: Star },
    { level: 'L4', title: 'HIGH RISK', color: '#f59e0b', stars: 4, icon: Medal },
    { level: 'L3', title: 'MEDIUM RISK', color: '#fbbf24', stars: 3, icon: Medal },
    { level: 'L2', title: 'MINOR RISK', color: '#3b82f6', stars: 2, icon: Medal },
    { level: 'L1', title: 'NEGLIGIBLE', color: '#94a3b8', stars: 1, icon: UserCheck },
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

const RedListLeaderboard = () => {
    const { dataset, theme } = useSafeEquip();
    const isHighTech = theme === 'high-tech';

    // Sync data from SafeEquip_Dynamic_Dataset
    const radarData = dataset
        .filter(d => ['Mining', 'Civil Svcs', 'Transport', 'Lean Prod', 'Commercial'].includes(d.department))
        .map(d => ({
            axis: d.department,
            value: d.risk_level,
            fullMark: 5
        }));

    const rankingData = dataset
        .filter(d => ['Mining', 'Civil Svcs', 'Transport', 'Lean Prod', 'Commercial'].includes(d.department))
        .sort((a, b) => b.risk_level - a.risk_level)
        .map((d, i) => ({
            rank: i + 1,
            name: d.company_name,
            dept: d.department,
            level: `L${d.risk_level}`,
            risk_level: d.risk_level,
            score: 100 - (d.risk_level * 10),
            color: d.risk_level >= 3 ? '#ef4444' : (d.risk_level === 2 ? '#f59e0b' : '#3b82f6')
        }));

    return (
        <div style={{
            backgroundColor: isHighTech ? '#121212' : '#f8fafc',
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            color: isHighTech ? 'white' : '#1e293b',
            padding: '24px',
            fontFamily: '"Inter", sans-serif',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            <RadarGradient />
            <style>{`
                @keyframes radialPulse {
                    0% { transform: scale(1); opacity: 0.8; }
                    100% { transform: scale(2.5); opacity: 0; }
                }
                .radar-bg {
                    background: radial-gradient(circle at center, transparent 0%, rgba(30,30,30, 0.4) 100%),
                                repeating-radial-gradient(circle at center, transparent, transparent 15%, rgba(255, 255, 255, 0.01) 15.1%);
                }
            `}</style>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexShrink: 0 }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: '900', color: isHighTech ? '#3b82f6' : '#2563eb', letterSpacing: '2px', lineHeight: 1 }}>
                        CONTRACTOR RISK RADAR <span style={{ color: isHighTech ? 'white' : '#64748b', fontSize: '12px', fontWeight: '400', letterSpacing: 'normal' }}>v5.0 AUDITED</span>
                    </h1>
                    <p style={{ fontSize: '14px', color: '#475569', marginTop: '6px', fontWeight: '500' }}> TARGETING SECTOR: REAL CONTRACTOR LEVELS L1-L5</p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{
                        padding: '8px 20px',
                        backgroundColor: isHighTech ? 'rgba(59, 130, 246, 0.1)' : '#ffffff',
                        border: isHighTech ? '1px solid #3b82f644' : '1px solid #e2e8f0',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: isHighTech ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                        <ShieldAlert size={18} color={isHighTech ? "#3b82f6" : "#2563eb"} />
                        <span style={{ fontSize: '12px', fontWeight: '900', color: isHighTech ? '#3b82f6' : '#2563eb' }}>{radarData.length} CONTRACTORS TRACKED</span>
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 420px', gap: '32px', minHeight: 0 }}>

                {/* 1. REAL DATA RADAR CHART */}
                <div
                    style={{
                        backgroundColor: isHighTech ? '#1E1E1E' : '#ffffff',
                        border: isHighTech ? '1px solid #333' : '1px solid #e2e8f0',
                        borderRadius: '16px',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isHighTech ? 'none' : '0 10px 15px -3px rgba(0,0,0,0.1)'
                    }} className={isHighTech ? "radar-bg" : ""}
                >
                    <div style={{ width: '90%', height: '90%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke={isHighTech ? "#334155" : "#e2e8f0"} />
                                <PolarAngleAxis dataKey="axis" tick={{ fill: isHighTech ? '#94a3b8' : '#64748b', fontSize: 12, fontWeight: '700' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: isHighTech ? '#475569' : '#94a3b8', fontSize: 10 }} axisLine={false} />
                                <Radar
                                    name="Risk Level"
                                    dataKey="value"
                                    stroke={isHighTech ? "#3b82f6" : "#2563eb"}
                                    fill="url(#radarRiskGrad)"
                                    fillOpacity={isHighTech ? 0.4 : 0.2}
                                    strokeWidth={3}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Proactive Legend */}
                    <div style={{
                        position: 'absolute',
                        bottom: '32px',
                        left: '32px',
                        display: 'flex',
                        gap: '20px',
                        backgroundColor: isHighTech ? 'rgba(10, 10, 10, 0.9)' : '#ffffff',
                        padding: '16px',
                        borderRadius: '12px',
                        border: isHighTech ? '1px solid #333' : '1px solid #e2e8f0',
                        boxShadow: isHighTech ? 'none' : '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: isHighTech ? '0 0 10px #ef4444' : 'none' }}></div>
                            <span style={{ fontSize: '11px', fontWeight: '800' }}>HIGH RISK</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#f59e0b', boxShadow: isHighTech ? '0 0 10px #f59e0b' : 'none' }}></div>
                            <span style={{ fontSize: '11px', fontWeight: '800' }}>ALERT</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#3b82f6', boxShadow: isHighTech ? '0 0 10px #3b82f6' : 'none' }}></div>
                            <span style={{ fontSize: '11px', fontWeight: '800' }}>NOMINAL</span>
                        </div>
                    </div>
                </div>

                {/* 2. SIDEBAR CONTENT */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: 0 }}>

                    {/* Premium Ranking */}
                    <div style={{
                        backgroundColor: isHighTech ? '#1E1E1E' : '#ffffff',
                        border: isHighTech ? '1px solid #333' : '1px solid #e2e8f0',
                        borderRadius: '16px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 0,
                        boxShadow: isHighTech ? 'none' : '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ padding: '20px', borderBottom: isHighTech ? '1px solid #333' : '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <TrendingUp color={isHighTech ? "#3b82f6" : "#2563eb"} size={20} />
                            <h3 style={{ fontSize: '15px', fontWeight: '900', letterSpacing: '1px' }}>CONTRACTOR RISK REGISTRY</h3>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <tbody>
                                    {rankingData.map((contractor) => (
                                        <tr key={contractor.dept} style={{ borderBottom: isHighTech ? '1px solid #2a2a2a' : '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '14px 0' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                    <div style={{ width: '32px', height: '32px', backgroundColor: isHighTech ? '#2a2a2a' : '#f8fafc', border: `1px solid ${contractor.color}`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '900', color: contractor.color }}>
                                                        {contractor.rank}
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span style={{ fontSize: '14px', fontWeight: '700' }}>{contractor.name}</span>
                                                        <span style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>{contractor.dept}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '14px 0', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                    <span style={{ fontSize: '12px', fontWeight: '900', color: contractor.color }}>{contractor.level}</span>
                                                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '900' }}>RISK LEVEL: {contractor.risk_level}</span>
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
                        backgroundColor: isHighTech ? '#1E1E1E' : '#ffffff',
                        border: isHighTech ? '1px solid #333' : '1px solid #e2e8f0',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: isHighTech ? 'none' : '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <Layout size={18} color={isHighTech ? "#3b82f6" : "#2563eb"} />
                            <h3 style={{ fontSize: '13px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Level Protocol Legend</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {levels.map((lvl) => (
                                <div key={lvl.level} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '10px 16px',
                                    backgroundColor: isHighTech ? 'rgba(30, 30, 30, 0.4)' : '#f8fafc',
                                    borderRadius: '10px',
                                    borderLeft: `4px solid ${lvl.color}`
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <lvl.icon size={14} color={lvl.color} />
                                        <span style={{ fontSize: '12px', fontWeight: '900', color: lvl.color }}>{lvl.level}</span>
                                        <span style={{ fontSize: '11px', color: isHighTech ? 'white' : '#1e293b', opacity: 0.7, fontWeight: 'bold' }}>{lvl.title}</span>
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
                    <div style={{
                        padding: '20px',
                        backgroundColor: isHighTech ? 'rgba(59, 130, 246, 0.05)' : '#ffffff',
                        borderRadius: '16px',
                        border: isHighTech ? '1px dashed #3b82f644' : '1px dashed #e2e8f0',
                        boxShadow: isHighTech ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <Zap size={16} color={isHighTech ? "#3b82f6" : "#2563eb"} fill={isHighTech ? "#3b82f6" : "#2563eb"} />
                            <span style={{ fontSize: '12px', fontWeight: '900', color: isHighTech ? '#3b82f6' : '#2563eb', letterSpacing: '1px' }}>VME 2026 MISSION TITLE</span>
                        </div>
                        <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.6, fontWeight: '500' }}>
                            Audited data visualization active. Radial gradient mapping synchronized with Red List status. MMG Kinsevere Operational Command.
                        </p>
                    </div>

                </div>
            </div>

            {/* Global Footer */}
            <div style={{
                marginTop: '32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: isHighTech ? '1px solid #2a2a2a' : '1px solid #f1f5f9',
                paddingTop: '20px',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>VERSION: 2026.RADAR.SYNC</div>
                    <div style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>STATUS: AUDITED DATA LIVE</div>
                </div>
                <div style={{ fontSize: '11px', color: isHighTech ? '#3b82f6' : '#2563eb', fontWeight: '900', letterSpacing: '1px' }}>CHIEF DATA ARCHITECT: DAN KAHILU</div>
            </div>
        </div>
    );
};

export default RedListLeaderboard;
