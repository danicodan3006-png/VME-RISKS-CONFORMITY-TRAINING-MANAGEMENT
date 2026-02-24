
import { useState, useEffect } from 'react';
import {
    BookOpen,
    GraduationCap,
    Users,
    AlertTriangle,
    Zap,
    TrendingUp,
    Shield
} from 'lucide-react';
import { useSafeEquip } from '../context/SafeEquipContext';

// --- 19 Departments: REAL VOC Theory counts + Employee totals synced from Safety Awareness Master Source ---
// Theory total = 169 | Employee total = 2,976 (global target)
const DEPT_DATA = [
    { name: 'Mining (Mexco)', theory: 161, employees: 1398, redListed: 45 },
    { name: 'HSE', theory: 4, employees: 157, redListed: 6 },
    { name: 'Plant', theory: 2, employees: 167, redListed: 8 },
    { name: 'Transport', theory: 2, employees: 195, redListed: 9 },
    { name: 'Civil Svcs', theory: 0, employees: 227, redListed: 12 },
    { name: 'Lean Prod', theory: 0, employees: 167, redListed: 7 },
    { name: 'Sulphite', theory: 0, employees: 167, redListed: 8 },
    { name: 'Tailings', theory: 0, employees: 78, redListed: 4 },
    { name: 'Supply Chain', theory: 0, employees: 69, redListed: 3 },
    { name: 'Exploration', theory: 0, employees: 57, redListed: 2 },
    { name: 'Farm & Camp', theory: 0, employees: 56, redListed: 3 },
    { name: 'Hydromet', theory: 0, employees: 53, redListed: 2 },
    { name: 'Central Lab', theory: 0, employees: 39, redListed: 2 },
    { name: 'Project Del', theory: 0, employees: 29, redListed: 1 },
    { name: 'HR & Medical', theory: 0, employees: 26, redListed: 1 },
    { name: 'Debottlenecking', theory: 0, employees: 17, redListed: 1 },
    { name: 'Compliance', theory: 0, employees: 8, redListed: 0 },
    { name: 'Finance', theory: 0, employees: 6, redListed: 0 },
    { name: 'SSHEC', theory: 0, employees: 5, redListed: 0 },
    { name: 'Stakeholder', theory: 0, employees: 5, redListed: 0 },
    { name: 'People Svcs', theory: 0, employees: 5, redListed: 0 },
];

// --- Sub-components for Training & VOC Stats ---
const Icon3D = ({ icon: Icon, color, size = 20 }: { icon: any, color: string, size?: number }) => (
    <div style={{
        width: `${size + 16}px`,
        height: `${size + 16}px`,
        borderRadius: '10px',
        background: `linear-gradient(145deg, ${color}20, ${color}08)`,
        border: `1px solid ${color}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 4px 16px ${color}15, inset 0 1px 0 ${color}10`,
        position: 'relative'
    }}>
        <Icon size={size} color={color} strokeWidth={2.2} />
        <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '10px',
            background: `linear-gradient(180deg, ${color}08 0%, transparent 50%)`,
            pointerEvents: 'none'
        }} />
    </div>
);

