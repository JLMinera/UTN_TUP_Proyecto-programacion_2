import Estado from "./Estado";

export default class Mantenimiento extends Estado{
    private costo: number;
    private fechaInicio: Date;
    private fechaFin: Date;

    constructor(costo: number, fechaInicio: Date, fechaFin: Date){
        super();
        this.fechaInicio=fechaInicio
        this.fechaFin=fechaFin;
        this.costo=costo;
    }

    public setCosto(value:number){
        this.costo=value;
    }

    public getCosto():number{
        return this.costo;
    }
}