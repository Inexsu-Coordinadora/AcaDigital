export class PlanEstudio {
    programaId;
    asignaturaId;
    semestreNivel;
    creditosCarga;
    createdAt;
    updatedAt;
    constructor(props) {
        if (props.semestreNivel <= 0 || !Number.isInteger(props.semestreNivel)) {
            throw new Error('El semestre/nivel debe ser un entero positivo');
        }
        ;
        if (props.creditosCarga <= 0) {
            throw new Error('Los creditos/carga horaria deben ser mayor que cero');
        }
        ;
        this.programaId = props.programaId;
        this.asignaturaId = props.asignaturaId;
        this.semestreNivel = props.semestreNivel;
        this.creditosCarga = props.creditosCarga;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    ;
}
;
//# sourceMappingURL=PlanEstudio.js.map