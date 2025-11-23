import { ProgramaAcademico } from '../../src/core/dominio/entidades/programa-academico/ProgramaAcademico.js';
import { Duracion, UNIDADES_DURACION_VALIDAS } from '../../src/core/dominio/entidades/programa-academico/Duracion.js';
import { NivelEducativo, Modalidad } from '../../src/core/dominio/entidades/programa-academico/NivelYModalidad.js';

describe('UNITARIO: Entidad ProgramaAcademico', () => {

    const DURACION_VALIDA = new Duracion(10, 'semestres');
    const PROGRAMA_ID = 'PROG-123';
    const NOMBRE_BASE = 'Ingenieria de Software';
    const DESCRIPCION_BASE = 'Forma profesionales en desarrollo de sistemas.';


    const programaBase = () => new ProgramaAcademico(
        NOMBRE_BASE,
        DESCRIPCION_BASE,
        NivelEducativo.PREGRADO,
        Modalidad.VIRTUAL,
        DURACION_VALIDA,
        PROGRAMA_ID,
    );


    // Test 1: Caso de exito
    it('deberia inicializarse correctamente con todos los atributos', () => {
        const programa = programaBase();

        expect(programa.getId()).toBe(PROGRAMA_ID);
        expect(programa.getNombre()).toBe(NOMBRE_BASE); 
        expect(programa.getDescripcion()).toBe(DESCRIPCION_BASE);
        expect(programa.getNivelEducativo()).toBe(NivelEducativo.PREGRADO);
        expect(programa.getModalidad()).toBe(Modalidad.VIRTUAL);
        expect(programa.getDuracion()).toBe(DURACION_VALIDA);

    });

    // Test 2: Caso de error nombre vacio
    it('deberia lanzar Error si el nombre es vacio', () => {
        expect(() => new ProgramaAcademico('', DESCRIPCION_BASE, NivelEducativo.PREGRADO, Modalidad.VIRTUAL, DURACION_VALIDA)).toThrow(Error);
    });
    
    // Test 3: Caso de error descripcion vacia
    it('deberia lanzar Error si la descripcion es vacia', () => {
        expect(() => new ProgramaAcademico(NOMBRE_BASE, '', NivelEducativo.PREGRADO, Modalidad.VIRTUAL, DURACION_VALIDA)).toThrow(Error);
    });

    // Test 4: Caso de error duracion invalida
    it('deberia pasar la inicializacion si la duracion es valida', () => {
        const t1 = () => new ProgramaAcademico(NOMBRE_BASE, DESCRIPCION_BASE, NivelEducativo.PREGRADO, Modalidad.VIRTUAL, DURACION_VALIDA);
        expect(t1).not.toThrow();
    });

    // Test 5: Caso de uso actualizarInfoGeneral
    it('deberia actualizar nombre y descripcion con exito', () => {
        const programa = programaBase();
        const nuevoNombre = 'Licenciatura en Musica';
        const nuevaDescripcion = 'Enfasis en composicion digital, con alta carga practica.';
        
        programa.actualizarInfoGeneral(nuevoNombre, nuevaDescripcion);

        expect(programa.getNombre()).toBe(nuevoNombre);
        expect(programa.getDescripcion()).toBe(nuevaDescripcion);
    });

    // Test 6: Caso de error en actualizarInfoGeneral
    it('deberia lanzar Error si el nuevo nombre en actualizarInfoGeneral es invalido', () => {
        const programa = programaBase();
        const descripcionValida = 'Nueva descripcion larga.';
        
        expect(() => programa.actualizarInfoGeneral('', descripcionValida)).toThrow(Error);
    });

    // Test 7: Caso de error en actualizarInfoGeneral
    it('deberia lanzar Error si la nueva descripcion en actualizarInfoGeneral es invalida', () => {
        const programa = programaBase();
        const nombreValido = 'Nuevo Nombre Largo';
        
        expect(() => programa.actualizarInfoGeneral(nombreValido, '')).toThrow(Error);
    });


});