import { pool } from '../database/Conexion.js';
import { EstadoPeriodo } from '../../../dominio/entidades/periodo-academico/EstadoPeriodo.js';
import type { IPeriodoAcademico } from '../../../dominio/interfaces/IPeriodoAcademico.js';
import type { IPeriodoRepositorio } from '../../../dominio/interfaces/repositorio/IPeriodoAcademicoRepositorio.js';

interface PeriodoRow {
    id: string;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    estado: EstadoPeriodo;
    created_at: string;
    updated_at: string;
}

export class PostgresPeriodoAcademicoRepository implements IPeriodoRepositorio {
    async guardar(periodo: IPeriodoAcademico): Promise<IPeriodoAcademico> {
        const query = `
            INSERT INTO periodos 
            (id, nombre, fecha_inicio, fecha_fin, estado, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *
        `;

        const values = [
            periodo.id,
            periodo.nombre,
            periodo.fechaInicio,
            periodo.fechaFin,
            periodo.estado,
            periodo.createdAt,
            periodo.updatedAt
        ];

        const { rows } = await pool.query(query, values);
        return this.mapear(rows[0]);
    };

    async obtenerPorId(id: string): Promise<IPeriodoAcademico | null> {
        const { rows } = await pool.query(
            'SELECT * FROM periodos WHERE id = $1',
            [id]
        );
        return rows[0] ? this.mapear(rows[0]) : null;
    };

    async obtenerPorNombre(nombre: string): Promise<IPeriodoAcademico | null> {
        const { rows } = await pool.query(
            'SELECT * FROM periodos WHERE nombre = $1',
            [nombre]
        );
        return rows[0] ? this.mapear(rows[0]) : null;
    };

    async obtenerTodos(filtro?: { estado?: EstadoPeriodo }): Promise<IPeriodoAcademico[]> {
        let query = 'SELECT * FROM periodos';
        const values: any[] = [];

        if (filtro?.estado) {
            query += ' WHERE estado = $1';
            values.push(filtro.estado);
        };

        query += ' ORDER BY fecha_inicio DESC';
        const { rows } = await pool.query(query, values);
        return rows.map(row => this.mapear(row));
    };

    async actualizar(id: string, cambios: Partial<IPeriodoAcademico>): Promise<IPeriodoAcademico> {
        const query = `
            UPDATE periodos
            SET nombre = $1,
                fecha_inicio = $2,
                fecha_fin = $3,
                estado = $4,
                updated_at = NOW()
            WHERE id = $5
          RETURNING *
        `;

        const values = [
            cambios.nombre,
            cambios.fechaInicio,
            cambios.fechaFin,
            cambios.estado,
            id
        ];

        const { rows } = await pool.query(query, values);
        return this.mapear(rows[0]);
    };

    async eliminar(id: string): Promise<void> {
        await pool.query('DELETE FROM periodos WHERE id = $1', [id]);
    };

    async obtenerPeriodosActivosTraslapados(fechaInicio: Date, fechaFin: Date, idActual?: string): Promise<IPeriodoAcademico[]> {
        let query = `
            SELECT * FROM periodos
            WHERE estado = $1
            AND (fecha_inicio <= $3 AND fecha_fin >= $2)
        `;
        const values: any[] = [EstadoPeriodo.ACTIVO, fechaInicio, fechaFin];

        if (idActual) {
            query += ' AND id != $4';
            values.push(idActual);
        }

        const { rows } = await pool.query(query, values);
        return rows.map(row => this.mapear(row));
    }

    private mapear(row: PeriodoRow): IPeriodoAcademico {
        return {
            id: row.id,
            nombre: row.nombre,
            fechaInicio: new Date(row.fecha_inicio),
            fechaFin: new Date(row.fecha_fin),
            estado: row.estado,
            createdAt: new Date(row.created_at),
            updatedAt: new Date(row.updated_at),
        } as IPeriodoAcademico;
    };
};