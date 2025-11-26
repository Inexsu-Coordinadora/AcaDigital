import { pool } from '../database/Conexion.js';
import { EstadoPeriodo } from '../../../dominio/entidades/periodo-academico/EstadoPeriodo.js';
import { PeriodoAcademico } from '../../../dominio/entidades/periodo-academico/PeriodoAcademico.js';
export class PostgresPeriodoAcademicoRepository {
    async guardar(periodo) {
        const query = `
            INSERT INTO periodos 
            (id, nombre, fecha_inicio, fecha_fin, estado, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const values = [
            periodo.id, periodo.nombre, periodo.fechaInicio, periodo.fechaFin,
            periodo.estado, periodo.createdAt, periodo.updatedAt
        ];
        const { rows } = await pool.query(query, values);
        return this.mapear(rows[0]);
    }
    ;
    async obtenerPorId(id) {
        const { rows } = await pool.query('SELECT * FROM periodos WHERE id = $1', [id]);
        return rows[0] ? this.mapear(rows[0]) : null;
    }
    ;
    async obtenerPorNombre(nombre) {
        const { rows } = await pool.query('SELECT * FROM periodos WHERE nombre = $1', [nombre]);
        return rows[0] ? this.mapear(rows[0]) : null;
    }
    ;
    async obtenerTodos(filtro) {
        let query = 'SELECT * FROM periodos';
        const values = [];
        if (filtro?.estado) {
            query += ' WHERE estado = $1';
            values.push(filtro.estado);
        }
        ;
        query += ' ORDER BY fecha_inicio DESC';
        const { rows } = await pool.query(query, values);
        return rows.map(row => this.mapear(row));
    }
    ;
    async actualizar(id, cambios) {
        const periodoExistente = await this.obtenerPorId(id);
        if (!periodoExistente) {
            throw new Error("404: Periodo no encontrado para actualizar.");
        }
        const dataActualizada = {
            ...periodoExistente,
            ...cambios
        };
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
            dataActualizada.nombre,
            dataActualizada.fechaInicio,
            dataActualizada.fechaFin,
            dataActualizada.estado,
            id
        ];
        const { rows } = await pool.query(query, values);
        return this.mapear(rows[0]);
    }
    ;
    async eliminar(id) {
        await pool.query('DELETE FROM periodos WHERE id = $1', [id]);
    }
    ;
    async obtenerPeriodosActivosTraslapados(fechaInicio, fechaFin, idActual) {
        let query = `
            SELECT * FROM periodos
            WHERE estado = $1
            AND (fecha_inicio <= $3 AND fecha_fin >= $2)
        `;
        const values = [EstadoPeriodo.ACTIVO, fechaInicio, fechaFin];
        if (idActual) {
            query += ' AND id != $4';
            values.push(idActual);
        }
        const { rows } = await pool.query(query, values);
        return rows.map(row => this.mapear(row));
    }
    mapear(row) {
        const fechaInicioStr = row.fecha_inicio || new Date().toISOString();
        const fechaFinStr = row.fecha_fin || new Date().toISOString();
        const createdAtStr = row.created_at || new Date().toISOString();
        const updatedAtStr = row.updated_at || createdAtStr;
        return new PeriodoAcademico({
            id: row.id,
            nombre: row.nombre,
            fechaInicio: new Date(fechaInicioStr),
            fechaFin: new Date(fechaFinStr),
            estado: row.estado,
            createdAt: new Date(createdAtStr),
            updatedAt: new Date(updatedAtStr),
        });
    }
    ;
}
;
//# sourceMappingURL=periodo-academico.pg.repository.js.map