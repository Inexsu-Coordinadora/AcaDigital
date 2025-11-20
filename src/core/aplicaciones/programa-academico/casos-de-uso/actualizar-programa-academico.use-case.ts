import type { IProgramaAcademico } from '../../../dominio/interfaces/IProgramaAcademico.js';
import type { IProgramaAcademicoRepositorio } from '../../../dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js';
import type { ActualizarProgramaDto } from '../dtos/actualizar-programa.dto.js';

import { ErrorNoEncontrado } from '../../../errores/errorAplicacion.js';

export class ActualizarProgramaAcademicoUseCase {
  constructor(private readonly programaRepository: IProgramaAcademicoRepositorio) { }

  async execute(id: string, dto: ActualizarProgramaDto): Promise<IProgramaAcademico> {
    const programaExistente = await this.programaRepository.obtenerPorId(id);
    if (!programaExistente) {
      throw new ErrorNoEncontrado('Programa academico no encontrado.');
    };
    programaExistente.actualizarInfoGeneral(dto.nombre, dto.descripcion);
    return this.programaRepository.actualizar(id, programaExistente);
  };
};
