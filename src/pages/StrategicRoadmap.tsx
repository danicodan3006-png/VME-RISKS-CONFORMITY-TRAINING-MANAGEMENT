
import React, { useState } from 'react';
import {
    Rocket,
    CheckCircle,
    Clock,
    Calendar,
    Shield,
    Loader,
    FileSpreadsheet,
    Database,
    Eye,
    MessageSquare,
    Zap,
    Target,
    UserCheck,
    Award,
    Gavel,
    Briefcase,
    X,
    Lightbulb
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';

// --- Data ---
const timelineData = [
    {
        quarter: 'Q1',
        title: 'Standardization',
        status: 'COMPLETED',
        desc: 'Deployment of VOC Request V1.0 & Safety Inspection Forms.',
        color: '#22c55e',
        icon: CheckCircle
    },
    {
        quarter: 'Q2',
        title: 'Digitalization (Current)',
        status: 'IN PROGRESS',
        desc: 'Transition from Excel to Dynamic Reporting (Power BI Logic).',
        color: '#f97316',
        icon: Loader
    },
    {
        quarter: 'Q3',
        title: 'Automation',
        status: 'PLANNED',
        desc: 'Automated compliance notifications for Department Owners.',
        color: '#f59e0b',
        icon: Clock
    },
    {
        quarter: 'Q4',
        title: 'Cultural Shift',
        status: 'TARGET',
        desc: 'Full L1-L5 Hierarchy Implementation & Strategic Health Reporting.',
        color: '#a855f7',
        icon: Rocket
    }
];

const healthData = [
    { month: 'Jan', accidents: 58, target: 56 },
    { month: 'Feb', accidents: 55, target: 55 },
    { month: 'Mar', accidents: 53, target: 54 },
    { month: 'Apr', accidents: 52, target: 53 },
    { month: 'May', accidents: 51, target: 52 },
    { month: 'Jun', accidents: 50, target: 51 },
    { month: 'Jul', accidents: 49, target: 50 },
    { month: 'Aug', accidents: 49, target: 50 },
    { month: 'Sep', accidents: 48, target: 49 },
    { month: 'Oct', accidents: 48, target: 48 },
    { month: 'Nov', accidents: 48, target: 48 },
    { month: 'Dec', accidents: 48, target: 48 },
];

const commandments = [
    {
        icon: Gavel, title: "Discipline", desc: "Indirect pressure via strict sanction protocols.", color: "#3b82f6",
        actions: ['Enforce zero-tolerance violation framework', 'Automate sanction escalation tiers', 'Publish monthly discipline scorecards'], impact: 85
    },
    {
        icon: Award, title: "Excellence", desc: "High motivation through L1 to L5 rank progression.", color: "#ffd700",
        actions: ['Deploy gamified L1-L5 badge system', 'Link competency rank to incentive pool', 'Run quarterly excellence ceremonies'], impact: 92
    },
    {
        icon: UserCheck, title: "Selection", desc: "VOC rigorous filtering - Only the best behind the wheel.", color: "#3b82f6",
        actions: ['Implement 3-stage VOC evaluation gate', 'Reject sub-threshold candidates at source', 'Track selection-to-incident correlation'], impact: 78
    },
    {
        icon: Target, title: "Focus", desc: "Reducing non-essential interactions for maximum concentration.", color: "#ffd700",
        actions: ['Ban phone usage in operational zones', 'Redesign cockpit distraction protocols', 'Audit focus-loss incident reports weekly'], impact: 70
    },
    {
        icon: Shield, title: "HSE Proximity", desc: "On-field awareness - Bringing safety closer to operators.", color: "#3b82f6",
        actions: ['Embed HSE officers per shift rotation', 'Deploy wearable proximity alerts', 'Run daily safety micro-briefings on-site'], impact: 88
    },
    {
        icon: Zap, title: "Coaching", desc: "Continuous monitoring and performance-oriented guidance.", color: "#ffd700",
        actions: ['Assign dedicated performance coaches', 'Implement real-time telemetry feedback', 'Track coaching hours per operator monthly'], impact: 82
    },
    {
        icon: Briefcase, title: "Rigor", desc: "100% equipment compliance and pre-op inspections.", color: "#3b82f6",
        actions: ['Mandate digital pre-op checklists', 'Flag non-compliant equipment in real-time', 'Achieve 100% inspection rate by Q3'], impact: 90
    },
    {
        icon: Database, title: "Digitalization", desc: "Automated alerts and data-driven decision making.", color: "#ffd700",
        actions: ['Replace Excel workflows with VME platform', 'Enable automated compliance notifications', 'Build predictive analytics dashboards'], impact: 95
    },
    {
        icon: MessageSquare, title: "Communication", desc: "Two-way feedback loops during awareness sessions.", color: "#3b82f6",
        actions: ['Conduct bi-weekly safety town halls', 'Deploy anonymous incident reporting app', 'Measure communication effectiveness via NPS'], impact: 68
    },
    {
        icon: Eye, title: "Vigilance", desc: "'We are watching' - Building a culture of accountability.", color: "#ef4444",
        actions: ['Install smart monitoring in high-risk zones', 'Publish real-time compliance dashboards', 'Reward proactive hazard reporting'], impact: 87
    },
];

// --- Components ---

const DarkCard = ({ children, className = '', style = {} }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
    <div style={{
        background: 'linear-gradient(145deg, rgba(30,30,30,0.7), rgba(18,18,18,0.85))',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        ...style
    }} className={className}>
        {children}
    </div>
);

const TimelineItem = ({ data, index }: { data: any, index: number }) => {
    const isCurrent = data.status === 'IN PROGRESS';
    return (
        <div style={{ display: 'flex', gap: '24px', position: 'relative' }}>
            {/* Glowing Gradient Connector Line */}
            {index < timelineData.length - 1 && (
                <div style={{
                    position: 'absolute',
                    left: '24px',
                    top: '48px',
                    bottom: '-24px',
                    width: '2px',
                    background: `linear-gradient(180deg, ${data.color}, ${timelineData[Math.min(index + 1, timelineData.length - 1)].color})`,
                    boxShadow: `0 0 8px ${data.color}50`,
                    zIndex: 0
                }} />
            )}

            {/* Pulsing Data-Point Icon */}
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: `${data.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `2px solid ${data.color}`,
                zIndex: 1,
                flexShrink: 0,
                boxShadow: `0 0 12px ${data.color}40, 0 0 24px ${data.color}15`,
                animation: 'milestonePulse 2.5s ease-in-out infinite',
                position: 'relative'
            }}>
                <data.icon size={24} color={data.color} />
            </div>

            {/* Content — Glassmorphism card */}
            <div style={{
                flex: 1, paddingBottom: '32px'
            }}>
                <div style={{
                    background: isCurrent
                        ? 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(249,115,22,0.02))'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${isCurrent ? 'rgba(249,115,22,0.25)' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: '12px',
                    padding: '16px 18px',
                    boxShadow: isCurrent ? '0 0 20px rgba(249,115,22,0.08)' : 'none'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h3 style={{
                            fontSize: '18px', fontWeight: '900', color: 'white',
                            textTransform: 'uppercase', letterSpacing: '1px',
                            textShadow: '0 1px 4px rgba(0,0,0,0.6)'
                        }}>{data.quarter} — {data.title}</h3>
                        <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            backgroundColor: `${data.color}20`,
                            color: data.color,
                            fontSize: '11px',
                            fontWeight: '900',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            border: isCurrent ? `1px solid ${data.color}40` : 'none',
                            boxShadow: isCurrent ? `0 0 10px ${data.color}30` : 'none'
                        }}>
                            {data.status}
                        </span>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{data.desc}</p>
                </div>
            </div>
        </div>
    );
};

// --- Cinematic Data ---
const mindsetPillars = [
    {
        icon: Zap,
        title: 'Behavioral Change',
        desc: 'Embedding proactive safety habits through continuous coaching and consequence-driven accountability loops.',
        accent: 'Commitment',
        neonColor: '#06b6d4', // cyan
        gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0.02) 100%)'
    },
    {
        icon: Eye,
        title: 'Strategic Awareness',
        desc: 'Shifting from reactive patching to predictive, intelligence-led safety operations across all departments.',
        accent: 'Transformation',
        neonColor: '#f97316', // orange
        gradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(249, 115, 22, 0.02) 100%)'
    },
    {
        icon: Award,
        title: 'Leadership',
        desc: 'Cultivating L1-L5 rank-based competency where excellence is rewarded and mediocrity is systematically eliminated.',
        accent: 'Excellence',
        neonColor: '#a855f7', // purple
        gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(168, 85, 247, 0.02) 100%)'
    },
];

const curvePoints = [
    { year: '2022', value: 15, label: 'Reactive' },
    { year: '2023', value: 30, label: 'Compliant' },
    { year: '2024', value: 50, label: 'Structured' },
    { year: '2025', value: 72, label: 'Proactive' },
    { year: '2026', value: 95, label: 'Generative' },
];

// --- 3D Icon Component ---
const Icon3D = ({ icon: IconComponent, color, size = 40 }: { icon: any, color: string, size?: number }) => (
    <div style={{
        width: `${size + 16}px`,
        height: `${size + 16}px`,
        borderRadius: '16px',
        background: `linear-gradient(145deg, ${color}22, ${color}08)`,
        border: `1px solid ${color}40`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 8px 32px ${color}20, inset 0 1px 0 ${color}30`,
        position: 'relative',
        flexShrink: 0
    }}>
        <div style={{
            position: 'absolute',
            inset: '2px',
            borderRadius: '14px',
            background: `radial-gradient(ellipse at 30% 20%, ${color}15 0%, transparent 60%)`,
            pointerEvents: 'none'
        }} />
        <IconComponent size={size * 0.55} color={color} strokeWidth={2.2} />
    </div>
);

