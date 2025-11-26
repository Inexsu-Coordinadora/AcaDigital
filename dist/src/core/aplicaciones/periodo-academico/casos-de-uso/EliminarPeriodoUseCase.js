import { ErrorNoEncontrado } from '../../../errores/ErrorAplicacion.js';
export class EliminarPeriodoUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    async ejecutar(id) {
        const existe = await this.repo.obtenerPorId(id);
        if (!existe) {
            throw new ErrorNoEncontrado('Periodo no encontrado');
        }
        ;
        await this.repo.eliminar(id);
    }
    ;
}
;
//# sourceMappingURL=EliminarPeriodoUseCase.js.map