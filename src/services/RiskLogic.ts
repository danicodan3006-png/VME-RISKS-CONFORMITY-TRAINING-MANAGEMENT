
import type { DriverProfile, DriverClassification, CompanyCompliance, KPIReport } from '../types/vme';

/**
 * Service Implementing VME 2026 Risk Logic
 */

// 1. Definition des Variables Critiques (KPIs)
const CEILING_ACCIDENTS = 48;
const TARGET_TRAINING_2026 = 2200;

export const RiskAnalyticsService = {

    getExecutiveSummary(currentAccidents: number, currentCompetencies: number): KPIReport {
        const accStatus = currentAccidents > CEILING_ACCIDENTS ? 'CRITICAL_ALERT' : 'SAFE';
        const fulfillment = currentCompetencies / TARGET_TRAINING_2026;

        return {
            accidents: {
                current: currentAccidents,
                ceiling: CEILING_ACCIDENTS,
                status: accStatus,
                trend: '+0%' // Placeholder for real trend calculation
            },
            training: {
                target2026: TARGET_TRAINING_2026,
                currentCompetencies: currentCompetencies,
                fulfillmentRate: Number(fulfillment.toFixed(2))
            }
        };
    },

    // 2. Algorithme de Classification 'L1-L5'
    calculateDriverGrade(driver: DriverProfile): DriverClassification {
        const { vocMetrics, incidents12m, trainingLog, yearsAccidentFree } = driver;
        const isL1 = vocMetrics.theoryScore >= 90 && vocMetrics.practiceScore >= 90;

        if (!isL1) {
            return { grade: 'Unclassified', nextMilestone: 'Achieve 90% in Theory & Practice' };
        }

        const isL2 = incidents12m === 0;
        if (!isL2) {
            return { grade: 'L1 (Base)', nextMilestone: 'Zero incidents for 12 months' };
        }

        // Check Elite Status First (Highest Priority)
        if (yearsAccidentFree >= 5) return { grade: 'L5 (Elite)', nextMilestone: 'Maintain Status' };
        if (yearsAccidentFree >= 2) return { grade: 'L4 (Elite)', nextMilestone: 'Reach 5 years accident-free' };

        // Check Expert Status
        if (trainingLog.coachingHours >= 20) {
            return { grade: 'L3 (Expert)', nextMilestone: 'Maintain L2 status for 2 years' };
        }

        // Default to L2
        return { grade: 'L2 (Safe)', nextMilestone: 'Complete 20h Coaching or 2 years accident-free' };
    },

    // 3. Logique de Croisement QA/QC (The Gap Analysis)
    evaluateCompanyCompliance(companyId: string, totalFleet: number, identified: number, inspected: number): CompanyCompliance {
        const idRate = identified / totalFleet;
        const inspRate = inspected / totalFleet;

        let status: 'CRITICAL' | 'COMPLIANT' = 'COMPLIANT';

        if (idRate < 1.0 || inspRate < 0.8) {
            status = 'CRITICAL';
        }

        return {
            companyId,
            fleetSize: totalFleet,
            identifiedUnits: identified,
            inspectedUnits: inspected,
            identificationRate: idRate,
            inspectionRate: inspRate,
            status
        };
    }
};
