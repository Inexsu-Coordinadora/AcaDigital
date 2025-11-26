export class PeriodoAcademicoRepositorioInMemory {
    periodos = [];
    async guardar(periodo) {
        this.periodos.push(periodo);
        return periodo;
    }
    async obtenerPorNombre(nombre) {
        const periodo = this.periodos.find(p => p.nombre === nombre);
        return periodo || null;
    }
    async obtenerPorId(id) {
        const periodo = this.periodos.find(p => p.id === id);
        return periodo || null;
    }
    async obtenerTodos(filtro) {
        if (filtro?.estado) {
            return this.periodos.filter(p => p.estado === filtro.estado);
        }
        return this.periodos;
    }
    async actualizar(id, data) {
        const index = this.periodos.findIndex(p => p.id === id);
        if (index === -1)
            throw new Error('Periodo no encontrado');
        const periodo = this.periodos[index];
        if (!periodo)
            throw new Error('Periodo indefinido');
        // Preserve prototype methods by modifying the existing object
        Object.assign(periodo, data);
        return periodo;
    }
    async eliminar(id) {
        this.periodos = this.periodos.filter(p => p.id !== id);
    }
    async obtenerPeriodosActivosTraslapados(fechaInicio, fechaFin, idActual) {
        return this.periodos.filter(p => {
            if (idActual && p.id === idActual)
                return false;
            return (p.fechaInicio <= fechaFin) && (p.fechaFin >= fechaInicio);
        });
    }
}
//# sourceMappingURL=PeriodoAcademicoRepositorioInMemory.js.map