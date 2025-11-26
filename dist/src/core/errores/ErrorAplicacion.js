export class ErrorAplicacion extends Error {
    codigo;
    esOperativo = true;
    constructor(codigo, mensaje) {
        super(mensaje);
        this.codigo = codigo;
        this.name = codigo;
        Object.setPrototypeOf(this, ErrorAplicacion.prototype);
    }
    ;
}
;
// Error cuando un recurso no existe
export class ErrorNoEncontrado extends ErrorAplicacion {
    constructor(mensaje = 'El recurso solicitado no existe') {
        super('NO_ENCONTRADO', mensaje);
        Object.setPrototypeOf(this, ErrorNoEncontrado.prototype);
    }
    ;
}
;
// Error cuando hay conflicto o duplicidad
export class ErrorConflicto extends ErrorAplicacion {
    constructor(mensaje = 'El recurso ya existe o entra en conflicto con otro') {
        super('CONFLICTO', mensaje);
        Object.setPrototypeOf(this, ErrorConflicto.prototype);
    }
    ;
}
;
// Error cuando los datos de entrada son invalidos
export class ErrorValidacion extends ErrorAplicacion {
    constructor(mensaje = 'Los datos proporcionados son invalidos o incompletos') {
        super('ERROR_VALIDACION', mensaje);
        Object.setPrototypeOf(this, ErrorValidacion.prototype);
    }
    ;
}
;
// Error cuando la operacion viola una regla de negocio
export class ErrorReglaNegocio extends ErrorAplicacion {
    constructor(mensaje = 'La operacion viola una regla de negocio') {
        super('ERROR_REGLA_NEGOCIO', mensaje);
        Object.setPrototypeOf(this, ErrorReglaNegocio.prototype);
    }
    ;
}
;
//# sourceMappingURL=ErrorAplicacion.js.map