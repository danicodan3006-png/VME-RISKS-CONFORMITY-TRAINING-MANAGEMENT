
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
        timestamp: '2026-01-15T10:00:00Z',
        department: 'MEXCO', // Accident 1
        incidents: 1,
        training_theory: 12,
        training_practice: 10,
        company_name: 'CAC',
        vehicles_total: 50,
        vehicles_compliant: 45,
        red_list_status: true,
        risk_level: 3
    },
    {
        id: 'SEC-002',
        timestamp: '2026-01-14T11:30:00Z',
        department: 'Orica', // Accident 2
        incidents: 1,
        training_theory: 25,
        training_practice: 20,
        company_name: 'TKM',
        vehicles_total: 100,
        vehicles_compliant: 85,
        red_list_status: true,
        risk_level: 3
    },
    {
        id: 'SEC-003',
        timestamp: '2026-01-17T12:00:00Z',
        department: 'Transport Admin', // Accident 3
        incidents: 1,
        training_theory: 8,
        training_practice: 8,
        company_name: 'TKM',
        vehicles_total: 30,
        vehicles_compliant: 28,
        red_list_status: true,
        risk_level: 4
    },
    {
        id: 'SEC-004',
        timestamp: '2026-01-18T13:45:00Z',
        department: 'Transport Admin', // Accident 4
        incidents: 1,
        training_theory: 15,
        training_practice: 12,
        company_name: 'MMG',
        vehicles_total: 20,
        vehicles_compliant: 20,
        red_list_status: true,
        risk_level: 4
    },
    {
        id: 'SEC-005',
        timestamp: '2026-02-05T09:00:00Z',
        department: 'Transport services', // Accident 5
        incidents: 1,
        training_theory: 5,
        training_practice: 5,
        company_name: 'MMG',
        vehicles_total: 15,
        vehicles_compliant: 14,
        red_list_status: true,
        risk_level: 3
    },
    {
        id: 'SEC-006',
        timestamp: '2026-02-08T09:00:00Z',
        department: 'HSE', // Accident 6
        incidents: 1,
        training_theory: 18,
        training_practice: 15,
        company_name: 'MMG',
        vehicles_total: 10,
        vehicles_compliant: 10,
        red_list_status: true,
        risk_level: 3
    },
    {
        id: 'SEC-007',
        timestamp: '2026-02-17T09:00:00Z',
        department: 'Civil Svcs', // Accident 7
        incidents: 1,
        training_theory: 22,
        training_practice: 18,
        company_name: 'MMG',
        vehicles_total: 40,
        vehicles_compliant: 38,
        red_list_status: true,
        risk_level: 3
    },
    {
        id: 'SEC-008',
        timestamp: '2026-02-24T09:00:00Z',
        department: 'HSE', // Accident 10
        incidents: 1,
        training_theory: 10,
        training_practice: 10,
        company_name: 'MMG',
        vehicles_total: 12,
        vehicles_compliant: 11,
        red_list_status: true,
        risk_level: 4
    },
    {
        id: 'SEC-009',
        timestamp: '2026-02-25T09:00:00Z',
        department: 'Transport Services', // Accident 9
        incidents: 1,
        training_theory: 5,
        training_practice: 5,
        company_name: 'TKM',
        vehicles_total: 24,
        vehicles_compliant: 20,
        red_list_status: true,
        risk_level: 4
    },
    {
        id: 'SEC-010',
        timestamp: '2026-02-26T09:00:00Z',
        department: 'Transport Services', // Accident 8
        incidents: 1,
        training_theory: 0,
        training_practice: 0,
        company_name: 'MMG',
        vehicles_total: 15,
        vehicles_compliant: 15,
        red_list_status: true,
        risk_level: 5
    }
];
