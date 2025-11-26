import { Asignatura } from '../../../dominio/entidades/asignatura/Asignatura.js';
import { ErrorConflicto } from '../../../errores/ErrorAplicacion.js';
export class CrearAsignaturaUseCase {
    repositorio;
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    async execute(dto) {
        const existe = await this.repositorio.obtenerPorNombre(dto.nombre);
        if (existe) {
            throw new ErrorConflicto(`La asignatura con nombre '${dto.nombre}' ya existe.`);
        }
        const nuevaAsignatura = new Asignatura(dto.nombre, dto.cargaHoraria, dto.tipo);
        return this.repositorio.guardar(nuevaAsignatura);
    }
}
//# sourceMappingURL=CrearAsignaturaUseCase.js.map