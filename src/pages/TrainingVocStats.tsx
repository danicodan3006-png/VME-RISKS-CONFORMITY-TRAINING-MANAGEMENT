
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import {
    Clock,
    ShieldCheck,
    Monitor,
    Zap
} from 'lucide-react';
import { useSafeEquip } from '../context/SafeEquipContext';

// --- Static Baseline ---
const DEPARTMENTS = [
    'Mining', 'Transport', 'SSHEC', 'Exploration', 'Supply Chain',
    'Finance', 'Hydromet', 'Tailings', 'Sulphite', 'HR & Medical',
    'Compliance', 'Stakeholder', 'People Svcs', 'Project Del',
    'Civil Svcs', 'Lean Prod', 'Farm & Camp', 'Debottlenecking', 'Central Lab'
];

// --- Components ---

const DiagnosticCard = ({ title, value, subtext, icon: Icon, color, progress }: any) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (Math.min(100, progress) / 100) * circumference;

    return (
        <div style={{
            backgroundColor: '#1E1E1E',
            border: '1px solid #333',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            flex: 1,
            position: 'relative'
        }}>
            <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
                <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="40" cy="40" r={radius} fill="none" stroke="#2a2a2a" strokeWidth="6" />
                    <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="6"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                    />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={24} color={color} />
                </div>
            </div>
            <div>
                <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>{title}</h3>
                <div style={{ fontSize: '28px', fontWeight: '900', color: 'white', lineHeight: '1' }}>{value}</div>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '8px', fontWeight: '500' }}>{subtext}</p>
            </div>
        </div>
    );
};

const StatusCard = ({ title, value, subtext, icon: Icon, active }: any) => (
    <div style={{
        backgroundColor: '#1E1E1E',
        border: '1px solid #333',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flex: 1,
        opacity: active ? 1 : 0.6
    }}>
        <div style={{
            padding: '20px',
            backgroundColor: active ? 'rgba(34, 197, 94, 0.1)' : '#2a2a2a',
            borderRadius: '50%',
            color: active ? '#22c55e' : '#64748b'
        }}>
            <Icon size={32} />
        </div>
        <div>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: active ? '#94a3b8' : '#64748b', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>{title}</h3>
            <div style={{ fontSize: '28px', fontWeight: '900', color: active ? 'white' : '#475569', lineHeight: '1' }}>{value}</div>
            <p style={{ fontSize: '13px', color: '#475569', marginTop: '8px', fontWeight: '500' }}>{subtext}</p>
        </div>
    </div>
);

const TrainingVocStats = () => {
    const { dataset } = useSafeEquip();

    const totalTheory = dataset.reduce((sum, d) => sum + d.training_theory, 0);
    const totalPractice = dataset.reduce((sum, d) => sum + d.training_practice, 0);
    const fullyCertified = dataset.filter(d => d.training_theory > 0 && d.training_practice > 0).length;

    const theoryData = DEPARTMENTS.map(deptName => {
        const value = dataset
            .filter(d => d.department === deptName || (deptName === 'Mining' && d.department === 'Mining'))
            .reduce((sum, d) => sum + d.training_theory, 0);

        // Handle the specific naming used in the original UI for display
        const displayName = deptName === 'Mining' ? 'Mining (Mexco)' : deptName;

        return { name: displayName, value };
    });

    const baselineTotal = 2976;

    return (
        <div style={{
            backgroundColor: '#121212',
            height: '100vh',
            width: '100%',
            color: 'white',
            padding: '32px',
            fontFamily: '"Inter", sans-serif',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            boxSizing: 'border-box',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{ flexShrink: 0 }}>
                <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#3b82f6', letterSpacing: '-0.5px', lineHeight: 1 }}>
                    TRAINING & COMPETENCY DIAGNOSTICS
                </h1>
                <p style={{ fontSize: '15px', color: '#64748b', marginTop: '6px' }}>
                    Live Force-Field Analysis | Connected to SafeEquip_Dynamic_Dataset
                </p>
            </div>

            {/* Top Row: Strategic Diagnostics */}
            <div style={{ display: 'flex', gap: '24px', flexShrink: 0, height: '140px' }}>
                <DiagnosticCard
                    title="THEORY VOC STATUS"
                    value={`${totalTheory} / ${baselineTotal}`}
                    subtext={`Total Success Theory Validations`}
                    icon={Monitor}
                    color="#3b82f6"
                    progress={(totalTheory / (baselineTotal * 0.1)) * 100} // Scaled for visibility in initial phase
                />
                <StatusCard
                    title="PRACTICE VOC STATUS"
                    value={`${totalPractice} / ${baselineTotal}`}
                    subtext="Practical Phase On-Site Tracking"
                    icon={Clock}
                    active={totalPractice > 0}
                />
                <StatusCard
                    title="FULLY CERTIFIED OPERATORS"
                    value={fullyCertified}
                    subtext="Cross-Validated Competency (2026)"
                    icon={ShieldCheck}
                    active={fullyCertified > 0}
                />
            </div>

            {/* Main Visual Row: Departmental Theory (Force Render) */}
            <div style={{
                flex: 1,
                backgroundColor: '#1E1E1E',
                borderRadius: '16px',
                border: '1px solid #333',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                    <div>
                        <h2 style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>Departmental Theory Distribution</h2>
                        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Automated Mapping from Dynamic HSSEC Dataset</p>
                    </div>
                    <div style={{ padding: '8px 16px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f633', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={16} color="#3b82f6" fill="#3b82f6" />
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#3b82f6' }}>SYNC STATUS: ACTIVE</span>
                    </div>
                </div>

                <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={theoryData} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#64748b"
                                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: '500' }}
                                axisLine={false}
                                tickLine={false}
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                            />
                            <YAxis
                                stroke="#64748b"
                                tick={{ fill: '#64748b', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                                contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: 'white' }}
                                itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                            />
                            <Bar dataKey="value" name="Theory Success" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40}>
                                {theoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.value > 0 ? '#3b82f6' : '#2a2a2a'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>SYSTEM: CORE_VME_ENGINE_2026</div>
                    <div style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>REAL-TIME TELEMETRY: ENABLED</div>
                </div>
                <div style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>CHIEF ARCHITECT: DAN KAHILU</div>
            </div>
        </div>
    );
};

export default TrainingVocStats;
