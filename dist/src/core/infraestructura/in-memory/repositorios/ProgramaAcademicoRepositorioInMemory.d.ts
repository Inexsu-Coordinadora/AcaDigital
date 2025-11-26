import type { IProgramaAcademicoRepositorio } from '../../../dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js';
import type { IProgramaAcademico } from '../../../dominio/interfaces/IProgramaAcademico.js';
export declare class ProgramaAcademicoRepositorioInMemory implements IProgramaAcademicoRepositorio {
    private programas;
    constructor();
    /**
     * Guarda un nuevo Programa Academico.
     * @param programa
     * @returns
     */
    guardar(programa: IProgramaAcademico): Promise<IProgramaAcademico>;
    crear(programa: IProgramaAcademico): Promise<IProgramaAcademico>;
    /**
     * Obtiene un Programa Academico por su ID.
     * @param id
     * @returns
     */
    obtenerPorId(id: string): Promise<IProgramaAcademico | null>;
    actualizar(id: string, programa: IProgramaAcademico): Promise<IProgramaAcademico>;
    eliminar(id: string): Promise<void>;
    obtenerTodos(): Promise<IProgramaAcademico[]>;
    obtenerPorNombre(nombre: string): Promise<IProgramaAcademico | null>;
}
//# sourceMappingURL=ProgramaAcademicoRepositorioInMemory.d.ts.map