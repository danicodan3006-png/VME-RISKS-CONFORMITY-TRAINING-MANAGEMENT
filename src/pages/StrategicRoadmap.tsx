
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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
    Lightbulb,
    AlertTriangle,
    TrendingDown
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
        icon: CheckCircle,
        milestones: ['VOC V1.0 deployed across all departments', '100% inspection form coverage', '559 units catalogued']
    },
    {
        quarter: 'Q2',
        title: 'Digitalization (Current)',
        status: 'IN PROGRESS',
        desc: 'Transition from Excel to Dynamic Reporting (Power BI Logic).',
        color: '#f97316',
        icon: Loader,
        milestones: ['VME Platform live with real-time dashboards', 'Power BI logic integration', 'Master Data Entry API deployed']
    },
    {
        quarter: 'Q3',
        title: 'Automation',
        status: 'PLANNED',
        desc: 'Automated compliance notifications for Department Owners.',
        color: '#f59e0b',
        icon: Clock,
        milestones: ['Auto-notification engine for compliance gaps', 'Escalation trigger system for L3+ violations', 'Predictive risk scoring algorithm']
    },
    {
        quarter: 'Q4',
        title: 'Cultural Shift',
        status: 'TARGET',
        desc: 'Full L1-L5 Hierarchy Implementation & Strategic Health Reporting.',
        color: '#a855f7',
        icon: Rocket,
        milestones: ['Full L1-L5 rank rollout site-wide', 'Board-level Health & Safety KPI dashboard', 'Zero-incident target tracking live']
    }
];

