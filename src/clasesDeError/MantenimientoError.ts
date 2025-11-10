export default class MantenimientoError extends Error {

    constructor(mensaje: string) {
        super(mensaje);
        this.name = "MantenimientoError"
        Object.setPrototypeOf(this, MantenimientoError.prototype);
    }

}