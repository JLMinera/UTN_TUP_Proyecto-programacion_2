export default class NecesitaLimpiezaError extends Error {

    constructor(mensaje: string) {
        super(mensaje);
        this.name = "NecesitaLimpiezaError"
        Object.setPrototypeOf(this, NecesitaLimpiezaError.prototype);
    }



}