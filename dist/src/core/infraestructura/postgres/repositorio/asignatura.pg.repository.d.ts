import type { IAsignaturaRepositorio } from '../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js';
import type { IAsignatura } from '../../../dominio/interfaces/IAsignatura.js';
export declare class AsignaturaPGRepository implements IAsignaturaRepositorio {
    private mapearFilaAAsignatura;
    guardar(asignatura: IAsignatura): Promise<IAsignatura>;
    obtenerPorId(id: number): Promise<IAsignatura | null>;
    obtenerTodos(): Promise<IAsignatura[]>;
    eliminar(id: number): Promise<void>;
    obtenerPorNombre(nombre: string): Promise<IAsignatura | null>;
}
//# sourceMappingURL=asignatura.pg.repository.d.ts.map