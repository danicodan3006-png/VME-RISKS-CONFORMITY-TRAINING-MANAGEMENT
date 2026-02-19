
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FileText, Calendar, Shield, AlertTriangle, ChevronRight, Mic } from 'lucide-react';

// --- Data ---
const sensitizationData = [
    { name: 'Mining', drivers: 120, nonDrivers: 45 },
    { name: 'Logistics', drivers: 80, nonDrivers: 20 },
    { name: 'Maintenance', drivers: 60, nonDrivers: 90 },
    { name: 'Admin', drivers: 5, nonDrivers: 50 },
    { name: 'Security', drivers: 90, nonDrivers: 10 },
];

const totalSensitized = sensitizationData.reduce((acc, curr) => acc + curr.drivers + curr.nonDrivers, 0);

const documents = [
    { name: 'VME Inspection Form', status: 'PUBLISHED', date: '2026-01-15' },
    { name: 'VOC Register', status: 'PUBLISHED', date: '2026-01-20' },
    { name: 'VOC Request Form V1.0', status: 'PUBLISHED', date: '2026-02-01' },
    { name: 'Safety Interaction Guide', status: 'DEVELOPED', date: '2026-02-10' },
    { name: 'Toolbox Talk Template', status: 'IN DRAFT', date: '2026-02-18' },
];

const zeroSensitizationDepts = ['Procurement', 'IT Support', 'Visitors Center'];

const upcomingToolbox = [
    { topic: 'Blind Spots Awareness', date: 'Feb 22, 06:00 AM' },
    { topic: 'Fatigue Management', date: 'Feb 24, 06:00 AM' },
    { topic: 'Emergency Stop Procedures', date: 'Feb 27, 06:00 AM' },
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

const StatusBadge = ({ status }: { status: string }) => {
    let color = '#94a3b8';
    let bg = '#333';

    if (status === 'PUBLISHED') {
        color = '#22c55e';
        bg = 'rgba(34, 197, 94, 0.15)';
    } else if (status === 'DEVELOPED') {
        color = '#3b82f6';
        bg = 'rgba(59, 130, 246, 0.15)';
    } else if (status === 'IN DRAFT') {
        color = '#f59e0b';
        bg = 'rgba(245, 158, 11, 0.15)';
    }

    return (
        <span style={{
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: bg,
            color: color,
            fontSize: '11px',
            fontWeight: 'bold',
            letterSpacing: '0.5px'
        }}>
            {status}
        </span>
    );
};

const SafetyAwareness = () => {
    return (
        <div style={{
            backgroundColor: '#121212',
            minHeight: '100vh',
            color: 'white',
            padding: '32px',
            fontFamily: '"Inter", sans-serif'
        }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#FFD700', letterSpacing: '-1px', marginBottom: '8px' }}>
                    SAFETY AWARENESS <span style={{ color: 'white' }}>& TOOLBOX</span>
                </h1>
                <p style={{ color: '#64748b' }}>Strategic Communication & Prevention Campaign</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>

                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Sensitization Stats */}
                    <DarkCard>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Sensitization Statistics 2026</h3>
                                <p style={{ fontSize: '14px', color: '#64748b' }}>Drivers vs Non-Drivers Engagement</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '36px', fontWeight: '800', color: '#FFD700' }}>{totalSensitized}</div>
                                <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>Total People Sensitized</div>
                            </div>
                        </div>

                        <div style={{ height: '350px', width: '100%' }}>
                            <ResponsiveContainer>
                                <BarChart data={sensitizationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        cursor={{ fill: '#333', opacity: 0.4 }}
                                        contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: 'white' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="drivers" name="Drivers" stackId="a" fill="#FFD700" radius={[0, 0, 4, 4]} />
                                    <Bar dataKey="nonDrivers" name="Non-Drivers" stackId="a" fill="#333" radius={[4, 4, 0, 0]} stroke="#FFD700" strokeWidth={1} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </DarkCard>

                    {/* Documentation Status List */}
                    <DarkCard>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <FileText size={20} color="#FFD700" />
                            Strategic Documentation Status
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {documents.map((doc, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '16px',
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '6px',
                                    border: '1px solid #333',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#252525')}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a1a1a')}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFD700' }}></div>
                                        <div>
                                            <p style={{ fontWeight: '600', color: '#e2e8f0', fontSize: '14px' }}>{doc.name}</p>
                                            <p style={{ fontSize: '12px', color: '#64748b' }}>Last revision: {doc.date}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <StatusBadge status={doc.status} />
                                        <ChevronRight size={16} color="#475569" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DarkCard>

                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Interaction Principle Widget */}
                    <DarkCard>
                        <div style={{ margin: '-24px -24px 24px -24px', padding: '24px', backgroundColor: 'rgba(255, 215, 0, 0.1)', borderBottom: '1px solid rgba(255, 215, 0, 0.2)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <Shield size={24} color="#FFD700" />
                                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#FFD700', textTransform: 'uppercase' }}>Philosophy</h3>
                            </div>
                            <p style={{ fontSize: '16px', color: 'white', fontStyle: 'italic', fontWeight: '500' }}>"Zero Accidents via Constant Interaction"</p>
                        </div>

                        <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '16px', textTransform: 'uppercase' }}>Upcoming Toolbox Talks</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {upcomingToolbox.map((talk, i) => (
                                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <div style={{ padding: '10px', backgroundColor: '#333', borderRadius: '8px', color: '#FFD700' }}>
                                        <Mic size={20} />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: '600', color: 'white', fontSize: '14px' }}>{talk.topic}</p>
                                        <p style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Calendar size={12} /> {talk.date}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DarkCard>

                    {/* QA/QC Gap Analysis */}
                    <DarkCard style={{ border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'start' }}>
                            <AlertTriangle size={24} color="#ef4444" />
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ef4444' }}>QA/QC Gap Analysis</h3>
                                <p style={{ fontSize: '13px', color: '#fca5a5' }}>Zero Sensitization Detected</p>
                            </div>
                        </div>
                        <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '16px', lineHeight: '1.5' }}>
                            The following departments have recorded <strong>0% engagement</strong> in 2026. Immediate scheduling required.
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {zeroSensitizationDepts.map((dept, i) => (
                                <span key={i} style={{
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    color: '#fca5a5',
                                    fontSize: '12px',
                                    fontWeight: '600'
                                }}>
                                    {dept}
                                </span>
                            ))}
                        </div>
                    </DarkCard>

                </div>

            </div>
        </div>
    );
};

export default SafetyAwareness;
