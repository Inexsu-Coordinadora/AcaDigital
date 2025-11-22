import type { IAsignaturaRepositorio } from '../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js';
import type { IAsignatura } from '../../../dominio/interfaces/IAsignatura.js';

export class AsignaturaRepositorioInMemory implements IAsignaturaRepositorio {
    private asignaturas: Map<number, IAsignatura>;

    constructor() {
        this.asignaturas = new Map<number, IAsignatura>();
    }
    /**
     * Guarda una Asignatura.
     * @param asignatura
     * @returns
     */
    async guardar(asignatura: IAsignatura): Promise<IAsignatura> {
        const id = asignatura.getId();
        if (id === undefined || id === null) {
            throw new Error('La asignatura debe tener un ID para ser guardada.');
        }

        this.asignaturas.set(id, asignatura);
        return asignatura;
    }

    /**
     * Obtiene una Asignatura por su ID.
     * @param id
     * @returns
     */
    async obtenerPorId(id: number): Promise<IAsignatura | null> {
        return this.asignaturas.get(id) || null;
    };

    // Metodos stubs para completar la interfaz que no son necesarios para este test
    async obtenerTodos(): Promise<IAsignatura[]> {
        return Array.from(this.asignaturas.values());
    };

    async eliminar(id: number): Promise<void> {
        this.asignaturas.delete(id);
    };

    async obtenerPorNombre(nombre: string): Promise<IAsignatura | null> {
        throw new Error("Metodo no implementado.");
    };
};