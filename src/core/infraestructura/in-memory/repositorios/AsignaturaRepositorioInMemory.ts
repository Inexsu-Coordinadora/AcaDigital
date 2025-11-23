import type { IAsignaturaRepositorio } from '../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js';
import type { IAsignatura } from '../../../dominio/interfaces/IAsignatura.js';
import { Asignatura } from '../../../dominio/entidades/asignatura/Asignatura.js';

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
            const nueva = new Asignatura(asignatura.nombre, asignatura.cargaHoraria, asignatura.tipo as any, nextId, asignatura.fechaCreacion, asignatura.fechaActualizacion);
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
        for (const asignatura of this.asignaturas.values()) {
            if (asignatura.nombre === nombre) {
                return asignatura;
            }
        }
        return null;
    };
};