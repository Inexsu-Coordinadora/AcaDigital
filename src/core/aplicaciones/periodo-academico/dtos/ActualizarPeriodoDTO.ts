import { EstadoPeriodo } from "../../../dominio/entidades/periodo-academico/EstadoPeriodo.js";
export interface ActualizarPeriodoDTO {
    nombre?: string;
    fechaInicio?: string;
    fechaFin?: string;
    estado?: EstadoPeriodo;
};
