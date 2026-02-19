
import React, { useState } from 'react';
import { Bell, FileText, CheckCircle, AlertTriangle, Activity } from 'lucide-react';

const KPICard = ({ value, label, subtext, valueColor = 'black' }: { value: string, label: React.ReactNode, subtext?: string, valueColor?: string }) => (
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
        minHeight: '140px'
    }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px', lineHeight: '1.2' }}>
            {label}
        </div>
        <p style={{ fontSize: '36px', fontWeight: '400', color: valueColor, marginBottom: '4px' }}>{value}</p>
        {subtext && <p style={{ fontSize: '16px', color: '#64748b' }}>{subtext}</p>}
    </div>
);

// --- Sub-Views ---

const ComplianceDashboardView = () => {
    const tableData = [
        { company: 'MMG', fleet: '256', identified: '256', pct: '100%', inspected: '99', remaining: '157', compliance: '61%' },
        { company: 'MEXCO', fleet: '?', identified: '23', pct: '?', inspected: '23', remaining: '?', compliance: '?' },
        { company: 'WHCC', fleet: '?', identified: '0', pct: '?', inspected: '0', remaining: '?', compliance: '?' },
        { company: 'PANDA', fleet: '?', identified: '0', pct: '?', inspected: '0', remaining: '?', compliance: '?' },
        { company: 'C4C', fleet: '?', identified: '0', pct: '?', inspected: '0', remaining: '?', compliance: '?' },
        { company: 'TKM', fleet: '?', identified: '0', pct: '?', inspected: '0', remaining: '?', compliance: '?' },
        { company: 'SSL', fleet: '?', identified: '0', pct: '?', inspected: '0', remaining: '?', compliance: '?' },
    ];

    return (
        <div>
            {/* KPI Row */}
            <div style={{ display: 'flex', gap: '32px', marginBottom: '60px', flexWrap: 'wrap' }}>
                <KPICard
                    label={<span>Total Identified<br />Equipment</span>}
                    value="123"
                    subtext="units"
                />
                <KPICard
                    label={<span>LV Inspected<br />and Tagged</span>}
                    value="97"
                    subtext="units"
                />
                <KPICard
                    label={<span>HV Inspected<br />and Tagged</span>}
                    value="26"
                    subtext="units"
                />
                <KPICard
                    label={<span style={{ color: '#ef4444' }}>Inspected but<br />not Identified</span>}
                    value="-/+50"
                    valueColor="#ef4444"
                    subtext="units"
                />
            </div>
            {/* Table Section */}
            <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Fleet Compliance by Company:</h3>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#ef4444', color: 'white' }}>
                                <th style={{ padding: '12px', textAlign: 'left', textTransform: 'uppercase', fontSize: '12px' }}>COMPANY</th>
                                <th style={{ padding: '12px', textAlign: 'center', textTransform: 'uppercase', fontSize: '12px' }}>TOTAL FLEET</th>
                                <th style={{ padding: '12px', textAlign: 'center', textTransform: 'uppercase', fontSize: '12px' }}>IDENTIFIED</th>
                                <th style={{ padding: '12px', textAlign: 'center', textTransform: 'uppercase', fontSize: '12px' }}>PERCENTAGE</th>
                                <th style={{ padding: '12px', textAlign: 'center', textTransform: 'uppercase', fontSize: '12px' }}>INSPECTED</th>
                                <th style={{ padding: '12px', textAlign: 'center', textTransform: 'uppercase', fontSize: '12px' }}>REMAINING</th>
                                <th style={{ padding: '12px', textAlign: 'center', textTransform: 'uppercase', fontSize: '12px', width: '100px' }}>COMPLIANCE RATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{row.company}</td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>{row.fleet}</td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>{row.identified}</td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>{row.pct}</td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>{row.inspected}</td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>{row.remaining}</td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>{row.compliance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const ComplianceTrackingView = () => (
    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '12px', backgroundColor: '#e0f2fe', borderRadius: '12px', color: '#0284c7' }}>
                <Bell size={32} />
            </div>
            <div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>Compliance Tracking</h3>
                <p style={{ color: '#64748b' }}>Automated notification alerts for department owners.</p>
            </div>
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
            {[
                { type: 'Alert', msg: 'Mining Department: 5 Vehicles overdue for inspection', time: '2 hours ago', urgent: true },
                { type: 'Info', msg: 'Logistics: 98% Compliance reached this month', time: '1 day ago', urgent: false },
                { type: 'Warning', msg: 'Contractor X: Missing documentation for light vehicles', time: '2 days ago', urgent: true },
            ].map((item, i) => (
                <div key={i} style={{ padding: '16px', borderLeft: item.urgent ? '4px solid #ef4444' : '4px solid #3b82f6', backgroundColor: '#f8fafc', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <span style={{ fontWeight: 'bold', fontSize: '14px', color: item.urgent ? '#ef4444' : '#3b82f6', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>{item.type}</span>
                        <p style={{ color: '#334155' }}>{item.msg}</p>
                    </div>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.time}</span>
                </div>
            ))}
        </div>
    </div>
);

const VmeHealthReportView = () => (
    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '12px', backgroundColor: '#dcfce7', borderRadius: '12px', color: '#16a34a' }}>
                <Activity size={32} />
            </div>
            <div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>VME Health Report</h3>
                <p style={{ color: '#64748b' }}>Strategic Health Reporting: Overall VME status reports based on HSSEC findings.</p>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <h4 style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={18} color="#16a34a" /> Operational Readiness
                </h4>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#16a34a', marginBottom: '8px' }}>92%</div>
                <p style={{ fontSize: '13px', color: '#64748b' }}>Systems functioning within optimal parameters.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <h4 style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertTriangle size={18} color="#eab308" /> Maintenance Backlog
                </h4>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#eab308', marginBottom: '8px' }}>15</div>
                <p style={{ fontSize: '13px', color: '#64748b' }}>Lower priority tasks pending.</p>
            </div>
        </div>

        <div style={{ marginTop: '32px', padding: '24px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
            <h4 style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>HSSEC Summary</h4>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
                The overall VME health status is <strong>GOOD</strong>. Recent HSSEC findings indicate a positive trend in equipment maintenance compliance.
                Minor corrective actions are required for contractor fleets in the 'MEXCO' sector.
            </p>
            <button style={{ marginTop: '16px', color: '#3b82f6', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={16} /> Download Full Report
            </button>
        </div>
    </div>
);

const Machinery = () => {
    const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'TRACKING' | 'HEALTH'>('DASHBOARD');

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ color: '#d32f2f', fontSize: '56px', fontWeight: 'bold', textTransform: 'uppercase', lineHeight: 1, marginBottom: '8px' }}>
                    MACHINERY
                </h1>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', textTransform: 'uppercase' }}>
                    {activeTab === 'DASHBOARD' && 'COMPLIANCE DASHBOARD'}
                    {activeTab === 'TRACKING' && 'COMPLIANCE TRACKING'}
                    {activeTab === 'HEALTH' && 'VME HEALTH REPORT'}
                </h2>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '32px' }}>
                <button
                    onClick={() => setActiveTab('DASHBOARD')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: activeTab === 'DASHBOARD' ? '#d32f2f' : 'white',
                        color: activeTab === 'DASHBOARD' ? 'white' : 'black',
                        fontWeight: 'bold',
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px 4px 0 0',
                        cursor: 'pointer'
                    }}
                >
                    DASHBOARD
                </button>
                <button
                    onClick={() => setActiveTab('TRACKING')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: activeTab === 'TRACKING' ? '#d32f2f' : 'white',
                        color: activeTab === 'TRACKING' ? 'white' : 'black',
                        fontWeight: 'bold',
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px 4px 0 0',
                        cursor: 'pointer'
                    }}
                >
                    COMPLIANCE TRACKING
                </button>
                <button
                    onClick={() => setActiveTab('HEALTH')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: activeTab === 'HEALTH' ? '#d32f2f' : 'white',
                        color: activeTab === 'HEALTH' ? 'white' : 'black',
                        fontWeight: 'bold',
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px 4px 0 0',
                        cursor: 'pointer'
                    }}
                >
                    VME HEALTH REPORT
                </button>
            </div>

            {/* Content Area */}
            <div>
                {activeTab === 'DASHBOARD' && <ComplianceDashboardView />}
                {activeTab === 'TRACKING' && <ComplianceTrackingView />}
                {activeTab === 'HEALTH' && <VmeHealthReportView />}
            </div>
        </div>
    );
};

export default Machinery;
