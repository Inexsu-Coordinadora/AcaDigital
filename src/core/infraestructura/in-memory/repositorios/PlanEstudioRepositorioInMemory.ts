import { IPlanEstudioRepositorio } from "../../../../core/dominio/interfaces/repositorio/IPlanEstudioRepositorio.js";
import { PlanEstudio } from "../../../../core/dominio/entidades/plan-estudio/PlanEstudio.js";

export class PlanEstudioRepositorioInMemory implements IPlanEstudioRepositorio {
    private planes: Map<string, PlanEstudio>;

    constructor(initialData: PlanEstudio[] = []) {
        this.planes = new Map();
        initialData.forEach(plan => {
            this.planes.set(`${plan.programaId}-${plan.asignaturaId}`, plan);
        });
    };

    async existeVinculo(programaId: string, asignaturaId: number): Promise<boolean> {
        const key = `${programaId}-${asignaturaId}`;
        return this.planes.has(key);
    };

    async guardar(plan: PlanEstudio): Promise<PlanEstudio> {
        const key = `${plan.programaId}-${plan.asignaturaId}`;

        const planGuardado = {
            ...plan,
            id: plan.asignaturaId || `plan-${this.planes.size + 1}`,
            createdAt: plan.createdAt || new Date(),
            updatedAt: new Date()
        } as PlanEstudio;

        this.planes.set(key, planGuardado);
        return planGuardado;
    };

    async obtenerPorId(id: string): Promise<PlanEstudio | null> {
        return Array.from(this.planes.values()).find(p => Number(p.asignaturaId) === Number(id)) || null;
    };

    async obtenerPlanesPorPrograma(programaId: string): Promise<PlanEstudio[]> {
        return Array.from(this.planes.values()).filter(p => p.programaId === programaId);
    };
    
    async obtenerTodos(): Promise<PlanEstudio[]> { return Array.from(this.planes.values()); }
    async actualizar(plan: PlanEstudio): Promise<PlanEstudio> { throw new Error("Metodo no implementado."); }
    async eliminar(planId: string): Promise<void> { this.planes.delete(planId); }
}