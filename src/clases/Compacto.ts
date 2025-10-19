import Vehiculo from "./Vehiculo"; 

export default class Compacto extends Vehiculo{
   
    constructor (patente: string, kilometraje: number, tarifaBase: number, adicionalPorKm: number, limiteDiarioKm: number, seguro: number){
            super (patente, kilometraje,tarifaBase, adicionalPorKm, limiteDiarioKm, seguro)
        }
}