import { Pool } from 'pg';
import { 
  type IProgramaAcademico, 
  type IProgramaAcademicoRepositorio, 
  ProgramaAcademico, 
  Duracion, 
  NivelEducativo, 
  Modalidad 
} from '../../../dominio/index.js';
import { pool } from '../database/Conexion.js';

export class PostgresProgramaAcademicoRepository implements IProgramaAcademicoRepositorio {
  private client: Pool;

  constructor() {
    this.client = pool;
  }

  async crear(programa: IProgramaAcademico): Promise<IProgramaAcademico> {
    const query = `
      INSERT INTO programas_academicos (id, nombre, descripcion, nivel, modalidad, duracion_valor, duracion_unidad)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [
      programa.getId(),
      programa.getNombre(),
      programa.getDescripcion(),
      programa.getNivelEducativo(),
      programa.getModalidad(),
      programa.getDuracion().getValor(),
      programa.getDuracion().getUnidad(),
    ];
    
    const { rows } = await this.client.query(query, values);
    return this.mapRowToEntity(rows[0]);
  }

  async obtenerPorId(id: string): Promise<IProgramaAcademico | null> {
    const query = 'SELECT * FROM programas_academicos WHERE id = $1';
    const { rows } = await this.client.query(query, [id]);
    
    if (rows.length === 0) {
      return null;
    }
    
    return this.mapRowToEntity(rows[0]);
  }

  async obtenerTodos(): Promise<IProgramaAcademico[]> {
    const query = 'SELECT * FROM programas_academicos ORDER BY created_at DESC';
    const { rows } = await this.client.query(query);
    return rows.map(row => this.mapRowToEntity(row));
  }

  async actualizar(id: string, programa: IProgramaAcademico): Promise<IProgramaAcademico> {
    const query = `
      UPDATE programas_academicos
      SET nombre = $1, descripcion = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *;
    `;
    const values = [programa.getNombre(), programa.getDescripcion(), id];
    
    const { rows } = await this.client.query(query, values);
    return this.mapRowToEntity(rows[0]);
  }

  async eliminar(id: string): Promise<void> {
    const query = 'DELETE FROM programas_academicos WHERE id = $1';
    await this.client.query(query, [id]);
  }

  private mapRowToEntity(row: any): IProgramaAcademico {
    const duracion = new Duracion(row.duracion_valor, row.duracion_unidad);
    return new ProgramaAcademico(
      row.nombre,
      row.descripcion,
      row.nivel as NivelEducativo,
      row.modalidad as Modalidad,
      duracion,
      row.id
    );
  }
}

