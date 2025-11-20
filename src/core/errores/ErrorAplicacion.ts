export class errorAplicacion extends Error {

    public readonly codigo: string;
    public readonly esOperativo: boolean = true;

    constructor(codigo: string, mensaje: string) {
        super(mensaje);
        this.codigo = codigo;
        this.name = codigo;

        Object.setPrototypeOf(this, errorAplicacion.prototype);
    };
};

// Error cuando un recurso no existe
export class ErrorNoEncontrado extends errorAplicacion {
    constructor(mensaje: string = 'El recurso solicitado no existe') {
        super('NO_ENCONTRADO', mensaje);
        Object.setPrototypeOf(this, errorAplicacion.prototype);
    };
};

// Error cuando hay conflicto o duplicidad
export class ErrorConflicto extends errorAplicacion {
    constructor(mensaje: string = 'El recurso ya existe o entra en conflicto con otro') {
        super('CONFLICTO', mensaje);
        Object.setPrototypeOf(this, ErrorConflicto.prototype);
    };
};

// Error cuando los datos de entrada son invalidos
export class ErrorValidacion extends errorAplicacion {
    constructor(mensaje: string = 'Los datos proporcionados son invalidos o incompletos') {
        super('ERROR_VALIDACION', mensaje);
        Object.setPrototypeOf(this, ErrorValidacion.prototype);
    };
};
