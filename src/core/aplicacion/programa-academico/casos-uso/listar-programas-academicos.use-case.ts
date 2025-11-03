import type { IProgramaAcademico, IProgramaAcademicoRepositorio } from '../../../dominio/index.js';

export class ListarProgramasAcademicosUseCase {
  constructor(private readonly programaRepository: IProgramaAcademicoRepositorio) {}

  async execute(): Promise<IProgramaAcademico[]> {
    return this.programaRepository.obtenerTodos();
  }
}

