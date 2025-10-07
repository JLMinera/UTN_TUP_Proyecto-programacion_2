import Persona from "./persona";

export default class Cliente extends Persona {

    constructor(nombre: string, apellido: string, dni: number) {
        super(nombre, apellido, dni);
    }
}