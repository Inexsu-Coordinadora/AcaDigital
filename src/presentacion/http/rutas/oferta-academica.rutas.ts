import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import type { OfertarAsignaturaDTO } from '../../../core/aplicaciones/oferta-academica/dtos/OfertarAsignaturaDTO.js';
import type { OfertarAsignaturaUseCase } from '../../../core/aplicaciones/oferta-academica/casos-de-uso/OfertarAsignaturaUseCase.js';

type CrearRequest = FastifyRequest<{ Body: OfertarAsignaturaDTO }>;

const EsquemaCuerpoOferta = {
    type: 'object',
    required: ['periodoId', 'programaId', 'asignaturaId', 'grupo', 'cupoDisponible'],
    properties: {
        periodoId: { type: 'string', format: 'uuid' }, 
        programaId: { type: 'string', minLength: 1 },
        asignaturaId: { type: 'number', minimum: 1 },
        grupo: { type: 'string', pattern: '^[a-zA-Z0-9]{1,10}$' },
        cupoDisponible: { type: 'number', minimum: 1 },
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

const manejarError = (error: unknown, respuesta: FastifyReply) => {
    const mensaje = (error as any)?.message;
    if (typeof mensaje === 'string') {
        if (mensaje.startsWith('409')) return respuesta.code(409).send({ error: mensaje.split(': ')[1]?.trim() });
        if (mensaje.startsWith('404')) return respuesta.code(404).send({ error: mensaje.split(': ')[1]?.trim() });
        if (mensaje.startsWith('400')) return respuesta.code(400).send({ error: mensaje.split(': ')[1]?.trim() }); 
    }
    console.error('Error en ruta:', error);
    return respuesta.code(400).send({ error: mensaje || 'Error desconocido o validación de esquema fallida.' });
};


export default function rutasOfertaAcademica(
    fastify: FastifyInstance,
    options: {
        dependencies: {
            ofertarAsignaturaUseCase: OfertarAsignaturaUseCase;
        };
    },
    done: () => void,
) {
    const { ofertarAsignaturaUseCase } = options.dependencies;
    const prefijo = '/';

    fastify.post(
        prefijo,
        {
            schema: { body: EsquemaCuerpoOferta, response: { 201: EsquemaRespuestaOferta }, tags: ['Ofertas Academicas'] },
        },
        async (peticion: CrearRequest, respuesta: FastifyReply) => {
            try {
                const nuevaOferta = await ofertarAsignaturaUseCase.ejecutar(peticion.body);
                return respuesta.code(201).send(nuevaOferta);
            } catch (error) {
                return manejarError(error, respuesta);
            }
        }
    );

    done();
}