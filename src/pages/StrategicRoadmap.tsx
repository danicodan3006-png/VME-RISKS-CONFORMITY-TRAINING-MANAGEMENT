import React, { useState } from 'react';
import {
    Shield, Clock, Target,
    Lightbulb, Users, ArrowRight
} from 'lucide-react';
import { createPortal } from 'react-dom';
import {
    STRATEGIC_ACTIONS,
    MINDSET_FLOW
} from '../data/roadmapData';

// --- Sub-Component: Strategic Tooltip ---
const ActionTooltip = ({ content, visible, x, y }: { content: string, visible: boolean, x: number, y: number }) => {
    if (!visible) return null;
    return createPortal(
        <div style={{
            position: 'fixed',
            top: y,
            left: x,
            transform: 'translate(-50%, -100%) translateY(-15px)',
            width: '320px',
            background: 'rgba(10, 10, 15, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            borderRadius: '12px',
            padding: '20px',
            zIndex: 1000,
            boxShadow: '0 25px 50px rgba(0,0,0,0.8), 0 0 30px rgba(6, 182, 212, 0.15)',
            pointerEvents: 'none',
            animation: 'tooltipFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'center' }}>
                <div style={{ padding: '6px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '8px' }}>
                    <Lightbulb size={18} color="#06b6d4" />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '900', color: '#06b6d4', letterSpacing: '2px', textTransform: 'uppercase' }}>Strategic Insight</span>
            </div>
            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>{content}</p>
            <div style={{
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: '10px solid rgba(6, 182, 212, 0.4)'
            }} />
        </div>,
        document.body
    );
};

// --- Sub-Component: Action Grid ---
const ActionGrid = () => {
    const [hoveredAction, setHoveredAction] = useState<any>(null);

    return (
        <div style={{ padding: '30px', height: '100%', overflowY: 'auto' }}>
            <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 40px 80px rgba(0,0,0,0.4)'
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            {['ID', 'PRIORITY', 'STRATEGIC ACTION', 'OWNER', 'STATUS'].map(h => (
                                <th key={h} style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', color: '#64748b', letterSpacing: '2px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {STRATEGIC_ACTIONS.map((item: any) => (
                            <tr
                                key={item.id}
                                onMouseEnter={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setHoveredAction({ ...item, x: rect.left + rect.width / 2, y: rect.top });
                                }}
                                onMouseLeave={() => setHoveredAction(null)}
                                style={{
                                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'help',
                                    position: 'relative'
                                }}
                                className="action-row"
                            >
                                <td style={{ padding: '24px', fontSize: '13px', fontWeight: '900', color: '#06b6d4' }}>{item.id}</td>
                                <td style={{ padding: '24px' }}>
                                    <span style={{
                                        fontSize: '10px',
                                        fontWeight: '950',
                                        padding: '4px 12px',
                                        borderRadius: '6px',
                                        background: item.priority === 'ULTRA' ? 'rgba(239,68,68,0.15)' : 'rgba(249,115,22,0.15)',
                                        color: item.priority === 'ULTRA' ? '#ef4444' : '#f97316',
                                        border: `1px solid ${item.priority === 'ULTRA' ? '#ef4444' : '#f97316'}60`,
                                        letterSpacing: '1px'
                                    }}>{item.priority}</span>
                                </td>
                                <td style={{ padding: '24px' }}>
                                    <div style={{ fontSize: '15px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>{item.action}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Clock size={12} color="#475569" />
                                        <span style={{ fontSize: '11px', color: '#475569', fontWeight: '600' }}>{item.timeline}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '24px', fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>{item.owner}</td>
                                <td style={{ padding: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: item.status === 'COMPLETED' ? '#22c55e' : item.status === 'ONGOING' ? '#f97316' : '#64748b',
                                            boxShadow: item.status === 'ONGOING' ? '0 0 12px #f97316' : 'none',
                                            animation: item.status === 'ONGOING' ? 'pulse 2s infinite' : 'none'
                                        }} />
                                        <span style={{ fontSize: '12px', fontWeight: '800', color: 'white', letterSpacing: '0.5px' }}>{item.status}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {hoveredAction && (
                <ActionTooltip
                    content={hoveredAction.tooltip}
                    visible={true}
                    x={hoveredAction.x}
                    y={hoveredAction.y}
                />
            )}
        </div>
    );
};

// --- Sub-Component: Mindset View ---
const MindsetView = () => (
    <div style={{ padding: '60px 40px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                padding: '8px 24px', borderRadius: '40px',
                background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)',
                marginBottom: '20px'
            }}>
                <Target size={18} color="#f97316" />
                <span style={{ color: '#f97316', fontSize: '11px', fontWeight: '900', letterSpacing: '3px', textTransform: 'uppercase' }}>Operational Vision</span>
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: '900', color: 'white', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '20px' }}>
                Competency <span style={{ color: '#f97316' }}>Transformation</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                Systematic filtering protocol designed to elevate operational standards by focusing on <span style={{ color: 'white', fontWeight: '700' }}>high-quality candidates</span> through rigorous gatekeeping processes.
            </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', width: '100%', maxWidth: '1100px', position: 'relative' }}>
            {MINDSET_FLOW.map((step: any, i: number) => (
                <React.Fragment key={i}>
                    <div style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '28px',
                        padding: '40px 30px',
                        textAlign: 'center',
                        position: 'relative',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        zIndex: 2
                    }} className="flow-card">
                        <div style={{
                            width: '64px', height: '64px', borderRadius: '20px',
                            background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 24px',
                            boxShadow: '0 10px 30px rgba(6,182,212,0.1)'
                        }}>
                            <step.icon size={32} color="#06b6d4" />
                        </div>
                        <div style={{ fontSize: '11px', color: '#06b6d4', fontWeight: '900', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>{step.stage}</div>
                        <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'white', marginBottom: '8px' }}>{step.title}</h3>
                        <div style={{
                            padding: '4px 12px', borderRadius: '6px',
                            background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)',
                            display: 'inline-block', marginBottom: '20px'
                        }}>
                            <span style={{ fontSize: '12px', color: '#f97316', fontWeight: '800' }}>{step.action}</span>
                        </div>
                        <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.7 }}>{step.desc}</p>
                    </div>
                    {i < MINDSET_FLOW.length - 1 && (
                        <div style={{ color: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', zIndex: 1 }}>
                            <ArrowRight size={32} />
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    </div>
);

const StrategicRoadmap = () => {
    const [activeTab, setActiveTab] = useState<'ROADMAP' | 'MINDSET'>('ROADMAP');

    return (
        <div style={{
            backgroundColor: '#0a0a0f',
            height: '100vh',
            overflow: 'hidden',
            color: 'white',
            fontFamily: '"Inter", sans-serif',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Background Grid */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(circle at 2px 2px, #1a1a1a 1px, transparent 0)',
                backgroundSize: '48px 48px', opacity: 0.4, zIndex: 0, pointerEvents: 'none'
            }} />

            <style>{`
                @keyframes tooltipFadeIn {
                    0% { opacity: 0; transform: translate(-50%, -100%) translateY(10px); }
                    100% { opacity: 1; transform: translate(-50%, -100%) translateY(-15px); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.3); }
                }
                .action-row:hover {
                    background: rgba(6, 182, 212, 0.05) !important;
                }
                .action-row:hover td {
                    color: white !important;
                }
                .tab-btn {
                    padding: 12px 32px;
                    background: transparent;
                    border: none;
                    color: #64748b;
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 3px;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    position: relative;
                    text-transform: uppercase;
                }
                .tab-btn.active {
                    color: #06b6d4;
                }
                .tab-btn.active::after {
                    content: '';
                    position: absolute;
                    bottom: -1px;
                    left: 20%;
                    right: 20%;
                    height: 3px;
                    background: #06b6d4;
                    box-shadow: 0 0 15px #06b6d4, 0 0 30px rgba(6, 182, 212, 0.4);
                    border-radius: 4px;
                }
                .flow-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    border-color: rgba(6, 182, 212, 0.3) !important;
                    background: rgba(255,255,255,0.04) !important;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.6);
                }
            `}</style>

            {/* ══════ PREMIUM HEADER BAR ══════ */}
            <div style={{
                padding: '20px 32px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(10, 10, 15, 0.9)',
                backdropFilter: 'blur(20px)',
                position: 'relative', zIndex: 2, flexShrink: 0,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '12px',
                            background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
                            fontWeight: '900', color: 'black', fontSize: '14px'
                        }}>VME</div>
                        <h1 style={{ fontSize: '18px', fontWeight: '900', color: 'white', letterSpacing: '3px', margin: 0, textTransform: 'uppercase' }}>
                            STRATEGIC <span style={{ color: '#06b6d4' }}>ACTION PLAN</span>
                        </h1>
                    </div>

                    <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.1)' }} />

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => setActiveTab('ROADMAP')}
                            className={`tab-btn ${activeTab === 'ROADMAP' ? 'active' : ''}`}
                        >
                            Actionable Roadmap
                        </button>
                        <button
                            onClick={() => setActiveTab('MINDSET')}
                            className={`tab-btn ${activeTab === 'MINDSET' ? 'active' : ''}`}
                        >
                            Impacting Mindset
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Strategic Lead</div>
                        <div style={{ fontSize: '14px', color: 'white', fontWeight: '900', letterSpacing: '0.5px' }}>Dan Kahilu</div>
                    </div>
                    <div style={{
                        padding: '8px 16px', borderRadius: '12px',
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex', alignItems: 'center', gap: '10px'
                    }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
                        <span style={{ fontSize: '11px', fontWeight: '800', color: 'white', letterSpacing: '1px' }}>2026 READY</span>
                    </div>
                </div>
            </div>

            {/* ══════ MAIN CONTENT AREA ══════ */}
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                {activeTab === 'ROADMAP' ? <ActionGrid /> : <MindsetView />}
            </div>

            {/* ══════ ARCHITECTURAL FOOTER ══════ */}
            <div style={{
                padding: '12px 32px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'rgba(10, 10, 15, 0.95)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                fontSize: '10px', color: '#475569', fontWeight: '700', letterSpacing: '1px',
                zIndex: 2
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Shield size={14} color="#06b6d4" />
                        <span>CONFIDENTIAL ARCHITECTURE</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Users size={14} color="#f97316" />
                        <span>WORKFORCE TRANSFORMATION PROTOCOL</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span>VME-2026-SAP-VB1</span>
                    <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.1)' }} />
                    <span style={{ color: '#06b6d4', fontWeight: '900' }}>MMG KINSEVERE</span>
                </div>
            </div>
        </div>
    );
};

export default StrategicRoadmap;
