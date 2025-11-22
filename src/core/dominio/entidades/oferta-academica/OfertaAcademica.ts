export class OfertaAcademica {
    private _id: number;
    private _periodoId: string;
    private _programaId: string;
    private _asignaturaId: number;
    private _grupo: string;
    private _cupoDisponible: number;
    private _fechaCreacion: Date;
    private _fechaActualizacion: Date;

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