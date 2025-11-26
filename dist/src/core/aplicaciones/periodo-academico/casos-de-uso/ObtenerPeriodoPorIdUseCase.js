export class ObtenerPeriodoPorIdUseCase {
    repositorio;
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    async ejecutar(id) {
        return await this.repositorio.obtenerPorId(id);
    }
    ;
}
;
//# sourceMappingURL=ObtenerPeriodoPorIdUseCase.js.map