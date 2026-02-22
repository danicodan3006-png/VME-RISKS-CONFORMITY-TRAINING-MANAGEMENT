
import { useState } from 'react';
import { Shield, Lock, ChevronRight, Activity } from 'lucide-react';
import { useSafeEquip } from '../context/SafeEquipContext';

const LandingPage = () => {
    const { dataset, login } = useSafeEquip();
    const [accessCode, setAccessCode] = useState('');
    const [error, setError] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    // Safety Clock Logic
    const lastIncidentDate = dataset
        .filter(d => d.incidents > 0)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]?.timestamp;

    const daysWithoutIncident = lastIncidentDate
        ? Math.floor((new Date().getTime() - new Date(lastIncidentDate).getTime()) / (1000 * 3600 * 24))
        : 3;

    // Compliance Aggregation
    const totalFleet = dataset.reduce((sum, d) => sum + d.vehicles_total, 0) + 443;
    const totalCompliant = dataset.reduce((sum, d) => sum + d.vehicles_compliant, 0) + 177; // Baseline MMG/Mexco
    const globalCompliance = ((totalCompliant / totalFleet) * 100).toFixed(1);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsScanning(true);

        setTimeout(() => {
            if (login(accessCode)) {
                // Success - Context will update isAuthenticated, overlay will hide
            } else {
                setError(true);
                setIsScanning(false);
                setAccessCode('');
                setTimeout(() => setError(false), 2000);
            }
        }, 1500);
    };

    return (
        <div style={{
            backgroundColor: '#121212',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontFamily: '"Inter", sans-serif',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Background Grid Accent */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle at 2px 2px, #1a1a1a 1px, transparent 0)',
                backgroundSize: '32px 32px',
                opacity: 0.5,
                zIndex: 0
            }}></div>

            {/* Header / Branding */}
            <div style={{ textAlign: 'center', marginBottom: '48px', zIndex: 1, position: 'relative' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                }}>
                    <div style={{ backgroundColor: '#ef4444', padding: '8px', borderRadius: '4px' }}>
                        <span style={{ fontWeight: '900', fontSize: '24px' }}>V</span>
                    </div>
                    <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '4px', textTransform: 'uppercase' }}>
                        VME <span style={{ color: '#3b82f6' }}>2026</span>
                    </h1>
                </div>
                <p style={{ color: '#64748b', fontWeight: '500', letterSpacing: '2px' }}>OPERATIONAL COMMAND CENTER</p>
            </div>

            {/* Public Mission Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(300px, 400px) minmax(300px, 400px)',
                gap: '24px',
                zIndex: 1,
                width: '100%',
                maxWidth: '900px',
                marginBottom: '48px'
            }}>
                {/* Safety Clock Card */}
                <div style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid #333',
                    borderRadius: '12px',
                    padding: '32px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div style={{ color: '#22c55e', marginBottom: '16px' }}>
                        <Shield size={48} />
                    </div>
                    <h3 style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '12px' }}>Safety Mission Timer</h3>
                    <div style={{ fontSize: '72px', fontWeight: '900', color: '#22c55e', lineHeight: 1, textShadow: '0 0 20px rgba(34, 197, 94, 0.4)' }}>
                        {daysWithoutIncident}
                    </div>
                    <p style={{ fontSize: '14px', color: '#64748b', marginTop: '16px' }}>DAYS WITHOUT INCIDENT</p>
                </div>

                {/* Compliance Card */}
                <div style={{
                    backgroundColor: 'rgba(30, 30, 30, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid #333',
                    borderRadius: '12px',
                    padding: '32px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div style={{ color: '#3b82f6', marginBottom: '16px' }}>
                        <Activity size={48} />
                    </div>
                    <h3 style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '12px' }}>Global Site Conformity</h3>
                    <div style={{ fontSize: '72px', fontWeight: '900', color: '#3b82f6', lineHeight: 1, textShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
                        {globalCompliance}%
                    </div>
                    <p style={{ fontSize: '14px', color: '#64748b', marginTop: '16px' }}>FLEET AUDIT STATUS: ACTIVE</p>
                </div>
            </div>

            {/* Auth Section */}
            <div style={{ zIndex: 1, width: '100%', maxWidth: '400px' }}>
                <form onSubmit={handleLogin} style={{ position: 'relative' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#1E1E1E',
                        border: error ? '1px solid #ef4444' : '1px solid #333',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        transition: 'all 0.3s ease',
                        boxShadow: error ? '0 0 15px rgba(239, 68, 68, 0.2)' : 'none'
                    }}>
                        <Lock size={18} color={error ? '#ef4444' : '#64748b'} style={{ marginRight: '12px' }} />
                        <input
                            type="password"
                            placeholder="Enter 6-Digit Access Code"
                            maxLength={6}
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '16px',
                                outline: 'none',
                                flex: 1,
                                letterSpacing: '4px',
                                fontWeight: 'bold'
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                backgroundColor: isScanning ? '#333' : '#3b82f6',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '8px',
                                cursor: 'pointer',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background-color 0.2s'
                            }}
                            disabled={isScanning}
                        >
                            {isScanning ? (
                                <div style={{ width: '20px', height: '20px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                            ) : (
                                <ChevronRight size={20} />
                            )}
                        </button>
                    </div>
                    {error && (
                        <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '12px', fontWeight: 'bold' }}>
                            INVALID ACCESS CODE - AUTHENTICATION FAILED
                        </p>
                    )}
                </form>

                {isScanning && !error && (
                    <div style={{ marginTop: '24px', textAlign: 'center' }}>
                        <div style={{
                            height: '2px',
                            width: '100%',
                            backgroundColor: '#333',
                            borderRadius: '1px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                height: '100%',
                                width: '40%',
                                backgroundColor: '#3b82f6',
                                animation: 'scan 1.5s ease-in-out infinite'
                            }}></div>
                        </div>
                        <p style={{ fontSize: '10px', color: '#3b82f6', marginTop: '8px', letterSpacing: '2px', fontWeight: 'bold' }}>SCANNING CREDENTIALS...</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div style={{ position: 'absolute', bottom: '32px', color: '#475569', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', zIndex: 1 }}>
                SECURITY LEVEL: ADMIN | INSPIRED BY SAFEEQUIP TECHNOLOGY
            </div>

            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                @keyframes scan {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(250%); }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
