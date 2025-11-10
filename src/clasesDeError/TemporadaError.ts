export default class TemporadaError extends Error {

    constructor(mensaje: string) {
        super(mensaje);
        this.name = "TemporadaError"
        Object.setPrototypeOf(this, TemporadaError.prototype);
    }

}