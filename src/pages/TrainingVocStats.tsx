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

// --- Data Engine ---
const theoryDeptData = [
    { name: 'Mining (Mexco)', value: 161 },
    { name: 'Transport', value: 8 },
    { name: 'SSHEC', value: 0 },
    { name: 'Exploration', value: 0 },
    { name: 'Supply Chain', value: 0 },
    { name: 'Finance', value: 0 },
    { name: 'Hydromet', value: 0 },
    { name: 'Tailings', value: 0 },
    { name: 'Sulphite', value: 0 },
    { name: 'HR & Medical', value: 0 },
    { name: 'Compliance', value: 0 },
    { name: 'Stakeholder', value: 0 },
    { name: 'People Svcs', value: 0 },
    { name: 'Project Del', value: 0 },
    { name: 'Civil Svcs', value: 0 },
    { name: 'Lean Prod', value: 0 },
    { name: 'Farm & Camp', value: 0 },
    { name: 'Debottlenecking', value: 0 },
    { name: 'Central Lab', value: 0 },
];

// --- Components ---

const DiagnosticCard = ({ title, value, subtext, icon: Icon, color, progress }: any) => {
    // Progress Ring Calculation
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

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

const StandbyCard = ({ title, value, subtext, icon: Icon }: any) => (
    <div style={{
        backgroundColor: '#1E1E1E',
        border: '1px solid #333',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flex: 1,
        opacity: 0.6
    }}>
        <div style={{ padding: '20px', backgroundColor: '#2a2a2a', borderRadius: '50%', color: '#64748b' }}>
            <Icon size={32} />
        </div>
        <div>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>{title}</h3>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#475569', lineHeight: '1' }}>{value}</div>
            <p style={{ fontSize: '13px', color: '#475569', marginTop: '8px', fontWeight: '500' }}>{subtext}</p>
        </div>
    </div>
);

const TrainingVocStats = () => {
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
                    Critical Path Analysis: 2026 Theory vs. Practice Phase Management
                </p>
            </div>

            {/* Top Row: Strategic Diagnostics */}
            <div style={{ display: 'flex', gap: '24px', flexShrink: 0, height: '140px' }}>
                <DiagnosticCard
                    title="THEORY VOC STATUS"
                    value="169 / 2,976"
                    subtext="180 Tests Conducted | 19 Failures"
                    icon={Monitor}
                    color="#3b82f6"
                    progress={(169 / 2976) * 100}
                />
                <StandbyCard
                    title="PRACTICE VOC STATUS"
                    value="0 / 2,976"
                    subtext="Practical Evaluations: Pending Start"
                    icon={Clock}
                />
                <StandbyCard
                    title="FULLY CERTIFIED OPERATORS"
                    value="0"
                    subtext="Awaiting Practical Phase Completion"
                    icon={ShieldCheck}
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
                        <h2 style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>Departmental Theory Participation</h2>
                        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Successful Theory Validations - Mining Phase Priority</p>
                    </div>
                    <div style={{ padding: '8px 16px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f633', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={16} color="#3b82f6" fill="#3b82f6" />
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#3b82f6' }}>CURRENT PHASE: THEORY</span>
                    </div>
                </div>

                <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={theoryDeptData} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
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
                            />
                            <Bar dataKey="value" name="Successful Tests" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40}>
                                {theoryDeptData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.value > 10 ? '#3b82f6' : '#2a2a2a'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Mission Control Footer Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>SYSTEM: VME DIAGNOSTIC ENGINE V2.0</div>
                    <div style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>LAST SYNC: FEB 20, 2026</div>
                </div>
                <div style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>LEAD ARCHITECT: DAN KAHILU</div>
            </div>
        </div>
    );
};

export default TrainingVocStats;
