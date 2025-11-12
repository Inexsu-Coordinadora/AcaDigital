CREATE TABLE IF NOT EXISTS ofertas_academicas (
    id SERIAL PRIMARY KEY,
    periodo_id UUID NOT NULL REFERENCES periodos(id) ON DELETE CASCADE,
    programa_id VARCHAR(255) NOT NULL REFERENCES programas_academicos(id) ON DELETE CASCADE,
    asignatura_id INTEGER NOT NULL REFERENCES asignaturas(id) ON DELETE CASCADE,
    grupo VARCHAR(10) NOT NULL,
    cupo_disponible INTEGER NOT NULL CHECK (cupo_disponible > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uk_oferta_unica UNIQUE (periodo_id, programa_id, asignatura_id, grupo)
);

CREATE INDEX IF NOT EXISTS idx_oferta_periodo ON ofertas_academicas(periodo_id);
CREATE INDEX IF NOT EXISTS idx_oferta_programa ON ofertas_academicas(programa_id);
CREATE INDEX IF NOT EXISTS idx_oferta_asignatura ON ofertas_academicas(asignatura_id);