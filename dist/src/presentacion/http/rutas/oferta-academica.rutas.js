import { ErrorConflicto, ErrorNoEncontrado, ErrorReglaNegocio } from '../../../core/errores/ErrorAplicacion.js';
const TAG_OFERTA = 'Ofertas Académicas';
const EsquemaCuerpoOferta = {
    type: 'object',
    required: ['periodoId', 'programaId', 'asignaturaId', 'grupo', 'cupoDisponible'],
    properties: {
        periodoId: { type: 'string', format: 'uuid', description: 'ID del período académico al que pertenece la oferta.' },
        programaId: { type: 'string', minLength: 1, description: 'ID del programa académico que ofrece la asignatura.' },
        asignaturaId: { type: 'number', minimum: 1, description: 'ID de la asignatura que se está ofertando.' },
        grupo: { type: 'string', pattern: '^[a-zA-Z0-9]{1,10}$', description: 'Identificador del grupo (ej: A, B, 101).' },
        cupoDisponible: { type: 'number', minimum: 1, description: 'Cantidad máxima de estudiantes permitidos.' },
    },
    additionalProperties: false,
};
const EsquemaRespuestaOferta = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        periodoId: { type: 'string' },
        programaId: { type: 'string' },
        asignaturaId: { type: 'number' },
        grupo: { type: 'string' },
        cupoDisponible: { type: 'number' },
        fechaCreacion: { type: 'string', format: 'date-time' },
        fechaActualizacion: { type: 'string', format: 'date-time' },
    },
};
const EsquemaRespuestaError = {
    type: 'object',
    properties: {
        error: { type: 'string', description: 'Mensaje de error descriptivo.' },
    },
};
const manejarError = (error, respuesta) => {
    if (error instanceof ErrorConflicto) {
        return respuesta.code(409).send({ error: error.message });
    }
    if (error instanceof ErrorNoEncontrado) {
        return respuesta.code(404).send({ error: error.message });
    }
    if (error instanceof ErrorReglaNegocio) {
        return respuesta.code(400).send({ error: error.message });
    }
    const mensaje = error?.message;
    if (typeof mensaje === 'string') {
        if (mensaje.startsWith('409'))
            return respuesta.code(409).send({ error: mensaje.split(': ')[1]?.trim() });
        if (mensaje.startsWith('404'))
            return respuesta.code(404).send({ error: mensaje.split(': ')[1]?.trim() });
        if (mensaje.startsWith('400'))
            return respuesta.code(400).send({ error: mensaje.split(': ')[1]?.trim() });
    }
    console.error('Error en ruta (no capturado):', error);
    return respuesta.code(500).send({ error: mensaje || 'Error interno del servidor.' });
};
export default function rutasOfertaAcademica(fastify, options, done) {
    const { ofertarAsignaturaUseCase } = options.dependencies;
    const prefijo = '/';
    fastify.post(`${prefijo}crear-oferta-exito`, {
        schema: {
            tags: [TAG_OFERTA],
            summary: 'Exito: Crear Oferta',
            description: 'Crea una nueva oferta académica para una asignatura específica en un período y programa dados. (Caso de Éxito)',
            body: EsquemaCuerpoOferta,
            response: { 201: EsquemaRespuestaOferta, 400: EsquemaRespuestaError, 404: EsquemaRespuestaError, 409: EsquemaRespuestaError }
        },
    }, async (peticion, respuesta) => {
        try {
            const nuevaOferta = await ofertarAsignaturaUseCase.ejecutar(peticion.body);
            return respuesta.code(201).send(nuevaOferta);
        }
        catch (error) {
            return manejarError(error, respuesta);
        }
    });
    fastify.post(`${prefijo}error-periodo-inactivo`, {
        schema: {
            tags: [TAG_OFERTA],
            summary: 'Error: Periodo Inactivo',
            description: 'Simula el error de regla de negocio cuando el período académico no está en estado "activo".',
            body: EsquemaCuerpoOferta,
            response: { 400: EsquemaRespuestaError }
        },
    }, async (peticion, respuesta) => {
        return manejarError(new ErrorReglaNegocio(`El periodo con ID ${peticion.body.periodoId} no esta activo para crear ofertas. Estado actual: cerrado.`), respuesta);
    });
    fastify.post(`${prefijo}error-asignatura-inexistente`, {
        schema: {
            tags: [TAG_OFERTA],
            summary: ' Error: Asignatura Inexistente',
            description: 'Simula el error de recurso no encontrado cuando la asignatura no existe.',
            body: EsquemaCuerpoOferta,
            response: { 404: EsquemaRespuestaError }
        },
    }, async (peticion, respuesta) => {
        return manejarError(new ErrorNoEncontrado(`Asignatura con ID ${peticion.body.asignaturaId} no encontrada.`), respuesta);
    });
    fastify.post(`${prefijo}error-cupo-invalido`, {
        schema: {
            tags: [TAG_OFERTA],
            summary: 'Error: Cupo Invalido',
            description: 'Simula el error de regla de negocio cuando el cupo disponible es menor a 1 (ej. 0 o negativo).',
            body: EsquemaCuerpoOferta,
            response: { 400: EsquemaRespuestaError }
        },
    }, async (peticion, respuesta) => {
        return manejarError(new ErrorReglaNegocio('El cupo disponible debe ser un número positivo mayor a 0.'), respuesta);
    });
    fastify.post(`${prefijo}error-duplicidad-grupo`, {
        schema: {
            tags: [TAG_OFERTA],
            summary: 'Error: Duplicidad de Grupo',
            description: 'Simula el error de conflicto cuando ya existe una oferta con la misma clave única (Periodo, Programa, Asignatura, Grupo).',
            body: EsquemaCuerpoOferta,
            response: { 409: EsquemaRespuestaError }
        },
    }, async (peticion, respuesta) => {
        return manejarError(new ErrorConflicto('Ya existe una oferta académica con estos mismos datos (Periodo, Programa, Asignatura, Grupo).'), respuesta);
    });
    done();
}
//# sourceMappingURL=oferta-academica.rutas.js.map