import { DefinirPlanEstudioUseCase } from '../../src/core/aplicaciones/plan-estudio/index.js';
import { PlanEstudioRepositorioInMemory } from '../../src/core/infraestructura/in-memory/repositorios/PlanEstudioRepositorioInMemory.js';
import { ProgramaAcademicoRepositorioInMemory } from '../../src/core/infraestructura/in-memory/repositorios/ProgramaAcademicoRepositorioInMemory.js';
import { AsignaturaRepositorioInMemory } from '../../src/core/infraestructura/in-memory/repositorios/AsignaturaRepositorioInMemory.js';

import { ProgramaAcademico } from '../../src/core/dominio/entidades/programa-academico/ProgramaAcademico.js';
import { Duracion } from '../../src/core/dominio/entidades/programa-academico/Duracion.js';
import { NivelEducativo, Modalidad } from '../../src/core/dominio/entidades/programa-academico/NivelYModalidad.js';
import { Asignatura, TipoAsignatura } from '../../src/core/dominio/entidades/asignatura/Asignatura.js';

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
});
