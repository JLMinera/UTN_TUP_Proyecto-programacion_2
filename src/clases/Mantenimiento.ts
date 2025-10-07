import Estado from "./Estado";

export default class Mantenimiento extends Estado{
    private costo: number;

    constructor(costo:number, fechaInicio:number, fechaFin:number){
        super(fechaInicio, fechaFin)
        this.costo=costo;
    }

    public setCosto(value:number){
        this.costo=value;
    }

    public getCosto():number{
        return this.costo;
    }


}