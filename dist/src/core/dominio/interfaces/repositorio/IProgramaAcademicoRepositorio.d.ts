import type { IProgramaAcademico as ProgramaAcademicoType } from "../IProgramaAcademico.js";
export interface IProgramaAcademicoRepositorio {
    guardar(programa: ProgramaAcademicoType): Promise<ProgramaAcademicoType>;
    obtenerPorId(id: string): Promise<ProgramaAcademicoType | null>;
    obtenerTodos(): Promise<ProgramaAcademicoType[]>;
    actualizar(id: string, programa: ProgramaAcademicoType): Promise<ProgramaAcademicoType>;
    eliminar(id: string): Promise<void>;
    obtenerPorNombre(nombre: string): Promise<ProgramaAcademicoType | null>;
}
//# sourceMappingURL=IProgramaAcademicoRepositorio.d.ts.map