import {
    CrearAsignaturaUseCase,
    EliminarAsignaturaUseCase,
    ObtenerAsignaturaPorIdUseCase,
    ObtenerAsignaturasUseCase,
    ActualizarAsignaturaUseCase,
    type CrearAsignaturaDTO,
    type ActualizarAsignaturaDTO
} from '../../src/core/aplicaciones/asignatura/index.js';
import { AsignaturaRepositorioInMemory } from '../../src/core/infraestructura/in-memory/repositorios/AsignaturaRepositorioInMemory.js';

import { TipoAsignatura, Asignatura } from '../../src/core/dominio/entidades/asignatura/Asignatura.js';

import type { IAsignatura } from '../../src/core/dominio/interfaces/IAsignatura.js';

import { ErrorConflicto, ErrorNoEncontrado } from '../../src/core/errores/ErrorAplicacion.js';


let repositorio: AsignaturaRepositorioInMemory;
let crearUseCase: CrearAsignaturaUseCase;
let eliminarUseCase: EliminarAsignaturaUseCase;
let obtenerPorIdUseCase: ObtenerAsignaturaPorIdUseCase;
let actualizarUseCase: ActualizarAsignaturaUseCase;
let obtenerTodosUseCase: ObtenerAsignaturasUseCase;


const DTO_CREACION: CrearAsignaturaDTO = {
    nombre: 'Estructura de Datos',
    cargaHoraria: 6,
    tipo: TipoAsignatura.PRACTICA,
};

const DTO_CREACION_2: CrearAsignaturaDTO = {
    nombre: 'Sistemas Operativos',
    cargaHoraria: 4,
    tipo: TipoAsignatura.TEORICA,
};


describe('INTEGRACION: Casos de Uso de Asignatura (Repositorio In-Memory)', () => {

    beforeEach(() => {
        repositorio = new AsignaturaRepositorioInMemory();
        crearUseCase = new CrearAsignaturaUseCase(repositorio);
        eliminarUseCase = new EliminarAsignaturaUseCase(repositorio);
        obtenerPorIdUseCase = new ObtenerAsignaturaPorIdUseCase(repositorio);
        actualizarUseCase = new ActualizarAsignaturaUseCase(repositorio);
        obtenerTodosUseCase = new ObtenerAsignaturasUseCase(repositorio);
    });

    // Crear Asignatura 
    describe('CrearAsignaturaUseCase', () => {
        it('debe crear y persistir una nueva asignatura con un ID asignado', async () => {
            const asignaturaCreada = await crearUseCase.execute(DTO_CREACION);

            expect(asignaturaCreada.id).toBe(1);
            expect(asignaturaCreada.nombre).toBe(DTO_CREACION.nombre);

            const persistida = await repositorio.obtenerPorId(1);
            expect(persistida).not.toBeNull();
        });

        it('debe lanzar ErrorConflicto si el nombre ya existe', async () => {
            await crearUseCase.execute(DTO_CREACION);

            await expect(crearUseCase.execute(DTO_CREACION)).rejects.toThrow(ErrorConflicto);
        });
    });

    // Obtener Asignatura por ID 
    describe('ObtenerAsignaturaPorIdUseCase', () => {
        let idExistente: number;

        beforeEach(async () => {
            idExistente = (await crearUseCase.execute(DTO_CREACION)).id;
        });

        it('debe obtener la asignatura por un ID existente', async () => {
            const asignatura = await obtenerPorIdUseCase.obtenerPorId(idExistente);

            expect(asignatura).not.toBeNull();
            expect(asignatura!.id).toBe(idExistente);
        });

        it('debe retornar null para un ID inexistente', async () => {
            const asignatura = await obtenerPorIdUseCase.obtenerPorId(999);

            expect(asignatura).toBeNull();
        });
    });

    // Actualizar Asignatura 
    describe('ActualizarAsignaturaUseCase', () => {
        let idAsignatura: number;

        beforeEach(async () => {
            idAsignatura = (await crearUseCase.execute(DTO_CREACION)).id;
            await crearUseCase.execute(DTO_CREACION_2); 
        });

        it('debe actualizar la asignatura y persistir los cambios', async () => {
            const nuevosDatos: ActualizarAsignaturaDTO = {
                id: idAsignatura,
                nombre: 'Estructura de Datos Avanzada',
                cargaHoraria: 8,
                tipo: TipoAsignatura.MIXTA,
            };

            const resultado = await actualizarUseCase.execute(nuevosDatos);

            expect(resultado.nombre).toBe(nuevosDatos.nombre);

            const persistida = await repositorio.obtenerPorId(idAsignatura);
            expect(persistida!.cargaHoraria).toBe(8);
        });

        it('debe lanzar ErrorNoEncontrado si el ID no existe', async () => {
            const dtoInvalido: ActualizarAsignaturaDTO = {
                id: 999, nombre: 'X', cargaHoraria: 1, tipo: TipoAsignatura.TEORICA
            };
            await expect(actualizarUseCase.execute(dtoInvalido)).rejects.toThrow(ErrorNoEncontrado);
        });

        it('debe lanzar ErrorConflicto si el nuevo nombre ya está en uso por otra asignatura', async () => {
            const dtoConflicto: ActualizarAsignaturaDTO = {
                id: idAsignatura,
                nombre: DTO_CREACION_2.nombre, 
                cargaHoraria: 5,
                tipo: TipoAsignatura.TEORICA,
            };
            await expect(actualizarUseCase.execute(dtoConflicto)).rejects.toThrow(ErrorConflicto);
        });
    });

    // Eliminar Asignatura 
    describe('EliminarAsignaturaUseCase', () => {
        let idExistente: number;

        beforeEach(async () => {
            idExistente = (await crearUseCase.execute(DTO_CREACION)).id;
        });

        it('debe eliminar la asignatura exitosamente', async () => {
            await eliminarUseCase.execute(idExistente);

            const eliminada = await repositorio.obtenerPorId(idExistente);
            expect(eliminada).toBeNull();
        });

        it('debe lanzar ErrorNoEncontrado si intenta eliminar una asignatura inexistente', async () => {
            const ID_INEXISTENTE = 999;
            await expect(eliminarUseCase.execute(ID_INEXISTENTE)).rejects.toThrow(ErrorNoEncontrado);
        });
    });

    // Obtener Todos
    describe('ObtenerAsignaturasUseCase', () => {
        it('debe retornar todas las asignaturas creadas', async () => {
            await crearUseCase.execute(DTO_CREACION);
            await crearUseCase.execute(DTO_CREACION_2);

            const resultados = await obtenerTodosUseCase.findAll();

            expect(resultados).toHaveLength(2);
            expect(resultados.map(a => a.nombre)).toEqual(expect.arrayContaining([
                DTO_CREACION.nombre,
                DTO_CREACION_2.nombre
            ]));
        });
    });
});