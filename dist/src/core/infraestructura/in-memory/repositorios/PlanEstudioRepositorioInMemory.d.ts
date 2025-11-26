import type { IPlanEstudioRepositorio } from '../../../dominio/interfaces/repositorio/IPlanEstudioRepositorio.js';
import type { IPlanEstudio } from '../../../dominio/interfaces/IPlanEstudio.js';
export declare class PlanEstudioRepositorioInMemory implements IPlanEstudioRepositorio {
    private planes;
    constructor();
    existeVinculo(programaId: string, asignaturaId: number): Promise<boolean>;
    guardar(plan: IPlanEstudio): Promise<IPlanEstudio>;
}
//# sourceMappingURL=PlanEstudioRepositorioInMemory.d.ts.map