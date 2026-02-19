
import React, { useState } from 'react';
import { FileText, Download, Eye, X, ShieldCheck, Lock, Activity } from 'lucide-react';

// --- Types ---
interface Document {
    id: string;
    title: string;
    status: 'PUBLISHED' | 'DRAFT' | 'REVIEW';
    impactNote: string;
    consequences: string;
    implementationProgress: number;
    icon: any;
    color: string;
}

// --- Data ---
const strategicDocs: Document[] = [
    {
        id: 'DOC-001',
        title: 'VOC Request Form V1.0',
        status: 'PUBLISHED',
        impactNote: 'Strict control of equipment access.',
        consequences: 'Refusal of access to site for unauthorized operators. Immediate supervisor sanction.',
        implementationProgress: 75,
        icon: Lock,
        color: '#22c55e'
    },
    {
        id: 'DOC-002',
        title: 'VME Safety Inspection Form',
        status: 'PUBLISHED',
        impactNote: 'Standardization of pre-operational checks.',
        consequences: 'Operating unsafe equipment leads to L5 disciplinary action.',
        implementationProgress: 90,
        icon: ShieldCheck,
        color: '#3b82f6'
    },
    {
        id: 'DOC-003',
        title: 'VOC Attendance Register',
        status: 'PUBLISHED',
        impactNote: 'Proof of Theory/Practice Competence.',
        consequences: 'Missing records invalidate certification. Retraining required.',
        implementationProgress: 100,
        icon: Activity,
        color: '#f59e0b'
    }
];

// --- Components ---

const DarkCard = ({ children, className = '', style = {}, onClick }: { children: React.ReactNode, className?: string, style?: React.CSSProperties, onClick?: () => void }) => (
    <div
        onClick={onClick}
        style={{
            backgroundColor: '#1E1E1E',
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '24px',
            cursor: onClick ? 'pointer' : 'default',
            transition: 'transform 0.2s, background-color 0.2s',
            ...style
        }}
        className={className}
        onMouseEnter={(e) => {
            if (onClick) {
                e.currentTarget.style.backgroundColor = '#252525';
                e.currentTarget.style.transform = 'translateY(-2px)';
            }
        }}
        onMouseLeave={(e) => {
            if (onClick) {
                e.currentTarget.style.backgroundColor = '#1E1E1E';
                e.currentTarget.style.transform = 'translateY(0)';
            }
        }}
    >
        {children}
    </div>
);

const ProgressBar = ({ value, color }: { value: number, color: string }) => (
    <div style={{ width: '100%', height: '8px', backgroundColor: '#333', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', backgroundColor: color, transition: 'width 0.5s ease' }}></div>
    </div>
);

const DetailModal = ({ doc, onClose }: { doc: Document, onClose: () => void }) => (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)'
    }}>
        <div style={{
            backgroundColor: '#1E1E1E',
            border: `1px solid ${doc.color}`,
            borderRadius: '12px',
            width: '600px',
            maxWidth: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden'
        }}>
            {/* Modal Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: `${doc.color}20` }}>
                        <doc.icon size={24} color={doc.color} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>{doc.title}</h2>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: doc.color, textTransform: 'uppercase', letterSpacing: '1px' }}>{doc.status}</span>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                    <X size={24} />
                </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '32px' }}>
                <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>QA/QC Impact Note</h4>
                    <p style={{ fontSize: '16px', color: 'white', lineHeight: '1.6' }}>{doc.impactNote}</p>
                </div>

                <div style={{ marginBottom: '32px', padding: '16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#fca5a5', textTransform: 'uppercase', marginBottom: '4px' }}>Consequences of Non-Compliance</h4>
                    <p style={{ fontSize: '14px', color: '#fca5a5' }}>{doc.consequences}</p>
                </div>

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase' }}>Site Implementation Progress</h4>
                        <span style={{ color: 'white', fontWeight: 'bold' }}>{doc.implementationProgress}%</span>
                    </div>
                    <ProgressBar value={doc.implementationProgress} color={doc.color} />
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>Percentage of departments currently utilizing this standard.</p>
                </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '24px', borderTop: '1px solid #333', display: 'flex', justifyContent: 'flex-end', gap: '12px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <button style={{ padding: '10px 20px', backgroundColor: '#333', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
                    Preview PDF
                </button>
                <button style={{ padding: '10px 20px', backgroundColor: doc.color, color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Download size={16} /> Download
                </button>
            </div>
        </div>
    </div>
);

const DocumentationStatus = () => {
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

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
                    DOCUMENTATION <span style={{ color: '#22c55e' }}>STATUS</span>
                </h1>
                <p style={{ color: '#64748b' }}>Strategic Document Control & Implementation Tracking</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px' }}>

                {/* Main Content: Document Library */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', alignContent: 'start' }}>
                    {strategicDocs.map((doc) => (
                        <DarkCard key={doc.id} onClick={() => setSelectedDoc(doc)} style={{ borderLeft: `4px solid ${doc.color}`, height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
                                <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: `${doc.color}15` }}>
                                    <doc.icon size={24} color={doc.color} />
                                </div>
                                <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: `${doc.color}15`, color: doc.color, fontSize: '11px', fontWeight: 'bold' }}>
                                    {doc.status}
                                </span>
                            </div>

                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '12px', lineHeight: '1.4' }}>{doc.title}</h3>
                            <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px', lineHeight: '1.5' }}>
                                {doc.impactNote}
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3b82f6', fontSize: '13px', fontWeight: '600' }}>
                                <Eye size={16} /> Quick View
                            </div>
                        </DarkCard>
                    ))}

                    {/* Placeholder for "Upcoming" */}
                    <DarkCard style={{ border: '1px dashed #333', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '200px' }}>
                        <FileText size={32} color="#333" style={{ marginBottom: '16px' }} />
                        <p style={{ color: '#64748b', textAlign: 'center' }}>More strategic documents<br />in drafted pipeline...</p>
                    </DarkCard>
                </div>

                {/* Sidebar: Strategy of Barrier */}
                <div>
                    <DarkCard style={{ background: 'linear-gradient(135deg, #1E1E1E 0%, #111 100%)', border: '1px solid #333' }}>
                        <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <div style={{ padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', marginBottom: '16px' }}>
                                <ShieldCheck size={40} color="#fff" />
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', textTransform: 'uppercase', letterSpacing: '1px' }}>Strategy of Barrier</h3>
                            <div style={{ width: '40px', height: '4px', backgroundColor: '#22c55e', margin: '16px auto', borderRadius: '2px' }}></div>
                        </div>

                        <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', textAlign: 'center', marginBottom: '24px' }}>
                            The combination of these 3 documents creates a <strong style={{ color: 'white' }}>"Zero Tolerance"</strong> ecosystem against incompetence and unsafe acts.
                        </p>

                        <div style={{ padding: '16px', backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                            <p style={{ fontSize: '12px', color: '#86efac', textAlign: 'center', fontWeight: '600' }}>
                                VME INTEGRATED BARRIER SYSTEM
                            </p>
                        </div>
                    </DarkCard>
                </div>

            </div>

            {/* Modal */}
            {selectedDoc && <DetailModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />}
        </div>
    );
};

export default DocumentationStatus;
