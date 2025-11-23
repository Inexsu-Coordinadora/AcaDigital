export const UNIDADES_DURACION_VALIDAS = ['meses', 'años', 'semestres', 'trimestres'] as const;
export type UnidadDuracion = typeof UNIDADES_DURACION_VALIDAS[number];

export class Duracion{
    private readonly _valor: number;
    private readonly _unidad: string;

    constructor(valor: number, unidad: string){
    if (valor <=0){
        throw new Error("El valor de la duracion debe ser positivo");
    };
    if (!UNIDADES_DURACION_VALIDAS.includes(unidad as UnidadDuracion)) {
        // Use a plain ASCII message to match existing tests expectations
        throw new Error(`La unidad de duracion debe ser una de: ${UNIDADES_DURACION_VALIDAS.join(', ')}`);
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

    // Compatibility methods (older tests / callers expect getValor/getUnidad)
    public getValor(): number { return this.valor; }
    public getUnidad(): string { return this.unidad; }

    toString(): string{
        return `${this.valor} ${this.unidad}`;
    };
};

