import { PlanEstudio } from "../../../dominio/entidades/plan-estudio/PlanEstudio.js";
import { IPlanEstudioRepositorio } from "../../../dominio/interfaces/repositorio/IPlanEstudioRepositorio.js";
import { DefinirPlanEstudioDTO } from "../dtos/DefinirPlanEstudioDTO.js";
import { IProgramaAcademicoRepositorio } from "../../../dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js";
import { IAsignaturaRepositorio } from "../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js";
export declare class DefinirPlanEstudioUseCase {
    private planRepo;
    private programaRepo;
    private asignaturaRepo;
    constructor(planRepo: IPlanEstudioRepositorio, programaRepo: IProgramaAcademicoRepositorio, asignaturaRepo: IAsignaturaRepositorio);
    ejecutar(dto: DefinirPlanEstudioDTO): Promise<PlanEstudio>;
}
//# sourceMappingURL=DefinirPlanEstudioUseCase.d.ts.map