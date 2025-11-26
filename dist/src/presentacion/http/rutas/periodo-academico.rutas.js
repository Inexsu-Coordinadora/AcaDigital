const PeriodoAcademicoResponseModel = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid', description: 'Identificador único del período' },
        nombre: { type: 'string', description: 'Nombre descriptivo (ej. 2024-1)' },
        fechaInicio: { type: 'string', format: 'date', description: 'Fecha de inicio del período (YYYY-MM-DD)' },
        fechaFin: { type: 'string', format: 'date', description: 'Fecha de fin del período (YYYY-MM-DD)' },
        estado: { type: 'string', enum: ['pendiente', 'activo', 'finalizado'], description: 'Estado actual del período' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'nombre', 'fechaInicio', 'fechaFin', 'estado']
};
const PeriodoAcademicoBodyModel = {
    type: 'object',
    properties: {
        nombre: { type: 'string', pattern: '^[0-9]{4}-[IVX]+$', description: 'Nombre del período (ej. 2025-1)' },
        fechaInicio: { type: 'string', format: 'date', description: 'Fecha de inicio (ej. 2025-01-15)' },
        fechaFin: { type: 'string', format: 'date', description: 'Fecha de fin (ej. 2025-06-30)' },
    },
    required: ['nombre', 'fechaInicio', 'fechaFin'],
    additionalProperties: false
};
const PeriodoAcademicoUpdateModel = {
    type: 'object',
    properties: {
        nombre: { type: 'string', description: 'Nuevo nombre' },
        fechaInicio: { type: 'string', format: 'date', description: 'Nueva fecha de inicio' },
        fechaFin: { type: 'string', format: 'date', description: 'Nueva fecha de fin' },
        estado: { type: 'string', enum: ['pendiente', 'activo', 'finalizado'], description: 'Nuevo estado' }
    },
    additionalProperties: false
};
const ErrorResponse = {
    type: 'object',
    properties: {
        message: { type: 'string', description: 'Mensaje de error descriptivo' }
    }
};
export function registerPeriodoAcademicoRoutes(server, crear, listar, obtenerPorId, actualizar, eliminar) {
    const TAG = ['Período Académico'];
    server.post('/', {
        schema: {
            tags: TAG,
            summary: 'Crear Periodo',
            description: 'Registra un nuevo período académico con nombre, fecha de inicio y fecha de fin.',
            body: PeriodoAcademicoBodyModel,
            response: {
                201: { description: 'Período creado exitosamente', ...PeriodoAcademicoResponseModel },
                400: { description: 'Error de validación (ej. fechas inválidas)', ...ErrorResponse },
                409: { description: 'Error de solapamiento de fechas con otro período existente', ...ErrorResponse }
            }
        }
    }, async (req, reply) => {
        try {
            const resultado = await crear.ejecutar(req.body);
            reply.code(201).send(resultado);
        }
        catch (error) {
            if (error.message.includes('solapamiento')) {
                return reply.code(409).send({ message: error.message });
            }
            reply.code(400).send({ message: error.message });
        }
    });
    server.get('/', {
        schema: {
            tags: TAG,
            summary: 'Listar Periodos',
            description: 'Obtiene una lista de todos los períodos académicos registrados. Permite filtrar por estado (opcional).',
            querystring: {
                type: 'object',
                properties: {
                    estado: { type: 'string', enum: ['pendiente', 'activo', 'finalizado'], description: 'Filtrar por estado' }
                }
            },
            response: {
                200: {
                    type: 'array',
                    items: PeriodoAcademicoResponseModel,
                    description: 'Lista de períodos.'
                }
            }
        }
    }, async (req, reply) => {
        const estado = req.query.estado;
        const filtro = estado ? { estado } : undefined;
        const resultado = await listar.ejecutar(filtro);
        reply.send(resultado);
    });
    server.get('/:id', {
        schema: {
            tags: TAG,
            summary: 'Listar Periodo por id',
            description: 'Obtiene los detalles de un período académico específico por su ID.',
            params: {
                type: 'object',
                properties: { id: { type: 'string', format: 'uuid', description: 'ID del período' } },
                required: ['id']
            },
            response: {
                200: { description: 'Período encontrado', ...PeriodoAcademicoResponseModel },
                404: { description: 'Período no encontrado', ...ErrorResponse }
            }
        }
    }, async (req, reply) => {
        try {
            const id = req.params.id;
            const resultado = await obtenerPorId.ejecutar(id);
            if (!resultado) {
                return reply.code(404).send({ message: 'Período no encontrado' });
            }
            reply.send(resultado);
        }
        catch (error) {
            reply.code(400).send({ message: error.message });
        }
    });
    server.put('/:id', {
        schema: {
            tags: TAG,
            summary: 'Actualizar Periodo',
            description: 'Actualiza el nombre, fechas y/o estado de un período académico existente.',
            params: {
                type: 'object',
                properties: { id: { type: 'string', format: 'uuid' } },
                required: ['id']
            },
            body: PeriodoAcademicoUpdateModel,
            response: {
                200: { description: 'Período actualizado exitosamente', ...PeriodoAcademicoResponseModel },
                400: { description: 'Error de validación (ej. fechas, o estados inválidos)', ...ErrorResponse },
                404: { description: 'Período no encontrado', ...ErrorResponse },
                409: { description: 'Error de solapamiento de fechas con otro período', ...ErrorResponse }
            }
        }
    }, async (req, reply) => {
        try {
            const id = req.params.id;
            const resultado = await actualizar.ejecutar(id, req.body);
            reply.send(resultado);
        }
        catch (error) {
            if (error.message.includes('no encontrado'))
                return reply.code(404).send({ message: error.message });
            if (error.message.includes('solapamiento'))
                return reply.code(409).send({ message: error.message });
            reply.code(400).send({ message: error.message });
        }
    });
    server.delete('/:id', {
        schema: {
            tags: TAG,
            summary: 'Eliminar: Periodos',
            description: 'Elimina un período académico por ID. Solo permite eliminar períodos en estado "pendiente" y sin ofertas asociadas.',
            params: {
                type: 'object',
                properties: { id: { type: 'string', format: 'uuid', description: 'ID del período a eliminar' } },
                required: ['id']
            },
            response: {
                204: { description: 'Período eliminado exitosamente (sin contenido)' },
                400: { description: 'Error de negocio (ej. no se puede eliminar un período activo o con ofertas)', ...ErrorResponse },
                404: { description: 'Período no encontrado', ...ErrorResponse }
            }
        }
    }, async (req, reply) => {
        try {
            await eliminar.ejecutar(req.params.id);
            reply.code(204).send();
        }
        catch (error) {
            if (error.message.includes('no encontrado'))
                return reply.code(404).send({ message: error.message });
            reply.code(400).send({ message: error.message });
        }
    });
    server.put('/:id/error-fecha-invalida', {
        schema: {
            tags: TAG,
            summary: 'Error: Fecha Invalida (Simulación)',
            description: 'Simula el error al intentar actualizar con fechas inconsistentes (fin < inicio).',
            params: {
                type: 'object',
                properties: { id: { type: 'string', format: 'uuid' } },
                required: ['id']
            },
            body: PeriodoAcademicoUpdateModel,
            response: {
                400: { description: 'Error: Las fechas son inconsistentes (fecha fin debe ser posterior a fecha inicio)', ...ErrorResponse }
            }
        }
    }, async (req, reply) => {
        reply.code(400).send({ message: 'Error: Las fechas son inconsistentes (fecha fin debe ser posterior a fecha inicio)' });
    });
    server.put('/:id/error-solapamiento', {
        schema: {
            tags: TAG,
            summary: 'Error: Solapamiento (Simulación)',
            description: 'Simula el error al intentar actualizar fechas que se solapan con otro período.',
            params: {
                type: 'object',
                properties: { id: { type: 'string', format: 'uuid' } },
                required: ['id']
            },
            body: PeriodoAcademicoUpdateModel,
            response: {
                409: { description: 'Error: El rango de fechas se solapa con otro período activo.', ...ErrorResponse }
            }
        }
    }, async (req, reply) => {
        reply.code(409).send({ message: 'Error: El rango de fechas se solapa con otro período activo.' });
    });
    server.put('/:id/error-transicion', {
        schema: {
            tags: TAG,
            summary: 'Error: Transicion de Estado (Simulación)',
            description: 'Simula el error al intentar realizar una transición de estado inválida (ej. de Finalizado a Activo).',
            params: {
                type: 'object',
                properties: { id: { type: 'string', format: 'uuid' } },
                required: ['id']
            },
            body: PeriodoAcademicoUpdateModel,
            response: {
                400: { description: 'Error: Transición de estado inválida.', ...ErrorResponse }
            }
        }
    }, async (req, reply) => {
        reply.code(400).send({ message: 'Error: Transición de estado inválida.' });
    });
}
//# sourceMappingURL=periodo-academico.rutas.js.map