import type { IProgramaAcademico } from '../../../dominio/interfaces/IProgramaAcademico.js';
import type { IProgramaAcademicoRepositorio } from '../../../dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js';
import type { ActualizarProgramaDto } from '../dtos/actualizar-programa.dto.js';

export class ActualizarProgramaAcademicoUseCase {
  constructor(private readonly programaRepository: IProgramaAcademicoRepositorio) { }

  async execute(id: string, dto: ActualizarProgramaDto): Promise<IProgramaAcademico> {
    const programaExistente = await this.programaRepository.obtenerPorId(id);
    if (!programaExistente) {
      throw new Error('Programa academico no encontrado.');
    };

    if (dto.nombre !== programaExistente.getNombre()) {
      const conMismoNombre = await this.programaRepository.obtenerPorNombre(dto.nombre);
      if (conMismoNombre && conMismoNombre.getId() !== id) {
        throw new Error('Ya existe un programa academico con ese nombre.');
      };
    };

    programaExistente.actualizarInfoGeneral(
      dto.nombre,
      dto.descripcion,
    );
    return this.programaRepository.guardar(programaExistente);
  };
};

