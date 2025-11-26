import type { FastifyInstance } from 'fastify';
import { CrearAsignaturaUseCase, ObtenerAsignaturasUseCase, ObtenerAsignaturaPorIdUseCase, ActualizarAsignaturaUseCase, EliminarAsignaturaUseCase } from '../../../core/aplicaciones/asignatura/index.js';
export default function rutasAsignatura(fastify: FastifyInstance, options: {
    dependencies: {
        crearAsignaturaUseCase: CrearAsignaturaUseCase;
        listarAsignaturasUseCase: ObtenerAsignaturasUseCase;
        obtenerAsignaturaPorIdUseCase: ObtenerAsignaturaPorIdUseCase;
        actualizarAsignaturaUseCase: ActualizarAsignaturaUseCase;
        eliminarAsignaturaUseCase: EliminarAsignaturaUseCase;
    };
}, done: () => void): void;
//# sourceMappingURL=asignatura.rutas.d.ts.map