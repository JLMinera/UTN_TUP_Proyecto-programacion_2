import Estado from "./Estado";
import Vehiculo from "./Vehiculo";

export default class Reserva extends Estado{
    private vehiculo: Vehiculo;

    constructor(vehiculo:Vehiculo, fechaInicio: number, fechaFin:number ){
        super(fechaInicio, fechaFin)
        this.vehiculo=vehiculo;
    }

    public setVehiculo(value:Vehiculo){
        this.vehiculo=value;
    }

    public getVehiculo(){
        this.vehiculo;

}
}