
export interface SafeEquipEntry {
    id: string;
    timestamp: string;
    department: string;
    incidents: number;
    training_theory: number;
    training_practice: number;
    company_name: string;
    vehicles_total: number;
    vehicles_compliant: number;
    red_list_status: boolean;
    risk_level: number; // 1-5 mapping
}

export const SafeEquip_Dynamic_Dataset: SafeEquipEntry[] = [
    {
        id: 'SEC-001',
        timestamp: '2026-02-17T10:00:00Z',
        department: 'Transport',
        incidents: 2,
        training_theory: 12,
        training_practice: 10,
        company_name: 'Solvay',
        vehicles_total: 50,
        vehicles_compliant: 45,
        red_list_status: true,
        risk_level: 3
    },
    {
        id: 'SEC-002',
        timestamp: '2026-02-17T11:30:00Z',
        department: 'Civil Svcs',
        incidents: 1,
        training_theory: 8,
        training_practice: 8,
        company_name: 'Mexco',
        vehicles_total: 30,
        vehicles_compliant: 28,
        red_list_status: true,
        risk_level: 3
    },
    {
        id: 'SEC-003',
        timestamp: '2026-01-25T12:00:00Z',
        department: 'Mining',
        incidents: 2,
        training_theory: 25,
        training_practice: 20,
        company_name: 'ITM',
        vehicles_total: 100,
        vehicles_compliant: 85,
        red_list_status: true,
        risk_level: 3
    },
    {
        id: 'SEC-004',
        timestamp: '2026-02-20T13:45:00Z',
        department: 'Lean Prod',
        incidents: 0,
        training_theory: 15,
        training_practice: 12,
        company_name: 'Neema',
        vehicles_total: 20,
        vehicles_compliant: 20,
        red_list_status: true,
        risk_level: 2
    },
    {
        id: 'SEC-005',
        timestamp: '2026-02-22T09:00:00Z',
        department: 'Commercial',
        incidents: 0,
        training_theory: 5,
        training_practice: 5,
        company_name: 'Synergie',
        vehicles_total: 15,
        vehicles_compliant: 14,
        red_list_status: true,
        risk_level: 1
    }
];
