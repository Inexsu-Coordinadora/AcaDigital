import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ErrorConflicto, ErrorNoEncontrado, ErrorReglaNegocio } from '../../../core/errores/errorAplicacion.js';
import type { CrearProgramaDto } from '../../../core/aplicaciones/programa-academico/dtos/crear-programa.dto.js';
import type { ActualizarProgramaDto } from '../../../core/aplicaciones/programa-academico/dtos/actualizar-programa.dto.js';

type IdRequest = FastifyRequest<{ Params: { id: string } }>;
type CrearRequest = FastifyRequest<{ Body: CrearProgramaDto }>;
type ActualizarRequest = FastifyRequest<{ Params: { id: string }; Body: ActualizarProgramaDto }>;

const TAG_PROGRAMA = 'Programa Académico';

const NIVELES_EDUCATIVOS = ['Técnico', 'Pregrado', 'Posgrado', 'Doctorado'];
const MODALIDADES = ['Presencial', 'Virtual', 'Semi-Presencial'];
const UNIDADES_DURACION = ['meses', 'años', 'semestres', 'trimestres'];

const EsquemaBodyCrear = {
    type: 'object',
    required: ['nombre', 'descripcion', 'nivel', 'modalidad', 'duracionValor', 'duracionUnidad'],
    properties: {
        nombre: { type: 'string', minLength: 1, maxLength: 255, description: 'Nombre del programa.' },
        descripcion: { type: 'string', minLength: 1, description: 'Descripción detallada del programa.' },
        nivel: { type: 'string', enum: NIVELES_EDUCATIVOS, description: 'Nivel educativo del programa (e.g., Pregrado).' },
        modalidad: { type: 'string', enum: MODALIDADES, description: 'Modalidad de impartición (e.g., Virtual).' },
        duracionValor: { type: 'integer', minimum: 1, description: 'Valor numérico de la duración.' },
        duracionUnidad: { type: 'string', enum: UNIDADES_DURACION, description: 'Unidad de medida de la duración (e.g., semestres).' }
    },
    additionalProperties: false
};

const EsquemaBodyActualizar = {
    type: 'object',
    properties: {
        nombre: { type: 'string', minLength: 1, maxLength: 255, description: 'Nuevo nombre del programa.' },
        descripcion: { type: 'string', minLength: 1, description: 'Nueva descripción del programa.' }
    },
    minProperties: 1, 
    additionalProperties: false
};

const EsquemaParamsId = {
    type: 'object',
    required: ['id'],
    properties: {
        id: { type: 'string', format: 'uuid' }
    },
    additionalProperties: false
};

const EsquemaRespuestaPrograma = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        nombre: { type: 'string' },
        descripcion: { type: 'string' },
        nivel: { type: 'string', enum: NIVELES_EDUCATIVOS },
        modalidad: { type: 'string', enum: MODALIDADES },
        duracionValor: { type: 'integer' },
        duracionUnidad: { type: 'string', enum: UNIDADES_DURACION },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
    }
};

const EsquemaRespuestaListar = {
    type: 'array',
    items: EsquemaRespuestaPrograma
};

const EsquemaError = { type: 'object', properties: { error: { type: 'string' } } };

const EsquemaRespuestaVacia = { type: 'object', properties: { message: { type: 'string' } } };

const manejarError = (error: unknown, reply: FastifyReply) => {
    if (error instanceof ErrorConflicto) {
        return reply.code(409).send({ error: error.message });
    }
    if (error instanceof ErrorNoEncontrado) {
        return reply.code(404).send({ error: error.message });
    }
    if (error instanceof ErrorReglaNegocio) { 
        return reply.code(400).send({ error: error.message });
    }

    const mensaje = (error as any)?.message || 'Error interno del servidor.';
    console.error('Error inesperado en ruta programa académico:', error);
    
    return reply.code(500).send({ error: 'Error interno del servidor: ' + mensaje });
};


