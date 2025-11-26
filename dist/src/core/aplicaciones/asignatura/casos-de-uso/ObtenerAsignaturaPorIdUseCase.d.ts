import type { IAsignaturaRepositorio } from '../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js';
import type { IAsignatura } from '../../../dominio/interfaces/IAsignatura.js';
export declare class ObtenerAsignaturaPorIdUseCase {
    private readonly repositorio;
    constructor(repositorio: IAsignaturaRepositorio);
    obtenerPorId(id: number): Promise<IAsignatura | null>;
}
//# sourceMappingURL=ObtenerAsignaturaPorIdUseCase.d.ts.map