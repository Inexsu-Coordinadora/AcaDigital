import type { FastifyInstance } from 'fastify';
import type { CrearPeriodoUseCase, ObtenerPeriodosUseCase, ObtenerPeriodoPorIdUseCase, ActualizarPeriodoUseCase, EliminarPeriodoUseCase } from '../../../core/aplicaciones/periodo-academico/index.js';
export declare function registerPeriodoAcademicoRoutes(server: FastifyInstance, crear: CrearPeriodoUseCase, listar: ObtenerPeriodosUseCase, obtenerPorId: ObtenerPeriodoPorIdUseCase, actualizar: ActualizarPeriodoUseCase, eliminar: EliminarPeriodoUseCase): void;
//# sourceMappingURL=periodo-academico.rutas.d.ts.map