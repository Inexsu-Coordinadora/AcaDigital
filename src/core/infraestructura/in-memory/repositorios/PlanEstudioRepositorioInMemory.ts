import type { IPlanEstudioRepositorio } from '../../../dominio/interfaces/repositorio/IPlanEstudioRepositorio.js';
import type { IPlanEstudio } from '../../../dominio/interfaces/IPlanEstudio.js';

export class PlanEstudioRepositorioInMemory implements IPlanEstudioRepositorio {
    private planes: Map<string, Map<number, IPlanEstudio>>;
    
    constructor() {
        this.planes = new Map<string, Map<number, IPlanEstudio>>();
    };

    async existeVinculo(programaId: string, asignaturaId: number): Promise<boolean> {
        const asignaturasDelPrograma = this.planes.get(programaId);
        if (!asignaturasDelPrograma) {
            return false;
        };
        return asignaturasDelPrograma.has(asignaturaId);
    };

    async guardar(plan: IPlanEstudio): Promise<IPlanEstudio> {
        let asignaturasDelPrograma = this.planes.get(plan.programaId);
        
        if (!asignaturasDelPrograma) {
            asignaturasDelPrograma = new Map<number, IPlanEstudio>();
            this.planes.set(plan.programaId, asignaturasDelPrograma);
        };

        asignaturasDelPrograma.set(plan.asignaturaId, plan);
        return plan;
    };
};