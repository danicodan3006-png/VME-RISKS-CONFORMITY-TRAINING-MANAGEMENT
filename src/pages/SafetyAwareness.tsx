
import { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Target, Users, Zap, Circle, X, PlayCircle } from 'lucide-react';

// --- Data Engine ---
const departmentalData = [
    { name: 'Mining', sensitized: 112, total: 1398 },
    { name: 'Transport', sensitized: 67, total: 195 },
    { name: 'SSHEC', sensitized: 34, total: 157 },
    { name: 'Exploration', sensitized: 0, total: 57 },
    { name: 'Supply Chain', sensitized: 0, total: 69 },
    { name: 'Finance', sensitized: 0, total: 6 },
    { name: 'Hydromet', sensitized: 0, total: 53 },
    { name: 'Tailings', sensitized: 0, total: 78 },
    { name: 'Sulphite', sensitized: 0, total: 167 },
    { name: 'HR & Medical', sensitized: 0, total: 26 },
    { name: 'Compliance', sensitized: 0, total: 8 },
    { name: 'Stakeholder', sensitized: 0, total: 5 },
    { name: 'People Svcs', sensitized: 0, total: 5 },
    { name: 'Project Del', sensitized: 0, total: 29 },
    { name: 'Civil Svcs', sensitized: 0, total: 227 },
    { name: 'Lean Prod', sensitized: 0, total: 167 },
    { name: 'Farm & Camp', sensitized: 0, total: 56 },
    { name: 'Debottlenecking', sensitized: 0, total: 17 },
    { name: 'Central Lab', sensitized: 0, total: 39 },
];

const topicSpeeches: Record<number, { title: string, content: string }> = {
    1: {
        title: "Your Permit, Your Responsibility, Our Commitment",
        content: "Vision 2026 – Your Permit, Your Responsibility, Our Commitment. Safety is not a choice; it is a prerequisite for every task. Your permit is your license to operate safely. It represents the professional standard we demand at VME. When you sign that permit, you are making a binding commitment to your family and your colleagues that you have assessed every risk and implemented every barrier. We do not work for stickers or bonuses; we work to return home whole."
    },
    2: {
        title: "Why Do You Break the Rules?",
        content: "Why Do You Break the Rules? In the field, we often find shortcuts convenient, but in our industry, a shortcut is a high-speed path to disaster. Rules aren't there to slow you down; they are the distilled wisdom of every accident that came before us. Breaking a rule is a vote of no confidence in your own future. We are investigating the human factor: Is it pressure? Is it habit? Whatever the cause, the rule remains the only shield between you and a life-altering event."
    },
    3: {
        title: "Zero Exposure",
        content: "Zero Exposure – Do we really need a disaster to happen before we change? Prevention is the only cure. Zero exposure means eliminating risks at the source, not just managing them when they appear. It requires a proactive eye and the courage to stop the job. If you see an exposed hazard, you are the final barrier. We are shifting from reactive management to absolute elimination. No exposure, no accident. It is that simple."
    },
    4: {
        title: "Excellence",
        content: "Excellence – What makes a TRULY safe operation? It's the culture of care. Excellence is not a destination but a continuous habit of checking and re-checking. It is the obsessive attention to detail that separates the survivors from the statistics. A safe operator doesn't just do the job; they do the job perfectly, every single time. Excellence is the professional pride only found in those who master their craft and their environment."
    },
    5: {
        title: "The Domino Effect",
        content: "The Domino Effect – Who really pays the price for a mistake? It's not just the company; it's the families waiting at home. One small error starts the chain that leads to a catastrophic outcome. When one tile falls—a missed check, a tired eye, a bypassed sensor—the rest follow inevitably. You aren't just one person on a machine; you are a critical link in a massive chain of safety. If you break, the whole system collapses."
    }
};

const roadmap = [
    { id: 1, month: 'MONTH 1', topic: 'Your Permit, Your Responsibility', status: 'IN PROGRESS', active: true },
    { id: 2, month: 'MONTH 2', topic: 'Why Do You Break the Rules?', status: 'PLANNED', active: false },
    { id: 3, month: 'MONTH 3', topic: 'Zero Exposure', status: 'PLANNED', active: false },
    { id: 4, month: 'MONTH 4', topic: 'Excellence', status: 'PLANNED', active: false },
    { id: 5, month: 'MONTH 5', topic: 'The Domino Effect', status: 'PLANNED', active: false },
];

// --- Components ---
const KPIBox = ({ title, value, subtext, icon: Icon, color }: any) => (
    <div style={{
        backgroundColor: '#1E1E1E',
        border: `1px solid ${color}33`,
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flex: 1,
        height: '100%'
    }}>
        <div style={{ padding: '16px', backgroundColor: `${color}1A`, borderRadius: '12px' }}>
            <Icon size={32} color={color} />
        </div>
        <div>
            <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{title}</h3>
            <div style={{ fontSize: '28px', fontWeight: '900', color: 'white', lineHeight: '1' }}>{value}</div>
            <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>{subtext}</p>
        </div>
    </div>
);

