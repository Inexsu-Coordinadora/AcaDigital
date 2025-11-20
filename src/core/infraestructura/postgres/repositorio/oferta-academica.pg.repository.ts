import type { IOfertaAcademica, IOfertaAcademicaRepositorio } from '../../../dominio/interfaces/IOfertaAcademica.js';
import { OfertaAcademica } from '../../../dominio/entidades/oferta-academica/OfertaAcademica.js';
import { pool } from '../database/Conexion.js';

export class OfertaAcademicaPGRepositorio implements IOfertaAcademicaRepositorio {
    private mapearFilaAOferta(fila: any): OfertaAcademica {
        return new OfertaAcademica(
            fila.periodo_id,
            fila.programa_id,
            fila.asignatura_id,
            fila.grupo,
            fila.cupo_disponible,
            fila.id,
            new Date(fila.created_at),
            new Date(fila.updated_at),
        );
    }

    async guardar(oferta: IOfertaAcademica): Promise<IOfertaAcademica> {
        const sql = `
            INSERT INTO ofertas_academicas (periodo_id, programa_id, asignatura_id, grupo, cupo_disponible) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *;
        `;
        const valores = [
            oferta.getPeriodoId(),
            oferta.getProgramaId(),
            oferta.getAsignaturaId(),
            oferta.getGrupo(),
            oferta.getCupoDisponible()
        ];
        
        try {
            const resultado = await pool.query(sql, valores);
            return this.mapearFilaAOferta(resultado.rows[0]);
        } catch (error: any) {
            if (error.code === '23505') { 
                throw new Error("409: Ya existe una oferta (grupo/asignatura/programa/periodo) con estos datos.");
            }
            throw error;
        }
    }

    async buscarPorClaveUnica(
        periodoId: string, 
        programaId: string, 
        asignaturaId: number, 
        grupo: string
    ): Promise<IOfertaAcademica | null> {
        const sql = `
            SELECT * FROM ofertas_academicas 
            WHERE periodo_id = $1 AND programa_id = $2 AND asignatura_id = $3 AND grupo = $4;
        `;
        const valores = [periodoId, programaId, asignaturaId, grupo];
        const resultado = await pool.query(sql, valores);

        if (resultado.rows.length === 0) return null;
        return this.mapearFilaAOferta(resultado.rows[0]);
    }
}