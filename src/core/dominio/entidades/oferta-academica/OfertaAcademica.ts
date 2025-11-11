import type { IOfertaAcademica } from '../../interfaces/IOfertaAcademica.js';

export class OfertaAcademica implements IOfertaAcademica {
    private id: number;
    private periodoId: string;
    private programaId: string;
    private asignaturaId: number;
    private grupo: string;
    private cupoDisponible: number;
    private fechaCreacion: Date;
    private fechaActualizacion: Date;

    constructor(
        periodoId: string,
        programaId: string,
        asignaturaId: number,
        grupo: string,
        cupoDisponible: number,
        id?: number,
        fechaCreacion?: Date,
        fechaActualizacion?: Date,
    ) {
        if (cupoDisponible <= 0) {
            throw new Error("400: El cupo disponible debe ser mayor que cero.");
        }
        
        this.periodoId = periodoId;
        this.programaId = programaId;
        this.asignaturaId = asignaturaId;
        this.grupo = grupo;
        this.cupoDisponible = cupoDisponible;
        this.id = id || 0; 
        this.fechaCreacion = fechaCreacion || new Date();
        this.fechaActualizacion = fechaActualizacion || new Date();
    }

    public getId(): number { return this.id; }
    public getPeriodoId(): string { return this.periodoId; }
    public getProgramaId(): string { return this.programaId; }
    public getAsignaturaId(): number { return this.asignaturaId; }
    public getGrupo(): string { return this.grupo; }
    public getCupoDisponible(): number { return this.cupoDisponible; }
    public getFechaCreacion(): Date { return this.fechaCreacion; }
    public getFechaActualizacion(): Date { return this.fechaActualizacion; }
}