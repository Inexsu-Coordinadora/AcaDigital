import type { IProgramaAcademico } from '../../../dominio/interfaces/IProgramaAcademico.js';
import type { IProgramaAcademicoRepositorio } from '../../../dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js';
export declare class ObtenerProgramaAcademicoPorIdUseCase {
    private readonly programaRepository;
    constructor(programaRepository: IProgramaAcademicoRepositorio);
    execute(id: string): Promise<IProgramaAcademico | null>;
}
//# sourceMappingURL=obtener-programa-academico-por-id.use-case.d.ts.map