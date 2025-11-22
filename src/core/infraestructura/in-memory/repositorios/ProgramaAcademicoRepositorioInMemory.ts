import { IProgramaAcademicoRepositorio } from "../../../../core/dominio/interfaces/repositorio/IProgramaAcademicoRepositorio.js";
import { ProgramaAcademico } from "../../../../core/dominio/entidades/programa-academico/ProgramaAcademico.js";

export class ProgramaAcademicoRepositorioInMemory implements IProgramaAcademicoRepositorio {
    private programas: Map<string, ProgramaAcademico>;

    constructor(initialData: ProgramaAcademico[] = []) {
        this.programas = new Map(initialData.map(p => [p.getId(), p]));
    };

    async obtenerPorId(id: string): Promise<ProgramaAcademico | null> {
        return this.programas.get(id) || null;
    };

    async crear(programa: any): Promise<any> { return programa; }
    async obtenerTodos(): Promise<any[]> { return Array.from(this.programas.values()); }
    async actualizar(id: string, dto: any): Promise<any> { throw new Error("Metodo no implementado."); }
    async eliminar(id: string): Promise<void> { this.programas.delete(id); }
    async obtenerPorNombre(nombre: string): Promise<ProgramaAcademico | null> { throw new Error("Metodo no implementado."); }
};