// --- Culture Maturity Curve SVG ---
const CultureMaturityCurve = () => {
    const width = 380;
    const height = 180;
    const padX = 40;
    const padY = 20;
    const chartW = width - padX * 2;
    const chartH = height - padY * 2;

    const points = curvePoints.map((p, i) => ({
        x: padX + (i / (curvePoints.length - 1)) * chartW,
        y: padY + chartH - (p.value / 100) * chartH,
        ...p
    }));

    // Smooth curve path
    const pathD = points.reduce((acc, pt, i) => {
        if (i === 0) return `M ${pt.x} ${pt.y}`;
        const prev = points[i - 1];
        const cpx1 = prev.x + (pt.x - prev.x) * 0.5;
        const cpx2 = pt.x - (pt.x - prev.x) * 0.5;
        return `${acc} C ${cpx1} ${prev.y}, ${cpx2} ${pt.y}, ${pt.x} ${pt.y}`;
    }, '');

    const areaD = `${pathD} L ${points[points.length - 1].x} ${padY + chartH} L ${points[0].x} ${padY + chartH} Z`;

    return (
        <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
            <defs>
                <linearGradient id="curveGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="curveAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
                <filter id="glowLine">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <filter id="glowDot">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map(v => {
                const y = padY + chartH - (v / 100) * chartH;
                return <line key={v} x1={padX} y1={y} x2={padX + chartW} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />;
            })}

            {/* Area fill */}
            <path d={areaD} fill="url(#curveAreaGrad)" />

            {/* Curve line with glow */}
            <path d={pathD} fill="none" stroke="url(#curveGrad)" strokeWidth="3" strokeLinecap="round" filter="url(#glowLine)" />

            {/* Data points */}
            {points.map((pt, i) => (
                <g key={i}>
                    {/* Glow ring for 2026 */}
                    {i === points.length - 1 && (
                        <>
                            <circle cx={pt.x} cy={pt.y} r="14" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.3">
                                <animate attributeName="r" values="14;20;14" dur="2.5s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.3;0.08;0.3" dur="2.5s" repeatCount="indefinite" />
                            </circle>
                            {/* Target crosshair */}
                            <line x1={pt.x - 8} y1={pt.y} x2={pt.x + 8} y2={pt.y} stroke="#06b6d4" strokeWidth="1" opacity="0.5" />
                            <line x1={pt.x} y1={pt.y - 8} x2={pt.x} y2={pt.y + 8} stroke="#06b6d4" strokeWidth="1" opacity="0.5" />
                        </>
                    )}
                    <circle cx={pt.x} cy={pt.y} r={i === points.length - 1 ? 6 : 4}
                        fill={i === points.length - 1 ? '#06b6d4' : i === 0 ? '#ef4444' : '#f97316'}
                        filter={i === points.length - 1 ? 'url(#glowDot)' : undefined}
                    />
                    {/* Year labels */}
                    <text x={pt.x} y={padY + chartH + 16} textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600">{pt.year}</text>
                    {/* Stage labels */}
                    <text x={pt.x} y={pt.y - 12} textAnchor="middle" fill={i === points.length - 1 ? '#06b6d4' : '#94a3b8'} fontSize="9" fontWeight={i === points.length - 1 ? '800' : '500'}>
                        {pt.label}
                    </text>
                </g>
            ))}

            {/* Target icon at 2026 peak */}
            <g transform={`translate(${points[points.length - 1].x - 6}, ${points[points.length - 1].y - 30})`}>
                <circle cx="6" cy="6" r="6" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
                <circle cx="6" cy="6" r="3" fill="none" stroke="#06b6d4" strokeWidth="1" />
                <circle cx="6" cy="6" r="1" fill="#06b6d4" />
            </g>
        </svg>
    );
};

