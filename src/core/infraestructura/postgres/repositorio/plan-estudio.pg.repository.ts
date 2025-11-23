import { pool } from '../database/Conexion.js';
import type { IPlanEstudioRepositorio } from '../../../dominio/interfaces/repositorio/IPlanEstudioRepositorio.js';
import type { IPlanEstudio } from '../../../dominio/interfaces/IPlanEstudio.js';

export class PlanEstudioPGRepository implements IPlanEstudioRepositorio {

    async existeVinculo(programaId: string, asignaturaId: number): Promise<boolean> {
        const query = `
            SELECT 1 
            FROM plan_estudio 
            WHERE programa_id = $1 AND asignatura_id = $2 
            LIMIT 1
        `;
        const { rows } = await pool.query(query, [programaId, asignaturaId]);
        return rows.length > 0;
    }

    async guardar(plan: IPlanEstudio): Promise<IPlanEstudio> {
        const { programaId, asignaturaId, semestreNivel, creditosCarga } = plan;

        const query = `
            INSERT INTO plan_estudio 
                (programa_id, asignatura_id, semestre_nivel, creditos_carga) 
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [programaId, asignaturaId, semestreNivel, creditosCarga];
        const { rows } = await pool.query(query, values);

        return rows[0] as IPlanEstudio;
    }

    async listarPorPrograma(programaId: string): Promise<IPlanEstudio[]> {
        const query = `
            SELECT * 
            FROM plan_estudio 
            WHERE programa_id = $1
            ORDER BY semestre_nivel ASC
        `;
        const { rows } = await pool.query(query, [programaId]);
        return rows as IPlanEstudio[];
    }

    async obtener(programaId: string, asignaturaId: number): Promise<IPlanEstudio | null> {
        const query = `
            SELECT *
            FROM plan_estudio
            WHERE programa_id = $1 AND asignatura_id = $2
        `;
        const { rows } = await pool.query(query, [programaId, asignaturaId]);

        return rows.length > 0 ? (rows[0] as IPlanEstudio) : null;
    }

    async actualizar(
        programaId: string,
        asignaturaId: number,
        datos: Partial<IPlanEstudio>
    ): Promise<IPlanEstudio | null> {
        const campos = [];
        const valores: any[] = [];

        if (datos.semestreNivel !== undefined) {
            campos.push(`semestre_nivel = $${campos.length + 1}`);
            valores.push(datos.semestreNivel);
        }
        if (datos.creditosCarga !== undefined) {
            campos.push(`creditos_carga = $${campos.length + 1}`);
            valores.push(datos.creditosCarga); 
        }

        if (campos.length === 0) return null;

        valores.push(programaId);
        valores.push(asignaturaId);

        const query = `
            UPDATE plan_estudio
            SET ${campos.join(', ')}
            WHERE programa_id = $${campos.length + 1}
            AND asignatura_id = $${campos.length + 2}
            RETURNING *
        `;

        const { rows } = await pool.query(query, valores);
        return rows.length > 0 ? (rows[0] as IPlanEstudio) : null;
    }

    async eliminar(programaId: string, asignaturaId: number): Promise<void> {
        const query = `
            DELETE FROM plan_estudio
            WHERE programa_id = $1 AND asignatura_id = $2
        `;
        const { rowCount } = await pool.query(query, [programaId, asignaturaId]);

        if ((rowCount ?? 0) === 0) {
            throw new Error(`No existe la asignatura ${asignaturaId} en el programa ${programaId}`);
        }

        return; 
    }
}
