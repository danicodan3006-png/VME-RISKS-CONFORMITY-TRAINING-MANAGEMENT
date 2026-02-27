
import { useState } from 'react';
import {
    Clock,
    Shield,
    Search
} from 'lucide-react';
import { useSafeEquip } from '../context/SafeEquipContext';

// --- Mock Action Data ---
const ACTIONS_DATA = [
    {
        id: 'ACC-01',
        date: '2026-01-15',
        dept: 'MEXCO',
        description: 'Loader 08 vs Bollards',
        rootCause: 'Operator Error / Poor Judgement',
        correctiveAction: 'Reinforce defensive driving, install high-visibility bollards, review loader operating procedures',
        eventManagement: 'Controlled',
        owner: 'Maintenance Team',
        dueDate: '2026-01-30',
        status: 'Closed'
    },
    {
        id: 'ACC-02',
        date: '2026-01-14',
        dept: 'ORICA',
        description: 'MMU02 Yard incident',
        rootCause: 'Inadequate site coordination',
        correctiveAction: 'Review yard traffic management plan, reinforce site safety rules for contractors',
        eventManagement: 'Controlled',
        owner: 'Facility Management',
        dueDate: '2026-01-25',
        status: 'Closed'
    },
    {
        id: 'ACC-03',
        date: '2026-01-17',
        dept: 'Transport Admin',
        description: 'Bus TR464 incident',
        rootCause: 'Mechanical failure / Brake system',
        correctiveAction: 'Immediate fleet inspection, review maintenance schedule for all buses',
        eventManagement: 'Uncontrolled',
        owner: 'Transport Ops',
        dueDate: '2026-01-20',
        status: 'Ongoing'
    },
    {
        id: 'ACC-04',
        date: '2026-01-18',
        dept: 'Transport Admin',
        description: 'Bus TR447 incident',
        rootCause: 'Brake failure / Inadequate maintenance',
        correctiveAction: 'Suspend TR447, full audit of transport contractor maintenance logs',
        eventManagement: 'Uncontrolled',
        owner: 'Transport Ops',
        dueDate: '2026-01-25',
        status: 'Ongoing'
    },
    {
        id: 'ACC-05',
        date: '2026-02-05',
        dept: 'Transport Services',
        description: 'Solar Pole contact during truck reversing',
        rootCause: 'Failure to use spotter',
        correctiveAction: 'Mandatory spotter training, install rear-view cameras on all TR trucks',
        eventManagement: 'Controlled',
        owner: 'Logistics Safety',
        dueDate: '2026-02-15',
        status: 'Closed'
    },
    {
        id: 'ACC-06',
        date: '2026-02-08',
        dept: 'HSE / CAC',
        description: 'Dog unit brake failure',
        rootCause: 'Inadequate inspection and maintenance',
        correctiveAction: 'Reinforce preventive maintenance inspections, review brake system SOPs',
        eventManagement: 'Controlled',
        owner: 'Maintenance Team',
        dueDate: '2026-02-28',
        status: 'Ongoing'
    },
    {
        id: 'ACC-07',
        date: '2026-02-17',
        dept: 'Civil Services / TKM',
        description: 'Boom Truck contact with light pole',
        rootCause: 'Poor judgement by operator',
        correctiveAction: 'Suspend driver permit pending reassessment, defensive driving refresher',
        eventManagement: 'Controlled',
        owner: 'HSE Dept',
        dueDate: '2026-03-05',
        status: 'Closed'
    }
];

