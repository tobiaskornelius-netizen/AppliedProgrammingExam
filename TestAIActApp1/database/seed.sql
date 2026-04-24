1-- Drop tables in dependency order
DROP TABLE IF EXISTS "ComplianceReport" CASCADE;
DROP TABLE IF EXISTS "DataFlow" CASCADE;
DROP TABLE IF EXISTS "AITool" CASCADE;
DROP TABLE IF EXISTS "Company" CASCADE;

-- Create tables
CREATE TABLE "Company" (
    "id"       SERIAL PRIMARY KEY,
    "name"     VARCHAR NOT NULL,
    "industry" VARCHAR NOT NULL
);

CREATE TABLE "AITool" (
    "id"           SERIAL PRIMARY KEY,
    "name"         VARCHAR NOT NULL,
    "vendor"       VARCHAR NOT NULL,
    "type"         VARCHAR NOT NULL,
    "risk_level"   VARCHAR NOT NULL,
    "personal_data" BOOLEAN NOT NULL,
    "company_id"   INT NOT NULL REFERENCES "Company"("id") ON DELETE CASCADE
);

CREATE TABLE "DataFlow" (
    "id"           SERIAL PRIMARY KEY,
    "tool_id"      INT NOT NULL REFERENCES "AITool"("id") ON DELETE CASCADE,
    "data_type"    VARCHAR NOT NULL,
    "personal_data" BOOLEAN NOT NULL
);

CREATE TABLE "ComplianceReport" (
    "id"         SERIAL PRIMARY KEY,
    "company_id" INT NOT NULL REFERENCES "Company"("id") ON DELETE CASCADE,
    "risk_score" INT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Seed companies
INSERT INTO "Company" ("name", "industry") VALUES
    ('Acme Corp', 'Finance'),
    ('TechNova', 'Healthcare');

-- Seed AITools for Acme Corp (company_id = 1)
INSERT INTO "AITool" ("name", "vendor", "type", "risk_level", "personal_data", "company_id") VALUES
    ('FraudShield', 'IBM', 'Fraud Detection', 'High', true, 1),
    ('CreditScore AI', 'Experian', 'Credit Assessment', 'Unacceptable', true, 1),
    ('DocParser', 'Microsoft', 'Document Processing', 'Limited', false, 1),
    ('ChatBot Pro', 'OpenAI', 'Customer Support', 'Low', false, 1),
    ('RiskRadar', 'SAS', 'Risk Analysis', 'High', true, 1),
    ('AutoAudit', 'Deloitte AI', 'Compliance Audit', 'Limited', false, 1);

-- Seed AITools for TechNova (company_id = 2)
INSERT INTO "AITool" ("name", "vendor", "type", "risk_level", "personal_data", "company_id") VALUES
    ('DiagnosisAI', 'Siemens', 'Medical Diagnosis', 'Unacceptable', true, 2),
    ('PatientFlow', 'Epic', 'Scheduling', 'Limited', true, 2),
    ('DrugInteract', 'Pfizer AI', 'Drug Interaction Check', 'High', true, 2),
    ('MedSummarizer', 'Google Health', 'Clinical Notes', 'Limited', false, 2),
    ('TriageBot', 'IBM Watson', 'Patient Triage', 'High', true, 2);
