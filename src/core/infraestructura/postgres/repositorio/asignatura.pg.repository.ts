import type { IAsignaturaRepositorio } from '../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js';
import { Asignatura, TipoAsignatura } from '../../../dominio/entidades/asignatura/Asignatura.js';
import type { IAsignatura } from '../../../dominio/interfaces/IAsignatura.js'; 
import { pool } from '../database/Conexion.js'; 

export class AsignaturaPGRepository implements IAsignaturaRepositorio {
    private mapearFilaAAsignatura(fila: any): IAsignatura {
        return new Asignatura(
            fila.nombre,
            fila.carga_horaria, 
            fila.tipo as TipoAsignatura,
            fila.id,
            new Date(fila.fecha_creacion),
            new Date(fila.fecha_actualizacion),
        );
    }

    async save(asignatura: IAsignatura): Promise<IAsignatura> {
        if (asignatura.getId()) {
            const sql = `UPDATE asignaturas SET nombre = $1, carga_horaria = $2, tipo = $3, fecha_actualizacion = NOW() WHERE id = $4 RETURNING *;`;
            const valores = [asignatura.getNombre(), asignatura.getCargaHoraria(), asignatura.getTipo(), asignatura.getId()];
            const resultado = await pool.query(sql, valores); 
            return this.mapearFilaAAsignatura(resultado.rows[0]);
        } else {
            const sql = `INSERT INTO asignaturas (nombre, carga_horaria, tipo) VALUES ($1, $2, $3) RETURNING *;`;
            const valores = [asignatura.getNombre(), asignatura.getCargaHoraria(), asignatura.getTipo()];
            const resultado = await pool.query(sql, valores); 
            return this.mapearFilaAAsignatura(resultado.rows[0]);
        }
    }

    async findById(id: number): Promise<IAsignatura | null> {
        const sql = 'SELECT * FROM asignaturas WHERE id = $1;';
        const resultado = await pool.query(sql, [id]); 
        if (resultado.rows.length === 0) return null;
        return this.mapearFilaAAsignatura(resultado.rows[0]);
    }

    async findAll(): Promise<IAsignatura[]> {
        const sql = 'SELECT * FROM asignaturas ORDER BY nombre;';
        const resultado = await pool.query(sql, []); 
        return resultado.rows.map(this.mapearFilaAAsignatura);
    }

    async delete(id: number): Promise<void> {
        const sql = 'DELETE FROM asignaturas WHERE id = $1;';
        await pool.query(sql, [id]); 
    }

    async findByNombre(nombre: string): Promise<IAsignatura | null> {
        const sql = 'SELECT * FROM asignaturas WHERE nombre ILIKE $1;';
        const resultado = await pool.query(sql, [nombre]); 
        if (resultado.rows.length === 0) return null;
        return this.mapearFilaAAsignatura(resultado.rows[0]);
    }
}