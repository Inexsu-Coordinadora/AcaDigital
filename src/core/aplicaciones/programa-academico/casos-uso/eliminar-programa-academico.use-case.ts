import type { IProgramaAcademicoRepositorio } from '../../../dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js';


import { ErrorNoEncontrado } from '../../../errores/errorAplicacion.js';
import { ErrorValidacion } from '../../../errores/errorAplicacion.js';

export class EliminarProgramaAcademicoUseCase {
  constructor(private readonly programaRepository: IProgramaAcademicoRepositorio) {}

  async execute(id: string): Promise<void> {
    if (!id || id.trim().length === 0) {
      throw new ErrorValidacion('El ID del programa academico es obligatorio.');
    };

    const programaExistente = await this.programaRepository.obtenerPorId(id);
    if (!programaExistente) {
      throw new ErrorNoEncontrado('Programa academico no encontrado.');
    };

    await this.programaRepository.eliminar(id);
  };
};

