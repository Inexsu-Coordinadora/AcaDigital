import type { IPlanEstudioRepositorio } from '../../../dominio/interfaces/repositorio/IPlanEstudioRepositorio.js';
import type { IPlanEstudio } from '../../../dominio/interfaces/IPlanEstudio.js';
export declare class PlanEstudioPGRepository implements IPlanEstudioRepositorio {
    private mapear;
    existeVinculo(programaId: string, asignaturaId: number): Promise<boolean>;
    guardar(plan: IPlanEstudio): Promise<IPlanEstudio>;
    listarPorPrograma(programaId: string): Promise<IPlanEstudio[]>;
    obtener(programaId: string, asignaturaId: number): Promise<IPlanEstudio | null>;
    actualizar(programaId: string, asignaturaId: number, datos: Partial<Omit<IPlanEstudio, 'programaId' | 'asignaturaId' | 'createdAt' | 'updatedAt'>>): Promise<IPlanEstudio | null>;
    eliminar(programaId: string, asignaturaId: number): Promise<void>;
}
//# sourceMappingURL=plan-estudio.pg.repository.d.ts.map