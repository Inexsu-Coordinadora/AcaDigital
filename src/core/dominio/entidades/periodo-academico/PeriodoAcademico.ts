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
        estado?: EstadoPeriodo | string;
        createdAt?: Date;
        updatedAt?: Date;
    }){
        const fechaInicioValida = !isNaN(props.fechaInicio.getTime());
        const fechaFinValida = !isNaN(props.fechaFin.getTime());

        if (!fechaInicioValida || !fechaFinValida) {
            throw new Error("400: Las fechas de inicio o fin del período no son objetos Date válidos.");
        }

        if (props.fechaFin <= props.fechaInicio) {
            throw new Error("La fecha de fin debe ser posterior a la fecha de inicio.");
        }

        this.id = props.id || randomUUID();
        this.nombre = props.nombre;
        this.fechaInicio = props.fechaInicio;
        this.fechaFin = props.fechaFin;
        // Allow tests to pass string literals like 'inactivo' by coercing to EstadoPeriodo
        let estadoValor: EstadoPeriodo;
        if (typeof props.estado === 'string') {
            const val = props.estado as EstadoPeriodo;
            estadoValor = Object.values(EstadoPeriodo).includes(val) ? val : EstadoPeriodo.INACTIVO;
        } else {
            estadoValor = props.estado ?? EstadoPeriodo.INACTIVO;
        }
        this.estado = estadoValor;
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

    public puedeOfertarAsignaturas(): boolean {
        return this.estado === EstadoPeriodo.ACTIVO;
    }
}