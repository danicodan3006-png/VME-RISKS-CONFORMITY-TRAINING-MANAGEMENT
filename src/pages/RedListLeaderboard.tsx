

import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import {
    AlertTriangle,
    Trophy,
    Medal,
    User,
    ShieldAlert,
    Star,
    UserCheck
} from 'lucide-react';

// --- Data ---
const riskMapData = [
    { x: 30, y: 70, z: 8, company: 'MMG', risk: 'high', recovery: 'Indefinite', drivers: 8, color: '#ef4444' },
    { x: 75, y: 40, z: 3, company: 'MEXCO', risk: 'medium', recovery: '15 days', drivers: 3, color: '#f59e0b' },
    { x: 50, y: 20, z: 1, company: 'ALTINAY', risk: 'low', recovery: '2 days', drivers: 1, color: '#22c55e' },
    { x: 20, y: 30, z: 2, company: 'TRANSCO', risk: 'medium', recovery: '5 days', drivers: 2, color: '#f59e0b' },
    { x: 80, y: 80, z: 5, company: 'WHCC', risk: 'high', recovery: '30 days', drivers: 5, color: '#ef4444' },
];

const levels = [
    { level: 'L5', title: 'ELITE DIAMOND', color: '#b9f2ff', req: '5 Years Accident-Free', stars: 5, icon: Star },
    { level: 'L4', title: 'GOLD BADGE', color: '#ffd700', req: '2 Years Accident-Free', stars: 4, icon: Medal },
    { level: 'L3', title: 'SILVER BADGE', color: '#c0c0c0', req: '1 Year Safe + Advanced Coaching', stars: 3, icon: Medal },
    { level: 'L2', title: 'BRONZE BADGE', color: '#cd7f32', req: '1 Year Safe + Post-Trial', stars: 2, icon: Medal },
    { level: 'L1', title: 'BLUE BADGE', color: '#3b82f6', req: 'Initial VOC Theory & Practice (90%+)', stars: 1, icon: UserCheck },
];

const l1l5Data = [
    { rank: 1, name: 'Sarah M.', level: 'L5', score: 98, trend: 'up' },
    { rank: 2, name: 'David K.', level: 'L5', score: 96, trend: 'up' },
    { rank: 3, name: 'James L.', level: 'L4', score: 94, trend: 'stable' },
    { rank: 4, name: 'Patricia B.', level: 'L4', score: 92, trend: 'down' },
    { rank: 5, name: 'Robert C.', level: 'L3', score: 88, trend: 'up' },
];

// --- Components ---

const RiskMapTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div style={{ backgroundColor: '#1E1E1E', border: `1px solid ${data.color}`, borderRadius: '6px', padding: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                <h4 style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>{data.company}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', color: data.color, fontWeight: 'bold', textTransform: 'uppercase' }}>{data.risk} RISK</span>
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    <div>Active Exclusions: <span style={{ color: 'white', fontWeight: 'bold' }}>{data.drivers}</span></div>
                    <div>Min Suspension: <span style={{ color: 'white' }}>{data.recovery}</span></div>
                </div>
            </div>
        );
    }
    return null;
};

