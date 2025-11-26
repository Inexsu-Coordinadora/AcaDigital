import { NivelEducativo, Modalidad } from "./NivelYModalidad.js";
import { Duracion } from "./Duracion.js";
export declare class ProgramaAcademico {
    private readonly _id;
    private _nombre;
    private _descripcion;
    private readonly _nivelEducativo;
    private readonly _modalidad;
    private readonly _duracion;
    constructor(nombre: string, descripcion: string, nivel: NivelEducativo, modalidad: Modalidad, duracion: Duracion, id?: string);
    get id(): string;
    get nombre(): string;
    get descripcion(): string;
    get nivelEducativo(): NivelEducativo;
    get modalidad(): Modalidad;
    get duracion(): Duracion;
    getId(): string;
    getNombre(): string;
    getDescripcion(): string;
    getNivelEducativo(): NivelEducativo;
    getModalidad(): Modalidad;
    getDuracion(): Duracion;
    actualizarInfoGeneral(nuevoNombre: string, nuevaDescripcion: string): void;
    private generarId;
}
//# sourceMappingURL=ProgramaAcademico.d.ts.map