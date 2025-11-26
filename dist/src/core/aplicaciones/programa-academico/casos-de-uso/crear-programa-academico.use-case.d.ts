import type { IProgramaAcademico } from '../../../dominio/interfaces/IProgramaAcademico.js';
import type { IProgramaAcademicoRepositorio } from '../../../dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js';
import type { CrearProgramaDto } from '../dtos/crear-programa.dto.js';
export declare class CrearProgramaAcademicoUseCase {
    private readonly programaRepository;
    constructor(programaRepository: IProgramaAcademicoRepositorio);
    execute(dto: CrearProgramaDto): Promise<IProgramaAcademico>;
}
//# sourceMappingURL=crear-programa-academico.use-case.d.ts.map