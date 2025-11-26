import type { IOfertaAcademica, IOfertaAcademicaRepositorio } from '../../../dominio/interfaces/IOfertaAcademica.js';
export declare class OfertaAcademicaPGRepositorio implements IOfertaAcademicaRepositorio {
    private mapearFilaAOferta;
    guardar(oferta: IOfertaAcademica): Promise<IOfertaAcademica>;
    buscarPorClaveUnica(periodoId: string, programaId: string, asignaturaId: number, grupo: string): Promise<IOfertaAcademica | null>;
}
//# sourceMappingURL=oferta-academica.pg.repository.d.ts.map