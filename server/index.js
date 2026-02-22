import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Get all telemetry data
app.get('/api/telemetry', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM telemetry ORDER BY timestamp DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Update or insert telemetry record
app.post('/api/telemetry', async (req, res) => {
    const {
        id, timestamp, department, incidents, training_theory, training_practice,
        company_name, vehicles_total, vehicles_compliant, red_list_status, risk_level
    } = req.body;

    try {
        const query = `
      INSERT INTO telemetry (
        id, timestamp, department, incidents, training_theory, training_practice,
        company_name, vehicles_total, vehicles_compliant, red_list_status, risk_level
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (id) DO UPDATE SET
        timestamp = EXCLUDED.timestamp,
        department = EXCLUDED.department,
        incidents = EXCLUDED.incidents,
        training_theory = EXCLUDED.training_theory,
        training_practice = EXCLUDED.training_practice,
        company_name = EXCLUDED.company_name,
        vehicles_total = EXCLUDED.vehicles_total,
        vehicles_compliant = EXCLUDED.vehicles_compliant,
        red_list_status = EXCLUDED.red_list_status,
        risk_level = EXCLUDED.risk_level
      RETURNING *;
    `;
        const values = [
            id, timestamp, department, incidents, training_theory, training_practice,
            company_name, vehicles_total, vehicles_compliant, red_list_status, risk_level
        ];
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
