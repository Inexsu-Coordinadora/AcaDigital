import { CrearPeriodoUseCase } from '../../src/core/aplicaciones/periodo-academico/casos-de-uso/CrearPeriodoUseCase.js';
import { ErrorConflicto, ErrorReglaNegocio } from '../../src/core/errores/ErrorAplicacion.js';
import { PeriodoAcademicoRepositorioInMemory } from '../../src/core/infraestructura/in-memory/repositorios/PeriodoAcademicoRepositorioInMemory.js';
let periodoRepo;
let crearPeriodoUseCase;
const PERIODO_VALIDO_DTO = {
    nombre: '2025-1',
    fechaInicio: '2025-01-15',
    fechaFin: '2025-06-15'
};
describe('INTEGRACION: PeriodoAcademico (Endpoints Principales)', () => {
    beforeEach(() => {
        periodoRepo = new PeriodoAcademicoRepositorioInMemory();
        crearPeriodoUseCase = new CrearPeriodoUseCase(periodoRepo);
    });
    // Test 1: Caso de éxito (HTTP 201 Created)
    it('deberia crear exitosamente un nuevo periodo academico', async () => {
        const periodoCreado = await crearPeriodoUseCase.ejecutar(PERIODO_VALIDO_DTO);
        expect(periodoCreado).toBeDefined();
        expect(periodoCreado.nombre).toBe(PERIODO_VALIDO_DTO.nombre);
        expect(periodoCreado.id).toBeDefined();
        // Verificación de persistencia
        const guardado = await periodoRepo.obtenerPorId(periodoCreado.id);
        expect(guardado).toBeDefined();
    });
    // Test 2: Caso de Error - Fechas inválidas (HTTP 400 Bad Request)
    it('deberia lanzar ErrorReglaNegocio si la fecha fin es anterior a la fecha inicio', async () => {
        const dtoFechasInvalidas = {
            ...PERIODO_VALIDO_DTO,
            fechaInicio: '2025-06-01',
            fechaFin: '2025-01-01' // Fin antes que inicio
        };
        // Esto simula un 400 Bad Request
        await expect(crearPeriodoUseCase.ejecutar(dtoFechasInvalidas)).rejects.toThrow(ErrorReglaNegocio);
        await expect(crearPeriodoUseCase.ejecutar(dtoFechasInvalidas)).rejects.toThrow('fechaFin debe ser posterior a fechaInicio');
    });
    // Test 3: Caso de Error - Conflicto de nombre (HTTP 409 Conflict)
    it('deberia lanzar ErrorConflicto si ya existe un periodo con el mismo nombre', async () => {
        // Pre-condición: Ya existe el periodo
        await crearPeriodoUseCase.ejecutar(PERIODO_VALIDO_DTO);
        // Intento de duplicado -> Simula HTTP 409
        await expect(crearPeriodoUseCase.ejecutar(PERIODO_VALIDO_DTO)).rejects.toThrow(ErrorConflicto);
        await expect(crearPeriodoUseCase.ejecutar(PERIODO_VALIDO_DTO)).rejects.toThrow('Ya existe un periodo con ese nombre');
    });
});
//# sourceMappingURL=PeriodoAcademico.integration.test.js.map