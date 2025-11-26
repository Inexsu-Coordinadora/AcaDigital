export class ObtenerPeriodosUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    async ejecutar(filtro) {
        return await this.repo.obtenerTodos(filtro);
    }
    ;
}
;
//# sourceMappingURL=ObtenerPeriodosUseCase.js.map