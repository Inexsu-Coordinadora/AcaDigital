import { EstadoPeriodo } from "./EstadoPeriodo.js";
import type { IPeriodoAcademico } from "../../interfaces/IPeriodoAcademico.js";
export declare class PeriodoAcademico implements IPeriodoAcademico {
    readonly id: string;
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;
    estado: EstadoPeriodo;
    readonly createdAt: Date;
    updatedAt: Date;
    constructor(props: {
        id?: string;
        nombre: string;
        fechaInicio: Date;
        fechaFin: Date;
        estado?: EstadoPeriodo | string;
        createdAt?: Date;
        updatedAt?: Date;
    });
    activar(): void;
    cerrar(): void;
    puedeOfertarAsignaturas(): boolean;
}
//# sourceMappingURL=PeriodoAcademico.d.ts.map