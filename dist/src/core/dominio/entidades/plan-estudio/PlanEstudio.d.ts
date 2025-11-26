import type { IPlanEstudio } from "../../interfaces/IPlanEstudio.js";
export type PlanEstudioProps = Omit<IPlanEstudio, 'createdAt' | 'updatedAt'>;
export declare class PlanEstudio implements IPlanEstudio {
    programaId: string;
    asignaturaId: number;
    semestreNivel: number;
    creditosCarga: number;
    createdAt: Date;
    updatedAt: Date;
    constructor(props: PlanEstudioProps);
}
//# sourceMappingURL=PlanEstudio.d.ts.map