export default class InventarioError extends Error {

    constructor(mensaje: string) {

        super(mensaje);
        this.name = "InventarioError"
        Object.setPrototypeOf(this, InventarioError.prototype);
    }

}