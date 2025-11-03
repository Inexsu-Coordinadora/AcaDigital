import { NivelEducativo, Modalidad } from "../entidades/NivelYModalidad.js";
import { Duracion } from "../entidades/Duracion.js";

export interface IProgramaAcademico{
    getId(): string;
    getNombre(): string;
    getDescripcion(): string;
    getNivelEducativo(): NivelEducativo;
    getModalidad(): Modalidad;
    getDuracion(): Duracion;
    actualizarInfoGeneral(nuevoNombre: string, nuevaDescripcion: string):void;
}

