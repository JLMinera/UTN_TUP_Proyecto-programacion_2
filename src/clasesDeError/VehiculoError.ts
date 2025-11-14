export default class VehiculoError extends Error {

    constructor(mensaje: string) {
        
        super(mensaje);
        this.name = "VehiculoError"
        Object.setPrototypeOf(this, VehiculoError.prototype);
    }
}