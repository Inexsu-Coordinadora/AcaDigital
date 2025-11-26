export declare class ErrorAplicacion extends Error {
    readonly codigo: string;
    readonly esOperativo: boolean;
    constructor(codigo: string, mensaje: string);
}
export declare class ErrorNoEncontrado extends ErrorAplicacion {
    constructor(mensaje?: string);
}
export declare class ErrorConflicto extends ErrorAplicacion {
    constructor(mensaje?: string);
}
export declare class ErrorValidacion extends ErrorAplicacion {
    constructor(mensaje?: string);
}
export declare class ErrorReglaNegocio extends ErrorAplicacion {
    constructor(mensaje?: string);
}
//# sourceMappingURL=ErrorAplicacion.d.ts.map