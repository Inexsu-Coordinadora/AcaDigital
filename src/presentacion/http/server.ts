import fastify from 'fastify';
import { configuracion } from '../../core/config/index.js';
//periodo academico
import {
    CrearPeriodoUseCase,
    ObtenerPeriodosUseCase,
    ObtenerPeriodoPorIdUseCase,
    ActualizarPeriodoUseCase,
    EliminarPeriodoUseCase
} from '../../core/aplicaciones/periodo-academico/index.js';
import { PostgresPeriodoAcademicoRepository } from '../../core/infraestructura/postgres/repositorio/periodo-academico.pg.repository.js';
import { registerPeriodoAcademicoRoutes } from './rutas/periodo-academico.rutas.js';

//asignatura
import {
    CrearAsignaturaUseCase,
    ObtenerAsignaturasUseCase,
    ObtenerAsignaturaPorIdUseCase,
    ActualizarAsignaturaUseCase,
    EliminarAsignaturaUseCase
} from '../../core/aplicaciones/asignatura/index.js';
import { AsignaturaPGRepository } from '../../core/infraestructura/postgres/repositorio/asignatura.pg.repository.js';
import rutasAsignatura from './rutas/asignatura.rutas.js';

//programa academico
import {
    CrearProgramaAcademicoUseCase,
    ListarProgramasAcademicosUseCase,
    ObtenerProgramaAcademicoPorIdUseCase,
    ActualizarProgramaAcademicoUseCase,
    EliminarProgramaAcademicoUseCase
} from '../../core/aplicaciones/programa-academico/index.js';
import { PostgresProgramaAcademicoRepository } from '../../core/infraestructura/postgres/repositorio/postgres-programa-academico.pg.repository.js';
import { registerProgramaAcademicoRoutes } from './rutas/programa-academico.rutas.js';

//plan de estudio
import {
    DefinirPlanEstudioUseCase,
} from '../../core/aplicaciones/plan-estudio/index.js';
import { PlanEstudioPGRepository } from '../../core/infraestructura/postgres/repositorio/plan-estudio.pg.repository.js';

// Oferta Académica
import { OfertarAsignaturaUseCase } from '../../core/aplicaciones/oferta-academica/casos-de-uso/OfertarAsignaturaUseCase.js';
import { OfertaAcademicaPGRepositorio } from '../../core/infraestructura/postgres/repositorio/oferta-academica.pg.repositorio.js';
import rutasOfertaAcademica from './rutas/oferta-academica.rutas.js';

// errores
import { ErrorAplicacion, ErrorNoEncontrado, ErrorConflicto, ErrorReglaNegocio, ErrorValidacion } from '../../core/errores/errorAplicacion.js';


// --- Inyección de Dependencias Manual ---
const programaRepository = new PostgresProgramaAcademicoRepository();

const crearProgramaUseCase = new CrearProgramaAcademicoUseCase(programaRepository);
const listarProgramasUseCase = new ListarProgramasAcademicosUseCase(programaRepository);
const obtenerProgramaPorIdUseCase = new ObtenerProgramaAcademicoPorIdUseCase(programaRepository);
const actualizarProgramaUseCase = new ActualizarProgramaAcademicoUseCase(programaRepository);
const eliminarProgramaUseCase = new EliminarProgramaAcademicoUseCase(programaRepository);

const asignaturaRepository = new AsignaturaPGRepository();
const crearAsignaturaUseCase = new CrearAsignaturaUseCase(asignaturaRepository);
const listarAsignaturasUseCase = new ObtenerAsignaturasUseCase(asignaturaRepository);
const obtenerAsignaturaPorIdUseCase = new ObtenerAsignaturaPorIdUseCase(asignaturaRepository);
const actualizarAsignaturaUseCase = new ActualizarAsignaturaUseCase(asignaturaRepository);
const eliminarAsignaturaUseCase = new EliminarAsignaturaUseCase(asignaturaRepository);

const periodoRepository = new PostgresPeriodoAcademicoRepository();

const crearPeriodoUseCase = new CrearPeriodoUseCase(periodoRepository);
const listarPeriodosUseCase = new ObtenerPeriodosUseCase(periodoRepository);
const obtenerPeriodoPorIdUseCase = new ObtenerPeriodoPorIdUseCase(periodoRepository);
const actualizarPeriodoUseCase = new ActualizarPeriodoUseCase(periodoRepository);
const eliminarPeriodoUseCase = new EliminarPeriodoUseCase(periodoRepository);


