import { IPeriodoRepositorio } from '../../../dominio/interfaces/repositorio/IPeriodoAcademicoRepositorio.js';
import { IPeriodoAcademico } from '../../../dominio/interfaces/IPeriodoAcademico.js';

export class PeriodoAcademicoRepositorioInMemory implements IPeriodoRepositorio {
    private periodos: IPeriodoAcademico[] = [];

    async guardar(periodo: IPeriodoAcademico): Promise<IPeriodoAcademico> {
        this.periodos.push(periodo);
        return periodo;
    }

    async obtenerPorNombre(nombre: string): Promise<IPeriodoAcademico | null> {
        const periodo = this.periodos.find(p => p.nombre === nombre);
        return periodo || null;
    }

    async obtenerPorId(id: string): Promise<IPeriodoAcademico | null> {
        const periodo = this.periodos.find(p => p.id === id);
        return periodo || null;
    }

    async obtenerTodos(filtro?: { estado?: string }): Promise<IPeriodoAcademico[]> {
        if (filtro?.estado) {
            return this.periodos.filter(p => p.estado === filtro.estado);
        }
        return this.periodos;
    }

    async actualizar(id: string, data: Partial<IPeriodoAcademico>): Promise<IPeriodoAcademico> {
        const index = this.periodos.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Periodo no encontrado');

        const periodo = this.periodos[index];
        if (!periodo) throw new Error('Periodo indefinido');

        // Preserve prototype methods by modifying the existing object
        Object.assign(periodo, data);
        return periodo;
    }

    async eliminar(id: string): Promise<void> {
        this.periodos = this.periodos.filter(p => p.id !== id);
    }

    async obtenerPeriodosActivosTraslapados(fechaInicio: Date, fechaFin: Date, idActual?: string): Promise<IPeriodoAcademico[]> {
        return this.periodos.filter(p => {
            if (idActual && p.id === idActual) return false;
            return (p.fechaInicio <= fechaFin) && (p.fechaFin >= fechaInicio);
        });
    }
}
