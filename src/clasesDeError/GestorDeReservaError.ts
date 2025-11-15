export default class GestorDeReservaError extends Error {

    constructor(mensaje: string) {
        
        super(mensaje);
        this.name = "GestorDeReservaError"
        Object.setPrototypeOf(this, GestorDeReservaError.prototype);
    }
}