const planEstudioRepository = new PlanEstudioPGRepository();
const definirPlanEstudioUseCase = new DefinirPlanEstudioUseCase(
    planEstudioRepository,
    programaRepository,
    asignaturaRepository
);


// Oferta Académica
const ofertaRepositorio = new OfertaAcademicaPGRepositorio();

const ofertarAsignaturaUseCase = new OfertarAsignaturaUseCase(
    ofertaRepositorio,
    periodoRepository,
    programaRepository,
    asignaturaRepository
);

// --- Servidor Fastify ---
export const server = fastify({ logger: true });

server.setErrorHandler((error, request, reply) => {
    let statusCode = 500;
    let responseBody = {
        error: 'Error interno del servidor',
        detalle: error.message || 'Error desconocido',
        codigo: 'INTERNAL_SERVER_ERROR'
    };

    if (error.code === 'FST_ERR_VALIDATION' && error.validation) {
        const validationError: any = error.validation.find(e => e);
        let detailMessage: string;

        if (validationError) {
            const field = validationError.dataPath ? validationError.dataPath.replace('/', '') : validationError.instancePath || 'solicitud';
            detailMessage = `El campo '${field}' es inválido. Detalle: ${validationError.message}`;
        } else {
            detailMessage = 'Error de validacion de esquema de entrada.';
        };

        statusCode = 400;
        responseBody = {
            error: 'Solicitud Inva lida (Validacion Schema)',
            detalle: detailMessage,
            codigo: 'REQUEST_VALIDATION_FAILED'
        };

    } else if (error instanceof ErrorAplicacion) {

        switch (error.codigo) {
            case 'NO_ENCONTRADO':
                statusCode = 404; // No encontrado
                break;
            case 'CONFLICTO':
                statusCode = 409; // Conflcito
                break;
            case 'ERROR_REGLA_NEGOCIO':
            case 'ERROR_VALIDACION':
                statusCode = 400; // Request mala
                break;
            default:
                statusCode = 500; // Error inesperado/default
                break;
        };

        responseBody = {
            error: error.name,
            detalle: error.message,
            codigo: error.codigo
        };

    } else {
        reply.log.error(error);
        statusCode = (error as any).statusCode || 500;
        responseBody = {
            error: 'Error inesperado del sistema',
            detalle: 'Ha ocurrido un error inesperado. Contacte al administrador.',
            codigo: 'UNHANDLED_EXCEPTION'
        };
    };

    // Enviar la respuesta con el formato uniforme
    return reply.code(statusCode).send(responseBody);
});


// --- Registrar Rutas ---

// Programa Academico
server.register(async (instance, options) => {
    registerProgramaAcademicoRoutes(
        instance,
        crearProgramaUseCase,
        listarProgramasUseCase,
        obtenerProgramaPorIdUseCase,
        actualizarProgramaUseCase,
        eliminarProgramaUseCase,

        definirPlanEstudioUseCase

    );
}, { prefix: '/api/v1/programas-academicos' });


// Asignatura 
server.register(rutasAsignatura, {
    prefix: '/api/v1/asignaturas',
    dependencies: {
        crearAsignaturaUseCase,
        listarAsignaturasUseCase,
        obtenerAsignaturaPorIdUseCase,
        actualizarAsignaturaUseCase,
        eliminarAsignaturaUseCase,
    }
});

// Periodo Academico
server.register(async (instance, options) => {
    registerPeriodoAcademicoRoutes(
        instance,
        crearPeriodoUseCase,
        listarPeriodosUseCase,
        obtenerPeriodoPorIdUseCase,
        actualizarPeriodoUseCase,
        eliminarPeriodoUseCase
    );
}, { prefix: '/api/v1/periodos' });


// Oferta Académica
server.register(rutasOfertaAcademica, {
    prefix: '/api/v1/ofertas',
    dependencies: {
        ofertarAsignaturaUseCase,
    }
});


// --- Iniciar el Servidor ---
export const start = async () => {
    try {
        await server.listen({ port: configuracion.PORT, host: '0.0.0.0' });
        console.log(`Servidor corriendo en http://localhost:${configuracion.PORT} en modo ${configuracion.NODE_ENV}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    };
};

if (import.meta.main) {
    start();
};