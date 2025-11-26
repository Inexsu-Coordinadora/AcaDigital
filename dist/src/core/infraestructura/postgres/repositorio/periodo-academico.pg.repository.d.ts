import { EstadoPeriodo } from '../../../dominio/entidades/periodo-academico/EstadoPeriodo.js';
import type { IPeriodoAcademico } from '../../../dominio/interfaces/IPeriodoAcademico.js';
import type { IPeriodoRepositorio } from '../../../dominio/interfaces/repositorio/IPeriodoAcademicoRepositorio.js';
export declare class PostgresPeriodoAcademicoRepository implements IPeriodoRepositorio {
    guardar(periodo: IPeriodoAcademico): Promise<IPeriodoAcademico>;
    obtenerPorId(id: string): Promise<IPeriodoAcademico | null>;
    obtenerPorNombre(nombre: string): Promise<IPeriodoAcademico | null>;
    obtenerTodos(filtro?: {
        estado?: EstadoPeriodo;
    }): Promise<IPeriodoAcademico[]>;
    actualizar(id: string, cambios: Partial<IPeriodoAcademico>): Promise<IPeriodoAcademico>;
    eliminar(id: string): Promise<void>;
    obtenerPeriodosActivosTraslapados(fechaInicio: Date, fechaFin: Date, idActual?: string): Promise<IPeriodoAcademico[]>;
    private mapear;
}
//# sourceMappingURL=periodo-academico.pg.repository.d.ts.map