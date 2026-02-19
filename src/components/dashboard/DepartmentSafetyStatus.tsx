

import { AlertTriangle, CheckCircle } from 'lucide-react';

interface Department {
    name: string;
    accidents: number;
    inspectionCompliance: number; // Percentage
    manager: string;
}

const departments: Department[] = [
    { name: 'Mining Operations', accidents: 5, inspectionCompliance: 75, manager: 'J. Smith' },
    { name: 'Logistics & Transport', accidents: 1, inspectionCompliance: 95, manager: 'A. Doe' },
    { name: 'Plant Engineering', accidents: 3, inspectionCompliance: 85, manager: 'M. Johnson' },
    { name: 'Site Maintenance', accidents: 4, inspectionCompliance: 60, manager: 'S. Williams' },
    { name: 'Human Resources', accidents: 0, inspectionCompliance: 98, manager: 'K. Brown' },
    { name: 'Security', accidents: 2, inspectionCompliance: 70, manager: 'L. Davis' },
];

// The core function requested
const isHighRisk = (dept: Department): boolean => {
    return dept.accidents > 2 && dept.inspectionCompliance < 80;
};

const DepartmentSafetyStatus = () => {
    return (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden', marginTop: '32px' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>Departmental Safety Overview</h3>
                <p style={{ fontSize: '14px', color: '#64748b' }}> departments containing &gt; 2 accidents AND &lt; 80% inspection compliance are highlighted.</p>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <th style={{ padding: '16px 24px', textAlign: 'left' }}>Department</th>
                        <th style={{ padding: '16px 24px', textAlign: 'center' }}>Accidents (YTD)</th>
                        <th style={{ padding: '16px 24px', textAlign: 'center' }}>Inspection Compliance</th>
                        <th style={{ padding: '16px 24px', textAlign: 'left' }}>Manager</th>
                        <th style={{ padding: '16px 24px', textAlign: 'center' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((dept, index) => {
                        const risky = isHighRisk(dept);
                        return (
                            <tr key={index} style={{
                                borderBottom: '1px solid #f1f5f9',
                                backgroundColor: risky ? '#fef2f2' : 'white', // Light red background for high risk
                            }}>
                                <td style={{ padding: '16px 24px', fontWeight: '600', color: '#1e293b' }}>
                                    {dept.name}
                                </td>
                                <td style={{ padding: '16px 24px', textAlign: 'center', color: risky ? '#ef4444' : '#1e293b', fontWeight: risky ? 'bold' : 'normal' }}>
                                    {dept.accidents}
                                </td>
                                <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        backgroundColor: dept.inspectionCompliance < 80 ? '#fff1f2' : '#f0fdf4',
                                        color: dept.inspectionCompliance < 80 ? '#be123c' : '#15803d',
                                        fontWeight: '600',
                                        fontSize: '13px'
                                    }}>
                                        {dept.inspectionCompliance}%
                                    </span>
                                </td>
                                <td style={{ padding: '16px 24px', color: '#64748b' }}>
                                    {dept.manager}
                                </td>
                                <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                                    {risky ? (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#ef4444', fontWeight: 'bold', fontSize: '13px' }}>
                                            <AlertTriangle size={16} /> ACTION REQ.
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#22c55e', fontWeight: 'bold', fontSize: '13px' }}>
                                            <CheckCircle size={16} /> STABLE
                                        </div>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DepartmentSafetyStatus;
