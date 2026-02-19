import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

// --- Shared Components ---
const KPICard = ({ value, label, valueColor = 'black' }: { value: string, label: React.ReactNode, valueColor?: string }) => (
    <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '4px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderLeft: '5px solid #d32f2f',
        textAlign: 'center',
        flex: 1,
        minWidth: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '160px'
    }}>
        <p style={{ fontSize: '36px', fontWeight: '400', color: valueColor, marginBottom: '16px' }}>{value}</p>
        <div style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', lineHeight: '1.4' }}>
            {label}
        </div>
    </div>
);

const VocButton = ({ label }: { label: string }) => (
    <button style={{
        backgroundColor: 'white',
        padding: '24px 48px',
        borderRadius: '4px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        border: 'none',
        fontSize: '24px',
        fontWeight: '400',
        cursor: 'pointer',
        transition: 'transform 0.1s',
        minWidth: '250px'
    }}>
        {label}
    </button>
);

// --- Sub-Views ---

const TrainingView = () => (
    <>
        <div style={{ display: 'flex', gap: '32px', marginBottom: '60px', flexWrap: 'wrap' }}>
            <KPICard value="2700" label={<span>2025,<br />COMPETENCIES<br />RECORDED</span>} />
            <KPICard value="2976" label={<span>Total Active<br />Competencies</span>} />
            <KPICard value="276" valueColor="#d32f2f" label={<span style={{ color: '#d32f2f' }}>INCREASE(2026)</span>} />
            <KPICard value="2200" valueColor="#22c55e" label={<span style={{ color: '#22c55e' }}>2026 Training<br />Target</span>} />
        </div>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', marginBottom: '60px' }}>
            <h3 style={{ fontSize: '32px', fontWeight: '400', textTransform: 'uppercase' }}>OVERALL, 2026 PLAN vs ACHIEVMENT</h3>
        </div>
        <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <VocButton label="LV VOC 0%" />
            <VocButton label="BUS VOC 0%" />
            <VocButton label="HV VOC 0%" />
        </div>
    </>
);

const SensibilisationView = () => {
    const data = [
        { name: 'ATTENDED', value: 136 + 50 + 56, color: '#ef4444' }, // Approximate red slice
        { name: 'REMAINING', value: 2000, color: '#f59e0b' },
    ];

    const topics = [
        { id: 1, status: 'PUBLISHED' },
        { id: 2, status: 'DEVELOPED' },
        { id: 3, status: 'IN DRAFT' },
        { id: 4, status: 'NOT YET DEVELOPED' },
        { id: 5, status: 'NOT YET DEVELOPED' },
    ];

    return (
        <div style={{ display: 'flex', gap: '64px', alignItems: 'flex-start' }}>
            {/* Chart Section */}
            <div style={{ flex: 1, textAlign: 'center' }}>
                <h3 style={{ color: '#64748b', marginBottom: '24px', textTransform: 'uppercase' }}>Recorded Participation</h3>
                <div style={{ height: '300px', position: 'relative' }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={0}
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Legend verticalAlign="middle" align="right" layout="vertical" iconType="square" />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Text Simulation */}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        {/* Donut center content if needed */}
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div style={{ flex: 1, border: '1px solid #ef4444' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#ef4444', color: 'white' }}>
                            <th style={{ padding: '12px', textAlign: 'left', width: '80px' }}>TOPIC</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>STATUT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topics.map((t, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #ef4444' }}>
                                <td style={{ padding: '12px', fontWeight: 'bold' }}>{t.id}</td>
                                <td style={{ padding: '12px', textTransform: 'uppercase' }}>{t.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const DriverProfilesView = () => (
    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1e293b' }}>DRIVER PROFILES</h3>
        <p style={{ color: '#64748b' }}>Driver capability and performance records (Coming Soon)</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px', marginTop: '32px' }}>
            {['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams'].map((name, i) => (
                <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#64748b' }}>
                        {name.charAt(0)}
                    </div>
                    <div>
                        <p style={{ fontWeight: '600', color: '#1e293b' }}>{name}</p>
                        <p style={{ fontSize: '12px', color: '#64748b' }}>Heavy Vehicle Operator</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const PeopleTraining = () => {
    const [activeTab, setActiveTab] = useState<'TRAINING' | 'SENSIBILISATION' | 'DRIVERS'>('TRAINING');

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            {/* Header */}
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ color: '#d32f2f', fontSize: '56px', fontWeight: 'bold', textTransform: 'uppercase', lineHeight: 1, marginBottom: '8px' }}>
                    PEOPLE
                </h1>
                {activeTab === 'SENSIBILISATION' && (
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', textTransform: 'uppercase' }}>
                        SENSIBILISATION & TOOLBOX TALK (ZERO ACCIDENTS).
                    </h2>
                )}
                {activeTab === 'DRIVERS' && (
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', textTransform: 'uppercase' }}>
                        OPERATOR & DRIVER PROFILES
                    </h2>
                )}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '32px' }}>
                <button
                    onClick={() => setActiveTab('TRAINING')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: activeTab === 'TRAINING' ? '#d32f2f' : 'white',
                        color: activeTab === 'TRAINING' ? 'white' : 'black',
                        fontWeight: 'bold',
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px 4px 0 0',
                        cursor: 'pointer'
                    }}
                >
                    TRAINING
                </button>
                <button
                    onClick={() => setActiveTab('SENSIBILISATION')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: activeTab === 'SENSIBILISATION' ? '#d32f2f' : 'white',
                        color: activeTab === 'SENSIBILISATION' ? 'white' : 'black',
                        fontWeight: 'bold',
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px 4px 0 0',
                        cursor: 'pointer'
                    }}
                >
                    SENSIBILISATION
                </button>
                <button
                    onClick={() => setActiveTab('DRIVERS')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: activeTab === 'DRIVERS' ? '#d32f2f' : 'white',
                        color: activeTab === 'DRIVERS' ? 'white' : 'black',
                        fontWeight: 'bold',
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px 4px 0 0',
                        cursor: 'pointer'
                    }}
                >
                    DRIVER PROFILES
                </button>
            </div>

            {/* Content Area */}
            <div>
                {activeTab === 'TRAINING' && <TrainingView />}
                {activeTab === 'SENSIBILISATION' && <SensibilisationView />}
                {activeTab === 'DRIVERS' && <DriverProfilesView />}
            </div>

        </div>
    );
};

export default PeopleTraining;
