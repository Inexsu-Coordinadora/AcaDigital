import type { IOfertaAcademica } from '../../interfaces/IOfertaAcademica.js';
import { ErrorReglaNegocio } from '../../../errores/errorAplicacion.js';

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
            throw new ErrorReglaNegocio("El cupo disponible debe ser mayor que cero.");
        }
        
        this._periodoId = periodoId;
        this._programaId = programaId;
        this._asignaturaId = asignaturaId;
        this._grupo = grupo;
        this._cupoDisponible = cupoDisponible;
        this._id = id || 0; 
        this._fechaCreacion = fechaCreacion || new Date();
        this._fechaActualizacion = fechaActualizacion || new Date();
    }

    public get id(): number { return this._id; }
    public get periodoId(): string { return this._periodoId; }
    public get programaId(): string { return this._programaId; }
    public get asignaturaId(): number { return this._asignaturaId; }
    public get grupo(): string { return this._grupo; }
    public get cupoDisponible(): number { return this._cupoDisponible; }
    public get fechaCreacion(): Date { return this._fechaCreacion; }
    public get fechaActualizacion(): Date { return this._fechaActualizacion; }
}