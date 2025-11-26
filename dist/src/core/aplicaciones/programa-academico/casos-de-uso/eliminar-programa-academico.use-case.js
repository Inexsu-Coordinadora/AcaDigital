import { ErrorNoEncontrado, ErrorValidacion } from '../../../errores/ErrorAplicacion.js';
export class EliminarProgramaAcademicoUseCase {
    programaRepository;
    constructor(programaRepository) {
        this.programaRepository = programaRepository;
    }
    async execute(id) {
        if (!id || id.trim().length === 0) {
            throw new ErrorValidacion('El ID del programa academico es obligatorio.');
        }
        ;
        const programaExistente = await this.programaRepository.obtenerPorId(id);
        if (!programaExistente) {
            throw new ErrorNoEncontrado('Programa academico no encontrado.');
        }
        ;
        await this.programaRepository.eliminar(id);
    }
    ;
}
;
//# sourceMappingURL=eliminar-programa-academico.use-case.js.map