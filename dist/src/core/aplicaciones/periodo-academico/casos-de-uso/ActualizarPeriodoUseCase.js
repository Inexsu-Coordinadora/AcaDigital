import { EstadoPeriodo } from '../../../dominio/entidades/periodo-academico/EstadoPeriodo.js';
import { PeriodoAcademico } from '../../../dominio/entidades/periodo-academico/PeriodoAcademico.js';
import { ErrorNoEncontrado, ErrorConflicto, ErrorReglaNegocio } from '../../../errores/ErrorAplicacion.js';
export class ActualizarPeriodoUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    async ejecutar(id, input) {
        const periodoProps = await this.repo.obtenerPorId(id);
        if (!periodoProps) {
            throw new ErrorNoEncontrado('Periodo no encontrado');
        }
        ;
        const periodoEntidad = new PeriodoAcademico(periodoProps);
        // Validaciones
        if (input.nombre && input.nombre !== periodoEntidad.nombre) {
            const existe = await this.repo.obtenerPorNombre(input.nombre);
            if (existe)
                throw new ErrorConflicto('Nombre ya en uso');
            periodoEntidad.nombre = input.nombre;
        }
        ;
        const nuevaFechaInicio = input.fechaInicio ? new Date(input.fechaInicio) : periodoEntidad.fechaInicio;
        const nuevaFechaFin = input.fechaFin ? new Date(input.fechaFin) : periodoEntidad.fechaFin;
        if (nuevaFechaFin <= nuevaFechaInicio) {
            throw new ErrorReglaNegocio('La fecha de fin debe ser posterior a la fecha de inicio.');
        }
        periodoEntidad.fechaInicio = nuevaFechaInicio;
        periodoEntidad.fechaFin = nuevaFechaFin;
        if (input.estado && input.estado !== periodoEntidad.estado) {
            if (input.estado === EstadoPeriodo.ACTIVO) {
                periodoEntidad.activar();
            }
            else if (input.estado === EstadoPeriodo.CERRADO) {
                periodoEntidad.cerrar();
            }
            else if (input.estado === EstadoPeriodo.INACTIVO) {
                throw new ErrorReglaNegocio('Transicion de estado invalida: no se puede pasar a "inactivo" directamente.');
            }
        }
        if (periodoEntidad.estado === EstadoPeriodo.ACTIVO) {
            const periodosTraslapados = await this.repo.obtenerPeriodosActivosTraslapados(periodoEntidad.fechaInicio, periodoEntidad.fechaFin, periodoEntidad.id);
            if (periodosTraslapados && periodosTraslapados.length > 0) {
                throw new ErrorConflicto('El periodo se solapa con otro periodo activo existente.');
            }
        }
        periodoEntidad.updatedAt = new Date();
        const cambios = {
            nombre: periodoEntidad.nombre,
            fechaInicio: periodoEntidad.fechaInicio,
            fechaFin: periodoEntidad.fechaFin,
            estado: periodoEntidad.estado,
            updatedAt: periodoEntidad.updatedAt
        };
        return await this.repo.actualizar(id, cambios);
    }
    ;
}
;
//# sourceMappingURL=ActualizarPeriodoUseCase.js.map