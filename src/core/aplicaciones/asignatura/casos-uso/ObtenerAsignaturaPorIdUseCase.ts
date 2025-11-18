import type { IAsignaturaRepositorio } from '../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js';
import type { IAsignatura } from '../../../dominio/interfaces/IAsignatura.js';

export class ObtenerAsignaturaPorIdUseCase {
    constructor(private readonly repositorio: IAsignaturaRepositorio) {}

    async obtenerPorId(id: number): Promise<IAsignatura | null> {
        return this.repositorio.obtenerPorId(id);
    }
}