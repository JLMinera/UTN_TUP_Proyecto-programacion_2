import Vehiculo from "./Vehiculo"; 

export default class Compacto extends Vehiculo{
   
    constructor (patente: string, kilometraje: number){
            super (patente, kilometraje)
        }
}