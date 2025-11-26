export const UNIDADES_DURACION_VALIDAS = ['meses', 'años', 'semestres', 'trimestres'];
export class Duracion {
    _valor;
    _unidad;
    constructor(valor, unidad) {
        if (valor <= 0) {
            throw new Error("El valor de la duracion debe ser positivo");
        }
        ;
        if (!UNIDADES_DURACION_VALIDAS.includes(unidad)) {
            // Use a plain ASCII message to match existing tests expectations
            throw new Error(`La unidad de duracion debe ser una de: ${UNIDADES_DURACION_VALIDAS.join(', ')}`);
        }
        this._valor = valor;
        this._unidad = unidad;
    }
    get valor() {
        return this._valor;
    }
    get unidad() {
        return this._unidad;
    }
    // Compatibility methods (older tests / callers expect getValor/getUnidad)
    getValor() { return this.valor; }
    getUnidad() { return this.unidad; }
    toString() {
        return `${this.valor} ${this.unidad}`;
    }
    ;
}
;
//# sourceMappingURL=Duracion.js.map