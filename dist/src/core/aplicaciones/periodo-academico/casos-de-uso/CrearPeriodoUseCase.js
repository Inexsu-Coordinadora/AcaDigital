import { PeriodoAcademico } from '../../../dominio/entidades/periodo-academico/PeriodoAcademico.js';
import { ErrorConflicto, ErrorReglaNegocio } from '../../../errores/ErrorAplicacion.js';
export class CrearPeriodoUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    async ejecutar(input) {
        const { nombre, fechaInicio, fechaFin } = input;
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        if (fin <= inicio) {
            throw new ErrorReglaNegocio('fechaFin debe ser posterior a fechaInicio');
        }
        ;
        const existe = await this.repo.obtenerPorNombre(nombre);
        if (existe) {
            throw new ErrorConflicto('Ya existe un periodo con ese nombre');
        }
        ;
        const periodoEntidad = new PeriodoAcademico({
            nombre,
            fechaInicio: inicio,
            fechaFin: fin,
        });
        return await this.repo.guardar(periodoEntidad);
    }
    ;
}
;
//# sourceMappingURL=CrearPeriodoUseCase.js.map