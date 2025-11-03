import type { IProgramaAcademico, IProgramaAcademicoRepositorio } from '../../../dominio/index.js';

export class ObtenerProgramaAcademicoPorIdUseCase {
  constructor(private readonly programaRepository: IProgramaAcademicoRepositorio) {}

  async execute(id: string): Promise<IProgramaAcademico | null> {
    return this.programaRepository.obtenerPorId(id);
  }
}

