import { DefinirPlanEstudioUseCase } from '../../src/core/aplicaciones/plan-estudio/index.js';
import { PlanEstudioRepositorioInMemory } from '../../src/core/infraestructura/in-memory/repositorios/PlanEstudioRepositorioInMemory.js';
import { ProgramaAcademicoRepositorioInMemory } from '../../src/core/infraestructura/in-memory/repositorios/ProgramaAcademicoRepositorioInMemory.js';
import { AsignaturaRepositorioInMemory } from '../../src/core/infraestructura/in-memory/repositorios/AsignaturaRepositorioInMemory.js';

import { ProgramaAcademico } from '../../src/core/dominio/entidades/programa-academico/ProgramaAcademico.js';
import { Duracion } from '../../src/core/dominio/entidades/programa-academico/Duracion.js';
import { NivelEducativo, Modalidad } from '../../src/core/dominio/entidades/programa-academico/NivelYModalidad.js';
import { Asignatura, TipoAsignatura } from '../../src/core/dominio/entidades/asignatura/Asignatura.js';

import { ErrorConflicto, ErrorAplicacion, ErrorValidacion } from '../../src/core/errores/errorAplicacion.js';

let planRepo: PlanEstudioRepositorioInMemory;
let programaRepo: ProgramaAcademicoRepositorioInMemory;
let asignaturaRepo: AsignaturaRepositorioInMemory;
let definirPlanEstudioUseCase: DefinirPlanEstudioUseCase;

const PROGRAMA_ID = 'PROG-1';
const ASIGNATURA_ID = 42;

const programaValido = new ProgramaAcademico(
    'Ingeniería de Sistemas',
    'Programa de 10 semestres',
    NivelEducativo.DOCTORADO,
    Modalidad.PRESENCIAL,
    new Duracion(10, 'semestres'),
    PROGRAMA_ID
);

const asignaturaValida = new Asignatura(
    'Estructura de Datos',
    4,
    TipoAsignatura.TEORICA,
    ASIGNATURA_ID
);

const dtoValido = {
    programaId: PROGRAMA_ID,
    asignaturaId: ASIGNATURA_ID,
    semestreNivel: 3,
    creditosCarga: 4,
};

describe('INTEGRACION: DefinirPlanEstudioUseCase', () => {

    beforeEach(async () => {
        planRepo = new PlanEstudioRepositorioInMemory();
        programaRepo = new ProgramaAcademicoRepositorioInMemory();
        asignaturaRepo = new AsignaturaRepositorioInMemory();

        definirPlanEstudioUseCase = new DefinirPlanEstudioUseCase(
            planRepo,
            programaRepo,
            asignaturaRepo
        );

        await programaRepo.crear(programaValido);
        await asignaturaRepo.guardar(asignaturaValida);
    });

    // Test 1: Caso de exito
    it('deberia definir exitosamente un nuevo plan de estudio', async () => {
        const planCreado = await definirPlanEstudioUseCase.ejecutar(dtoValido);

        expect(planCreado).toBeDefined();
        expect(planCreado.programaId).toBe(PROGRAMA_ID);
        expect(planCreado.semestreNivel).toBe(3);
        expect(planCreado.creditosCarga).toBe(4);

        const existeVinculo = await planRepo.existeVinculo(PROGRAMA_ID, ASIGNATURA_ID);
        expect(existeVinculo).toBe(true);
    });
    // Test 2: Caso de Error ya existe el vinculo (programa, asignatura)
    it('deberia lanzar ErrorConflicto si el vinculo ya existe', async () => {
        const planExistente = {
            ...dtoValido,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await planRepo.guardar(planExistente);
        await expect(definirPlanEstudioUseCase.ejecutar(dtoValido)).rejects.toThrow(ErrorConflicto);

        await expect(definirPlanEstudioUseCase.ejecutar(dtoValido)).rejects.toThrow(
            `La asignatura ya esta registrada en este programa`
        );
    });
    // Test 3: Caso de error Programa Academico no existe
    it('deberia lanzar ErrorNoEncontrado si el programa academico no existe', async () => {
        const programaInexistenteId = 'PROG-INEXISTENTE';
        const dtoProgramaInvalido = {
            ...dtoValido,
            programaId: programaInexistenteId,
        };

        await expect(definirPlanEstudioUseCase.ejecutar(dtoProgramaInvalido)).rejects.toThrow(ErrorAplicacion);
        await expect(definirPlanEstudioUseCase.ejecutar(dtoProgramaInvalido)).rejects.toThrow(
            'Programa academico no encontrado'
        );
    });
        // Test 4: Caso de error Asignatura no existe
    it('deberia lanzar ErrorNoEncontrado si la asignatura no existe', async () => {
        const asignaturaInexistenteId = 999;
        const dtoAsignaturaInvalida = {
            ...dtoValido,
            asignaturaId: asignaturaInexistenteId,
        };

        await expect(definirPlanEstudioUseCase.ejecutar(dtoAsignaturaInvalida)).rejects.toThrow(ErrorAplicacion);
        await expect(definirPlanEstudioUseCase.ejecutar(dtoAsignaturaInvalida)).rejects.toThrow(
            'Asignatura no encontrada'
        );
    });
    // Test 5: Caso de error Semestre/Nivel invalido
    it('deberia lanzar ErrorValidacion si el semestre/nivel es invalido (0 o negativo)', async () => {
        const dtoSemestreInvalido = {
            ...dtoValido,
            semestreNivel: 0, 
        };

        await expect(definirPlanEstudioUseCase.ejecutar(dtoSemestreInvalido)).rejects.toThrow(ErrorValidacion);
        await expect(definirPlanEstudioUseCase.ejecutar(dtoSemestreInvalido)).rejects.toThrow(
            'El semestre/nivel debe ser un entero positivo'
        );
    });
});
