
import { useState } from 'react';
import {
    AlertCircle,
    Database,
    Truck,
    GraduationCap,
    AlertTriangle,
    FileText,
    BadgeCheck,
    Zap,
    CheckCircle,
    Users,
    Percent
} from 'lucide-react';
import { useSafeEquip } from '../context/SafeEquipContext';

// ═══════════════════════════════════════════════
// DATA CONSTANTS
// ═══════════════════════════════════════════════
const DEPARTMENTS = [
    'Mining', 'Transport', 'SSHEC', 'Exploration', 'Supply Chain',
    'Finance', 'Hydromet', 'Tailings', 'Sulphite', 'HR & Medical',
    'Compliance', 'Stakeholder', 'People Svcs', 'Project Del',
    'Civil Svcs', 'Lean Prod', 'Farm & Camp', 'Debottlenecking', 'Central Lab'
];

const COMPANIES = [
    'MMG Kinsevere', 'Mexco Mining', 'Masterlift', 'TKM', 'Solvay', 'ITM', 'Neema', 'MALA BNK'
];

const DEPT_BY_COMPANY: Record<string, string[]> = {
    'MMG Kinsevere': ['Mining', 'Transport', 'SSHEC', 'Exploration', 'Supply Chain', 'Finance', 'Hydromet', 'Tailings'],
    'Mexco Mining': ['Mining', 'Transport', 'SSHEC'],
    'Masterlift': ['Transport', 'Supply Chain'],
    'TKM': ['Mining', 'Transport'],
    'Solvay': ['Hydromet', 'Central Lab'],
    'ITM': ['Transport', 'Supply Chain'],
    'Neema': ['Civil Svcs', 'Farm & Camp'],
    'MALA BNK': ['Transport', 'Supply Chain']
};

// ═══════════════════════════════════════════════
// SHARED INPUT COMPONENTS
// ═══════════════════════════════════════════════
const InputField = ({ label, labelColor, children }: { label: string, labelColor?: string, children: React.ReactNode }) => (
    <div>
        <label style={{
            display: 'block', fontSize: '7px', fontWeight: '900',
            color: labelColor || '#64748b', marginBottom: '4px',
            letterSpacing: '1.5px', textTransform: 'uppercase'
        }}>{label}</label>
        {children}
    </div>
);

const inputStyle = (_accentColor: string): React.CSSProperties => ({
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'white',
    padding: '7px 10px',
    borderRadius: '5px',
    outline: 'none',
    fontSize: '11px',
    fontWeight: '600',
    fontFamily: '"Inter", sans-serif',
    transition: 'all 0.2s',
    boxSizing: 'border-box' as const
});

const numericBoldStyle = (color: string): React.CSSProperties => ({
    ...inputStyle(color),
    fontSize: '14px',
    fontWeight: '900',
    color: color,
    textShadow: `0 0 6px ${color}40`
});

// ═══════════════════════════════════════════════
// PUSH TO SYSTEM BUTTON
// ═══════════════════════════════════════════════
const PushButton = ({ status, onClick, accentColor }: {
    status: 'idle' | 'saving' | 'success', onClick: () => void, accentColor: string
}) => (
    <button
        onClick={onClick}
        disabled={status !== 'idle'}
        style={{
            width: '100%',
            background: status === 'success'
                ? 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(34,197,94,0.04))'
                : `linear-gradient(135deg, ${accentColor}14, ${accentColor}06)`,
            border: `1px solid ${status === 'success' ? 'rgba(34,197,94,0.25)' : `${accentColor}25`}`,
            borderRadius: '6px',
            padding: '7px 12px',
            color: status === 'success' ? '#22c55e' : 'white',
            fontSize: '8px',
            fontWeight: '900',
            letterSpacing: '2px',
            cursor: status === 'idle' ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.3s',
            marginTop: 'auto',
            fontFamily: '"Inter", sans-serif'
        }}
    >
        {status === 'saving' ? (
            <div style={{
                width: '12px', height: '12px',
                border: '2px solid white',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }} />
        ) : status === 'success' ? (
            <CheckCircle size={12} />
        ) : (
            <Zap size={12} color={accentColor} />
        )}
        {status === 'success' ? 'SYSTEM UPDATED' : 'PUSH TO SYSTEM'}
    </button>
);

