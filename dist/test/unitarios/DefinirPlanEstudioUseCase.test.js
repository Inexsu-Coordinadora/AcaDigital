import { DefinirPlanEstudioUseCase } from '../../src/core/aplicaciones/plan-estudio/casos-de-uso/DefinirPlanEstudioUseCase.js';
import { ErrorAplicacion, ErrorValidacion } from '../../src/core/errores/ErrorAplicacion.js';
const mockProgramaRepository = {
    obtenerPorId: jest.fn(),
};
const mockAsignaturaRepository = {
    obtenerPorId: jest.fn(),
};
const mockPlanEstudioRepository = {
    existeVinculo: jest.fn(),
    guardar: jest.fn(),
};
const mockPrograma = { id: 1, nombre: 'Ingenieria de Software' };
const mockAsignatura = { id: 101, nombre: 'Estructura de Datos' };
const definirPlanEstudioUseCase = new DefinirPlanEstudioUseCase(mockPlanEstudioRepository, mockProgramaRepository, mockAsignaturaRepository);
const dtoValido = {
    programaId: 'prog-1',
    asignaturaId: 101,
    semestreNivel: 3,
    creditosCarga: 4,
};
describe('DefinirPlanEstudioUseCase', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockProgramaRepository.obtenerPorId.mockResolvedValue(mockPrograma);
        mockAsignaturaRepository.obtenerPorId.mockResolvedValue(mockAsignatura);
        mockPlanEstudioRepository.existeVinculo.mockResolvedValue(false);
        mockPlanEstudioRepository.guardar.mockResolvedValue({
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
        mockProgramaRepository.obtenerPorId.mockResolvedValue(null);
        await expect(definirPlanEstudioUseCase.ejecutar(dtoValido)).rejects.toThrow(ErrorAplicacion);
        expect(mockAsignaturaRepository.obtenerPorId).not.toHaveBeenCalled();
        expect(mockPlanEstudioRepository.guardar).not.toHaveBeenCalled();
    });
    // Test 3: Caso de error no existe la Asignatura
    it('deberia lanzar un ErrorAplicacion si la Asignatura no existe', async () => {
        mockAsignaturaRepository.obtenerPorId.mockResolvedValue(null);
        await expect(definirPlanEstudioUseCase.ejecutar(dtoValido)).rejects.toThrow(ErrorAplicacion);
        expect(mockPlanEstudioRepository.existeVinculo).not.toHaveBeenCalled();
        expect(mockPlanEstudioRepository.guardar).not.toHaveBeenCalled();
    });
    // Test 4: Caso de error duplicidad
    it('deberia lanzar un ErrorAplicacion si el vinculo de plan de estudio ya existe (duplicidad)', async () => {
        mockPlanEstudioRepository.existeVinculo.mockResolvedValue(true);
        await expect(definirPlanEstudioUseCase.ejecutar(dtoValido)).rejects.toThrow(ErrorAplicacion);
        expect(mockPlanEstudioRepository.existeVinculo).toHaveBeenCalledWith(dtoValido.programaId, dtoValido.asignaturaId);
        expect(mockPlanEstudioRepository.guardar).not.toHaveBeenCalled();
    });
    // Test 5: Caso de error de regla de negocio semestre o creditos negativos
    it('deberia lanzar un ErrorAplicacion si el semestre o los creditos son cero o negativos', async () => {
        const dtoInvalido = {
            ...dtoValido,
            semestreNivel: 0,
            creditosCarga: 4,
        };
        await expect(definirPlanEstudioUseCase.ejecutar(dtoInvalido)).rejects.toThrow(ErrorAplicacion);
        expect(mockProgramaRepository.obtenerPorId).not.toHaveBeenCalled();
        expect(mockPlanEstudioRepository.guardar).not.toHaveBeenCalled();
    });
    // Test 6: Caso de error de infraestructura al guardar
    it('deberia propagar cualquier Error de la base de datos al guardar', async () => {
        const errorDB = new Error('Fallo de conexión a la base de datos');
        mockPlanEstudioRepository.guardar.mockRejectedValue(errorDB);
        await expect(definirPlanEstudioUseCase.ejecutar(dtoValido)).rejects.toThrow(errorDB);
    });
    // Test 7: Caso de error de regla de negocio semestre no entero
    it('deberia lanzar un ErrorValidacion si el semestre/nivel no es un entero', async () => {
        const dtoInvalido = {
            ...dtoValido,
            semestreNivel: 3.5,
        };
        await expect(definirPlanEstudioUseCase.ejecutar(dtoInvalido)).rejects.toThrow(ErrorValidacion);
        await expect(definirPlanEstudioUseCase.ejecutar(dtoInvalido)).rejects.toThrow('El semestre/nivel debe ser un entero positivo');
        expect(mockProgramaRepository.obtenerPorId).not.toHaveBeenCalled();
        expect(mockPlanEstudioRepository.guardar).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=DefinirPlanEstudioUseCase.test.js.map