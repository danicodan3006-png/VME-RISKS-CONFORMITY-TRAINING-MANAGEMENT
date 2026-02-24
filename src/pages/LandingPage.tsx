
import { useState, useEffect, useCallback, useRef } from 'react';
import { Shield, Lock, Unlock, Activity, Zap, Eye } from 'lucide-react';
import { useSafeEquip } from '../context/SafeEquipContext';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

// ═══════════════════════════════════════════════════════
// ANIMATED HEXAGONAL GRID BACKGROUND
// ═══════════════════════════════════════════════════════
const HexGrid = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        const hexSize = 30;
        const hexH = hexSize * Math.sqrt(3);
        const hexW = hexSize * 2;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const drawHex = (cx: number, cy: number, proximity: number) => {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i - Math.PI / 6;
                const x = cx + hexSize * Math.cos(angle);
                const y = cy + hexSize * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            const baseAlpha = 0.04;
            const glowAlpha = Math.max(0, (1 - proximity) * 0.5);
            const r = Math.round(239 * (1 - proximity * 0.3) + 249 * proximity * 0.3);
            const g = Math.round(68 * (1 - proximity) + 115 * proximity);
            const b = Math.round(68 * (1 - proximity * 0.7));
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${baseAlpha + glowAlpha})`;
            ctx.lineWidth = proximity < 0.8 ? 1.5 : 0.5;
            ctx.stroke();
            if (proximity < 0.5) {
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${glowAlpha * 0.08})`;
                ctx.fill();
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cols = Math.ceil(canvas.width / (hexW * 0.75)) + 2;
            const rows = Math.ceil(canvas.height / hexH) + 2;
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const influenceRadius = 200;
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const cx = col * hexW * 0.75;
                    const cy = row * hexH + (col % 2 === 1 ? hexH / 2 : 0);
                    const dist = Math.sqrt((cx - mx) ** 2 + (cy - my) ** 2);
                    const proximity = Math.min(dist / influenceRadius, 1);
                    drawHex(cx, cy, proximity);
                }
            }
            animationId = requestAnimationFrame(render);
        };
        render();
        const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
        window.addEventListener('mousemove', onMove);
        return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove); };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
};

// ═══════════════════════════════════════════════════════
// RADAR SCAN LINE
// ═══════════════════════════════════════════════════════
const RadarScanLine = () => (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
            position: 'absolute', left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.6) 30%, rgba(239,68,68,0.9) 50%, rgba(239,68,68,0.6) 70%, transparent 100%)',
            boxShadow: '0 0 20px rgba(239,68,68,0.4), 0 0 60px rgba(239,68,68,0.15)',
            animation: 'radarScan 6s ease-in-out infinite',
        }} />
    </div>
);

// ═══════════════════════════════════════════════════════
// NEON LOGO
// ═══════════════════════════════════════════════════════
const NeonLogo = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '12px' }}>
        <div style={{
            backgroundColor: '#ef4444', padding: '10px 14px', borderRadius: '6px',
            boxShadow: '0 0 15px rgba(239,68,68,0.5), 0 0 40px rgba(239,68,68,0.2), 0 0 80px rgba(239,68,68,0.08)',
            animation: 'neonPulse 3s ease-in-out infinite',
        }}>
            <span style={{ fontWeight: '900', fontSize: '28px', color: 'white', textShadow: '0 0 10px rgba(255,255,255,0.6)', letterSpacing: '2px' }}>VME</span>
        </div>
        <h1 style={{
            fontSize: '44px', fontWeight: '900', letterSpacing: '6px', textTransform: 'uppercase', margin: 0,
            background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 50%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(239,68,68,0.3))',
        }}>2026</h1>
    </div>
);

