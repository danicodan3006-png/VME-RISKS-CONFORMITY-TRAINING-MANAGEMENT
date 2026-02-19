import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, AlertTriangle, Users, Menu, ChevronDown, Filter, GraduationCap, Truck, Shield } from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label, active, collapsed }: { to: string, icon: any, label: string, active: boolean, collapsed: boolean }) => (
    <Link
        to={to}
        style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            margin: '4px 0',
            borderRadius: '4px',
            color: 'white',
            backgroundColor: active ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            transition: 'all 0.2s',
            fontWeight: 500,
            justifyContent: collapsed ? 'center' : 'flex-start',
            borderLeft: active ? '4px solid white' : '4px solid transparent'
        }}
    >
        <Icon size={20} style={{ marginRight: collapsed ? 0 : '12px', flexShrink: 0 }} />
        {!collapsed && <span>{label}</span>}
    </Link>
);

const FilterFallback = ({ label }: { label: string }) => (
    <div style={{ marginBottom: '16px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.3)' }}>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>{label}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
            <span>All</span>
            <ChevronDown size={14} />
        </div>
    </div>
);

const Layout = () => {
    const location = useLocation();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>

            {/* Header - White background now to contrast with red sidebar? Or keep Red? Screenshot has RED sidebar and maybe white header? 
          Actually screenshot has Red Sidebar and Image background. 
          I will keep Red Header for consistency but maybe darker? 
          Let's try: White Header with Red Text/Accents to match the 'clean' look of the charts panel, 
          BUT the Sidebar is distinctly Red. 
      */}
            <header style={{
                height: '80px',
                backgroundColor: 'white',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 32px',
                zIndex: 20
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        style={{ background: 'none', color: '#1e293b', display: 'flex' }}
                    >
                        <Menu size={28} />
                    </button>
                    <div style={{ paddingLeft: '24px', borderLeft: '1px solid #e2e8f0' }}>
                        <h1 style={{ fontSize: '20px', fontWeight: '900', color: '#d32f2f', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            VME RISKS, CONFORMITY & TRAINING MANAGEMENT
                        </h1>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    {/* MMG Logo */}
                    <div style={{ textAlign: 'right' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '900', fontStyle: 'italic', lineHeight: 1, color: '#d32f2f' }}>MMG</h2>
                        <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>We mine for progress</p>
                    </div>
                </div>
            </header>

            <div style={{ display: 'flex', flex: 1 }}>
                {/* Red Sidebar to mimic the filter panel */}
                <aside style={{
                    width: sidebarCollapsed ? '0px' : '280px',
                    opacity: sidebarCollapsed ? 0 : 1,
                    overflow: 'hidden',
                    backgroundColor: '#d32f2f', // Red Background
                    padding: sidebarCollapsed ? '0' : '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    boxShadow: '4px 0 10px rgba(0,0,0,0.1)',
                    zIndex: 10,
                    whiteSpace: 'nowrap',
                    color: 'white'
                }}>


                    <nav style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '14px', textTransform: 'uppercase', opacity: 0.8, marginBottom: '16px' }}>Navigation</h3>
                        <SidebarItem
                            to="/"
                            icon={LayoutDashboard}
                            label="Executive Summary"
                            active={location.pathname === '/'}
                            collapsed={sidebarCollapsed}
                        />
                        <SidebarItem
                            to="/training-stats"
                            icon={GraduationCap}
                            label="Training & VOC"
                            active={location.pathname === '/training-stats'}
                            collapsed={sidebarCollapsed}
                        />
                        <SidebarItem
                            to="/safety-awareness"
                            icon={Shield}
                            label="Safety Awareness"
                            active={location.pathname === '/safety-awareness'}
                            collapsed={sidebarCollapsed}
                        />
                        <SidebarItem
                            to="/risk"
                            icon={AlertTriangle}
                            label="Risk Management"
                            active={location.pathname === '/risk'}
                            collapsed={sidebarCollapsed}
                        />
                        <SidebarItem
                            to="/strategy"
                            icon={LayoutDashboard}
                            label="VME STRATEGY"
                            active={location.pathname === '/strategy'}
                            collapsed={sidebarCollapsed}
                        />

                        <SidebarItem
                            to="/machinery"
                            icon={Truck}
                            label="Machinery"
                            active={location.pathname === '/machinery'}
                            collapsed={sidebarCollapsed}
                        />
                        <SidebarItem
                            to="/people"
                            icon={GraduationCap}
                            label="People"
                            active={location.pathname === '/people'}
                            collapsed={sidebarCollapsed}
                        />
                        <SidebarItem
                            to="/updates"
                            icon={Filter}
                            label="Updates & Docs"
                            active={location.pathname === '/updates'}
                            collapsed={sidebarCollapsed}
                        />
                    </nav>
                </aside>

                {/* Main Content */}
                <main style={{ flex: 1, padding: '32px', backgroundColor: '#f8fafc', overflowY: 'auto' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
