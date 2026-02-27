import { useState, useEffect } from 'react';
import { Shield, Lock } from 'lucide-react';
import { useSafeEquip } from '../context/SafeEquipContext';

// ═══════════════════════════════════════════════════════
// SECURE GATEWAY HUB — The Entry to VME 2026
// ═══════════════════════════════════════════════════════

const LandingPage = () => {
    const { login } = useSafeEquip();
    const [pin, setPin] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(false);
    const [hapticKey, setHapticKey] = useState<number | null>(null);

    // PIN Handling
    const handleNumberClick = (num: number) => {
        if (pin.length < 6) {
            setPin(prev => prev + num);
            setHapticKey(num);
            setTimeout(() => setHapticKey(null), 150);
        }
    };

    const handleDelete = () => {
        setPin(prev => prev.slice(0, -1));
    };

    useEffect(() => {
        if (pin.length === 6) {
            if (pin === '202600') {
                setIsAuthenticating(true);
            } else {
                setError(true);
                setTimeout(() => {
                    setError(false);
                    setPin('');
                }, 1000);
            }
        }
    }, [pin]);

    // System Loading Simulation
    useEffect(() => {
        if (isAuthenticating) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        login('202600');
                        return 100;
                    }
                    return prev + 2;
                });
            }, 30);
            return () => clearInterval(interval);
        }
    }, [isAuthenticating, login]);

    return (
        <div style={{
            height: '100vh', width: '100vw',
            backgroundColor: '#050508',
            backgroundImage: 'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden'
        }}>

            {/* Glassmorphism Overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundColor: 'rgba(5, 5, 8, 0.6)',
                backdropFilter: 'blur(15px)',
                zIndex: 1
            }} />

            {/* Deep Cyan Center Glow */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px', height: '600px',
                background: 'radial-gradient(circle, rgba(0, 242, 255, 0.15) 0%, transparent 70%)',
                zIndex: 2, pointerEvents: 'none'
            }} />

            {/* Content Container */}
            <div style={{
                zIndex: 3, display: 'flex', flexDirection: 'column',
                alignItems: 'center', width: '100%', maxWidth: '400px',
                padding: '20px'
            }}>

                {/* HD MMG Logo */}
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/MMG_Logo.svg/1000px-MMG_Logo.svg.png"
                        alt="MMG"
                        style={{ height: '64px', filter: 'drop-shadow(0 0 20px rgba(0, 242, 255, 0.3))' }}
                    />
                    <div style={{
                        marginTop: '12px', fontSize: '12px', fontWeight: '900',
                        color: 'white', letterSpacing: '4px', textTransform: 'uppercase'
                    }}>
                        Mission Control Gateway
                    </div>
                </div>

                {!isAuthenticating ? (
                    <>
                        {/* PIN Entry Display */}
                        <div style={{
                            display: 'flex', gap: '12px', marginBottom: '40px',
                            animation: error ? 'shake 0.4s ease-in-out' : 'none'
                        }}>
                            {[...Array(6)].map((_, i) => (
                                <div key={i} style={{
                                    width: '16px', height: '16px',
                                    borderRadius: '50%',
                                    border: `2px solid ${error ? '#ef4444' : '#00F2FF'}`,
                                    backgroundColor: pin.length > i ? (error ? '#ef4444' : '#00F2FF') : 'transparent',
                                    boxShadow: pin.length > i ? `0 0 10px ${error ? '#ef4444' : '#00F2FF'}` : 'none',
                                    transition: 'all 0.2s'
                                }} />
                            ))}
                        </div>

                        {/* PIN Pad Grid */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '16px', width: '100%'
                        }}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                <button
                                    key={num}
                                    onClick={() => handleNumberClick(num)}
                                    style={{
                                        aspectRatio: '1', borderRadius: '50%',
                                        background: hapticKey === num ? 'rgba(0, 242, 255, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                                        border: `1px solid ${hapticKey === num ? '#00F2FF' : 'rgba(255, 255, 255, 0.1)'}`,
                                        color: 'white', fontSize: '24px', fontWeight: '700',
                                        cursor: 'pointer', transition: 'all 0.1s',
                                        boxShadow: hapticKey === num ? '0 0 15px rgba(0, 242, 255, 0.4)' : 'none'
                                    }}
                                >
                                    {num}
                                </button>
                            ))}
                            <div />
                            <button
                                onClick={() => handleNumberClick(0)}
                                style={{
                                    aspectRatio: '1', borderRadius: '50%',
                                    background: hapticKey === 0 ? 'rgba(0, 242, 255, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                                    border: `1px solid ${hapticKey === 0 ? '#00F2FF' : 'rgba(255, 255, 255, 0.1)'}`,
                                    color: 'white', fontSize: '24px', fontWeight: '700',
                                    cursor: 'pointer', transition: 'all 0.1s',
                                    boxShadow: hapticKey === 0 ? '0 0 15px rgba(0, 242, 255, 0.4)' : 'none'
                                }}
                            >
                                0
                            </button>
                            <button
                                onClick={handleDelete}
                                style={{
                                    aspectRatio: '1', borderRadius: '50%',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: '#64748b', fontSize: '14px', fontWeight: '900',
                                    cursor: 'pointer', transition: 'all 0.2s'
                                }}
                            >
                                DEL
                            </button>
                        </div>

                        <a href="#" style={{
                            marginTop: '32px', color: '#64748b', fontSize: '10px',
                            fontWeight: '700', textDecoration: 'none', letterSpacing: '1px'
                        }}>
                            FORGOT PIN? CONTACT SSHEC ADMIN
                        </a>
                    </>
                ) : (
                    <div style={{ width: '100%', textAlign: 'center', animation: 'fadeIn 0.5s ease-out' }}>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{
                                fontSize: '14px', fontWeight: '900', color: '#00F2FF',
                                letterSpacing: '3px', marginBottom: '8px'
                            }}>
                                SYSTEM LOADING
                            </div>
                            <div style={{
                                fontSize: '48px', fontWeight: '900', color: 'white',
                                fontFamily: '"Roboto Mono", monospace'
                            }}>
                                {progress}<span style={{ fontSize: '24px' }}>%</span>
                            </div>
                        </div>
                        {/* Progress Bar Container */}
                        <div style={{
                            width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '2px', overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${progress}%`, height: '100%',
                                background: 'linear-gradient(90deg, #00F2FF, #3b82f6)',
                                boxShadow: '0 0 15px #00F2FF'
                            }} />
                        </div>
                        <div style={{
                            marginTop: '16px', fontSize: '9px', color: '#64748b',
                            fontWeight: '800', letterSpacing: '2px'
                        }}>
                            INITIALIZING SECURE PROTOCOLS...
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Signature */}
            <div style={{
                position: 'absolute', bottom: '32px', zIndex: 3,
                textAlign: 'center', opacity: 0.6
            }}>
                <div style={{
                    fontSize: '10px', fontWeight: '900', color: 'white',
                    letterSpacing: '2px', marginBottom: '4px'
                }}>
                    VME 2026 - SECURE INTERFACE | AUTHORIZED PERSONNEL ONLY
                </div>
                <div style={{
                    fontSize: '9px', fontWeight: '700', color: '#00F2FF',
                    letterSpacing: '1px'
                }}>
                    Designed by Dan Kahilu | CHIEF SYSTEMS ARCHITECT
                </div>
            </div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
