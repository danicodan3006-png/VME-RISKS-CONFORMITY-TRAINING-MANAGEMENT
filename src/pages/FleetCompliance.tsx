
import { useState } from 'react';
import { Truck, CheckCircle, AlertTriangle, Search, Activity } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { useSafeEquip } from '../context/SafeEquipContext';

// --- Baseline Contractors (Safety Fallback) ---
const STATIC_COMPANIES = [
    { id: 'MMG', name: 'MMG Kinsevere', total: 296, compliant: 113 },
    { id: 'MEXCO', name: 'Mexco Mining', total: 112, compliant: 43 },
    { id: 'ML', name: 'Masterlift', total: 14, compliant: 11 },
    { id: 'TKM', name: 'TKM', total: 21, compliant: 8 },
];

// --- Components ---

const DarkCard = ({ children, style = {} }: { children: React.ReactNode, style?: React.CSSProperties }) => (
    <div style={{
        backgroundColor: '#1E1E1E',
        border: '1px solid #333',
        borderRadius: '8px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        ...style
    }}>
        {children}
    </div>
);

const ProgressBar = ({ value, color = '#3b82f6' }: { value: number, color?: string }) => (
    <div style={{ width: '100%', height: '6px', backgroundColor: '#333', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ width: `${Math.min(100, value)}%`, height: '100%', backgroundColor: color, transition: 'width 0.5s ease' }}></div>
    </div>
);

