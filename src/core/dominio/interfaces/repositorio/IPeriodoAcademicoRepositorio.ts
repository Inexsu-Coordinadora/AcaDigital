import type { IPeriodoAcademico } from '../IPeriodoAcademico.js';
import type { EstadoPeriodo } from '../../entidades/periodo-academico/EstadoPeriodo.js';

export interface IPeriodoRepositorio {
    guardar(periodo: IPeriodoAcademico): Promise<IPeriodoAcademico>; // crear
    obtenerPorNombre(nombre: string): Promise<IPeriodoAcademico | null>;
    obtenerPorId(id: string): Promise<IPeriodoAcademico | null>;
    obtenerTodos(filtro?: { estado?: EstadoPeriodo }): Promise<IPeriodoAcademico[]>;
    actualizar(id: string, data: Partial<IPeriodoAcademico>): Promise<IPeriodoAcademico>;
    eliminar(id: string): Promise<void>;
    obtenerPeriodosActivosTraslapados(fechaInicio: Date, fechaFin: Date, idActual?: string): Promise<IPeriodoAcademico[]>;
};