import { IPlanEstudio } from "../../interfaces/IPlanEstudio.js";

export interface IPlanEstudioRepositorio {
    existeVinculo(programaId: string, asignaturaId: number): Promise<boolean>; 
    guardar(plan: IPlanEstudio): Promise<IPlanEstudio>;
};