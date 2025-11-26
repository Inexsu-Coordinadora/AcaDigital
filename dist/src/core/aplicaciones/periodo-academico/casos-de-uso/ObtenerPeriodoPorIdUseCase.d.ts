import type { IPeriodoAcademico } from '../../../dominio/interfaces/IPeriodoAcademico.js';
import type { IPeriodoRepositorio } from '../../../dominio/interfaces/repositorio/IPeriodoAcademicoRepositorio.js';
export declare class ObtenerPeriodoPorIdUseCase {
    private repositorio;
    constructor(repositorio: IPeriodoRepositorio);
    ejecutar(id: string): Promise<IPeriodoAcademico | null>;
}
//# sourceMappingURL=ObtenerPeriodoPorIdUseCase.d.ts.map