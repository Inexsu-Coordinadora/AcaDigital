import { ErrorConflicto, ErrorNoEncontrado, ErrorReglaNegocio } from '../../../core/errores/ErrorAplicacion.js';
const TAG_PLAN = 'Plan de Estudio';
const EsquemaBodyDefinir = {
    type: 'object',
    required: ['asignaturaId', 'semestreNivel', 'creditosCarga'],
    properties: {
        asignaturaId: { type: 'integer', minimum: 1 },
        semestreNivel: { type: 'integer', minimum: 1 },
        creditosCarga: { type: 'number', minimum: 0.01 }
    },
    additionalProperties: false
};
const EsquemaParamsPrograma = {
    type: 'object',
    required: ['programaId'],
    properties: {
        programaId: { type: 'string', format: 'uuid' }
    },
    additionalProperties: false
};
const EsquemaRespuestaPlanItem = {
    type: 'object',
    properties: {
        programaId: { type: 'string', format: 'uuid' },
        asignaturaId: { type: 'number' },
        semestreNivel: { type: 'number' },
        creditosCarga: { type: 'number' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
    }
};
const EsquemaRespuestaPlanLista = {
    type: 'array',
    description: 'Lista de items del Plan de Estudio para el programa dado.',
    items: EsquemaRespuestaPlanItem
};
const EsquemaError = { type: 'object', properties: { error: { type: 'string' } } };
const manejarError = (error, reply) => {
    if (error instanceof ErrorConflicto) {
        return reply.code(409).send({ error: error.message });
    }
    if (error instanceof ErrorNoEncontrado) {
        return reply.code(404).send({ error: error.message });
    }
    if (error instanceof ErrorReglaNegocio) {
        return reply.code(400).send({ error: error.message });
    }
    const mensaje = error?.message || 'Error interno del servidor.';
    console.error('Error inesperado en ruta plan-estudio:', error);
    return reply.code(500).send({ error: 'Error interno del servidor: ' + mensaje });
};
export default function rutasPlanEstudio(fastify, options, done) {
    const { definirPlanEstudioUseCase, obtenerPlanesEstudioPorProgramaUseCase } = options.dependencies;
    const prefijoBase = '/:programaId/';
    fastify.get(`${prefijoBase}items`, {
        schema: {
            tags: [TAG_PLAN],
            summary: 'Obtener Plan de Estudio',
            description: 'Obtiene todos los items del plan de estudio (asignatura-programa) para un Programa Académico específico. Devuelve 404 si el programa no existe.',
            params: EsquemaParamsPrograma,
            response: {
                200: EsquemaRespuestaPlanLista,
                404: EsquemaError
            }
        }
    }, async (req, reply) => {
        try {
            const { programaId } = req.params;
            const items = await obtenerPlanesEstudioPorProgramaUseCase.ejecutar(programaId);
            return reply.code(200).send(items);
        }
        catch (err) {
            return manejarError(err, reply);
        }
    });
    fastify.post(`${prefijoBase}crear-plan`, {
        schema: {
            tags: [TAG_PLAN],
            summary: 'Crear Plan de Estudio',
            description: 'Crea un vínculo asignatura-programa. Esta es la ruta operacional que maneja éxito (201) y errores de negocio (400, 404, 409).',
            params: EsquemaParamsPrograma,
            body: EsquemaBodyDefinir,
            response: {
                201: EsquemaRespuestaPlanItem,
                400: EsquemaError,
                404: EsquemaError,
                409: EsquemaError
            }
        }
    }, async (req, reply) => {
        try {
            const dto = {
                programaId: req.params.programaId,
                asignaturaId: req.body.asignaturaId,
                semestreNivel: req.body.semestreNivel,
                creditosCarga: req.body.creditosCarga
            };
            const creado = await definirPlanEstudioUseCase.ejecutar(dto);
            return reply.code(201).send(creado);
        }
        catch (err) {
            return manejarError(err, reply);
        }
    });
    fastify.post(`${prefijoBase}error-duplicidad`, {
        schema: {
            tags: [TAG_PLAN],
            summary: 'Error: Duplicidad',
            description: 'Simulación del error cuando ya existe un plan de estudio con la misma clave única.',
            params: EsquemaParamsPrograma,
            body: EsquemaBodyDefinir,
            response: { 409: EsquemaError }
        },
    }, async (peticion, respuesta) => {
        return manejarError(new ErrorConflicto('Ya existe un plan de estudio con el mismo ProgramaId y AsignaturaId.'), respuesta);
    });
    fastify.post(`${prefijoBase}error-semestre-invalido`, {
        schema: {
            tags: [TAG_PLAN],
            summary: 'Error: Semestre Inválido',
            description: 'Simulación del error de regla de negocio cuando el semestre es cero o negativo.',
            params: EsquemaParamsPrograma,
            body: EsquemaBodyDefinir,
            response: { 400: EsquemaError }
        },
    }, async (peticion, respuesta) => {
        return manejarError(new ErrorReglaNegocio('El semestre/nivel debe ser un número entero positivo.'), respuesta);
    });
    fastify.post(`${prefijoBase}error-creditos-invalidos`, {
        schema: {
            tags: [TAG_PLAN],
            summary: 'Error: Creditos Invalidos',
            description: 'Simulación del error de regla de negocio cuando la carga de créditos es menor a 0.01.',
            params: EsquemaParamsPrograma,
            body: EsquemaBodyDefinir,
            response: { 400: EsquemaError }
        },
    }, async (peticion, respuesta) => {
        return manejarError(new ErrorReglaNegocio('La carga de créditos debe ser un número positivo (mínimo 0.01).'), respuesta);
    });
    fastify.post(`${prefijoBase}error-asignatura-no-encontrada`, {
        schema: {
            tags: [TAG_PLAN],
            summary: 'Error: Asignatura No Encontrada',
            description: 'Simulación del error de recurso no encontrado cuando la AsignaturaId no existe.',
            params: EsquemaParamsPrograma,
            body: EsquemaBodyDefinir,
            response: { 404: EsquemaError }
        },
    }, async (peticion, respuesta) => {
        return manejarError(new ErrorNoEncontrado(`Asignatura con ID ${peticion.body.asignaturaId} no encontrada.`), respuesta);
    });
    fastify.post(`${prefijoBase}error-programa-no-encontrado`, {
        schema: {
            tags: [TAG_PLAN],
            summary: 'Error: Programa No Encontrado',
            description: 'Simulación del error de recurso no encontrado cuando el ProgramaId no existe.',
            params: EsquemaParamsPrograma,
            body: EsquemaBodyDefinir,
            response: { 404: EsquemaError }
        },
    }, async (peticion, respuesta) => {
        return manejarError(new ErrorNoEncontrado(`Programa Académico con ID ${peticion.params.programaId} no encontrado.`), respuesta);
    });
    done();
}
//# sourceMappingURL=plan-estudio.rutas.js.map