import { EstadoPeriodo } from "./EstadoPeriodo.js";
import { randomUUID } from 'crypto';
export class PeriodoAcademico {
    id;
    nombre;
    fechaInicio;
    fechaFin;
    estado;
    createdAt;
    updatedAt;
    constructor(props) {
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
        let estadoValor;
        if (typeof props.estado === 'string') {
            const val = props.estado;
            estadoValor = Object.values(EstadoPeriodo).includes(val) ? val : EstadoPeriodo.INACTIVO;
        }
        else {
            estadoValor = props.estado ?? EstadoPeriodo.INACTIVO;
        }
        this.estado = estadoValor;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = props.updatedAt || new Date();
    }
    activar() {
        if (this.estado === EstadoPeriodo.CERRADO) {
            throw new Error("No se puede activar un período que ya está cerrado.");
        }
        if (this.estado === EstadoPeriodo.ACTIVO) {
            return;
        }
        this.estado = EstadoPeriodo.ACTIVO;
        this.updatedAt = new Date();
    }
    cerrar() {
        if (this.estado === EstadoPeriodo.INACTIVO) {
            throw new Error("No se puede cerrar un período que aún no ha sido activado.");
        }
        if (this.estado === EstadoPeriodo.CERRADO) {
            return;
        }
        this.estado = EstadoPeriodo.CERRADO;
        this.updatedAt = new Date();
    }
    puedeOfertarAsignaturas() {
        return this.estado === EstadoPeriodo.ACTIVO;
    }
}
//# sourceMappingURL=PeriodoAcademico.js.map