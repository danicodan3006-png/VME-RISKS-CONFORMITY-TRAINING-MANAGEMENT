
import React from 'react';
import { AlertTriangle, Lock, Trophy, Medal, ChevronRight, UserX, UserCheck, Star } from 'lucide-react';

// --- Data ---
const redList = [
    { id: 'DRV-089', name: 'Jean Kabeya', company: 'MMG', cause: 'Accident 12/02 - Speeding', date: '2026-02-12', coaching: '5h/20h', status: 'CRITICAL' },
    { id: 'DRV-112', name: 'Patrick Ilunga', company: 'MEXCO', cause: 'VOC < 90% (Theory)', date: '2026-02-15', coaching: '0h/10h', status: 'SUSPENDED' },
    { id: 'DRV-045', name: 'Michel Mwamba', company: 'WHCC', cause: 'Negligence - Pre-start check', date: '2026-02-10', coaching: '15h/20h', status: 'REVIEW' },
];

const topPerformers = [
    { id: 'DRV-001', name: 'Alain Tshimanga', company: 'MMG', level: 'L5', since: '2021', daysSafe: 1850 },
    { id: 'DRV-023', name: 'Robert Kasongo', company: 'MMG', level: 'L5', since: '2022', daysSafe: 1540 },
    { id: 'DRV-056', name: 'David Mutombo', company: 'MEXCO', level: 'L4', since: '2024', daysSafe: 780 },
    { id: 'DRV-078', name: 'Tresor Luba', company: 'WHCC', level: 'L4', since: '2024', daysSafe: 750 },
    { id: 'DRV-102', name: 'Eric Ngoy', company: 'EPS', level: 'L3', since: '2025', daysSafe: 420 },
];

const levels = [
    { level: 'L5', title: 'DIAMOND', color: '#b9f2ff', req: '5 Years Safe', icon: Star },
    { level: 'L4', title: 'GOLD', color: '#ffd700', req: '2 Years Safe', icon: Medal },
    { level: 'L3', title: 'SILVER', color: '#c0c0c0', req: '1 Year Safe + 20h Coaching', icon: Medal },
    { level: 'L2', title: 'BRONZE', color: '#cd7f32', req: '1 Year Safe', icon: Medal },
    { level: 'L1', title: 'BLUE BADGE', color: '#3b82f6', req: '90% VOC', icon: UserCheck },
];

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

