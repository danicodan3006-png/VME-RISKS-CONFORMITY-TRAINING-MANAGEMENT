
import { useState, useEffect } from 'react';
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';
import {
    Target, Users, Zap, Circle, X, PlayCircle, Shield, Activity,
    AlertTriangle, Radio, Eye
} from 'lucide-react';

// ═══════════════════════════════════════════════
// DATA ENGINE — synced with Training page (2,976 total)
// ═══════════════════════════════════════════════
const departmentalData = [
    { name: 'Mining', sensitized: 112, total: 1398 },
    { name: 'Transport', sensitized: 67, total: 195 },
    { name: 'SSHEC', sensitized: 34, total: 157 },
    { name: 'Exploration', sensitized: 0, total: 57 },
    { name: 'Supply Chain', sensitized: 0, total: 69 },
    { name: 'Finance', sensitized: 0, total: 6 },
    { name: 'Hydromet', sensitized: 0, total: 53 },
    { name: 'Tailings', sensitized: 0, total: 78 },
    { name: 'Sulphite', sensitized: 0, total: 167 },
    { name: 'HR & Medical', sensitized: 0, total: 26 },
    { name: 'Compliance', sensitized: 0, total: 8 },
    { name: 'Stakeholder', sensitized: 0, total: 5 },
    { name: 'People Svcs', sensitized: 0, total: 5 },
    { name: 'Project Del', sensitized: 0, total: 29 },
    { name: 'Civil Svcs', sensitized: 0, total: 227 },
    { name: 'Lean Prod', sensitized: 0, total: 167 },
    { name: 'Farm & Camp', sensitized: 0, total: 56 },
    { name: 'Debottlenecking', sensitized: 0, total: 17 },
    { name: 'Central Lab', sensitized: 0, total: 39 },
];

const TOTAL_POP = 2976;
const TOTAL_SENSITIZED = departmentalData.reduce((s, d) => s + d.sensitized, 0);
const GLOBAL_PCT = ((TOTAL_SENSITIZED / TOTAL_POP) * 100).toFixed(1);

const topicSpeeches: Record<number, { title: string, content: string }> = {
    1: {
        title: "Your Permit, Your Responsibility, Our Commitment",
        content: "Vision 2026 – Your Permit, Your Responsibility, Our Commitment. Safety is not a choice; it is a prerequisite for every task. Your permit is your license to operate safely. It represents the professional standard we demand at VME. When you sign that permit, you are making a binding commitment to your family and your colleagues that you have assessed every risk and implemented every barrier. We do not work for stickers or bonuses; we work to return home whole."
    },
    2: {
        title: "Why Do You Break the Rules?",
        content: "Why Do You Break the Rules? In the field, we often find shortcuts convenient, but in our industry, a shortcut is a high-speed path to disaster. Rules aren't there to slow you down; they are the distilled wisdom of every accident that came before us. Breaking a rule is a vote of no confidence in your own future. We are investigating the human factor: Is it pressure? Is it habit? Whatever the cause, the rule remains the only shield between you and a life-altering event."
    },
    3: {
        title: "Zero Exposure",
        content: "Zero Exposure – Do we really need a disaster to happen before we change? Prevention is the only cure. Zero exposure means eliminating risks at the source, not just managing them when they appear. It requires a proactive eye and the courage to stop the job. If you see an exposed hazard, you are the final barrier. We are shifting from reactive management to absolute elimination. No exposure, no accident. It is that simple."
    },
    4: {
        title: "Excellence",
        content: "Excellence – What makes a TRULY safe operation? It's the culture of care. Excellence is not a destination but a continuous habit of checking and re-checking. It is the obsessive attention to detail that separates the survivors from the statistics. A safe operator doesn't just do the job; they do the job perfectly, every single time. Excellence is the professional pride only found in those who master their craft and their environment."
    },
    5: {
        title: "The Domino Effect",
        content: "The Domino Effect – Who really pays the price for a mistake? It's not just the company; it's the families waiting at home. One small error starts the chain that leads to a catastrophic outcome. When one tile falls—a missed check, a tired eye, a bypassed sensor—the rest follow inevitably. You aren't just one person on a machine; you are a critical link in a massive chain of safety. If you break, the whole system collapses."
    }
};

