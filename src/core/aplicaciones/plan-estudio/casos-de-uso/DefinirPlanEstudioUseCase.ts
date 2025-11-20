import { PlanEstudio } from "../../../dominio/entidades/plan-estudio/PlanEstudio.js";
import { IPlanEstudioRepositorio } from "../../../dominio/interfaces/repositorio/IPlanEstudioRepositorio.js";
import { DefinirPlanEstudioDTO } from "../dtos/DefinirPlanEstudioDTO.js";

import { IProgramaAcademicoRepositorio } from "../../../dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js";
import { IAsignaturaRepositorio } from "../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js";

import { ErrorNoEncontrado, ErrorConflicto } from '../../../errores/errorAplicacion.js';

export class DefinirPlanEstudioUseCase {
    constructor(
        private planRepo: IPlanEstudioRepositorio,
        private programaRepo: IProgramaAcademicoRepositorio,
        private asignaturaRepo: IAsignaturaRepositorio
    ) { };

    async ejecutar(dto: DefinirPlanEstudioDTO): Promise<PlanEstudio> {

        const programa = await this.programaRepo.obtenerPorId(dto.programaId);
        if (!programa) {
            throw new ErrorNoEncontrado ('Programa academico no encontrado');
        };

        const asignatura = await this.asignaturaRepo.obtenerPorId(dto.asignaturaId);
        if (!asignatura) {
            throw new ErrorNoEncontrado ('Asignatura no encontrada');
        };

        const esDuplicado = await this.planRepo.existeVinculo(
            dto.programaId,
            dto.asignaturaId
        );
        if (esDuplicado) {
            throw new ErrorConflicto ('La asignatura ya esta registrada en este programa');
        };

        const plan = new PlanEstudio(dto);
        return await this.planRepo.guardar(plan);
    };
};