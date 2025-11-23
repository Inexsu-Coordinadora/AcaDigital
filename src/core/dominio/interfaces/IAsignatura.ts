import type { TipoAsignatura } from "../entidades/asignatura/Asignatura.js";
export interface IAsignatura {
    id: number;
    nombre: string;
    cargaHoraria: number;
    tipo: TipoAsignatura;
    fechaCreacion: Date;
    fechaActualizacion: Date;

    // Compatibility methods used by tests / legacy callers
    getId?(): number;
    getNombre?(): string;
    getCargaHoraria?(): number;
    getTipo?(): TipoAsignatura;
    getFechaCreacion?(): Date;
    getFechaActualizacion?(): Date;
}