import {
    Calendar, Shield, Database, AlertTriangle,
    CheckCircle2, Clock, PlayCircle, Target,
    Lightbulb, Rocket, Users, FileText,
    ArrowRight, ChevronRight, Eye, Info
} from 'lucide-react';

export const STRATEGIC_ACTIONS = [
    {
        id: 'G1',
        priority: 'ULTRA',
        action: 'GM Strategic Message & Blitz',
        owner: 'GM',
        status: 'COMPLETED',
        timeline: '0-7 Days',
        tooltip: 'Video message to all drivers within 48h. Tone: serious. Immediate speed compliance blitz with mobile monitoring.',
        color: '#ef4444'
    },
    {
        id: 'G2',
        priority: 'ULTRA',
        action: 'Telematics Data Ownership Transfer',
        owner: 'SSHEC (Dan)',
        status: 'ONGOING',
        timeline: '0-7 Days',
        tooltip: 'Reallocate speed data from Transport to SSHEC for independent weekly exception reports.',
        color: '#f97316'
    },
    {
        id: 'G3',
        priority: 'HIGH',
        action: 'Infrastructure Safety Audit',
        owner: 'Maintenance',
        status: 'PLANNED',
        timeline: '7-30 Days',
        tooltip: 'Full audit of yard bollards, lighting, and reversing bays. High-visibility painting program.',
        color: '#06b6d4'
    },
    {
        id: 'G4',
        priority: 'HIGH',
        action: 'Training Hub Unified Launch',
        owner: 'HR/SSHEC',
        status: 'PLANNED',
        timeline: '30-60 Days',
        tooltip: 'Consolidate all safety training into a single digital platform with biometric verification.',
        color: '#3b82f6'
    },
    {
        id: 'G5',
        priority: 'MEDIUM',
        action: 'Critical Control Verification',
        owner: 'Operations',
        status: 'PLANNED',
        timeline: '60-120 Days',
        tooltip: 'Implement field-based critical control verification (CCV) for all high-risk transport activities.',
        color: '#a855f7'
    },
    {
        id: 'G6',
        priority: 'MEDIUM',
        action: 'Annual Strategy Review',
        owner: 'Executive',
        status: 'PLANNED',
        timeline: '180 Days',
        tooltip: 'Formal reassessment of VME 2026 outcome and roadmap adjustment for 2027 transition.',
        color: '#64748b'
    }
];

export const MINDSET_FLOW = [
    {
        stage: 'Gate 01',
        title: 'Department Heads',
        action: 'INTEGRITY FILTER',
        desc: 'Initial screening by heads of department to verify applicant background and alignment with MMG values.',
        icon: Users
    },
    {
        stage: 'Gate 02',
        title: 'Justification Form',
        action: 'NEED VALIDATION',
        desc: 'Formal justification requirement for every candidate before proceeding to technical assessment.',
        icon: FileText
    },
    {
        stage: 'Gate 03',
        title: 'Controlled Volume',
        action: 'QUALITY ASSURANCE',
        desc: 'Maintaining a lower, higher-quality intake volume to ensure 100% competency transformation.',
        icon: Shield
    }
];
