import type { IProgramaAcademicoRepositorio } from '../../../dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js';
import type { IProgramaAcademico } from '../../../dominio/interfaces/IProgramaAcademico.js';

export class ProgramaAcademicoRepositorioInMemory implements IProgramaAcademicoRepositorio {
    private programas: Map<string, IProgramaAcademico>;

    constructor() {
        this.programas = new Map<string, IProgramaAcademico>();
    };

    /**
     * Guarda un nuevo Programa Academico.
     * @param programa
     * @returns
     */
    async crear(programa: IProgramaAcademico): Promise<IProgramaAcademico> {
        const id = programa.getId();
        if (!id) {
            throw new Error('El programa academico debe tener un ID para ser creado.');
        };
        this.programas.set(id, programa);
        return programa;
    };

    /**
     * Obtiene un Programa Academico por su ID.
     * @param id
     * @returns
     */
    async obtenerPorId(id: string): Promise<IProgramaAcademico | null> {
        return this.programas.get(id) || null;
    }

    // Metodos stubs para completar la interfaz que no son necesarios para este test
    async actualizar(id: string, programa: IProgramaAcademico): Promise<IProgramaAcademico> {
        throw new Error("Metodo no implementado.");
    };

    async eliminar(id: string): Promise<void> {
        this.programas.delete(id);
    };

    async obtenerTodos(): Promise<IProgramaAcademico[]> {
        return Array.from(this.programas.values());
    };

    async obtenerPorNombre(nombre: string): Promise<IProgramaAcademico | null> {
        throw new Error("Metodo no implementado.");
    };
};