const RedListLeaderboard = () => {
    const totalExcluded = riskMapData.reduce((acc, curr) => acc + curr.drivers, 0);
    const riskyCompanies = riskMapData.filter(d => d.risk !== 'low').length;

    return (
        <div style={{
            backgroundColor: '#121212',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            padding: '24px',
            fontFamily: '"Inter", sans-serif',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{ marginBottom: '24px', flexShrink: 0 }}>
                <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#ef4444', letterSpacing: '1px', lineHeight: 1 }}>
                    RED LIST RISK & DRIVER RANKING
                </h1>
                <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>
                    Contractor Exclusion Map & L1-L5 Performance Leaderboard
                </p>
            </div>

            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', minHeight: 0 }}>

                {/* 1. Dynamic Risk Map (Replaces Red List Table) */}
                <div style={{
                    backgroundColor: '#1E1E1E',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ padding: '16px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ShieldAlert color="#ef4444" size={20} />
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>CONTRACTOR RISK MAP</h3>
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', gap: '12px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span> High (4+)</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span> Med (2-3)</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span> Low (0-1)</span>
                        </div>
                    </div>

                    <div style={{ flex: 1, position: 'relative', width: '100%' }}>
                        {/* Abstract Map Background */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'radial-gradient(circle at 50% 50%, #2a2a2a 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                            opacity: 0.3,
                            zIndex: 0
                        }}></div>

                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <XAxis type="number" dataKey="x" name="stature" domain={[0, 100]} hide />
                                <YAxis type="number" dataKey="y" name="weight" domain={[0, 100]} hide />
                                <ZAxis type="number" dataKey="z" range={[100, 1000]} name="score" />
                                <Tooltip content={<RiskMapTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Companies" data={riskMapData} fill="#8884d8">
                                    {riskMapData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={1} />
                                    ))}
                                </Scatter>
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Global Alert */}
                    <div style={{ padding: '12px 16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderTop: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <AlertTriangle size={18} color="#ef4444" />
                        <div>
                            <span style={{ color: '#fca5a5', fontWeight: 'bold', fontSize: '13px' }}>CRITICAL WARNING: </span>
                            <span style={{ color: '#e2e8f0', fontSize: '13px' }}>{riskyCompanies} Companies with Active Exclusions. Total <span style={{ fontWeight: 'bold', color: 'white' }}>{totalExcluded} Drivers</span> Affected.</span>
                        </div>
                    </div>
                </div>

                {/* 2. L1-L5 Leaderboard (Preserved) */}
                <div style={{
                    backgroundColor: '#1E1E1E',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    <div style={{ padding: '16px', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Trophy color="#f59e0b" size={20} />
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>L1-L5 LEADERBOARD</h3>
                    </div>

                    {/* Legend / Pyramid Section */}
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid #333' }}>
                        {levels.map((lvl) => (
                            <div key={lvl.level} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px 12px',
                                backgroundColor: 'rgba(30, 30, 30, 0.5)',
                                border: `1px solid ${lvl.color}30`,
                                borderRadius: '6px',
                                borderLeft: `4px solid ${lvl.color}`
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ padding: '6px', borderRadius: '50%', backgroundColor: `${lvl.color}15` }}>
                                        <lvl.icon size={14} color={lvl.color} />
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '13px', fontWeight: '800', color: lvl.color }}>{lvl.level}</span>
                                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>{lvl.title}</span>
                                        </div>
                                        <div style={{ fontSize: '10px', color: '#94a3b8' }}>{lvl.req}</div>
                                    </div>
                                </div>

                                {/* Star Rating */}
                                <div style={{ display: 'flex', gap: '2px' }}>
                                    {[...Array(lvl.stars)].map((_, i) => (
                                        <Star key={i} size={10} fill={lvl.color} color={lvl.color} />
                                    ))}
                                    {[...Array(5 - lvl.stars)].map((_, i) => (
                                        <Star key={`empty-${i}`} size={10} color="#333" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #333' }}>
                                    <th style={{ textAlign: 'left', padding: '8px', color: '#94a3b8', fontSize: '12px' }}>RANK</th>
                                    <th style={{ textAlign: 'left', padding: '8px', color: '#94a3b8', fontSize: '12px' }}>NAME</th>
                                    <th style={{ textAlign: 'center', padding: '8px', color: '#94a3b8', fontSize: '12px' }}>LEVEL</th>
                                    <th style={{ textAlign: 'right', padding: '8px', color: '#94a3b8', fontSize: '12px' }}>SCORE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {l1l5Data.map((driver) => (
                                    <tr key={driver.rank} style={{ borderBottom: '1px solid #2a2a2a' }}>
                                        <td style={{ padding: '12px 8px' }}>
                                            {driver.rank === 1 && <Medal size={16} color="#fbbf24" />}
                                            {driver.rank === 2 && <Medal size={16} color="#94a3b8" />}
                                            {driver.rank === 3 && <Medal size={16} color="#b45309" />}
                                            {driver.rank > 3 && <span style={{ color: '#64748b', fontWeight: 'bold', marginLeft: '4px' }}>{driver.rank}</span>}
                                        </td>
                                        <td style={{ padding: '12px 8px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <User size={12} color="#94a3b8" />
                                                </div>
                                                <span style={{ color: 'white', fontWeight: '500', fontSize: '13px' }}>{driver.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                                            <span style={{
                                                fontSize: '11px',
                                                fontWeight: 'bold',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                backgroundColor: driver.level === 'L5' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                                color: driver.level === 'L5' ? '#22c55e' : '#3b82f6'
                                            }}>
                                                {driver.level}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                                            <span style={{ color: 'white', fontWeight: 'bold' }}>{driver.score}%</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RedListLeaderboard;
