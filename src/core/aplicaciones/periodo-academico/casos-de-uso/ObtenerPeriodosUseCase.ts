
import { EstadoPeriodo } from '../../../dominio/entidades/periodo-academico/EstadoPeriodo.js';
import type { IPeriodoAcademico } from '../../../dominio/interfaces/IPeriodoAcademico.js';
import type { IPeriodoRepositorio } from '../../../dominio/interfaces/repositorio/IPeriodoAcademicoRepositorio.js';

export class ObtenerPeriodosUseCase {
    constructor(private repo: IPeriodoRepositorio) { };
    async ejecutar(filtro?: { estado?: EstadoPeriodo }): Promise<IPeriodoAcademico[]> {
        return await this.repo.obtenerTodos(filtro);
    };
};