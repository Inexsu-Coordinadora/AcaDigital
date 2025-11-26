import { PlanEstudio } from "../../../dominio/entidades/plan-estudio/PlanEstudio.js";
import { ErrorNoEncontrado, ErrorConflicto, ErrorAplicacion, ErrorValidacion } from '../../../errores/ErrorAplicacion.js';
export class DefinirPlanEstudioUseCase {
    planRepo;
    programaRepo;
    asignaturaRepo;
    constructor(planRepo, programaRepo, asignaturaRepo) {
        this.planRepo = planRepo;
        this.programaRepo = programaRepo;
        this.asignaturaRepo = asignaturaRepo;
    }
    ;
    async ejecutar(dto) {
        let plan;
        try {
            plan = new PlanEstudio(dto);
        }
        catch (error) {
            if (error instanceof ErrorAplicacion) {
                throw error;
            }
            ;
            if (error instanceof Error) {
                throw new ErrorValidacion(error.message);
            }
            ;
            throw error;
        }
        ;
        const programa = await this.programaRepo.obtenerPorId(dto.programaId);
        if (!programa) {
            throw new ErrorNoEncontrado('Programa academico no encontrado');
        }
        ;
        const asignatura = await this.asignaturaRepo.obtenerPorId(dto.asignaturaId);
        if (!asignatura) {
            throw new ErrorNoEncontrado('Asignatura no encontrada');
        }
        ;
        const esDuplicado = await this.planRepo.existeVinculo(dto.programaId, dto.asignaturaId);
        if (esDuplicado) {
            throw new ErrorConflicto('La asignatura ya esta registrada en este programa');
        }
        ;
        return await this.planRepo.guardar(plan);
    }
    ;
}
;
//# sourceMappingURL=DefinirPlanEstudioUseCase.js.map