import { PeriodoAcademico } from '../../../dominio/entidades/periodo-academico/PeriodoAcademico.js';
import type { IPeriodoAcademico } from '../../../dominio/interfaces/IPeriodoAcademico.js';
import type { IPeriodoRepositorio } from '../../../dominio/interfaces/repositorio/IPeriodoAcademicoRepositorio.js';
import type { ActualizarPeriodoDTO } from '../Dtos/ActualizarPeriodoDTO.js';

export class ActualizarPeriodoUseCase {
    constructor(private repo: IPeriodoRepositorio) { };

    async ejecutar(id: string, input: ActualizarPeriodoDTO): Promise<IPeriodoAcademico> {
        const periodoProps = await this.repo.obtenerPorId(id);
        if (!periodoProps) {
            throw new Error('Periodo no encontrado');
        };

        const periodoEntidad = new PeriodoAcademico(periodoProps);

        // Validaciones
        if (input.nombre && input.nombre !== periodoEntidad.nombre) {
            const existe = await this.repo.obtenerPorNombre(input.nombre);
            if (existe) throw new Error('Nombre ya en uso');
            periodoEntidad.nombre = input.nombre;
        };

        const nuevaFechaInicio = input.fechaInicio ? new Date(input.fechaInicio) : periodoEntidad.fechaInicio;
        const nuevaFechaFin = input.fechaFin ? new Date(input.fechaFin) : periodoEntidad.fechaFin;

        if (nuevaFechaFin <= nuevaFechaInicio) {
            throw new Error('La fecha de fin debe ser posterior a la fecha de inicio.');
        }

        periodoEntidad.fechaInicio = nuevaFechaInicio;
        periodoEntidad.fechaFin = nuevaFechaFin;

        if (input.estado && input.estado !== periodoEntidad.estado) {
            if (input.estado === 'activo') {
                periodoEntidad.activar();
            } else if (input.estado === 'cerrado') {
                periodoEntidad.cerrar();
            } else if (input.estado === 'inactivo') {
                throw new Error('Transición de estado inválida: no se puede pasar a "inactivo" directamente.');
            }
        }

        if (periodoEntidad.estado === 'activo') {
            const periodosTraslapados = await this.repo.obtenerPeriodosActivosTraslapados(
                periodoEntidad.fechaInicio,
                periodoEntidad.fechaFin,
                periodoEntidad.id
            );
            if (periodosTraslapados && periodosTraslapados.length > 0) {
                throw new Error('El período se solapa con otro período activo existente.');
            }
        }

        periodoEntidad.updatedAt = new Date(); 

        

                const cambios: Partial<IPeriodoAcademico> = {
            nombre: periodoEntidad.nombre,
            fechaInicio: periodoEntidad.fechaInicio,
            fechaFin: periodoEntidad.fechaFin,
            estado: periodoEntidad.estado,
            updatedAt: periodoEntidad.updatedAt
        };

        return await this.repo.actualizar(id, cambios);
    };
};
