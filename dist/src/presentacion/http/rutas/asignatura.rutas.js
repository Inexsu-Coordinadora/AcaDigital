import { TipoAsignatura } from '../../../core/dominio/entidades/asignatura/Asignatura.js';
const TAG_ASIGNATURA = 'Asignaturas';
const EsquemaCuerpoAsignatura = {
    type: 'object',
    required: ['nombre', 'cargaHoraria', 'tipo'],
    properties: {
        nombre: { type: 'string', minLength: 3, description: 'Nombre de la asignatura (ej: Cálculo Diferencial).' },
        cargaHoraria: { type: 'number', minimum: 1, description: 'Número de horas académicas semanales.' },
        tipo: { type: 'string', enum: Object.values(TipoAsignatura), description: 'Tipo de asignatura (e.g., TEORICA, PRACTICA).' },
    },
};
const EsquemaRespuestaAsignatura = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        nombre: { type: 'string' },
        cargaHoraria: { type: 'number' },
        tipo: { type: 'string', enum: Object.values(TipoAsignatura) },
        fechaCreacion: { type: 'string', format: 'date-time' },
        fechaActualizacion: { type: 'string', format: 'date-time' },
    },
};
const EsquemaParametrosId = {
    type: 'object',
    properties: {
        id: { type: 'number', description: 'ID único de la asignatura.' }
    },
    required: ['id']
};
const manejarError = (error, respuesta) => {
    const mensaje = error?.message;
    if (typeof mensaje === 'string') {
        if (mensaje.startsWith('409')) {
            return respuesta.code(409).send({ error: mensaje.split(': ')[1]?.trim() || 'Conflicto de datos.' });
        }
        if (mensaje.startsWith('404')) {
            return respuesta.code(404).send({ error: mensaje.split(': ')[1]?.trim() || 'Recurso no encontrado.' });
        }
    }
    return respuesta.code(400).send({ error: mensaje || 'Error desconocido o validación de esquema fallida.' });
};
export default function rutasAsignatura(fastify, options, done) {
    const { crearAsignaturaUseCase, listarAsignaturasUseCase, obtenerAsignaturaPorIdUseCase, actualizarAsignaturaUseCase, eliminarAsignaturaUseCase } = options.dependencies;
    const prefijo = '/';
    fastify.post(prefijo, {
        schema: {
            tags: [TAG_ASIGNATURA],
            summary: 'Crear Asignatura',
            description: 'Registra una nueva asignatura en el sistema.',
            body: EsquemaCuerpoAsignatura,
            response: { 201: EsquemaRespuestaAsignatura }
        },
    }, async (peticion, respuesta) => {
        try {
            const nuevaAsignatura = await crearAsignaturaUseCase.execute(peticion.body);
            return respuesta.code(201).send(nuevaAsignatura);
        }
        catch (error) {
            return manejarError(error, respuesta);
        }
    });
    fastify.get(prefijo, {
        schema: {
            tags: [TAG_ASIGNATURA],
            summary: 'Listar Todas las Asignaturas',
            description: 'Obtiene un listado completo de todas las asignaturas registradas.',
            response: { 200: { type: 'array', items: EsquemaRespuestaAsignatura } }
        }
    }, async (_peticion, respuesta) => {
        const asignaturas = await listarAsignaturasUseCase.findAll();
        return respuesta.send(asignaturas);
    });
    fastify.get(prefijo + ':id', {
        schema: {
            tags: [TAG_ASIGNATURA],
            summary: 'Obtener Asignatura por ID',
            description: 'Busca y retorna una asignatura específica por su ID.',
            params: EsquemaParametrosId,
            response: {
                200: EsquemaRespuestaAsignatura,
                404: { type: 'object', properties: { error: { type: 'string', example: 'Asignatura con ID 10 no encontrada.' } } }
            }
        }
    }, async (peticion, respuesta) => {
        const asignatura = await obtenerAsignaturaPorIdUseCase.obtenerPorId(peticion.params.id);
        if (!asignatura) {
            return respuesta.code(404).send({ error: `Asignatura con ID ${peticion.params.id} no encontrada.` });
        }
        return respuesta.send(asignatura);
    });
    fastify.put(prefijo + ':id', {
        schema: {
            tags: [TAG_ASIGNATURA],
            summary: 'Actualizar Asignatura',
            description: 'Actualiza los datos de una asignatura existente.',
            params: EsquemaParametrosId,
            body: EsquemaCuerpoAsignatura,
            response: {
                200: EsquemaRespuestaAsignatura,
                404: { type: 'object' },
                409: { type: 'object' }
            }
        }
    }, async (peticion, respuesta) => {
        try {
            const id = peticion.params.id;
            const datosActualizacion = {
                id,
                ...peticion.body
            };
            const asignaturaActualizada = await actualizarAsignaturaUseCase.execute(datosActualizacion);
            return respuesta.send(asignaturaActualizada);
        }
        catch (error) {
            return manejarError(error, respuesta);
        }
    });
    fastify.delete(prefijo + ':id', {
        schema: {
            tags: [TAG_ASIGNATURA],
            summary: 'Eliminar Asignatura',
            description: 'Elimina una asignatura del sistema por su ID.',
            params: EsquemaParametrosId,
            response: {
                204: { type: 'null', description: 'Eliminación exitosa (sin contenido).' },
                404: { type: 'object' }
            }
        }
    }, async (peticion, respuesta) => {
        try {
            await eliminarAsignaturaUseCase.execute(peticion.params.id);
            return respuesta.code(204).send();
        }
        catch (error) {
            return manejarError(error, respuesta);
        }
    });
    done();
}
//# sourceMappingURL=asignatura.rutas.js.map