import Vehiculo from "./Vehiculo"; 

export default class Sedan extends Vehiculo{
   
    constructor (patente: string, kilometraje: number){
            super (patente, kilometraje)
        }
}