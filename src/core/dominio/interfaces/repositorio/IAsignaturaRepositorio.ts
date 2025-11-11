import type { IAsignatura } from '../IAsignatura.js';

export interface IAsignaturaRepositorio {
  guardar(asignatura: IAsignatura): Promise<IAsignatura>;
  obtenerPorId(id: number): Promise<IAsignatura | null>;
  obtenerTodos(): Promise<IAsignatura[]>;
  eliminar(id: number): Promise<void>;
  obtenerPorNombre(nombre: string): Promise<IAsignatura | null>;
};