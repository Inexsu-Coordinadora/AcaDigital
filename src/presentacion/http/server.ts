import fastify from 'fastify';

//periodo academico
import {
  CrearPeriodoUseCase,
  ObtenerPeriodosUseCase,
  ObtenerPeriodoPorIdUseCase,
  ActualizarPeriodoUseCase,
  EliminarPeriodoUseCase
} from '../../core/aplicaciones/periodo-academico/index.js';
import { PostgresPeriodoAcademicoRepository } from '../../core/infraestructura/postgres/repositorio/periodo-academico.pg.repository.js';
import { registerPeriodoAcademicoRoutes } from './routes/periodo-academico.routes.js';

// --- Inyección de Dependencias Manual ---

const periodoRepository = new PostgresPeriodoAcademicoRepository();

const crearPeriodoUseCase = new CrearPeriodoUseCase(periodoRepository);
const listarPeriodosUseCase = new ObtenerPeriodosUseCase(periodoRepository);
const obtenerPeriodoPorIdUseCase = new ObtenerPeriodoPorIdUseCase(periodoRepository);
const actualizarPeriodoUseCase = new ActualizarPeriodoUseCase(periodoRepository);
const eliminarPeriodoUseCase = new EliminarPeriodoUseCase(periodoRepository);

// --- Servidor Fastify ---
export const server = fastify({ logger: true });

// --- Registrar Rutas ---
registerPeriodoAcademicoRoutes(
  server,
  crearPeriodoUseCase,
  listarPeriodosUseCase,
  obtenerPeriodoPorIdUseCase,
  actualizarPeriodoUseCase,
  eliminarPeriodoUseCase
);


// --- Iniciar el Servidor ---
export const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Servidor corriendo en http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  };
};

if (import.meta.main) {
  start();
};
