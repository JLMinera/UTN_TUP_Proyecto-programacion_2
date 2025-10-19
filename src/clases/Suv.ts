import Vehiculo from "./Vehiculo";

export default class Suv extends Vehiculo {

    constructor(patente: string, kilometraje: number, tarifaBase: number, limiteDiarioKm: number,adicionalPorKm: number, seguro: number) {
        super(patente, kilometraje, tarifaBase, adicionalPorKm, limiteDiarioKm,seguro)
    }
}