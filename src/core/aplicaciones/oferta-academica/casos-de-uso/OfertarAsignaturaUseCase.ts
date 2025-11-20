import { OfertarAsignaturaDTO } from '../dtos/OfertarAsignaturaDTO.js';
import type { IOfertaAcademica, IOfertaAcademicaRepositorio } from '../../../dominio/interfaces/IOfertaAcademica.js';
import { OfertaAcademica } from '../../../dominio/entidades/oferta-academica/OfertaAcademica.js';

import type { IPeriodoRepositorio } from '../../../dominio/interfaces/repositorio/IPeriodoAcademicoRepositorio.js';
import type { IProgramaAcademicoRepositorio } from '../../../dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js';
import type { IAsignaturaRepositorio } from '../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js';


import { ErrorNoEncontrado } from '../../../errores/errorAplicacion.js';
import { ErrorReglaNegocio } from '../../../errores/errorAplicacion.js';

export class OfertarAsignaturaUseCase {
    constructor(
        private readonly ofertaRepositorio: IOfertaAcademicaRepositorio,
        private readonly periodoRepositorio: IPeriodoRepositorio,
        private readonly programaRepositorio: IProgramaAcademicoRepositorio,
        private readonly asignaturaRepositorio: IAsignaturaRepositorio,
    ) {}

    async ejecutar(dto: OfertarAsignaturaDTO): Promise<IOfertaAcademica> {
        const { periodoId, programaId, asignaturaId, grupo, cupoDisponible } = dto;

        const periodo = await this.periodoRepositorio.obtenerPorId(periodoId);
        if (!periodo) {
            throw new ErrorNoEncontrado (`Periodo con ID ${periodoId} no encontrado.`);
        };

        const programa = await this.programaRepositorio.obtenerPorId(programaId);
        if (!programa) {
            throw new ErrorNoEncontrado (`Programa con ID ${programaId} no encontrado.`);
        };

        const asignatura = await this.asignaturaRepositorio.obtenerPorId(asignaturaId);
        if (!asignatura) {
            throw new ErrorNoEncontrado (`Asignatura con ID ${asignaturaId} no encontrada.`);
        };

        if (periodo.estado !== 'activo') {
            throw new ErrorReglaNegocio (`El periodo ${periodo.nombre} no esta activo para crear ofertas. Estado actual: ${periodo.estado}.`);
        };
        
        const nuevaOferta = new OfertaAcademica(
            periodoId,
            programaId,
            asignaturaId,
            grupo,
            cupoDisponible
        );

        return this.ofertaRepositorio.guardar(nuevaOferta);
    };
};