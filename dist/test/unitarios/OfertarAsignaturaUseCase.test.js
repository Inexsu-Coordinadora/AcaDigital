import { OfertarAsignaturaUseCase } from '../../src/core/aplicaciones/oferta-academica/casos-de-uso/OfertarAsignaturaUseCase.js';
import { ErrorNoEncontrado, ErrorConflicto, ErrorReglaNegocio } from '../../src/core/errores/ErrorAplicacion.js';
// Mocks de Repositorios
const mockProgramaRepo = {
    obtenerPorId: jest.fn(),
};
const mockAsignaturaRepo = {
    obtenerPorId: jest.fn(),
};
const mockPeriodoRepo = {
    obtenerPorId: jest.fn(),
};
const mockOfertaRepo = {
    buscarPorClaveUnica: jest.fn(),
    guardar: jest.fn(),
};
// Mocks de Entidades y DTO 
const mockPrograma = { id: 'prog-uuid-1', nombre: 'Ingenieria de Software' };
const mockAsignatura = { id: 101, nombre: 'Estructura de Datos' };
const mockPeriodoActivo = {
    id: 'periodo-uuid-activo',
    estado: 'activo'
};
const mockOfertaCreada = {
    getId: () => 1,
    getPeriodoId: () => 'periodo-uuid-activo',
    getProgramaId: () => 'prog-uuid-1',
    getAsignaturaId: () => 101,
    getGrupo: () => 'A',
    getCupoDisponible: () => 30,
    getFechaCreacion: () => new Date(),
    getFechaActualizacion: () => new Date(),
    // also include plain properties so assertions that access properties work
    periodoId: 'periodo-uuid-activo',
    programaId: 'prog-uuid-1',
    asignaturaId: 101,
    grupo: 'A',
    cupoDisponible: 30,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date(),
};
const dtoValido = {
    programaId: mockPrograma.id,
    asignaturaId: mockAsignatura.id,
    periodoId: mockPeriodoActivo.id,
    cupoMaximo: 30,
    grupo: 'A',
    cupoDisponible: 30,
};
// Inicialización del Caso de Uso 
const ofertarAsignaturaUseCase = new OfertarAsignaturaUseCase(mockOfertaRepo, mockPeriodoRepo, mockProgramaRepo, mockAsignaturaRepo);
describe('OfertarAsignaturaUseCase', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockProgramaRepo.obtenerPorId.mockResolvedValue(mockPrograma);
        mockAsignaturaRepo.obtenerPorId.mockResolvedValue(mockAsignatura);
        mockPeriodoRepo.obtenerPorId.mockResolvedValue(mockPeriodoActivo);
        mockOfertaRepo.buscarPorClaveUnica.mockResolvedValue(null);
        mockOfertaRepo.guardar.mockResolvedValue(mockOfertaCreada);
    });
    // TEST: Caso de exito
    it('debe crear una Oferta Académica si todas las entidades existen y son válidas', async () => {
        const resultado = await ofertarAsignaturaUseCase.ejecutar(dtoValido);
        expect(mockOfertaRepo.buscarPorClaveUnica).toHaveBeenCalledTimes(1);
        expect(mockOfertaRepo.guardar).toHaveBeenCalledTimes(1);
        expect(resultado.programaId).toBe(mockOfertaCreada.getProgramaId());
    });
    // TEST: Error - Periodo Académico NO ACTIVO
    it('debe lanzar ErrorReglaNegocio si el Periodo Académico no está en estado ACTIVO', async () => {
        const mockPeriodoInactivo = {
            id: 'periodo-uuid-inactivo',
            nombre: 'Periodo Inactivo',
            estado: 'cerrado'
        };
        mockPeriodoRepo.obtenerPorId.mockResolvedValue(mockPeriodoInactivo);
        await expect(ofertarAsignaturaUseCase.ejecutar(dtoValido)).rejects.toThrow(ErrorReglaNegocio);
        await expect(ofertarAsignaturaUseCase.ejecutar(dtoValido)).rejects.toThrow(`El periodo ${mockPeriodoInactivo.nombre} no esta activo para crear ofertas. Estado actual: ${mockPeriodoInactivo.estado}.`);
    });
    // Otros tests de Error
    it('debe lanzar ErrorNoEncontrado si el Programa Académico no existe', async () => {
        mockProgramaRepo.obtenerPorId.mockResolvedValue(null);
        await expect(ofertarAsignaturaUseCase.ejecutar(dtoValido)).rejects.toThrow(ErrorNoEncontrado);
    });
    it('debe lanzar ErrorConflicto si la Oferta Académica ya existe (duplicidad)', async () => {
        mockOfertaRepo.buscarPorClaveUnica.mockResolvedValue(mockOfertaCreada);
        await expect(ofertarAsignaturaUseCase.ejecutar(dtoValido)).rejects.toThrow(ErrorConflicto);
    });
    it('debe lanzar ErrorReglaNegocio si el cupo maximo es cero o negativo', async () => {
        const dtoInvalido = { ...dtoValido, cupoMaximo: 0, cupoDisponible: 0 };
        await expect(ofertarAsignaturaUseCase.ejecutar(dtoInvalido)).rejects.toThrow(ErrorReglaNegocio);
    });
    it('debe propagar cualquier Error de la base de datos o infraestructura al guardar', async () => {
        const errorDB = new Error('Fallo en la conexión SQL');
        mockOfertaRepo.guardar.mockRejectedValue(errorDB);
        await expect(ofertarAsignaturaUseCase.ejecutar(dtoValido)).rejects.toThrow(errorDB);
    });
});
//# sourceMappingURL=OfertarAsignaturaUseCase.test.js.map