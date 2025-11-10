export default class CalculadoraError extends Error {

    constructor(mensaje: string) {
        super(mensaje);
        this.name = "CalculadoraError"
        Object.setPrototypeOf(this, CalculadoraError.prototype);
    }

}