import Vehiculo from "./Vehiculo";

export default class VehiculoCompacto extends Vehiculo {

    constructor(patente: string, kilometraje: number) {
        super(patente, kilometraje)
    }
}