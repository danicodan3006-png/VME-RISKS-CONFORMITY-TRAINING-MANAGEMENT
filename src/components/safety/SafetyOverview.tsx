
import React from 'react';
import { ClipboardCheck, CheckCircle, AlertOctagon } from 'lucide-react';

const SafetyOverview = () => {
    const inspections = [
        { id: 'INS-2023-001', area: 'Workshop A', inspector: 'David Kim', score: 98, date: '2023-11-01', status: 'Passed' },
        { id: 'INS-2023-002', area: 'Chemical Storage', inspector: 'Sarah Connor', score: 85, date: '2023-10-30', status: 'Passed' },
        { id: 'INS-2023-003', area: 'Loading Bay', inspector: 'Mike Brown', score: 72, date: '2023-10-28', status: 'Warning' },
        { id: 'INS-2023-004', area: 'Generator Room', inspector: 'John Doe', score: 100, date: '2023-10-25', status: 'Passed' },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Safety Compliance Score Card */}
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ padding: '10px', backgroundColor: '#dcfce7', borderRadius: '10px', color: '#16a34a' }}>
                        <ClipboardCheck size={24} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', lineHeight: 1.2 }}>Safety Compliance</h3>
                        <p style={{ fontSize: '13px', color: '#64748b' }}>Overall Site Score</p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '48px', fontWeight: '800', color: '#16a34a', lineHeight: 1 }}>94%</span>
                    <span style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>Target: 90%</span>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <div style={{ height: '8px', width: '100%', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: '94%', backgroundColor: '#16a34a', borderRadius: '9999px' }} />
                    </div>
                </div>

                <p style={{ fontSize: '14px', color: '#475569' }}>
                    <strong>Excellent!</strong> Your site is compliant with all major safety regulations for this quarter.
                </p>
            </div>

            {/* Recent Inspections List */}
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>Recent Inspections</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {inspections.map((ins, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {ins.status === 'Passed' ? <CheckCircle size={18} color="#16a34a" /> : <AlertOctagon size={18} color="#eab308" />}
                                <div>
                                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{ins.area}</p>
                                    <p style={{ fontSize: '12px', color: '#64748b' }}>{ins.date} • {ins.inspector}</p>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '14px', fontWeight: '700', color: ins.score >= 90 ? '#16a34a' : ins.score >= 75 ? '#eab308' : '#ef4444' }}>
                                    {ins.score}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <button style={{ marginTop: '16px', width: '100%', padding: '10px', border: '1px dashed #cbd5e1', borderRadius: '8px', color: '#64748b', fontSize: '13px', fontWeight: '600', cursor: 'pointer', backgroundColor: 'transparent' }}>
                    View All Inspections
                </button>
            </div>
        </div>
    );
};

export default SafetyOverview;
