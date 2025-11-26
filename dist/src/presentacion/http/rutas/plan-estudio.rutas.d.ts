import type { FastifyInstance } from 'fastify';
import type { DefinirPlanEstudioDTO } from '../../../core/aplicaciones/plan-estudio/dtos/DefinirPlanEstudioDTO.js';
export default function rutasPlanEstudio(fastify: FastifyInstance, options: {
    dependencies: {
        definirPlanEstudioUseCase: {
            ejecutar: (dto: DefinirPlanEstudioDTO) => Promise<any>;
        };
        obtenerPlanesEstudioPorProgramaUseCase: {
            ejecutar: (programaId: string) => Promise<any[]>;
        };
    };
}, done: () => void): void;
//# sourceMappingURL=plan-estudio.rutas.d.ts.map