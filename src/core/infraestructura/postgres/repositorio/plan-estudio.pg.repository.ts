import { pool } from '../database/Conexion.js';
import type { IPlanEstudioRepositorio } from '../../../dominio/interfaces/repositorio/IPlanEstudioRepositorio.js';
import type { IPlanEstudio } from '../../../dominio/interfaces/IPlanEstudio.js';

interface PlanEstudioRow {
    programa_id: string;
    asignatura_id: number;
    semestre_nivel: number;
    creditos_carga: number;
    created_at: string;
    updated_at: string;
}

export class PlanEstudioPGRepository implements IPlanEstudioRepositorio {
    
    private mapear(row: PlanEstudioRow): IPlanEstudio {
        return {
            programaId: row.programa_id,
            asignaturaId: row.asignatura_id,
            semestreNivel: row.semestre_nivel,
            creditosCarga: row.creditos_carga,
            createdAt: new Date(row.created_at),
            updatedAt: new Date(row.updated_at)
        };
    }

    async existeVinculo(programaId: string, asignaturaId: number): Promise<boolean> {
        const query = 'SELECT 1 FROM plan_estudio WHERE programa_id = $1 AND asignatura_id = $2 LIMIT 1';
        const values = [programaId, asignaturaId];
        const { rows } = await pool.query(query, values);
        
        return rows.length > 0;
    };
    
    async guardar(plan: IPlanEstudio): Promise<IPlanEstudio> {
        const { 
            programaId, 
            asignaturaId, 
            semestreNivel, 
            creditosCarga 
        } = plan;

        const query = `
            INSERT INTO plan_estudio 
                (programa_id, asignatura_id, semestre_nivel, creditos_carga) 
            VALUES 
                ($1, $2, $3, $4) 
            RETURNING *
        `;
        const values = [programaId, asignaturaId, semestreNivel, creditosCarga];
        const { rows } = await pool.query(query, values);

        return this.mapear(rows[0]);
    };
};