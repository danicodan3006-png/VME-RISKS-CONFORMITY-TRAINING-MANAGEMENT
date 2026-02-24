
import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    Menu,
    GraduationCap,
    Truck,
    Shield,
    FileText,
    Trophy,
    Activity,
    Database,
    LogOut,
    Rocket,
    BadgeCheck,
    AlertTriangle,
    Palmtree,
    Cpu
} from 'lucide-react';
import { useSafeEquip } from '../../context/SafeEquipContext';
import LandingPage from '../../pages/LandingPage';

// ═══════════════════════════════════════════════
// SIDEBAR ITEM — "Blade" Control Handle
// ═══════════════════════════════════════════════
const SidebarItem = ({ to, icon: Icon, label, active, collapsed }: {
    to: string, icon: any, label: string, active: boolean, collapsed: boolean
}) => {
    const [hovered, setHovered] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            style={{ position: 'relative' }}
            onMouseEnter={() => { setHovered(true); if (collapsed) setShowTooltip(true); }}
            onMouseLeave={() => { setHovered(false); setShowTooltip(false); }}
        >
            <Link
                to={to}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: collapsed ? '11px 0' : '11px 16px',
                    borderRadius: '8px',
                    color: active ? '#00F2FF' : hovered ? '#e2e8f0' : '#94a3b8',
                    background: active
                        ? 'linear-gradient(90deg, rgba(0,242,255,0.08), transparent)'
                        : hovered
                            ? 'linear-gradient(90deg, rgba(0,242,255,0.04), transparent)'
                            : 'transparent',
                    borderLeft: active ? '3px solid #00F2FF' : '3px solid transparent',
                    boxShadow: active ? 'inset 0 0 20px rgba(0,242,255,0.06)' : 'none',
                    marginBottom: '2px',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    textDecoration: 'none',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    position: 'relative'
                }}
            >
                <Icon
                    size={18}
                    color={active ? '#00F2FF' : hovered ? '#e2e8f0' : '#64748b'}
                    strokeWidth={active ? 2.5 : 2}
                    style={{ flexShrink: 0, transition: 'all 0.2s' }}
                />
                {!collapsed && (
                    <span style={{
                        fontWeight: active ? '800' : '600',
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.5px',
                        color: active ? 'white' : hovered ? '#e2e8f0' : '#94a3b8',
                        textShadow: active ? '0 0 8px rgba(0,242,255,0.3)' : 'none',
                        transition: 'all 0.2s'
                    }}>{label}</span>
                )}
            </Link>

            {/* Collapsed Tooltip — Opens RIGHT with high-contrast bg */}
            {collapsed && showTooltip && (
                <div style={{
                    position: 'absolute',
                    left: '100%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    marginLeft: '12px',
                    padding: '6px 14px',
                    background: 'rgba(8, 8, 12, 0.96)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0,242,255,0.2)',
                    borderRadius: '6px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.7), 0 0 10px rgba(0,242,255,0.08)',
                    whiteSpace: 'nowrap',
                    zIndex: 9999,
                    pointerEvents: 'none'
                }}>
                    <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        color: 'white',
                        letterSpacing: '0.5px'
                    }}>{label}</span>
                    {/* Arrow */}
                    <div style={{
                        position: 'absolute',
                        left: '-5px',
                        top: '50%',
                        transform: 'translateY(-50%) rotate(45deg)',
                        width: '8px',
                        height: '8px',
                        background: 'rgba(8, 8, 12, 0.96)',
                        borderLeft: '1px solid rgba(0,242,255,0.2)',
                        borderBottom: '1px solid rgba(0,242,255,0.2)'
                    }} />
                </div>
            )}
        </div>
    );
};

