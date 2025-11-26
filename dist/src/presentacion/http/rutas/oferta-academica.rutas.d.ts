import type { FastifyInstance } from 'fastify';
import type { OfertarAsignaturaUseCase } from '../../../core/aplicaciones/oferta-academica/casos-de-uso/OfertarAsignaturaUseCase.js';
export default function rutasOfertaAcademica(fastify: FastifyInstance, options: {
    dependencies: {
        ofertarAsignaturaUseCase: OfertarAsignaturaUseCase;
    };
}, done: () => void): void;
//# sourceMappingURL=oferta-academica.rutas.d.ts.map