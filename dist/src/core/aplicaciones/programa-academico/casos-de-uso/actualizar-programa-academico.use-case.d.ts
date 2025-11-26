import type { IProgramaAcademico } from '../../../dominio/interfaces/IProgramaAcademico.js';
import type { IProgramaAcademicoRepositorio } from '../../../dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js';
import type { ActualizarProgramaDto } from '../dtos/actualizar-programa.dto.js';
export declare class ActualizarProgramaAcademicoUseCase {
    private readonly programaRepository;
    constructor(programaRepository: IProgramaAcademicoRepositorio);
    execute(id: string, dto: ActualizarProgramaDto): Promise<IProgramaAcademico>;
}
//# sourceMappingURL=actualizar-programa-academico.use-case.d.ts.map