// --- KPI Card Component ---
const KPICard = ({ title, value, subtext, icon: Icon, color, glowColor, isHighTech }: any) => (
    <div style={{
        backgroundColor: isHighTech ? 'rgba(30,30,35,0.6)' : '#ffffff',
        border: isHighTech ? `1px solid ${color}30` : '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        backdropFilter: isHighTech ? 'blur(12px)' : 'none',
        boxShadow: isHighTech ? `0 4px 20px rgba(0,0,0,0.3), inset 0 0 10px ${glowColor}10` : '0 4px 6px -1px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden'
    }}>
        <div style={{
            position: 'absolute',
            top: 0, right: 0,
            width: '60px', height: '60px',
            background: `radial-gradient(circle at top right, ${glowColor}15, transparent 70%)`
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{title}</span>
            <Icon size={18} color={color} />
        </div>
        <div style={{
            fontSize: '32px',
            fontWeight: '900',
            color: isHighTech ? 'white' : '#1e293b',
            fontFamily: '"Roboto Mono", monospace',
            textShadow: isHighTech ? `0 0 15px ${glowColor}40` : 'none'
        }}>
            {value}
        </div>
        <span style={{ fontSize: '10px', color: '#475569', fontWeight: '600' }}>{subtext}</span>
    </div>
);

// --- Status Badge ---
const StatusBadge = ({ status }: { status: string }) => {
    let color = '#f59e0b';
    let bgColor = 'rgba(245, 158, 11, 0.1)';
    let animation = 'none';

    if (status === 'Overdue') {
        color = '#ef4444';
        bgColor = 'rgba(239, 68, 68, 0.15)';
        animation = 'pulseRed 2s infinite';
    } else if (status === 'Closed') {
        color = '#22c55e';
        bgColor = 'rgba(34, 197, 94, 0.15)';
    } else if (status === 'Pending') {
        animation = 'glowAmber 2s infinite';
    }

    return (
        <span style={{
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '9px',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color,
            backgroundColor: bgColor,
            border: `1px solid ${color}30`,
            animation,
            display: 'inline-block'
        }}>
            {status}
        </span>
    );
};

const AccidentManagement = () => {
    const { dataset, theme } = useSafeEquip();
    const isHighTech = theme === 'high-tech';
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAction, setSelectedAction] = useState<any>(null);
    const [hoveredCell, setHoveredCell] = useState<{ text: string; x: number; y: number } | null>(null);

    const totalIncidentsYTD = dataset.reduce((sum, d) => sum + d.incidents, 0);
    const openActions = ACTIONS_DATA.filter(a => a.status !== 'Closed').length;

    return (
        <div style={{
            backgroundColor: isHighTech ? '#121212' : '#f8fafc',
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            gap: '20px',
            position: 'relative',
            color: isHighTech ? 'white' : '#1e293b'
        }}>
            <style>{`
                @keyframes pulseRed {
                    0%, 100% { opacity: 1; box-shadow: 0 0 0px #ef444400; }
                    50% { opacity: 0.7; box-shadow: 0 0 10px #ef444440; }
                }
                @keyframes glowAmber {
                    0%, 100% { box-shadow: 0 0 5px #f59e0b20; }
                    50% { box-shadow: 0 0 15px #f59e0b50; }
                }
                .action-row:hover {
                    background-color: rgba(255,255,255,0.03) !important;
                    cursor: pointer;
                }
                .custom-tbody::-webkit-scrollbar { width: 4px; }
                .custom-tbody::-webkit-scrollbar-track { background: transparent; }
                .custom-tbody::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 10px; }
            `}</style>

            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '900', color: isHighTech ? 'white' : '#1e293b', letterSpacing: '-0.5px', margin: 0 }}>Accident Management</h1>
                    <p style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Compliance Action Tracking System</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{
                        backgroundColor: isHighTech ? 'rgba(255,255,255,0.03)' : '#ffffff',
                        border: isHighTech ? '1px solid #2a2a2a' : '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <Search size={14} color="#64748b" />
                        <input
                            placeholder="SEARCH ACTIONS..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ background: 'none', border: 'none', color: isHighTech ? 'white' : '#1e293b', fontSize: '11px', outline: 'none', width: '150px' }}
                        />
                    </div>
                    <button style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        color: '#3b82f6',
                        fontSize: '11px',
                        fontWeight: '800',
                        cursor: 'pointer'
                    }}>
                        EXPORT DATA
                    </button>
                </div>
            </div>

            {/* KPI Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <KPICard
                    title="Total Incidents (YTD)"
                    value={totalIncidentsYTD}
                    subtext="Synchronized with Master Feed"
                    icon={Shield}
                    color="#00F2FF"
                    glowColor="#00F2FF"
                    isHighTech={isHighTech}
                />
                <KPICard
                    title="Open Actions"
                    value={openActions}
                    subtext="Awaiting implementation"
                    icon={Clock}
                    color="#f59e0b"
                    glowColor="#f59e0b"
                    isHighTech={isHighTech}
                />
                <KPICard
                    title="Primary Root Cause"
                    value="60%"
                    subtext="Behavioral & Operator Error"
                    icon={Shield}
                    color="#ef4444"
                    glowColor="#ef4444"
                    isHighTech={isHighTech}
                />
            </div>

            {/* Main Action Tracker Table */}
            <div style={{
                flex: 1,
                backgroundColor: isHighTech ? 'rgba(30,30,35,0.4)' : '#ffffff',
                border: isHighTech ? '1px solid #2a2a2a' : '1px solid #e2e8f0',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                backdropFilter: isHighTech ? 'blur(8px)' : 'none',
                boxShadow: isHighTech ? 'none' : '0 4px 6px -1px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    padding: '16px',
                    borderBottom: isHighTech ? '1px solid #2a2a2a' : '1px solid #f1f5f9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: isHighTech ? 'rgba(255,255,255,0.02)' : 'transparent'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '4px', height: '16px', backgroundColor: '#ef4444', borderRadius: '2px' }} />
                        <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px' }}>ACTIVE SAFETY ACTIONS</span>
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }} className="custom-tbody">
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', tableLayout: 'fixed' }}>
                        <thead style={{ position: 'sticky', top: 0, backgroundColor: isHighTech ? '#1a1a1f' : '#f8fafc', zIndex: 10 }}>
                            <tr>
                                <th style={{ width: '100px', padding: '12px 16px', fontSize: '9px', fontWeight: '800', color: '#64748b', letterSpacing: '1px', borderBottom: isHighTech ? '1px solid #2a2a2a' : '1px solid #e2e8f0' }}>DATE</th>
                                <th style={{ width: '160px', padding: '12px 16px', fontSize: '9px', fontWeight: '800', color: '#64748b', letterSpacing: '1px', borderBottom: isHighTech ? '1px solid #2a2a2a' : '1px solid #e2e8f0' }}>DEPARTMENT/CONTRACTOR</th>
                                <th style={{ width: '32%', padding: '12px 16px', fontSize: '9px', fontWeight: '800', color: '#64748b', letterSpacing: '1px', borderBottom: isHighTech ? '1px solid #2a2a2a' : '1px solid #e2e8f0' }}>INCIDENT DESCRIPTION</th>
                                <th style={{ width: '38%', padding: '12px 16px', fontSize: '9px', fontWeight: '800', color: '#64748b', letterSpacing: '1px', borderBottom: isHighTech ? '1px solid #2a2a2a' : '1px solid #e2e8f0' }}>CORRECTIVE ACTION DESCRIPTION</th>
                                <th style={{ width: '200px', padding: '12px 16px', fontSize: '9px', fontWeight: '800', color: '#64748b', letterSpacing: '1px', borderBottom: isHighTech ? '1px solid #2a2a2a' : '1px solid #e2e8f0' }}>ROOT CAUSE</th>
                                <th style={{ width: '110px', padding: '12px 16px', fontSize: '9px', fontWeight: '800', color: '#64748b', letterSpacing: '1px', borderBottom: isHighTech ? '1px solid #2a2a2a' : '1px solid #e2e8f0' }}>DUE DATE</th>
                                <th style={{ width: '150px', padding: '12px 16px', fontSize: '9px', fontWeight: '800', color: '#64748b', letterSpacing: '1px', borderBottom: isHighTech ? '1px solid #2a2a2a' : '1px solid #e2e8f0' }}>EVENT MANAGEMENT</th>
                                <th style={{ width: '100px', padding: '12px 16px', fontSize: '9px', fontWeight: '800', color: '#64748b', letterSpacing: '1px', borderBottom: isHighTech ? '1px solid #2a2a2a' : '1px solid #e2e8f0' }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ACTIONS_DATA.map((row, i) => (
                                <tr
                                    key={row.id}
                                    className="action-row"
                                    onClick={() => setSelectedAction(row)}
                                    style={{
                                        borderBottom: '1px solid #1a1a1f',
                                        backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <td style={{ padding: '14px 16px', fontSize: '11px', color: '#94a3b8', fontFamily: '"Roboto Mono", monospace' }}>{row.date}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '12px', fontWeight: '700', color: isHighTech ? 'white' : '#1e293b' }}>{row.dept}</td>
                                    <td
                                        onMouseEnter={(e) => row.description.length > 100 && setHoveredCell({ text: row.description, x: e.clientX, y: e.clientY })}
                                        onMouseLeave={() => setHoveredCell(null)}
                                        style={{
                                            padding: '14px 16px',
                                            fontSize: '13px',
                                            fontWeight: '700',
                                            color: isHighTech ? 'white' : '#1e293b',
                                            lineHeight: '1.4',
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-word'
                                        }}
                                    >
                                        {row.description}
                                    </td>
                                    <td
                                        onMouseEnter={(e) => row.correctiveAction.length > 100 && setHoveredCell({ text: row.correctiveAction, x: e.clientX, y: e.clientY })}
                                        onMouseLeave={() => setHoveredCell(null)}
                                        style={{
                                            padding: '14px 16px',
                                            fontSize: '13px',
                                            fontWeight: '700',
                                            color: '#86efac',
                                            lineHeight: '1.4',
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-word'
                                        }}
                                    >
                                        {row.correctiveAction}
                                    </td>
                                    <td style={{ padding: '14px 16px', fontSize: '11px', color: '#fca5a5', minWidth: '150px' }}>{row.rootCause}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '11px', color: row.status === 'Overdue' ? '#ef4444' : '#94a3b8', fontFamily: '"Roboto Mono", monospace' }}>{row.dueDate}</td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            fontSize: '9px',
                                            fontWeight: '900',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            color: row.eventManagement === 'Controlled' ? '#00F2FF' : '#ef4444',
                                            backgroundColor: row.eventManagement === 'Controlled' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(239, 68, 68, 0.15)',
                                            border: `1px solid ${row.eventManagement === 'Controlled' ? '#00F2FF30' : '#ef444430'}`,
                                            animation: row.eventManagement === 'Uncontrolled' ? 'pulseRed 2s infinite' : 'none',
                                            display: 'inline-block'
                                        }}>
                                            {row.eventManagement}
                                        </span>
                                    </td>
                                    <td style={{ padding: '14px 16px' }}><StatusBadge status={row.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Hover Expansion Panel */}
            {hoveredCell && (
                <div style={{
                    position: 'fixed',
                    left: Math.min(hoveredCell.x, window.innerWidth - 420),
                    top: Math.max(20, hoveredCell.y - 120),
                    zIndex: 1000,
                    width: '400px',
                    backgroundColor: 'rgba(20, 20, 25, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                    pointerEvents: 'none',
                    animation: 'tooltipFade 0.2s ease-out'
                }}>
                    <p style={{ margin: 0, fontSize: '13px', color: 'white', fontWeight: '600', lineHeight: 1.6 }}>
                        {hoveredCell.text}
                    </p>
                </div>
            )}

            {/* Smart Tooltip Overlay (Detailed View) */}
            {selectedAction && (
                <div
                    onClick={() => setSelectedAction(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: '#1a1a1e',
                            border: '1px solid #334155',
                            borderRadius: '16px',
                            width: '500px',
                            padding: '24px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                            position: 'relative',
                            animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                            <div>
                                <h2 style={{ fontSize: '18px', fontWeight: '900', color: 'white', margin: 0 }}>Action Details</h2>
                                <span style={{ fontSize: '10px', color: '#3b82f6', fontWeight: '800', fontFamily: '"Roboto Mono", monospace' }}>{selectedAction.id}</span>
                            </div>
                            <StatusBadge status={selectedAction.status} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ fontSize: '9px', color: '#475569', fontWeight: '800', letterSpacing: '1px' }}>INCIDENT DESCRIPTION</label>
                                <p style={{ fontSize: '14px', color: '#e2e8f0', margin: '4px 0 0 0', lineHeight: 1.5, fontWeight: '700' }}>{selectedAction.description}</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ fontSize: '9px', color: '#475569', fontWeight: '800', letterSpacing: '1px' }}>ROOT CAUSE</label>
                                    <p style={{ fontSize: '13px', color: '#fca5a5', margin: '4px 0 0 0', lineHeight: 1.5, fontWeight: '600' }}>{selectedAction.rootCause}</p>
                                </div>
                                <div>
                                    <label style={{ fontSize: '9px', color: '#475569', fontWeight: '800', letterSpacing: '1px' }}>CORRECTIVE ACTION</label>
                                    <p style={{ fontSize: '14px', color: '#86efac', margin: '4px 0 0 0', lineHeight: 1.5, fontWeight: '700' }}>{selectedAction.correctiveAction}</p>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', borderTop: '1px solid #2a2a2a', paddingTop: '16px' }}>
                                <div>
                                    <label style={{ fontSize: '9px', color: '#475569', fontWeight: '800', letterSpacing: '1px' }}>DUE DATE</label>
                                    <p style={{ fontSize: '13px', color: 'white', fontWeight: '700', margin: '4px 0 0 0', fontFamily: '"Roboto Mono", monospace' }}>{selectedAction.dueDate}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedAction(null)}
                            style={{
                                marginTop: '24px',
                                width: '100%',
                                padding: '12px',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                border: '1px solid #334155',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: '800',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        >
                            CLOSE DETAILS
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes tooltipFade {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default AccidentManagement;
