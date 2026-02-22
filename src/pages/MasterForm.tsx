
import { useState } from 'react';
import { Save, AlertCircle, Database, Truck } from 'lucide-react';
import { useSafeEquip } from '../context/SafeEquipContext';

const DEPARTMENTS = [
    'Mining', 'Transport', 'SSHEC', 'Exploration', 'Supply Chain',
    'Finance', 'Hydromet', 'Tailings', 'Sulphite', 'HR & Medical',
    'Compliance', 'Stakeholder', 'People Svcs', 'Project Del',
    'Civil Svcs', 'Lean Prod', 'Farm & Camp', 'Debottlenecking', 'Central Lab'
];

const COMPANIES = [
    'MMG Kinsevere', 'Mexco Mining', 'Masterlift', 'TKM', 'Solvay', 'ITM', 'Neema', 'MALA BNK'
];

const MasterForm = () => {
    const { updateDataset } = useSafeEquip();
    const [selectedDept, setSelectedDept] = useState(DEPARTMENTS[0]);
    const [selectedCo, setSelectedCo] = useState(COMPANIES[0]);

    // Form States
    const [incidents, setIncidents] = useState(0);
    const [theory, setTheory] = useState(0);
    const [practice, setPractice] = useState(0);
    const [vTotal, setVTotal] = useState(0);
    const [vCompliant, setVCompliant] = useState(0);
    const [redList, setRedList] = useState(false);

    const [status, setStatus] = useState<'idle' | 'saving' | 'success'>('idle');

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('saving');

        const newEntry = {
            id: `MASTER-${Date.now()}`,
            timestamp: new Date().toISOString(),
            department: selectedDept,
            incidents: Number(incidents),
            training_theory: Number(theory),
            training_practice: Number(practice),
            company_name: selectedCo,
            vehicles_total: Number(vTotal),
            vehicles_compliant: Number(vCompliant),
            red_list_status: redList,
            risk_level: incidents >= 2 ? 2 : (incidents === 1 ? 1 : 0)
        };

        setTimeout(() => {
            updateDataset(newEntry);
            setStatus('success');
            setTimeout(() => setStatus('idle'), 2000);
        }, 800);
    };

    return (
        <div style={{
            backgroundColor: '#121212',
            height: '100%',
            color: 'white',
            padding: '24px',
            fontFamily: '"Inter", sans-serif',
            overflowY: 'auto'
        }}>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#3b82f6', letterSpacing: '1px' }}>
                    DATA CONTROL CENTER
                </h1>
                <p style={{ color: '#64748b', fontSize: '14px' }}>Real-time Ecosystem Synchronization Engine</p>
            </div>

            <form onSubmit={handleUpdate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

                {/* Departmental Metrics */}
                <div style={{ backgroundColor: '#1E1E1E', border: '1px solid #333', borderRadius: '12px', padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <Database size={20} color="#3b82f6" />
                        <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>Departmental Operations</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>TARGET DEPARTMENT</label>
                            <select
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                                style={{ width: '100%', backgroundColor: '#121212', border: '1px solid #333', color: 'white', padding: '10px', borderRadius: '6px', outline: 'none' }}
                            >
                                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', color: '#fca5a5', marginBottom: '6px', fontWeight: 'bold' }}>INCIDENTS (YTD)</label>
                                <input
                                    type="number"
                                    value={incidents}
                                    onChange={(e) => setIncidents(Number(e.target.value))}
                                    style={{ width: '100%', backgroundColor: '#121212', border: '1px solid #333', color: 'white', padding: '10px', borderRadius: '6px', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: redList ? '#ef4444' : '#64748b', fontSize: '12px', fontWeight: 'bold' }}>
                                    <input type="checkbox" checked={redList} onChange={(e) => setRedList(e.target.checked)} />
                                    RED LIST STATUS
                                </label>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>THEORY SUCCESS</label>
                                <input
                                    type="number"
                                    value={theory}
                                    onChange={(e) => setTheory(Number(e.target.value))}
                                    style={{ width: '100%', backgroundColor: '#121212', border: '1px solid #333', color: 'white', padding: '10px', borderRadius: '6px', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>PRACTICE SUCCESS</label>
                                <input
                                    type="number"
                                    value={practice}
                                    onChange={(e) => setPractice(Number(e.target.value))}
                                    style={{ width: '100%', backgroundColor: '#121212', border: '1px solid #333', color: 'white', padding: '10px', borderRadius: '6px', outline: 'none' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fleet & Contractor Metrics */}
                <div style={{ backgroundColor: '#1E1E1E', border: '1px solid #333', borderRadius: '12px', padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <Truck size={20} color="#22c55e" />
                        <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>Fleet & Contractor Compliance</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>CONTRACTOR NAME</label>
                            <select
                                value={selectedCo}
                                onChange={(e) => setSelectedCo(e.target.value)}
                                style={{ width: '100%', backgroundColor: '#121212', border: '1px solid #333', color: 'white', padding: '10px', borderRadius: '6px', outline: 'none' }}
                            >
                                {COMPANIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>TOTAL VEHICLES</label>
                                <input
                                    type="number"
                                    value={vTotal}
                                    onChange={(e) => setVTotal(Number(e.target.value))}
                                    style={{ width: '100%', backgroundColor: '#121212', border: '1px solid #333', color: 'white', padding: '10px', borderRadius: '6px', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', color: '#22c55e', marginBottom: '6px', fontWeight: 'bold' }}>COMPLIANT UNITS</label>
                                <input
                                    type="number"
                                    value={vCompliant}
                                    onChange={(e) => setVCompliant(Number(e.target.value))}
                                    style={{ width: '100%', backgroundColor: '#121212', border: '1px solid #333', color: 'white', padding: '10px', borderRadius: '6px', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px', border: '1px dashed #333' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <AlertCircle size={16} color="#3b82f6" />
                                <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.5 }}>
                                    Submitting this form will overwrite existing records for the selected entity to maintain dataset integrity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Action */}
                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
                    <button
                        type="submit"
                        disabled={status !== 'idle'}
                        style={{
                            backgroundColor: status === 'success' ? '#22c55e' : '#3b82f6',
                            color: 'white',
                            border: 'none',
                            padding: '16px 48px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '900',
                            letterSpacing: '2px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'all 0.3s'
                        }}
                    >
                        {status === 'saving' ? (
                            <div style={{ width: '20px', height: '20px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                        ) : (
                            <Save size={20} />
                        )}
                        {status === 'success' ? 'SYSTEM UPDATED' : 'PUSH TO ECOSYSTEM'}
                    </button>
                </div>
            </form>

            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default MasterForm;