const roadmap = [
    { id: 1, month: 'MONTH 1', topic: 'Your Permit, Your Responsibility', status: 'IN PROGRESS', active: true },
    { id: 2, month: 'MONTH 2', topic: 'Why Do You Break the Rules?', status: 'PLANNED', active: false },
    { id: 3, month: 'MONTH 3', topic: 'Zero Exposure', status: 'PLANNED', active: false },
    { id: 4, month: 'MONTH 4', topic: 'Excellence', status: 'PLANNED', active: false },
    { id: 5, month: 'MONTH 5', topic: 'The Domino Effect', status: 'PLANNED', active: false },
];

// Radar data: Current Awareness vs Target Baseline
const radarData = [
    { axis: 'Permit Awareness', current: 72, target: 90 },
    { axis: 'Rule Compliance', current: 45, target: 85 },
    { axis: 'Hazard ID', current: 60, target: 90 },
    { axis: 'Emergency Readiness', current: 38, target: 80 },
    { axis: 'Peer Vigilance', current: 55, target: 85 },
    { axis: 'PPE Discipline', current: 80, target: 95 },
];

// ═══════════════════════════════════════════════
// TOPIC MODAL (preserved)
// ═══════════════════════════════════════════════
const TopicModal = ({ isOpen, onClose, topicId }: { isOpen: boolean, onClose: () => void, topicId: number | null }) => {
    if (!isOpen || topicId === null) return null;
    const topic = topicSpeeches[topicId];
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(10px)',
            zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px'
        }}>
            <div style={{
                backgroundColor: '#1E1E1E', width: '100%', maxWidth: '800px',
                borderRadius: '16px', border: '1px solid #333', overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ padding: '24px 32px', backgroundColor: '#252525', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '2px' }}>MONTH {topicId} STRATEGY</span>
                        <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white', marginTop: '4px' }}>{topic.title}</h2>
                    </div>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', outline: 'none' }}>
                        <X size={24} />
                    </button>
                </div>
                <div style={{ padding: '40px 32px' }}>
                    <p style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: '1.8', whiteSpace: 'pre-line' }}>{topic.content}</p>
                </div>
                <div style={{ padding: '24px 32px', borderTop: '1px solid #333', textAlign: 'right' }}>
                    <button onClick={onClose} style={{
                        padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white',
                        border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
                    }}>Close Strategy</button>
                </div>
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════
// BENTO CELL — Department Awareness Card
// ═══════════════════════════════════════════════
const BentoCell = ({ dept, index, onHover, onLeave }: {
    dept: typeof departmentalData[0], index: number,
    onHover: (e: React.MouseEvent, dept: typeof departmentalData[0], index: number) => void,
    onLeave: () => void
}) => {
    const pct = dept.total > 0 ? (dept.sensitized / dept.total) * 100 : 0;
    const glowIntensity = Math.min(pct / 100, 1);
    const barColor = pct > 50 ? '#22c55e' : pct > 20 ? '#f59e0b' : pct > 0 ? '#3b82f6' : '#334155';

    return (
        <div
            onMouseEnter={(e) => onHover(e, dept, index)}
            onMouseLeave={onLeave}
            style={{
                background: `linear-gradient(145deg, rgba(30,30,30,0.9), rgba(20,20,20,0.95))`,
                border: `1px solid ${pct > 0 ? `rgba(0, 242, 255, ${0.15 + glowIntensity * 0.3})` : '#2a2a2a'}`,
                borderRadius: '10px',
                padding: '10px 12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'default',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '62px',
                boxShadow: pct > 0
                    ? `0 0 ${8 + glowIntensity * 12}px rgba(0, 242, 255, ${0.03 + glowIntensity * 0.06})`
                    : 'none'
            }}
        >
            {/* Gradient glow overlay */}
            {pct > 0 && (
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: `${Math.max(pct, 10)}%`,
                    background: `linear-gradient(180deg, transparent, rgba(59, 130, 246, ${0.04 + glowIntensity * 0.08}))`,
                    pointerEvents: 'none'
                }} />
            )}

            {/* Department name */}
            <div style={{
                fontSize: '9px', fontWeight: '800', color: '#94a3b8',
                letterSpacing: '0.5px', textTransform: 'uppercase',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                textShadow: '0 0 6px rgba(0,0,0,0.6)', zIndex: 1
            }}>{dept.name}</div>

            {/* Stats row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 1, marginTop: '4px' }}>
                <span style={{
                    fontSize: '16px', fontWeight: '900',
                    color: '#00F2FF',
                    fontFamily: '"Roboto Mono", monospace',
                    textShadow: '0 0 8px rgba(0,242,255,0.3), 0 0 4px rgba(0,0,0,0.8)',
                    lineHeight: 1
                }}>{dept.total.toLocaleString()}</span>
                <span style={{
                    fontSize: '11px', fontWeight: '900',
                    color: barColor,
                    fontFamily: '"Roboto Mono", monospace',
                    textShadow: '0 0 6px rgba(0,0,0,0.8)'
                }}>{pct.toFixed(1)}%</span>
            </div>

            {/* Mini progress bar */}
            <div style={{
                width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.06)',
                borderRadius: '2px', overflow: 'hidden', marginTop: '4px', zIndex: 1
            }}>
                <div style={{
                    width: `${Math.max(pct, 0)}%`,
                    height: '100%',
                    background: pct > 0 ? `linear-gradient(90deg, ${barColor}, #06b6d4)` : 'transparent',
                    borderRadius: '2px',
                    transition: 'width 1s ease-out'
                }} />
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════
// PULSING RADAR CHART
// ═══════════════════════════════════════════════
const PulsingDot = ({ cx, cy, color }: { cx?: number, cy?: number, color: string }) => {
    const [opacity, setOpacity] = useState(1);
    useEffect(() => {
        const interval = setInterval(() => {
            setOpacity(prev => prev === 1 ? 0.4 : 1);
        }, 1500);
        return () => clearInterval(interval);
    }, []);
    if (!cx || !cy) return null;
    return (
        <circle
            cx={cx} cy={cy} r={4}
            fill={color} stroke={color} strokeWidth={2}
            opacity={opacity}
            style={{ transition: 'opacity 0.8s ease-in-out' }}
        />
    );
};

