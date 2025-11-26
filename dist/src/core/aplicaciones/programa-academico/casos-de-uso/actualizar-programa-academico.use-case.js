export class ActualizarProgramaAcademicoUseCase {
    programaRepository;
    constructor(programaRepository) {
        this.programaRepository = programaRepository;
    }
    async execute(id, dto) {
        const programaExistente = await this.programaRepository.obtenerPorId(id);
        if (!programaExistente) {
            throw new Error('Programa academico no encontrado.');
        }
        ;
        if (dto.nombre !== programaExistente.nombre) {
            const conMismoNombre = await this.programaRepository.obtenerPorNombre(dto.nombre);
            if (conMismoNombre && conMismoNombre.id !== id) {
                throw new Error('Ya existe un programa academico con ese nombre.');
            }
            ;
        }
        ;
        programaExistente.actualizarInfoGeneral(dto.nombre, dto.descripcion);
        return this.programaRepository.guardar(programaExistente);
    }
    ;
}
;
//# sourceMappingURL=actualizar-programa-academico.use-case.js.map