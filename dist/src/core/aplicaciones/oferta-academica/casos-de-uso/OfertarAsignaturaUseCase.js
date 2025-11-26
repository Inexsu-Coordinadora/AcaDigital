import { OfertaAcademica } from '../../../dominio/entidades/oferta-academica/OfertaAcademica.js';
import { ErrorNoEncontrado, ErrorReglaNegocio, ErrorConflicto } from '../../../errores/ErrorAplicacion.js';
export class OfertarAsignaturaUseCase {
    ofertaRepositorio;
    periodoRepositorio;
    programaRepositorio;
    asignaturaRepositorio;
    constructor(ofertaRepositorio, periodoRepositorio, programaRepositorio, asignaturaRepositorio) {
        this.ofertaRepositorio = ofertaRepositorio;
        this.periodoRepositorio = periodoRepositorio;
        this.programaRepositorio = programaRepositorio;
        this.asignaturaRepositorio = asignaturaRepositorio;
    }
    async ejecutar(dto) {
        const { periodoId, programaId, asignaturaId, grupo, cupoDisponible } = dto;
        const periodo = await this.periodoRepositorio.obtenerPorId(periodoId);
        if (!periodo) {
            throw new ErrorNoEncontrado(`Periodo con ID ${periodoId} no encontrado.`);
        }
        ;
        const programa = await this.programaRepositorio.obtenerPorId(programaId);
        if (!programa) {
            throw new ErrorNoEncontrado(`Programa con ID ${programaId} no encontrado.`);
        }
        ;
        const asignatura = await this.asignaturaRepositorio.obtenerPorId(asignaturaId);
        if (!asignatura) {
            throw new ErrorNoEncontrado(`Asignatura con ID ${asignaturaId} no encontrada.`);
        }
        ;
        if (periodo.estado !== 'activo') {
            throw new ErrorReglaNegocio(`El periodo ${periodo.nombre} no esta activo para crear ofertas. Estado actual: ${periodo.estado}.`);
        }
        ;
        const ofertaExistente = await this.ofertaRepositorio.buscarPorClaveUnica(periodoId, programaId, asignaturaId, grupo);
        if (ofertaExistente) {
            throw new ErrorConflicto('Ya existe una oferta académica con estos mismos datos.');
        }
        const nuevaOferta = new OfertaAcademica(periodoId, programaId, asignaturaId, grupo, cupoDisponible);
        return this.ofertaRepositorio.guardar(nuevaOferta);
    }
    ;
}
;
//# sourceMappingURL=OfertarAsignaturaUseCase.js.map