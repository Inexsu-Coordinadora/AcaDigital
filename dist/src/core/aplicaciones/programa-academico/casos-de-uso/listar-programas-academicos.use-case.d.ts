import type { IProgramaAcademico } from '../../../dominio/interfaces/IProgramaAcademico.js';
import type { IProgramaAcademicoRepositorio } from '../../../dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js';
export declare class ListarProgramasAcademicosUseCase {
    private readonly programaRepository;
    constructor(programaRepository: IProgramaAcademicoRepositorio);
    execute(): Promise<IProgramaAcademico[]>;
}
//# sourceMappingURL=listar-programas-academicos.use-case.d.ts.map