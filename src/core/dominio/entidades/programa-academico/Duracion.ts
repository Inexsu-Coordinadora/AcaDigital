export const UNIDADES_DURACION_VALIDAS = ['meses', 'años', 'semestres', 'trimestres'] as const;
export type UnidadDuracion = typeof UNIDADES_DURACION_VALIDAS[number];

export class Duracion{
    private readonly _valor: number;
    private readonly _unidad: string;

    constructor(valor: number, unidad: string){
    if (valor <=0){
        throw new Error("El valor de la duración debe ser positivo");
    }
    if (!UNIDADES_DURACION_VALIDAS.includes(unidad as UnidadDuracion)) {
        throw new Error(`La unidad de duración debe ser una de: ${UNIDADES_DURACION_VALIDAS.join(', ')}`);
    }
    this._valor = valor;
    this._unidad = unidad;
    }

    public get valor(): number{
        return this._valor;
    }

    public get unidad(): string{
        return this._unidad;
    }

    toString(): string{
        return `${this.valor} ${this.unidad}`;
    }
}

