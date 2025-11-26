import { Duracion } from '../../../dominio/entidades/programa-academico/Duracion.js';
import { ProgramaAcademico } from '../../../dominio/entidades/programa-academico/ProgramaAcademico.js';
export class CrearProgramaAcademicoUseCase {
    programaRepository;
    constructor(programaRepository) {
        this.programaRepository = programaRepository;
    }
    async execute(dto) {
        const existe = await this.programaRepository.obtenerPorNombre(dto.nombre);
        if (existe) {
            throw new Error('Ya existe un programa academico con ese nombre');
        }
        ;
        const duracion = new Duracion(dto.duracionValor, dto.duracionUnidad);
        const nuevoPrograma = new ProgramaAcademico(dto.nombre, dto.descripcion, dto.nivel, dto.modalidad, duracion);
        return this.programaRepository.guardar(nuevoPrograma);
    }
    ;
}
;
//# sourceMappingURL=crear-programa-academico.use-case.js.map