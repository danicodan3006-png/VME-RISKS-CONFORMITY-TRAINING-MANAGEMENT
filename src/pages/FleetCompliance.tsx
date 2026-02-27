import {
    Truck, AlertTriangle, Activity, Gauge, Zap, Search,
    Filter, Settings, ShieldAlert, BadgeInfo
} from 'lucide-react';
import {
    ResponsiveContainer, RadarChart, PolarGrid,
    PolarAngleAxis, Radar, Legend
} from 'recharts';

// --- Static Data ---
const AUDIT_LOG = [
    { id: 'MMG-LHD-05', type: 'Loader', lastInp: '22-Feb', status: 'COMPLIANT', critical: 'None', action: 'Passed', color: '#22c55e' },
    { id: 'MEX-DT-44', type: 'Digger', lastInp: '25-Feb', status: 'COMPLIANT', critical: 'Light Sensor', action: 'Monitored', color: '#22c55e' },
    { id: 'TKM-BUS-464', type: 'Personnel Bus', lastInp: '17-Feb', status: 'GROUNDED', critical: 'Brake Delay', action: 'Impounded', color: '#ef4444' },
    { id: 'ORICA-MMU-02', type: 'Explosives Truck', lastInp: '14-Jan', status: 'COMPLIANT', critical: 'None', action: 'Passed', color: '#22c55e' },
    { id: 'DOG-UNIT-01', type: 'Safety Patrol', lastInp: '08-Feb', status: 'FAILED', critical: 'Total Brake Failure', action: 'GROUNDED', color: '#ef4444' },
    { id: 'SOL-TR-88', type: 'Light Vehicle', lastInp: '26-Feb', status: 'WARNING', critical: 'Tire Wear', action: 'Scheduled', color: '#f59e0b' },
    { id: 'NEEM-HME-12', type: 'Haul Truck', lastInp: '27-Feb', status: 'COMPLIANT', critical: 'None', action: 'Passed', color: '#22c55e' },
];

const RADAR_DATA = [
    { category: 'Brakes', lv: 85, hme: 98, fullMark: 100 },
    { category: 'Steering', lv: 92, hme: 95, fullMark: 100 },
    { category: 'Proximity', lv: 70, hme: 88, fullMark: 100 },
    { category: 'Tires', lv: 80, hme: 92, fullMark: 100 },
    { category: 'Lights', lv: 95, hme: 88, fullMark: 100 },
];

const RETROFIT_DATA = [
    { name: 'Reverse Cameras', count: 185, target: 210, color: '#06b6d4' },
    { name: 'Proximity Sensors', count: 142, target: 210, color: '#3b82f6' },
    { name: 'Safe-Brake Kits', count: 98, target: 120, color: '#f59e0b' },
];

