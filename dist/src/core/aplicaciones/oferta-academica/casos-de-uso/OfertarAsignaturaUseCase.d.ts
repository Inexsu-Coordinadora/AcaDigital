import { OfertarAsignaturaDTO } from '../dtos/OfertarAsignaturaDTO.js';
import type { IOfertaAcademica, IOfertaAcademicaRepositorio } from '../../../dominio/interfaces/IOfertaAcademica.js';
import type { IPeriodoRepositorio } from '../../../dominio/interfaces/repositorio/IPeriodoAcademicoRepositorio.js';
import type { IProgramaAcademicoRepositorio } from '../../../dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js';
import type { IAsignaturaRepositorio } from '../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js';
export declare class OfertarAsignaturaUseCase {
    private readonly ofertaRepositorio;
    private readonly periodoRepositorio;
    private readonly programaRepositorio;
    private readonly asignaturaRepositorio;
    constructor(ofertaRepositorio: IOfertaAcademicaRepositorio, periodoRepositorio: IPeriodoRepositorio, programaRepositorio: IProgramaAcademicoRepositorio, asignaturaRepositorio: IAsignaturaRepositorio);
    ejecutar(dto: OfertarAsignaturaDTO): Promise<IOfertaAcademica>;
}
//# sourceMappingURL=OfertarAsignaturaUseCase.d.ts.map