// --- Cinematic SlideOverPanel ---
const SlideOverPanel = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [hoveredStrategy, setHoveredStrategy] = useState<any>(null);
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 50,
            visibility: isOpen ? 'visible' : 'hidden',
            transition: 'visibility 0.4s ease'
        }}>
            {/* Cinematic Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(4px)',
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 0.4s ease'
                }}
            />

            {/* --- PANEL: Deep Charcoal Glassmorphism --- */}
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '440px',
                maxWidth: '92vw',
                backgroundColor: 'rgba(18, 18, 22, 0.88)',
                backdropFilter: 'blur(20px)',
                boxShadow: '-8px 0 60px rgba(0,0,0,0.7), inset 1px 0 0 rgba(255,255,255,0.06)',
                transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '1px solid rgba(6, 182, 212, 0.12)',
                overflow: 'hidden'
            }}>

                {/* Data-Stream Particle Background */}
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                    {[...Array(18)].map((_, i) => (
                        <div key={i} style={{
                            position: 'absolute',
                            width: `${1 + Math.random() * 2}px`,
                            height: `${20 + Math.random() * 60}px`,
                            left: `${5 + Math.random() * 90}%`,
                            top: '-80px',
                            background: `linear-gradient(180deg, transparent, rgba(6, 182, 212, ${0.06 + Math.random() * 0.12}), transparent)`,
                            borderRadius: '2px',
                            animation: `dataStream ${4 + Math.random() * 6}s linear ${Math.random() * 5}s infinite`
                        }} />
                    ))}
                </div>

                {/* ═══════════ HEADER ═══════════ */}
                <div style={{
                    padding: '28px 28px 20px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <div>
                        <p style={{
                            fontSize: '10px',
                            color: '#06b6d4',
                            letterSpacing: '4px',
                            fontWeight: '700',
                            marginBottom: '8px',
                            textTransform: 'uppercase'
                        }}>VME 2026 · STRATEGIC VISION</p>
                        <h2 style={{
                            fontSize: '22px',
                            fontWeight: '900',
                            color: 'white',
                            letterSpacing: '6px',
                            textTransform: 'uppercase',
                            lineHeight: 1.2,
                            animation: isOpen ? 'flickerIn 1.2s ease-out forwards' : 'none'
                        }}>
                            IMPACTING<br />
                            <span style={{ color: '#f97316' }}>THE MINDSET</span>
                        </h2>
                    </div>

                    {/* Elegant Glowing Close Button */}
                    <button
                        onClick={onClose}
                        className="cinematic-close-btn"
                        style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '12px',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            color: '#64748b',
                            flexShrink: 0,
                            marginTop: '4px'
                        }}
                    >
                        <X size={18} strokeWidth={2.5} />
                    </button>
                </div>

                {/* ═══════════ SCROLLABLE CONTENT ═══════════ */}
                <div className="cinematic-panel-body" style={{ flex: 1, overflowY: 'auto', padding: '20px 28px', position: 'relative', zIndex: 1 }}>

                    {/* Section Label */}
                    <p style={{ fontSize: '9px', color: '#475569', letterSpacing: '3px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase' }}>
                        CORE STRATEGIC PILLARS
                    </p>

                    {/* ── Frosted Glass Cards ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                        {mindsetPillars.map((pillar, index) => (
                            <div key={index} style={{
                                background: pillar.gradient,
                                border: `1px solid ${pillar.neonColor}30`,
                                borderRadius: '16px',
                                padding: '20px',
                                backdropFilter: 'blur(8px)',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {/* Subtle top-left glow */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    left: '-20px',
                                    width: '80px',
                                    height: '80px',
                                    background: `radial-gradient(circle, ${pillar.neonColor}10 0%, transparent 70%)`,
                                    pointerEvents: 'none'
                                }} />
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <Icon3D icon={pillar.icon} color={pillar.neonColor} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{
                                            fontSize: '15px',
                                            fontWeight: '800',
                                            color: 'white',
                                            letterSpacing: '0.5px',
                                            marginBottom: '6px'
                                        }}>{pillar.title}</h4>
                                        <p style={{
                                            fontSize: '12px',
                                            color: '#94a3b8',
                                            lineHeight: 1.6,
                                            margin: 0
                                        }}>
                                            {pillar.desc.split(pillar.accent).map((part, pi) => (
                                                <React.Fragment key={pi}>
                                                    {part}
                                                    {pi < pillar.desc.split(pillar.accent).length - 1 && (
                                                        <span style={{ color: '#f97316', fontWeight: '800' }}>{pillar.accent}</span>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── Culture Maturity Curve ── */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.04) 0%, rgba(168, 85, 247, 0.03) 100%)',
                        border: '1px solid rgba(6, 182, 212, 0.15)',
                        borderRadius: '16px',
                        padding: '20px',
                        marginBottom: '24px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <Target size={16} color="#06b6d4" />
                            <h4 style={{ fontSize: '11px', fontWeight: '900', color: '#06b6d4', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                Culture Maturity Curve
                            </h4>
                        </div>
                        <CultureMaturityCurve />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', padding: '0 8px' }}>
                            <span style={{ fontSize: '9px', color: '#ef4444', fontWeight: '700', letterSpacing: '1px' }}>● REACTIVE</span>
                            <span style={{ fontSize: '9px', color: '#f97316', fontWeight: '700', letterSpacing: '1px' }}>● TRANSITIONAL</span>
                            <span style={{ fontSize: '9px', color: '#06b6d4', fontWeight: '700', letterSpacing: '1px' }}>● GENERATIVE</span>
                        </div>
                    </div>

                    {/* ── 10 Commandments Interactive Grid ── */}
                    <p style={{ fontSize: '9px', color: '#475569', letterSpacing: '3px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase' }}>
                        10 STRATEGIC COMMANDMENTS
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px', position: 'relative' }}>
                        {commandments.map((item, index) => (
                            <div
                                key={index}
                                className="strategy-card"
                                onMouseEnter={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setHoveredStrategy({ ...item, index, rect });
                                }}
                                onMouseLeave={() => setHoveredStrategy(null)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '14px 10px 10px',
                                    background: 'rgba(255,255,255,0.02)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    cursor: 'default',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '10px',
                                    background: `linear-gradient(145deg, ${item.color}18, ${item.color}08)`,
                                    border: `1px solid ${item.color}30`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: `0 4px 16px ${item.color}10`,
                                    transition: 'all 0.3s ease'
                                }}>
                                    <item.icon size={16} color={item.color} strokeWidth={2.2} />
                                </div>
                                <span style={{ fontSize: '10px', fontWeight: '700', color: '#e2e8f0', letterSpacing: '0.3px', lineHeight: 1.2 }}>{item.title}</span>
                                <span style={{ fontSize: '8px', color: '#475569', fontWeight: '600', letterSpacing: '0.5px', opacity: 0.7 }}>VIEW DETAILS</span>
                            </div>
                        ))}
                    </div>

                    {/* ── Dynamic Tooltip (Rendered at panel level) ── */}
                    {hoveredStrategy && (() => {
                        const panelRect = document.querySelector('.cinematic-panel-body')?.getBoundingClientRect();
                        if (!panelRect) return null;
                        const cardRect = hoveredStrategy.rect;
                        // Position tooltip to the left of the card, centered vertically
                        let tooltipTop = cardRect.top - panelRect.top + (cardRect.height / 2) - 90;
                        // Clamp so tooltip doesn't overflow
                        tooltipTop = Math.max(8, Math.min(tooltipTop, panelRect.height - 220));
                        const tooltipLeft = 16;

                        return (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: tooltipTop,
                                    left: tooltipLeft,
                                    width: '200px',
                                    background: 'rgba(12, 12, 16, 0.92)',
                                    backdropFilter: 'blur(25px)',
                                    border: '1px solid rgba(59, 130, 246, 0.25)',
                                    borderRadius: '14px',
                                    padding: '16px',
                                    zIndex: 100,
                                    boxShadow: '0 12px 48px rgba(0,0,0,0.6), 0 0 20px rgba(59, 130, 246, 0.08)',
                                    pointerEvents: 'none',
                                    animation: 'tooltipFadeIn 0.2s ease-out forwards'
                                }}
                            >
                                {/* Tooltip Header */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                    <hoveredStrategy.icon size={14} color={hoveredStrategy.color} />
                                    <span style={{ fontSize: '12px', fontWeight: '800', color: 'white', letterSpacing: '0.5px' }}>{hoveredStrategy.title}</span>
                                </div>

                                {/* Strategic Actions */}
                                <div style={{ marginBottom: '12px' }}>
                                    {hoveredStrategy.actions.map((action: string, ai: number) => (
                                        <div key={ai} style={{ display: 'flex', gap: '6px', marginBottom: '5px', alignItems: 'flex-start' }}>
                                            <span style={{ color: hoveredStrategy.color, fontSize: '8px', marginTop: '3px', flexShrink: 0 }}>▸</span>
                                            <span style={{ fontSize: '10px', color: '#94a3b8', lineHeight: 1.4 }}>{action}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Impact Meter */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '8px', color: '#475569', fontWeight: '700', letterSpacing: '1px' }}>MINDSET IMPACT</span>
                                        <span style={{ fontSize: '10px', fontWeight: '900', color: hoveredStrategy.impact >= 85 ? '#06b6d4' : hoveredStrategy.impact >= 70 ? '#f59e0b' : '#64748b' }}>{hoveredStrategy.impact}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${hoveredStrategy.impact}%`,
                                            height: '100%',
                                            borderRadius: '2px',
                                            background: hoveredStrategy.impact >= 85
                                                ? 'linear-gradient(90deg, #06b6d4, #3b82f6)'
                                                : hoveredStrategy.impact >= 70
                                                    ? 'linear-gradient(90deg, #f59e0b, #f97316)'
                                                    : 'linear-gradient(90deg, #64748b, #94a3b8)',
                                            transition: 'width 0.4s ease-out',
                                            boxShadow: `0 0 8px ${hoveredStrategy.impact >= 85 ? '#06b6d4' : '#f59e0b'}40`
                                        }} />
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* ═══════════ FOOTER ═══════════ */}
                <div style={{
                    padding: '16px 28px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <div>
                        <p style={{ fontSize: '9px', color: '#475569', fontWeight: '700', letterSpacing: '1px' }}>VME STRATEGIC DIVISION</p>
                        <p style={{ fontSize: '8px', color: '#334155', marginTop: '2px' }}>BOARD PRESENTATION · CONFIDENTIAL</p>
                    </div>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#06b6d4',
                        boxShadow: '0 0 12px #06b6d4',
                        animation: 'pulse 2s infinite'
                    }} />
                </div>
            </div>

            {/* ═══════════ ANIMATIONS ═══════════ */}
            <style>{`
                @keyframes dataStream {
                    0% { transform: translateY(-100px); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(calc(100vh + 100px)); opacity: 0; }
                }
                @keyframes flickerIn {
                    0% { opacity: 0; filter: brightness(3) blur(2px); }
                    15% { opacity: 1; filter: brightness(1.5) blur(0); }
                    25% { opacity: 0.7; filter: brightness(0.8); }
                    40% { opacity: 1; filter: brightness(1.2); }
                    60% { opacity: 0.9; filter: brightness(1); }
                    100% { opacity: 1; filter: brightness(1) blur(0); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.3); }
                }
                .cinematic-close-btn:hover {
                    background: rgba(6, 182, 212, 0.1) !important;
                    border-color: rgba(6, 182, 212, 0.4) !important;
                    color: #06b6d4 !important;
                    box-shadow: 0 0 20px rgba(6, 182, 212, 0.15) !important;
                }
                .strategy-card:hover {
                    border-color: rgba(59, 130, 246, 0.4) !important;
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.12), inset 0 0 12px rgba(59, 130, 246, 0.04) !important;
                    transform: scale(1.05);
                    background: rgba(59, 130, 246, 0.06) !important;
                }
                .strategy-card:hover span:last-child {
                    opacity: 1 !important;
                    color: #3b82f6 !important;
                }
                @keyframes tooltipFadeIn {
                    0% { opacity: 0; transform: translateY(6px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

const StrategicRoadmap = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    return (
        <div style={{
            backgroundColor: '#121212',
            minHeight: '100%',
            color: 'white',
            padding: '40px',
            fontFamily: '"Inter", sans-serif',
            position: 'relative',
            overflowX: 'hidden'
        }}>
            {/* Background Grid Accent */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle at 2px 2px, #1a1a1a 1px, transparent 0)',
                backgroundSize: '32px 32px',
                opacity: 0.5,
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            {/* 3D Perspective Grid Floor */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '30vh',
                background: 'linear-gradient(180deg, transparent 0%, rgba(0,242,255,0.015) 100%)',
                backgroundImage: `
                    linear-gradient(rgba(0,242,255,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,242,255,0.04) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
                transform: 'perspective(500px) rotateX(55deg)',
                transformOrigin: 'bottom center',
                zIndex: 0,
                pointerEvents: 'none',
                maskImage: 'linear-gradient(180deg, transparent 0%, black 40%)',
                WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 40%)'
            }} />

            {/* Animations */}
            <style>{`
                @keyframes ctaGlowPulse {
                    0%, 100% { box-shadow: 0 0 8px rgba(255,215,0,0.2), 0 0 20px rgba(255,215,0,0.08); }
                    50% { box-shadow: 0 0 16px rgba(255,215,0,0.4), 0 0 40px rgba(255,215,0,0.15), 0 0 60px rgba(255,215,0,0.06); }
                }
                @keyframes milestonePulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.06); }
                }
                .cta-vision-btn {
                    animation: ctaGlowPulse 3s ease-in-out infinite;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }
                .cta-vision-btn:hover {
                    transform: scale(1.03) !important;
                    filter: brightness(1.25) !important;
                    box-shadow: 0 0 24px rgba(255,215,0,0.5), 0 0 50px rgba(255,215,0,0.2) !important;
                }
            `}</style>

            <SlideOverPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Header */}
                <div style={{ marginBottom: '60px', textAlign: 'center', position: 'relative' }}>
                    <h1 style={{ fontSize: '48px', fontWeight: '900', color: 'white', letterSpacing: '-2px', marginBottom: '16px', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                        2026 STRATEGIC <span style={{ color: '#4ade80' }}>ROADMAP</span>
                    </h1>
                    <p style={{ color: '#cbd5e1', fontSize: '18px', maxWidth: '700px', margin: '0 auto 32px' }}>
                        Transforming VME's safety culture through digitalization, automation, and competency-based leadership.
                    </p>

                    <button
                        onClick={() => setIsPanelOpen(true)}
                        className="cta-vision-btn"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '14px 32px',
                            background: 'linear-gradient(135deg, rgba(255,215,0,0.12), rgba(255,255,255,0.06))',
                            border: '1px solid rgba(255,215,0,0.3)',
                            borderRadius: '50px',
                            color: 'white',
                            fontWeight: '800',
                            fontSize: '14px',
                            letterSpacing: '0.5px',
                            backdropFilter: 'blur(12px)',
                            cursor: 'pointer',
                            position: 'relative',
                            zIndex: 2
                        }}
                    >
                        <Lightbulb size={20} color="#ffd700" />
                        Strategic Vision: Impacting the Mindset
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

                    {/* Left Column: Timeline */}
                    <div>
                        <h2 style={{
                            fontSize: '22px', fontWeight: '900', color: 'white', marginBottom: '32px',
                            display: 'flex', alignItems: 'center', gap: '12px',
                            textTransform: 'uppercase', letterSpacing: '1px',
                            textShadow: '0 1px 4px rgba(0,0,0,0.6)'
                        }}>
                            <Calendar size={28} color="#4ade80" /> Implementation Timeline
                        </h2>
                        <DarkCard style={{ backgroundColor: 'rgba(30,30,30,0.6)', backdropFilter: 'blur(10px)' }}>
                            {timelineData.map((item, index) => (
                                <TimelineItem key={index} data={item} index={index} />
                            ))}
                        </DarkCard>
                    </div>

                    {/* Right Column: Comparison & Charts */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                        {/* Software vs Excel Card */}
                        <DarkCard style={{
                            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                            border: '1px solid #334155',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, backgroundColor: '#3b82f6', opacity: 0.1, borderRadius: '50%' }}></div>

                            <h3 style={{
                                fontSize: '18px', fontWeight: '900', color: 'white', marginBottom: '24px',
                                display: 'flex', alignItems: 'center', gap: '12px',
                                textTransform: 'uppercase', letterSpacing: '1px',
                                textShadow: '0 1px 4px rgba(0,0,0,0.6)'
                            }}>
                                <Database size={24} color="#3b82f6" /> The Digital Advantage
                            </h3>

                            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                                {/* Old Way */}
                                <div style={{ flex: 1, opacity: 0.6 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#ef4444' }}>
                                        <FileSpreadsheet size={16} /> Legacy Excel
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                                        <li>❌ Manual vLookups</li>
                                        <li>❌ Fragmented Data</li>
                                        <li>❌ Delayed Reporting</li>
                                    </ul>
                                </div>

                                <div style={{ width: '1px', height: '60px', backgroundColor: '#334155' }}></div>

                                {/* New Way */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#22c55e', fontWeight: 'bold' }}>
                                        <Rocket size={16} /> VME Platform
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', color: 'white', lineHeight: '1.6' }}>
                                        <li>✅ Real-time Alerts</li>
                                        <li>✅ Single Source of Truth</li>
                                        <li>✅ Automated Integrity</li>
                                    </ul>
                                </div>
                            </div>
                        </DarkCard>

                        {/* Strategic Health Target Chart */}
                        <DarkCard style={{ backgroundColor: 'rgba(30,30,30,0.6)', backdropFilter: 'blur(10px)' }}>
                            <h3 style={{
                                fontSize: '18px', fontWeight: '900', color: 'white', marginBottom: '8px',
                                display: 'flex', alignItems: 'center', gap: '12px',
                                textTransform: 'uppercase', letterSpacing: '1px',
                                textShadow: '0 1px 4px rgba(0,0,0,0.6)'
                            }}>
                                <Shield size={24} color="#f59e0b" /> Strategic Health Target
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Projected reduction of total accidents (58 → 48)</p>

                            <div style={{ height: '250px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={healthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorAccidents" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[40, 65]} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333', color: 'white' }}
                                            labelStyle={{ color: '#94a3b8' }}
                                        />
                                        <ReferenceLine y={48} stroke="#22c55e" strokeDasharray="3 3" label={{ position: 'right', value: 'TARGET (48)', fill: '#22c55e', fontSize: 10 }} />
                                        <Area type="monotone" dataKey="accidents" stroke="#f59e0b" fillOpacity={1} fill="url(#colorAccidents)" strokeWidth={3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </DarkCard>
                    </div>
                </div>

                {/* Closing Statement */}
                <div style={{ marginTop: '60px', textAlign: 'center', padding: '40px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: '16px' }}>
                        <Rocket size={40} color="#4ade80" />
                    </div>
                    <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'white', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '8px' }}>
                        VME 2026
                    </h2>
                    <h3 style={{ fontSize: '24px', fontWeight: '300', color: '#cbd5e1' }}>
                        Favoriser la <span style={{ color: '#4ade80', fontWeight: 'bold' }}>Compétence</span> sur la Quantité
                    </h3>
                </div>

            </div>
        </div>
    );
};

export default StrategicRoadmap;
