import { pool } from '../database/Conexion.js';
import type { IPlanEstudioRepositorio } from '../../../dominio/interfaces/repositorio/IPlanEstudioRepositorio.js';
import type { IPlanEstudio } from '../../../dominio/interfaces/IPlanEstudio.js';

export class PlanEstudioPGRepository implements IPlanEstudioRepositorio {
    
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

        return rows[0] as IPlanEstudio; 
    };
};