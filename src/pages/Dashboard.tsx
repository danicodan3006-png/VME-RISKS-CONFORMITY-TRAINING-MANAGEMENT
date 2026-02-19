import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../components/ui/Card';
import DepartmentSafetyStatus from '../components/dashboard/DepartmentSafetyStatus';

const data = [
    { name: '01 Jan', total: 382, incidents: 55, accidents: 24 },
    { name: '04 Jan', total: 400, incidents: 64, accidents: 18 },
    { name: '08 Jan', total: 390, incidents: 45, accidents: 15 },
    { name: '12 Jan', total: 412, incidents: 94, accidents: 32 },
    { name: '15 Jan', total: 350, incidents: 22, accidents: 12 },
    { name: '19 Jan', total: 289, incidents: 20, accidents: 25 },
    { name: '22 Jan', total: 431, incidents: 89, accidents: 51 },
    { name: '26 Jan', total: 270, incidents: 40, accidents: 12 },
    { name: '29 Jan', total: 394, incidents: 21, accidents: 10 },
    { name: '01 Feb', total: 341, incidents: 43, accidents: 27 },
    { name: '05 Feb', total: 397, incidents: 158, accidents: 41 },
    { name: '08 Feb', total: 230, incidents: 50, accidents: 12 },
    { name: '12 Feb', total: 298, incidents: 78, accidents: 30 },
    { name: '15 Feb', total: 280, incidents: 13, accidents: 19 },
    { name: '19 Feb', total: 250, incidents: 61, accidents: 49 },
    { name: '22 Feb', total: 315, incidents: 22, accidents: 11 },
    { name: '26 Feb', total: 252, incidents: 53, accidents: 26 },
    { name: '28 Feb', total: 295, incidents: 30, accidents: 27 },
];

const StatCard = ({ label, value, color }: { label: string, value: string, color: string }) => (
    <Card style={{ flex: 1, textAlign: 'center', padding: '16px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h4 style={{ color: color, fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>{label}</h4>
        <p style={{ fontSize: '42px', fontWeight: '400', color: color }}>{value}</p>
    </Card>
);

const Dashboard = () => {
    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

            {/* Title */}
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#d32f2f', marginBottom: '24px', textTransform: 'uppercase' }}>
                ACCIDENT AND INCIDENT REPORT
            </h2>

            {/* KPI Cards */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <StatCard label="Total Man-Hours" value="1099" color="#22c55e" />
                <StatCard label="Total Incidents" value="9563" color="#f59e0b" />
                <StatCard label="Total Accidents" value="951" color="#ef4444" />
                <StatCard label="% Incident Rate" value="11.49%" color="#22c55e" />
                <StatCard label="% Accident Rate" value="86.53%" color="#ef4444" />
            </div>

            {/* Chart */}
            <Card style={{ padding: '24px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#d32f2f', textAlign: 'center', marginBottom: '24px' }}>
                    Safety Statistics Trend
                </h3>

                <div style={{ width: '100%', height: '450px' }}>
                    <ResponsiveContainer>
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorAccidents" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#f59e0b"
                                fillOpacity={1}
                                fill="url(#colorTotal)"
                                strokeWidth={3}
                                name="Total Hours"
                            />
                            <Area
                                type="monotone"
                                dataKey="incidents"
                                stroke="#22c55e"
                                fillOpacity={1}
                                fill="url(#colorIncidents)"
                                strokeWidth={3}
                                name="Incidents"
                            />
                            <Area
                                type="monotone"
                                dataKey="accidents"
                                stroke="#ef4444"
                                fillOpacity={1}
                                fill="url(#colorAccidents)"
                                strokeWidth={3}
                                name="Accidents"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                        <span style={{ fontSize: '14px', color: '#64748b' }}>Accidents</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                        <span style={{ fontSize: '14px', color: '#64748b' }}>Total Hours</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                        <span style={{ fontSize: '14px', color: '#64748b' }}>Incidents</span>
                    </div>
                </div>
            </Card>

            {/* Department Safety Overview */}
            <DepartmentSafetyStatus />
        </div>
    );
};

export default Dashboard;
