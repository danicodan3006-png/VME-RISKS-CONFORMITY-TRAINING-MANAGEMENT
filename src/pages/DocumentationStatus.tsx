import { useState, useEffect } from 'react';
import {
    FolderOpen, FileText, Download, Eye, Shield, Award,
    CheckCircle, Circle, AlertTriangle, Gauge, BadgeCheck, BookOpen,
    ClipboardCheck, GraduationCap, Truck
} from 'lucide-react';

// ═══════════════════════════════════════════════
// RESOURCE & GOVERNANCE CENTER — VME 2026
// File Manager Style · 2,976 Operators · 30 Equipment Units
// ═══════════════════════════════════════════════
const TOTAL_OPERATORS = 2976;

// ── FOLDER A: Governance & SOPs ──
const FOLDER_A = {
    label: 'Governance & SOPs',
    icon: BookOpen,
    color: '#00F2FF',
    items: [
        { type: 'SOP', title: 'HSSEC Inspection', version: 'V3.2', pages: 42, size: '2.4 MB' },
        { type: 'Guideline', title: 'VOC Management', version: 'V2.1', pages: 28, size: '1.8 MB' },
    ]
};

// ── FOLDER B: Smart Forms (New Standards) ──
const FOLDER_B = {
    label: 'Smart Forms (New Standards)',
    icon: FileText,
    color: '#3b82f6',
    items: [
        { type: 'NEW', title: 'VME Safety Inspection Form', subtitle: 'Fleet Health & Accident Prevention', version: 'V1.0', size: '850 KB' },
        { type: 'NEW', title: 'VOC Attendance Register', subtitle: 'Driver-Equipment Risk Traceability', version: 'V1.0', size: '620 KB' },
        { type: 'STD', title: 'VOC Request Form V1.0', subtitle: 'Exposure Control: Competence > Quantity', version: 'V1.0', size: '480 KB' },
    ]
};

// ── FOLDER C: Theory Academy ──
const FOLDER_C = {
    label: 'Theoretical Academy',
    icon: GraduationCap,
    color: '#f59e0b',
    items: [
        { type: 'BANK', title: 'Master Question Bank', subtitle: '250+ questions per unit · 30 categories', version: '2026', size: '4.2 MB' },
    ]
};

// ── FOLDER D: Practical Evaluations ──
const FOLDER_D = {
    label: 'Practical Evaluations',
    icon: ClipboardCheck,
    color: '#22c55e',
    items: [
        { type: 'FORM', title: 'Attitude-Based Field Assessment Forms', subtitle: 'Mindset over Tech · 5 evaluation criteria', version: 'V2.0', size: '1.1 MB' },
    ]
};

const ALL_FOLDERS = [FOLDER_A, FOLDER_B, FOLDER_C, FOLDER_D];

// ── 30 EQUIPMENT MATRIX (The VME LIST) ──
const EQUIPMENT: { id: number, name: string, sop: boolean, theory: boolean, practice: boolean }[] = [
    { id: 1, name: 'ADT (Articulated Dump)', sop: true, theory: true, practice: true },
    { id: 2, name: 'Rigid Truck 100T', sop: true, theory: true, practice: false },
    { id: 3, name: 'Excavator CAT 390F', sop: true, theory: true, practice: true },
    { id: 4, name: 'Wheel Loader CAT 966', sop: true, theory: true, practice: false },
    { id: 5, name: 'Motor Grader CAT 14M', sop: true, theory: true, practice: false },
    { id: 6, name: 'Truck Dozer CAT D8', sop: true, theory: true, practice: false },
    { id: 7, name: 'Bulldozer CAT D6', sop: true, theory: true, practice: false },
    { id: 8, name: 'Backhoe Loader', sop: true, theory: true, practice: true },
    { id: 9, name: 'Tipper HOWO 35T', sop: true, theory: true, practice: true },
    { id: 10, name: 'Site Driver LV', sop: true, theory: true, practice: true },
    { id: 11, name: 'Mobile Crane 50T', sop: true, theory: true, practice: true },
    { id: 12, name: 'Boom Truck', sop: true, theory: true, practice: false },
    { id: 13, name: 'Forklift 5T', sop: true, theory: true, practice: true },
    { id: 14, name: 'Telehandler JCB 540', sop: true, theory: true, practice: false },
    { id: 15, name: 'Aerial Work Platform', sop: true, theory: true, practice: true },
    { id: 16, name: 'Skid Steer Loader', sop: true, theory: true, practice: false },
    { id: 17, name: 'Mini Excavator 8T', sop: true, theory: true, practice: true },
    { id: 18, name: 'Compactor Roller', sop: true, theory: false, practice: false },
    { id: 19, name: 'Water Bowser 20KL', sop: true, theory: false, practice: false },
    { id: 20, name: 'Fuel Bowser', sop: true, theory: false, practice: false },
    { id: 21, name: 'Service Truck', sop: true, theory: true, practice: true },
    { id: 22, name: 'Ambulance (Site)', sop: true, theory: true, practice: true },
    { id: 23, name: 'Personnel Carrier', sop: true, theory: true, practice: true },
    { id: 24, name: 'Flatbed Trailer', sop: true, theory: true, practice: false },
    { id: 25, name: 'Lowbed Trailer 60T', sop: true, theory: false, practice: false },
    { id: 26, name: 'Concrete Mixer', sop: true, theory: false, practice: false },
    { id: 27, name: 'Drill Rig (Blast)', sop: true, theory: false, practice: false },
    { id: 28, name: 'Shotcrete Machine', sop: false, theory: false, practice: false },
    { id: 29, name: 'Underground Loader', sop: false, theory: false, practice: false },
    { id: 30, name: 'Integrated Tool Carrier', sop: true, theory: false, practice: false },
];

