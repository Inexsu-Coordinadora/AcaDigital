import type { EstadoPeriodo } from "./EstadoPeriodo.js";
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
        this.estado = props.estado || 'inactivo';
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = props.updatedAt || new Date();
    }

    public activar(): void {
        if (this.estado === 'cerrado') {
            throw new Error("No se puede activar un período que ya está cerrado.");
        }
        if (this.estado === 'activo') {
            return;
        }
        this.estado = 'activo';
        this.updatedAt = new Date();
    }

    public cerrar(): void {
        if (this.estado === 'inactivo') {
            throw new Error("No se puede cerrar un período que aún no ha sido activado.");
        }
        if (this.estado === 'cerrado') {
            return;
        }
        this.estado = 'cerrado';
        this.updatedAt = new Date();
    }
}
