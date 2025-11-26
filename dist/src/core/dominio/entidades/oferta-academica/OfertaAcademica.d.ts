import type { IOfertaAcademica } from '../../interfaces/IOfertaAcademica.js';
export declare class OfertaAcademica implements IOfertaAcademica {
    id: number;
    periodoId: string;
    programaId: string;
    asignaturaId: number;
    grupo: string;
    cupoDisponible: number;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    constructor(periodoId: string, programaId: string, asignaturaId: number, grupo: string, cupoDisponible: number, id?: number, fechaCreacion?: Date, fechaActualizacion?: Date);
    getId(): number;
    getPeriodoId(): string;
    getProgramaId(): string;
    getAsignaturaId(): number;
    getGrupo(): string;
    getCupoDisponible(): number;
    getFechaCreacion(): Date;
    getFechaActualizacion(): Date;
}
//# sourceMappingURL=OfertaAcademica.d.ts.map