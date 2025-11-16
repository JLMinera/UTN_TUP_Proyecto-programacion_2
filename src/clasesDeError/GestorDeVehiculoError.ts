export default class GestorDeVehiculoError extends Error {

    constructor(mensaje: string) {

        super(mensaje);
        this.name = "GestorDeVehiculoError"
        Object.setPrototypeOf(this, GestorDeVehiculoError.prototype);
    }
}