import { useState } from 'react';
import {
    BookOpen, GraduationCap, Users,
    TrendingUp, Shield,
    Target, Bell, ShieldCheck
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, ComposedChart, Area, Line
} from 'recharts';
import { useSafeEquip } from '../context/SafeEquipContext';
import { SENSIBILISATION_DATA, GET_TOTAL_SENSIBILISATIONS } from '../data/sensibilisationData';

// --- Static Data Definitions ---
const DEPT_DATA = [
    { name: 'Mining (Mexco)', theory: 213, employees: 1398, redListed: 45 },
    { name: 'HSE', theory: 4, employees: 157, redListed: 6 },
    { name: 'Plant', theory: 2, employees: 167, redListed: 8 },
    { name: 'Transport', theory: 25, employees: 195, redListed: 9 },
    { name: 'Civil Svcs', theory: 0, employees: 227, redListed: 12 },
    { name: 'Lean Prod', theory: 0, employees: 167, redListed: 7 },
    { name: 'Sulphite', theory: 0, employees: 167, redListed: 8 },
    { name: 'Tailings', theory: 0, employees: 78, redListed: 4 },
];

const TOPIC_REACH = [
    { topic: 'Fatigue', reached: 450, target: 1200, color: '#f97316' },
    { topic: 'Speeding', reached: 890, target: 1200, color: '#06b6d4' },
    { topic: 'Reversing', reached: 320, target: 1200, color: '#3b82f6' },
    { topic: 'Brakes', reached: 150, target: 1200, color: '#ef4444' },
];

const CULTURE_CORRELATION = [
    { month: 'Oct', sessions: 12, incidents: 8 },
    { month: 'Nov', sessions: 18, incidents: 6 },
    { month: 'Dec', sessions: 25, incidents: 4 },
    { month: 'Jan', sessions: 42, incidents: 5 },
    { month: 'Feb', sessions: 55, incidents: 2 },
];

