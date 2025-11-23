export interface IOfertaAcademica {
    id: number;
    periodoId: string;
    programaId: string;
    asignaturaId: number;
    grupo: string;
    cupoDisponible: number;
    fechaCreacion: Date;
    fechaActualizacion: Date;

    // Compatibility methods used by tests / legacy callers
    getId?(): number;
    getPeriodoId?(): string;
    getProgramaId?(): string;
    getAsignaturaId?(): number;
    getGrupo?(): string;
    getCupoDisponible?(): number;
    getFechaCreacion?(): Date;
    getFechaActualizacion?(): Date;

}
export interface IOfertaAcademicaRepositorio {
    guardar(oferta: IOfertaAcademica): Promise<IOfertaAcademica>;
    buscarPorClaveUnica(periodoId: string, programaId: string, asignaturaId: number, grupo: string): Promise<IOfertaAcademica | null>;
}