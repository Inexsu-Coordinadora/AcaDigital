import type { FastifyInstance, FastifySchema } from 'fastify';
import {
  CrearProgramaAcademicoUseCase,
  ListarProgramasAcademicosUseCase,
  ObtenerProgramaAcademicoPorIdUseCase,
  ActualizarProgramaAcademicoUseCase,
  EliminarProgramaAcademicoUseCase,
  type CrearProgramaDto,
  type ActualizarProgramaDto,
  crearProgramaSchema,
  actualizarProgramaSchema
} from '../../../core/aplicaciones/programa-academico/index.js';

// Plan de estudio
import { 
  DefinirPlanEstudioUseCase,
  type DefinirPlanEstudioDTO
} from '../../../core/aplicaciones/plan-estudio/index.js';

// Schema body plan de estudio
const definicionPlanEstudioBodySchema = {
    type: 'object',
    required: ['asignaturaId', 'semestreNivel', 'creditosCarga'],
    properties: {
        asignaturaId: { type: 'integer', minimum: 1 },
        semestreNivel: { type: 'integer', minimum: 1 },
        creditosCarga: { type: 'number', minimum: 0.01 },
    },
    additionalProperties: false
};

// Schema idparams plan de estudio
const programaIdParamSchema = {
type: 'object',
    required: ['programaId'],
    properties: {
        programaId: { 
            type: 'string', 
            format: 'uuid',
            description: 'El ID unico del programa academico.'
        }
    },
    additionalProperties: false
};

const DefinicionPlanEstudioRouteSchema: FastifySchema = {
    params: programaIdParamSchema,
    body: definicionPlanEstudioBodySchema,
};

