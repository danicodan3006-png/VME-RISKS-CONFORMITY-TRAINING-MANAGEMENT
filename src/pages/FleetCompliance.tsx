
import React, { useState } from 'react';
import { Truck, CheckCircle, AlertTriangle, Search } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// --- Data ---
const companyData = [
    { id: 'MMG', name: 'MMG Kinsevere', totalFleet: 145, compliant: 138, nonCompliant: 7, compliance: 95.1 },
    { id: 'MEXCO', name: 'Mexco Mining', totalFleet: 82, compliant: 65, nonCompliant: 17, compliance: 79.2 },
    { id: 'WHCC', name: 'WHCC Logistics', totalFleet: 45, compliant: 42, nonCompliant: 3, compliance: 93.3 },
    { id: 'EPS', name: 'EPS Services', totalFleet: 28, compliant: 28, nonCompliant: 0, compliance: 100.0 },
    { id: 'NB_MINING', name: 'NB Mining', totalFleet: 112, compliant: 98, nonCompliant: 14, compliance: 87.5 },
    { id: 'MCK', name: 'MCK Trucks', totalFleet: 65, compliant: 50, nonCompliant: 15, compliance: 76.9 },
];

const totalFleet = companyData.reduce((acc, curr) => acc + curr.totalFleet, 0);
const totalCompliant = companyData.reduce((acc, curr) => acc + curr.compliant, 0);
const totalNonCompliant = companyData.reduce((acc, curr) => acc + curr.nonCompliant, 0);
const globalCompliance = ((totalCompliant / totalFleet) * 100).toFixed(1);

const overallStatus = [
    { name: 'Compliant', value: totalCompliant, color: '#22c55e' },
    { name: 'Non-Compliant', value: totalNonCompliant, color: '#ef4444' },
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

const ProgressBar = ({ value, color = '#3b82f6' }: { value: number, color?: string }) => (
    <div style={{ width: '100%', height: '8px', backgroundColor: '#333', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', backgroundColor: color, transition: 'width 0.5s ease' }}></div>
    </div>
);

const FleetCompliance = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = companyData.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    FLEET <span style={{ color: '#3b82f6' }}>COMPLIANCE</span>
                </h1>
                <p style={{ color: '#64748b' }}>Vehicle Conformity Status by Contractor</p>
            </div>

            {/* Top Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <DarkCard>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '600' }}>Global Compliance</p>
                            <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#22c55e' }}>{globalCompliance}%</h2>
                        </div>
                        <div style={{ padding: '12px', backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '50%' }}>
                            <CheckCircle size={32} color="#22c55e" />
                        </div>
                    </div>
                    <div style={{ marginTop: '16px' }}>
                        <ProgressBar value={parseFloat(globalCompliance)} color="#22c55e" />
                    </div>
                </DarkCard>

                <DarkCard>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '600' }}>Total Fleet Size</p>
                            <h2 style={{ fontSize: '48px', fontWeight: '800', color: 'white' }}>{totalFleet}</h2>
                        </div>
                        <div style={{ height: '80px', width: '80px' }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={overallStatus}
                                        innerRadius={25}
                                        outerRadius={40}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {overallStatus.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e' }}></div> {totalCompliant} Compliant</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444' }}></div> {totalNonCompliant} Issues</span>
                    </div>
                </DarkCard>

                <DarkCard>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '600' }}>Action Required</p>
                            <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#ef4444' }}>{totalNonCompliant}</h2>
                        </div>
                        <div style={{ padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%' }}>
                            <AlertTriangle size={32} color="#ef4444" />
                        </div>
                    </div>
                    <p style={{ fontSize: '13px', color: '#fca5a5', marginTop: '16px' }}>Vehicles grounded or requiring immediate maintenance.</p>
                </DarkCard>
            </div>

            {/* Main Table */}
            <DarkCard>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Truck size={20} color="#3b82f6" />
                        Contractor Compliance Status
                    </h3>

                    <div style={{ position: 'relative' }}>
                        <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            placeholder="Search company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                backgroundColor: '#121212',
                                border: '1px solid #333',
                                borderRadius: '6px',
                                padding: '10px 16px 10px 36px',
                                color: 'white',
                                fontSize: '14px',
                                outline: 'none',
                                width: '250px'
                            }}
                        />
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #333', color: '#64748b', textTransform: 'uppercase', fontSize: '12px' }}>
                                <th style={{ textAlign: 'left', padding: '16px' }}>Company Name</th>
                                <th style={{ textAlign: 'center', padding: '16px' }}>Total Fleet</th>
                                <th style={{ textAlign: 'center', padding: '16px' }}>Compliant</th>
                                <th style={{ textAlign: 'center', padding: '16px' }}>Non-Compliant</th>
                                <th style={{ textAlign: 'left', padding: '16px' }}>Compliance Rate</th>
                                <th style={{ textAlign: 'center', padding: '16px' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((company) => (
                                <tr key={company.id} style={{ borderBottom: '1px solid #333', transition: 'background-color 0.1s' }}>
                                    <td style={{ padding: '16px', fontWeight: '600' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '32px', height: '32px', backgroundColor: '#333', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', color: '#94a3b8' }}>
                                                {company.id}
                                            </div>
                                            {company.name}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center' }}>{company.totalFleet}</td>
                                    <td style={{ padding: '16px', textAlign: 'center', color: '#22c55e' }}>{company.compliant}</td>
                                    <td style={{ padding: '16px', textAlign: 'center', color: company.nonCompliant > 0 ? '#ef4444' : '#64748b' }}>{company.nonCompliant}</td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ width: '40px', textAlign: 'right', fontWeight: 'bold', color: company.compliance >= 90 ? '#22c55e' : (company.compliance >= 80 ? '#f59e0b' : '#ef4444') }}>
                                                {company.compliance}%
                                            </span>
                                            <div style={{ flex: 1, minWidth: '100px' }}>
                                                <ProgressBar value={company.compliance} color={company.compliance >= 90 ? '#22c55e' : (company.compliance >= 80 ? '#f59e0b' : '#ef4444')} />
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center' }}>
                                        {company.compliance >= 90 ? (
                                            <span style={{ padding: '4px 10px', borderRadius: '20px', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', fontSize: '11px', fontWeight: 'bold' }}>EXCELLENT</span>
                                        ) : company.compliance >= 80 ? (
                                            <span style={{ padding: '4px 10px', borderRadius: '20px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', fontSize: '11px', fontWeight: 'bold' }}>GOOD</span>
                                        ) : (
                                            <span style={{ padding: '4px 10px', borderRadius: '20px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '11px', fontWeight: 'bold' }}>CRITICAL</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DarkCard>
        </div>
    );
};

export default FleetCompliance;
