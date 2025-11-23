export interface IOfertaAcademica {
    id: number;
    periodoId: string;
    programaId: string;
    asignaturaId: number;
    grupo: string;
    cupoDisponible: number;
    fechaCreacion: Date;
    fechaActualizacion: Date;

}
export interface IOfertaAcademicaRepositorio {
    guardar(oferta: IOfertaAcademica): Promise<IOfertaAcademica>;
    buscarPorClaveUnica(periodoId: string, programaId: string, asignaturaId: number, grupo: string): Promise<IOfertaAcademica | null>;
}