export default class DisponibleError extends Error {

    constructor(mensaje: string) {
        super(mensaje);
        this.name = "DisponibleError"
        Object.setPrototypeOf(this, DisponibleError.prototype);
    }

}