// --- Departmental Risk Exposure Data ---
const riskExposure = [
    { dept: 'Mining Operations', gap: 34, incidents: 12, trend: 'up', icon: AlertTriangle },
    { dept: 'Processing Plant', gap: 28, incidents: 8, trend: 'down', icon: TrendingDown },
    { dept: 'Heavy Equipment', gap: 22, incidents: 6, trend: 'up', icon: AlertTriangle },
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
    const [hoveredCmd, setHoveredCmd] = useState<{ item: typeof commandments[0]; rect: DOMRect } | null>(null);

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
                backgroundSize: '32px 32px', opacity: 0.4, zIndex: 0, pointerEvents: 'none'
            }} />

            {/* Animations */}
            <style>{`
                @keyframes ctaGlowPulse {
                    0%, 100% { box-shadow: 0 0 8px rgba(255,215,0,0.2), 0 0 20px rgba(255,215,0,0.08); }
                    50% { box-shadow: 0 0 16px rgba(255,215,0,0.4), 0 0 40px rgba(255,215,0,0.15); }
                }
                @keyframes milestonePulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
                @keyframes milestoneReveal { 0% { opacity: 0; transform: translateY(-6px); } 100% { opacity: 1; transform: translateY(0); } }
                @keyframes riskPulseRed {
                    0%, 100% { box-shadow: 0 0 6px rgba(239,68,68,0.3); }
                    50% { box-shadow: 0 0 18px rgba(239,68,68,0.6), 0 0 35px rgba(239,68,68,0.15); }
                }
                @keyframes dataStreamFall { 0% { transform: translateY(-100%); opacity: 0; } 10% { opacity: 0.6; } 90% { opacity: 0.6; } 100% { transform: translateY(200px); opacity: 0; } }
                .cta-vision-btn { animation: ctaGlowPulse 3s ease-in-out infinite; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; }
                .cta-vision-btn:hover { transform: scale(1.03) !important; filter: brightness(1.25) !important; }
                .bento-cell { transition: all 0.3s ease; }
                .bento-cell:hover { border-color: rgba(6, 182, 212, 0.25) !important; }
                @keyframes mindsetExpand { 0% { opacity: 0; transform: scale(0.96); } 100% { opacity: 1; transform: scale(1); } }
                @keyframes cardReveal { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }
                @keyframes amberPulse { 0%, 100% { box-shadow: 0 0 12px rgba(245,158,11,0.15); } 50% { box-shadow: 0 0 24px rgba(245,158,11,0.35), 0 0 48px rgba(245,158,11,0.1); } }
                .mindset-card { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
                .mindset-card:hover { border-color: rgba(245,158,11,0.4) !important; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(245,158,11,0.15) !important; }
            `}</style>

            <SlideOverPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />

            {/* ══════ COMPACT HEADER BAR ══════ */}
            <div style={{
                padding: '12px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'linear-gradient(90deg, rgba(0,242,255,0.02), transparent, rgba(255,215,0,0.02))',
                position: 'relative', zIndex: 2, flexShrink: 0,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <h1 style={{ fontSize: '18px', fontWeight: '900', color: 'white', letterSpacing: '-0.5px', margin: 0 }}>
                        2026 STRATEGIC <span style={{ color: '#4ade80' }}>ROADMAP</span>
                    </h1>
                    <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />
                    <p style={{ fontSize: '10px', color: '#64748b', fontWeight: '600', letterSpacing: '1px', margin: 0 }}>
                        VME · MISSION CONTROL
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <p style={{ fontSize: '9px', color: '#94a3b8', fontStyle: 'italic', margin: 0, maxWidth: '400px', textAlign: 'right' }}>
                        "The <span style={{ color: '#00F2FF', fontWeight: '800', fontStyle: 'normal' }}>operational heartbeat</span> of MMG Kinsevere. <span style={{ color: '#ffd700', fontWeight: '800', fontStyle: 'normal' }}>Excellence is non-negotiable.</span>"
                    </p>
                    <button onClick={() => setIsPanelOpen(true)} className="cta-vision-btn" style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px',
                        background: 'linear-gradient(135deg, rgba(255,215,0,0.12), rgba(255,255,255,0.04))',
                        border: '1px solid rgba(255,215,0,0.3)', borderRadius: '50px',
                        color: 'white', cursor: 'pointer', flexShrink: 0
                    }}>
                        <Lightbulb size={14} color="#ffd700" />
                        <span style={{ fontWeight: '800', fontSize: '10px', letterSpacing: '0.5px' }}>STRATEGIC VISION</span>
                    </button>
                </div>
            </div>

            {/* ══════ BENTO GRID ══════ */}
            <div style={{
                flex: 1, padding: '12px', position: 'relative', zIndex: 1,
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridTemplateRows: 'auto 1fr 1fr auto',
                gap: '10px',
                minHeight: 0,
            }}>

                {/* ── CELL 1: Q1-Q2 Timeline (col 1-2, row 1-2) ── */}
                <div className="bento-cell" style={{
                    gridColumn: '1 / 3', gridRow: '1 / 3',
                    background: 'linear-gradient(145deg, rgba(30,30,30,0.6), rgba(18,18,18,0.8))',
                    border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px',
                    padding: '16px', overflow: 'auto',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}>
                    <h2 style={{
                        fontSize: '11px', fontWeight: '900', color: '#4ade80', marginBottom: '12px',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        letterSpacing: '2px', textTransform: 'uppercase',
                    }}>
                        <Calendar size={16} color="#4ade80" /> THE 2026 PATH
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {timelineData.map((item, index) => (
                            <div key={index} style={{
                                background: item.status === 'IN PROGRESS'
                                    ? 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(249,115,22,0.02))'
                                    : 'rgba(255,255,255,0.02)',
                                border: `1px solid ${item.status === 'IN PROGRESS' ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.05)'}`,
                                borderRadius: '12px', padding: '14px',
                                display: 'flex', flexDirection: 'column', gap: '6px',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '50%',
                                            backgroundColor: `${item.color}18`, display: 'flex',
                                            alignItems: 'center', justifyContent: 'center',
                                            border: `2px solid ${item.color}`,
                                            boxShadow: `0 0 10px ${item.color}30`,
                                        }}>
                                            <item.icon size={16} color={item.color} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '13px', fontWeight: '900', color: 'white', letterSpacing: '0.5px' }}>
                                                {item.quarter}
                                            </div>
                                            <div style={{ fontSize: '9px', fontWeight: '700', color: item.color, letterSpacing: '1px', textTransform: 'uppercase' }}>
                                                {item.title}
                                            </div>
                                        </div>
                                    </div>
                                    <span style={{
                                        padding: '2px 8px', borderRadius: '20px',
                                        backgroundColor: `${item.color}18`, color: item.color,
                                        fontSize: '7px', fontWeight: '900', letterSpacing: '1px',
                                    }}>{item.status}</span>
                                </div>
                                <p style={{ color: '#94a3b8', fontSize: '10px', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
                                    {item.milestones.map((m, mi) => (
                                        <div key={mi} style={{ display: 'flex', gap: '5px', alignItems: 'flex-start' }}>
                                            <span style={{ color: item.color, fontSize: '7px', marginTop: '3px' }}>▸</span>
                                            <span style={{ fontSize: '9px', color: '#cbd5e1', lineHeight: 1.4 }}>{m}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── CELL 2: Digital Advantage (col 3, row 1) ── */}
                <div className="bento-cell" style={{
                    gridColumn: '3 / 4', gridRow: '1 / 2',
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    border: '1px solid rgba(59,130,246,0.15)', borderRadius: '16px',
                    padding: '16px', overflow: 'hidden', position: 'relative',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}>
                    <div style={{ position: 'absolute', top: -30, right: -30, width: 80, height: 80, backgroundColor: '#3b82f6', opacity: 0.08, borderRadius: '50%' }} />
                    <h3 style={{
                        fontSize: '11px', fontWeight: '900', color: '#3b82f6', marginBottom: '12px',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        letterSpacing: '2px', textTransform: 'uppercase',
                    }}>
                        <Database size={14} color="#3b82f6" /> DIGITAL ADVANTAGE
                    </h3>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}>
                        <div style={{ flex: 1, opacity: 0.6 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px', color: '#ef4444', fontSize: '10px', fontWeight: '700' }}>
                                <FileSpreadsheet size={12} /> Legacy Excel
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: '10px', color: '#94a3b8', lineHeight: '1.7', margin: 0 }}>
                                <li>❌ Manual vLookups</li>
                                <li>❌ Fragmented Data</li>
                                <li>❌ Delayed Reporting</li>
                            </ul>
                        </div>
                        <div style={{ width: '1px', background: 'rgba(255,255,255,0.06)' }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px', color: '#22c55e', fontWeight: '700', fontSize: '10px' }}>
                                <Rocket size={12} /> VME Platform
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: '10px', color: 'white', lineHeight: '1.7', margin: 0 }}>
                                <li>✅ Real-time Alerts</li>
                                <li>✅ Single Source</li>
                                <li>✅ Auto Integrity</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ── CELL 3: Risk Exposure (col 4, row 1-3) ── */}
                <div className="bento-cell" style={{
                    gridColumn: '4 / 5', gridRow: '1 / 4',
                    background: 'linear-gradient(145deg, rgba(30,30,30,0.7), rgba(15,15,15,0.9))',
                    border: '1px solid rgba(239,68,68,0.1)', borderRadius: '16px',
                    padding: '16px', overflow: 'auto',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}>
                    <h2 style={{
                        fontSize: '11px', fontWeight: '900', color: '#f97316', marginBottom: '14px',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        letterSpacing: '2px', textTransform: 'uppercase',
                    }}>
                        <AlertTriangle size={16} color="#f97316" /> RISK EXPOSURE
                    </h2>
                    <div style={{ fontSize: '8px', fontWeight: '800', color: '#475569', letterSpacing: '2px', marginBottom: '10px' }}>
                        TOP 3 — HIGHEST SAFETY GAP
                    </div>
                    {riskExposure.map((dept, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px',
                            marginBottom: '8px',
                            background: i === 0 ? 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.02))' : 'rgba(255,255,255,0.02)',
                            border: `1px solid ${i === 0 ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.04)'}`,
                            borderRadius: '10px',
                            animation: i === 0 ? 'riskPulseRed 2.5s ease-in-out infinite' : 'none',
                        }}>
                            <div style={{
                                width: '26px', height: '26px', borderRadius: '50%',
                                background: i === 0 ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: `1px solid ${i === 0 ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)'}`, flexShrink: 0,
                            }}>
                                <span style={{ fontSize: '10px', fontWeight: '900', color: i === 0 ? '#ef4444' : '#64748b' }}>#{i + 1}</span>
                            </div>
                            <dept.icon size={14} color={i === 0 ? '#ef4444' : '#f97316'} strokeWidth={2.5} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: '10px', fontWeight: '800', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dept.dept}</div>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '3px' }}>
                                    <span style={{ fontSize: '8px', color: '#64748b', fontWeight: '700' }}>GAP: <span style={{ color: i === 0 ? '#ef4444' : '#f97316', fontWeight: '900', fontSize: '10px' }}>{dept.gap}%</span></span>
                                    <span style={{ fontSize: '8px', color: '#64748b', fontWeight: '700' }}>INC: <span style={{ color: '#00F2FF', fontWeight: '900', fontSize: '10px' }}>{dept.incidents}</span></span>
                                </div>
                            </div>
                            <div style={{ width: '40px', flexShrink: 0 }}>
                                <div style={{ width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                                    <div style={{ width: `${dept.gap}%`, height: '100%', background: i === 0 ? 'linear-gradient(90deg, #ef4444, #dc2626)' : 'linear-gradient(90deg, #f97316, #ea580c)', borderRadius: '2px' }} />
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Intervention Alert */}
                    <div style={{
                        marginTop: '10px', padding: '8px 10px',
                        background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)',
                        borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px',
                    }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 8px rgba(239,68,68,0.6)', animation: 'riskPulseRed 2s infinite' }} />
                        <span style={{ fontSize: '7px', fontWeight: '800', color: '#ef4444', letterSpacing: '1px' }}>IMMEDIATE MANAGEMENT INTERVENTION REQUIRED</span>
                    </div>
                    {/* Departments Under Observation */}
                    <div style={{ marginTop: '14px' }}>
                        <div style={{ fontSize: '8px', fontWeight: '800', color: '#475569', letterSpacing: '2px', marginBottom: '8px' }}>DEPARTMENTS UNDER OBSERVATION</div>
                        {['Logistics & Transport', 'Maintenance Workshop'].map((d, di) => (
                            <div key={di} style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                marginBottom: '5px', padding: '6px 10px',
                                background: 'rgba(249,115,22,0.04)', border: '1px solid rgba(249,115,22,0.1)', borderRadius: '6px',
                            }}>
                                <AlertTriangle size={11} color="#f97316" />
                                <span style={{ fontSize: '9px', fontWeight: '700', color: '#cbd5e1' }}>{d}</span>
                                <span style={{ marginLeft: 'auto', fontSize: '7px', fontWeight: '800', color: '#f97316', letterSpacing: '1px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(249,115,22,0.1)' }}>WATCH</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── CELL 4: Strategic Health Target (col 2-3, row 2-3) — PROMINENT ── */}
                <div className="bento-cell" style={{
                    gridColumn: '3 / 4', gridRow: '2 / 4',
                    background: 'linear-gradient(145deg, rgba(30,30,30,0.6), rgba(18,18,18,0.8))',
                    border: '1px solid rgba(245,158,11,0.12)', borderRadius: '16px',
                    padding: '16px', display: 'flex', flexDirection: 'column',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}>
                    <h3 style={{
                        fontSize: '11px', fontWeight: '900', color: '#f59e0b', marginBottom: '4px',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        letterSpacing: '2px', textTransform: 'uppercase',
                    }}>
                        <Shield size={14} color="#f59e0b" /> STRATEGIC HEALTH TARGET
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '10px', marginBottom: '10px', margin: '0 0 10px 0' }}>
                        Total accidents: <span style={{ color: '#ef4444', fontWeight: '900' }}>58</span> → <span style={{ color: '#22c55e', fontWeight: '900' }}>48</span>
                    </p>
                    <div style={{ flex: 1, minHeight: '120px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={healthData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAccidents" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                <XAxis dataKey="month" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} domain={[40, 65]} />
                                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: 'white', fontSize: '11px' }} labelStyle={{ color: '#94a3b8' }} />
                                <ReferenceLine y={48} stroke="#22c55e" strokeDasharray="3 3" label={{ position: 'right', value: 'TARGET', fill: '#22c55e', fontSize: 8 }} />
                                <Area type="monotone" dataKey="accidents" stroke="#f59e0b" fillOpacity={1} fill="url(#colorAccidents)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ── CELL 5: IMPACTING THE MINDSET (col 1-2, row 3) ── */}
                <div className="bento-cell" style={{
                    gridColumn: '1 / 3', gridRow: '3 / 4',
                    background: 'linear-gradient(145deg, rgba(30,25,15,0.7), rgba(18,18,18,0.85))',
                    border: '1px solid rgba(245,158,11,0.15)', borderRadius: '16px',
                    padding: '14px 16px', overflow: 'visible',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                    animation: 'mindsetExpand 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards, amberPulse 4s ease-in-out 1s infinite',
                    position: 'relative',
                }}>
                    {/* Amber glow accent */}
                    <div style={{ position: 'absolute', top: -1, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)' }} />

                    {/* Header row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(145deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(245,158,11,0.1)' }}>
                                <Lightbulb size={16} color="#f59e0b" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '12px', fontWeight: '900', color: '#f59e0b', letterSpacing: '2px', margin: 0, textTransform: 'uppercase' }}>
                                    IMPACTING THE MINDSET
                                </h3>
                                <p style={{ fontSize: '8px', color: '#64748b', fontWeight: '600', letterSpacing: '1px', margin: 0 }}>10 STRATEGIC COMMANDMENTS</p>
                            </div>
                        </div>
                        <button onClick={() => setIsPanelOpen(true)} style={{
                            display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 12px',
                            background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
                            borderRadius: '20px', color: '#f59e0b', cursor: 'pointer', fontSize: '8px',
                            fontWeight: '800', letterSpacing: '0.5px', transition: 'all 0.2s',
                        }}>
                            <Eye size={10} /> DEEP DIVE
                        </button>
                    </div>

                    {/* 5×2 Strategy Mini-Cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
                        {commandments.map((item, index) => (
                            <div
                                key={index}
                                className="mindset-card"
                                onMouseEnter={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setHoveredCmd({ item, rect });
                                }}
                                onMouseLeave={() => setHoveredCmd(null)}
                                style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    gap: '4px', padding: '10px 6px 8px',
                                    background: `linear-gradient(145deg, ${item.color}08, transparent)`,
                                    borderRadius: '10px',
                                    border: `1px solid ${item.color}18`,
                                    cursor: 'default', textAlign: 'center',
                                    animation: `cardReveal 0.4s ease-out ${0.05 * index}s both`,
                                }}
                            >
                                <div style={{
                                    width: '28px', height: '28px', borderRadius: '8px',
                                    background: `linear-gradient(145deg, ${item.color}18, ${item.color}08)`,
                                    border: `1px solid ${item.color}25`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: `0 2px 8px ${item.color}10`,
                                }}>
                                    <item.icon size={13} color={item.color} strokeWidth={2.2} />
                                </div>
                                <span style={{ fontSize: '8px', fontWeight: '700', color: '#e2e8f0', letterSpacing: '0.3px', lineHeight: 1.2 }}>{item.title}</span>
                                <div style={{ width: '100%', height: '2px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '1px', overflow: 'hidden', marginTop: '2px' }}>
                                    <div style={{ width: `${item.impact}%`, height: '100%', borderRadius: '1px', background: `linear-gradient(90deg, ${item.color}, ${item.color}80)` }} />
                                </div>
                                <span style={{ fontSize: '7px', color: '#475569', fontWeight: '600' }}>{item.impact}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ══ FIXED TOOLTIP PORTAL for Mindset Cards ══ */}
                {hoveredCmd && createPortal(
                    <div style={{
                        position: 'fixed',
                        top: Math.min(hoveredCmd.rect.top - 10, window.innerHeight - 240),
                        left: hoveredCmd.rect.right + 12,
                        width: '220px',
                        background: 'rgba(10, 10, 18, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(245,158,11,0.25)',
                        borderRadius: '14px',
                        padding: '14px 16px',
                        zIndex: 9999,
                        boxShadow: '0 12px 48px rgba(0,0,0,0.7), 0 0 24px rgba(245,158,11,0.08)',
                        pointerEvents: 'none',
                        animation: 'cardReveal 0.15s ease-out forwards',
                    }}>
                        {/* Tooltip Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <hoveredCmd.item.icon size={14} color={hoveredCmd.item.color} />
                            <span style={{ fontSize: '12px', fontWeight: '800', color: 'white', letterSpacing: '0.3px' }}>{hoveredCmd.item.title}</span>
                        </div>
                        {/* Description */}
                        <p style={{ fontSize: '10px', color: '#94a3b8', lineHeight: 1.5, margin: '0 0 10px 0' }}>{hoveredCmd.item.desc}</p>
                        {/* Actions */}
                        <div style={{ marginBottom: '10px' }}>
                            {hoveredCmd.item.actions.map((action: string, ai: number) => (
                                <div key={ai} style={{ display: 'flex', gap: '5px', marginBottom: '4px', alignItems: 'flex-start' }}>
                                    <span style={{ color: hoveredCmd.item.color, fontSize: '7px', marginTop: '3px', flexShrink: 0 }}>▸</span>
                                    <span style={{ fontSize: '9px', color: '#cbd5e1', lineHeight: 1.4 }}>{action}</span>
                                </div>
                            ))}
                        </div>
                        {/* Impact Bar */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                <span style={{ fontSize: '7px', color: '#475569', fontWeight: '700', letterSpacing: '1px' }}>MINDSET IMPACT</span>
                                <span style={{ fontSize: '10px', fontWeight: '900', color: hoveredCmd.item.impact >= 85 ? '#f59e0b' : '#64748b' }}>{hoveredCmd.item.impact}%</span>
                            </div>
                            <div style={{ width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ width: `${hoveredCmd.item.impact}%`, height: '100%', borderRadius: '2px', background: `linear-gradient(90deg, ${hoveredCmd.item.color}, #f59e0b)`, boxShadow: `0 0 8px ${hoveredCmd.item.color}40` }} />
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

                {/* ── CELL 6: Status Bar (col 1-4, row 4) ── */}
                <div style={{
                    gridColumn: '1 / 5', gridRow: '4 / 5',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '6px 16px',
                    background: 'rgba(255,255,255,0.02)', borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.03)',
                }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        {[
                            { label: 'Q1 STANDARDIZATION', color: '#22c55e', status: '● DONE' },
                            { label: 'Q2 DIGITALIZATION', color: '#f97316', status: '◉ ACTIVE' },
                            { label: 'Q3 AUTOMATION', color: '#f59e0b', status: '○ PLANNED' },
                            { label: 'Q4 CULTURAL SHIFT', color: '#a855f7', status: '○ TARGET' },
                        ].map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '7px', fontWeight: '900', color: s.color, letterSpacing: '1px' }}>{s.status}</span>
                                <span style={{ fontSize: '7px', fontWeight: '700', color: '#475569', letterSpacing: '0.5px' }}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '7px', color: '#334155', fontWeight: '600' }}>VME 2026 · Compétence sur la Quantité</span>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
                        <span style={{ fontSize: '7px', color: '#334155', fontWeight: '600' }}>BOARD PRESENTATION · FEB 2026</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StrategicRoadmap;