// --- Certification Funnel ---
const CertificationFunnel = ({ totalTarget, totalTheory, totalPractice }: { totalTarget: number, totalTheory: number, totalPractice: number }) => {
    const steps = [
        { label: 'ENROLLMENT', value: totalTarget, color: '#3b82f6', icon: Users, width: '100%' },
        { label: 'THEORY (VOC)', value: totalTheory, color: '#f59e0b', icon: BookOpen, width: '85%' },
        { label: 'PRACTICE (VOC)', value: totalPractice, color: '#22c55e', icon: GraduationCap, width: '70%' },
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0',
            height: '100%',
            justifyContent: 'center'
        }}>
            {steps.map((step, i) => (
                <div key={i} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Step block */}
                    <div style={{
                        width: step.width,
                        padding: '12px 14px',
                        background: `linear-gradient(135deg, ${step.color}18, ${step.color}08)`,
                        border: `1px solid ${step.color}40`,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        minWidth: 0
                    }}>
                        {/* Subtle glow */}
                        <div style={{
                            position: 'absolute',
                            top: '-10px',
                            left: '-10px',
                            width: '60px',
                            height: '60px',
                            background: `radial-gradient(circle, ${step.color}15 0%, transparent 70%)`,
                            pointerEvents: 'none'
                        }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', zIndex: 1 }}>
                            <step.icon size={14} color={step.color} strokeWidth={2.5} />
                            <span style={{
                                fontSize: '9px',
                                fontWeight: '800',
                                color: step.color,
                                letterSpacing: '1.5px'
                            }}>{step.label}</span>
                        </div>
                        <span style={{
                            fontSize: '22px',
                            fontWeight: '900',
                            color: '#00F2FF',
                            fontFamily: '"Roboto Mono", "JetBrains Mono", monospace',
                            zIndex: 1,
                            textShadow: '0 0 10px rgba(0, 242, 255, 0.4), 0 0 4px rgba(0,0,0,0.8)'
                        }}>{step.value.toLocaleString()}</span>
                    </div>
                    {/* Neon Flow Connector */}
                    {i < steps.length - 1 && (
                        <div style={{
                            width: '2px',
                            height: '16px',
                            background: `linear-gradient(180deg, ${step.color}60, ${steps[i + 1].color}60)`,
                            boxShadow: `0 0 6px ${step.color}30`,
                            position: 'relative'
                        }}>
                            {/* Animated flow dot */}
                            <div style={{
                                position: 'absolute',
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                backgroundColor: step.color,
                                left: '-1px',
                                boxShadow: `0 0 8px ${step.color}`,
                                animation: `flowDot${i} 2s ease-in-out infinite`
                            }} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};


const LeaderboardBar = ({ dept, maxValue, rank, onHover, onLeave }: {
    dept: typeof DEPT_DATA[0], maxValue: number, rank: number,
    onHover: (e: React.MouseEvent, dept: typeof DEPT_DATA[0], rank: number) => void,
    onLeave: () => void
}) => {
    const [animated, setAnimated] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setAnimated(true), 100 + rank * 60);
        return () => clearTimeout(t);
    }, [rank]);


    const pct = maxValue > 0 ? (dept.theory / maxValue) * 100 : 0;
    const barColor = dept.theory >= 100 ? '#00F2FF' : dept.theory >= 2 ? '#f59e0b' : '#64748b';

    return (
        <div
            onMouseEnter={(e) => onHover(e, dept, rank)}
            onMouseLeave={onLeave}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'default',
                padding: '3px 0',
                transition: 'all 0.2s ease'
            }}
            className="leaderboard-row"
        >
            <span style={{
                fontSize: '9px',
                fontWeight: '800',
                color: '#475569',
                width: '16px',
                textAlign: 'right',
                fontFamily: '"JetBrains Mono", monospace'
            }}>{rank}</span>
            <div style={{
                flex: 1,
                height: '24px',
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderRadius: '6px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(255,255,255,0.03)'
            }}>
                {/* Fill bar */}
                <div style={{
                    height: '100%',
                    width: animated ? `${Math.max(pct, 2)}%` : '0%',
                    background: `linear-gradient(90deg, ${barColor}20, ${barColor}40)`,
                    borderRadius: '6px',
                    transition: 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    position: 'relative',
                    backdropFilter: 'blur(4px)'
                }}>
                    {/* Glowing tip */}
                    <div style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: '3px',
                        backgroundColor: barColor,
                        boxShadow: `0 0 8px ${barColor}, 0 0 16px ${barColor}40`,
                        borderRadius: '0 6px 6px 0',
                        opacity: animated ? 1 : 0,
                        transition: 'opacity 0.5s ease 1s'
                    }} />
                </div>
                {/* Label inside bar */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '8px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <span style={{
                        fontSize: '11px',
                        fontWeight: '900',
                        color: '#00F2FF',
                        fontFamily: '"Roboto Mono", "JetBrains Mono", monospace',
                        textShadow: '0 0 6px rgba(0, 242, 255, 0.3)'
                    }}>{dept.theory}</span>
                    <span style={{
                        fontSize: '9px',
                        fontWeight: '700',
                        color: '#A0A0A0',
                        fontFamily: '"Roboto Mono", monospace'
                    }}>/ {dept.employees.toLocaleString()}</span>
                    <span style={{
                        fontSize: '10px',
                        fontWeight: '600',
                        color: '#94a3b8',
                        letterSpacing: '0.2px'
                    }}>— {dept.name}</span>
                </div>
            </div>
        </div>
    );
};


// =====================================================
// === TRAINING & VOC STATS - COMMAND CENTER ===
// =====================================================

