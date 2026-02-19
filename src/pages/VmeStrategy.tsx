
import React from 'react';

const VmeStrategy = () => {
    return (
        <div style={{ display: 'flex', height: 'calc(100vh - 80px)', margin: '-32px', overflow: 'hidden' }}>
            {/* Left Side - Hero/Banner */}
            <div style={{
                flex: 1,
                backgroundColor: '#1e293b',
                backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '64px',
                color: 'white',
                position: 'relative'
            }}>
                {/* Decorative Elements */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(211,47,47,0.2) 0%, rgba(0,0,0,0) 70%)' }}></div>
                    <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 60%)' }}></div>
                </div>

                <div style={{ zIndex: 1 }}>
                    <h1 style={{ fontSize: '72px', fontWeight: '900', lineHeight: 1.1, marginBottom: '24px' }}>
                        VME<br />
                        STRATEGY
                    </h1>
                    <div style={{ width: '100px', height: '8px', backgroundColor: '#d32f2f' }}></div>
                </div>

                <div style={{ zIndex: 1 }}>
                    <h2 style={{ fontSize: '64px', fontWeight: '900', color: 'rgba(255,255,255,0.9)' }}>THANKS</h2>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>8</p>
                </div>
            </div>

            {/* Right Side - Content */}
            <div style={{
                flex: 1,
                backgroundColor: 'white',
                padding: '80px 64px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#d32f2f', marginBottom: '64px' }}>2026 plan</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

                    {/* Item 1 */}
                    <div>
                        <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#d32f2f', marginBottom: '12px', textTransform: 'uppercase' }}>
                            ACCIDENTS RECORDED
                        </h3>
                        <p style={{ fontSize: '20px', color: '#1e293b', fontWeight: '400', lineHeight: 1.5 }}>
                            48 (LESS THAN)<br />
                            <span style={{ color: '#475569' }}>-10% OR MORE VS 54 (2025)</span>
                        </p>
                        <div style={{ width: '100%', height: '1px', backgroundColor: '#e2e8f0', marginTop: '32px' }}></div>
                    </div>

                    {/* Item 2 */}
                    <div>
                        <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#d32f2f', marginBottom: '12px', textTransform: 'uppercase' }}>
                            VEHICLE INTERACTION
                        </h3>
                        <p style={{ fontSize: '20px', color: '#1e293b', fontWeight: '400', lineHeight: 1.5 }}>
                            -30 (LESS DRIVERS LESS TRAFFIC)
                        </p>
                        <div style={{ width: '100%', height: '1px', backgroundColor: '#e2e8f0', marginTop: '32px' }}></div>
                    </div>

                    {/* Item 3 */}
                    <div>
                        <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#d32f2f', marginBottom: '12px', textTransform: 'uppercase' }}>
                            STRENGTH COMPETENCY SYSTEM
                        </h3>
                        <p style={{ fontSize: '20px', color: '#1e293b', fontWeight: '400', lineHeight: 1.5 }}>
                            90% PASS (DRIVERS SELECTION)
                        </p>
                        <div style={{ width: '100%', height: '1px', backgroundColor: '#d32f2f', marginTop: '32px' }}></div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default VmeStrategy;
