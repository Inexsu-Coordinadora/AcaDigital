import type { IAsignaturaRepositorio } from '../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js';
import type { CrearAsignaturaDTO } from '../dtos/CrearAsignaturaDTO.js';
import type { IAsignatura } from '../../../dominio/interfaces/IAsignatura.js';
export declare class CrearAsignaturaUseCase {
    private readonly repositorio;
    constructor(repositorio: IAsignaturaRepositorio);
    execute(dto: CrearAsignaturaDTO): Promise<IAsignatura>;
}
//# sourceMappingURL=CrearAsignaturaUseCase.d.ts.map