// ═══════════════════════════════════════════════════════
// LIVE CLOCK + CALENDAR MODULE (Top-Right)
// ═══════════════════════════════════════════════════════
const LiveClockCalendar = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Clock angles
    const secAngle = (seconds / 60) * 360;
    const minAngle = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hrAngle = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

    // Calendar
    const today = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const pad = (n: number) => n.toString().padStart(2, '0');

    const clockRadius = 80;
    const outerR = clockRadius - 3;
    const tickR = clockRadius - 10;

    return (
        <div style={{
            position: 'absolute', top: '48px', right: '20px', zIndex: 3,
            background: 'linear-gradient(145deg, rgba(16,16,22,0.92), rgba(10,10,15,0.96))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(239,68,68,0.12)',
            borderRadius: '18px', padding: '20px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)',
            width: '280px',
        }}>
            {/* Top accent line */}
            <div style={{ position: 'absolute', top: -1, left: '15%', right: '15%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.3), transparent)' }} />

            {/* ─── ANALOG CLOCK ─── */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <svg width={clockRadius * 2} height={clockRadius * 2} viewBox={`0 0 ${clockRadius * 2} ${clockRadius * 2}`}>
                    {/* Outer rotating seconds ring */}
                    <circle cx={clockRadius} cy={clockRadius} r={outerR} fill="none" stroke="rgba(239,68,68,0.08)" strokeWidth="2" />
                    <circle cx={clockRadius} cy={clockRadius} r={outerR} fill="none"
                        stroke="rgba(239,68,68,0.5)" strokeWidth="2.5"
                        strokeDasharray={`${(secAngle / 360) * 2 * Math.PI * outerR} ${2 * Math.PI * outerR}`}
                        strokeLinecap="round"
                        transform={`rotate(-90 ${clockRadius} ${clockRadius})`}
                        style={{ transition: seconds === 0 ? 'none' : 'stroke-dasharray 0.3s linear', filter: 'drop-shadow(0 0 4px rgba(239,68,68,0.4))' }}
                    />

                    {/* Tick marks */}
                    {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i / 12) * 360 - 90;
                        const rad = (angle * Math.PI) / 180;
                        const isMajor = i % 3 === 0;
                        const r1 = isMajor ? tickR - 8 : tickR - 4;
                        const r2 = tickR;
                        return (
                            <line key={i}
                                x1={clockRadius + r1 * Math.cos(rad)} y1={clockRadius + r1 * Math.sin(rad)}
                                x2={clockRadius + r2 * Math.cos(rad)} y2={clockRadius + r2 * Math.sin(rad)}
                                stroke={isMajor ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)'}
                                strokeWidth={isMajor ? 2 : 1}
                            />
                        );
                    })}

                    {/* Hour hand */}
                    <line x1={clockRadius} y1={clockRadius}
                        x2={clockRadius + 30 * Math.cos(((hrAngle - 90) * Math.PI) / 180)}
                        y2={clockRadius + 30 * Math.sin(((hrAngle - 90) * Math.PI) / 180)}
                        stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
                    {/* Minute hand */}
                    <line x1={clockRadius} y1={clockRadius}
                        x2={clockRadius + 45 * Math.cos(((minAngle - 90) * Math.PI) / 180)}
                        y2={clockRadius + 45 * Math.sin(((minAngle - 90) * Math.PI) / 180)}
                        stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Second hand */}
                    <line x1={clockRadius} y1={clockRadius}
                        x2={clockRadius + 54 * Math.cos(((secAngle - 90) * Math.PI) / 180)}
                        y2={clockRadius + 54 * Math.sin(((secAngle - 90) * Math.PI) / 180)}
                        stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 3px rgba(239,68,68,0.5))' }} />

                    {/* Center dot */}
                    <circle cx={clockRadius} cy={clockRadius} r="4" fill="#ef4444" style={{ filter: 'drop-shadow(0 0 4px rgba(239,68,68,0.6))' }} />

                    {/* Digital time in center */}
                    <text x={clockRadius} y={clockRadius + 28} textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
                    </text>
                </svg>
            </div>

            {/* Label */}
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '9px', fontWeight: '800', color: '#ef4444', letterSpacing: '3px' }}>OPERATIONAL TIME</span>
            </div>

            {/* ─── MINI CALENDAR ─── */}
            <div style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: '12px', padding: '10px',
            }}>
                {/* Month header */}
                <div style={{ textAlign: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '2px' }}>{monthNames[month]} {year}</span>
                </div>

                {/* Day-of-week headers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', marginBottom: '2px' }}>
                    {dayNames.map((d, i) => (
                        <div key={i} style={{ textAlign: 'center', fontSize: '9px', fontWeight: '700', color: '#475569', padding: '3px 0' }}>{d}</div>
                    ))}
                </div>

                {/* Day grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
                    {/* Empty cells before first day */}
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`e${i}`} style={{ padding: '3px' }} />
                    ))}
                    {/* Day cells */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const isToday = day === today;
                        return (
                            <div key={day} style={{
                                textAlign: 'center', fontSize: '10px', fontWeight: isToday ? '900' : '500',
                                color: isToday ? '#ef4444' : '#64748b',
                                padding: '4px 0', borderRadius: '5px', position: 'relative',
                                background: isToday ? 'rgba(239,68,68,0.1)' : 'transparent',
                                border: isToday ? '1px solid rgba(239,68,68,0.3)' : '1px solid transparent',
                                animation: isToday ? 'todayBreath 2s ease-in-out infinite' : 'none',
                            }}>
                                {day}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════════════
// SOUNDWAVE VISUALIZATION (Success Animation)
// ═══════════════════════════════════════════════════════
const SoundwaveSuccess = ({ active }: { active: boolean }) => {
    if (!active) return null;
    return (
        <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
            animation: 'fadeOut 1.5s ease-out forwards',
        }}>
            <svg width="100%" height="40" viewBox="0 0 400 40" style={{ overflow: 'visible' }}>
                {Array.from({ length: 30 }).map((_, i) => {
                    const x = 10 + i * 13;
                    const maxH = 6 + Math.sin(i * 0.5) * 12;
                    return (
                        <rect key={i} x={x} y={20 - maxH / 2} width="3" height={maxH} rx="1.5"
                            fill="#22c55e" opacity="0.7"
                            style={{ animation: `waveBar 0.6s ease-in-out ${i * 0.03}s both`, transformOrigin: 'center' }}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

// ═══════════════════════════════════════════════════════
// SLIDE-TO-UNLOCK BUTTON (Framer Motion)
// ═══════════════════════════════════════════════════════
const SlideToUnlock = ({ onUnlock, disabled }: { onUnlock: () => void; disabled: boolean }) => {
    const trackWidth = 380;
    const thumbSize = 48;
    const maxDrag = trackWidth - thumbSize - 8;
    const threshold = maxDrag * 0.85;

    const x = useMotionValue(0);
    const bgOpacity = useTransform(x, [0, maxDrag], [0, 0.3]);
    const lockRotate = useTransform(x, [0, maxDrag], [0, -25]);

    const [unlocked, setUnlocked] = useState(false);
    const [showWave, setShowWave] = useState(false);

    const handleDragEnd = () => {
        const currentX = x.get();
        if (currentX >= threshold) {
            // Snap to end
            animate(x, maxDrag, { type: 'spring', stiffness: 400, damping: 30 });
            setUnlocked(true);
            setShowWave(true);
            setTimeout(() => onUnlock(), 800);
        } else {
            // Spring back
            animate(x, 0, { type: 'spring', stiffness: 500, damping: 35 });
        }
    };

    return (
        <div style={{ position: 'relative', width: `${trackWidth}px`, margin: '0 auto' }}>
            {/* Track */}
            <div style={{
                width: '100%', height: `${thumbSize + 8}px`, borderRadius: '30px',
                background: 'linear-gradient(145deg, rgba(20,20,25,0.95), rgba(12,12,16,0.98))',
                border: unlocked ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(239,68,68,0.15)',
                boxShadow: unlocked
                    ? '0 0 20px rgba(34,197,94,0.15), inset 0 2px 8px rgba(0,0,0,0.4)'
                    : '0 8px 32px rgba(0,0,0,0.4), inset 0 2px 8px rgba(0,0,0,0.4)',
                position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.3s, box-shadow 0.3s',
            }}>
                {/* Animated fill behind thumb */}
                <motion.div style={{
                    position: 'absolute', top: 0, left: 0, bottom: 0,
                    width: '100%',
                    background: unlocked
                        ? 'linear-gradient(90deg, rgba(34,197,94,0.08), rgba(34,197,94,0.15))'
                        : 'linear-gradient(90deg, rgba(239,68,68,0.04), rgba(239,68,68,0.1))',
                    opacity: bgOpacity,
                    borderRadius: '30px',
                }} />

                {/* Label text */}
                <div style={{
                    position: 'absolute', inset: 0, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    pointerEvents: 'none',
                }}>
                    <span style={{
                        fontSize: '10px', fontWeight: '800', letterSpacing: '4px',
                        color: unlocked ? '#22c55e' : 'rgba(239,68,68,0.3)',
                        transition: 'color 0.3s',
                    }}>
                        {unlocked ? '✓ ACCESS GRANTED' : 'SLIDE TO UNLOCK'}
                    </span>
                </div>

                {/* Sliding chevron hints */}
                {!unlocked && (
                    <div style={{
                        position: 'absolute', top: '50%', right: '60px', transform: 'translateY(-50%)',
                        display: 'flex', gap: '4px', pointerEvents: 'none',
                        animation: 'slideHint 2s ease-in-out infinite',
                    }}>
                        {[0.15, 0.3, 0.5].map((op, i) => (
                            <span key={i} style={{ fontSize: '12px', color: `rgba(239,68,68,${op})` }}>›</span>
                        ))}
                    </div>
                )}

                {/* Soundwave overlay */}
                <SoundwaveSuccess active={showWave} />

                {/* Draggable Thumb */}
                <motion.div
                    drag={disabled || unlocked ? false : 'x'}
                    dragConstraints={{ left: 0, right: maxDrag }}
                    dragElastic={0.05}
                    dragMomentum={false}
                    onDragEnd={handleDragEnd}
                    style={{
                        x,
                        position: 'absolute', top: '4px', left: '4px',
                        width: `${thumbSize}px`, height: `${thumbSize}px`,
                        borderRadius: '50%',
                        background: unlocked
                            ? 'linear-gradient(145deg, #22c55e, #16a34a)'
                            : 'linear-gradient(145deg, #ef4444, #dc2626)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: disabled || unlocked ? 'default' : 'grab',
                        boxShadow: unlocked
                            ? '0 0 20px rgba(34,197,94,0.5), 0 4px 16px rgba(0,0,0,0.3)'
                            : '0 0 12px rgba(239,68,68,0.3), 0 4px 16px rgba(0,0,0,0.3)',
                        transition: 'background 0.3s, box-shadow 0.3s',
                        zIndex: 2,
                    }}
                    whileDrag={{ scale: 1.08 }}
                >
                    <motion.div style={{ rotate: lockRotate, display: 'flex' }}>
                        {unlocked
                            ? <Unlock size={20} color="white" strokeWidth={2.5} />
                            : <Lock size={20} color="white" strokeWidth={2.5} />
                        }
                    </motion.div>
                    {/* Green flash on unlock */}
                    {unlocked && (
                        <div style={{
                            position: 'absolute', inset: '-8px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(34,197,94,0.4) 0%, transparent 70%)',
                            animation: 'greenFlash 0.5s ease-out forwards',
                            pointerEvents: 'none',
                        }} />
                    )}
                </motion.div>
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════════════
// MAIN LANDING PAGE
// ═══════════════════════════════════════════════════════
const LandingPage = () => {
    const { dataset, login, lastIncidentDate, TOTAL_POPULATION } = useSafeEquip();
    const [accessCode, setAccessCode] = useState('');
    const [error, setError] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [keyFlash, setKeyFlash] = useState(false);
    const [typedUser, setTypedUser] = useState('');
    const [typedPass, setTypedPass] = useState('');
    const [autoFillPhase, setAutoFillPhase] = useState<'typing' | 'done' | 'idle'>('idle');

    // Safety Clock (Dynamic Counter)
    const daysWithoutIncident = Math.floor((new Date().getTime() - new Date(lastIncidentDate).getTime()) / (1000 * 3600 * 24));

    const [displayDays, setDisplayDays] = useState(0);
    useEffect(() => {
        const target = Math.max(daysWithoutIncident, 127);
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) { setDisplayDays(target); clearInterval(timer); }
            else { setDisplayDays(Math.floor(current)); }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [daysWithoutIncident]);

    // Compliance Target
    const complianceTarget = 54.8;

    // Typewriter Auto-Fill
    useEffect(() => {
        const demoUser = 'admin';
        const demoPass = '••••••';
        let userIdx = 0;
        let passIdx = 0;
        const startDelay = setTimeout(() => {
            setAutoFillPhase('typing');
            const userTimer = setInterval(() => {
                if (userIdx < demoUser.length) { setTypedUser(demoUser.slice(0, userIdx + 1)); userIdx++; }
                else {
                    clearInterval(userTimer);
                    const passTimer = setInterval(() => {
                        if (passIdx < demoPass.length) { setTypedPass(demoPass.slice(0, passIdx + 1)); passIdx++; }
                        else { clearInterval(passTimer); setAutoFillPhase('done'); }
                    }, 120);
                }
            }, 150);
        }, 1200);
        return () => clearTimeout(startDelay);
    }, []);

    // Keypress Visual Beep
    const handleKeyDown = useCallback(() => {
        setKeyFlash(true);
        setTimeout(() => setKeyFlash(false), 100);
    }, []);

    // Login — via slide-to-unlock or fallback form
    const handleSlideUnlock = () => {
        setIsScanning(true);
        setTimeout(() => {
            if (login(accessCode)) {
                // success
            } else {
                setError(true);
                setIsScanning(false);
                setAccessCode('');
                setTimeout(() => setError(false), 2000);
            }
        }, 800);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSlideUnlock();
    };

    return (
        <div style={{
            backgroundColor: '#0a0a0f', height: '100vh', width: '100vw',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            color: 'white', fontFamily: '"Inter", "JetBrains Mono", monospace',
            overflow: 'hidden', position: 'relative',
        }}>
            <HexGrid />
            <RadarScanLine />

            {/* Keypress flash */}
            {keyFlash && (
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    background: 'radial-gradient(circle at center, rgba(239,68,68,0.04) 0%, transparent 60%)',
                    pointerEvents: 'none', animation: 'flashBeep 0.15s ease-out forwards',
                }} />
            )}

            {/* Corner Tactical Frames */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => {
                const isTop = pos.includes('top');
                const isLeft = pos.includes('left');
                return (
                    <div key={pos} style={{
                        position: 'absolute',
                        [isTop ? 'top' : 'bottom']: '16px',
                        [isLeft ? 'left' : 'right']: '16px',
                        width: '40px', height: '40px',
                        borderTop: isTop ? '2px solid rgba(239,68,68,0.3)' : 'none',
                        borderBottom: !isTop ? '2px solid rgba(239,68,68,0.3)' : 'none',
                        borderLeft: isLeft ? '2px solid rgba(239,68,68,0.3)' : 'none',
                        borderRight: !isLeft ? '2px solid rgba(239,68,68,0.3)' : 'none',
                        zIndex: 1,
                    }} />
                );
            })}

            {/* TOP HEADER BAR */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, padding: '10px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(239,68,68,0.08)',
                background: 'linear-gradient(180deg, rgba(10,10,15,0.9) 0%, transparent 100%)', zIndex: 2,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 8px #ef4444', animation: 'neonPulse 2s infinite' }} />
                    <span style={{ fontSize: '9px', fontWeight: '700', color: '#ef4444', letterSpacing: '2px' }}>SYSTEM ACTIVE</span>
                </div>
                <span style={{ fontSize: '8px', fontWeight: '600', color: '#334155', letterSpacing: '1px' }}>VME OPERATIONAL COMMAND CENTER · KCC KINSEVERE</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Eye size={10} color="#475569" />
                    <span style={{ fontSize: '9px', fontWeight: '700', color: '#475569', letterSpacing: '1px' }}>MONITORING</span>
                </div>
            </div>

            {/* ═══ LIVE CLOCK + CALENDAR (Top-Right) ═══ */}
            <LiveClockCalendar />

            {/* ═══ LOGO ═══ */}
            <div style={{ textAlign: 'center', marginBottom: '36px', zIndex: 2, animation: 'fadeInDown 0.8s ease-out forwards' }}>
                <NeonLogo />
                <p style={{
                    color: '#ef4444', fontWeight: '700', letterSpacing: '4px', fontSize: '11px', margin: '4px 0 0 0',
                    textShadow: '0 0 15px rgba(239,68,68,0.3)',
                    animation: 'terminalBlink 3s step-end infinite',
                }}>OPERATIONAL COMMAND CENTER</p>
            </div>

            {/* ═══ MISSION STATS GRID ═══ */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'minmax(250px, 350px) minmax(250px, 350px)',
                gap: '14px', zIndex: 2, width: '100%', maxWidth: '760px',
                marginBottom: '32px', padding: '0 20px',
                animation: 'fadeInUp 0.6s ease-out 0.3s both',
            }}>
                {/* Safety Clock Card */}
                <div style={{
                    background: 'linear-gradient(145deg, rgba(20,20,25,0.9), rgba(12,12,16,0.95))',
                    backdropFilter: 'blur(16px)', border: '1px solid rgba(34,197,94,0.15)',
                    borderRadius: '14px', padding: '24px', textAlign: 'center', position: 'relative',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent)' }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                        <Shield size={18} color="#22c55e" />
                        <h3 style={{ fontSize: '10px', color: '#22c55e', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>Days Without Incident</h3>
                    </div>
                    <div style={{
                        fontSize: '56px', fontWeight: '900', color: '#22c55e', lineHeight: 1,
                        textShadow: '0 0 30px rgba(34,197,94,0.4), 0 0 60px rgba(34,197,94,0.15)',
                        fontFamily: '"JetBrains Mono", monospace',
                    }}>{displayDays}</div>
                    <p style={{ fontSize: '8px', color: '#475569', marginTop: '10px', letterSpacing: '2px', fontWeight: '700', margin: '10px 0 0 0' }}>REAL-TIME SAFETY CLOCK · AUTO-SYNC</p>
                </div>

                {/* YTD 2026 Card */}
                <div style={{
                    background: 'linear-gradient(145deg, rgba(20,20,25,0.9), rgba(12,12,16,0.95))',
                    backdropFilter: 'blur(16px)', border: '1px solid rgba(59,130,246,0.15)',
                    borderRadius: '14px', padding: '24px', textAlign: 'center', position: 'relative',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)' }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                        <Activity size={18} color="#3b82f6" />
                        <h3 style={{ fontSize: '10px', color: '#3b82f6', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>Global Incidents 2026</h3>
                    </div>
                    <div style={{
                        fontSize: '56px', fontWeight: '900', color: '#3b82f6', lineHeight: 1,
                        textShadow: '0 0 30px rgba(59,130,246,0.4)', fontFamily: '"JetBrains Mono", monospace', marginBottom: '6px',
                    }}>{dataset.reduce((sum, d) => sum + d.incidents, 0)}</div>
                    <p style={{ fontSize: '9px', color: '#94a3b8', margin: '0 0 12px 0', fontWeight: '600' }}>Annual YTD Audited Count</p>
                    <div style={{ width: '100%' }}>
                        <div style={{ fontSize: '26px', fontWeight: '900', color: '#f59e0b', fontFamily: '"Roboto Mono", monospace', textShadow: '0 0 10px rgba(245,158,11,0.3)' }}>{TOTAL_POPULATION.toLocaleString()}</div>
                        <div style={{ fontSize: '8px', color: '#475569', fontWeight: '800', letterSpacing: '1px', marginTop: '2px' }}>TOTAL POPULATION</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '8px', color: '#475569', fontWeight: '700', letterSpacing: '1px' }}>2026 TARGET COMPLIANCE</span>
                            <span style={{ fontSize: '9px', fontWeight: '900', color: '#f59e0b' }}>{complianceTarget}%</span>
                        </div>
                        <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{
                                width: `${complianceTarget}%`, height: '100%', borderRadius: '3px',
                                background: 'linear-gradient(90deg, #3b82f6, #f59e0b)',
                                boxShadow: '0 0 12px rgba(59,130,246,0.3)',
                                animation: 'barFill 2s ease-out 0.5s both',
                            }} />
                        </div>
                    </div>
                    <p style={{ fontSize: '7px', color: '#334155', letterSpacing: '1px', fontWeight: '600', margin: '8px 0 0 0' }}>
                        FLEET AUDIT STATUS: <span style={{ color: '#22c55e' }}>ACTIVE</span>
                    </p>
                </div>
            </div>

            {/* ═══ AUTH SECTION ═══ */}
            <div style={{ zIndex: 2, width: '100%', maxWidth: '480px', padding: '0 20px', animation: 'fadeInUp 0.6s ease-out 0.6s both' }}>
                {/* Typewriter preview */}
                {autoFillPhase !== 'idle' && (
                    <div style={{
                        marginBottom: '10px', padding: '10px 14px',
                        background: 'rgba(20,20,25,0.8)', border: '1px solid rgba(239,68,68,0.1)',
                        borderRadius: '8px', fontFamily: '"JetBrains Mono", monospace',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            <Zap size={10} color="#ef4444" />
                            <span style={{ fontSize: '7px', color: '#ef4444', fontWeight: '800', letterSpacing: '2px' }}>DEMO AUTO-FILL · CAPTURE 2</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>
                            <span style={{ color: '#475569' }}>user: </span>
                            <span style={{ color: '#22c55e' }}>{typedUser}</span>
                            {autoFillPhase === 'typing' && typedUser.length < 5 && <span style={{ animation: 'cursorBlink 0.8s step-end infinite', color: '#22c55e' }}>▌</span>}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>
                            <span style={{ color: '#475569' }}>pass: </span>
                            <span style={{ color: '#f59e0b' }}>{typedPass}</span>
                            {autoFillPhase === 'typing' && typedUser.length >= 5 && typedPass.length < 6 && <span style={{ animation: 'cursorBlink 0.8s step-end infinite', color: '#f59e0b' }}>▌</span>}
                        </div>
                    </div>
                )}

                {/* Access Code Input */}
                <form onSubmit={handleFormSubmit}>
                    <div style={{
                        display: 'flex', alignItems: 'center',
                        background: 'linear-gradient(145deg, rgba(20,20,25,0.95), rgba(12,12,16,0.98))',
                        border: error ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(239,68,68,0.12)',
                        borderRadius: '10px', padding: '10px 16px', marginBottom: '12px',
                        transition: 'all 0.3s ease',
                        boxShadow: error ? '0 0 20px rgba(239,68,68,0.3)' : '0 8px 32px rgba(0,0,0,0.4)',
                    }}>
                        <Lock size={14} color="#ef4444" style={{ marginRight: '12px', opacity: 0.5 }} />
                        <input
                            type="password" placeholder="ENTER 6-DIGIT ACCESS CODE" maxLength={6}
                            value={accessCode} onChange={(e) => setAccessCode(e.target.value)} onKeyDown={handleKeyDown}
                            style={{
                                backgroundColor: 'transparent', border: 'none', color: '#ef4444',
                                fontSize: '13px', outline: 'none', flex: 1, letterSpacing: '6px',
                                fontWeight: '800', fontFamily: '"JetBrains Mono", monospace',
                            }}
                        />
                    </div>
                </form>

                {/* Slide-to-Unlock */}
                <SlideToUnlock onUnlock={handleSlideUnlock} disabled={isScanning || accessCode.length < 6} />

                {/* Error */}
                {error && (
                    <p style={{
                        color: '#ef4444', fontSize: '10px', textAlign: 'center', marginTop: '12px',
                        fontWeight: '800', letterSpacing: '2px', animation: 'shake 0.4s ease-out',
                    }}>⚠ INVALID ACCESS CODE — AUTHENTICATION FAILED</p>
                )}

                {/* Scanning bar (shows during auth verification) */}
                {isScanning && !error && (
                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                        <div style={{ height: '2px', width: '100%', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '1px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{
                                position: 'absolute', height: '100%', width: '40%',
                                background: 'linear-gradient(90deg, transparent, #22c55e, transparent)',
                                animation: 'scanBar 1.2s ease-in-out infinite',
                            }} />
                        </div>
                        <p style={{ fontSize: '9px', color: '#22c55e', marginTop: '8px', letterSpacing: '3px', fontWeight: '800', animation: 'terminalBlink 1s step-end infinite' }}>VERIFYING CREDENTIALS...</p>
                    </div>
                )}
            </div>

            {/* FOOTER */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderTop: '1px solid rgba(239,68,68,0.06)',
                background: 'linear-gradient(0deg, rgba(10,10,15,0.9) 0%, transparent 100%)', zIndex: 2,
            }}>
                <span style={{ fontSize: '8px', color: '#334155', fontWeight: '700', letterSpacing: '1px' }}>Security Level: Admin | Encrypted via SafeEquip Logic</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 8px #22c55e', animation: 'neonPulse 2s infinite' }} />
                    <span style={{ fontSize: '8px', color: '#334155', fontWeight: '700', letterSpacing: '1px' }}>VME 2026 · SAFEEQUIP · KCC KINSEVERE</span>
                </div>
            </div>

            {/* ═══ ANIMATIONS ═══ */}
            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                @keyframes radarScan { 0% { top: -2px; } 50% { top: 100%; } 100% { top: -2px; } }
                @keyframes neonPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
                @keyframes loginPulse {
                    0%, 100% { box-shadow: 0 0 12px rgba(239,68,68,0.3); }
                    50% { box-shadow: 0 0 24px rgba(239,68,68,0.6), 0 0 48px rgba(239,68,68,0.15); }
                }
                @keyframes terminalBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                @keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                @keyframes scanBar { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }
                @keyframes flashBeep { 0% { opacity: 1; } 100% { opacity: 0; } }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-8px); } 40% { transform: translateX(8px); }
                    60% { transform: translateX(-4px); } 80% { transform: translateX(4px); }
                }
                @keyframes fadeInDown { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
                @keyframes barFill { 0% { width: 0%; } }
                @keyframes todayBreath {
                    0%, 100% { box-shadow: 0 0 4px rgba(239,68,68,0.2); background: rgba(239,68,68,0.08); }
                    50% { box-shadow: 0 0 12px rgba(239,68,68,0.5), 0 0 24px rgba(239,68,68,0.15); background: rgba(239,68,68,0.18); }
                }
                @keyframes greenFlash {
                    0% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(2); opacity: 0; }
                }
                @keyframes slideHint {
                    0%, 100% { transform: translateX(0); opacity: 0.5; }
                    50% { transform: translateX(8px); opacity: 1; }
                }
                @keyframes waveBar {
                    0% { transform: scaleY(0); } 
                    50% { transform: scaleY(1); }
                    100% { transform: scaleY(0.3); }
                }
                @keyframes fadeOut {
                    0% { opacity: 1; }
                    70% { opacity: 1; }
                    100% { opacity: 0; }
                }
                input::placeholder {
                    color: rgba(239,68,68,0.25) !important;
                    font-size: 10px !important;
                    letter-spacing: 3px !important;
                    font-weight: 600 !important;
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
