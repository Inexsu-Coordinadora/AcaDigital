import fastify from 'fastify';
import { 
  CrearProgramaAcademicoUseCase, 
  ListarProgramasAcademicosUseCase, 
  ObtenerProgramaAcademicoPorIdUseCase, 
  ActualizarProgramaAcademicoUseCase, 
  EliminarProgramaAcademicoUseCase
} from '../../core/aplicacion/programa-academico/index.js';
import { PostgresProgramaAcademicoRepository } from '../../core/infraestructura/postgres/repositorio/postgres-programa-academico.repository.js';
import { registerProgramaAcademicoRoutes } from './routes/programa-academico.routes.js';

// --- Inyección de Dependencias Manual ---
// 1. Creamos la instancia del adaptador de infraestructura (repositorio)
const programaRepository = new PostgresProgramaAcademicoRepository();

// 2. Creamos las instancias de los casos de uso de la capa de aplicación,
//    inyectándoles el repositorio que necesitan.
const crearProgramaUseCase = new CrearProgramaAcademicoUseCase(programaRepository);
const listarProgramasUseCase = new ListarProgramasAcademicosUseCase(programaRepository);
const obtenerProgramaPorIdUseCase = new ObtenerProgramaAcademicoPorIdUseCase(programaRepository);
const actualizarProgramaUseCase = new ActualizarProgramaAcademicoUseCase(programaRepository);
const eliminarProgramaUseCase = new EliminarProgramaAcademicoUseCase(programaRepository);

// --- Servidor Fastify ---
export const server = fastify({ logger: true });

// --- Registrar Rutas ---
registerProgramaAcademicoRoutes(
  server,
  crearProgramaUseCase,
  listarProgramasUseCase,
  obtenerProgramaPorIdUseCase,
  actualizarProgramaUseCase,
  eliminarProgramaUseCase
);

// --- Iniciar el Servidor ---
export const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Servidor corriendo en http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