const RedListLeaderboard = () => {
    const totalExcluded = redList.length + 12; // Mock total
    const totalElite = topPerformers.length + 45; // Mock total

    return (
        <div style={{
            backgroundColor: '#121212',
            minHeight: '100vh',
            color: 'white',
            padding: '32px',
            fontFamily: '"Inter", sans-serif'
        }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'white', letterSpacing: '-1px', marginBottom: '8px' }}>
                    RED LIST & <span style={{ color: '#ffd700' }}>LEADERBOARD</span>
                </h1>
                <p style={{ color: '#64748b' }}>Critical Exclusions & Elite Driver Recognition</p>
            </div>

            {/* Stats Widget */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <DarkCard style={{ borderLeft: '4px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <p style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase' }}>Excluded Drivers</p>
                        <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#ef4444' }}>{totalExcluded}</h2>
                    </div>
                    <div style={{ padding: '16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%' }}>
                        <UserX size={32} color="#ef4444" />
                    </div>
                </DarkCard>

                <DarkCard style={{ borderLeft: '4px solid #ffd700', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <p style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase' }}>Elite Drivers (L4/L5)</p>
                        <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#ffd700' }}>{totalElite}</h2>
                    </div>
                    <div style={{ padding: '16px', backgroundColor: 'rgba(255, 215, 0, 0.1)', borderRadius: '50%' }}>
                        <Trophy size={32} color="#ffd700" />
                    </div>
                </DarkCard>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>

                {/* Red List Section */}
                <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <AlertTriangle size={24} /> RED LIST (CRITICAL EXCLUSIONS)
                    </h3>
                    <DarkCard style={{ border: '1px solid #ef4444', boxShadow: '0 4px 20px rgba(239, 68, 68, 0.1)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0', fontSize: '14px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #333', color: '#64748b', textTransform: 'uppercase', fontSize: '12px' }}>
                                    <th style={{ textAlign: 'left', padding: '16px' }}>Driver</th>
                                    <th style={{ textAlign: 'left', padding: '16px' }}>Company</th>
                                    <th style={{ textAlign: 'left', padding: '16px' }}>Cause</th>
                                    <th style={{ textAlign: 'center', padding: '16px' }}>Withdrawal Date</th>
                                    <th style={{ textAlign: 'left', padding: '16px' }}>Coaching Status</th>
                                    <th style={{ textAlign: 'right', padding: '16px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {redList.map((driver) => (
                                    <tr key={driver.id} style={{ borderBottom: '1px solid #333' }}>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ fontWeight: 'bold', color: 'white' }}>{driver.name}</div>
                                            <div style={{ fontSize: '12px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}><Lock size={10} /> {driver.id}</div>
                                        </td>
                                        <td style={{ padding: '16px' }}>{driver.company}</td>
                                        <td style={{ padding: '16px', color: '#fca5a5' }}>{driver.cause}</td>
                                        <td style={{ padding: '16px', textAlign: 'center' }}>{driver.date}</td>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ flex: 1, backgroundColor: '#333', height: '6px', borderRadius: '3px', width: '80px' }}>
                                                    <div style={{ width: `${(parseInt(driver.coaching.split('h')[0]) / parseInt(driver.coaching.split('/')[1])) * 100}%`, backgroundColor: '#ef4444', height: '100%', borderRadius: '3px' }}></div>
                                                </div>
                                                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{driver.coaching}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <button style={{ padding: '8px 16px', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                                                INCIDENT DETAILS
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </DarkCard>
                </div>

                {/* Leaderboard Section */}
                <div style={{ marginTop: '32px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffd700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Trophy size={24} /> L1-L5 LEADERBOARD
                    </h3>

                    {/* Rank Visuals */}
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '16px' }}>
                        {levels.map((lvl) => (
                            <div key={lvl.level} style={{
                                minWidth: '180px',
                                backgroundColor: '#1E1E1E',
                                border: `1px solid ${lvl.color}`,
                                borderRadius: '8px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                boxShadow: `0 0 15px ${lvl.color}20`
                            }}>
                                <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: `${lvl.color}20`, marginBottom: '16px' }}>
                                    <lvl.icon size={32} color={lvl.color} />
                                </div>
                                <h4 style={{ fontSize: '24px', fontWeight: '800', color: lvl.color, marginBottom: '4px' }}>{lvl.level}</h4>
                                <p style={{ fontSize: '12px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>{lvl.title}</p>
                                <p style={{ fontSize: '11px', color: '#94a3b8' }}>{lvl.req}</p>
                            </div>
                        ))}
                    </div>

                    {/* Top Performers Table */}
                    <DarkCard>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0', fontSize: '14px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #333', color: '#64748b', textTransform: 'uppercase', fontSize: '12px' }}>
                                    <th style={{ textAlign: 'left', padding: '16px' }}>Rank</th>
                                    <th style={{ textAlign: 'left', padding: '16px' }}>Driver</th>
                                    <th style={{ textAlign: 'left', padding: '16px' }}>Company</th>
                                    <th style={{ textAlign: 'center', padding: '16px' }}>Level</th>
                                    <th style={{ textAlign: 'center', padding: '16px' }}>Days Safe</th>
                                    <th style={{ textAlign: 'right', padding: '16px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topPerformers.map((driver, index) => {
                                    const lvl = levels.find(l => l.level === driver.level);
                                    return (
                                        <tr key={driver.id} style={{ borderBottom: '1px solid #333' }}>
                                            <td style={{ padding: '16px', fontWeight: 'bold', color: '#94a3b8' }}>#{index + 1}</td>
                                            <td style={{ padding: '16px' }}>
                                                <div style={{ fontWeight: 'bold', color: 'white' }}>{driver.name}</div>
                                                <div style={{ fontSize: '12px', color: '#64748b' }}>{driver.id}</div>
                                            </td>
                                            <td style={{ padding: '16px' }}>{driver.company}</td>
                                            <td style={{ padding: '16px', textAlign: 'center' }}>
                                                <span style={{
                                                    padding: '4px 12px',
                                                    borderRadius: '20px',
                                                    backgroundColor: `${lvl?.color}20`,
                                                    color: lvl?.color,
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    border: `1px solid ${lvl?.color}40`
                                                }}>
                                                    {driver.level} - {lvl?.title}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px', textAlign: 'center', fontWeight: 'bold', color: '#22c55e' }}>{driver.daysSafe}</td>
                                            <td style={{ padding: '16px', textAlign: 'right' }}>
                                                <button
                                                    onClick={() => alert(`Promoting ${driver.name} to next level... verifying safety records.`)}
                                                    style={{
                                                        padding: '8px 16px',
                                                        backgroundColor: '#3b82f6',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                        fontWeight: 'bold',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        marginLeft: 'auto'
                                                    }}>
                                                    <ChevronRight size={16} /> PROMOTE
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </DarkCard>
                </div>

            </div>
        </div>
    );
};

export default RedListLeaderboard;
