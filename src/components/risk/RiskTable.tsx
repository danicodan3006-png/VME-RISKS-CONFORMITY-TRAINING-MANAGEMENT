

import { AlertTriangle, CheckCircle, Clock, ShieldAlert } from 'lucide-react';

const RiskTable = () => {
    // Dummy Data
    const risks = [
        { id: 'R-001', type: 'Machinery', hazard: 'Conveyor belt guard missing', severity: 'Critical', status: 'Open', owner: 'John Doe', date: '2023-10-25' },
        { id: 'R-002', type: 'Electrical', hazard: 'Exposed wiring in workshop', severity: 'High', status: 'In Progress', owner: 'Jane Smith', date: '2023-10-26' },
        { id: 'R-003', type: 'Ergonomic', hazard: 'Improper lifting technique', severity: 'Low', status: 'Mitigated', owner: 'Mike Brown', date: '2023-10-20' },
        { id: 'R-004', type: 'Chemical', hazard: 'Unlabeled chemical container', severity: 'Medium', status: 'Open', owner: 'Sarah Connor', date: '2023-10-28' },
        { id: 'R-005', type: 'Fire', hazard: 'Blocked fire exit', severity: 'Critical', status: 'Open', owner: 'Terminator', date: '2023-10-29' },
    ];

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'Critical': return { bg: '#fee2e2', text: '#ef4444', border: '#fca5a5' };
            case 'High': return { bg: '#ffedd5', text: '#f97316', border: '#fdba74' };
            case 'Medium': return { bg: '#fef9c3', text: '#eab308', border: '#fde047' };
            default: return { bg: '#dcfce7', text: '#22c55e', border: '#86efac' };
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Open': return <AlertTriangle size={16} />;
            case 'In Progress': return <Clock size={16} />;
            case 'Mitigated': return <CheckCircle size={16} />;
            default: return <ShieldAlert size={16} />;
        }
    };


    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b', textAlign: 'left' }}>
                        <th style={{ padding: '12px 16px', fontWeight: 600 }}>Risk ID</th>
                        <th style={{ padding: '12px 16px', fontWeight: 600 }}>Type</th>
                        <th style={{ padding: '12px 16px', fontWeight: 600 }}>Hazard Description</th>
                        <th style={{ padding: '12px 16px', fontWeight: 600 }}>Severity</th>
                        <th style={{ padding: '12px 16px', fontWeight: 600 }}>Status</th>
                        <th style={{ padding: '12px 16px', fontWeight: 600 }}>Owner</th>
                        <th style={{ padding: '12px 16px', fontWeight: 600 }}>Date Identified</th>
                        <th style={{ padding: '12px 16px', fontWeight: 600 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {risks.map((risk, index) => {
                        const sevStyle = getSeverityColor(risk.severity);
                        return (
                            <tr key={index} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc' }}>
                                <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1e293b' }}>{risk.id}</td>
                                <td style={{ padding: '12px 16px', color: '#475569' }}>{risk.type}</td>
                                <td style={{ padding: '12px 16px', color: '#334155' }}>{risk.hazard}</td>
                                <td style={{ padding: '12px 16px' }}>
                                    <span style={{
                                        display: 'inline-flex',
                                        padding: '4px 8px',
                                        borderRadius: '9999px',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        backgroundColor: sevStyle.bg,
                                        color: sevStyle.text,
                                        border: `1px solid ${sevStyle.border}`
                                    }}>
                                        {risk.severity}
                                    </span>
                                </td>
                                <td style={{ padding: '12px 16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: risk.status === 'Open' ? '#ef4444' : risk.status === 'Mitigated' ? '#22c55e' : '#f59e0b' }}>
                                        {getStatusIcon(risk.status)}
                                        <span style={{ fontWeight: 500 }}>{risk.status}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '12px 16px', color: '#475569' }}>{risk.owner}</td>
                                <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{risk.date}</td>
                                <td style={{ padding: '12px 16px' }}>
                                    <button style={{ color: '#3b82f6', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>View</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default RiskTable;
