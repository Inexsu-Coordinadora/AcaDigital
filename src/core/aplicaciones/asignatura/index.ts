export * from './casos-de-uso/CrearAsignaturaUseCase.js';
export * from './casos-de-uso/ObtenerAsignaturasUseCase.js';
export * from './casos-de-uso/ObtenerAsignaturaPorIdUseCase.js';
export * from './casos-de-uso/ActualizarAsignaturaUseCase.js';
export * from './casos-de-uso/EliminarAsignaturaUseCase.js';

import type { CrearAsignaturaDTO } from './dtos/CrearAsignaturaDTO.js';
import type { ActualizarAsignaturaDTO } from './dtos/ActualizarAsignaturaDTO.js';

export type { CrearAsignaturaDTO, ActualizarAsignaturaDTO };