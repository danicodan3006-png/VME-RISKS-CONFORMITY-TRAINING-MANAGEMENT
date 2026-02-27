
export interface SensibilisationEntry {
    month: string;
    count: number;
    target: number;
}

export const SENSIBILISATION_DATA: SensibilisationEntry[] = [
    { month: 'Jan', count: 65, target: 80 },
    { month: 'Feb', count: 199, target: 80 },
    { month: 'Mar', count: 0, target: 80 },
    { month: 'Apr', count: 0, target: 80 },
    { month: 'May', count: 0, target: 80 },
    { month: 'Jun', count: 0, target: 80 },
    { month: 'Jul', count: 0, target: 80 },
    { month: 'Aug', count: 0, target: 80 },
    { month: 'Sep', count: 0, target: 80 },
    { month: 'Oct', count: 0, target: 80 },
    { month: 'Nov', count: 0, target: 80 },
    { month: 'Dec', count: 0, target: 80 },
];

export const GET_TOTAL_SENSIBILISATIONS = () => {
    return SENSIBILISATION_DATA.reduce((sum, item) => sum + item.count, 0);
};

export const GET_AVERAGE_COMPLIANCE = () => {
    const activeMonths = SENSIBILISATION_DATA.filter(item => item.count > 0);
    if (activeMonths.length === 0) return 0;
    const totalCompliance = activeMonths.reduce((sum, item) => sum + (item.count / item.target), 0);
    return (totalCompliance / activeMonths.length) * 100;
};
