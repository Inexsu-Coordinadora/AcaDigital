import { EstadoPeriodo } from '../../../dominio/entidades/periodo-academico/EstadoPeriodo.js';
import type { IPeriodoAcademico } from '../../../dominio/interfaces/IPeriodoAcademico.js';
import type { IPeriodoRepositorio } from '../../../dominio/interfaces/repositorio/IPeriodoAcademicoRepositorio.js';
export declare class ObtenerPeriodosUseCase {
    private repo;
    constructor(repo: IPeriodoRepositorio);
    ejecutar(filtro?: {
        estado?: EstadoPeriodo;
    }): Promise<IPeriodoAcademico[]>;
}
//# sourceMappingURL=ObtenerPeriodosUseCase.d.ts.map