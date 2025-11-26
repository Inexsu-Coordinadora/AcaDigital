export class ObtenerAsignaturaPorIdUseCase {
    repositorio;
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    async obtenerPorId(id) {
        return this.repositorio.obtenerPorId(id);
    }
}
//# sourceMappingURL=ObtenerAsignaturaPorIdUseCase.js.map