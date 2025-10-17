import Estado from "./Estado";
import Vehiculo from "./Vehiculo";

export default class Mantenimiento extends Estado{
    private costo: number;

    constructor(costo:number, fechaInicio: Date, fechaFin: Date) {
        super(fechaInicio, fechaFin);
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.vehiculos = new Map<string, Vehiculo>();
        this.costo=costo;
    }

    public setCosto(value:number){
        this.costo=value;
    }

    public getCosto():number{
        return this.costo;
    }


}