// --- Sub-components ---
const MiniKPI = ({ label, val, sub, icon: Icon, color }: any) => (
    <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${color}30`,
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        position: 'relative',
        overflow: 'hidden'
    }}>
        <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '2px', backgroundColor: color, boxShadow: `0 0 10px ${color}`
        }} />
        <div style={{ padding: '10px', borderRadius: '10px', background: `${color}15` }}>
            <Icon size={20} color={color} />
        </div>
        <div>
            <div style={{ fontSize: '9px', fontWeight: '900', color: '#64748b', letterSpacing: '1px' }}>{label}</div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: 'white', fontFamily: '"Roboto Mono", monospace', lineHeight: 1, marginTop: '2px' }}>{val}</div>
            <div style={{ fontSize: '8px', fontWeight: '700', color: color, marginTop: '2px' }}>{sub}</div>
        </div>
    </div>
);

const FleetCompliance = () => {

    // Derived states
    const complianceRate = 88.5;

    return (
        <div style={{
            backgroundColor: '#0a0a0f', height: '100%', color: 'white',
            padding: '20px', fontFamily: '"Inter", sans-serif', overflow: 'hidden',
            display: 'flex', flexDirection: 'column'
        }}>
            <style>{`
                .glass-panel { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 20px; }
                .audit-table { width: 100%; border-collapse: separate; border-spacing: 0 8px; }
                .audit-table th { padding: 12px; text-align: left; font-size: 8px; color: #475569; letter-spacing: 1.5px; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .audit-table td { padding: 12px; font-size: 11px; background: rgba(255,255,255,0.02); border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); }
                .audit-table tr:hover td { background: rgba(255,255,255,0.04); }
                @keyframes pulseGlow { 0%, 100% { opacity: 0.8; } 50% { opacity: 0.3; } }
            `}</style>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexShrink: 0 }}>
                <div>
                    <h1 style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '3px', textTransform: 'uppercase', margin: 0, color: '#f59e0b' }}>
                        FLEET COMPLIANCE <span style={{ color: 'white' }}>& CRITICAL CONTROLS</span>
                    </h1>
                    <p style={{ fontSize: '10px', color: '#475569', fontWeight: '800', marginTop: '4px', letterSpacing: '1px' }}>
                        MAINTENANCE CONTROL ROOM • ASSET INTEGRITY AUDIT
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '1px', color: 'white' }}>DAN KAHILU</div>
                        <div style={{ fontSize: '7px', fontWeight: '800', color: '#f59e0b' }}>ADMINISTRATOR</div>
                    </div>
                    <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/MMG_Logo.svg/1000px-MMG_Logo.svg.png" alt="MMG" style={{ height: '20px', opacity: 0.8 }} />
                </div>
            </div>

            {/* KPI Strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px', flexShrink: 0 }}>
                <MiniKPI label="TOTAL ASSETS" val="562" sub="Across 8 Contractors" icon={Truck} color="#3b82f6" />
                <MiniKPI label="CRITICAL FAILURES" val="12" sub="Brakes & Sensors" icon={ShieldAlert} color="#ef4444" />
                <MiniKPI label="COMPLIANCE RATE" val={`${complianceRate}%`} sub="Fleet-Wide Avg" icon={Gauge} color="#22c55e" />
                <MiniKPI label="SAFETY RETROFITS" val="325" sub="Memo Point 7 Progress" icon={Zap} color="#06b6d4" />
            </div>

            {/* Main Grid */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', minHeight: 0 }}>
                {/* Left: Component 1 - Audit Log */}
                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Search size={16} color="#475569" />
                            <h3 style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '1px' }}>INSPECTION AUDIT LOG</h3>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Filter size={14} color="#475569" style={{ cursor: 'pointer' }} />
                            <Settings size={14} color="#475569" style={{ cursor: 'pointer' }} />
                        </div>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
                        <table className="audit-table">
                            <thead>
                                <tr>
                                    <th>ASSET ID</th>
                                    <th>TYPE</th>
                                    <th>LAST INSPECTION</th>
                                    <th>STATUS</th>
                                    <th>CRITICAL ISSUES</th>
                                    <th>ACTION TAKEN</th>
                                </tr>
                            </thead>
                            <tbody>
                                {AUDIT_LOG.map((row) => (
                                    <tr key={row.id}>
                                        <td style={{ fontWeight: '900', color: 'white' }}>{row.id}</td>
                                        <td style={{ color: '#94a3b8' }}>{row.type}</td>
                                        <td style={{ color: '#94a3b8' }}>{row.lastInp}</td>
                                        <td>
                                            <span style={{
                                                padding: '4px 8px', borderRadius: '4px', fontSize: '8px', fontWeight: '900',
                                                backgroundColor: `${row.color}15`, border: `1px solid ${row.color}40`, color: row.color,
                                                boxShadow: row.status === 'FAILED' || row.status === 'GROUNDED' ? `0 0 10px ${row.color}40` : 'none'
                                            }}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td style={{ color: row.critical !== 'None' ? '#f59e0b' : '#64748b', fontWeight: row.critical !== 'None' ? '700' : '400' }}>
                                            {row.critical}
                                        </td>
                                        <td style={{ fontWeight: '800', color: row.color }}>{row.action}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right: Component 2 - Analytics & Memo */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: 0 }}>
                    {/* Maintenance Radar */}
                    <div className="glass-panel" style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <Activity size={16} color="#f59e0b" />
                            <h3 style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '1px' }}>MAINTENANCE RADAR</h3>
                        </div>
                        <div style={{ height: '220px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                    <PolarAngleAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 800 }} />
                                    <Radar name="LV Compliance" dataKey="lv" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} />
                                    <Radar name="HME Compliance" dataKey="hme" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                                    <Legend />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* VME Memo Integration */}
                    <div className="glass-panel">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <BadgeInfo size={16} color="#06b6d4" />
                            <h3 style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '1px' }}>SAFETY TECH RETROFIT</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {RETROFIT_DATA.map(item => (
                                <div key={item.name}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8' }}>{item.name.toUpperCase()}</span>
                                        <span style={{ fontSize: '10px', fontWeight: '900', color: 'white' }}>{item.count} / {item.target}</span>
                                    </div>
                                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                                        <div style={{ width: `${(item.count / item.target) * 100}%`, height: '100%', background: item.color, borderRadius: '2px' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(245,158,11,0.05)', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.2)' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <AlertTriangle size={14} color="#f59e0b" />
                                <p style={{ fontSize: '9px', color: '#f59e0b', margin: 0, fontWeight: '700', lineHeight: 1.4 }}>
                                    POINT 7: "Retrofit of critical safety tech has been accelerated to meet the Q2 objective."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ fontSize: '9px', fontWeight: '900', color: '#475569', letterSpacing: '1px' }}>VME_MAINTENANCE_MODULE_2026</div>
                    <div style={{ fontSize: '9px', fontWeight: '900', color: '#475569', letterSpacing: '1px' }}>STATUS: AUDIT_MODE_ENFORCED</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 8px #22c55e', animation: 'pulseGlow 2s infinite' }} />
                    <span style={{ fontSize: '9px', fontWeight: '800', color: '#22c55e', letterSpacing: '1.5px' }}>TELEMETRY SYNCHRONIZED</span>
                </div>
            </div>
        </div>
    );
};

export default FleetCompliance;
