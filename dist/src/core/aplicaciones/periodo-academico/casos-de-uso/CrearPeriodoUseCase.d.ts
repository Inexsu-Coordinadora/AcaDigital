import type { IPeriodoAcademico } from '../../../dominio/interfaces/IPeriodoAcademico.js';
import type { IPeriodoRepositorio } from '../../../dominio/interfaces/repositorio/IPeriodoAcademicoRepositorio.js';
import type { CrearPeriodoDTO } from '../dtos/CrearPeriodoDTO.js';
export declare class CrearPeriodoUseCase {
    private repo;
    constructor(repo: IPeriodoRepositorio);
    ejecutar(input: CrearPeriodoDTO): Promise<IPeriodoAcademico>;
}
//# sourceMappingURL=CrearPeriodoUseCase.d.ts.map