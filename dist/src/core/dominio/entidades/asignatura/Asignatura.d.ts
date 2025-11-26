export declare enum TipoAsignatura {
    TEORICA = "teorica",
    PRACTICA = "practica",
    MIXTA = "mixta"
}
export declare class Asignatura {
    private readonly _id;
    private _nombre;
    private _cargaHoraria;
    private _tipo;
    private readonly _fechaCreacion;
    private _fechaActualizacion;
    constructor(nombre: string, cargaHoraria: number, tipo: TipoAsignatura, id?: number, fechaCreacion?: Date, fechaActualizacion?: Date);
    get id(): number;
    get nombre(): string;
    get cargaHoraria(): number;
    get tipo(): TipoAsignatura;
    get fechaCreacion(): Date;
    get fechaActualizacion(): Date;
    getId(): number;
    getNombre(): string;
    getCargaHoraria(): number;
    getTipo(): TipoAsignatura;
    getFechaCreacion(): Date;
    getFechaActualizacion(): Date;
    actualizarInformacion(nuevoNombre: string, nuevaCargaHoraria: number, nuevoTipo: TipoAsignatura): void;
}
//# sourceMappingURL=Asignatura.d.ts.map