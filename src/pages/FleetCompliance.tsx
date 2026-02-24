
import { useState, useEffect } from 'react';
import {
    Truck, Shield, AlertTriangle, Activity, Gauge, Wrench,
    CheckCircle, XCircle, Users
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell
} from 'recharts';
import { useSafeEquip } from '../context/SafeEquipContext';

// ═══════════════════════════════════════════════
// DATA ENGINE — 8 Contractors, linked to 2,976 operator pool
// Fleet/Compliant data restored from original audited baseline
// ═══════════════════════════════════════════════
const CONTRACTORS = [
    { id: 'MMG', name: 'MMG Kinsevere', fleet: 296, compliant: 113, operators: 842, vocCertified: 161 },
    { id: 'MEXCO', name: 'Mexco Mining', fleet: 112, compliant: 43, operators: 556, vocCertified: 4 },
    { id: 'ML', name: 'Masterlift', fleet: 14, compliant: 11, operators: 195, vocCertified: 2 },
    { id: 'TKM', name: 'TKM', fleet: 21, compliant: 8, operators: 227, vocCertified: 0 },
    { id: 'SOLV', name: 'Solvay', fleet: 38, compliant: 14, operators: 334, vocCertified: 0 },
    { id: 'ITM', name: 'ITM', fleet: 27, compliant: 9, operators: 267, vocCertified: 2 },
    { id: 'NEEM', name: 'Neema', fleet: 19, compliant: 6, operators: 310, vocCertified: 0 },
    { id: 'MALA', name: 'MALA BNK', fleet: 32, compliant: 10, operators: 245, vocCertified: 0 },
];

const TOTAL_FLEET = CONTRACTORS.reduce((s, c) => s + c.fleet, 0);
const TOTAL_COMPLIANT = CONTRACTORS.reduce((s, c) => s + c.compliant, 0);
const TOTAL_NON_COMPLIANT = TOTAL_FLEET - TOTAL_COMPLIANT;
const GLOBAL_RATE = ((TOTAL_COMPLIANT / TOTAL_FLEET) * 100).toFixed(1);
const TOTAL_OPERATORS = 2976;
const TOTAL_VOC = CONTRACTORS.reduce((s, c) => s + c.vocCertified, 0);

// Traffic Light Logic
const getTrafficLight = (rate: number): { color: string, label: string, glow: string } => {
    if (rate >= 90) return { color: '#22c55e', label: 'COMPLIANT', glow: 'rgba(34, 197, 94, 0.4)' };
    if (rate >= 75) return { color: '#f59e0b', label: 'ACTION REQ.', glow: 'rgba(245, 158, 11, 0.4)' };
    return { color: '#ef4444', label: 'CRITICAL', glow: 'rgba(239, 68, 68, 0.4)' };
};

// ═══════════════════════════════════════════════
// RISK RATE ENGINE
// Formula: Risk = 100 - (FleetCompliance×0.6 + VOCRate×0.4)
// Higher = More Dangerous. Combines equipment safety + operator competency.
// ═══════════════════════════════════════════════
const calcRiskRate = (c: typeof CONTRACTORS[0]) => {
    const fleetRate = c.fleet > 0 ? (c.compliant / c.fleet) * 100 : 0;
    const vocRate = c.operators > 0 ? (c.vocCertified / c.operators) * 100 : 0;
    return 100 - (fleetRate * 0.6 + vocRate * 0.4);
};

