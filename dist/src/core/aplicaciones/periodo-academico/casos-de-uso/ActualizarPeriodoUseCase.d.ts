import type { IPeriodoAcademico } from '../../../dominio/interfaces/IPeriodoAcademico.js';
import type { IPeriodoRepositorio } from '../../../dominio/interfaces/repositorio/IPeriodoAcademicoRepositorio.js';
import type { ActualizarPeriodoDTO } from '../dtos/ActualizarPeriodoDTO.js';
export declare class ActualizarPeriodoUseCase {
    private repo;
    constructor(repo: IPeriodoRepositorio);
    ejecutar(id: string, input: ActualizarPeriodoDTO): Promise<IPeriodoAcademico>;
}
//# sourceMappingURL=ActualizarPeriodoUseCase.d.ts.map