const FleetCompliance = () => {
    const { dataset } = useSafeEquip();
    const [searchTerm, setSearchTerm] = useState('');

    // Aggregate Data from Dataset
    const aggregatedDataset = dataset.reduce((acc: any, curr) => {
        const coName = curr.company_name;
        if (!acc[coName]) acc[coName] = { total: 0, compliant: 0 };
        acc[coName].total += curr.vehicles_total;
        acc[coName].compliant += curr.vehicles_compliant;
        return acc;
    }, {});

    // Merge Dynamic with Static Baseline
    const mergedCompanies = [...STATIC_COMPANIES];
    Object.keys(aggregatedDataset).forEach(name => {
        const existing = mergedCompanies.find(c => c.name === name);
        if (existing) {
            existing.total += aggregatedDataset[name].total;
            existing.compliant += aggregatedDataset[name].compliant;
        } else {
            mergedCompanies.push({
                id: name.substring(0, 4).toUpperCase(),
                name,
                total: aggregatedDataset[name].total,
                compliant: aggregatedDataset[name].compliant
            });
        }
    });

    // Final Data Processing
    const companyData = mergedCompanies.map(co => {
        const nonCompliant = co.total - co.compliant;
        const rate = co.total > 0 ? parseFloat(((co.compliant / co.total) * 100).toFixed(1)) : 0;
        return { ...co, nonCompliant, rate };
    }).sort((a, b) => b.rate - a.rate);

    const totalFleetSize = companyData.reduce((sum, c) => sum + c.total, 0);
    const totalCompliant = companyData.reduce((sum, c) => sum + c.compliant, 0);
    const totalNonCompliantCount = totalFleetSize - totalCompliant;
    const globalComplianceRate = totalFleetSize > 0 ? ((totalCompliant / totalFleetSize) * 100).toFixed(1) : "0.0";

    const filteredData = companyData.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            gap: '24px',
            boxSizing: 'border-box',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexShrink: 0 }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'white', letterSpacing: '-0.5px', lineHeight: 1 }}>
                        FLEET <span style={{ color: '#3b82f6' }}>COMPLIANCE 2026</span>
                    </h1>
                    <p style={{ color: '#64748b', marginTop: '6px', fontSize: '15px' }}>Audited Contractor Vehicle Conformity Reports | SafeEquip Sync: ACTIVE</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>AUDITOR: DAN KAHILU</div>
                    <div style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>REAL-TIME STATUS: SYNCHRONIZED</div>
                </div>
            </div>

            {/* Top KPI Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', height: '120px', flexShrink: 0 }}>
                <DarkCard style={{ justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>Global Site Compliance</p>
                            <h2 style={{ fontSize: '42px', fontWeight: '900', color: '#22c55e', lineHeight: 1, marginTop: '4px' }}>{globalComplianceRate}%</h2>
                        </div>
                        <CheckCircle size={40} color="#22c55e" style={{ opacity: 0.8 }} />
                    </div>
                </DarkCard>
                <DarkCard style={{ justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>Total Fleet Size</p>
                            <h2 style={{ fontSize: '42px', fontWeight: '900', color: 'white', lineHeight: 1, marginTop: '4px' }}>{totalFleetSize}</h2>
                        </div>
                        <Truck size={40} color="#3b82f6" style={{ opacity: 0.8 }} />
                    </div>
                </DarkCard>
                <DarkCard style={{ border: '1px solid #ef444433', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ fontSize: '12px', color: '#fca5a5', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>Non-Compliant Ops</p>
                            <h2 style={{ fontSize: '42px', fontWeight: '900', color: '#ef4444', lineHeight: 1, marginTop: '4px' }}>{totalNonCompliantCount}</h2>
                        </div>
                        <AlertTriangle size={40} color="#ef4444" style={{ opacity: 0.8 }} />
                    </div>
                </DarkCard>
            </div>

            {/* Main Section */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px', minHeight: 0 }}>

                {/* Visual Chart (Stacked Bar) */}
                <DarkCard style={{ minHeight: 0 }}>
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Audit Comparison Chart</h3>
                        <p style={{ fontSize: '13px', color: '#64748b' }}>Live Compliance Distribution per Contractor</p>
                    </div>
                    <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={companyData}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={true} vertical={false} />
                                <XAxis type="number" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    stroke="#64748b"
                                    tick={{ fill: 'white', fontSize: 12, fontWeight: 'bold' }}
                                    axisLine={false}
                                    tickLine={false}
                                    width={120}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: 'white' }}
                                />
                                <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '12px', paddingBottom: '20px' }} />
                                <Bar dataKey="compliant" name="Compliant" stackId="a" fill="#22c55e" barSize={24} radius={[0, 0, 0, 0]} />
                                <Bar dataKey="nonCompliant" name="Non-Compliant" stackId="a" fill="#ef4444" barSize={24} radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </DarkCard>

                {/* Audit Sidebar Table */}
                <DarkCard style={{ minHeight: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexShrink: 0 }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Audited Metrics</h3>
                        <div style={{ position: 'relative' }}>
                            <Search size={14} color="#64748b" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                placeholder="Filter..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    backgroundColor: '#121212',
                                    border: '1px solid #333',
                                    borderRadius: '6px',
                                    padding: '6px 12px 6px 30px',
                                    color: 'white',
                                    fontSize: '12px',
                                    outline: 'none',
                                    width: '120px'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #333', color: '#64748b', textTransform: 'uppercase', fontSize: '11px' }}>
                                    <th style={{ textAlign: 'left', padding: '12px 8px' }}>Contractor</th>
                                    <th style={{ textAlign: 'center', padding: '12px 8px' }}>C/T</th>
                                    <th style={{ textAlign: 'right', padding: '12px 8px' }}>Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((co) => (
                                    <tr key={co.id} style={{ borderBottom: '1px solid #2a2a2a' }}>
                                        <td style={{ padding: '12px 8px', fontWeight: '600' }}>{co.name}</td>
                                        <td style={{ padding: '12px 8px', textAlign: 'center', color: '#94a3b8' }}>
                                            <span style={{ color: '#22c55e' }}>{co.compliant}</span> / {co.total}
                                        </td>
                                        <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                                                <span style={{ fontWeight: 'bold', color: co.rate > 80 ? '#22c55e' : (co.rate > 40 ? '#f59e0b' : '#ef4444') }}>{co.rate}%</span>
                                                <div style={{ width: '60px' }}>
                                                    <ProgressBar value={co.rate} color={co.rate > 80 ? '#22c55e' : (co.rate > 40 ? '#f59e0b' : '#ef4444')} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px', border: '1px dashed #333', flexShrink: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Activity size={14} color="#3b82f6" />
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#3b82f6' }}>DYNAMIC SYNC</span>
                        </div>
                        <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.5 }}>
                            Audited data mapping is now live. Updates to the HSSEC form will propagate here instantly.
                        </p>
                    </div>
                </DarkCard>
            </div>
        </div>
    );
};

export default FleetCompliance;