// ═══════════════════════════════════════════════
// MMG LOGO SVG — Ultra-visible with pulse glow
// ═══════════════════════════════════════════════
const MMGLogo = ({ size = 48 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="mmgGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00F2FF" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#00F2FF" />
            </linearGradient>
            <filter id="mmgGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        {/* Outer hexagonal frame */}
        <polygon
            points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
            fill="none"
            stroke="url(#mmgGrad)"
            strokeWidth="2.5"
            filter="url(#mmgGlow)"
        />
        {/* Inner fill */}
        <polygon
            points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
            fill="rgba(0,242,255,0.04)"
        />
        {/* MMG Text */}
        <text
            x="50" y="48"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontFamily="Inter, sans-serif"
            fontWeight="900"
            fontSize="26"
            letterSpacing="2"
            filter="url(#mmgGlow)"
        >MMG</text>
        {/* Kinsevere subtitle */}
        <text
            x="50" y="68"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#00F2FF"
            fontFamily="Inter, sans-serif"
            fontWeight="700"
            fontSize="8"
            letterSpacing="3"
        >KINSEVERE</text>
    </svg>
);

// ═══════════════════════════════════════════════
// MINI INTERACTIVE CALENDAR
// ═══════════════════════════════════════════════
const MiniCalendar = () => {
    const { dataset } = useSafeEquip();
    const now = new Date();
    const today = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Mapping dataset to dates for indicators
    const eventsByDay = dataset.reduce((acc: Record<number, { voc: boolean, insp: boolean }>, entry) => {
        const date = new Date(entry.timestamp);
        if (date.getMonth() === month && date.getFullYear() === year) {
            const d = date.getDate();
            if (!acc[d]) acc[d] = { voc: false, insp: false };
            if (entry.training_theory > 0 || entry.training_practice > 0) acc[d].voc = true;
            if (entry.vehicles_total > 0) acc[d].insp = true;
        }
        return acc;
    }, {});

    return (
        <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '10px',
            padding: '10px',
            margin: '10px 0',
            backdropFilter: 'blur(10px)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
        }}>
            <div style={{
                textAlign: 'center',
                fontSize: '9px',
                fontWeight: '900',
                color: '#64748b',
                letterSpacing: '2px',
                marginBottom: '8px',
                textTransform: 'uppercase'
            }}>
                {monthNames[month]} {year}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '2px',
                marginBottom: '4px'
            }}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                    <div key={d} style={{ textAlign: 'center', fontSize: '7px', fontWeight: '800', color: '#334155' }}>{d}</div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const d = i + 1;
                    const isToday = d === today;
                    const hasVoc = eventsByDay[d]?.voc;
                    const hasInsp = eventsByDay[d]?.insp;

                    return (
                        <div key={d} style={{
                            textAlign: 'center',
                            fontSize: '8px',
                            fontWeight: isToday ? '900' : '600',
                            color: isToday ? '#00F2FF' : '#475569',
                            padding: '4px 0',
                            borderRadius: '4px',
                            position: 'relative',
                            background: isToday ? 'rgba(0,242,255,0.08)' : 'transparent',
                            border: isToday ? '1px solid rgba(0,242,255,0.2)' : '1px solid transparent',
                            transition: 'all 0.2s'
                        }}>
                            {d}
                            <div style={{
                                position: 'absolute',
                                bottom: '1px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                gap: '1px'
                            }}>
                                {hasVoc && <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />}
                                {hasInsp && <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


// ═══════════════════════════════════════════════
// MAIN LAYOUT
// ═══════════════════════════════════════════════
const Layout = () => {
    const { logout, isAuthenticated, theme, toggleTheme } = useSafeEquip();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const location = useLocation();

    const isHighTech = theme === 'high-tech';

    const sidebarBg = isHighTech
        ? 'linear-gradient(180deg, rgba(14,14,18,0.92), rgba(10,10,14,0.96))'
        : '#ffffff';

    const sidebarBorder = isHighTech
        ? '1px solid rgba(0,242,255,0.08)'
        : '1px solid #e2e8f0';

    const headerBg = isHighTech
        ? 'linear-gradient(90deg, rgba(14,14,18,0.95), rgba(18,18,22,0.9))'
        : '#ffffff';

    const mainBg = isHighTech ? '#121212' : '#f8fafc';
    const textColor = isHighTech ? 'white' : '#1e293b';

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#121212',
            color: 'white',
            overflow: 'hidden',
            fontFamily: '"Inter", sans-serif',
            position: 'relative'
        }}>
            {/* Animations */}
            <style>{`
                @keyframes logoPulse {
                    0%, 100% { filter: drop-shadow(0 0 6px rgba(0,242,255,0.3)); }
                    50% { filter: drop-shadow(0 0 16px rgba(0,242,255,0.5)) drop-shadow(0 0 30px rgba(0,242,255,0.15)); }
                }
                @keyframes operationalRing {
                    0%, 100% { box-shadow: 0 0 0 2px rgba(0,242,255,0.4), 0 0 8px rgba(0,242,255,0.2); }
                    50% { box-shadow: 0 0 0 2px rgba(0,242,255,0.7), 0 0 16px rgba(0,242,255,0.4); }
                }
            `}</style>

            {/* Landing Page Overlay - Gated Entry */}
            {!isAuthenticated && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1000,
                    backgroundColor: '#121212'
                }}>
                    <LandingPage />
                </div>
            )}

            {/* ══════════════════════════════════════════════
                 SIDEBAR — "The Blade" Control Handle
                ══════════════════════════════════════════════ */}
            <aside style={{
                width: sidebarCollapsed ? '64px' : '240px',
                background: sidebarBg,
                backdropFilter: isHighTech ? 'blur(20px)' : 'none',
                borderRight: sidebarBorder,
                display: 'flex',
                flexDirection: 'column',
                transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                flexShrink: 0,
                zIndex: 20,
                height: '100vh',
                overflow: 'hidden',
                position: 'relative'
            }}>
                {/* Subtle vertical accent line on right edge */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '1px',
                    background: 'linear-gradient(180deg, transparent 10%, rgba(0,242,255,0.15) 50%, transparent 90%)',
                    pointerEvents: 'none'
                }} />

                {/* ══════ LOGO AREA — The Authority ══════ */}
                <div style={{
                    padding: sidebarCollapsed ? '16px 8px' : '20px 20px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                    position: 'relative'
                }}>
                    {/* MMG Logo with Pulse Glow */}
                    <div style={{
                        animation: 'logoPulse 3s ease-in-out infinite',
                        marginBottom: sidebarCollapsed ? '0' : '8px',
                        transition: 'all 0.3s'
                    }}>
                        <MMGLogo size={sidebarCollapsed ? 36 : 56} />
                    </div>

                    {/* Reflection effect */}
                    {!sidebarCollapsed && (
                        <>
                            <div style={{
                                width: '40px',
                                height: '8px',
                                background: 'radial-gradient(ellipse, rgba(0,242,255,0.12) 0%, transparent 70%)',
                                marginTop: '-4px',
                                marginBottom: '8px'
                            }} />

                            {/* Subtitle — VME 2026 | MISSION CONTROL */}
                            <div style={{
                                fontSize: '8px',
                                fontWeight: '800',
                                color: '#64748b',
                                letterSpacing: '3px',
                                textTransform: 'uppercase',
                                fontFamily: '"Roboto Mono", "Courier New", monospace',
                                whiteSpace: 'nowrap',
                                textAlign: 'center'
                            }}>
                                VME 2026 <span style={{ color: 'rgba(0,242,255,0.4)' }}>|</span> MISSION CONTROL
                            </div>
                        </>
                    )}

                    {/* Collapse Toggle */}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            padding: '6px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: '6px',
                            color: '#64748b',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'rgba(0,242,255,0.3)';
                            e.currentTarget.style.color = '#00F2FF';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                            e.currentTarget.style.color = '#64748b';
                        }}
                    >
                        <Menu size={14} />
                    </button>
                </div>

                {/* ══════ NAVIGATION — The Control Stack ══════ */}
                {!sidebarCollapsed && (
                    <div style={{
                        padding: '12px 14px 0',
                        flexShrink: 0
                    }}>
                        <span style={{
                            fontSize: '7px',
                            fontWeight: '800',
                            color: '#334155',
                            letterSpacing: '2.5px',
                            textTransform: 'uppercase'
                        }}>NAVIGATION</span>
                    </div>
                )}

                <nav style={{
                    flex: 1,
                    padding: sidebarCollapsed ? '8px 6px' : '8px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1px',
                    overflow: 'hidden'
                }}>
                    <SidebarItem
                        to="/dashboard/strategic-roadmap"
                        icon={Rocket}
                        label="Strategic Roadmap"
                        active={location.pathname === '/dashboard/strategic-roadmap'}
                        collapsed={sidebarCollapsed}
                    />
                    <SidebarItem
                        to="/dashboard/executive-summary"
                        icon={Activity}
                        label="Executive Summary"
                        active={location.pathname === '/dashboard/executive-summary'}
                        collapsed={sidebarCollapsed}
                    />
                    <SidebarItem
                        to="/dashboard/training-stats"
                        icon={GraduationCap}
                        label="Training & VOC Stats"
                        active={location.pathname === '/dashboard/training-stats'}
                        collapsed={sidebarCollapsed}
                    />
                    <SidebarItem
                        to="/dashboard/safety-awareness"
                        icon={Shield}
                        label="Safety Awareness"
                        active={location.pathname === '/dashboard/safety-awareness'}
                        collapsed={sidebarCollapsed}
                    />
                    <SidebarItem
                        to="/dashboard/fleet-compliance"
                        icon={Truck}
                        label="Fleet Compliance"
                        active={location.pathname === '/dashboard/fleet-compliance'}
                        collapsed={sidebarCollapsed}
                    />
                    <SidebarItem
                        to="/dashboard/documentation-status"
                        icon={FileText}
                        label="Documentation Status"
                        active={location.pathname === '/dashboard/documentation-status'}
                        collapsed={sidebarCollapsed}
                    />
                    <SidebarItem
                        to="/dashboard/red-list-leaderboard"
                        icon={Trophy}
                        label="Red List & L1-L5"
                        active={location.pathname === '/dashboard/red-list-leaderboard'}
                        collapsed={sidebarCollapsed}
                    />
                    <SidebarItem
                        to="/dashboard/master-form"
                        icon={Database}
                        label="Master Data Entry"
                        active={location.pathname === '/dashboard/master-form'}
                        collapsed={sidebarCollapsed}
                    />
                    <SidebarItem
                        to="/dashboard/accident-management"
                        icon={AlertTriangle}
                        label="Accident Management"
                        active={location.pathname === '/dashboard/accident-management'}
                        collapsed={sidebarCollapsed}
                    />

                    {/* Integrated Mini Calendar */}
                    {!sidebarCollapsed && <MiniCalendar />}
                </nav>

                {/* ══════ THEME SWITCHER — The Paradigm Shift ══════ */}
                <div style={{ padding: sidebarCollapsed ? '8px' : '0 16px 12px', marginTop: 'auto' }}>
                    <button
                        onClick={toggleTheme}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                            gap: '12px',
                            padding: '10px',
                            background: isHighTech ? 'rgba(0,242,255,0.05)' : '#f1f5f9',
                            border: isHighTech ? '1px solid rgba(0,242,255,0.1)' : '1px solid #e2e8f0',
                            borderRadius: '8px',
                            color: isHighTech ? '#00F2FF' : '#334155',
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontWeight: '800',
                            transition: 'all 0.2s',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {isHighTech ? <Palmtree size={18} /> : <Cpu size={18} />}
                        {!sidebarCollapsed && (
                            <span>{isHighTech ? 'SWITCH TO EXECUTIVE' : 'SWITCH TO HIGH-TECH'}</span>
                        )}
                    </button>
                </div>

                {/* ══════ ADMIN PROFILE — The Architect ══════ */}
                <div style={{
                    padding: sidebarCollapsed ? '12px 8px' : '14px 16px',
                    borderTop: isHighTech ? '1px solid rgba(255,255,255,0.04)' : '1px solid #f1f5f9',
                    flexShrink: 0,
                    backgroundColor: isHighTech ? 'transparent' : '#f8fafc'
                }}>
                    {!sidebarCollapsed ? (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                                {/* Circular avatar with glowing Operational ring */}
                                <div style={{
                                    width: '34px',
                                    height: '34px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    animation: 'operationalRing 3s ease-in-out infinite',
                                    position: 'relative'
                                }}>
                                    <span style={{
                                        fontSize: '11px',
                                        fontWeight: '900',
                                        color: '#00F2FF',
                                        letterSpacing: '0.5px'
                                    }}>DK</span>
                                    {/* Operational dot */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '0px',
                                        right: '0px',
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        backgroundColor: '#22c55e',
                                        border: '2px solid rgba(10,10,14,0.95)',
                                        boxShadow: '0 0 6px rgba(34,197,94,0.6)'
                                    }} />
                                </div>

                                <div style={{ overflow: 'hidden' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <p style={{
                                            fontSize: '11px',
                                            fontWeight: '800',
                                            color: 'white',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            letterSpacing: '0.5px',
                                            margin: 0
                                        }}>Dan Kahilu</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                        <BadgeCheck size={9} color="#00F2FF" />
                                        <span style={{
                                            fontSize: '7px',
                                            fontWeight: '800',
                                            color: '#00F2FF',
                                            letterSpacing: '1px'
                                        }}>SYSTEM ADMIN</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={logout}
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    borderRadius: '6px',
                                    color: '#475569',
                                    cursor: 'pointer',
                                    padding: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}
                                title="Logout"
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)';
                                    e.currentTarget.style.color = '#ef4444';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                                    e.currentTarget.style.color = '#475569';
                                }}
                            >
                                <LogOut size={14} />
                            </button>
                        </div>
                    ) : (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            {/* Mini avatar in collapsed mode */}
                            <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                animation: 'operationalRing 3s ease-in-out infinite',
                                position: 'relative'
                            }}>
                                <span style={{
                                    fontSize: '9px',
                                    fontWeight: '900',
                                    color: '#00F2FF'
                                }}>DK</span>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-1px',
                                    right: '-1px',
                                    width: '7px',
                                    height: '7px',
                                    borderRadius: '50%',
                                    backgroundColor: '#22c55e',
                                    border: '2px solid rgba(10,10,14,0.95)',
                                    boxShadow: '0 0 6px rgba(34,197,94,0.6)'
                                }} />
                            </div>
                            <button
                                onClick={logout}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#475569',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                title="Logout"
                            >
                                <LogOut size={13} />
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* ══════════════════════════════════════════════
                 MAIN CONTENT AREA
                ══════════════════════════════════════════════ */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

                {/* Header - Slim for Mission Control */}
                <header style={{
                    height: '48px',
                    background: headerBg,
                    backdropFilter: isHighTech ? 'blur(12px)' : 'none',
                    borderBottom: isHighTech ? '1px solid rgba(255,255,255,0.04)' : '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px',
                    flexShrink: 0
                }}>
                    <h1 style={{
                        fontSize: '13px',
                        fontWeight: '800',
                        color: 'white',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        textShadow: '0 1px 3px rgba(0,0,0,0.6)'
                    }}>
                        VME 2026 — Operational Dashboard
                    </h1>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <span style={{
                            fontSize: '10px',
                            fontWeight: '800',
                            color: '#ef4444',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            letterSpacing: '1px'
                        }}>
                            <span style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: '#ef4444',
                                display: 'inline-block',
                                boxShadow: '0 0 8px #ef4444',
                                animation: 'operationalRing 2s infinite'
                            }} />
                            LIVE COMMAND
                        </span>
                    </div>
                </header>

                {/* Page Content */}
                <main style={{
                    flex: 1,
                    overflowY: 'auto',
                    backgroundColor: mainBg,
                    padding: '0',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    color: textColor
                }}>
                    <div style={{ flex: 1 }}>
                        <Outlet />
                    </div>

                    {/* Branding Footer */}
                    <footer style={{
                        padding: '10px 24px',
                        borderTop: '1px solid rgba(255,255,255,0.03)',
                        textAlign: 'right',
                        fontSize: '9px',
                        color: '#334155',
                        fontWeight: '700',
                        letterSpacing: '1.5px',
                        backgroundColor: '#121212'
                    }}>
                        INSPIRED BY SAFEEQUIP TECHNOLOGY | VME 2026 CORE ENGINE
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default Layout;
