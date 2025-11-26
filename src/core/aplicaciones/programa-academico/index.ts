// Casos de uso
export { CrearProgramaAcademicoUseCase } from './casos-de-uso/crear-programa-academico.use-case.js';
export { ListarProgramasAcademicosUseCase } from './casos-de-uso/listar-programas-academicos.use-case.js';
export { ObtenerProgramaAcademicoPorIdUseCase } from './casos-de-uso/obtener-programa-academico-por-id.use-case.js';
export { ActualizarProgramaAcademicoUseCase } from './casos-de-uso/actualizar-programa-academico.use-case.js';
export { EliminarProgramaAcademicoUseCase } from './casos-de-uso/eliminar-programa-academico.use-case.js';

// DTOs y Schemas
export type { default as CrearProgramaDto } from './dtos/crear-programa.dto.js'; 
export type { ActualizarProgramaDto } from './dtos/actualizar-programa.dto.js';