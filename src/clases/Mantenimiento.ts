import Estado from "./Estado";

export default class Mantenimiento extends Estado{
    private costo: number;
    private fecha: number;

    constructor(costo:number, fecha:number, fechaIinicio:number, fechaFin:number){
        super(fechaIinicio, fechaFin)
        this.costo=costo;
        this.fecha=fecha;
    }

    public setCosto(value:number){
        this.costo=value;
    }

    public getCosto():number{
        return this.costo;
    }

    public setFecha(value:number){
        this.fecha=value;
    }

    public getFecha():number{
        return this.fecha;
    }

}