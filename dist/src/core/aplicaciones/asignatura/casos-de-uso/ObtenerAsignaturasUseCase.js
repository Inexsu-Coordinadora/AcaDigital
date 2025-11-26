export class ObtenerAsignaturasUseCase {
    repositorio;
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    async findAll() {
        return this.repositorio.obtenerTodos();
    }
}
//# sourceMappingURL=ObtenerAsignaturasUseCase.js.map