const TrainingVocStats = () => {
    const { TOTAL_POPULATION } = useSafeEquip();
    const TOTAL_TARGET = TOTAL_POPULATION;
    const TOTAL_THEORY = 169;
    const TOTAL_PRACTICE = 0;
    const [hoveredDept, setHoveredDept] = useState<{ dept: typeof DEPT_DATA[0], x: number, y: number, rank: number } | null>(null);

    // Sort departments by theory descending
    const sortedDepts = [...DEPT_DATA].sort((a, b) => b.theory - a.theory);
    const maxTheory = sortedDepts[0]?.theory || 1;

    // Global readiness
    const globalReadiness = ((TOTAL_THEORY / TOTAL_TARGET) * 100);

    // Cross-validation with dataset


    const handleBarHover = (e: React.MouseEvent, dept: typeof DEPT_DATA[0], rank: number) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setHoveredDept({ dept, x: rect.left + rect.width / 2, y: rect.top, rank });
    };

    return (
        <div style={{
            backgroundColor: '#121212',
            height: '100%',
            width: '100%',
            color: 'white',
            padding: '14px 18px',
            fontFamily: '"Inter", sans-serif',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Background Grid */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.015) 1px, transparent 0)',
                backgroundSize: '28px 28px',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            {/* ══════ HEADER ══════ */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
                flexShrink: 0,
                position: 'relative',
                zIndex: 1
            }}>
                <div>
                    <h1 style={{
                        fontSize: '18px',
                        fontWeight: '900',
                        color: '#3b82f6',
                        letterSpacing: '2px',
                        lineHeight: 1,
                        textTransform: 'uppercase'
                    }}>
                        TRAINING & COMPETENCY DIAGNOSTICS
                    </h1>
                    <p style={{ fontSize: '10px', color: '#475569', marginTop: '4px', letterSpacing: '0.5px' }}>
                        Live Force-Field Analysis · Connected to SafeEquip_Dynamic_Dataset
                    </p>
                </div>
                <div style={{
                    padding: '6px 14px',
                    backgroundColor: 'rgba(59, 130, 246, 0.08)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <div style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        backgroundColor: '#22c55e',
                        boxShadow: '0 0 8px #22c55e',
                        animation: 'statusPulse 2s infinite'
                    }} />
                    <span style={{ fontSize: '9px', fontWeight: '800', color: '#3b82f6', letterSpacing: '1px' }}>SYNC: ACTIVE</span>
                </div>
            </div>

            {/* ══════ TOP ROW: 3 KPI Cards ══════ */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '12px',
                marginBottom: '12px',
                flexShrink: 0,
                position: 'relative',
                zIndex: 1,
                height: '100px'
            }}>
                {/* Theory Milestone */}
                <div style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.6)',
                    border: '1px solid #2a2a2a',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    backdropFilter: 'blur(8px)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <Icon3D icon={BookOpen} color="#3b82f6" />
                    <div>
                        <h3 style={{ fontSize: '8px', fontWeight: '800', color: '#475569', letterSpacing: '1.5px', marginBottom: '4px' }}>THEORY MILESTONE</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '28px', fontWeight: '900', color: '#00F2FF', fontFamily: '"Roboto Mono", "JetBrains Mono", monospace', lineHeight: 1, textShadow: '0 0 10px rgba(0, 242, 255, 0.3)' }}>{TOTAL_THEORY}</span>
                            <span style={{ fontSize: '13px', color: '#A0A0A0', fontWeight: '700', fontFamily: '"Roboto Mono", monospace' }}>/ {TOTAL_TARGET.toLocaleString()}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '2px 6px', backgroundColor: 'rgba(0, 242, 255, 0.08)', border: '1px solid rgba(0, 242, 255, 0.2)', borderRadius: '4px', marginLeft: '2px' }}>
                                <Shield size={10} color="#00F2FF" />
                                <span style={{ fontSize: '7px', fontWeight: '900', color: '#00F2FF', letterSpacing: '0.5px' }}>CERTIFIED</span>
                            </div>
                        </div>
                        <div style={{ marginTop: '6px', width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{
                                width: `${(TOTAL_THEORY / TOTAL_TARGET) * 100}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                                borderRadius: '2px',
                                boxShadow: '0 0 6px #3b82f640'
                            }} />
                        </div>
                    </div>
                </div>

                {/* Practice Gap */}
                <div style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.6)',
                    border: '1px solid #2a2a2a',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    backdropFilter: 'blur(8px)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <Icon3D icon={AlertTriangle} color="#ef4444" />
                    <div>
                        <h3 style={{ fontSize: '8px', fontWeight: '800', color: '#475569', letterSpacing: '1.5px', marginBottom: '4px' }}>PRACTICE GAP</h3>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <span style={{ fontSize: '28px', fontWeight: '900', color: '#A0A0A0', fontFamily: '"Roboto Mono", "JetBrains Mono", monospace', lineHeight: 1 }}>{TOTAL_TARGET.toLocaleString()}</span>
                            <span style={{ fontSize: '10px', color: '#A0A0A0', fontWeight: '700' }}>REMAINING</span>
                        </div>
                        <div style={{ marginTop: '6px', width: '100%', height: '3px', backgroundColor: 'rgba(239, 68, 68, 0.15)', borderRadius: '2px' }}>
                            <div style={{ width: '0%', height: '100%', borderRadius: '2px' }} />
                        </div>
                    </div>
                </div>

                {/* Global Readiness */}
                <div style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.6)',
                    border: '1px solid #2a2a2a',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    backdropFilter: 'blur(8px)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <Icon3D icon={TrendingUp} color="#f59e0b" />
                    <div>
                        <h3 style={{ fontSize: '8px', fontWeight: '800', color: '#475569', letterSpacing: '1.5px', marginBottom: '4px' }}>GLOBAL READINESS</h3>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <span style={{ fontSize: '28px', fontWeight: '900', color: '#00F2FF', fontFamily: '"Roboto Mono", "JetBrains Mono", monospace', lineHeight: 1, textShadow: '0 0 8px rgba(0, 242, 255, 0.25)' }}>{globalReadiness.toFixed(1)}%</span>
                        </div>
                        <div style={{ marginTop: '6px', width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{
                                width: `${globalReadiness}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #f59e0b, #f97316)',
                                borderRadius: '2px',
                                boxShadow: '0 0 6px #f59e0b40'
                            }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════ MAIN ROW: Funnel + Leaderboard ══════ */}
            <div style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '220px 1fr',
                gap: '12px',
                minHeight: 0,
                position: 'relative',
                zIndex: 1
            }}>
                {/* LEFT: Certification Funnel */}
                <div style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.5)',
                    border: '1px solid #2a2a2a',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                        <Zap size={12} color="#06b6d4" />
                        <h3 style={{ fontSize: '9px', fontWeight: '900', color: '#06b6d4', letterSpacing: '2px' }}>CERTIFICATION FUNNEL</h3>
                    </div>
                    <CertificationFunnel totalTarget={TOTAL_TARGET} totalTheory={TOTAL_THEORY} totalPractice={TOTAL_PRACTICE} />
                    {/* Funnel Stats */}
                    <div style={{
                        marginTop: 'auto',
                        padding: '10px',
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.03)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '8px', color: '#475569', fontWeight: '700', letterSpacing: '1px' }}>CONVERSION</span>
                            <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: '900', fontFamily: '"JetBrains Mono", monospace' }}>
                                {((TOTAL_THEORY / TOTAL_TARGET) * 100).toFixed(1)}%
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '8px', color: '#475569', fontWeight: '700', letterSpacing: '1px' }}>TO PRACTICE</span>
                            <span style={{ fontSize: '10px', color: '#ef4444', fontWeight: '900', fontFamily: '"JetBrains Mono", monospace' }}>0.0%</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Departmental Leaderboard */}
                <div style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.5)',
                    border: '1px solid #2a2a2a',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0,
                    backdropFilter: 'blur(4px)',
                    position: 'relative'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexShrink: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Shield size={12} color="#3b82f6" />
                            <h3 style={{ fontSize: '11px', fontWeight: '900', color: 'white', letterSpacing: '1px' }}>DEPARTMENTAL LEADERBOARD</h3>
                        </div>
                        <span style={{ fontSize: '8px', color: '#475569', fontWeight: '700', letterSpacing: '1px' }}>SORTED BY THEORY COMPLETION ▾</span>
                    </div>

                    {/* Scrollable bar list */}
                    <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
                        {sortedDepts.map((dept, i) => (
                            <LeaderboardBar
                                key={dept.name}
                                dept={dept}
                                maxValue={maxTheory}
                                rank={i + 1}
                                onHover={handleBarHover}
                                onLeave={() => setHoveredDept(null)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ══════ FLOATING TOOLTIP (outside grid to avoid backdropFilter containing block) ══════ */}
            {hoveredDept && (() => {
                const tooltipHeight = 160;
                const topPos = hoveredDept.rank >= 13
                    ? hoveredDept.y - tooltipHeight - 6
                    : hoveredDept.y - tooltipHeight / 2 + 12;
                const clampedTop = Math.max(10, Math.min(topPos, window.innerHeight - tooltipHeight - 10));
                const leftPos = Math.max(10, Math.min(hoveredDept.x - 110, window.innerWidth - 230));
                return (
                    <div style={{
                        position: 'fixed',
                        top: clampedTop,
                        left: leftPos,
                        width: '220px',
                        background: 'rgba(8, 8, 12, 0.96)',
                        backdropFilter: 'blur(30px)',
                        border: '1px solid rgba(0, 242, 255, 0.25)',
                        borderRadius: '12px',
                        padding: '14px',
                        zIndex: 9999,
                        boxShadow: '0 16px 48px rgba(0,0,0,0.7), 0 0 24px rgba(0, 242, 255, 0.06)',
                        pointerEvents: 'none',
                        animation: 'tooltipFadeIn 0.15s ease-out forwards'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <GraduationCap size={14} color="#00F2FF" />
                            <span style={{ fontSize: '12px', fontWeight: '800', color: 'white', textShadow: '0 0 8px rgba(0,0,0,0.8)' }}>{hoveredDept.dept.name}</span>
                        </div>
                        <div style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                <span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '700', letterSpacing: '1px' }}>TARGET REACHED</span>
                                <span style={{
                                    fontSize: '12px', fontWeight: '900',
                                    color: (hoveredDept.dept.theory / hoveredDept.dept.employees * 100) >= 10 ? '#22c55e' : '#f59e0b',
                                    fontFamily: '"Roboto Mono", "JetBrains Mono", monospace',
                                    textShadow: '0 0 8px rgba(0,0,0,0.8)'
                                }}>
                                    {((hoveredDept.dept.theory / hoveredDept.dept.employees) * 100).toFixed(1)}%
                                </span>
                            </div>
                            <div style={{ width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{
                                    width: `${Math.min((hoveredDept.dept.theory / hoveredDept.dept.employees) * 100, 100)}%`,
                                    height: '100%', background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', borderRadius: '2px'
                                }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <AlertTriangle size={10} color="#ef4444" />
                                <span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '700', letterSpacing: '1px' }}>RED-LISTED (NO VOC)</span>
                            </div>
                            <span style={{
                                fontSize: '13px', fontWeight: '900',
                                color: hoveredDept.dept.redListed > 5 ? '#ef4444' : '#f59e0b',
                                fontFamily: '"Roboto Mono", "JetBrains Mono", monospace',
                                textShadow: '0 0 8px rgba(0,0,0,0.8)'
                            }}>
                                {hoveredDept.dept.redListed}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                            <span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '700', letterSpacing: '1px' }}>TOTAL EMPLOYEES</span>
                            <span style={{ fontSize: '11px', fontWeight: '900', color: '#A0A0A0', fontFamily: '"Roboto Mono", monospace', textShadow: '0 0 8px rgba(0,0,0,0.8)' }}>
                                {hoveredDept.dept.employees}
                            </span>
                        </div>
                    </div>
                );
            })()}

            {/* ══════ FOOTER ══════ */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '10px',
                flexShrink: 0,
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <span style={{ fontSize: '9px', color: '#334155', fontWeight: '700', letterSpacing: '1px' }}>CORE_VME_ENGINE_2026</span>
                    <span style={{ fontSize: '9px', color: '#334155', fontWeight: '700', letterSpacing: '1px' }}>TELEMETRY: ENABLED</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '9px', color: '#475569', fontWeight: '700', letterSpacing: '0.5px' }}>System Admin: Dan Kahilu</span>
                    <span style={{ fontSize: '9px', color: '#334155' }}>|</span>
                    <span style={{ fontSize: '9px', color: '#334155', fontWeight: '700' }}>Powered by SafeEquip</span>
                </div>
            </div>

            {/* ══════ ANIMATIONS ══════ */}
            <style>{`
                @keyframes statusPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
                @keyframes flowDot0 {
                    0% { top: 0; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 16px; opacity: 0; }
                }
                @keyframes flowDot1 {
                    0% { top: 0; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 16px; opacity: 0; }
                }
                @keyframes tooltipFadeIn {
                    0% { opacity: 0; transform: translateY(6px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .leaderboard-row:hover {
                    background: rgba(59, 130, 246, 0.03) !important;
                }
                ::-webkit-scrollbar { width: 3px; height: 3px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }
            `}</style>
        </div>
    );
};

export default TrainingVocStats;
