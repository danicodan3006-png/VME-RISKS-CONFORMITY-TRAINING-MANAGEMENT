import { createContext, useContext, useState, type ReactNode } from 'react';
import type { SafeEquipEntry } from '../data/SafeEquipDataset';
import { SafeEquip_Dynamic_Dataset } from '../data/SafeEquipDataset';

interface SafeEquipContextType {
    dataset: SafeEquipEntry[];
    updateDataset: (newEntry: SafeEquipEntry) => void;
    lastIncidentDate: string;
    resetIncidentCounter: (date: string) => void;
    TOTAL_POPULATION: number;
    isAuthenticated: boolean;
    login: (code: string) => boolean;
    logout: () => void;
    theme: 'high-tech' | 'executive';
    toggleTheme: () => void;
}

const SafeEquipContext = createContext<SafeEquipContextType | undefined>(undefined);

export const SafeEquipProvider = ({ children }: { children: ReactNode }) => {
    const [dataset, setDataset] = useState<SafeEquipEntry[]>(SafeEquip_Dynamic_Dataset);
    const [lastIncidentDate, setLastIncidentDate] = useState<string>('2026-02-17');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [theme, setTheme] = useState<'high-tech' | 'executive'>('high-tech');

    const toggleTheme = () => {
        setTheme(prev => prev === 'high-tech' ? 'executive' : 'high-tech');
    };

    const resetIncidentCounter = (date: string) => {
        setLastIncidentDate(date);
    };

    const updateDataset = (newEntry: SafeEquipEntry) => {
        setDataset((prev) => {
            const index = prev.findIndex(e => e.id === newEntry.id || e.department === newEntry.department);
            if (index !== -1) {
                const newDataset = [...prev];
                newDataset[index] = { ...newDataset[index], ...newEntry };
                return newDataset;
            }
            return [...prev, newEntry];
        });
    };

    const login = (code: string) => {
        if (code === '202600') {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => setIsAuthenticated(false);
    const TOTAL_POPULATION = 2976;

    return (
        <SafeEquipContext.Provider value={{
            dataset,
            updateDataset,
            lastIncidentDate,
            resetIncidentCounter,
            TOTAL_POPULATION,
            isAuthenticated,
            login,
            logout,
            theme,
            toggleTheme
        }}>
            {children}
        </SafeEquipContext.Provider>
    );
};

export const useSafeEquip = () => {
    const context = useContext(SafeEquipContext);
    if (context === undefined) {
        throw new Error('useSafeEquip must be used within a SafeEquipProvider');
    }
    return context;
};
