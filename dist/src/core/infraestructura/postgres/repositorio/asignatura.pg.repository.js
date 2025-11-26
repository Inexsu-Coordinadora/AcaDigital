import { Asignatura } from '../../../dominio/entidades/asignatura/Asignatura.js';
import { pool } from '../database/Conexion.js';
export class AsignaturaPGRepository {
    mapearFilaAAsignatura(fila) {
        return new Asignatura(fila.nombre, fila.carga_horaria, fila.tipo, fila.id, new Date(fila.fecha_creacion), new Date(fila.fecha_actualizacion));
    }
    async guardar(asignatura) {
        if (asignatura.id > 0) {
            const sql = `UPDATE asignaturas SET nombre = $1, carga_horaria = $2, tipo = $3, fecha_actualizacion = NOW() WHERE id = $4 RETURNING *;`;
            const valores = [
                asignatura.nombre,
                asignatura.cargaHoraria,
                asignatura.tipo,
                asignatura.id
            ];
            const resultado = await pool.query(sql, valores);
            return this.mapearFilaAAsignatura(resultado.rows[0]);
        }
        else {
            const sql = `INSERT INTO asignaturas (nombre, carga_horaria, tipo) VALUES ($1, $2, $3) RETURNING *;`;
            const valores = [
                asignatura.nombre,
                asignatura.cargaHoraria,
                asignatura.tipo
            ];
            const resultado = await pool.query(sql, valores);
            return this.mapearFilaAAsignatura(resultado.rows[0]);
        }
        ;
    }
    ;
    async obtenerPorId(id) {
        const sql = 'SELECT * FROM asignaturas WHERE id = $1;';
        const resultado = await pool.query(sql, [id]);
        if (resultado.rows.length === 0)
            return null;
        return this.mapearFilaAAsignatura(resultado.rows[0]);
    }
    ;
    async obtenerTodos() {
        const sql = 'SELECT * FROM asignaturas ORDER BY nombre;';
        const resultado = await pool.query(sql, []);
        return resultado.rows.map(this.mapearFilaAAsignatura);
    }
    ;
    async eliminar(id) {
        const sql = 'DELETE FROM asignaturas WHERE id = $1;';
        await pool.query(sql, [id]);
    }
    ;
    async obtenerPorNombre(nombre) {
        const sql = 'SELECT * FROM asignaturas WHERE nombre ILIKE $1;';
        const resultado = await pool.query(sql, [nombre]);
        if (resultado.rows.length === 0)
            return null;
        return this.mapearFilaAAsignatura(resultado.rows[0]);
    }
    ;
}
//# sourceMappingURL=asignatura.pg.repository.js.map