export var TipoAsignatura;
(function (TipoAsignatura) {
    TipoAsignatura["TEORICA"] = "teorica";
    TipoAsignatura["PRACTICA"] = "practica";
    TipoAsignatura["MIXTA"] = "mixta";
})(TipoAsignatura || (TipoAsignatura = {}));
export class Asignatura {
    _id;
    _nombre;
    _cargaHoraria;
    _tipo;
    _fechaCreacion;
    _fechaActualizacion;
    constructor(nombre, cargaHoraria, tipo, id, fechaCreacion, fechaActualizacion) {
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
    get id() { return this._id; }
    get nombre() { return this._nombre; }
    get cargaHoraria() { return this._cargaHoraria; }
    get tipo() { return this._tipo; }
    get fechaCreacion() { return this._fechaCreacion; }
    get fechaActualizacion() { return this._fechaActualizacion; }
    // Backwards-compatible method names expected by tests / older callers
    getId() { return this.id; }
    getNombre() { return this.nombre; }
    getCargaHoraria() { return this.cargaHoraria; }
    getTipo() { return this.tipo; }
    getFechaCreacion() { return this.fechaCreacion; }
    getFechaActualizacion() { return this.fechaActualizacion; }
    actualizarInformacion(nuevoNombre, nuevaCargaHoraria, nuevoTipo) {
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
//# sourceMappingURL=Asignatura.js.map