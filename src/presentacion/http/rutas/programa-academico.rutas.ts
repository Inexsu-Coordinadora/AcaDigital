import type { FastifyInstance, FastifySchema } from 'fastify';
import {
  CrearProgramaAcademicoUseCase,
  ListarProgramasAcademicosUseCase,
  ObtenerProgramaAcademicoPorIdUseCase,
  ActualizarProgramaAcademicoUseCase,
  EliminarProgramaAcademicoUseCase,
  type CrearProgramaDto,
  type ActualizarProgramaDto,

} from '../../../core/aplicaciones/programa-academico/index.js';

import {
  DefinirPlanEstudioUseCase,
  type DefinirPlanEstudioDTO
} from '../../../core/aplicaciones/plan-estudio/index.js';

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


  server.post('/', { schema: { body: crearProgramaBodySchema } }, async (request, reply) => {
    try {
      const dto = request.body as CrearProgramaDto;
      const nuevoPrograma = await crearProgramaUseCase.execute(dto);

      return reply.status(201).send({
        id: nuevoPrograma.id,  
        nombre: nuevoPrograma.nombre, 
        descripcion: nuevoPrograma.descripcion, 
        nivel: nuevoPrograma.nivelEducativo, 
        modalidad: nuevoPrograma.modalidad, 
        duracion: {
          valor: nuevoPrograma.duracion.valor, 
          unidad: nuevoPrograma.duracion.unidad 
        }
      });
    } catch (error: any) {
      return reply.status(400).send({ message: error.message });
    }
  });

  server.get('/', async (request, reply) => {
    try {
      const programas = await listarProgramasUseCase.execute();

      return reply.send(programas.map(p => ({
        id: p.id, 
        nombre: p.nombre,
        descripcion: p.descripcion, 
        nivel: p.nivelEducativo, 
        modalidad: p.modalidad, 
        duracion: {
          valor: p.duracion.valor, 
          unidad: p.duracion.unidad 
        }
      })));
    } catch (error: any) {
      return reply.status(500).send({ message: error.message });
    };
  });

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
        id: programa.id, 
        nombre: programa.nombre,
        descripcion: programa.descripcion, 
        nivel: programa.nivelEducativo, 
        modalidad: programa.modalidad, 
        duracion: {
          valor: programa.duracion.valor, 
          unidad: programa.duracion.unidad 
        }
      });
    } catch (error: any) {
      return reply.status(400).send({ message: error.message });
    };
  });

  server.put('/:id', { schema: { params: idParamSchema, body: actualizarProgramaBodySchema } }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const idLimpio = id?.trim();

      if (!idLimpio || idLimpio.length === 0) {
        return reply.status(400).send({ message: 'El ID es obligatorio' });
      };

      const dto = request.body as ActualizarProgramaDto;
      const programaActualizado = await actualizarProgramaUseCase.execute(idLimpio, dto);

      return reply.send({
        id: programaActualizado.id, 
        nombre: programaActualizado.nombre,
        descripcion: programaActualizado.descripcion, 
        nivel: programaActualizado.nivelEducativo, 
        modalidad: programaActualizado.modalidad, 
        duracion: {
          valor: programaActualizado.duracion.valor, 
          unidad: programaActualizado.duracion.unidad 
        }
      });
    } catch (error: any) {
      if (error.message.includes('no encontrado')) {
        return reply.status(404).send({ message: error.message });
      };
      return reply.status(400).send({ message: error.message });
    };
  });

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

const crearProgramaBodySchema = {
  type: 'object',
  required: ['nombre', 'descripcion', 'nivel', 'modalidad', 'duracionValor', 'duracionUnidad'],
  properties: {
    nombre: { type: 'string', minLength: 1 },
    descripcion: { type: 'string', minLength: 1 },
    nivel: { type: 'string', enum: ['Técnico', 'Pregrado', 'Posgrado', 'Doctorado'] },
    modalidad: { type: 'string', enum: ['Presencial', 'Virtual', 'Semi-Presencial'] },
    duracionValor: { type: 'number', minimum: 0.01 },
    duracionUnidad: { type: 'string', enum: ['meses', 'años', 'semestres', 'trimestres'] }
  },
  additionalProperties: false
};

const actualizarProgramaBodySchema = {
  type: 'object',
  required: ['nombre', 'descripcion'],
  properties: {
    nombre: { type: 'string', minLength: 1 },
    descripcion: { type: 'string', minLength: 1 }
  },
  additionalProperties: false
};

const idParamSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string', minLength: 1 }
  },
  additionalProperties: false
};