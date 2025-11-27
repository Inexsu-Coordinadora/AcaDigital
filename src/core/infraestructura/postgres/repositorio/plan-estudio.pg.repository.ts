import { pool } from '../database/Conexion.js'; 
import type { IPlanEstudioRepositorio } from '../../../dominio/interfaces/repositorio/IPlanEstudioRepositorio.js';
import type { IPlanEstudio } from '../../../dominio/interfaces/IPlanEstudio.js';
import { ErrorNoEncontrado } from '../../../errores/ErrorAplicacion.js'; 

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
        const query = `
            SELECT 1 
            FROM plan_estudio 
            WHERE programa_id = $1 AND asignatura_id = $2 
            LIMIT 1
        `;
        const values = [programaId, asignaturaId];
        const { rows } = await pool.query<PlanEstudioRow>(query, values);
        
        return rows.length > 0;
    }

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
    const { rows } = await pool.query<PlanEstudioRow>(query, values);

    return this.mapear(rows[0]!);
    }

    async listarPorPrograma(programaId: string): Promise<IPlanEstudio[]> {
        const query = `
            SELECT * FROM plan_estudio 
            WHERE programa_id = $1
            ORDER BY semestre_nivel ASC
        `;
    const { rows } = await pool.query<PlanEstudioRow>(query, [programaId]);
        
    return rows.map(row => this.mapear(row));
    }

    async obtener(programaId: string, asignaturaId: number): Promise<IPlanEstudio | null> {
        const query = `
            SELECT *
            FROM plan_estudio
            WHERE programa_id = $1 AND asignatura_id = $2
        `;
    const { rows } = await pool.query<PlanEstudioRow>(query, [programaId, asignaturaId]);

    return rows.length > 0 ? this.mapear(rows[0]!) : null;
    }

    async actualizar(
        programaId: string,
        asignaturaId: number,
        datos: Partial<Omit<IPlanEstudio, 'programaId' | 'asignaturaId' | 'createdAt' | 'updatedAt'>>
    ): Promise<IPlanEstudio | null> {
        const campos = [];
        const valores: (string | number)[] = []; 
        let index = 1;

        if (datos.semestreNivel !== undefined) {
            campos.push(`semestre_nivel = $${index++}`);
            valores.push(datos.semestreNivel);
        }
        if (datos.creditosCarga !== undefined) {
            campos.push(`creditos_carga = $${index++}`);
            valores.push(datos.creditosCarga);
        }

        if (campos.length === 0) return null;

        valores.push(programaId);
        valores.push(asignaturaId);

        const query = `
            UPDATE plan_estudio
            SET ${campos.join(', ')}, updated_at = NOW()
            WHERE programa_id = $${index++}
            AND asignatura_id = $${index++}
            RETURNING *
        `;

    const { rows } = await pool.query<PlanEstudioRow>(query, valores);

    return rows.length > 0 ? this.mapear(rows[0]!) : null;
    }

    async eliminar(programaId: string, asignaturaId: number): Promise<void> {
        const query = `
            DELETE FROM plan_estudio
            WHERE programa_id = $1 AND asignatura_id = $2
        `;
        const { rowCount } = await pool.query(query, [programaId, asignaturaId]);

        if ((rowCount ?? 0) === 0) {
            throw new ErrorNoEncontrado(
                `No existe el plan de estudio para la asignatura ${asignaturaId} en el programa ${programaId}`
            );
        }
    }
}