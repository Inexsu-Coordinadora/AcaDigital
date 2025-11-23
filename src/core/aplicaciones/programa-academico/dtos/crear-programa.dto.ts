import { Modalidad, NivelEducativo } from "../../../dominio/entidades/programa-academico/NivelYModalidad.js";

export type CrearProgramaDto = {
  nombre: string;
  descripcion: string;
  nivel: NivelEducativo;
  modalidad: Modalidad;
  duracionValor: number;
  duracionUnidad: 'meses' | 'años' | 'semestres' | 'trimestres';
};
