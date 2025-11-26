export class ProgramaAcademicoRepositorioInMemory {
    programas;
    constructor() {
        this.programas = new Map();
    }
    ;
    /**
     * Guarda un nuevo Programa Academico.
     * @param programa
     * @returns
     */
    async guardar(programa) {
        const id = programa.id;
        if (!id) {
            throw new Error('El programa academico debe tener un ID para ser creado.');
        }
        ;
        this.programas.set(id, programa);
        return programa;
    }
    ;
    // Compatibility alias: some tests / callers use crear(...) instead of guardar(...)
    async crear(programa) {
        return this.guardar(programa);
    }
    /**
     * Obtiene un Programa Academico por su ID.
     * @param id
     * @returns
     */
    async obtenerPorId(id) {
        return this.programas.get(id) || null;
    }
    // Metodos stubs para completar la interfaz que no son necesarios para este test
    async actualizar(id, programa) {
        throw new Error("Metodo no implementado.");
    }
    ;
    async eliminar(id) {
        this.programas.delete(id);
    }
    ;
    async obtenerTodos() {
        return Array.from(this.programas.values());
    }
    ;
    async obtenerPorNombre(nombre) {
        throw new Error("Metodo no implementado.");
    }
    ;
}
;
//# sourceMappingURL=ProgramaAcademicoRepositorioInMemory.js.map