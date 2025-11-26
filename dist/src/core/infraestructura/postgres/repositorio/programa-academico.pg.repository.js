import { ProgramaAcademico } from '../../../dominio/entidades/programa-academico/ProgramaAcademico.js';
import { Duracion } from '../../../dominio/entidades/programa-academico/Duracion.js';
import { pool } from '../database/Conexion.js';
export class PostgresProgramaAcademicoRepository {
    async guardar(programa) {
        const query = `
            INSERT INTO programas_academicos 
            (id, nombre, descripcion, nivel, modalidad, duracion_valor, duracion_unidad)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const values = [
            programa.id,
            programa.nombre,
            programa.descripcion,
            programa.nivelEducativo,
            programa.modalidad,
            programa.duracion.valor,
            programa.duracion.unidad
        ];
        const result = await pool.query(query, values);
        return this.mapRowToProgramaAcademico(result.rows[0]);
    }
    async obtenerPorId(id) {
        const query = 'SELECT * FROM programas_academicos WHERE id = $1';
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return this.mapRowToProgramaAcademico(result.rows[0]);
    }
    async obtenerPorNombre(nombre) {
        const query = 'SELECT * FROM programas_academicos WHERE nombre ILIKE $1';
        const result = await pool.query(query, [nombre]);
        if (result.rows.length === 0) {
            return null;
        }
        return this.mapRowToProgramaAcademico(result.rows[0]);
    }
    async obtenerTodos() {
        const query = 'SELECT * FROM programas_academicos ORDER BY created_at DESC';
        const result = await pool.query(query);
        return result.rows.map(row => this.mapRowToProgramaAcademico(row));
    }
    async actualizar(id, programa) {
        const query = `
            UPDATE programas_academicos 
            SET nombre = $1, descripcion = $2, updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING *
        `;
        const values = [
            programa.nombre,
            programa.descripcion,
            id
        ];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Programa académico no encontrado.');
        }
        return this.mapRowToProgramaAcademico(result.rows[0]);
    }
    async eliminar(id) {
        const query = 'DELETE FROM programas_academicos WHERE id = $1';
        const result = await pool.query(query, [id]);
        if (result.rowCount === 0) {
            throw new Error('Programa académico no encontrado.');
        }
    }
    mapRowToProgramaAcademico(row) {
        const duracion = new Duracion(row.duracion_valor, row.duracion_unidad);
        return new ProgramaAcademico(row.nombre, row.descripcion, row.nivelEducativo, row.modalidad, duracion, row.id);
    }
}
//# sourceMappingURL=programa-academico.pg.repository.js.map