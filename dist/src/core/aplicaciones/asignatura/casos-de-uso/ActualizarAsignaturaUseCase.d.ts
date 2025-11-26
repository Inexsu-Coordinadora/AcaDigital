import type { IAsignaturaRepositorio } from '../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js';
import type { ActualizarAsignaturaDTO } from '../dtos/ActualizarAsignaturaDTO.js';
import type { IAsignatura } from '../../../dominio/interfaces/IAsignatura.js';
export declare class ActualizarAsignaturaUseCase {
    private readonly repositorio;
    constructor(repositorio: IAsignaturaRepositorio);
    execute(dto: ActualizarAsignaturaDTO): Promise<IAsignatura>;
}
//# sourceMappingURL=ActualizarAsignaturaUseCase.d.ts.map