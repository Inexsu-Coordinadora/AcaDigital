import fastify from 'fastify';

import {
  CrearProgramaAcademicoUseCase,
  ListarProgramasAcademicosUseCase,
  ObtenerProgramaAcademicoPorIdUseCase,
  ActualizarProgramaAcademicoUseCase,
  EliminarProgramaAcademicoUseCase
} from '../../core/aplicaciones/programa-academico/index.js';
import { PostgresProgramaAcademicoRepository } from '../../core/infraestructrura/postgres/repositorio/postgres-programa-academico.repository.js';
import { registerProgramaAcademicoRoutes } from './routes/programa-academico.routes.js';

const programaRepository = new PostgresProgramaAcademicoRepository();

const crearProgramaUseCase = new CrearProgramaAcademicoUseCase(programaRepository);
const listarProgramasUseCase = new ListarProgramasAcademicosUseCase(programaRepository);
const obtenerProgramaPorIdUseCase = new ObtenerProgramaAcademicoPorIdUseCase(programaRepository);
const actualizarProgramaUseCase = new ActualizarProgramaAcademicoUseCase(programaRepository);
const eliminarProgramaUseCase = new EliminarProgramaAcademicoUseCase(programaRepository);

export const server = fastify({ logger: true });

registerProgramaAcademicoRoutes(
  server,
  crearProgramaUseCase,
  listarProgramasUseCase,
  obtenerProgramaPorIdUseCase,
  actualizarProgramaUseCase,
  eliminarProgramaUseCase
);

export const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Servidor corriendo en http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  };
};
