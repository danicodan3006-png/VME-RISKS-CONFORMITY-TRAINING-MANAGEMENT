
import { Target, TrendingDown, Users, Shield, Zap } from 'lucide-react';

const VmeStrategy = () => {
    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            backgroundColor: '#121212',
            color: 'white',
            fontFamily: '"Inter", sans-serif',
            overflow: 'hidden'
        }}>
            {/* Left Side - Strategic Branding */}
            <div style={{
                flex: 1,
                backgroundColor: '#1E1E1E',
                backgroundImage: 'linear-gradient(135deg, #111 0%, #1E1E1E 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '64px',
                position: 'relative',
                borderRight: '1px solid #333'
            }}>
                {/* Tech Overlays */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', opacity: 0.1 }}>
                    <div style={{ position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)' }}></div>
                </div>

                <div style={{ zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                        <Shield size={48} color="#ef4444" />
                        <div style={{ height: '40px', width: '2px', backgroundColor: '#333' }}></div>
                        <h2 style={{ fontSize: '14px', fontWeight: '900', color: '#475569', letterSpacing: '4px' }}>PROTOCOL v2026</h2>
                    </div>
                    <h1 style={{ fontSize: '84px', fontWeight: '900', lineHeight: 0.9, marginBottom: '24px', letterSpacing: '-2px' }}>
                        VME<br />
                        <span style={{ color: '#ef4444' }}>STRATEGY</span>
                    </h1>
                    <div style={{ width: '120px', height: '12px', backgroundColor: '#ef4444', borderRadius: '2px' }}></div>
                </div>

                <div style={{ zIndex: 1, borderLeft: '4px solid #ef4444', paddingLeft: '24px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '900', color: 'white', letterSpacing: '1px' }}>MISSION CRITICAL DATA</h2>
                    <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px', maxWidth: '300px' }}>
                        Synchronized operational targets for the Kinsevere 2026 safety cycle.
                    </p>
                </div>
            </div>

            {/* Right Side - Performance Plan */}
            <div style={{
                flex: 1,
                padding: '80px 100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#121212'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <Target size={24} color="#ef4444" />
                    <span style={{ fontSize: '14px', fontWeight: '900', color: '#ef4444', letterSpacing: '2px' }}>ANNUAL OBJECTIVES</span>
                </div>
                <h2 style={{ fontSize: '56px', fontWeight: '900', color: 'white', marginBottom: '64px', letterSpacing: '-1px' }}>2026 EXECUTION</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>

                    {/* Objective 1 */}
                    <div style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#ef4444', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    ACCIDENT REDUCTION
                                </h3>
                                <p style={{ fontSize: '24px', color: 'white', fontWeight: '400', lineHeight: 1.4 }}>
                                    <span style={{ fontWeight: '900' }}>L&lt;48</span> INCIDENTS ANALYZED<br />
                                    <span style={{ color: '#22c55e', fontSize: '18px', fontWeight: 'bold' }}>-10% TARGET VS 2025 (54)</span>
                                </p>
                            </div>
                            <TrendingDown size={32} color="#22c55e" />
                        </div>
                        <div style={{ width: '100%', height: '1px', backgroundColor: '#333', marginTop: '32px' }}></div>
                    </div>

                    {/* Objective 2 */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#ef4444', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    TRAFFIC OPTIMIZATION
                                </h3>
                                <p style={{ fontSize: '24px', color: 'white', fontWeight: '400', lineHeight: 1.4 }}>
                                    <span style={{ fontWeight: '900' }}>-30 SEATS</span> REDUCTION<br />
                                    <span style={{ color: '#64748b', fontSize: '18px' }}>LOWER TRAFFIC = LOWER INTERACTION</span>
                                </p>
                            </div>
                            <Users size={32} color="#3b82f6" />
                        </div>
                        <div style={{ width: '100%', height: '1px', backgroundColor: '#333', marginTop: '32px' }}></div>
                    </div>

                    {/* Objective 3 */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#ef4444', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    COMPETENCY PROTOCOL
                                </h3>
                                <p style={{ fontSize: '24px', color: 'white', fontWeight: '400', lineHeight: 1.4 }}>
                                    <span style={{ fontWeight: '900' }}>90% PASS RATE</span> (VOC)<br />
                                    <span style={{ color: '#3b82f6', fontSize: '18px', fontWeight: 'bold' }}>STRENGTHENED DRIVER SELECTION MATRIX</span>
                                </p>
                            </div>
                            <Zap size={32} color="#eab308" />
                        </div>
                        <div style={{ width: '40px', height: '4px', backgroundColor: '#ef4444', marginTop: '32px', borderRadius: '2px' }}></div>
                    </div>

                </div>
            </div>

            {/* Footer Tag */}
            <div style={{ position: 'absolute', bottom: '32px', right: '32px', display: 'flex', gap: '24px' }}>
                <span style={{ fontSize: '10px', color: '#475569', fontWeight: 'bold' }}>VME.HQ.KINSEVERE</span>
                <span style={{ fontSize: '10px', color: '#475569', fontWeight: 'bold' }}>2026.Q1.STRAT</span>
            </div>
        </div>
    );
};

export default VmeStrategy;