// ═══════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════
const SafetyAwareness = () => {
    const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoveredCell, setHoveredCell] = useState<{
        dept: typeof departmentalData[0], x: number, y: number, index: number
    } | null>(null);

    const handleOpenModal = (id: number) => {
        setSelectedTopic(id);
        setIsModalOpen(true);
    };

    const handleCellHover = (e: React.MouseEvent, dept: typeof departmentalData[0], index: number) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setHoveredCell({ dept, x: rect.left + rect.width / 2, y: rect.top, index });
    };

    // Sort by population desc for visual weight
    const sortedDepts = [...departmentalData].sort((a, b) => b.total - a.total);

    return (
        <div style={{
            backgroundColor: '#121212',
            height: '100%', width: '100%',
            color: 'white',
            padding: '14px 18px',
            fontFamily: '"Inter", sans-serif',
            display: 'flex', flexDirection: 'column',
            boxSizing: 'border-box',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* ══════ HEADER ══════ */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '10px', flexShrink: 0
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Radio size={16} color="#00F2FF" />
                        <h1 style={{
                            fontSize: '16px', fontWeight: '900', letterSpacing: '3px',
                            textTransform: 'uppercase', color: 'white',
                            textShadow: '0 0 10px rgba(0,242,255,0.2)'
                        }}>SAFETY WEATHER STATION</h1>
                        <div style={{
                            padding: '2px 8px', borderRadius: '4px',
                            backgroundColor: 'rgba(0, 242, 255, 0.08)',
                            border: '1px solid rgba(0, 242, 255, 0.2)',
                            fontSize: '8px', fontWeight: '800', color: '#00F2FF',
                            letterSpacing: '1.5px'
                        }}>AWARENESS MONITOR</div>
                    </div>
                    <p style={{
                        fontSize: '10px', color: '#475569', marginTop: '2px',
                        fontWeight: '600', letterSpacing: '0.5px'
                    }}>Live Engagement Telemetry · Population: {TOTAL_POP.toLocaleString()} · Synced from Master Data</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        backgroundColor: '#22c55e',
                        boxShadow: '0 0 8px #22c55e',
                        animation: 'pulse 2s ease-in-out infinite'
                    }} />
                    <span style={{ fontSize: '9px', fontWeight: '800', color: '#22c55e', letterSpacing: '1.5px' }}>SYNC: ACTIVE</span>
                </div>
            </div>

            {/* ══════ KPI STRIP ══════ */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px',
                marginBottom: '10px', flexShrink: 0
            }}>
                {[
                    { label: 'TOTAL POPULATION', value: TOTAL_POP.toLocaleString(), icon: Users, color: '#3b82f6' },
                    { label: 'SENSITIZED', value: TOTAL_SENSITIZED.toString(), icon: Shield, color: '#00F2FF' },
                    { label: 'AWARENESS RATE', value: `${GLOBAL_PCT}%`, icon: Activity, color: '#f59e0b' },
                    { label: 'ACTIVE TOPIC', value: 'TOPIC 1 / 5', icon: Target, color: '#22c55e' },
                ].map((kpi, i) => (
                    <div key={i} style={{
                        background: 'linear-gradient(145deg, rgba(30,30,30,0.7), rgba(20,20,20,0.9))',
                        border: `1px solid ${kpi.color}25`,
                        borderRadius: '10px',
                        padding: '10px 14px',
                        display: 'flex', alignItems: 'center', gap: '10px'
                    }}>
                        <div style={{
                            padding: '8px', borderRadius: '8px',
                            background: `linear-gradient(135deg, ${kpi.color}15, ${kpi.color}08)`,
                            border: `1px solid ${kpi.color}20`
                        }}>
                            <kpi.icon size={16} color={kpi.color} strokeWidth={2.5} />
                        </div>
                        <div>
                            <div style={{
                                fontSize: '7px', fontWeight: '800', color: '#64748b',
                                letterSpacing: '1.2px', marginBottom: '2px'
                            }}>{kpi.label}</div>
                            <div style={{
                                fontSize: '18px', fontWeight: '900', color: kpi.color,
                                fontFamily: '"Roboto Mono", monospace',
                                textShadow: `0 0 10px ${kpi.color}40, 0 0 4px rgba(0,0,0,0.8)`,
                                lineHeight: 1
                            }}>{kpi.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ══════ MAIN GRID: BENTO + RADAR + ROADMAP ══════ */}
            <div style={{
                flex: 1, display: 'grid',
                gridTemplateColumns: '1fr 280px',
                gap: '10px',
                minHeight: 0
            }}>
                {/* LEFT: Bento Grid (Awareness Map) */}
                <div style={{
                    background: 'rgba(30,30,30,0.4)',
                    border: '1px solid #2a2a2a',
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex', flexDirection: 'column',
                    minHeight: 0
                }}>
                    {/* Section header */}
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        marginBottom: '8px', flexShrink: 0
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Eye size={12} color="#3b82f6" />
                            <h3 style={{
                                fontSize: '10px', fontWeight: '900', color: 'white',
                                letterSpacing: '1.5px'
                            }}>DEPARTMENTAL AWARENESS MAP</h3>
                        </div>
                        <span style={{
                            fontSize: '8px', color: '#475569', fontWeight: '700',
                            letterSpacing: '1px'
                        }}>{departmentalData.length} DEPARTMENTS · SORTED BY POPULATION ▾</span>
                    </div>

                    {/* Bento Grid */}
                    <div style={{
                        flex: 1, display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: '6px',
                        overflowY: 'auto',
                        paddingRight: '4px'
                    }}>
                        {sortedDepts.map((dept, i) => (
                            <BentoCell
                                key={dept.name}
                                dept={dept}
                                index={i}
                                onHover={handleCellHover}
                                onLeave={() => setHoveredCell(null)}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT: Radar + Roadmap stack */}
                <div style={{
                    display: 'flex', flexDirection: 'column', gap: '10px', minHeight: 0
                }}>
                    {/* Engagement Radar */}
                    <div style={{
                        background: 'rgba(30,30,30,0.5)',
                        border: '1px solid #2a2a2a',
                        borderRadius: '12px',
                        padding: '12px',
                        flex: 1,
                        display: 'flex', flexDirection: 'column',
                        minHeight: 0
                    }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            marginBottom: '8px', flexShrink: 0
                        }}>
                            <Activity size={12} color="#f59e0b" />
                            <h3 style={{
                                fontSize: '10px', fontWeight: '900', color: 'white',
                                letterSpacing: '1.5px'
                            }}>ENGAGEMENT RADAR</h3>
                        </div>

                        {/* Legend */}
                        <div style={{
                            display: 'flex', gap: '12px', marginBottom: '4px', flexShrink: 0
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <div style={{
                                    width: '8px', height: '8px', borderRadius: '2px',
                                    backgroundColor: '#00F2FF'
                                }} />
                                <span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '700' }}>CURRENT</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <div style={{
                                    width: '8px', height: '8px', borderRadius: '2px',
                                    backgroundColor: '#f59e0b'
                                }} />
                                <span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '700' }}>TARGET</span>
                            </div>
                        </div>

                        <div style={{ flex: 1, minHeight: 0 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                                    <PolarGrid stroke="#2a2a2a" />
                                    <PolarAngleAxis
                                        dataKey="axis"
                                        tick={{ fill: '#94a3b8', fontSize: 8, fontWeight: 700 }}
                                    />
                                    <PolarRadiusAxis
                                        angle={30} domain={[0, 100]}
                                        tick={{ fill: '#475569', fontSize: 7 }}
                                        axisLine={false}
                                    />
                                    <Radar
                                        name="Target" dataKey="target"
                                        stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.08}
                                        strokeWidth={1.5} strokeDasharray="4 2"
                                    />
                                    <Radar
                                        name="Current" dataKey="current"
                                        stroke="#00F2FF" fill="#00F2FF" fillOpacity={0.12}
                                        strokeWidth={2}
                                        dot={<PulsingDot color="#00F2FF" />}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Strategic Roadmap Mini */}
                    <div style={{
                        background: 'rgba(30,30,30,0.5)',
                        border: '1px solid #2a2a2a',
                        borderRadius: '12px',
                        padding: '10px 12px',
                        flexShrink: 0
                    }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            marginBottom: '8px'
                        }}>
                            <Zap size={10} color="#3b82f6" />
                            <span style={{
                                fontSize: '8px', fontWeight: '900', color: 'white',
                                letterSpacing: '1.5px'
                            }}>STRATEGIC TOPIC ROADMAP</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {roadmap.map((item) => (
                                <div key={item.id} style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    padding: '6px 8px',
                                    backgroundColor: item.active ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                                    border: item.active ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                    onClick={() => handleOpenModal(item.id)}
                                >
                                    {item.active ?
                                        <Zap size={10} color="#3b82f6" /> :
                                        <Circle size={8} color="#334155" />
                                    }
                                    <span style={{
                                        fontSize: '9px', fontWeight: '700',
                                        color: item.active ? 'white' : '#64748b',
                                        flex: 1, whiteSpace: 'nowrap', overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>{item.topic}</span>
                                    <span style={{
                                        fontSize: '7px', fontWeight: '800',
                                        color: item.active ? '#3b82f6' : '#334155',
                                        letterSpacing: '0.5px'
                                    }}>{item.status}</span>
                                    <PlayCircle size={10} color={item.active ? '#3b82f6' : '#334155'} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════ FLOATING TOOLTIP (outside grid for correct fixed positioning) ══════ */}
            {hoveredCell && (() => {
                const tooltipHeight = 120;
                // Smart positioning: bottom rows → open upward
                const isBottomRow = hoveredCell.index >= 15;
                const topPos = isBottomRow
                    ? hoveredCell.y - tooltipHeight - 8
                    : hoveredCell.y + 70;
                const clampedTop = Math.max(10, Math.min(topPos, window.innerHeight - tooltipHeight - 10));
                const leftPos = Math.max(10, Math.min(hoveredCell.x - 100, window.innerWidth - 220));
                const pct = hoveredCell.dept.total > 0 ? (hoveredCell.dept.sensitized / hoveredCell.dept.total * 100) : 0;

                return (
                    <div style={{
                        position: 'fixed',
                        top: clampedTop, left: leftPos,
                        width: '200px',
                        background: 'rgba(8, 8, 12, 0.96)',
                        backdropFilter: 'blur(30px)',
                        border: '1px solid rgba(0, 242, 255, 0.25)',
                        borderRadius: '10px',
                        padding: '12px',
                        zIndex: 9999,
                        boxShadow: '0 16px 48px rgba(0,0,0,0.7), 0 0 20px rgba(0, 242, 255, 0.06)',
                        pointerEvents: 'none'
                    }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            marginBottom: '8px', paddingBottom: '6px',
                            borderBottom: '1px solid rgba(255,255,255,0.08)'
                        }}>
                            <Shield size={12} color="#00F2FF" />
                            <span style={{
                                fontSize: '11px', fontWeight: '800', color: 'white',
                                textShadow: '0 0 8px rgba(0,0,0,0.8)'
                            }}>{hoveredCell.dept.name}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '700', letterSpacing: '1px' }}>SENSITIZED</span>
                            <span style={{
                                fontSize: '12px', fontWeight: '900', color: '#00F2FF',
                                fontFamily: '"Roboto Mono", monospace',
                                textShadow: '0 0 8px rgba(0,242,255,0.3)'
                            }}>{hoveredCell.dept.sensitized} / {hoveredCell.dept.total.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '700', letterSpacing: '1px' }}>AWARENESS</span>
                            <span style={{
                                fontSize: '12px', fontWeight: '900',
                                color: pct >= 20 ? '#22c55e' : pct > 0 ? '#f59e0b' : '#ef4444',
                                fontFamily: '"Roboto Mono", monospace',
                                textShadow: '0 0 8px rgba(0,0,0,0.8)'
                            }}>{pct.toFixed(1)}%</span>
                        </div>
                        <div style={{
                            width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.06)',
                            borderRadius: '2px', overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${Math.max(pct, 0)}%`, height: '100%',
                                background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                                borderRadius: '2px'
                            }} />
                        </div>
                        {hoveredCell.dept.sensitized === 0 && (
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '4px',
                                marginTop: '6px'
                            }}>
                                <AlertTriangle size={10} color="#ef4444" />
                                <span style={{
                                    fontSize: '8px', color: '#ef4444', fontWeight: '700',
                                    letterSpacing: '0.5px'
                                }}>NOT YET SENSITIZED</span>
                            </div>
                        )}
                    </div>
                );
            })()}

            {/* ══════ FOOTER ══════ */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginTop: '10px', flexShrink: 0, position: 'relative', zIndex: 1
            }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <span style={{ fontSize: '9px', color: '#475569', fontWeight: '700', letterSpacing: '1px' }}>IMPACT THE MINDSET</span>
                    <span style={{ fontSize: '9px', color: '#475569', fontWeight: '700', letterSpacing: '1px' }}>VME 2026</span>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{ fontSize: '9px', color: '#334155', fontWeight: '700', letterSpacing: '1px' }}>
                        System Admin: Dan Kahilu
                    </span>
                    <span style={{ fontSize: '9px', color: '#334155', fontWeight: '700', letterSpacing: '1px' }}>
                        Powered by SafeEquip
                    </span>
                </div>
            </div>

            {/* ══════ PULSE ANIMATION ══════ */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.3); }
                }
            `}</style>

            {/* Modal Engine */}
            <TopicModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                topicId={selectedTopic}
            />
        </div>
    );
};

export default SafetyAwareness;