export function registerProgramaAcademicoRoutes(
  server: FastifyInstance,
  crearProgramaUseCase: CrearProgramaAcademicoUseCase,
  listarProgramasUseCase: ListarProgramasAcademicosUseCase,
  obtenerProgramaPorIdUseCase: ObtenerProgramaAcademicoPorIdUseCase,
  actualizarProgramaUseCase: ActualizarProgramaAcademicoUseCase,
  eliminarProgramaUseCase: EliminarProgramaAcademicoUseCase,

  definirPlanEstudioUseCase: DefinirPlanEstudioUseCase
) {
// plan de estudio
  server.post('/:programaId/plan-estudio', {
        schema: DefinicionPlanEstudioRouteSchema 
    }, async (request, reply) => {
        const { programaId } = request.params as { programaId: string };
        const { asignaturaId, semestreNivel, creditosCarga } = request.body as {
            asignaturaId: number,
            semestreNivel: number,
            creditosCarga: number
        };
        try {
            const dto: DefinirPlanEstudioDTO = {
                programaId,
                asignaturaId,
                semestreNivel,
                creditosCarga
            };
            const nuevoVinculo = await definirPlanEstudioUseCase.ejecutar(dto);
            return reply.code(201).send(nuevoVinculo);
        } catch (error: any) {            
            if (error.message.includes('no encontrado') || error.message.includes('inexistente')) {
                return reply.code(404).send({ message: error.message });
            };
            if (error.message.includes('ya está registrada')) {
                return reply.code(409).send({ message: error.message });
            };
            return reply.code(400).send({ message: error.message }); 
        };
    });

  // programa academico

  // Crear programa academico (Ruta: /api/v1/programas-academicos)
  server.post('/', async (request, reply) => {
    try {
      const validacion = crearProgramaSchema.safeParse(request.body);
      if (!validacion.success) {
        return reply.status(400).send({
          message: 'Error de validación',
          errors: validacion.error.issues.map((err: any) => ({
            campo: err.path.join('.'),
            mensaje: err.message
          }))
        });
      };

      const dto = validacion.data as CrearProgramaDto;
      const nuevoPrograma = await crearProgramaUseCase.execute(dto);
      return reply.status(201).send({
        id: nuevoPrograma.getId(),
        nombre: nuevoPrograma.getNombre(),
        descripcion: nuevoPrograma.getDescripcion(),
        nivel: nuevoPrograma.getNivelEducativo(),
        modalidad: nuevoPrograma.getModalidad(),
        duracion: {
          valor: nuevoPrograma.getDuracion().getValor(),
          unidad: nuevoPrograma.getDuracion().getUnidad()
        }
      });
    } catch (error: any) {
      return reply.status(400).send({ message: error.message });
    };
  });

  // Listar todos los programas academicos (Ruta: /api/v1/programas-academicos)
  server.get('/', async (request, reply) => {
    try {
      const programas = await listarProgramasUseCase.execute();
      return reply.send(programas.map(p => ({
        id: p.getId(),
        nombre: p.getNombre(),
        descripcion: p.getDescripcion(),
        nivel: p.getNivelEducativo(),
        modalidad: p.getModalidad(),
        duracion: {
          valor: p.getDuracion().getValor(),
          unidad: p.getDuracion().getUnidad()
        }
      })));
    } catch (error: any) {
      return reply.status(500).send({ message: error.message });
    };
  });

  // Obtener programa academico por ID (Ruta: /api/v1/programas-academicos/:id)
  server.get('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const idLimpio = id?.trim();

      if (!idLimpio || idLimpio.length === 0) {
        return reply.status(400).send({ message: 'El ID es obligatorio' });
      };

      const programa = await obtenerProgramaPorIdUseCase.execute(idLimpio);
      if (!programa) {
        return reply.status(404).send({
          message: 'Programa no encontrado',
          idBuscado: idLimpio
        });
      };

      return reply.send({
        id: programa.getId(),
        nombre: programa.getNombre(),
        descripcion: programa.getDescripcion(),
        nivel: programa.getNivelEducativo(),
        modalidad: programa.getModalidad(),
        duracion: {
          valor: programa.getDuracion().getValor(),
          unidad: programa.getDuracion().getUnidad()
        }
      });
    } catch (error: any) {
      return reply.status(400).send({ message: error.message });
    };
  });

  // Actualizar programa academico (Ruta: /api/v1/programas-academicos/:id)
  server.put('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const idLimpio = id?.trim();

      if (!idLimpio || idLimpio.length === 0) {
        return reply.status(400).send({ message: 'El ID es obligatorio' });
      };

      // Validar el body con Zod
      const validacion = actualizarProgramaSchema.safeParse(request.body);
      if (!validacion.success) {
        return reply.status(400).send({
          message: 'Error de validación',
          errors: validacion.error.issues.map((err: any) => ({
            campo: err.path.join('.'),
            mensaje: err.message
          }))
        });
      };

      const dto = validacion.data as ActualizarProgramaDto;
      const programaActualizado = await actualizarProgramaUseCase.execute(idLimpio, dto);

      return reply.send({
        id: programaActualizado.getId(),
        nombre: programaActualizado.getNombre(),
        descripcion: programaActualizado.getDescripcion(),
        nivel: programaActualizado.getNivelEducativo(),
        modalidad: programaActualizado.getModalidad(),
        duracion: {
          valor: programaActualizado.getDuracion().getValor(),
          unidad: programaActualizado.getDuracion().getUnidad()
        }
      });
    } catch (error: any) {
      if (error.message.includes('no encontrado')) {
        return reply.status(404).send({ message: error.message });
      };
      return reply.status(400).send({ message: error.message });
    };
  });

  // Eliminar programa academico (Ruta: /api/v1/programas-academicos/:id)
  server.delete('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const idLimpio = id?.trim();

      if (!idLimpio || idLimpio.length === 0) {
        return reply.status(400).send({ message: 'El ID es obligatorio' });
      };

      await eliminarProgramaUseCase.execute(idLimpio);
      return reply.status(204).send(); 
    } catch (error: any) {
      if (error.message.includes('no encontrado')) {
        return reply.status(404).send({ message: error.message });
      };
      return reply.status(400).send({ message: error.message });
    };
  });
};