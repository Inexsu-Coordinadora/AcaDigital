import { DefinirPlanEstudioUseCase } from '../../src/core/aplicaciones/plan-estudio/casos-de-uso/DefinirPlanEstudioUseCase.js';
import { IProgramaAcademicoRepositorio } from '../../src/core/dominio/interfaces//repositorio/IProgramaAcademicoRepositorio.js';
import { IAsignaturaRepositorio } from '../../src/core/dominio/interfaces/repositorio/IAsignaturaRepositorio.js';
import { IPlanEstudioRepositorio } from '../../src/core/dominio/interfaces/repositorio/IPlanEstudioRepositorio.js';

import { ErrorAplicacion, ErrorNoEncontrado, ErrorConflicto, ErrorReglaNegocio, ErrorValidacion } from '../../src/core/errores/errorAplicacion.js';

const mockProgramaRepository: Partial<IProgramaAcademicoRepositorio> = {
    obtenerPorId: jest.fn() as jest.Mock<Promise<any | null>, [string]>,
};

const mockAsignaturaRepository: Partial<IAsignaturaRepositorio> = {
    obtenerPorId: jest.fn() as jest.Mock<Promise<any | null>, [number]>,
};

const mockPlanEstudioRepository: Partial<IPlanEstudioRepositorio> = {
    existeVinculo: jest.fn() as jest.Mock<Promise<boolean>, [string, number]>,
    guardar: jest.fn() as jest.Mock<Promise<any>, [any]>,
};

const mockPrograma = { id: 1, nombre: 'Ingenieria de Software' };
const mockAsignatura = { id: 101, nombre: 'Estructura de Datos' };

const definirPlanEstudioUseCase = new DefinirPlanEstudioUseCase(
    mockPlanEstudioRepository as IPlanEstudioRepositorio,
    mockProgramaRepository as IProgramaAcademicoRepositorio,
    mockAsignaturaRepository as IAsignaturaRepositorio,
);

const dtoValido = {
    programaId: 'prog-1',
    asignaturaId: 101,
    semestreNivel: 3,
    creditosCarga: 4,
};

describe('DefinirPlanEstudioUseCase', () => {

    beforeEach(() => {
        jest.clearAllMocks();

        (mockProgramaRepository.obtenerPorId as jest.Mock).mockResolvedValue(mockPrograma);
        (mockAsignaturaRepository.obtenerPorId as jest.Mock).mockResolvedValue(mockAsignatura);
        (mockPlanEstudioRepository.existeVinculo as jest.Mock).mockResolvedValue(false);
        (mockPlanEstudioRepository.guardar as jest.Mock).mockResolvedValue({
            id: 'plan-123',
            ...dtoValido,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });

    // Test 1: Caso de exito
    it('deberia definir exitosamente un nuevo plan de estudio', async () => {

        const resultado = await definirPlanEstudioUseCase.ejecutar(dtoValido);

        expect(mockProgramaRepository.obtenerPorId).toHaveBeenCalledWith('prog-1');
        expect(mockPlanEstudioRepository.guardar).toHaveBeenCalledTimes(1);
        expect(resultado).toHaveProperty('id');
    });

    // Test 2: Caso de error no existe el Programa Academico
    it('deberia lanzar un ErrorAplicacion si el Programa Academico no existe', async () => {
        (mockProgramaRepository.obtenerPorId as jest.Mock).mockResolvedValue(null);

        await expect(definirPlanEstudioUseCase.ejecutar(dtoValido)).rejects.toThrow(
            ErrorAplicacion 
        );

        expect(mockAsignaturaRepository.obtenerPorId).not.toHaveBeenCalled();
        expect(mockPlanEstudioRepository.guardar).not.toHaveBeenCalled();
    });

    // Test 3: Caso de error no existe la Asignatura
    it('deberia lanzar un ErrorAplicacion si la Asignatura no existe', async () => {
        (mockAsignaturaRepository.obtenerPorId as jest.Mock).mockResolvedValue(null);

        await expect(definirPlanEstudioUseCase.ejecutar(dtoValido)).rejects.toThrow(
            ErrorAplicacion
        );
        expect(mockPlanEstudioRepository.existeVinculo).not.toHaveBeenCalled();
        expect(mockPlanEstudioRepository.guardar).not.toHaveBeenCalled();
    });

    // Test 4: Caso de error duplicidad
    it('deberia lanzar un ErrorAplicacion si el vinculo de plan de estudio ya existe (duplicidad)', async () => {
        (mockPlanEstudioRepository.existeVinculo as jest.Mock).mockResolvedValue(true);

        await expect(definirPlanEstudioUseCase.ejecutar(dtoValido)).rejects.toThrow(
            ErrorAplicacion
        );
        expect(mockPlanEstudioRepository.existeVinculo).toHaveBeenCalledWith(dtoValido.programaId, dtoValido.asignaturaId);
        expect(mockPlanEstudioRepository.guardar).not.toHaveBeenCalled();
    });

});