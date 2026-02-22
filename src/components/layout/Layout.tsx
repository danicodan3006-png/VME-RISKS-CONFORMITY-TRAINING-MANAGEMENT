
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
    Rocket
} from 'lucide-react';
import { useSafeEquip } from '../../context/SafeEquipContext';
import LandingPage from '../../pages/LandingPage';

const SidebarItem = ({ to, icon: Icon, label, active, collapsed }: { to: string, icon: any, label: string, active: boolean, collapsed: boolean }) => (
    <Link
        to={to}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '8px',
            color: active ? '#ef4444' : '#94a3b8',
            backgroundColor: active ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
            borderLeft: active ? '4px solid #ef4444' : '4px solid transparent',
            marginBottom: '4px',
            transition: 'all 0.2s ease',
            textDecoration: 'none',
            justifyContent: collapsed ? 'center' : 'flex-start'
        }}
        title={collapsed ? label : ''}
    >
        <Icon size={20} color={active ? '#ef4444' : '#94a3b8'} />
        {!collapsed && <span style={{ fontWeight: 500, fontSize: '14px', whiteSpace: 'nowrap' }}>{label}</span>}
    </Link>
);

const Layout = () => {
    const { logout, isAuthenticated } = useSafeEquip();
    // Default collapsed for "Mission Control" focus, user can expand
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const location = useLocation();

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

            {/* Sidebar */}
            <aside style={{
                width: sidebarCollapsed ? '64px' : '260px', // Minimized width
                backgroundColor: '#1E1E1E',
                borderRight: '1px solid #333',
                display: 'flex',
                flexDirection: 'column',
                transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                flexShrink: 0,
                zIndex: 20
            }}>
                {/* Logo Area */}
                <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: sidebarCollapsed ? 'center' : 'space-between', padding: sidebarCollapsed ? '0' : '0 20px', borderBottom: '1px solid #333' }}>
                    {!sidebarCollapsed && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '28px', height: '28px', backgroundColor: '#ef4444', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', fontSize: '14px' }}>V</div>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>VME 2026</span>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        style={{ padding: '8px', background: 'transparent', color: '#94a3b8', cursor: 'pointer', border: 'none' }}
                    >
                        <Menu size={20} />
                    </button>
                </div>

                {/* Navigation - FINAL STRUCTURE */}
                <nav style={{ flex: 1, overflowY: 'auto', padding: '16px 8px' }}>

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

                </nav>

                {/* Sidebar Footer */}
                <div style={{ padding: '16px', borderTop: '1px solid #333' }}>
                    {!sidebarCollapsed ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>DK</span>
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <p style={{ fontSize: '13px', fontWeight: '500', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Dan Kahilu</p>
                                    <p style={{ fontSize: '11px', color: '#94a3b8' }}>Lead Data Architect</p>
                                </div>
                            </div>
                            <button
                                onClick={logout}
                                style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
                                title="Logout"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={logout}
                            style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', border: 'none', cursor: 'pointer', color: '#64748b' }}
                            title="Logout"
                        >
                            <LogOut size={16} />
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

                {/* Header - Slim for Mission Control */}
                <header style={{ height: '56px', backgroundColor: '#1E1E1E', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
                    <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', letterSpacing: '0.5px' }}>
                        VME 2026 - Operational Dashboard
                    </h1>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block', boxShadow: '0 0 8px #ef4444' }}></span> LIVE COMMAND</span>
                    </div>
                </header>

                {/* Page Content - fills remaining space */}
                <main style={{ flex: 1, overflowY: 'auto', backgroundColor: '#121212', padding: '0', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1 }}>
                        <Outlet />
                    </div>

                    {/* Branding Footer */}
                    <footer style={{
                        padding: '12px 24px',
                        borderTop: '1px solid #1E1E1E',
                        textAlign: 'right',
                        fontSize: '10px',
                        color: '#475569',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
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
