import type { IAsignaturaRepositorio } from '../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js';
export declare class EliminarAsignaturaUseCase {
    private readonly repositorio;
    constructor(repositorio: IAsignaturaRepositorio);
    execute(id: number): Promise<void>;
}
//# sourceMappingURL=EliminarAsignaturaUseCase.d.ts.map