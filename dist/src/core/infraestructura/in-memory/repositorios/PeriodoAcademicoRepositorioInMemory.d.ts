import { IPeriodoRepositorio } from '../../../dominio/interfaces/repositorio/IPeriodoAcademicoRepositorio.js';
import { IPeriodoAcademico } from '../../../dominio/interfaces/IPeriodoAcademico.js';
export declare class PeriodoAcademicoRepositorioInMemory implements IPeriodoRepositorio {
    private periodos;
    guardar(periodo: IPeriodoAcademico): Promise<IPeriodoAcademico>;
    obtenerPorNombre(nombre: string): Promise<IPeriodoAcademico | null>;
    obtenerPorId(id: string): Promise<IPeriodoAcademico | null>;
    obtenerTodos(filtro?: {
        estado?: string;
    }): Promise<IPeriodoAcademico[]>;
    actualizar(id: string, data: Partial<IPeriodoAcademico>): Promise<IPeriodoAcademico>;
    eliminar(id: string): Promise<void>;
    obtenerPeriodosActivosTraslapados(fechaInicio: Date, fechaFin: Date, idActual?: string): Promise<IPeriodoAcademico[]>;
}
//# sourceMappingURL=PeriodoAcademicoRepositorioInMemory.d.ts.map