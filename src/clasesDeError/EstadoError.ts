export default class EstadoError extends Error {

    constructor(mensaje: string) {
        
        super(mensaje);
        this.name = "EstadoError"
        Object.setPrototypeOf(this, EstadoError.prototype);
    }

}