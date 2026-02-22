import { createContext, useContext, useState, type ReactNode } from 'react';
import type { SafeEquipEntry } from '../data/SafeEquipDataset';
import { SafeEquip_Dynamic_Dataset } from '../data/SafeEquipDataset';

interface SafeEquipContextType {
    dataset: SafeEquipEntry[];
    updateDataset: (newEntry: SafeEquipEntry) => void;
    isAuthenticated: boolean;
    login: (code: string) => boolean;
    logout: () => void;
}

const SafeEquipContext = createContext<SafeEquipContextType | undefined>(undefined);

export const SafeEquipProvider = ({ children }: { children: ReactNode }) => {
    const [dataset, setDataset] = useState<SafeEquipEntry[]>(SafeEquip_Dynamic_Dataset);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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

    return (
        <SafeEquipContext.Provider value={{ dataset, updateDataset, isAuthenticated, login, logout }}>
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
