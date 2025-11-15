export default class PersonaError extends Error {

    constructor(mensaje: string) {

        super(mensaje);
        this.name = "PersonaError"
        Object.setPrototypeOf(this, PersonaError.prototype);
    }
}