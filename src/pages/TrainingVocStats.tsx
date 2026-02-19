
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { CheckCircle, AlertOctagon, Target, RefreshCw, ChevronRight } from 'lucide-react';

// --- Data ---
const pipelineData = [
    { name: 'Competent (Ready for Practical)', value: 161, color: '#22c55e' },
    { name: 'Not Yet Competent (Re-eval)', value: 19, color: '#ef4444' },
];

const gapAnalysisData = [
    { name: 'ILUNGA M.', theory: 95, practice: 90 },
    { name: 'KABWE J.', theory: 88, practice: 85 },
    { name: 'BANZA WA ILUNGA', theory: 100, practice: 70 }, // Gap Highlight
    { name: 'TSHILOMBO A.', theory: 92, practice: 88 },
    { name: 'MUKALAY D.', theory: 85, practice: 60 }, // Another potential gap
];

const nycList = [
    { id: 'NYC-01', name: 'KASONGO E.', score: 65, module: 'Defensive Driving' },
    { id: 'NYC-02', name: 'MULUNDA P.', score: 58, module: 'Signage Recognition' },
    { id: 'NYC-03', name: 'TSHIBANGU G.', score: 68, module: 'Hazard Perception' },
];

const TARGET_TRAINING = 2200;
const CURRENT_COMPETENCIES = 0; // Starts at 0 as requested

// --- Components ---

const DarkCard = ({ children, className = '', style = {} }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
    <div style={{
        backgroundColor: '#1E1E1E',
        border: '1px solid #333',
        borderRadius: '8px',
        padding: '24px',
        ...style
    }} className={className}>
        {children}
    </div>
);

const ProgressBar = ({ value, total, color }: { value: number, total: number, color: string }) => {
    const percentage = (value / total) * 100;
    return (
        <div style={{ width: '100%', height: '8px', backgroundColor: '#333', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: color, transition: 'width 0.5s ease' }}></div>
        </div>
    );
};

