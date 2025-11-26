import type { IPeriodoRepositorio } from '../../../dominio/interfaces/repositorio/IPeriodoAcademicoRepositorio.js';
export declare class EliminarPeriodoUseCase {
    private repo;
    constructor(repo: IPeriodoRepositorio);
    ejecutar(id: string): Promise<void>;
}
//# sourceMappingURL=EliminarPeriodoUseCase.d.ts.map