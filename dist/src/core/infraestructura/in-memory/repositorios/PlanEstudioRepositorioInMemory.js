export class PlanEstudioRepositorioInMemory {
    planes;
    constructor() {
        this.planes = new Map();
    }
    ;
    async existeVinculo(programaId, asignaturaId) {
        const asignaturasDelPrograma = this.planes.get(programaId);
        if (!asignaturasDelPrograma) {
            return false;
        }
        ;
        return asignaturasDelPrograma.has(asignaturaId);
    }
    ;
    async guardar(plan) {
        let asignaturasDelPrograma = this.planes.get(plan.programaId);
        if (!asignaturasDelPrograma) {
            asignaturasDelPrograma = new Map();
            this.planes.set(plan.programaId, asignaturasDelPrograma);
        }
        ;
        asignaturasDelPrograma.set(plan.asignaturaId, plan);
        return plan;
    }
    ;
}
;
//# sourceMappingURL=PlanEstudioRepositorioInMemory.js.map