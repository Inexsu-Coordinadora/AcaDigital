import type { IAsignatura } from "../../interfaces/IAsignatura.js";

export enum TipoAsignatura {
    TEORICA = "teorica",
    PRACTICA = "practica",
    MIXTA = "mixta",
}

export class Asignatura {
private readonly _id: number; 
    private _nombre: string; 
    private _cargaHoraria: number; 
    private _tipo: TipoAsignatura; 
    private readonly _fechaCreacion: Date; 
    private _fechaActualizacion: Date;

    constructor(
        nombre: string,
        cargaHoraria: number,
        tipo: TipoAsignatura,
        id?: number,
        fechaCreacion?: Date,
        fechaActualizacion?: Date,
    ) {
        if (!nombre || nombre.trim().length < 3) {
            throw new Error('El nombre de la asignatura debe tener al menos 3 caracteres.');
        }
        if (cargaHoraria <= 0) {
            throw new Error('La carga horaria debe ser un valor positivo (AC3).');
        }
        
        this._id = id || 0;
        this._nombre = nombre.trim();
        this._cargaHoraria = cargaHoraria;
        this._tipo = tipo;
        this._fechaCreacion = fechaCreacion || new Date();
        this._fechaActualizacion = fechaActualizacion || new Date();
    }

    public get id(): number { return this._id; }
    public get nombre(): string { return this._nombre; }
    public get cargaHoraria(): number { return this._cargaHoraria; }
    public get tipo(): TipoAsignatura { return this._tipo; }
    public get fechaCreacion(): Date { return this._fechaCreacion; }
    public get fechaActualizacion(): Date { return this._fechaActualizacion; }

    public actualizarInformacion(
        nuevoNombre: string,
        nuevaCargaHoraria: number,
        nuevoTipo: TipoAsignatura
    ): void {
        if (!nuevoNombre || nuevoNombre.trim().length < 3) {
            throw new Error('El nuevo nombre de la asignatura es obligatorio.');
        }
        if (nuevaCargaHoraria <= 0) {
            throw new Error('La nueva carga horaria debe ser un valor positivo.');
        }

        this._nombre = nuevoNombre.trim();
        this._cargaHoraria = nuevaCargaHoraria;
        this._tipo = nuevoTipo;
        this._fechaActualizacion = new Date();
    }
}