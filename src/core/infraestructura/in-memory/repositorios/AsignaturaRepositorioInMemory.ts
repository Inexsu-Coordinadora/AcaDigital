import { IAsignaturaRepositorio } from "../../../../core/dominio/interfaces/repositorio/IAsignaturaRepositorio.js";
import { Asignatura } from "../../../../core/dominio/entidades/asignatura/Asignatura.js";

export class AsignaturaRepositorioInMemory implements IAsignaturaRepositorio {
    private asignaturas: Map<number, Asignatura>;

    constructor(initialData: Asignatura[] = []) {
        this.asignaturas = new Map(initialData.map(a => [a.getId(), a]));
    };

    async obtenerPorId(id: number): Promise<Asignatura | null> {
        return this.asignaturas.get(id) || null;
    };

    async guardar(asignatura: any): Promise<any> { return asignatura; }
    async obtenerTodos(): Promise<any[]> { return Array.from(this.asignaturas.values()); }
    async actualizar(id: number, dto: any): Promise<any> { throw new Error("Metodo no implementado."); }
    async eliminar(id: number): Promise<void> { this.asignaturas.delete(id); }
    async obtenerPorNombre(nombre: string): Promise<Asignatura | null> { throw new Error("Metodo no implementado."); }
};