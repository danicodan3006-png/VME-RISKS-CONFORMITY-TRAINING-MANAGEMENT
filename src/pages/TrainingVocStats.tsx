
import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import {
    Zap
} from 'lucide-react';

// --- Data ---
const gapData = [
    { name: 'MMG', theory: 98, practical: 45, gap: 53 },
    { name: 'MEXCO', theory: 92, practical: 60, gap: 32 },
    { name: 'ALTINAY', theory: 88, practical: 35, gap: 53 },
    { name: 'TRANSCO', theory: 95, practical: 78, gap: 17 },
];

const participationData = [
    { name: 'MMG', attended: 85, absent: 15 },
    { name: 'MEXCO', attended: 70, absent: 30 },
    { name: 'ALTINAY', attended: 60, absent: 40 },
    { name: 'TRANSCO', attended: 90, absent: 10 },
];

const pipelineData = [
    { name: 'NYC Queue', value: 19 },
    { name: 'Practical Done', value: 0 },
];

// --- Components ---
const NeonCard = ({ title, children, alert, borderColor = '#333' }: { title: string, children: React.ReactNode, alert?: string, borderColor?: string }) => (
    <div style={{
        backgroundColor: '#1E1E1E',
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        boxShadow: alert ? `0 0 15px ${borderColor}40` : 'none',
        overflow: 'hidden'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{title}</h3>
            {alert && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 8px',
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid #ef4444',
                    borderRadius: '4px'
                }}>
                    <Zap size={12} color="#ef4444" fill="#ef4444" />
                    <span style={{ color: '#fca5a5', fontSize: '10px', fontWeight: 'bold' }}>{alert}</span>
                </div>
            )}
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
            {children}
        </div>
    </div>
);

const TrainingVocStats = () => {
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
                <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#3b82f6', letterSpacing: '1px', lineHeight: 1 }}>
                    TRAINING & COMPETENCY DIAGNOSTICS
                </h1>
                <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>
                    Vocational Evaluation & Practical Gap Analysis
                </p>
            </div>

            {/* Main Grid */}
            <div style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '24px',
                minHeight: 0
            }}>

                {/* 1. Gap Analysis (Left) */}
                <NeonCard title="Theory vs Practice Gap" borderColor={gapData.some(d => d.gap > 20) ? '#f59e0b' : '#333'} alert="HIGH COACHING PRIORITY">
                    <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '16px' }}>
                        Comparison of Theory Attendance (Blue) vs Practical Competency (Cyan). Gaps indicating <span style={{ color: '#f59e0b' }}>Theory-only focus.</span>
                    </p>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={gapData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: 'white' }}
                            />
                            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                            <Bar dataKey="theory" name="Theory Attendance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="practical" name="Practical Competency" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </NeonCard>

                {/* 2. Pipeline Stagnancy (Center - Hero) */}
                <NeonCard title="NYC Re-evaluation Pipeline" borderColor="#06b6d4" alert="PIPELINE STAGNANT">
                    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {/* Glowing Text */}
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 10 }}>
                            <div style={{
                                fontSize: '80px',
                                fontWeight: '900',
                                color: '#000',
                                textShadow: '0 0 5px #06b6d4, 0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 40px #06b6d4',
                                WebkitTextStroke: '2px #06b6d4',
                                lineHeight: 1
                            }}>
                                0
                            </div>
                            <div style={{ fontSize: '14px', color: '#06b6d4', textTransform: 'uppercase', fontWeight: 'bold', marginTop: '16px', letterSpacing: '2px' }}>
                                Practical <br /> Completed
                            </div>
                        </div>

                        <ResponsiveContainer width="100%" height="80%">
                            <PieChart>
                                <Pie
                                    data={pipelineData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={90}
                                    outerRadius={110}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {pipelineData.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#333' : '#06b6d4'} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                        <div style={{ textAlign: 'center', marginTop: '-20px' }}>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>19</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Candidates in NYC Queue</div>
                        </div>
                    </div>
                </NeonCard>

                {/* 3. Participation Heatmap (Right) */}
                <NeonCard title="Attendance List Intelligence">
                    <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '16px' }}>
                        Participation Rate % per Company. Low attendance indicates <span style={{ color: '#ef4444' }}>systemic disengagement.</span>
                    </p>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={participationData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={true} vertical={false} />
                            <XAxis type="number" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                            <YAxis dataKey="name" type="category" stroke="#64748b" tick={{ fill: 'white', fontSize: 12, fontWeight: 'bold' }} axisLine={false} tickLine={false} width={80} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: 'white' }}
                            />
                            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                            <Bar dataKey="attended" name="Attended" stackId="a" fill="#22c55e" radius={[0, 4, 4, 0]} barSize={32} />
                            <Bar dataKey="absent" name="Absent" stackId="a" fill="#333" radius={[0, 4, 4, 0]} barSize={32} />
                        </BarChart>
                    </ResponsiveContainer>
                </NeonCard>

            </div>
        </div>
    );
};

export default TrainingVocStats;
