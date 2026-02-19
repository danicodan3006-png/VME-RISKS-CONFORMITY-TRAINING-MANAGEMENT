
import React from 'react';
import { Rocket, CheckCircle, Clock, Calendar, Shield, Loader, FileSpreadsheet, Database } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';

// --- Data ---
const timelineData = [
    {
        quarter: 'Q1',
        title: 'Standardization',
        status: 'COMPLETED',
        desc: 'Deployment of VOC Request V1.0 & Safety Inspection Forms.',
        color: '#22c55e',
        icon: CheckCircle
    },
    {
        quarter: 'Q2',
        title: 'Digitalization (Current)',
        status: 'IN PROGRESS',
        desc: 'Transition from Excel to Dynamic Reporting (Power BI Logic).',
        color: '#3b82f6',
        icon: Loader // Using Loader as a proxy for "In Progress" spinner
    },
    {
        quarter: 'Q3',
        title: 'Automation',
        status: 'PLANNED',
        desc: 'Automated compliance notifications for Department Owners.',
        color: '#f59e0b',
        icon: Clock
    },
    {
        quarter: 'Q4',
        title: 'Cultural Shift',
        status: 'TARGET',
        desc: 'Full L1-L5 Hierarchy Implementation & Strategic Health Reporting.',
        color: '#a855f7',
        icon: Rocket
    }
];

const healthData = [
    { month: 'Jan', accidents: 58, target: 56 },
    { month: 'Feb', accidents: 55, target: 55 },
    { month: 'Mar', accidents: 53, target: 54 },
    { month: 'Apr', accidents: 52, target: 53 }, // Projected starts
    { month: 'May', accidents: 51, target: 52 },
    { month: 'Jun', accidents: 50, target: 51 },
    { month: 'Jul', accidents: 49, target: 50 },
    { month: 'Aug', accidents: 49, target: 50 },
    { month: 'Sep', accidents: 48, target: 49 },
    { month: 'Oct', accidents: 48, target: 48 }, // Ceiling reached
    { month: 'Nov', accidents: 48, target: 48 },
    { month: 'Dec', accidents: 48, target: 48 },
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

const TimelineItem = ({ data, index }: { data: any, index: number }) => (
    <div style={{ display: 'flex', gap: '24px', position: 'relative' }}>
        {/* Connector Line */}
        {index < timelineData.length - 1 && (
            <div style={{
                position: 'absolute',
                left: '24px',
                top: '48px',
                bottom: '-24px',
                width: '2px',
                backgroundColor: '#333',
                zIndex: 0
            }}></div>
        )}

        {/* Icon */}
        <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: `${data.color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${data.color}`,
            zIndex: 1,
            flexShrink: 0
        }}>
            <data.icon size={24} color={data.color} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, paddingBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>{data.quarter} - {data.title}</h3>
                <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    backgroundColor: `${data.color}20`,
                    color: data.color,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                }}>
                    {data.status}
                </span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.6' }}>{data.desc}</p>
        </div>
    </div>
);

const StrategicRoadmap = () => {
    return (
        <div style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #064e3b 100%)', // Dark blue to green gradient
            minHeight: '100vh',
            color: 'white',
            padding: '40px',
            fontFamily: '"Inter", sans-serif'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Header */}
                <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '48px', fontWeight: '900', color: 'white', letterSpacing: '-2px', marginBottom: '16px', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                        2026 STRATEGIC <span style={{ color: '#4ade80' }}>ROADMAP</span>
                    </h1>
                    <p style={{ color: '#cbd5e1', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
                        Transforming VME's safety culture through digitalization, automation, and competency-based leadership.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

                    {/* Left Column: Timeline */}
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Calendar size={28} color="#4ade80" /> Implementation Timeline
                        </h2>
                        <DarkCard style={{ backgroundColor: 'rgba(30,30,30,0.6)', backdropFilter: 'blur(10px)' }}>
                            {timelineData.map((item, index) => (
                                <TimelineItem key={index} data={item} index={index} />
                            ))}
                        </DarkCard>
                    </div>

                    {/* Right Column: Comparison & Charts */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                        {/* Software vs Excel Card */}
                        <DarkCard style={{
                            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                            border: '1px solid #334155',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, backgroundColor: '#3b82f6', opacity: 0.1, borderRadius: '50%' }}></div>

                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Database size={24} color="#3b82f6" /> The Digital Advantage
                            </h3>

                            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                                {/* Old Way */}
                                <div style={{ flex: 1, opacity: 0.6 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#ef4444' }}>
                                        <FileSpreadsheet size={16} /> Legacy Excel
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                                        <li>❌ Manual vLookups</li>
                                        <li>❌ Fragmented Data</li>
                                        <li>❌ Delayed Reporting</li>
                                    </ul>
                                </div>

                                <div style={{ width: '1px', height: '60px', backgroundColor: '#334155' }}></div>

                                {/* New Way */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#22c55e', fontWeight: 'bold' }}>
                                        <Rocket size={16} /> VME Platform
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', color: 'white', lineHeight: '1.6' }}>
                                        <li>✅ Real-time Alerts</li>
                                        <li>✅ Single Source of Truth</li>
                                        <li>✅ Automated Integrity</li>
                                    </ul>
                                </div>
                            </div>
                        </DarkCard>

                        {/* Strategic Health Target Chart */}
                        <DarkCard style={{ backgroundColor: 'rgba(30,30,30,0.6)', backdropFilter: 'blur(10px)' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Shield size={24} color="#f59e0b" /> Strategic Health Target
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Projected reduction of total accidents (58 → 48)</p>

                            <div style={{ height: '250px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={healthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorAccidents" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[40, 65]} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333', color: 'white' }}
                                            labelStyle={{ color: '#94a3b8' }}
                                        />
                                        <ReferenceLine y={48} stroke="#22c55e" strokeDasharray="3 3" label={{ position: 'right', value: 'TARGET (48)', fill: '#22c55e', fontSize: 10 }} />
                                        <Area type="monotone" dataKey="accidents" stroke="#f59e0b" fillOpacity={1} fill="url(#colorAccidents)" strokeWidth={3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </DarkCard>
                    </div>
                </div>

                {/* Closing Statement */}
                <div style={{ marginTop: '60px', textAlign: 'center', padding: '40px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: '16px' }}>
                        <Rocket size={40} color="#4ade80" />
                    </div>
                    <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'white', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '8px' }}>
                        VME 2026
                    </h2>
                    <h3 style={{ fontSize: '24px', fontWeight: '300', color: '#cbd5e1' }}>
                        Favoriser la <span style={{ color: '#4ade80', fontWeight: 'bold' }}>Compétence</span> sur la Quantité
                    </h3>
                </div>

            </div>
        </div>
    );
};

export default StrategicRoadmap;
