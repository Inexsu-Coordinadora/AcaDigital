import type { IPeriodoRepositorio } from '../../../dominio/interfaces/repositorio/IPeriodoAcademicoRepositorio.js';

import { ErrorNoEncontrado } from '../../../errores/ErrorAplicacion.js';

export class EliminarPeriodoUseCase {
    constructor(private repo: IPeriodoRepositorio) { };

    async ejecutar(id: string): Promise<void> {
        const existe = await this.repo.obtenerPorId(id);
        if (!existe) {
            throw new ErrorNoEncontrado('Periodo no encontrado');
        };
        await this.repo.eliminar(id);
    };
};