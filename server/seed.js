import pool from './db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initialData = [
    {
        id: 'SEC-001',
        timestamp: '2026-02-15T10:00:00Z',
        department: 'Transport',
        incidents: 2,
        training_theory: 12,
        training_practice: 10,
        company_name: 'Solvay',
        vehicles_total: 50,
        vehicles_compliant: 45,
        red_list_status: true,
        risk_level: 2
    },
    {
        id: 'SEC-002',
        timestamp: '2026-02-18T11:30:00Z',
        department: 'Civil Services',
        incidents: 1,
        training_theory: 8,
        training_practice: 8,
        company_name: 'Mexco',
        vehicles_total: 30,
        vehicles_compliant: 28,
        red_list_status: true,
        risk_level: 1
    },
    {
        id: 'SEC-003',
        timestamp: '2026-01-25T12:00:00Z',
        department: 'Mining',
        incidents: 4,
        training_theory: 25,
        training_practice: 20,
        company_name: 'ITM',
        vehicles_total: 100,
        vehicles_compliant: 85,
        red_list_status: false,
        risk_level: 0
    },
    {
        id: 'SEC-004',
        timestamp: '2026-02-20T13:45:00Z',
        department: 'SSHEC',
        incidents: 0,
        training_theory: 5,
        training_practice: 5,
        company_name: 'Neema',
        vehicles_total: 20,
        vehicles_compliant: 20,
        red_list_status: false,
        risk_level: 0
    }
];

async function seed() {
    try {
        console.log('--- Initializing Schema ---');
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        await pool.query(schema);
        console.log('Schema initialized.');

        console.log('--- Seeding Data ---');
        for (const entry of initialData) {
            const query = `
                INSERT INTO telemetry (
                    id, timestamp, department, incidents, training_theory, training_practice,
                    company_name, vehicles_total, vehicles_compliant, red_list_status, risk_level
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                ON CONFLICT (id) DO NOTHING;
            `;
            const values = [
                entry.id, entry.timestamp, entry.department, entry.incidents,
                entry.training_theory, entry.training_practice, entry.company_name,
                entry.vehicles_total, entry.vehicles_compliant, entry.red_list_status,
                entry.risk_level
            ];
            await pool.query(query, values);
        }
        console.log('Seeding complete.');
    } catch (err) {
        console.error('Seeding failed:', err);
    } finally {
        await pool.end();
    }
}

seed();
