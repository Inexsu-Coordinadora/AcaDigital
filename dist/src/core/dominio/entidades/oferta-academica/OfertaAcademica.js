import { ErrorReglaNegocio } from '../../../errores/ErrorAplicacion.js';
export class OfertaAcademica {
    id;
    periodoId;
    programaId;
    asignaturaId;
    grupo;
    cupoDisponible;
    fechaCreacion;
    fechaActualizacion;
    constructor(periodoId, programaId, asignaturaId, grupo, cupoDisponible, id, fechaCreacion, fechaActualizacion) {
        if (cupoDisponible <= 0) {
            throw new ErrorReglaNegocio("El cupo disponible debe ser mayor que cero.");
        }
        this.periodoId = periodoId;
        this.programaId = programaId;
        this.asignaturaId = asignaturaId;
        this.grupo = grupo;
        this.cupoDisponible = cupoDisponible;
        this.id = id || 0;
        this.fechaCreacion = fechaCreacion || new Date();
        this.fechaActualizacion = fechaActualizacion || new Date();
    }
    // Backwards-compatible method names expected by tests / legacy callers
    getId() { return this.id; }
    getPeriodoId() { return this.periodoId; }
    getProgramaId() { return this.programaId; }
    getAsignaturaId() { return this.asignaturaId; }
    getGrupo() { return this.grupo; }
    getCupoDisponible() { return this.cupoDisponible; }
    getFechaCreacion() { return this.fechaCreacion; }
    getFechaActualizacion() { return this.fechaActualizacion; }
}
//# sourceMappingURL=OfertaAcademica.js.map