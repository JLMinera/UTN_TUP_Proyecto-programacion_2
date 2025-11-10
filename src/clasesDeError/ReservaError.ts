export default class ReservaError extends Error {

    constructor(mensaje: string) {
        super(mensaje);
        this.name = "ReservaError"
        Object.setPrototypeOf(this, ReservaError.prototype);
    }
}