export default function rutasProgramaAcademico(
    fastify: FastifyInstance,
    options: {
        dependencies: {
            crearProgramaAcademicoUseCase: { ejecutar: (dto: CrearProgramaDto) => Promise<any> };
            listarProgramasAcademicosUseCase: { ejecutar: () => Promise<any> };
            obtenerProgramaAcademicoUseCase: { ejecutar: (id: string) => Promise<any> };
            actualizarProgramaAcademicoUseCase: { ejecutar: (dto: ActualizarProgramaDto & { id: string }) => Promise<any> };
            eliminarProgramaAcademicoUseCase: { ejecutar: (id: string) => Promise<any> };
        };
    },
    done: () => void
) {
    const { 
        crearProgramaAcademicoUseCase, 
        listarProgramasAcademicosUseCase, 
        obtenerProgramaAcademicoUseCase, 
        actualizarProgramaAcademicoUseCase, 
        eliminarProgramaAcademicoUseCase 
    } = options.dependencies;
    
    const prefijo = '/'; 

    fastify.post(
        `${prefijo}`,
        {
            schema: {
                tags: [TAG_PROGRAMA],
                summary: 'Crear Programa Academico',
                description: 'Crea un nuevo programa académico. Maneja éxito (201) y errores (400, 409).',
                body: EsquemaBodyCrear,
                response: {
                    201: EsquemaRespuestaPrograma,
                    400: EsquemaError, 
                    409: EsquemaError  
                }
            }
        },
        async (req: CrearRequest, reply: FastifyReply) => {
            try {
                const creado = await crearProgramaAcademicoUseCase.ejecutar(req.body);
                return reply.code(201).send(creado);
            } catch (err) {
                return manejarError(err, reply);
            }
        }
    );
    
    fastify.get(
        `${prefijo}`,
        {
            schema: {
                tags: [TAG_PROGRAMA],
                summary: 'Listar todos los Programas Academicos',
                response: { 200: EsquemaRespuestaListar }
            }
        },
        async (req, reply) => {
            try {
                const lista = await listarProgramasAcademicosUseCase.ejecutar();
                return reply.code(200).send(lista);
            } catch (err) {
                return manejarError(err, reply);
            }
        }
    );

    fastify.get(
        `${prefijo}:id`,
        {
            schema: {
                tags: [TAG_PROGRAMA],
                summary: 'Obtener Programa Academico por id',
                params: EsquemaParamsId,
                response: {
                    200: EsquemaRespuestaPrograma,
                    404: EsquemaError 
                }
            }
        },
        async (req: IdRequest, reply: FastifyReply) => {
            try {
                const programa = await obtenerProgramaAcademicoUseCase.ejecutar(req.params.id);
                return reply.code(200).send(programa);
            } catch (err) {
                return manejarError(err, reply);
            }
        }
    );

    fastify.put(
        `${prefijo}:id`,
        {
            schema: {
                tags: [TAG_PROGRAMA],
                summary: 'Actualizar Programa Academico (Nombre y Descripción)',
                params: EsquemaParamsId,
                body: EsquemaBodyActualizar,
                response: {
                    200: EsquemaRespuestaPrograma,
                    400: EsquemaError, 
                    404: EsquemaError  
                }
            }
        },
        async (req: ActualizarRequest, reply: FastifyReply) => {
            try {
                const dto: ActualizarProgramaDto & { id: string } = { id: req.params.id, ...req.body };
                const actualizado = await actualizarProgramaAcademicoUseCase.ejecutar(dto);
                return reply.code(200).send(actualizado);
            } catch (err) {
                return manejarError(err, reply);
            }
        }
    );

    fastify.delete(
        `${prefijo}:id`,
        {
            schema: {
                tags: [TAG_PROGRAMA],
                summary: 'Eliminar Programa Academico',
                params: EsquemaParamsId,
                response: {
                    204: EsquemaRespuestaVacia,
                    404: EsquemaError 
                }
            }
        },
        async (req: IdRequest, reply: FastifyReply) => {
            try {
                await eliminarProgramaAcademicoUseCase.ejecutar(req.params.id);
                return reply.code(204).send(); 
            } catch (err) {
                return manejarError(err, reply);
            }
        }
    );

    done();
}