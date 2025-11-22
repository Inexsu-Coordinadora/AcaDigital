import { OfertarAsignaturaUseCase } from '../../src/core/aplicaciones/oferta-academica/casos-de-uso/OfertarAsignaturaUseCase.js';
import { IProgramaAcademicoRepositorio } from '../../src/core/dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js';
import { IAsignaturaRepositorio } from '../../src/core/dominio/interfaces/repositorio/IAsignaturaRepositorio.js';
import { IPeriodoRepositorio } from '../../src/core/dominio/interfaces/repositorio/IPeriodoAcademicoRepositorio.js'; 
import { IOfertaAcademicaRepositorio } from '../../src/core/dominio/interfaces/IOfertaAcademica.js'; 
import { ErrorNoEncontrado, ErrorConflicto, ErrorReglaNegocio } from '../../src/core/errores/errorAplicacion.js';

const mockProgramaRepo: Partial<IProgramaAcademicoRepositorio> = {
    obtenerPorId: jest.fn(),
};

const mockAsignaturaRepo: Partial<IAsignaturaRepositorio> = {
    obtenerPorId: jest.fn(),
};

const mockPeriodoRepo: Partial<IPeriodoRepositorio> = {
    obtenerPorId: jest.fn(),
};

const mockOfertaRepo: Partial<IOfertaAcademicaRepositorio> = {
    buscarPorClaveUnica: jest.fn(), 
    guardar: jest.fn(),
};


const mockPrograma = { id: 'prog-uuid-1', nombre: 'Ingenieria de Software' };
const mockAsignatura = { id: 101, nombre: 'Estructura de Datos' };

const mockPeriodoActivo = { 
    id: 'periodo-uuid-activo', 
    estado: 'activo' as const 
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
};

const dtoValido = {
    programaId: mockPrograma.id,
    asignaturaId: mockAsignatura.id,
    periodoId: mockPeriodoActivo.id,
    cupoMaximo: 30,
    grupo: 'A',
    cupoDisponible: 30, 
};

const ofertarAsignaturaUseCase = new OfertarAsignaturaUseCase(

    mockOfertaRepo as IOfertaAcademicaRepositorio, 

    mockPeriodoRepo as IPeriodoRepositorio, 
    
    mockProgramaRepo as IProgramaAcademicoRepositorio, 
    
    mockAsignaturaRepo as IAsignaturaRepositorio
);


describe('OfertarAsignaturaUseCase', () => {

    beforeEach(() => {
        jest.clearAllMocks();

        (mockProgramaRepo.obtenerPorId as jest.Mock).mockResolvedValue(mockPrograma);
        (mockAsignaturaRepo.obtenerPorId as jest.Mock).mockResolvedValue(mockAsignatura);
        (mockPeriodoRepo.obtenerPorId as jest.Mock).mockResolvedValue(mockPeriodoActivo);
        
        (mockOfertaRepo.buscarPorClaveUnica as jest.Mock).mockResolvedValue(null);
        (mockOfertaRepo.guardar as jest.Mock).mockResolvedValue(mockOfertaCreada);
    });


    // TEST 1: Caso de Exito
    it('debe crear una Oferta Académica si todas las entidades existen y son válidas', async () => {

        const resultado = await ofertarAsignaturaUseCase.ejecutar(dtoValido);

        expect(mockOfertaRepo.buscarPorClaveUnica).toHaveBeenCalledTimes(1);
        expect(mockOfertaRepo.guardar).toHaveBeenCalledTimes(1); 
        
        expect(resultado.getProgramaId()).toBe(mockOfertaCreada.getProgramaId());
    });

    // TEST 5: Error - Periodo Academico NO ACTIVO
    it('debe lanzar ErrorReglaNegocio si el Periodo Académico no está en estado ACTIVO', async () => {
        const mockPeriodoInactivo = { 
            id: 'periodo-uuid-inactivo', 
            nombre: 'Periodo Inactivo', 
            estado: 'cerrado' as const 
        };
        (mockPeriodoRepo.obtenerPorId as jest.Mock).mockResolvedValue(mockPeriodoInactivo);

        await expect(ofertarAsignaturaUseCase.ejecutar(dtoValido)).rejects.toThrow(
            ErrorReglaNegocio
        );
        await expect(ofertarAsignaturaUseCase.ejecutar(dtoValido)).rejects.toThrow(
            `El periodo ${mockPeriodoInactivo.nombre} no esta activo para crear ofertas. Estado actual: ${mockPeriodoInactivo.estado}.`
        );
    });

    // TESTS DE ERROR
    it('debe lanzar ErrorNoEncontrado si el Programa Académico no existe', async () => {
        (mockProgramaRepo.obtenerPorId as jest.Mock).mockResolvedValue(null);
        await expect(ofertarAsignaturaUseCase.ejecutar(dtoValido)).rejects.toThrow(ErrorNoEncontrado);
    });

    it('debe lanzar ErrorConflicto si la Oferta Académica ya existe (duplicidad)', async () => {
        (mockOfertaRepo.buscarPorClaveUnica as jest.Mock).mockResolvedValue(mockOfertaCreada);
        await expect(ofertarAsignaturaUseCase.ejecutar(dtoValido)).rejects.toThrow(ErrorConflicto);
    });
    
    it('debe lanzar ErrorReglaNegocio si el cupo maximo es cero o negativo', async () => {
        const dtoInvalido = { ...dtoValido, cupoMaximo: 0, cupoDisponible: 0 }; 
        await expect(ofertarAsignaturaUseCase.ejecutar(dtoInvalido)).rejects.toThrow(ErrorReglaNegocio);
    });
    
    it('debe propagar cualquier Error de la base de datos o infraestructura al guardar', async () => {
        const errorDB = new Error('Fallo en la conexión SQL');
        (mockOfertaRepo.guardar as jest.Mock).mockRejectedValue(errorDB);
        await expect(ofertarAsignaturaUseCase.ejecutar(dtoValido)).rejects.toThrow(errorDB);
    });
});