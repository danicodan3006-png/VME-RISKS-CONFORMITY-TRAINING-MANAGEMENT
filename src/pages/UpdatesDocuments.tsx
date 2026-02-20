
import { useState } from 'react';
import { FileText, Download, Calendar, ArrowRight, Bell, Library } from 'lucide-react';

const UpdatesView = () => (
    <div style={{ backgroundColor: '#1E1E1E', padding: '32px', borderRadius: '12px', border: '1px solid #333' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <Bell size={24} color="#ef4444" />
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>System Notifications</h3>
        </div>
        <div style={{ display: 'grid', gap: '20px' }}>
            {[
                { title: 'New Safety Protocol V2.1 (2026)', date: 'FEB 18, 2026', desc: 'Updated guidelines for heavy machinery operation during night shifts. All L5 and L4 drivers must review the night-vision amendment.', priority: 'HIGH' },
                { title: 'Radar-Logic System Integration', date: 'FEB 15, 2026', desc: 'The new interactive Risk Radar on Page 6 is now live. Departmental hotspots are synchronized with current audit exclusions.', priority: 'INFO' },
                { title: 'Q1 Compliance Audit Milestone', date: 'FEB 10, 2026', desc: 'Detailed analysis of contractor compliance (Solvay, ITM, Neema) now available in the resource portal.', priority: 'STABLE' },
            ].map((item, i) => (
                <div key={i} style={{
                    padding: '24px',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'start'
                }}>
                    <div style={{
                        padding: '12px',
                        backgroundColor: item.priority === 'HIGH' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                        borderRadius: '8px',
                        color: item.priority === 'HIGH' ? '#ef4444' : '#3b82f6'
                    }}>
                        <Calendar size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>{item.title}</h4>
                            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>{item.date}</span>
                        </div>
                        <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '14px' }}>{item.desc}</p>
                        <button style={{ marginTop: '16px', color: '#3b82f6', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                            View Bulletin <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const DocumentsView = () => (
    <div style={{ backgroundColor: '#1E1E1E', padding: '32px', borderRadius: '12px', border: '1px solid #333' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Library size={24} color="#3b82f6" />
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Audit & Training Repository</h3>
        </div>
        <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '14px' }}>Direct access to the 2026 VME Strategic Library.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {[
                { name: 'VME Safety Policy 2026.pdf', size: '2.4 MB', type: 'PDF' },
                { name: 'Vehicle Radar Operational Manual.pdf', size: '4.2 MB', type: 'PDF' },
                { name: 'Incident Reporting Template.xlsx', size: '450 KB', type: 'XLSX' },
                { name: 'Driver Training Modules (HD).zip', size: '1.2 GB', type: 'ZIP' },
                { name: 'Risk Assessment Matrix Q1.pdf', size: '3.1 MB', type: 'PDF' },
                { name: 'Emergency Protocol (Audit 2026).pdf', size: '1.2 MB', type: 'PDF' },
            ].map((doc, i) => (
                <div key={i} style={{
                    padding: '20px',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ padding: '12px', backgroundColor: '#2a2a2a', borderRadius: '8px', color: '#3b82f6' }}>
                            <FileText size={20} />
                        </div>
                        <div>
                            <p style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px', fontSize: '14px' }}>{doc.name}</p>
                            <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>{doc.size} • {doc.type}</p>
                        </div>
                    </div>
                    <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}>
                        <Download size={20} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const UpdatesDocuments = () => {
    const [activeTab, setActiveTab] = useState<'UPDATES' | 'DOCUMENTS'>('UPDATES');

    return (
        <div style={{
            backgroundColor: '#121212',
            minHeight: '100vh',
            width: '100%',
            padding: '32px',
            boxSizing: 'border-box'
        }}>
            {/* Header */}
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ color: '#ef4444', fontSize: '48px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '4px', lineHeight: 1, marginBottom: '8px' }}>
                    CENTRAL <span style={{ color: 'white' }}>RESOURCES</span>
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '40px', height: '4px', backgroundColor: '#ef4444' }}></div>
                    <h2 style={{ fontSize: '14px', fontWeight: '900', color: '#475569', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        {activeTab === 'UPDATES' && 'BULLETIN TELEMETRY'}
                        {activeTab === 'DOCUMENTS' && 'STRATEGIC ARCHIVE'}
                    </h2>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '32px' }}>
                <button
                    onClick={() => setActiveTab('UPDATES')}
                    style={{
                        padding: '12px 32px',
                        backgroundColor: activeTab === 'UPDATES' ? '#ef4444' : '#1E1E1E',
                        color: activeTab === 'UPDATES' ? 'white' : '#64748b',
                        fontWeight: '900',
                        fontSize: '12px',
                        letterSpacing: '1px',
                        border: activeTab === 'UPDATES' ? '1px solid #ef4444' : '1px solid #333',
                        borderRadius: '4px 4px 0 0',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    UPDATES
                </button>
                <button
                    onClick={() => setActiveTab('DOCUMENTS')}
                    style={{
                        padding: '12px 32px',
                        backgroundColor: activeTab === 'DOCUMENTS' ? '#3b82f6' : '#1E1E1E',
                        color: activeTab === 'DOCUMENTS' ? 'white' : '#64748b',
                        fontWeight: '900',
                        fontSize: '12px',
                        letterSpacing: '1px',
                        border: activeTab === 'DOCUMENTS' ? '1px solid #3b82f6' : '1px solid #333',
                        borderRadius: '4px 4px 0 0',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    DOCUMENTS
                </button>
            </div>

            {/* Content Container */}
            <div style={{ height: 'calc(100vh - 280px)', overflowY: 'auto', paddingRight: '8px' }}>
                {activeTab === 'UPDATES' && <UpdatesView />}
                {activeTab === 'DOCUMENTS' && <DocumentsView />}
            </div>

            {/* Footer */}
            <div style={{ marginTop: '32px', borderTop: '1px solid #333', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10px', color: '#475569', fontWeight: 'bold' }}>RESOURCE PORTAL V4.1</span>
                <span style={{ fontSize: '10px', color: '#475569', fontWeight: 'bold' }}>USER: DAN KAHILU</span>
            </div>
        </div>
    );
};

export default UpdatesDocuments;
