import type { IProgramaAcademico, IProgramaAcademicoRepositorio } from '../../../dominio/index.js';
import type { ActualizarProgramaDto } from '../dto/actualizar-programa.dto.js';

export class ActualizarProgramaAcademicoUseCase {
  constructor(private readonly programaRepository: IProgramaAcademicoRepositorio) {}

  async execute(id: string, dto: ActualizarProgramaDto): Promise<IProgramaAcademico> {
    const programaExistente = await this.programaRepository.obtenerPorId(id);
    if (!programaExistente) {
      throw new Error('Programa académico no encontrado.');
    }
    programaExistente.actualizarInfoGeneral(dto.nombre, dto.descripcion);
    return this.programaRepository.actualizar(id, programaExistente);
  }
}

