import type { IAsignaturaRepositorio } from '../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js';

import { ErrorNoEncontrado } from '../../../errores/errorAplicacion.js';

export class EliminarAsignaturaUseCase {
    constructor(private readonly repositorio: IAsignaturaRepositorio) {}

    async execute(id: number): Promise<void> {
        const existe = await this.repositorio.obtenerPorId(id);
        if (!existe) {
            throw new ErrorNoEncontrado(`404: Asignatura con ID ${id} no encontrada.`);
        };
        
        await this.repositorio.eliminar(id);
    };
};