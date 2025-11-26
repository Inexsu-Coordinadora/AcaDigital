import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import {
  CrearProgramaAcademicoUseCase,
  ListarProgramasAcademicosUseCase,
  ObtenerProgramaAcademicoPorIdUseCase,
  ActualizarProgramaAcademicoUseCase,
  EliminarProgramaAcademicoUseCase,
} from '../../../core/aplicaciones/programa-academico/index.js';
import type { CrearProgramaDto } from '../../../core/aplicaciones/programa-academico/index.js';

interface ActualizarProgramaDto {
  nombre: string;
  descripcion: string;
}

interface ProgramaIdParams {
  programaId: string;
}

interface ProgramaRespuesta {
  id: string;
  nombre: string;
  descripcion: string;
  nivel: string;
  modalidad: string;
  duracionValor: number;
  duracionUnidad: string;
  createdAt: string;
  updatedAt: string;
}

interface ErrorRespuesta {
  codigo: string;
  mensaje: string;
}

const ProgramaIdParamsSchema = {
  type: 'object',
  properties: {
    programaId: { type: 'string', description: 'ID del programa académico' }
  },
  required: ['programaId'],
};

const ProgramaRespuestaSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    nombre: { type: 'string' },
    descripcion: { type: 'string' },
    nivel: { type: 'string' },
    modalidad: { type: 'string' },
    duracionValor: { type: 'number' },
    duracionUnidad: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
  },
};

const ErrorRespuestaSchema = {
  type: 'object',
  properties: {
    codigo: { type: 'string' },
    mensaje: { type: 'string' },
  },
  required: ['codigo', 'mensaje'],
};

interface ProgramaAcademicoDependencies {
  crearProgramaAcademicoUseCase: CrearProgramaAcademicoUseCase;
  listarProgramasAcademicosUseCase: ListarProgramasAcademicosUseCase;
  obtenerProgramaAcademicoUseCase: ObtenerProgramaAcademicoPorIdUseCase;
  actualizarProgramaAcademicoUseCase: ActualizarProgramaAcademicoUseCase;
  eliminarProgramaAcademicoUseCase: EliminarProgramaAcademicoUseCase;
}

export default async function rutasProgramaAcademico(
  instance: FastifyInstance,
  options: FastifyPluginOptions
) {

  const {
    crearProgramaAcademicoUseCase,
    listarProgramasAcademicosUseCase,
    obtenerProgramaAcademicoUseCase,
    actualizarProgramaAcademicoUseCase,
    eliminarProgramaAcademicoUseCase,
  } = options.dependencies as ProgramaAcademicoDependencies;

  const TAG = ['Programas Académicos'];

  instance.post('/', {
    schema: {
      tags: TAG,
      summary: 'Crear un nuevo Programa Academico',
      description: 'Registra un nuevo programa academico en el sistema.',
      body: {
        type: 'object',
        properties: {
          nombre: { type: 'string', description: 'Nombre del programa' },
          descripcion: { type: 'string', description: 'Descripción del programa' },
          nivel: { type: 'string', description: 'Nivel académico (ej: Pregrado, Posgrado)' },
          modalidad: { type: 'string', description: 'Modalidad (ej: Presencial, Virtual)' },
          duracionValor: { type: 'number', description: 'Valor numérico de la duración' },
          duracionUnidad: { type: 'string', description: 'Unidad de duración (ej: meses, semestres)' },
        },
        required: ['nombre', 'descripcion', 'nivel', 'modalidad', 'duracionValor', 'duracionUnidad'],
      },
      response: {
        201: {
          ...ProgramaRespuestaSchema,
          description: 'Programa Académico creado exitosamente.', 
        },
        400: {
          ...ErrorRespuestaSchema,
          description: 'Solicitud invalida (ej: datos de entrada faltantes o incorrectos).', 
        },
        409: {
          ...ErrorRespuestaSchema,
          description: 'Conflicto: Ya existe un programa con el mismo nombre.', 
        },
      },
    },
  }, async (request, reply) => {
    const programaCreado = await crearProgramaAcademicoUseCase.execute(request.body as CrearProgramaDto);
    return reply.code(201).send(programaCreado);
  });

  instance.get('/', {
    schema: {
      tags: TAG,
      summary: 'Listar todos los Programas Academicos',
      description: 'Obtiene un listado completo de todos los programas academicos registrados.',
      response: {
        200: {
          type: 'array',
          items: ProgramaRespuestaSchema,
          description: 'Listado de Programas Academico obtenido exitosamente.',
        },
        500: {
          ...ErrorRespuestaSchema,
          description: 'Error interno del servidor al obtener el listado.',
        },
      },
    },
  }, async (request, reply) => {
    const programas = await listarProgramasAcademicosUseCase.execute();
    return programas;
  });

  instance.get('/:programaId', {
    schema: {
      tags: TAG,
      summary: 'Obtener Programa Academico por ID',
      description: 'Busca y retorna un programa academico específico por su ID.',
      params: ProgramaIdParamsSchema,
      response: {
        200: {
          ...ProgramaRespuestaSchema,
          description: 'Programa Academico encontrado.',
        },
        404: {
          ...ErrorRespuestaSchema,
          description: 'No se encontro el programa academico con el ID especificado.',
        },
      },
    },
  }, async (request, reply) => {
    const { programaId } = request.params as ProgramaIdParams;
    const programa = await obtenerProgramaAcademicoUseCase.execute(programaId);
    return programa;
  });

  instance.put('/:programaId', {
    schema: {
      tags: TAG,
      summary: 'Actualizar un Programa Académico existente',
      description: 'Actualiza los datos de un programa academico existente.',
      params: ProgramaIdParamsSchema,
      body: {
        type: 'object',
        properties: {
          nombre: { type: 'string', description: 'Nuevo nombre del programa' },
          descripcion: { type: 'string', description: 'Nueva descripción del programa' },
        },
        required: ['nombre', 'descripcion'], 
      },
      response: {
        200: {
          ...ProgramaRespuestaSchema,
          description: 'Programa Academico actualizado exitosamente.', 
        },
        400: {
          ...ErrorRespuestaSchema,
          description: 'Solicitud invalida (ej: datos de actualización faltantes o incorrectos).', 
        },
        404: {
          ...ErrorRespuestaSchema,
          description: 'No se encontro el programa académico a actualizar.', 
        },
      },
    },
  }, async (request, reply) => {
    const { programaId } = request.params as ProgramaIdParams;
    const programaActualizado = await actualizarProgramaAcademicoUseCase.execute(
      programaId,
      request.body as ActualizarProgramaDto
    );
    return programaActualizado;
  });

  instance.delete('/:programaId', {
    schema: {
      tags: TAG,
      summary: 'Eliminar Programa Académico por ID',
      description: 'Elimina un programa academico del sistema por su ID.',
      params: ProgramaIdParamsSchema,
      response: {
        204: { type: 'null', description: 'Programa eliminado exitosamente' },
        404: {
          ...ErrorRespuestaSchema,
          description: 'No se encontró el programa académico a eliminar.',
        },
      },
    },
  }, async (request, reply) => {
    const { programaId } = request.params as ProgramaIdParams;
    await eliminarProgramaAcademicoUseCase.execute(programaId);
    return reply.code(204).send();
  });
}