const TopicModal = ({ isOpen, onClose, topicId }: { isOpen: boolean, onClose: () => void, topicId: number | null }) => {
    if (!isOpen || topicId === null) return null;
    const topic = topicSpeeches[topicId];

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
        }}>
            <div style={{
                backgroundColor: '#1E1E1E',
                width: '100%',
                maxWidth: '800px',
                borderRadius: '16px',
                border: '1px solid #333',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ padding: '24px 32px', backgroundColor: '#252525', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '2px' }}>MONTH {topicId} STRATEGY</span>
                        <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white', marginTop: '4px' }}>{topic.title}</h2>
                    </div>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', outline: 'none' }}>
                        <X size={24} />
                    </button>
                </div>
                <div style={{ padding: '40px 32px' }}>
                    <p style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: '1.8', whiteSpace: 'pre-line' }}>{topic.content}</p>
                </div>
                <div style={{ padding: '24px 32px', borderTop: '1px solid #333', textAlign: 'right' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        Close Strategy
                    </button>
                </div>
            </div>
        </div>
    );
};

const SafetyAwareness = () => {
    const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (id: number) => {
        setSelectedTopic(id);
        setIsModalOpen(true);
    };

    return (
        <div style={{
            backgroundColor: '#121212',
            height: '100vh',
            width: '100%',
            color: 'white',
            padding: '32px',
            fontFamily: '"Inter", sans-serif',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            boxSizing: 'border-box',
            overflow: 'hidden'
        }}>
            {/* 1. TOP ROW: KPI GRILLS (15% APPROX) */}
            <div style={{ height: '15vh', display: 'flex', gap: '24px', flexShrink: 0 }}>
                <KPIBox
                    title="ANNUAL STRATEGIC ROLLOUT"
                    value="TOPIC 1 / 10"
                    subtext="Your Permit, Your Responsibility, Our Commitment"
                    icon={Target}
                    color="#3b82f6"
                />
                <KPIBox
                    title="GLOBAL COMPLETION"
                    value="213 / 2,642"
                    subtext="8.06% Reach for Topic #1"
                    icon={Users}
                    color="#22c55e"
                />
            </div>

            {/* 2. MIDDLE ROW: MAIN CHART ENGINE (70% APPROX) */}
            <div style={{
                flex: 1,
                width: '100%',
                backgroundColor: '#1E1E1E',
                borderRadius: '12px',
                border: '1px solid #333',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '600px' // FORCE RENDER CONSTRAINT
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h2 style={{ fontSize: '20px', fontWeight: '900', color: 'white', textTransform: 'uppercase' }}>Departmental Breakdown - Topic #1 Sensitization</h2>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>Total Drivers (Grey) vs. Sensitized Personnel (Neon Blue)</p>
                    </div>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '12px', height: '12px', backgroundColor: '#334155', borderRadius: '2px' }}></div>
                            <span style={{ fontSize: '12px', color: '#94a3b8' }}>Total Drivers</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
                            <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 'bold' }}>Sensitized</span>
                        </div>
                    </div>
                </div>

                <div style={{ flex: 1, width: '100%', minHeight: '0' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={departmentalData} margin={{ top: 10, right: 10, left: 10, bottom: 80 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#64748b"
                                tick={{ fill: '#94a3b8', fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                            />
                            <YAxis
                                stroke="#64748b"
                                tick={{ fill: '#64748b', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                                domain={[0, 1400]}
                            />
                            <Tooltip
                                cursor={{ fill: '#333', opacity: 0.2 }}
                                contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: 'white' }}
                            />
                            <Bar dataKey="total" name="Total Drivers" fill="#334155" radius={[4, 4, 0, 0]} barSize={24} />
                            <Bar dataKey="sensitized" name="Sensitized" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 3. BOTTOM ROW: STRATEGIC ROADMAP (15% APPROX) */}
            <div style={{ height: '12vh', display: 'flex', gap: '16px', flexShrink: 0 }}>
                {roadmap.map((item, i) => (
                    <div key={i} style={{
                        flex: 1,
                        backgroundColor: item.active ? 'rgba(59, 130, 246, 0.1)' : '#1E1E1E',
                        border: item.active ? '1px solid #3b82f6' : '1px solid #333',
                        borderRadius: '12px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 'bold', color: item.active ? '#3b82f6' : '#64748b' }}>{item.month}</span>
                            {item.active ? <Zap size={12} color="#3b82f6" /> : <Circle size={10} color="#333" />}
                        </div>
                        <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: 'white', lineHeight: '1.2' }}>{item.topic}</h4>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                            <span style={{ fontSize: '9px', color: item.active ? '#3b82f6' : '#475569', textTransform: 'uppercase', fontWeight: '900' }}>{item.status}</span>
                            <button
                                onClick={() => handleOpenModal(item.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: '#3b82f6',
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                            >
                                <PlayCircle size={14} /> Full Content
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Engine */}
            <TopicModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                topicId={selectedTopic}
            />
        </div>
    );
};

export default SafetyAwareness;
