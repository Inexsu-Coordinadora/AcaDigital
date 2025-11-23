import { CrearPeriodoUseCase } from '../../src/core/aplicaciones/periodo-academico/casos-de-uso/CrearPeriodoUseCase.js';
import { ActualizarPeriodoUseCase } from '../../src/core/aplicaciones/periodo-academico/casos-de-uso/ActualizarPeriodoUseCase.js';
import type { IPeriodoRepositorio } from '../../src/core/dominio/interfaces/repositorio/IPeriodoAcademicoRepositorio.js';
import { ErrorAplicacion, ErrorConflicto, ErrorNoEncontrado } from '../../src/core/errores/ErrorAplicacion.js';
import { PeriodoAcademico } from '../../src/core/dominio/entidades/periodo-academico/PeriodoAcademico.js';
import { EstadoPeriodo } from '../../src/core/dominio/entidades/periodo-academico/EstadoPeriodo.js';

const mockPeriodoRepositorio: IPeriodoRepositorio = {
    guardar: jest.fn(),
    obtenerPorId: jest.fn(),
    obtenerPorNombre: jest.fn(),
    actualizar: jest.fn(),
    obtenerPeriodosActivosTraslapados: jest.fn(),
    obtenerTodos: jest.fn(),
    eliminar: jest.fn(),
};

describe('Pruebas Básicas de Período Académico', () => {

    let crearPeriodoUseCase: CrearPeriodoUseCase;
    let actualizarPeriodoUseCase: ActualizarPeriodoUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        crearPeriodoUseCase = new CrearPeriodoUseCase(mockPeriodoRepositorio);
        actualizarPeriodoUseCase = new ActualizarPeriodoUseCase(mockPeriodoRepositorio);
    });

    describe('CrearPeriodoUseCase', () => {

        // Prueba la creación exitosa de un período
        it('Debe crear un período si los datos son válidos y no hay otro con el mismo nombre', async () => {
            const input = {
                nombre: 'Periodo Prueba',
                fechaInicio: '2023-01-01',
                fechaFin: '2023-06-30'
            };

            (mockPeriodoRepositorio.obtenerPorNombre as jest.Mock).mockResolvedValue(null);
            (mockPeriodoRepositorio.guardar as jest.Mock).mockImplementation(periodo => Promise.resolve(periodo));

            const resultado = await crearPeriodoUseCase.ejecutar(input);

            expect(mockPeriodoRepositorio.obtenerPorNombre).toHaveBeenCalledWith(input.nombre);
            expect(mockPeriodoRepositorio.guardar).toHaveBeenCalled();
            expect(resultado).toBeInstanceOf(PeriodoAcademico);
            expect(resultado.nombre).toBe(input.nombre);
        });

        // Prueba que falle la creación si el nombre ya existe
        it('Debe fallar si ya existe un período con el mismo nombre', async () => {
            const input = {
                nombre: 'Periodo Existente',
                fechaInicio: '2023-01-01',
                fechaFin: '2023-06-30'
            };
            const periodoExistente = new PeriodoAcademico({ ...input, fechaInicio: new Date(input.fechaInicio), fechaFin: new Date(input.fechaFin) });

            (mockPeriodoRepositorio.obtenerPorNombre as jest.Mock).mockResolvedValue(periodoExistente);

            await expect(crearPeriodoUseCase.ejecutar(input)).rejects.toThrow(ErrorConflicto);
            expect(mockPeriodoRepositorio.guardar).not.toHaveBeenCalled();
        });
    });

    describe('ActualizarPeriodoUseCase', () => {
        const idExistente = 'id-del-periodo';
        const periodoEncontrado = new PeriodoAcademico({
            id: idExistente,
            nombre: 'Periodo Original',
            fechaInicio: new Date('2024-01-01'),
            fechaFin: new Date('2024-06-30'),
              estado: EstadoPeriodo.ACTIVO,
        });

        // Prueba la actualización exitosa de un período existente
        it('Debe actualizar un período existente con éxito', async () => {
            const input = { nombre: 'Periodo Actualizado' };

            (mockPeriodoRepositorio.obtenerPorId as jest.Mock).mockResolvedValue(periodoEncontrado);
            (mockPeriodoRepositorio.obtenerPorNombre as jest.Mock).mockResolvedValue(null);
            (mockPeriodoRepositorio.actualizar as jest.Mock).mockResolvedValue(true);

            await actualizarPeriodoUseCase.ejecutar(idExistente, input);

            expect(mockPeriodoRepositorio.actualizar).toHaveBeenCalledWith(
                idExistente,
                expect.objectContaining({ nombre: input.nombre })
            );
        });

        // Prueba que falle la actualización si el período no se encuentra
        it('Debe fallar si el período a actualizar no se encuentra', async () => {
            const idInexistente = 'id-no-existe';

            (mockPeriodoRepositorio.obtenerPorId as jest.Mock).mockResolvedValue(null);

            // Verificamos que se rechace la promesa
            await expect(actualizarPeriodoUseCase.ejecutar(idInexistente, { nombre: 'Cualquier nombre' }))
                .rejects.toThrow(ErrorAplicacion);
            
            // Adicionalmente, podemos verificar el código del error para ser más específicos
            await expect(actualizarPeriodoUseCase.ejecutar(idInexistente, { nombre: 'Cualquier nombre' }))
                .rejects.toHaveProperty('codigo', 'NO_ENCONTRADO');

            expect(mockPeriodoRepositorio.actualizar).not.toHaveBeenCalled();
        });
    });
});
