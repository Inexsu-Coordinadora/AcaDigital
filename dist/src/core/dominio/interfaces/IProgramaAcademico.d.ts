import type { NivelEducativo, Modalidad } from "../entidades/programa-academico/NivelYModalidad.js";
import type { Duracion } from "../entidades/programa-academico/Duracion.js";
export interface IProgramaAcademico {
    id: string;
    nombre: string;
    descripcion: string;
    nivelEducativo: NivelEducativo;
    modalidad: Modalidad;
    duracion: Duracion;
    actualizarInfoGeneral(nombre: string, descripcion: string): void;
    getId?(): string;
    getNombre?(): string;
    getDescripcion?(): string;
    getNivelEducativo?(): NivelEducativo;
    getModalidad?(): Modalidad;
    getDuracion?(): Duracion;
}
//# sourceMappingURL=IProgramaAcademico.d.ts.map