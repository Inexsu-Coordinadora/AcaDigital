import { Asignatura } from '../../../dominio/entidades/asignatura/Asignatura.js';
export class AsignaturaRepositorioInMemory {
    asignaturas;
    constructor() {
        this.asignaturas = new Map();
    }
    /**
     * Guarda una Asignatura.
     * @param asignatura
     * @returns
     */
    async guardar(asignatura) {
        let id = asignatura.id;
        // If id is 0 (not set by caller), assign a new incremental id
        if (id === undefined || id === null) {
            throw new Error('La asignatura debe tener un ID para ser guardada.');
        }
        if (id === 0) {
            // compute next id
            const existingIds = Array.from(this.asignaturas.keys());
            const nextId = existingIds.length === 0 ? 1 : Math.max(...existingIds) + 1;
            // create a new Asignatura instance with the assigned id
            const nueva = new Asignatura(asignatura.nombre, asignatura.cargaHoraria, asignatura.tipo, nextId, asignatura.fechaCreacion, asignatura.fechaActualizacion);
            this.asignaturas.set(nextId, nueva);
            return nueva;
        }
        this.asignaturas.set(id, asignatura);
        return asignatura;
    }
    /**
     * Obtiene una Asignatura por su ID.
     * @param id
     * @returns
     */
    async obtenerPorId(id) {
        return this.asignaturas.get(id) || null;
    }
    ;
    // Metodos stubs para completar la interfaz que no son necesarios para este test
    async obtenerTodos() {
        return Array.from(this.asignaturas.values());
    }
    ;
    async eliminar(id) {
        this.asignaturas.delete(id);
    }
    ;
    async obtenerPorNombre(nombre) {
        for (const asignatura of this.asignaturas.values()) {
            if (asignatura.nombre === nombre) {
                return asignatura;
            }
        }
        return null;
    }
    ;
}
;
//# sourceMappingURL=AsignaturaRepositorioInMemory.js.map