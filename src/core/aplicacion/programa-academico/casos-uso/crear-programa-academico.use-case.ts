import type { IProgramaAcademico, IProgramaAcademicoRepositorio} from '../../../dominio/index.js';
import type { CrearProgramaDto } from '../dto/crear-programa.dto.js';
import { Duracion, ProgramaAcademico } from '../../../dominio/index.js';

export class CrearProgramaAcademicoUseCase {
  constructor(private readonly programaRepository: IProgramaAcademicoRepositorio) {}
  async execute(dto: CrearProgramaDto): Promise<IProgramaAcademico> {
    const duracion = new Duracion(dto.duracionValor, dto.duracionUnidad);  
    const nuevoPrograma = new ProgramaAcademico(
      dto.nombre,
      dto.descripcion,
      dto.nivel,
      dto.modalidad,
      duracion
    );
    const programaCreado = await this.programaRepository.crear(nuevoPrograma);

    return programaCreado;
  }
}