const getRiskLevel = (riskRate: number): { label: string, color: string, bg: string, glow: string } => {
    if (riskRate >= 60) return { label: 'HIGH RISK', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', glow: '0 0 10px rgba(239,68,68,0.4)' };
    if (riskRate >= 40) return { label: 'MEDIUM', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', glow: '0 0 8px rgba(245,158,11,0.3)' };
    return { label: 'LOW RISK', color: '#22c55e', bg: 'rgba(34,197,94,0.08)', glow: '0 0 6px rgba(34,197,94,0.2)' };
};

// ═══════════════════════════════════════════════
// LED TRAFFIC LIGHT INDICATOR
// ═══════════════════════════════════════════════
const TrafficLED = ({ rate }: { rate: number }) => {
    const statuses = [
        { threshold: 90, color: '#22c55e' },
        { threshold: 75, color: '#f59e0b' },
        { threshold: 0, color: '#ef4444' },
    ];

    return (
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {statuses.map((s, i) => {
                const isActive = (i === 0 && rate >= 90) ||
                    (i === 1 && rate >= 75 && rate < 90) ||
                    (i === 2 && rate < 75);
                return (
                    <div key={i} style={{
                        width: '10px', height: '10px', borderRadius: '50%',
                        backgroundColor: isActive ? s.color : `${s.color}20`,
                        boxShadow: isActive ? `0 0 10px ${s.color}, 0 0 4px ${s.color}` : 'none',
                        transition: 'all 0.3s ease'
                    }} />
                );
            })}
        </div>
    );
};

// ═══════════════════════════════════════════════
// CONTRACTOR CARD (Frosted Glass + Mechanical Pulse)
// ═══════════════════════════════════════════════
const ContractorCard = ({ contractor, index, onHover, onLeave }: {
    contractor: typeof CONTRACTORS[0], index: number,
    onHover: (e: React.MouseEvent, contractor: typeof CONTRACTORS[0], index: number) => void,
    onLeave: () => void
}) => {
    const rate = contractor.fleet > 0 ? (contractor.compliant / contractor.fleet) * 100 : 0;
    const traffic = getTrafficLight(rate);
    const [pulseOpacity, setPulseOpacity] = useState(0.03);

    useEffect(() => {
        const interval = setInterval(() => {
            setPulseOpacity(prev => prev === 0.03 ? 0.08 : 0.03);
        }, 2000 + index * 200);
        return () => clearInterval(interval);
    }, [index]);

    return (
        <div
            onMouseEnter={(e) => onHover(e, contractor, index)}
            onMouseLeave={onLeave}
            style={{
                background: `linear-gradient(145deg, rgba(30,30,30,0.85), rgba(18,18,18,0.95))`,
                border: `1px solid ${traffic.color}30`,
                borderRadius: '12px',
                padding: '14px 16px',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'default',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(12px)'
            }}
        >
            {/* Mechanical Pulse Background */}
            <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse at 50% 80%, ${traffic.color}${Math.round(pulseOpacity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
                transition: 'background 1.5s ease-in-out',
                pointerEvents: 'none'
            }} />

            {/* Header: ID + Traffic LED */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '8px', zIndex: 1
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        padding: '3px 7px', borderRadius: '4px',
                        backgroundColor: `${traffic.color}15`,
                        border: `1px solid ${traffic.color}30`,
                        fontSize: '9px', fontWeight: '900',
                        color: traffic.color, letterSpacing: '1px'
                    }}>{contractor.id}</div>
                    <span style={{
                        fontSize: '11px', fontWeight: '800', color: 'white',
                        textShadow: '0 0 8px rgba(0,0,0,0.8)',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                    }}>{contractor.name}</span>
                </div>
                <TrafficLED rate={rate} />
            </div>

            {/* Compliance Score + Risk Rate */}
            <div style={{ zIndex: 1 }}>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                    marginBottom: '4px'
                }}>
                    <span style={{
                        fontSize: '22px', fontWeight: '900',
                        color: traffic.color,
                        fontFamily: '"Roboto Mono", "JetBrains Mono", monospace',
                        lineHeight: 1,
                        textShadow: `0 0 12px ${traffic.glow}, 0 0 4px rgba(0,0,0,0.8)`
                    }}>{rate.toFixed(1)}%</span>
                    <span style={{
                        fontSize: '8px', fontWeight: '800',
                        color: traffic.color,
                        letterSpacing: '1px',
                        textShadow: '0 0 6px rgba(0,0,0,0.8)'
                    }}>{traffic.label}</span>
                </div>

                {/* Progress bar */}
                <div style={{
                    width: '100%', height: '3px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    borderRadius: '2px', overflow: 'hidden', marginBottom: '6px'
                }}>
                    <div style={{
                        width: `${rate}%`, height: '100%',
                        background: `linear-gradient(90deg, ${traffic.color}80, ${traffic.color})`,
                        borderRadius: '2px',
                        transition: 'width 1s ease-out',
                        boxShadow: `0 0 6px ${traffic.glow}`
                    }} />
                </div>

                {/* ★ RISK RATE BADGE — the key manager indicator */}
                {(() => {
                    const riskRate = calcRiskRate(contractor);
                    const risk = getRiskLevel(riskRate);
                    return (
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '4px 8px',
                            backgroundColor: risk.bg,
                            border: `1px solid ${risk.color}30`,
                            borderRadius: '6px',
                            boxShadow: risk.glow
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <AlertTriangle size={10} color={risk.color} />
                                <span style={{
                                    fontSize: '8px', fontWeight: '900', color: risk.color,
                                    letterSpacing: '1px'
                                }}>{risk.label}</span>
                            </div>
                            <span style={{
                                fontSize: '13px', fontWeight: '900',
                                color: risk.color,
                                fontFamily: '"Roboto Mono", monospace',
                                textShadow: `0 0 8px ${risk.color}60, 0 0 4px rgba(0,0,0,0.8)`
                            }}>{riskRate.toFixed(0)}%</span>
                        </div>
                    );
                })()}
            </div>

            {/* Fleet counts */}
            <div style={{
                display: 'flex', justifyContent: 'space-between',
                marginTop: '8px', zIndex: 1
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Truck size={10} color="#94a3b8" />
                    <span style={{
                        fontSize: '10px', fontWeight: '900', color: 'white',
                        fontFamily: '"Roboto Mono", monospace',
                        textShadow: '0 0 6px rgba(0,0,0,0.8)'
                    }}>{contractor.fleet}</span>
                    <span style={{ fontSize: '8px', color: '#475569', fontWeight: '700' }}>UNITS</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={10} color="#94a3b8" />
                    <span style={{
                        fontSize: '10px', fontWeight: '900', color: '#00F2FF',
                        fontFamily: '"Roboto Mono", monospace',
                        textShadow: '0 0 6px rgba(0,242,255,0.3)'
                    }}>{contractor.operators}</span>
                    <span style={{ fontSize: '8px', color: '#475569', fontWeight: '700' }}>OPS</span>
                </div>
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════
const FleetCompliance = () => {
    const { dataset, TOTAL_POPULATION } = useSafeEquip();
    const activePopulation = TOTAL_POPULATION;
    const [hoveredContractor, setHoveredContractor] = useState<{
        contractor: typeof CONTRACTORS[0], x: number, y: number, index: number
    } | null>(null);

    // Dataset integration for live sync
    void dataset.reduce((s, d) => s + d.vehicles_total, 0);

    const handleCardHover = (e: React.MouseEvent, contractor: typeof CONTRACTORS[0], index: number) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setHoveredContractor({ contractor, x: rect.left + rect.width / 2, y: rect.top, index });
    };

    // Chart data sorted by compliance rate
    const chartData = CONTRACTORS.map(c => ({
        name: c.id,
        compliant: c.compliant,
        nonCompliant: c.fleet - c.compliant,
        rate: c.fleet > 0 ? (c.compliant / c.fleet) * 100 : 0
    })).sort((a, b) => b.rate - a.rate);

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
            {/* ══════ COMMAND BAR ══════ */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '10px', flexShrink: 0
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Gauge size={16} color="#00F2FF" />
                        <h1 style={{
                            fontSize: '16px', fontWeight: '900', letterSpacing: '3px',
                            textTransform: 'uppercase', color: 'white',
                            textShadow: '0 0 10px rgba(0,242,255,0.2)'
                        }}>FLEET COMPLIANCE AUDIT</h1>
                        <div style={{
                            padding: '2px 8px', borderRadius: '4px',
                            backgroundColor: 'rgba(34, 197, 94, 0.08)',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                            fontSize: '8px', fontWeight: '800', color: '#22c55e',
                            letterSpacing: '1.5px'
                        }}>LIVE AUDIT</div>
                    </div>
                    <p style={{
                        fontSize: '10px', color: '#475569', marginTop: '2px',
                        fontWeight: '600', letterSpacing: '0.5px'
                    }}>Contractor Vehicle Conformity · {CONTRACTORS.length} Contractors · {TOTAL_OPERATORS.toLocaleString()} Operators</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{
                        fontSize: '9px', fontWeight: '800', color: '#94a3b8',
                        letterSpacing: '1px', textShadow: '0 0 6px rgba(0,0,0,0.6)'
                    }}>ADMIN: DAN KAHILU</div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'flex-end', marginTop: '2px' }}>
                        <div style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            backgroundColor: '#22c55e', boxShadow: '0 0 6px #22c55e'
                        }} />
                        <span style={{ fontSize: '8px', fontWeight: '800', color: '#22c55e', letterSpacing: '1px' }}>SYNC: ACTIVE</span>
                    </div>
                </div>
            </div>

            {/* ══════ KPI STRIP ══════ */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px',
                marginBottom: '10px', flexShrink: 0
            }}>
                {[
                    { label: 'GLOBAL COMPLIANCE', value: `${GLOBAL_RATE}%`, icon: CheckCircle, color: '#22c55e' },
                    { label: 'TOTAL FLEET', value: TOTAL_FLEET.toString(), icon: Truck, color: '#3b82f6' },
                    { label: 'NON-COMPLIANT', value: TOTAL_NON_COMPLIANT.toString(), icon: XCircle, color: '#ef4444' },
                    { label: 'OPERATOR POOL', value: TOTAL_OPERATORS.toLocaleString(), icon: Users, color: '#00F2FF' },
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

            {/* ══════ MAIN GRID ══════ */}
            <div style={{
                flex: 1, display: 'grid',
                gridTemplateColumns: '1fr 320px',
                gap: '10px', minHeight: 0
            }}>
                {/* LEFT: Contractor Cards Grid */}
                <div style={{
                    background: 'rgba(30,30,30,0.4)',
                    border: '1px solid #2a2a2a',
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex', flexDirection: 'column',
                    minHeight: 0
                }}>
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        marginBottom: '8px', flexShrink: 0
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Shield size={12} color="#3b82f6" />
                            <h3 style={{
                                fontSize: '10px', fontWeight: '900', color: 'white',
                                letterSpacing: '1.5px'
                            }}>CONTRACTOR AUDIT BOARD</h3>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            {/* Traffic Light Legend */}
                            {[
                                { label: '≥90%', color: '#22c55e' },
                                { label: '75-89%', color: '#f59e0b' },
                                { label: '<75%', color: '#ef4444' },
                            ].map((l, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                    <div style={{
                                        width: '6px', height: '6px', borderRadius: '50%',
                                        backgroundColor: l.color, boxShadow: `0 0 4px ${l.color}`
                                    }} />
                                    <span style={{ fontSize: '7px', color: '#64748b', fontWeight: '700' }}>{l.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4x2 Contractor Grid */}
                    <div style={{
                        flex: 1, display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gridTemplateRows: 'repeat(2, 1fr)',
                        gap: '8px',
                        minHeight: 0
                    }}>
                        {CONTRACTORS.map((c, i) => (
                            <ContractorCard
                                key={c.id}
                                contractor={c}
                                index={i}
                                onHover={handleCardHover}
                                onLeave={() => setHoveredContractor(null)}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT: Audit Chart + Summary */}
                <div style={{
                    display: 'flex', flexDirection: 'column', gap: '10px', minHeight: 0
                }}>
                    {/* Compliance Chart */}
                    <div style={{
                        background: 'rgba(30,30,30,0.5)',
                        border: '1px solid #2a2a2a',
                        borderRadius: '12px',
                        padding: '12px',
                        flex: 1, display: 'flex', flexDirection: 'column',
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
                            }}>COMPLIANCE DISTRIBUTION</h3>
                        </div>
                        <div style={{ flex: 1, minHeight: 0 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartData}
                                    layout="vertical"
                                    margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" horizontal vertical={false} />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name" type="category"
                                        tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 800 }}
                                        axisLine={false} tickLine={false} width={40}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                                        contentStyle={{
                                            backgroundColor: 'rgba(8,8,12,0.96)',
                                            border: '1px solid rgba(0,242,255,0.2)',
                                            borderRadius: '8px',
                                            color: 'white',
                                            fontSize: '11px'
                                        }}
                                    />
                                    <Bar dataKey="compliant" name="Compliant" stackId="a" barSize={16} radius={[0, 0, 0, 0]}>
                                        {chartData.map((entry, i) => (
                                            <Cell key={i} fill={getTrafficLight(entry.rate).color} fillOpacity={0.7} />
                                        ))}
                                    </Bar>
                                    <Bar dataKey="nonCompliant" name="Non-Compliant" stackId="a" fill="#ef444450" barSize={16} radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Audit Summary Panel */}
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
                            <Wrench size={10} color="#3b82f6" />
                            <span style={{
                                fontSize: '8px', fontWeight: '900', color: 'white',
                                letterSpacing: '1.5px'
                            }}>AUDIT INTELLIGENCE</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {(() => {
                                const highestComp = [...CONTRACTORS].sort((a, b) => (b.compliant / b.fleet) - (a.compliant / a.fleet))[0];
                                const highestRate = ((highestComp.compliant / highestComp.fleet) * 100).toFixed(1);
                                const riskiest = [...CONTRACTORS].sort((a, b) => calcRiskRate(b) - calcRiskRate(a))[0];
                                const riskiestScore = calcRiskRate(riskiest).toFixed(0);
                                return [
                                    { label: 'Highest Compliance', value: highestComp.name, detail: `${highestRate}%`, color: '#22c55e' },
                                    { label: 'Highest Risk', value: riskiest.name, detail: `Risk: ${riskiestScore}%`, color: '#ef4444' },
                                    { label: 'Machine:Operator Ratio', value: `1 : ${(TOTAL_OPERATORS / TOTAL_FLEET).toFixed(1)}`, detail: 'Fleet-wide', color: '#00F2FF' },
                                    { label: 'VOC Certified Operators', value: `${TOTAL_VOC} / ${TOTAL_OPERATORS.toLocaleString()}`, detail: `${((TOTAL_VOC / TOTAL_OPERATORS) * 100).toFixed(1)}%`, color: '#f59e0b' },
                                ].map((item, i) => (
                                    <div key={i} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '5px 8px',
                                        backgroundColor: 'rgba(255,255,255,0.02)',
                                        borderRadius: '6px'
                                    }}>
                                        <span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.5px' }}>{item.label}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{
                                                fontSize: '10px', fontWeight: '900', color: 'white',
                                                fontFamily: '"Roboto Mono", monospace',
                                                textShadow: '0 0 6px rgba(0,0,0,0.8)'
                                            }}>{item.value}</span>
                                            <span style={{
                                                fontSize: '8px', fontWeight: '800', color: item.color,
                                                fontFamily: '"Roboto Mono", monospace'
                                            }}>{item.detail}</span>
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════ FLOATING TOOLTIP ══════ */}
            {hoveredContractor && (() => {
                const c = hoveredContractor.contractor;
                const rate = c.fleet > 0 ? (c.compliant / c.fleet) * 100 : 0;
                const traffic = getTrafficLight(rate);
                const riskRate = calcRiskRate(c);
                const risk = getRiskLevel(riskRate);
                const vocRate = c.operators > 0 ? (c.vocCertified / c.operators * 100) : 0;
                const tooltipHeight = 200;
                // Smart positioning: bottom row (index >= 4) → open UPWARD
                const isBottomRow = hoveredContractor.index >= 4;
                const topPos = isBottomRow
                    ? hoveredContractor.y - tooltipHeight - 8
                    : hoveredContractor.y + 160;
                const clampedTop = Math.max(10, Math.min(topPos, window.innerHeight - tooltipHeight - 10));
                const leftPos = Math.max(10, Math.min(hoveredContractor.x - 110, window.innerWidth - 240));

                return (
                    <div style={{
                        position: 'fixed',
                        top: clampedTop, left: leftPos,
                        width: '220px',
                        background: 'rgba(8, 8, 12, 0.96)',
                        backdropFilter: 'blur(30px)',
                        border: `1px solid ${risk.color}40`,
                        borderRadius: '10px',
                        padding: '12px',
                        zIndex: 9999,
                        boxShadow: `0 16px 48px rgba(0,0,0,0.7), 0 0 20px ${risk.glow}`,
                        pointerEvents: 'none'
                    }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            marginBottom: '8px', paddingBottom: '6px',
                            borderBottom: '1px solid rgba(255,255,255,0.08)'
                        }}>
                            <Truck size={12} color={traffic.color} />
                            <span style={{
                                fontSize: '11px', fontWeight: '800', color: 'white',
                                textShadow: '0 0 8px rgba(0,0,0,0.8)'
                            }}>{c.name}</span>
                            <TrafficLED rate={rate} />
                        </div>

                        {/* Risk Rate Banner */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '5px 8px', marginBottom: '8px',
                            backgroundColor: risk.bg,
                            border: `1px solid ${risk.color}35`,
                            borderRadius: '6px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <AlertTriangle size={10} color={risk.color} />
                                <span style={{
                                    fontSize: '9px', fontWeight: '900', color: risk.color,
                                    letterSpacing: '1px'
                                }}>{risk.label}</span>
                            </div>
                            <span style={{
                                fontSize: '14px', fontWeight: '900', color: risk.color,
                                fontFamily: '"Roboto Mono", monospace',
                                textShadow: `0 0 8px ${risk.color}60`
                            }}>{riskRate.toFixed(0)}%</span>
                        </div>

                        {[
                            { label: 'FLEET COMPLIANCE', value: `${c.compliant} / ${c.fleet}`, detail: `${rate.toFixed(1)}%`, color: traffic.color },
                            { label: 'VOC CERTIFIED', value: `${c.vocCertified} / ${c.operators}`, detail: `${vocRate.toFixed(1)}%`, color: vocRate > 0 ? '#22c55e' : '#ef4444' },
                            { label: 'OPERATORS', value: c.operators.toLocaleString(), detail: '', color: '#00F2FF' },
                        ].map((row, i) => (
                            <div key={i} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                marginBottom: '4px'
                            }}>
                                <span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '700', letterSpacing: '1px' }}>{row.label}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{
                                        fontSize: '11px', fontWeight: '900', color: 'white',
                                        fontFamily: '"Roboto Mono", monospace',
                                        textShadow: '0 0 6px rgba(0,0,0,0.8)'
                                    }}>{row.value}</span>
                                    {row.detail && <span style={{
                                        fontSize: '9px', fontWeight: '800', color: row.color,
                                        fontFamily: '"Roboto Mono", monospace'
                                    }}>{row.detail}</span>}
                                </div>
                            </div>
                        ))}
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
        </div>
    );
};

export default FleetCompliance;
