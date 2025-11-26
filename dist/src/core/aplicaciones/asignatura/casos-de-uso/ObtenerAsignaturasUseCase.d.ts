import type { IAsignaturaRepositorio } from '../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js';
import type { IAsignatura } from '../../../dominio/interfaces/IAsignatura.js';
export declare class ObtenerAsignaturasUseCase {
    private readonly repositorio;
    constructor(repositorio: IAsignaturaRepositorio);
    findAll(): Promise<IAsignatura[]>;
}
//# sourceMappingURL=ObtenerAsignaturasUseCase.d.ts.map