// --- Component: Icon3D ---
const Icon3D = ({ icon: Icon, color, size = 20 }: { icon: any, color: string, size?: number }) => (
    <div style={{
        width: `${size + 16}px`, height: `${size + 16}px`, borderRadius: '12px',
        background: `linear-gradient(145deg, ${color}20, ${color}08)`,
        border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
        <Icon size={size} color={color} />
    </div>
);

// --- Component: Certification Funnel ---
const CertificationFunnel = ({ totalTarget, totalTheory, totalPractice }: any) => {
    const steps = [
        { label: 'POPULATION', value: totalTarget, color: '#475569', icon: Users, width: '100%' },
        { label: 'THEORY (VOC)', value: totalTheory, color: '#06b6d4', icon: BookOpen, width: '85%' },
        { label: 'COMPETENT', value: totalPractice, color: '#22c55e', icon: GraduationCap, width: '70%' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
            {steps.map((step, i) => (
                <div key={i} style={{
                    width: step.width, padding: '14px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.03)', border: `1px solid ${step.color}40`,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <step.icon size={14} color={step.color} />
                        <span style={{ fontSize: '9px', fontWeight: '900', color: step.color, letterSpacing: '1px' }}>{step.label}</span>
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: '900', color: 'white' }}>{step.value.toLocaleString()}</span>
                </div>
            ))}
        </div>
    );
};

// --- Main Page Component ---
const TrainingVocStats = () => {
    const { TOTAL_POPULATION } = useSafeEquip();
    const [activeTab, setActiveTab] = useState<'VOC' | 'SAFETY'>('VOC');

    const totalSensibilisations = GET_TOTAL_SENSIBILISATIONS();
    const coveragePct = (244 / TOTAL_POPULATION) * 100;

    return (
        <div style={{
            backgroundColor: '#0a0a0f', height: '100%', color: 'white',
            padding: '24px', fontFamily: '"Inter", sans-serif', overflow: 'hidden',
            display: 'flex', flexDirection: 'column'
        }}>
            <style>{`
                .tab-btn { background: transparent; border: none; padding: 12px 24px; color: #64748b; font-size: 11px; font-weight: 900; letter-spacing: 2px; cursor: pointer; transition: all 0.3s; position: relative; }
                .tab-btn.active { color: #06b6d4; }
                .tab-btn.active::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: #06b6d4; box-shadow: 0 0 10px #06b6d4; }
                .glass-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 24px; }
            `}</style>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '4px', textTransform: 'uppercase', margin: 0 }}>
                        WORKFORCE <span style={{ color: '#06b6d4' }}>AWARENESS & TRAINING</span>
                    </h1>
                    <p style={{ fontSize: '10px', color: '#475569', fontWeight: '800', marginTop: '4px', letterSpacing: '1px' }}>VME HUMAN FACTOR • KINSEVERE SITE</p>
                </div>
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '12px' }}>
                    <button className={`tab-btn ${activeTab === 'VOC' ? 'active' : ''}`} onClick={() => setActiveTab('VOC')}>VOC & TECHNICAL TRAINING</button>
                    <button className={`tab-btn ${activeTab === 'SAFETY' ? 'active' : ''}`} onClick={() => setActiveTab('SAFETY')}>SAFETY AWARENESS & BRIEFINGS</button>
                </div>
            </div>

            {activeTab === 'VOC' ? (
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', overflowY: 'auto' }}>
                    {/* Left: Certification Gatekeeper */}
                    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <ShieldCheck size={20} color="#06b6d4" />
                            <h3 style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '1px' }}>CERTIFICATION GATEKEEPER</h3>
                        </div>
                        <CertificationFunnel totalTarget={TOTAL_POPULATION} totalTheory={244} totalPractice={5} />
                        <div style={{ marginTop: 'auto', padding: '20px', background: 'rgba(6,182,212,0.05)', borderRadius: '12px', border: '1px solid rgba(6,182,212,0.2)' }}>
                            <div style={{ fontSize: '9px', fontWeight: '900', color: '#06b6d4', marginBottom: '8px' }}>GLOBAL TRAINING COVERAGE</div>
                            <div style={{ fontSize: '28px', fontWeight: '900', color: 'white' }}>{coveragePct.toFixed(1)}%</div>
                            <p style={{ fontSize: '9px', color: '#64748b', marginTop: '4px' }}>Target: 2,976 Site Wide Personnel</p>
                        </div>
                    </div>

                    {/* Middle: Departmental Rankings */}
                    <div className="glass-card" style={{ gridColumn: 'span 2' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Target size={20} color="#06b6d4" />
                                <h3 style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '1px' }}>DEPARTMENTAL VOC LEADERBOARD</h3>
                            </div>
                            <div style={{ fontSize: '10px', fontWeight: '900', color: '#64748b' }}>SORTED BY VOLUME</div>
                        </div>
                        <div style={{ height: '100%', minHeight: '400px' }}>
                            <ResponsiveContainer width="100%" height="80%">
                                <BarChart data={DEPT_DATA} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={120} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ background: '#0a0a0f', border: '1px solid rgba(6,182,212,0.3)', color: 'white' }} />
                                    <Bar dataKey="theory" fill="#06b6d4" radius={[0, 4, 4, 0]} barSize={20}>
                                        {DEPT_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.theory > 100 ? '#06b6d4' : '#3b82f6'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
                    {/* Top Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                        {[
                            { label: 'TOTAL SESSIONS', val: SENSIBILISATION_DATA.length, icon: Bell, col: '#f97316' },
                            { label: 'PERSONNEL REACHED', val: totalSensibilisations, icon: Users, col: '#06b6d4' },
                            { label: 'CRITICAL TOPICS', val: '4', icon: Target, col: '#ef4444' },
                            { label: 'AWARENESS TREND', val: '+22%', icon: TrendingUp, col: '#22c55e' }
                        ].map((kpi, idx) => (
                            <div key={idx} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <Icon3D icon={kpi.icon} color={kpi.col} />
                                <div>
                                    <p style={{ fontSize: '9px', fontWeight: '900', color: '#64748b', margin: 0 }}>{kpi.label}</p>
                                    <p style={{ fontSize: '20px', fontWeight: '900', margin: 0 }}>{kpi.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Analytics Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', flex: 1 }}>
                        <div className="glass-card">
                            <h3 style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '1px', marginBottom: '24px', color: '#f97316' }}>MEMO TOPIC PENETRATION</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {TOPIC_REACH.map(t => (
                                    <div key={t.topic}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: '900' }}>{t.topic.toUpperCase()}</span>
                                            <span style={{ fontSize: '11px', fontWeight: '900', color: t.color }}>{((t.reached / t.target) * 100).toFixed(0)}%</span>
                                        </div>
                                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{ width: `${(t.reached / t.target) * 100}%`, height: '100%', background: t.color, borderRadius: '3px' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card">
                            <h3 style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '1px', marginBottom: '24px', color: '#06b6d4' }}>CULTURE ENGINE: AWARENESS VS INCIDENTS</h3>
                            <div style={{ height: '240px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={CULTURE_CORRELATION}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis dataKey="month" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                                        <YAxis yAxisId="left" hide />
                                        <YAxis yAxisId="right" hide />
                                        <Tooltip contentStyle={{ background: '#0a0a0f', border: '1px solid rgba(6,182,212,0.3)', color: 'white' }} />
                                        <Area yAxisId="left" type="monotone" dataKey="sessions" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" strokeWidth={3} />
                                        <Line yAxisId="right" type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 4 }} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '12px', height: '4px', background: '#06b6d4', borderRadius: '2px' }} />
                                    <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '800' }}>SESSIONS REACHED</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '12px', height: '4px', background: '#ef4444', borderRadius: '2px' }} />
                                    <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '800' }}>INCIDENTS RECORDED</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Shield size={14} color="#06b6d4" />
                        <span style={{ fontSize: '10px', color: '#445566', fontWeight: '800' }}>VME COMPLIANCE ARCHITECTURE</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#445566', fontWeight: '800' }}>SYSTEM: ENFORCED</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '11px', fontWeight: '900', color: 'white', letterSpacing: '1px' }}>DAN KAHILU</div>
                        <div style={{ fontSize: '8px', fontWeight: '800', color: '#06b6d4' }}>CHIEF SYSTEMS ARCHITECT</div>
                    </div>
                    <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/MMG_Logo.svg/1000px-MMG_Logo.svg.png" alt="MMG" style={{ height: '18px', opacity: 0.8 }} />
                </div>
            </div>
        </div>
    );
};

export default TrainingVocStats;
