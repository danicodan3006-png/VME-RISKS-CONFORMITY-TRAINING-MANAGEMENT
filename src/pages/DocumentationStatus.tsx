
import React, { useState } from 'react';
import { FileText, Download, Eye, X, ShieldCheck, Lock, Activity, User, Star, QrCode, Search, Filter } from 'lucide-react';

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

// Animation Styles
const animationStyles = `
  @keyframes float {
    0% { transform: translateY(0px); box-shadow: 0 0 15px rgba(6, 182, 212, 0.2); }
    50% { transform: translateY(-10px); box-shadow: 0 20px 30px rgba(6, 182, 212, 0.4); }
    100% { transform: translateY(0px); box-shadow: 0 0 15px rgba(6, 182, 212, 0.2); }
  }
`;

const VmeCompetencyCard = () => (
    <div style={{
        width: '100%',
        maxWidth: '450px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)',
        position: 'relative',
        fontFamily: 'Arial, sans-serif',
        animation: 'float 6s ease-in-out infinite'
    }}>
        {/* Background Texture */}
        <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#1a1d21',
            backgroundImage: `
                radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 20%),
                radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 20%),
                linear-gradient(135deg, #1e242b 0%, #111 100%)
            `,
            zIndex: -1
        }}></div>

        {/* Glow Effect Overlay */}
        <div style={{
            position: 'absolute',
            inset: 0,
            boxShadow: 'inset 0 0 20px rgba(6, 182, 212, 0.2)',
            pointerEvents: 'none',
            borderRadius: '16px',
            zIndex: 10
        }}></div>

        {/* --- Header --- */}
        <div style={{ padding: '16px 20px 8px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
                {/* VME Logo Placeholder */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        fontSize: '24px',
                        fontWeight: '900',
                        lineHeight: '1',
                        fontStyle: 'italic'
                    }}>
                        <span style={{ color: '#0ea5e9' }}>V</span>
                        <span style={{ color: '#f97316' }}>E</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }}>
                        <Star size={8} fill="#f97316" color="#f97316" />
                        <Star size={8} fill="#f97316" color="#f97316" />
                        <Star size={8} fill="#f97316" color="#f97316" />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: 'white', textTransform: 'uppercase', letterSpacing: '0.5px' }}>KINSEVIRE VME COMPETENCY CARD</h2>
                    <span style={{ fontSize: '10px', color: '#cbd5e1', fontWeight: '600', letterSpacing: '0.5px' }}>OPERATOR LICENSE & SKILL MATRIX</span>
                </div>
            </div>

            {/* MMG Logo */}
            <div style={{ backgroundColor: '#dc2626', padding: '4px 8px', borderRadius: '2px' }}>
                <span style={{ color: 'white', fontWeight: '900', fontSize: '14px', letterSpacing: '1px' }}>MMG</span>
            </div>
        </div>

        {/* --- Main Content (Photo + Info + QR) --- */}
        <div style={{ padding: '8px 20px 16px 20px', display: 'flex', gap: '16px', alignItems: 'center', position: 'relative' }}>

            {/* Tech Decoration Lines */}
            <div style={{ position: 'absolute', bottom: '10px', left: '0', right: '0', height: '2px', background: 'linear-gradient(90deg, transparent 0%, #0ea5e9 20%, #f97316 80%, transparent 100%)', zIndex: 0 }}></div>

            {/* Photo */}
            <div style={{
                width: '90px',
                height: '110px',
                backgroundColor: '#e2e8f0',
                borderRadius: '4px',
                border: '2px solid white',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                zIndex: 1,
                position: 'relative'
            }}>
                <User size={60} color="#334155" />
                {/* Helmet hint */}
                <div style={{ position: 'absolute', top: 0, width: '100%', height: '30%', backgroundColor: 'white', borderBottom: '2px solid #cbd5e1' }}></div>
            </div>

            {/* Text Info */}
            <div style={{ flex: 1, zIndex: 1, paddingTop: '10px' }}>
                <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: 'white', letterSpacing: '0.5px' }}>LOUIS LUMBALA</h1>
                <div style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: '500', marginTop: '2px' }}>ID: 096</div>
                <div style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: '500' }}>ITM</div>
            </div>

            {/* QR Code */}
            <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'white',
                borderRadius: '4px',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1
            }}>
                <QrCode size={70} color="black" />
            </div>
        </div>

        {/* --- Skills Matrix Table --- */}
        <div style={{ backgroundColor: '#e2e8f0', padding: '0px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', fontFamily: 'monospace' }}>
                <thead>
                    <tr style={{ backgroundColor: '#1e293b', color: 'white' }}>
                        <th style={{ textAlign: 'left', padding: '4px 8px', textTransform: 'uppercase' }}>SKILLS MATRIX</th>
                        <th style={{ textAlign: 'right', padding: '4px 8px', textTransform: 'uppercase' }}>ATTAINED ON</th>
                        <th style={{ textAlign: 'right', padding: '4px 8px', textTransform: 'uppercase' }}>EXPIRES ON</th>
                    </tr>
                </thead>
                <tbody>
                    {/* COMPETENCY Header Row - Mimicking the image structure */}
                    <tr style={{ backgroundColor: '#334155', color: 'white', borderBottom: '1px solid #475569' }}>
                        <td style={{ padding: '4px 8px', fontWeight: 'bold' }}>COMPETENCY</td>
                        <td style={{ padding: '4px 8px', textAlign: 'right' }}>122 DR(7 251</td>
                        <td style={{ padding: '4px 8px', textAlign: 'right', backgroundColor: '#f97316', color: 'black', fontWeight: 'bold' }}>2.15 12.011</td>
                    </tr>

                    {/* Rows */}
                    {[
                        { name: 'SITE DRIVER LV (MT)', att: '200.1258.228', exp: '2.05 12.068', highlight: false },
                        { name: 'TIPPER TRUCK HOWO 35T', att: '200.12 61.211', exp: '2.05 12.057', highlight: false },
                        { name: 'TRUCK DOZER CAT D8', att: '200.1258.228', exp: '2.05 12.088', highlight: false },
                        { name: 'TRACTOR LOADER BACKHOE', att: '200.1238.025', exp: '2.05 72.058', highlight: true },
                    ].map((row, i) => (
                        <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#f1f5f9', color: 'black', borderBottom: '1px solid #cbd5e1' }}>
                            <td style={{ padding: '4px 8px', fontWeight: 'bold' }}>{row.name}</td>
                            <td style={{ padding: '4px 8px', textAlign: 'right', color: '#334155' }}>{row.att}</td>
                            <td style={{
                                padding: '4px 8px',
                                textAlign: 'right',
                                backgroundColor: row.highlight ? '#f97316' : 'transparent',
                                color: row.highlight ? 'white' : '#334155',
                                fontWeight: row.highlight ? 'bold' : 'normal'
                            }}>{row.exp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Footer */}
        <div style={{ backgroundColor: '#1e293b', padding: '4px 8px', textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '9px', color: '#94a3b8' }}>HSSEC Department - Valid for 24 months - Biometric Secure</p>
        </div>
    </div>
);

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
            <style>{animationStyles}</style>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'white', letterSpacing: '-1px', marginBottom: '8px' }}>
                    DOCUMENTATION <span style={{ color: '#22c55e' }}>STATUS</span>
                </h1>
                <p style={{ color: '#64748b' }}>Strategic Document Control & Implementation Tracking</p>
            </div>

            {/* Search & Filter */}
            <div style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        placeholder="Search documents..."
                        style={{
                            width: '100%',
                            backgroundColor: '#1E1E1E',
                            border: '1px solid #333',
                            borderRadius: '8px',
                            padding: '12px 12px 12px 40px',
                            color: 'white',
                            outline: 'none'
                        }}
                    />
                </div>
                <button style={{ padding: '12px', backgroundColor: '#1E1E1E', border: '1px solid #333', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer' }}>
                    <Filter size={18} />
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', alignItems: 'start' }}>

                {/* Left Column: Documentation List */}
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

                {/* Right Column: Digital Twin & Strategic Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    {/* Competency Card Spotlight */}
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                            <h3 style={{ color: '#06b6d4', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px', marginBottom: '8px' }}>DIGITAL TWIN VERIFICATION</h3>
                            <p style={{ color: '#94a3b8', fontSize: '12px' }}>2026 Biometric Digital License<br />Real-time Verification Readiness</p>
                        </div>
                        <VmeCompetencyCard />
                    </div>

                    {/* Sidebar: Strategy of Barrier */}
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
