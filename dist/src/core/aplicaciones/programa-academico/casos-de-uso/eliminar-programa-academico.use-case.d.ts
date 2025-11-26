import type { IProgramaAcademicoRepositorio } from '../../../dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js';
export declare class EliminarProgramaAcademicoUseCase {
    private readonly programaRepository;
    constructor(programaRepository: IProgramaAcademicoRepositorio);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=eliminar-programa-academico.use-case.d.ts.map