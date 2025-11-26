import type { IProgramaAcademicoRepositorio } from '../../../dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js';
import type { IProgramaAcademico } from '../../../dominio/interfaces/IProgramaAcademico.js';
export declare class PostgresProgramaAcademicoRepository implements IProgramaAcademicoRepositorio {
    guardar(programa: IProgramaAcademico): Promise<IProgramaAcademico>;
    obtenerPorId(id: string): Promise<IProgramaAcademico | null>;
    obtenerPorNombre(nombre: string): Promise<IProgramaAcademico | null>;
    obtenerTodos(): Promise<IProgramaAcademico[]>;
    actualizar(id: string, programa: IProgramaAcademico): Promise<IProgramaAcademico>;
    eliminar(id: string): Promise<void>;
    private mapRowToProgramaAcademico;
}
//# sourceMappingURL=programa-academico.pg.repository.d.ts.map