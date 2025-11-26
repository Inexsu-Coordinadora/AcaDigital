export declare const UNIDADES_DURACION_VALIDAS: readonly ["meses", "años", "semestres", "trimestres"];
export type UnidadDuracion = typeof UNIDADES_DURACION_VALIDAS[number];
export declare class Duracion {
    private readonly _valor;
    private readonly _unidad;
    constructor(valor: number, unidad: string);
    get valor(): number;
    get unidad(): string;
    getValor(): number;
    getUnidad(): string;
    toString(): string;
}
//# sourceMappingURL=Duracion.d.ts.map