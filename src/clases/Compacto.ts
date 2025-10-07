import Vehiculo from "./Vehiculo"; 
import Estado from "./Estado";

export default class Compacto extends Vehiculo{
   
    constructor (patente: string, kilometraje: number, tarifaBase: number, disponible: boolean, estado: Estado){
            super (patente, kilometraje,tarifaBase, disponible,  estado)
        }
}