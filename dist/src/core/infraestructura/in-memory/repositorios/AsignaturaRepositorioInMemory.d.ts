import type { IAsignaturaRepositorio } from '../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js';
import type { IAsignatura } from '../../../dominio/interfaces/IAsignatura.js';
export declare class AsignaturaRepositorioInMemory implements IAsignaturaRepositorio {
    private asignaturas;
    constructor();
    /**
     * Guarda una Asignatura.
     * @param asignatura
     * @returns
     */
    guardar(asignatura: IAsignatura): Promise<IAsignatura>;
    /**
     * Obtiene una Asignatura por su ID.
     * @param id
     * @returns
     */
    obtenerPorId(id: number): Promise<IAsignatura | null>;
    obtenerTodos(): Promise<IAsignatura[]>;
    eliminar(id: number): Promise<void>;
    obtenerPorNombre(nombre: string): Promise<IAsignatura | null>;
}
//# sourceMappingURL=AsignaturaRepositorioInMemory.d.ts.map