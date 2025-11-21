import { EstadoPeriodo } from "./EstadoPeriodo.js";
import type { IPeriodoAcademico } from "../../interfaces/IPeriodoAcademico.js";
import { randomUUID } from 'crypto';

export class PeriodoAcademico implements IPeriodoAcademico {
    
    public readonly id: string;
    public nombre: string;
    public fechaInicio: Date;
    public fechaFin: Date;
    public estado: EstadoPeriodo;
    public readonly createdAt: Date;
    public updatedAt: Date;

    constructor(props: {
        id?: string;
        nombre: string;
        fechaInicio: Date;
        fechaFin: Date;
        estado?: EstadoPeriodo;
        createdAt?: Date;
        updatedAt?: Date;
    }){
        if (props.fechaFin <= props.fechaInicio) {
            throw new Error("La fecha de fin debe ser posterior a la fecha de inicio.");
        }
        this.id = props.id || randomUUID();
        this.nombre = props.nombre;
        this.fechaInicio = props.fechaInicio;
        this.fechaFin = props.fechaFin;
        this.estado = props.estado || EstadoPeriodo.INACTIVO;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = props.updatedAt || new Date();
    }

    public activar(): void {
        if (this.estado === EstadoPeriodo.CERRADO) {
            throw new Error("No se puede activar un período que ya está cerrado.");
        }
        if (this.estado === EstadoPeriodo.ACTIVO) {
            return;
        }
        this.estado = EstadoPeriodo.ACTIVO;
        this.updatedAt = new Date();
    }

    public cerrar(): void {
        if (this.estado === EstadoPeriodo.INACTIVO) {
            throw new Error("No se puede cerrar un período que aún no ha sido activado.");
        }
        if (this.estado === EstadoPeriodo.CERRADO) {
            return;
        }
        this.estado = EstadoPeriodo.CERRADO;
        this.updatedAt = new Date();
    }
}
