import Vehiculo from "./Vehiculo";

export default class VehiculoSuv extends Vehiculo {

    constructor(patente: string, kilometraje: number) {
        super(patente, kilometraje)
    }
}