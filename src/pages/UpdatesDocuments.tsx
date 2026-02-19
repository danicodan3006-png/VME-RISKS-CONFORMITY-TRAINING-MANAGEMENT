
import React, { useState } from 'react';
import { FileText, Download, Calendar, ArrowRight } from 'lucide-react';

const UpdatesView = () => (
    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1e293b' }}>Recent Updates</h3>
        <div style={{ display: 'grid', gap: '24px' }}>
            {[
                { title: 'New Safety Protocol V2.1', date: 'Oct 24, 2025', desc: 'Updated guidelines for heavy machinery operation during night shifts.' },
                { title: 'System Maintenance Scheduled', date: 'Oct 20, 2025', desc: 'The VME dashboard will be offline for 2 hours on Sunday.' },
                { title: 'Q3 Performance Report Released', date: 'Oct 15, 2025', desc: 'Detailed analysis of safety compliance and risk mitigation available now.' },
            ].map((item, i) => (
                <div key={i} style={{ padding: '24px', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', gap: '24px', alignItems: 'start' }}>
                    <div style={{ padding: '12px', backgroundColor: '#e0f2fe', borderRadius: '8px', color: '#0284c7' }}>
                        <Calendar size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>{item.title}</h4>
                            <span style={{ fontSize: '14px', color: '#64748b' }}>{item.date}</span>
                        </div>
                        <p style={{ color: '#475569', lineHeight: 1.5 }}>{item.desc}</p>
                        <button style={{ marginTop: '16px', color: '#3b82f6', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Read More <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const DocumentsView = () => (
    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1e293b' }}>Document Repository</h3>
        <p style={{ color: '#64748b', marginBottom: '32px' }}>Access and download official VME policies, manuals, and reports.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {[
                { name: 'VME Safety Policy 2026.pdf', size: '2.4 MB', type: 'PDF' },
                { name: 'Machine Inspection Manual.docx', size: '1.8 MB', type: 'DOCX' },
                { name: 'Incident Reporting Template.xlsx', size: '450 KB', type: 'XLSX' },
                { name: 'Driver Training Modules.zip', size: '156 MB', type: 'ZIP' },
                { name: 'Risk Assessment Guidelines.pdf', size: '3.1 MB', type: 'PDF' },
                { name: 'Emergency Response Plan.pdf', size: '1.2 MB', type: 'PDF' },
            ].map((doc, i) => (
                <div key={i} style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ padding: '12px', backgroundColor: '#f1f5f9', borderRadius: '8px', color: '#64748b' }}>
                            <FileText size={20} />
                        </div>
                        <div>
                            <p style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{doc.name}</p>
                            <p style={{ fontSize: '12px', color: '#94a3b8' }}>{doc.size} • {doc.type}</p>
                        </div>
                    </div>
                    <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
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
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ color: '#d32f2f', fontSize: '56px', fontWeight: 'bold', textTransform: 'uppercase', lineHeight: 1, marginBottom: '8px' }}>
                    RESOURCES
                </h1>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', textTransform: 'uppercase' }}>
                    {activeTab === 'UPDATES' && 'SYSTEM UPDATES & NEWS'}
                    {activeTab === 'DOCUMENTS' && 'DOCUMENT REPOSITORY'}
                </h2>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '32px' }}>
                <button
                    onClick={() => setActiveTab('UPDATES')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: activeTab === 'UPDATES' ? '#d32f2f' : 'white',
                        color: activeTab === 'UPDATES' ? 'white' : 'black',
                        fontWeight: 'bold',
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px 4px 0 0',
                        cursor: 'pointer'
                    }}
                >
                    UPDATES
                </button>
                <button
                    onClick={() => setActiveTab('DOCUMENTS')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: activeTab === 'DOCUMENTS' ? '#d32f2f' : 'white',
                        color: activeTab === 'DOCUMENTS' ? 'white' : 'black',
                        fontWeight: 'bold',
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px 4px 0 0',
                        cursor: 'pointer'
                    }}
                >
                    DOCUMENTS
                </button>
            </div>

            {/* Content */}
            <div>
                {activeTab === 'UPDATES' && <UpdatesView />}
                {activeTab === 'DOCUMENTS' && <DocumentsView />}
            </div>
        </div>
    );
};

export default UpdatesDocuments;
