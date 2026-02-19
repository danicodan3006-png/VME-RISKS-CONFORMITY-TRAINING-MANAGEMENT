
// VME 2026 Core Types

export interface VOCMetrics {
    theoryScore: number;
    practiceScore: number;
    lastAssessmentDate: string;
}

export interface TrainingLog {
    coachingHours: number;
    validatedBy: string;
}

export interface DriverProfile {
    driverId: string;
    name: string;
    departmentId: string;
    vocMetrics: VOCMetrics;
    incidents12m: number;
    yearsAccidentFree: number;
    trainingLog: TrainingLog;
}

export type DriverGradeLabel = 'L1 (Base)' | 'L2 (Safe)' | 'L3 (Expert)' | 'L4 (Elite)' | 'L5 (Elite)' | 'Unclassified';

export interface DriverClassification {
    grade: DriverGradeLabel;
    nextMilestone: string;
}

export interface KPIReport {
    accidents: {
        current: number;
        ceiling: number;
        status: 'CRITICAL_ALERT' | 'SAFE';
        trend: string;
    };
    training: {
        target2026: number;
        currentCompetencies: number;
        fulfillmentRate: number;
    };
}

export interface CompanyCompliance {
    companyId: string;
    fleetSize: number;
    identifiedUnits: number;
    inspectedUnits: number;
    identificationRate: number;
    inspectionRate: number;
    status: 'CRITICAL' | 'COMPLIANT';
}