const TrainingVocStats = () => {
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
                    TRAINING & VOC <span style={{ color: '#3b82f6' }}>STATS</span>
                </h1>
                <p style={{ color: '#64748b' }}>Pipeline Certification & Gap Analysis 2026</p>
            </div>

            {/* Top Row: Pipeline & Objectives */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '32px' }}>

                {/* VOC Theory Pipeline */}
                <DarkCard>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>VOC Theory Pipeline</h3>
                            <p style={{ fontSize: '14px', color: '#64748b' }}>February 2026 Intake</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '36px', fontWeight: '800', color: 'white', lineHeight: 1 }}>180</div>
                            <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>Evaluations</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <div style={{ width: '160px', height: '160px' }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={pipelineData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pipelineData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: 'white' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ color: '#22c55e', fontWeight: '600' }}>Competent (89%)</span>
                                    <span style={{ color: 'white' }}>161</span>
                                </div>
                                <p style={{ fontSize: '12px', color: '#64748b' }}>En attente de test pratique</p>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ color: '#ef4444', fontWeight: '600' }}>Not Yet Competent (11%)</span>
                                    <span style={{ color: 'white' }}>19</span>
                                </div>
                                <p style={{ fontSize: '12px', color: '#64748b' }}>Programmé pour réévaluation</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '24px', padding: '12px', backgroundColor: '#1e293b', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'start' }}>
                        <CheckCircle size={20} color="#3b82f6" style={{ flexShrink: 0 }} />
                        <p style={{ fontSize: '13px', color: '#94a3b8' }}>
                            <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>Insight QA/QC:</span> 89% des candidats sont prêts pour l'étape finale de validation terrain. Le pipeline est sain.
                        </p>
                    </div>
                </DarkCard>

                {/* 2026 Objective Tracking */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <DarkCard>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Target size={20} color="#f59e0b" />
                            Objectifs 2026
                        </h3>
                        <div style={{ marginBottom: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ color: '#94a3b8' }}>Training Volume Target</span>
                                <span style={{ color: 'white', fontWeight: 'bold' }}>0 / {TARGET_TRAINING}</span>
                            </div>
                            <ProgressBar value={CURRENT_COMPETENCIES} total={TARGET_TRAINING} color="#f59e0b" />
                            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>Validated Competencies tracking starts post-practical phase.</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#333', borderRadius: '8px' }}>
                            <div>
                                <div style={{ fontSize: '32px', fontWeight: '800', color: 'white' }}>{CURRENT_COMPETENCIES}</div>
                                <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>Compétences Validées</div>
                            </div>
                            <RefreshCw size={24} color="#64748b" />
                        </div>
                    </DarkCard>
                </div>
            </div>

            {/* Middle Row: Gap Analysis */}
            <DarkCard style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Theory vs Practice Analysis (Gap Analysis)</h3>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>Identifying Coaching Needs - Attendance List Data</p>
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
                            <span style={{ fontSize: '12px', color: '#94a3b8' }}>Theory</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '2px' }}></div>
                            <span style={{ fontSize: '12px', color: '#94a3b8' }}>Practice</span>
                        </div>
                    </div>
                </div>

                <div style={{ height: '350px', width: '100%' }}>
                    <ResponsiveContainer>
                        <BarChart data={gapAnalysisData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                            <XAxis type="number" domain={[0, 100]} stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                            <YAxis dataKey="name" type="category" stroke="#64748b" tick={{ fill: '#e2e8f0', fontSize: 13 }} width={120} axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: '#333', opacity: 0.4 }}
                                contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: 'white' }}
                            />
                            <Bar dataKey="theory" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12} />
                            <Bar dataKey="practice" fill="#10b981" radius={[0, 4, 4, 0]} barSize={12} />
                            {/* Alert Reference for BANZA WA ILUNGA */}
                            {/* Visual cue simulated via data rendering is generic, but tooltip helps. 
                                We can add a custom note below the chart.
                            */}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ padding: '16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', marginTop: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <AlertOctagon size={20} color="#ef4444" />
                    <p style={{ fontSize: '13px', color: '#fca5a5' }}>
                        <span style={{ fontWeight: 'bold' }}>Gap Alert:</span> BAMZA WA ILUNGA shows 100% Theory but only 70% Practice. Immediate coaching required before final validation.
                    </p>
                </div>
            </DarkCard>

            {/* Bottom: NYC Re-evaluation Module */}
            <DarkCard>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '24px' }}>
                    NYC Re-evaluation Queue (19 Candidates)
                </h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #333', color: '#64748b', textTransform: 'uppercase', fontSize: '12px' }}>
                                <th style={{ textAlign: 'left', padding: '16px' }}>Candidate ID</th>
                                <th style={{ textAlign: 'left', padding: '16px' }}>Name</th>
                                <th style={{ textAlign: 'center', padding: '16px' }}>Current Score</th>
                                <th style={{ textAlign: 'left', padding: '16px' }}>Failed Module</th>
                                <th style={{ textAlign: 'right', padding: '16px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nycList.map((candidate) => (
                                <tr key={candidate.id} style={{ borderBottom: '1px solid #333' }}>
                                    <td style={{ padding: '16px', color: '#94a3b8' }}>{candidate.id}</td>
                                    <td style={{ padding: '16px', fontWeight: '600' }}>{candidate.name}</td>
                                    <td style={{ padding: '16px', textAlign: 'center' }}>
                                        <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#333', color: '#ef4444', fontWeight: 'bold' }}>
                                            {candidate.score}%
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px' }}>{candidate.module}</td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>
                                        <button style={{
                                            padding: '8px 16px',
                                            backgroundColor: '#3b82f6',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}>
                                            Schedule Re-eval <ChevronRight size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DarkCard>

        </div>
    );
};

export default TrainingVocStats;
