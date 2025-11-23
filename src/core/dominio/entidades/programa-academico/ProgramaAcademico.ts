import { NivelEducativo, Modalidad } from "./NivelYModalidad.js";
import { Duracion } from "./Duracion.js";
import { randomUUID } from "crypto";

export class ProgramaAcademico {
    private readonly _id: string;
    private _nombre: string;
    private _descripcion: string;
    private readonly _nivelEducativo: NivelEducativo;
    private readonly _modalidad: Modalidad;
    private readonly _duracion: Duracion;

    constructor(
        nombre: string,
        descripcion: string,
        nivel: NivelEducativo,
        modalidad: Modalidad,
        duracion: Duracion,
        id?: string
    ){
    if (!nombre || nombre.trim().length === 0) {
      throw new Error('El nombre del programa académico es obligatorio.');
    }
    if (nombre.length > 255) {
      throw new Error('El nombre del programa académico no puede exceder 255 caracteres.');
    }
    if (!descripcion || descripcion.trim().length === 0) {
      throw new Error('La descripción del programa académico es obligatoria.');
    }

    this._id = id ?? this.generarId();
    this._nombre = nombre.trim();
    this._descripcion = descripcion.trim();
    this._nivelEducativo = nivel;
    this._modalidad = modalidad;
    this._duracion = duracion;
    }

    public get id(): string { return this._id; }
    public get nombre(): string { return this._nombre; }
    public get descripcion(): string { return this._descripcion; }
    public get nivelEducativo(): NivelEducativo { return this._nivelEducativo; }
    public get modalidad(): Modalidad { return this._modalidad; }
    public get duracion(): Duracion { return this._duracion; }

  // Backwards-compatible method names expected by tests / older callers
  public getId(): string { return this.id; }
  public getNombre(): string { return this.nombre; }
  public getDescripcion(): string { return this.descripcion; }
  public getNivelEducativo(): NivelEducativo { return this.nivelEducativo; }
  public getModalidad(): Modalidad { return this.modalidad; }
  public getDuracion(): Duracion { return this.duracion; }

  public actualizarInfoGeneral(nuevoNombre: string, nuevaDescripcion: string): void {
    if (!nuevoNombre || nuevoNombre.trim().length === 0) {
      throw new Error('El nuevo nombre del programa académico es obligatorio.');
    }
    if (!nuevaDescripcion || nuevaDescripcion.trim().length === 0) {
      throw new Error('La nueva descripción del programa académico es obligatoria.');
    }
    
    this._nombre = nuevoNombre;
    this._descripcion = nuevaDescripcion;
  }

  private generarId(): string {
    return randomUUID();
  }
}

