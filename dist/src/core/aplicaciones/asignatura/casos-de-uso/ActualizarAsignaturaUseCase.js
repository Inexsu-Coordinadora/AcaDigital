import { ErrorNoEncontrado, ErrorConflicto } from '../../../errores/ErrorAplicacion.js';
export class ActualizarAsignaturaUseCase {
    repositorio;
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    async execute(dto) {
        const asignaturaExistente = await this.repositorio.obtenerPorId(dto.id);
        if (!asignaturaExistente) {
            throw new ErrorNoEncontrado(`Asignatura con ID ${dto.id} no encontrada.`);
        }
        ;
        if (dto.nombre !== asignaturaExistente.nombre) {
            const conMismoNombre = await this.repositorio.obtenerPorNombre(dto.nombre);
            if (conMismoNombre && conMismoNombre.id !== dto.id) {
                throw new ErrorConflicto(`La asignatura con nombre '${dto.nombre}' ya existe.`);
            }
            ;
        }
        ;
        asignaturaExistente.actualizarInformacion(dto.nombre, dto.cargaHoraria, dto.tipo);
        return this.repositorio.guardar(asignaturaExistente);
    }
    ;
}
;
//# sourceMappingURL=ActualizarAsignaturaUseCase.js.map