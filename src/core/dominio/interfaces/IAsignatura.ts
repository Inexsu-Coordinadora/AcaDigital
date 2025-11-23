import type { TipoAsignatura } from "../entidades/asignatura/Asignatura.js";
export interface IAsignatura {
    id: number;
    nombre: string;
    cargaHoraria: number;
    tipo: TipoAsignatura;
    fechaCreacion: Date;
    fechaActualizacion: Date;
}