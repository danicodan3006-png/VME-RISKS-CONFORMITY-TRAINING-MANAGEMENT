CREATE TABLE IF NOT EXISTS telemetry (
    id TEXT PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL,
    department TEXT NOT NULL,
    incidents INTEGER DEFAULT 0,
    training_theory INTEGER DEFAULT 0,
    training_practice INTEGER DEFAULT 0,
    company_name TEXT NOT NULL,
    vehicles_total INTEGER DEFAULT 0,
    vehicles_compliant INTEGER DEFAULT 0,
    red_list_status BOOLEAN DEFAULT FALSE,
    risk_level INTEGER DEFAULT 0
);
