import { randomUUID } from "crypto";
export class ProgramaAcademico {
    _id;
    _nombre;
    _descripcion;
    _nivelEducativo;
    _modalidad;
    _duracion;
    constructor(nombre, descripcion, nivel, modalidad, duracion, id) {
        if (!nombre || nombre.trim().length === 0) {
            throw new Error('El nombre del programa académico es obligatorio.');
        }
        if (nombre.length > 255) {
            throw new Error('El nombre del programa académico no puede exceder 255 caracteres.');
        }
        if (!descripcion || descripcion.trim().length === 0) {
            throw new Error('La descripción del programa académico es obligatoria.');
        }
        this._id = id ?? this.generarId();
        this._nombre = nombre.trim();
        this._descripcion = descripcion.trim();
        this._nivelEducativo = nivel;
        this._modalidad = modalidad;
        this._duracion = duracion;
    }
    get id() { return this._id; }
    get nombre() { return this._nombre; }
    get descripcion() { return this._descripcion; }
    get nivelEducativo() { return this._nivelEducativo; }
    get modalidad() { return this._modalidad; }
    get duracion() { return this._duracion; }
    // Backwards-compatible method names expected by tests / older callers
    getId() { return this.id; }
    getNombre() { return this.nombre; }
    getDescripcion() { return this.descripcion; }
    getNivelEducativo() { return this.nivelEducativo; }
    getModalidad() { return this.modalidad; }
    getDuracion() { return this.duracion; }
    actualizarInfoGeneral(nuevoNombre, nuevaDescripcion) {
        if (!nuevoNombre || nuevoNombre.trim().length === 0) {
            throw new Error('El nuevo nombre del programa académico es obligatorio.');
        }
        if (!nuevaDescripcion || nuevaDescripcion.trim().length === 0) {
            throw new Error('La nueva descripción del programa académico es obligatoria.');
        }
        this._nombre = nuevoNombre;
        this._descripcion = nuevaDescripcion;
    }
    generarId() {
        return randomUUID();
    }
}
//# sourceMappingURL=ProgramaAcademico.js.map