export class ListarProgramasAcademicosUseCase {
    programaRepository;
    constructor(programaRepository) {
        this.programaRepository = programaRepository;
    }
    async execute() {
        return this.programaRepository.obtenerTodos();
    }
}
//# sourceMappingURL=listar-programas-academicos.use-case.js.map