// ═══════════════════════════════════════════════
// PASS RATE DISPLAY
// ═══════════════════════════════════════════════
const PassRateBadge = ({ attendees, failures, label }: { attendees: number, failures: number, label: string }) => {
    const rate = attendees > 0 ? Math.round(((attendees - failures) / attendees) * 100) : 0;
    const color = rate >= 80 ? '#22c55e' : rate >= 60 ? '#f59e0b' : '#ef4444';
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '4px 8px',
            background: `${color}08`,
            border: `1px solid ${color}20`,
            borderRadius: '5px'
        }}>
            <Percent size={10} color={color} />
            <span style={{ fontSize: '7px', color: '#64748b', fontWeight: '700' }}>{label}:</span>
            <span style={{
                fontSize: '12px', fontWeight: '900', color,
                textShadow: `0 0 6px ${color}30`
            }}>{attendees > 0 ? `${rate}%` : '—'}</span>
        </div>
    );
};

// ═══════════════════════════════════════════════
// QUADRANT CARD
// ═══════════════════════════════════════════════
const QuadrantCard = ({ title, icon: Icon, accentColor, children, glowBorder }: {
    title: string, icon: any, accentColor: string, children: React.ReactNode, glowBorder?: boolean
}) => (
    <div style={{
        background: 'linear-gradient(145deg, rgba(22,22,26,0.9), rgba(14,14,18,0.95))',
        backdropFilter: 'blur(16px)',
        border: glowBorder
            ? `1px solid ${accentColor}30`
            : '1px solid rgba(255,255,255,0.04)',
        boxShadow: glowBorder ? `0 0 16px ${accentColor}10, inset 0 0 12px ${accentColor}04` : 'none',
        borderRadius: '10px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 0
    }}>
        {/* Accent corner glow */}
        <div style={{
            position: 'absolute', top: -25, right: -25,
            width: '60px', height: '60px',
            background: `radial-gradient(circle, ${accentColor}08, transparent 70%)`,
            pointerEvents: 'none'
        }} />

        {/* Header */}
        <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            marginBottom: '10px', paddingBottom: '8px',
            borderBottom: `1px solid ${accentColor}12`,
            flexShrink: 0
        }}>
            <div style={{
                width: '24px', height: '24px', borderRadius: '6px',
                background: `${accentColor}10`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${accentColor}20`
            }}>
                <Icon size={12} color={accentColor} />
            </div>
            <h3 style={{
                fontSize: '9px', fontWeight: '900', color: 'white',
                letterSpacing: '1.5px', textTransform: 'uppercase',
                textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                margin: 0
            }}>{title}</h3>
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', minHeight: 0 }}>
            {children}
        </div>
    </div>
);

// ═══════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════
const MasterForm = () => {
    const { updateDataset } = useSafeEquip();

    // === Q1: Accidents ===
    const [accDept, setAccDept] = useState(DEPARTMENTS[0]);
    const [accDate, setAccDate] = useState(new Date().toISOString().split('T')[0]);
    const [accCount, setAccCount] = useState(0);
    const [accStatus, setAccStatus] = useState<'idle' | 'saving' | 'success'>('idle');

    // === Q2: Training & VOC ===
    const [trainCompany, setTrainCompany] = useState(COMPANIES[0]);
    const [trainDept, setTrainDept] = useState(DEPT_BY_COMPANY[COMPANIES[0]][0]);
    const [trainDate, setTrainDate] = useState(new Date().toISOString().split('T')[0]);
    const [trainTheoryAtt, setTrainTheoryAtt] = useState(0);
    const [trainTheoryFail, setTrainTheoryFail] = useState(0);
    const [trainPracAtt, setTrainPracAtt] = useState(0);
    const [trainPracFail, setTrainPracFail] = useState(0);
    const [trainStatus, setTrainStatus] = useState<'idle' | 'saving' | 'success'>('idle');

    // === Q3: Fleet ===
    const [fleetContractor, setFleetContractor] = useState(COMPANIES[0]);
    const [fleetDate, setFleetDate] = useState(new Date().toISOString().split('T')[0]);
    const [fleetInspected, setFleetInspected] = useState(0);
    const [fleetStatus, setFleetStatus] = useState<'idle' | 'saving' | 'success'>('idle');

    // === Q4: Performance ===
    const [perfNotes, setPerfNotes] = useState('');
    const [perfStatus, setPerfStatus] = useState<'idle' | 'saving' | 'success'>('idle');

    // === Q5: Safety Awareness ===
    const [awarenessCompany, setAwarenessCompany] = useState(COMPANIES[0]);
    const [awarenessDept, setAwarenessDept] = useState(DEPARTMENTS[0]);
    const [awarenessDate, setAwarenessDate] = useState(new Date().toISOString().split('T')[0]);
    const [awarenessAttendees, setAwarenessAttendees] = useState(0);
    const [awarenessStatus, setAwarenessStatus] = useState<'idle' | 'saving' | 'success'>('idle');

    // Cascading dropdown handler
    const handleTrainCompanyChange = (company: string) => {
        setTrainCompany(company);
        const depts = DEPT_BY_COMPANY[company] || DEPARTMENTS;
        setTrainDept(depts[0]);
    };

    // Pass rates are computed inline by PassRateBadge component

    // Red-List trigger check
    const practicalRedListAlert = trainPracFail > 1;

    // === Push Handlers ===
    const pushAccidents = () => {
        setAccStatus('saving');
        const entry = {
            id: `ACC-${Date.now()}`, timestamp: accDate, department: accDept,
            incidents: Number(accCount), training_theory: 0, training_practice: 0,
            company_name: 'MMG Kinsevere', vehicles_total: 0, vehicles_compliant: 0,
            red_list_status: accCount >= 2, risk_level: accCount >= 2 ? 2 : accCount === 1 ? 1 : 0
        };
        setTimeout(() => { updateDataset(entry); setAccStatus('success'); setTimeout(() => setAccStatus('idle'), 2000); }, 700);
    };

    const pushTraining = () => {
        setTrainStatus('saving');
        const theorySuccess = trainTheoryAtt - trainTheoryFail;
        const pracSuccess = trainPracAtt - trainPracFail;
        const entry = {
            id: `TRN-${Date.now()}`, timestamp: trainDate, department: trainDept,
            incidents: 0, training_theory: Math.max(0, theorySuccess), training_practice: Math.max(0, pracSuccess),
            company_name: trainCompany, vehicles_total: 0, vehicles_compliant: 0,
            red_list_status: practicalRedListAlert, risk_level: practicalRedListAlert ? 2 : 0
        };
        setTimeout(() => { updateDataset(entry); setTrainStatus('success'); setTimeout(() => setTrainStatus('idle'), 2000); }, 700);
    };

    const pushFleet = () => {
        setFleetStatus('saving');
        const entry = {
            id: `FLT-${Date.now()}`, timestamp: fleetDate, department: 'Transport',
            incidents: 0, training_theory: 0, training_practice: 0,
            company_name: fleetContractor, vehicles_total: Number(fleetInspected), vehicles_compliant: 0,
            red_list_status: false, risk_level: 0
        };
        setTimeout(() => { updateDataset(entry); setFleetStatus('success'); setTimeout(() => setFleetStatus('idle'), 2000); }, 700);
    };

    const pushPerformance = () => {
        setPerfStatus('saving');
        setTimeout(() => { setPerfStatus('success'); setTimeout(() => setPerfStatus('idle'), 2000); }, 700);
    };

    const pushAwareness = () => {
        setAwarenessStatus('saving');
        const entry = {
            id: `AWR-${Date.now()}`, timestamp: awarenessDate, department: awarenessDept,
            incidents: 0, training_theory: 0, training_practice: 0,
            company_name: awarenessCompany, vehicles_total: 0, vehicles_compliant: Number(awarenessAttendees),
            red_list_status: false, risk_level: 0
        };
        setTimeout(() => { updateDataset(entry); setAwarenessStatus('success'); setTimeout(() => setAwarenessStatus('idle'), 2000); }, 700);
    };

    return (
        <div style={{
            backgroundColor: '#121212',
            height: '100%',
            color: 'white',
            padding: '14px 18px',
            fontFamily: '"Inter", sans-serif',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
        }}>
            {/* Animations */}
            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                @keyframes watermarkPulse {
                    0%, 100% { opacity: 0.015; }
                    50% { opacity: 0.025; }
                }
                @keyframes cyanGlow {
                    0%, 100% { box-shadow: 0 0 8px rgba(0,242,255,0.08); }
                    50% { box-shadow: 0 0 16px rgba(0,242,255,0.15), 0 0 30px rgba(0,242,255,0.05); }
                }
                input:focus, select:focus, textarea:focus {
                    border-color: #00F2FF !important;
                    box-shadow: 0 0 0 2px rgba(0,242,255,0.1), 0 0 12px rgba(0,242,255,0.06) !important;
                }
                input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(1) brightness(0.6);
                }
            `}</style>

            {/* MMG Watermark */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none', zIndex: 0,
                animation: 'watermarkPulse 5s ease-in-out infinite'
            }}>
                <svg width="280" height="280" viewBox="0 0 100 100" fill="none">
                    <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
                    <text x="50" y="48" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.035)" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="22" letterSpacing="4">MMG</text>
                    <text x="50" y="64" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.025)" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="7" letterSpacing="4">KINSEVERE</text>
                </svg>
            </div>

            {/* ══════ HEADER ══════ */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: '10px', flexShrink: 0, position: 'relative', zIndex: 1
            }}>
                <div>
                    <h1 style={{
                        fontSize: '15px', fontWeight: '900', color: 'white',
                        letterSpacing: '2px', textTransform: 'uppercase',
                        textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                        display: 'flex', alignItems: 'center', gap: '8px', margin: 0
                    }}>
                        <Database size={17} color="#00F2FF" />
                        DATA CONTROL CENTER <span style={{ color: '#334155', fontWeight: '400' }}>|</span> <span style={{ color: '#64748b', fontSize: '11px' }}>VME 2026</span>
                    </h1>
                    <p style={{ color: '#475569', fontSize: '8px', fontWeight: '700', letterSpacing: '1px', marginTop: '2px' }}>
                        Real-time Ecosystem Synchronization Engine — 5 Modules Active
                    </p>
                </div>

                {/* Admin Badge */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '6px 12px',
                    background: 'linear-gradient(135deg, rgba(22,22,26,0.8), rgba(14,14,18,0.9))',
                    border: '1px solid rgba(0,242,255,0.1)',
                    borderRadius: '8px'
                }}>
                    <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid rgba(0,242,255,0.2)',
                        boxShadow: '0 0 8px rgba(0,242,255,0.1)'
                    }}>
                        <span style={{ fontSize: '8px', fontWeight: '900', color: '#00F2FF' }}>DK</span>
                    </div>
                    <div>
                        <div style={{ fontSize: '9px', fontWeight: '800', color: 'white', letterSpacing: '0.5px' }}>Dan Kahilu</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '1px' }}>
                            <BadgeCheck size={7} color="#00F2FF" />
                            <span style={{ fontSize: '6px', fontWeight: '800', color: '#00F2FF', letterSpacing: '1px' }}>WRITE ACCESS</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════ 5-MODULE GRID ══════ */}
            {/* Layout: Row 1 = 3 columns (Accidents, Training, Fleet), Row 2 = 2 columns (Awareness, Notes) */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                gap: '10px', position: 'relative', zIndex: 1, minHeight: 0
            }}>
                {/* Row 1: Top 3 Modules */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', gap: '10px', flex: 1, minHeight: 0 }}>

                    {/* ═══ Q1: ACCIDENTS — Emergency Red ═══ */}
                    <QuadrantCard title="Accident Records" icon={AlertTriangle} accentColor="#ef4444">
                        <InputField label="Department" labelColor="#fca5a5">
                            <select value={accDept} onChange={e => setAccDept(e.target.value)} style={inputStyle('#ef4444')}>
                                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </InputField>

                        <InputField label="Date of Incident" labelColor="#fca5a5">
                            <input type="date" value={accDate} onChange={e => setAccDate(e.target.value)} style={inputStyle('#ef4444')} />
                        </InputField>

                        <InputField label="Incident Count" labelColor="#fca5a5">
                            <input type="number" min={0} value={accCount} onChange={e => setAccCount(Number(e.target.value))}
                                style={numericBoldStyle('#ef4444')} />
                        </InputField>

                        <div style={{
                            padding: '5px 8px', background: 'rgba(239,68,68,0.04)',
                            border: '1px solid rgba(239,68,68,0.1)', borderRadius: '5px',
                            display: 'flex', gap: '5px', alignItems: 'center'
                        }}>
                            <AlertCircle size={9} color="#ef4444" />
                            <span style={{ fontSize: '7px', color: '#94a3b8', fontWeight: '600' }}>
                                Feeds: Executive Summary, Roadmap, Risk Exposure
                            </span>
                        </div>

                        <PushButton status={accStatus} onClick={pushAccidents} accentColor="#ef4444" />
                    </QuadrantCard>

                    {/* ═══ Q2: TRAINING & VOC — Safety Blue (EXPANDED) ═══ */}
                    <QuadrantCard title="Training & VOC Records" icon={GraduationCap} accentColor="#3b82f6">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                            <InputField label="Company" labelColor="#93c5fd">
                                <select value={trainCompany} onChange={e => handleTrainCompanyChange(e.target.value)} style={inputStyle('#3b82f6')}>
                                    {COMPANIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </InputField>
                            <InputField label="Department" labelColor="#93c5fd">
                                <select value={trainDept} onChange={e => setTrainDept(e.target.value)} style={inputStyle('#3b82f6')}>
                                    {(DEPT_BY_COMPANY[trainCompany] || DEPARTMENTS).map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </InputField>
                            <InputField label="Date" labelColor="#93c5fd">
                                <input type="date" value={trainDate} onChange={e => setTrainDate(e.target.value)} style={inputStyle('#3b82f6')} />
                            </InputField>
                        </div>

                        {/* Theory Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                            <InputField label="Theory Attendees" labelColor="#93c5fd">
                                <input type="number" min={0} value={trainTheoryAtt} onChange={e => setTrainTheoryAtt(Number(e.target.value))}
                                    style={numericBoldStyle('#3b82f6')} />
                            </InputField>
                            <InputField label="Theory Failures" labelColor="#fca5a5">
                                <input type="number" min={0} max={trainTheoryAtt} value={trainTheoryFail} onChange={e => setTrainTheoryFail(Number(e.target.value))}
                                    style={numericBoldStyle('#ef4444')} />
                            </InputField>
                        </div>

                        {/* Practical Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                            <InputField label="Practical Attendees" labelColor="#93c5fd">
                                <input type="number" min={0} value={trainPracAtt} onChange={e => setTrainPracAtt(Number(e.target.value))}
                                    style={numericBoldStyle('#22c55e')} />
                            </InputField>
                            <InputField label="Practical Failures" labelColor="#fca5a5">
                                <input type="number" min={0} max={trainPracAtt} value={trainPracFail} onChange={e => setTrainPracFail(Number(e.target.value))}
                                    style={numericBoldStyle('#ef4444')} />
                            </InputField>
                        </div>

                        {/* Auto-calculated Pass Rates */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                            <PassRateBadge attendees={trainTheoryAtt} failures={trainTheoryFail} label="THEORY PASS" />
                            <PassRateBadge attendees={trainPracAtt} failures={trainPracFail} label="PRACTICAL PASS" />
                        </div>

                        {/* Red-List Alert */}
                        {practicalRedListAlert && (
                            <div style={{
                                padding: '5px 8px', background: 'rgba(239,68,68,0.06)',
                                border: '1px solid rgba(239,68,68,0.2)', borderRadius: '5px',
                                display: 'flex', gap: '5px', alignItems: 'center',
                                animation: 'cyanGlow 2s infinite'
                            }}>
                                <AlertTriangle size={10} color="#ef4444" />
                                <span style={{ fontSize: '7px', color: '#ef4444', fontWeight: '800', letterSpacing: '0.5px' }}>
                                    RED-LIST ALERT: Multiple practical failures detected
                                </span>
                            </div>
                        )}

                        <PushButton status={trainStatus} onClick={pushTraining} accentColor="#3b82f6" />
                    </QuadrantCard>

                    {/* ═══ Q3: FLEET — Mechanical Orange ═══ */}
                    <QuadrantCard title="Fleet Compliance" icon={Truck} accentColor="#f97316">
                        <InputField label="Contractor" labelColor="#fdba74">
                            <select value={fleetContractor} onChange={e => setFleetContractor(e.target.value)} style={inputStyle('#f97316')}>
                                {COMPANIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </InputField>

                        <InputField label="Inspection Date" labelColor="#fdba74">
                            <input type="date" value={fleetDate} onChange={e => setFleetDate(e.target.value)} style={inputStyle('#f97316')} />
                        </InputField>

                        <InputField label="Total Inspected" labelColor="#fdba74">
                            <input type="number" min={0} value={fleetInspected} onChange={e => setFleetInspected(Number(e.target.value))}
                                style={numericBoldStyle('#f97316')} />
                        </InputField>

                        <div style={{
                            padding: '5px 8px', background: 'rgba(249,115,22,0.04)',
                            border: '1px solid rgba(249,115,22,0.1)', borderRadius: '5px',
                            display: 'flex', gap: '5px', alignItems: 'center'
                        }}>
                            <AlertCircle size={9} color="#f97316" />
                            <span style={{ fontSize: '7px', color: '#94a3b8', fontWeight: '600' }}>
                                Feeds: Fleet Compliance page, Executive Summary
                            </span>
                        </div>

                        <PushButton status={fleetStatus} onClick={pushFleet} accentColor="#f97316" />
                    </QuadrantCard>
                </div>

                {/* Row 2: Bottom 2 Modules */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flex: 1, minHeight: 0 }}>

                    {/* ═══ Q5: SAFETY AWARENESS — Glowing Cyan ═══ */}
                    <QuadrantCard title="Awareness Session Logger" icon={Users} accentColor="#00F2FF" glowBorder>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                            <InputField label="Company" labelColor="#67e8f9">
                                <select value={awarenessCompany} onChange={e => setAwarenessCompany(e.target.value)} style={inputStyle('#00F2FF')}>
                                    {COMPANIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </InputField>
                            <InputField label="Department" labelColor="#67e8f9">
                                <select value={awarenessDept} onChange={e => setAwarenessDept(e.target.value)} style={inputStyle('#00F2FF')}>
                                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </InputField>
                        </div>

                        <InputField label="Session Date" labelColor="#67e8f9">
                            <input type="date" value={awarenessDate} onChange={e => setAwarenessDate(e.target.value)} style={inputStyle('#00F2FF')} />
                        </InputField>

                        <InputField label="Number of Attendees" labelColor="#67e8f9">
                            <input type="number" min={0} value={awarenessAttendees} onChange={e => setAwarenessAttendees(Number(e.target.value))}
                                style={numericBoldStyle('#00F2FF')} />
                        </InputField>

                        <div style={{
                            padding: '5px 8px', background: 'rgba(0,242,255,0.04)',
                            border: '1px solid rgba(0,242,255,0.1)', borderRadius: '5px',
                            display: 'flex', gap: '5px', alignItems: 'center'
                        }}>
                            <Users size={9} color="#00F2FF" />
                            <span style={{ fontSize: '7px', color: '#94a3b8', fontWeight: '600' }}>
                                Updates: Awareness Reach Rate, Departmental Bento Grid
                            </span>
                        </div>

                        <PushButton status={awarenessStatus} onClick={pushAwareness} accentColor="#00F2FF" />
                    </QuadrantCard>

                    {/* ═══ Q4: PERFORMANCE — Architect's Notes ═══ */}
                    <QuadrantCard title="Architect's Observations" icon={FileText} accentColor="#a855f7">
                        <InputField label="Architect's Observations & Mindset Notes" labelColor="#c084fc">
                            <textarea
                                value={perfNotes}
                                onChange={e => setPerfNotes(e.target.value)}
                                placeholder="Strategic observations, mindset notes, cultural shift indicators..."
                                style={{
                                    ...inputStyle('#a855f7'),
                                    minHeight: '80px',
                                    resize: 'none',
                                    lineHeight: 1.5,
                                    flex: 1
                                }}
                            />
                        </InputField>

                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '4px 8px',
                            background: 'rgba(168,85,247,0.04)',
                            border: '1px solid rgba(168,85,247,0.1)',
                            borderRadius: '5px'
                        }}>
                            <span style={{ fontSize: '7px', color: '#94a3b8', fontWeight: '600' }}>
                                {perfNotes.length} characters
                            </span>
                            <span style={{ fontSize: '7px', color: '#a855f7', fontWeight: '800', letterSpacing: '1px' }}>
                                MANUAL ENTRY
                            </span>
                        </div>

                        <PushButton status={perfStatus} onClick={pushPerformance} accentColor="#a855f7" />
                    </QuadrantCard>
                </div>
            </div>

            {/* ══════ FOOTER STATUS BAR ══════ */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: '8px', flexShrink: 0,
                padding: '6px 12px',
                background: 'rgba(14,14,18,0.8)',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.03)',
                position: 'relative', zIndex: 1
            }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {[
                        { label: 'ACCIDENTS', color: '#ef4444' },
                        { label: 'TRAINING', color: '#3b82f6' },
                        { label: 'FLEET', color: '#f97316' },
                        { label: 'AWARENESS', color: '#00F2FF' },
                        { label: 'NOTES', color: '#a855f7' }
                    ].map(q => (
                        <div key={q.label} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <div style={{
                                width: '4px', height: '4px', borderRadius: '50%',
                                backgroundColor: q.color, boxShadow: `0 0 4px ${q.color}`
                            }} />
                            <span style={{ fontSize: '6px', fontWeight: '800', color: '#475569', letterSpacing: '1px' }}>
                                {q.label}
                            </span>
                        </div>
                    ))}
                </div>
                <span style={{ fontSize: '6px', fontWeight: '700', color: '#334155', letterSpacing: '1.5px' }}>
                    SAFEEQUIP ENGINE | LIVE SYNC
                </span>
            </div>
        </div>
    );
};

export default MasterForm;
