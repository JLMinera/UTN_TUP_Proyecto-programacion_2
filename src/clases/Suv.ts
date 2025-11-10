import Vehiculo from "./Vehiculo";

export default class Suv extends Vehiculo {

    constructor(patente: string, kilometraje: number) {
        super(patente, kilometraje)
    }
}