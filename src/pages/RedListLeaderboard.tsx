import { useState } from 'react';
import {
    Zap, Trophy,
    UserX, Target,
    UserCheck, Shield, ShieldCheck, Scale
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { useSafeEquip } from '../context/SafeEquipContext';

// --- Data Engine: Merit Hub Champions ---
const EXCELLENCE_OPERATORS = [
    {
        id: 'OP-01',
        name: 'Lukoka Kyembe Alexandre',
        company: 'MEXCO',
        unit: 'Rigid Truck 100T',
        hours: 7200,
        record: '4 Years',
        score: '98.8%'
    },
    {
        id: 'OP-02',
        name: 'Kimba Ngandwe Omer',
        company: 'MEXCO',
        unit: 'Excavator',
        hours: 7200,
        record: '4 Years',
        score: '97.5%'
    },
    {
        id: 'OP-03',
        name: 'Feruzi Yuma FeFe',
        company: 'MMG',
        unit: 'Excavator',
        hours: 3400,
        record: '3 Years',
        score: '96.2%'
    },
];

// --- Data Engine: Digital Red List (Sanctioned Operators) ---
const RED_LIST_DATA = [
    { name: 'Mutombo Kalonji', company: 'Bus Trans', level: 'L3', penaltyStart: 'Jan 17, 2026', penaltyEnd: 'Feb 17, 2026', status: 'REVOKED' },
    { name: 'Kabongo Mwamba', company: 'Bus Trans', level: 'L3', penaltyStart: 'Jan 18, 2026', penaltyEnd: 'Feb 18, 2026', status: 'REVOKED' },
    { name: 'Ilunga Kasongo', company: 'MEXCO', level: 'L2', penaltyStart: 'Feb 05, 2026', penaltyEnd: 'Feb 19, 2026', status: 'SUSPENDED' },
    { name: 'Mbuyi Tshite', company: 'Orica', level: 'L1', penaltyStart: 'Jan 14, 2026', penaltyEnd: 'Jan 21, 2026', status: 'RESTRICTED' },
];

const SANCTION_MATRIX = [
    { level: 'L1', severity: 'Minor', color: '#fbbf24', breach: 'Speeding < 5km/h', consequence: 'Formal Warning / Points' },
    { level: 'L2', severity: 'Moderate', color: '#f97316', breach: 'Reckless Reversing', consequence: '7-14 Day Suspension' },
    { level: 'L3', severity: 'High', color: '#ef4444', breach: 'Brake Failure Bypass', consequence: '30-Day Revocation' },
    { level: 'L4', severity: 'Catastrophic', color: '#7e22ce', breach: 'Unauthorized Entry', consequence: 'Immediate Termination' },
];

const RADAR_DATA = [
    { subject: 'Mining', A: 4, fullMark: 5 },
    { subject: 'Transport', A: 4, fullMark: 5 },
    { subject: 'Civil Services', A: 3, fullMark: 5 },
    { subject: 'MEXCO', A: 4, fullMark: 5 },
    { subject: 'KINSERVE', A: 2, fullMark: 5 },
];

const RedListLeaderboard = () => {
    const [activeTab, setActiveTab] = useState<'PERMIT' | 'MERIT'>('PERMIT');

    return (
        <div style={{
            backgroundColor: '#0a0a0f',
            height: '100%',
            color: 'white',
            fontFamily: '"Inter", sans-serif',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            <style>{`
                .nav-tab { padding: 12px 24px; border: none; background: transparent; color: #64748b; font-size: 11px; font-weight: 900; letter-spacing: 2px; cursor: pointer; transition: all 0.3s; position: relative; }
                .nav-tab.active { color: #06b6d4; }
                .nav-tab.active::after { content: ''; position: absolute; bottom: 0; left: 20%; right: 20%; height: 2px; background: #06b6d4; box-shadow: 0 0 10px #06b6d4; }
                .glass-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 24px; position: relative; overflow: hidden; }
                .neon-glow { text-shadow: 0 0 10px rgba(6, 182, 212, 0.4); }
                .matrix-cell { padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.03); transition: transform 0.3s; }
                .matrix-cell:hover { transform: translateY(-4px); background: rgba(255,255,255,0.04); }
            `}</style>

            {/* Header / Brand Bar */}
            <div style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '4px', textTransform: 'uppercase', margin: 0 }}>
                            OPERATIONAL <span style={{ color: '#06b6d4' }}>DISCIPLINE CENTER</span>
                        </h1>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '12px' }}>
                        <button className={`nav-tab ${activeTab === 'PERMIT' ? 'active' : ''}`} onClick={() => setActiveTab('PERMIT')}>PERMIT CONTROL HUB</button>
                        <button className={`nav-tab ${activeTab === 'MERIT' ? 'active' : ''}`} onClick={() => setActiveTab('MERIT')}>OPERATOR EXCELLENCE HUB</button>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '9px', color: '#64748b', fontWeight: '800', letterSpacing: '2px' }}>VME COMPLIANCE</div>
                        <div style={{ fontSize: '14px', fontWeight: '900' }}>VME-2026-DC</div>
                    </div>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Shield color="#06b6d4" size={20} />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                {activeTab === 'PERMIT' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        {/* Top: Matrix & Radar */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px' }}>
                            <div className="glass-card">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                    <Scale size={20} color="#f97316" />
                                    <h3 style={{ fontSize: '14px', fontWeight: '900', letterSpacing: '1px' }}>INTERACTIVE SANCTION MATRIX</h3>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                                    {SANCTION_MATRIX.map(s => (
                                        <div key={s.level} className="matrix-cell" style={{ borderTop: `4px solid ${s.color}` }}>
                                            <div style={{ fontSize: '11px', fontWeight: '900', color: s.color, marginBottom: '8px' }}>{s.level} - {s.severity.toUpperCase()}</div>
                                            <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '12px', color: 'white' }}>{s.breach}</div>
                                            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '600', lineHeight: '1.4' }}>{s.consequence}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', width: '100%' }}>
                                    <Target size={20} color="#06b6d4" />
                                    <h3 style={{ fontSize: '14px', fontWeight: '900', letterSpacing: '1px' }}>INFRACTION RADAR</h3>
                                </div>
                                <div style={{ height: '220px', width: '100%' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                                            <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: '800' }} />
                                            <Radar name="Density" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Bottom: The Red List */}
                        <div className="glass-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <UserX size={20} color="#ef4444" />
                                    <h3 style={{ fontSize: '14px', fontWeight: '900', letterSpacing: '1px' }}>THE DIGITAL RED LIST (RESTRICTED ACCESS)</h3>
                                </div>
                                <div style={{ padding: '4px 12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', fontSize: '10px', fontWeight: '900', color: '#ef4444' }}>
                                    {RED_LIST_DATA.length} ACTIVE SANCTIONS
                                </div>
                            </div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                        {['OPERATOR NAME', 'COMPANY', 'BREACH LEVEL', 'PENALTY START', 'PENALTY END', 'STATUS'].map(h => (
                                            <th key={h} style={{ padding: '16px 20px', fontSize: '10px', fontWeight: '800', color: '#64748b', letterSpacing: '1px' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {RED_LIST_DATA.map((op, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                            <td style={{ padding: '20px', fontSize: '13px', fontWeight: '800' }}>{op.name}</td>
                                            <td style={{ padding: '20px', fontSize: '12px', color: '#94a3b8' }}>{op.company}</td>
                                            <td style={{ padding: '20px' }}>
                                                <span style={{
                                                    padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: '900',
                                                    color: op.level === 'L3' ? '#ef4444' : '#f97316',
                                                    background: op.level === 'L3' ? 'rgba(239,68,68,0.1)' : 'rgba(249,115,22,0.1)',
                                                    border: `1px solid ${op.level === 'L3' ? '#ef444440' : '#f9731640'}`
                                                }}>{op.level} Impact</span>
                                            </td>
                                            <td style={{ padding: '20px', fontSize: '11px', color: '#64748b' }}>{op.penaltyStart}</td>
                                            <td style={{ padding: '20px', fontSize: '11px', color: '#64748b' }}>{op.penaltyEnd}</td>
                                            <td style={{ padding: '20px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: op.status === 'REVOKED' ? '#ef4444' : '#f97316' }} />
                                                    <span style={{ fontSize: '11px', fontWeight: '900', color: 'white' }}>{op.status}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        {/* Excellence Board Champions */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                            {EXCELLENCE_OPERATORS.map(op => (
                                <div key={op.id} className="glass-card" style={{ border: '1px solid rgba(6, 182, 212, 0.2)', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(0, 0, 0, 0))' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <UserCheck color="#06b6d4" size={32} />
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <Trophy color="#fbbf24" size={24} />
                                            <div style={{ fontSize: '12px', fontWeight: '900', color: '#fbbf24', marginTop: '4px' }}>{op.score} KPI</div>
                                        </div>
                                    </div>
                                    <h4 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '4px' }}>{op.name}</h4>
                                    <p style={{ fontSize: '11px', color: '#64748b', fontWeight: '900', letterSpacing: '1px', marginBottom: '24px' }}>{op.company.toUpperCase()} • {op.unit.toUpperCase()}</p>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                                        <div>
                                            <div style={{ fontSize: '9px', color: '#475569', fontWeight: '800' }}>MASTERED HOURS</div>
                                            <div style={{ fontSize: '20px', fontWeight: '900', color: '#06b6d4' }}>{op.hours}H</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '9px', color: '#475569', fontWeight: '800' }}>SAFE RECORD</div>
                                            <div style={{ fontSize: '20px', fontWeight: '900', color: 'white' }}>{op.record}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Merit Radar / Metrics */}
                        <div className="glass-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                                <Zap size={20} color="#06b6d4" />
                                <h3 style={{ fontSize: '14px', fontWeight: '900', letterSpacing: '1px' }}>SAFETY PERFORMANCE BY CONTRACTOR (MERIT RADAR)</h3>
                            </div>
                            <div style={{ height: '300px', width: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                                        <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: '800' }} />
                                        <Radar name="Performance" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} strokeWidth={3} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Architectural Footer */}
            <div style={{ padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', gap: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ShieldCheck size={14} color="#06b6d4" />
                        <span style={{ fontSize: '10px', color: '#475569', fontWeight: '800' }}>OPERATIONAL LOCK: ACTIVE</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#475569', fontWeight: '800' }}>SYSTEM STATUS: ENFORCED</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '9px', color: '#475569', fontWeight: '800' }}>CHIEF SYSTEMS ARCHITECT</div>
                        <div style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '1px' }}>DAN KAHILU</div>
                    </div>
                    <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/MMG_Logo.svg/1000px-MMG_Logo.svg.png" alt="MMG" style={{ height: '18px', opacity: 0.8 }} />
                </div>
            </div>
        </div>
    );
};

export default RedListLeaderboard;
