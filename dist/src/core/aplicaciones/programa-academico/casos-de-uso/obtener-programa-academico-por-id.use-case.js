export class ObtenerProgramaAcademicoPorIdUseCase {
    programaRepository;
    constructor(programaRepository) {
        this.programaRepository = programaRepository;
    }
    async execute(id) {
        return this.programaRepository.obtenerPorId(id);
    }
}
//# sourceMappingURL=obtener-programa-academico-por-id.use-case.js.map