const STATS = {
    sopReady: EQUIPMENT.filter(e => e.sop).length,
    theoryReady: EQUIPMENT.filter(e => e.theory).length,
    practiceReady: EQUIPMENT.filter(e => e.practice).length,
    fullReady: EQUIPMENT.filter(e => e.sop && e.theory && e.practice).length,
};

// ═══════════════════════════════════════════════
// DOC ROW COMPONENT — Clean list view with Download/Preview
// ═══════════════════════════════════════════════
const DocRow = ({ item, folderColor, isLast }: {
    item: { type: string, title: string, subtitle?: string, version: string, size?: string, pages?: number },
    folderColor: string,
    isLast: boolean
}) => {
    const isNew = item.type === 'NEW';
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '7px 10px',
            borderBottom: isLast ? 'none' : '1px solid #1e1e1e',
            transition: 'background 0.15s',
            cursor: 'default'
        }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
            {/* Type badge */}
            <div style={{
                padding: '2px 6px', borderRadius: '3px',
                backgroundColor: isNew ? 'rgba(59,130,246,0.12)' : `${folderColor}10`,
                border: `1px solid ${isNew ? 'rgba(59,130,246,0.25)' : `${folderColor}20`}`,
                fontSize: '7px', fontWeight: '900',
                color: isNew ? '#3b82f6' : folderColor,
                letterSpacing: '1px', flexShrink: 0,
                minWidth: '32px', textAlign: 'center'
            }}>{item.type}</div>

            {/* Title & subtitle */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                    fontSize: '10px', fontWeight: '800', color: 'white',
                    textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.6)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>{item.title}</div>
                {item.subtitle && (
                    <div style={{
                        fontSize: '8px', fontWeight: '600', color: '#64748b',
                        marginTop: '1px',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                    }}>{item.subtitle}</div>
                )}
            </div>

            {/* Version */}
            <span style={{
                fontSize: '8px', fontWeight: '700', color: '#475569',
                flexShrink: 0
            }}>{item.version}</span>

            {/* Size */}
            {item.size && (
                <span style={{
                    fontSize: '8px', fontWeight: '700', color: '#334155',
                    flexShrink: 0, width: '42px', textAlign: 'right'
                }}>{item.size}</span>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                <div style={{
                    padding: '4px', borderRadius: '4px', cursor: 'pointer',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid #1e1e1e',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${folderColor}40`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e1e'; }}
                >
                    <Eye size={10} color="#64748b" />
                </div>
                <div style={{
                    padding: '4px', borderRadius: '4px', cursor: 'pointer',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid #1e1e1e',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${folderColor}40`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e1e'; }}
                >
                    <Download size={10} color="#64748b" />
                </div>
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════
const DocumentationStatus = () => {
    const [hoveredEquip, setHoveredEquip] = useState<{
        equip: typeof EQUIPMENT[0], x: number, y: number, isBottom: boolean
    } | null>(null);
    const [scanPos, setScanPos] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setScanPos(prev => (prev >= 100 ? 0 : prev + 0.4));
        }, 30);
        return () => clearInterval(interval);
    }, []);

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
                        <Shield size={16} color="#00F2FF" />
                        <h1 style={{
                            fontSize: '15px', fontWeight: '900', letterSpacing: '3px',
                            textTransform: 'uppercase', color: 'white',
                            textShadow: '0 1px 4px rgba(0,0,0,0.9), 0 0 10px rgba(0,242,255,0.2)'
                        }}>RESOURCE & GOVERNANCE CENTER</h1>
                    </div>
                    <p style={{
                        fontSize: '10px', color: '#475569', marginTop: '2px',
                        fontWeight: '600', letterSpacing: '0.5px'
                    }}>Single Source of Truth · {TOTAL_OPERATORS.toLocaleString()} Operators · {EQUIPMENT.length} Equipment Categories</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                        <span style={{
                            fontSize: '9px', fontWeight: '800', color: '#94a3b8',
                            letterSpacing: '1px',
                            textShadow: '0 1px 3px rgba(0,0,0,0.9)'
                        }}>ADMIN: DAN KAHILU</span>
                        <div style={{
                            padding: '2px 6px', borderRadius: '4px',
                            backgroundColor: 'rgba(0,242,255,0.06)',
                            border: '1px solid rgba(0,242,255,0.15)',
                            display: 'flex', alignItems: 'center', gap: '3px'
                        }}>
                            <BadgeCheck size={9} color="#00F2FF" />
                            <span style={{ fontSize: '7px', fontWeight: '800', color: '#00F2FF', letterSpacing: '1px' }}>GOVERNANCE ADMIN</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════ 4 DOCUMENT REPOSITORIES (Bento Grid) ══════ */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '8px', marginBottom: '10px', flexShrink: 0
            }}>
                {ALL_FOLDERS.map((folder, fi) => (
                    <div key={fi} style={{
                        background: 'linear-gradient(145deg, rgba(26,26,26,0.95), rgba(16,16,16,0.98))',
                        border: `1px solid ${folder.color}18`,
                        borderRadius: '10px',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        {/* Scan laser */}
                        <div style={{
                            position: 'absolute', left: 0, right: 0,
                            top: `${(scanPos + fi * 25) % 100}%`,
                            height: '1px',
                            background: `linear-gradient(90deg, transparent, ${folder.color}40, transparent)`,
                            pointerEvents: 'none', zIndex: 5
                        }} />

                        {/* Folder Header */}
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '8px 12px',
                            backgroundColor: `${folder.color}06`,
                            borderBottom: `1px solid ${folder.color}12`
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <FolderOpen size={13} color={folder.color} />
                                <span style={{
                                    fontSize: '9px', fontWeight: '900', color: 'white',
                                    letterSpacing: '1px',
                                    textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.6)'
                                }}>{folder.label.toUpperCase()}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {/* Special badge for Theory Academy */}
                                {fi === 2 && (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '4px',
                                        padding: '2px 8px', borderRadius: '4px',
                                        background: 'linear-gradient(135deg, rgba(0,242,255,0.12), rgba(0,242,255,0.04))',
                                        border: '1px solid rgba(0,242,255,0.3)',
                                        boxShadow: '0 0 8px rgba(0,242,255,0.15)'
                                    }}>
                                        <Award size={9} color="#00F2FF" />
                                        <span style={{
                                            fontSize: '8px', fontWeight: '900', color: '#00F2FF',
                                            fontFamily: '"Roboto Mono", monospace',
                                            textShadow: '0 0 6px rgba(0,242,255,0.4)',
                                            letterSpacing: '0.5px'
                                        }}>90% PASSING GRADE REQUIRED</span>
                                    </div>
                                )}
                                <div style={{
                                    fontSize: '8px', fontWeight: '800', color: folder.color,
                                    fontFamily: '"Roboto Mono", monospace'
                                }}>{folder.items.length} {folder.items.length === 1 ? 'item' : 'items'}</div>
                            </div>
                        </div>

                        {/* Document List */}
                        <div>
                            {folder.items.map((item, ii) => (
                                <DocRow
                                    key={ii}
                                    item={item}
                                    folderColor={folder.color}
                                    isLast={ii === folder.items.length - 1}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* ══════ 30 EQUIPMENT MATRIX ══════ */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                background: 'rgba(26,26,26,0.6)',
                border: '1px solid #2a2a2a',
                borderRadius: '10px',
                padding: '10px 12px',
                minHeight: 0, position: 'relative', overflow: 'hidden'
            }}>
                {/* Scan laser */}
                <div style={{
                    position: 'absolute', left: 0, right: 0,
                    top: `${(scanPos + 12) % 100}%`, height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(0,242,255,0.35), transparent)',
                    pointerEvents: 'none', zIndex: 5
                }} />

                {/* Header */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: '8px', flexShrink: 0
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Gauge size={12} color="#00F2FF" />
                        <span style={{
                            fontSize: '9px', fontWeight: '900', color: 'white',
                            letterSpacing: '1.5px',
                            textShadow: '0 1px 3px rgba(0,0,0,0.9)'
                        }}>30 EQUIPMENT MATRIX · VME LIST</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {[
                            { label: 'SOP', count: STATS.sopReady, color: '#00F2FF' },
                            { label: 'THEORY', count: STATS.theoryReady, color: '#f59e0b' },
                            { label: 'PRACTICE', count: STATS.practiceReady, color: '#22c55e' },
                            { label: 'COMPLETE', count: STATS.fullReady, color: '#3b82f6' },
                        ].map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                <span style={{
                                    fontSize: '11px', fontWeight: '900', color: s.color,
                                    fontFamily: '"Roboto Mono", monospace',
                                    textShadow: `0 0 6px ${s.color}40`
                                }}>{s.count}</span>
                                <span style={{ fontSize: '7px', color: '#64748b', fontWeight: '700' }}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grid: 6 columns × 5 rows */}
                <div style={{
                    flex: 1, display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gap: '5px', minHeight: 0, overflow: 'auto'
                }}>
                    {EQUIPMENT.map((eq, ei) => {
                        const readyCount = [eq.sop, eq.theory, eq.practice].filter(Boolean).length;
                        const isBottomRows = ei >= 24;
                        return (
                            <div
                                key={eq.id}
                                onMouseEnter={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setHoveredEquip({
                                        equip: eq,
                                        x: rect.left + rect.width / 2,
                                        y: isBottomRows ? rect.top : rect.bottom,
                                        isBottom: isBottomRows
                                    });
                                }}
                                onMouseLeave={() => setHoveredEquip(null)}
                                style={{
                                    background: readyCount === 3
                                        ? 'linear-gradient(145deg, rgba(34,197,94,0.04), rgba(20,20,20,0.95))'
                                        : 'linear-gradient(145deg, rgba(22,22,22,0.95), rgba(14,14,14,0.98))',
                                    border: `1px solid ${readyCount === 3 ? '#22c55e' : readyCount >= 1 ? '#2a2a2a' : '#ef4444'}20`,
                                    borderRadius: '6px',
                                    padding: '5px 7px',
                                    cursor: 'default'
                                }}
                            >
                                {/* Unit # + Name */}
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    marginBottom: '4px'
                                }}>
                                    <span style={{
                                        fontSize: '7px', fontWeight: '800', color: '#475569',
                                        fontFamily: '"Roboto Mono", monospace'
                                    }}>#{eq.id.toString().padStart(2, '0')}</span>
                                    {readyCount === 3 && <CheckCircle size={8} color="#22c55e" />}
                                </div>
                                <div style={{
                                    fontSize: '8px', fontWeight: '800', color: 'white',
                                    textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.5)',
                                    marginBottom: '5px', lineHeight: 1.2,
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                }}>{eq.name}</div>

                                {/* 3 Mini Dots: SOP | Theory | Practice */}
                                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                    {[
                                        { ready: eq.sop, label: 'S', color: '#00F2FF' },
                                        { ready: eq.theory, label: 'T', color: '#f59e0b' },
                                        { ready: eq.practice, label: 'P', color: '#22c55e' },
                                    ].map((dot, di) => (
                                        <div key={di} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                            <div style={{
                                                width: '6px', height: '6px', borderRadius: '50%',
                                                backgroundColor: dot.ready ? dot.color : '#333',
                                                boxShadow: dot.ready ? `0 0 4px ${dot.color}60` : 'none',
                                                transition: 'all 0.2s'
                                            }} />
                                            <span style={{
                                                fontSize: '6px', fontWeight: '700',
                                                color: dot.ready ? dot.color : '#333'
                                            }}>{dot.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div style={{
                    display: 'flex', gap: '14px', justifyContent: 'center',
                    marginTop: '6px', flexShrink: 0
                }}>
                    {[
                        { label: 'SOP Ready', color: '#00F2FF' },
                        { label: 'Theory Ready', color: '#f59e0b' },
                        { label: 'Practice Ready', color: '#22c55e' },
                        { label: 'Pending', color: '#333' },
                    ].map((l, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{
                                width: '6px', height: '6px', borderRadius: '50%',
                                backgroundColor: l.color,
                                boxShadow: l.color !== '#333' ? `0 0 4px ${l.color}60` : 'none'
                            }} />
                            <span style={{ fontSize: '7px', color: '#64748b', fontWeight: '700' }}>{l.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ══════ SMART TOOLTIP (z-index 9999 · bottom opens UP) ══════ */}
            {hoveredEquip && (() => {
                const eq = hoveredEquip.equip;
                const readyCount = [eq.sop, eq.theory, eq.practice].filter(Boolean).length;
                const tooltipHeight = 145;
                const topPos = hoveredEquip.isBottom
                    ? hoveredEquip.y - tooltipHeight - 10
                    : hoveredEquip.y + 8;
                const clampedTop = Math.max(10, Math.min(topPos, window.innerHeight - tooltipHeight - 10));
                const leftPos = Math.max(10, Math.min(hoveredEquip.x - 100, window.innerWidth - 220));

                return (
                    <div style={{
                        position: 'fixed',
                        top: clampedTop, left: leftPos,
                        width: '200px',
                        background: 'rgba(8, 8, 12, 0.97)',
                        backdropFilter: 'blur(30px)',
                        border: '1px solid rgba(0,242,255,0.25)',
                        borderRadius: '10px',
                        padding: '10px 12px',
                        zIndex: 9999,
                        boxShadow: '0 16px 48px rgba(0,0,0,0.8), 0 0 15px rgba(0,242,255,0.12)',
                        pointerEvents: 'none'
                    }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            marginBottom: '6px', paddingBottom: '5px',
                            borderBottom: '1px solid rgba(255,255,255,0.08)'
                        }}>
                            <Truck size={10} color="#00F2FF" />
                            <div>
                                <div style={{
                                    fontSize: '10px', fontWeight: '800', color: 'white',
                                    textShadow: '0 1px 3px rgba(0,0,0,0.9)'
                                }}>#{eq.id.toString().padStart(2, '0')} {eq.name}</div>
                            </div>
                        </div>

                        <div style={{
                            fontSize: '9px', fontWeight: '900', color: '#00F2FF',
                            marginBottom: '6px', letterSpacing: '0.5px',
                            textShadow: '0 0 6px rgba(0,242,255,0.3)'
                        }}>READINESS: {readyCount}/3</div>

                        {[
                            { label: 'SOP Ready', ready: eq.sop, color: '#00F2FF' },
                            { label: 'Theory Bank Ready', ready: eq.theory, color: '#f59e0b' },
                            { label: 'Practical Form Ready', ready: eq.practice, color: '#22c55e' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                marginBottom: '3px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {item.ready
                                        ? <CheckCircle size={8} color={item.color} />
                                        : <Circle size={8} color="#333" />
                                    }
                                    <span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '700' }}>{item.label}</span>
                                </div>
                                <span style={{
                                    fontSize: '8px', fontWeight: '900',
                                    color: item.ready ? item.color : '#ef4444',
                                    textShadow: item.ready ? `0 0 6px ${item.color}40` : 'none'
                                }}>{item.ready ? 'READY' : 'PENDING'}</span>
                            </div>
                        ))}

                        {readyCount < 3 && (
                            <div style={{
                                marginTop: '5px', padding: '3px 6px',
                                backgroundColor: 'rgba(239,68,68,0.08)',
                                border: '1px solid rgba(239,68,68,0.15)',
                                borderRadius: '4px',
                                display: 'flex', alignItems: 'center', gap: '4px'
                            }}>
                                <AlertTriangle size={8} color="#ef4444" />
                                <span style={{
                                    fontSize: '7px', fontWeight: '800', color: '#ef4444'
                                }}>{3 - readyCount} item{3 - readyCount > 1 ? 's' : ''} require completion</span>
                            </div>
                        )}
                    </div>
                );
            })()}

            {/* ══════ FOOTER ══════ */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginTop: '8px', flexShrink: 0, position: 'relative', zIndex: 1
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

export default DocumentationStatus;
