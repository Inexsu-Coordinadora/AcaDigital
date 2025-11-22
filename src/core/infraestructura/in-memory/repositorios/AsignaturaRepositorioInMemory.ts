import type { IAsignaturaRepositorio } from '../../../dominio/interfaces/repositorio/IAsignaturaRepositorio.js';
import type { IAsignatura } from '../../../dominio/interfaces/IAsignatura.js';
import { Asignatura } from '../../../dominio/entidades/asignatura/Asignatura.js';

export class AsignaturaRepositorioInMemory implements IAsignaturaRepositorio {
    private asignaturas: Asignatura[] = []; 
    private nextId = 1;

    async guardar(asignatura: IAsignatura): Promise<IAsignatura> {
        const id = asignatura.getId();
        const index = this.asignaturas.findIndex(a => a.getId() === id);

        if (id && index !== -1) {

            this.asignaturas.splice(index, 1); 
            
            this.asignaturas.push(asignatura as Asignatura);
            return asignatura;
            
        } else if (id && index === -1) {

            this.asignaturas.push(asignatura as Asignatura);
            
            if (id >= this.nextId) {
                this.nextId = id + 1;
            }
            return asignatura;
            
        } else {
            const nuevoId = this.nextId++;
            
            const nueva = new Asignatura(
                asignatura.getNombre(),
                asignatura.getCargaHoraria(),
                asignatura.getTipo(),
                nuevoId,
                asignatura.getFechaCreacion(),
                asignatura.getFechaActualizacion()
            );
            this.asignaturas.push(nueva);
            return nueva;
        }
    }

    async obtenerPorId(id: number): Promise<IAsignatura | null> {
        return this.asignaturas.find(a => a.getId() === id) || null;
    }

    async obtenerTodos(): Promise<IAsignatura[]> {
        return this.asignaturas;
    }

    async eliminar(id: number): Promise<void> {
        this.asignaturas = this.asignaturas.filter(a => a.getId() !== id);
    }

    async obtenerPorNombre(nombre: string): Promise<IAsignatura | null> {
        const nombreLower = nombre.trim().toLowerCase();
        return this.asignaturas.find(a => a.getNombre().toLowerCase() === nombreLower) || null;
    }
}