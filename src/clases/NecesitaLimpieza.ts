import Estado from "./Estado";

export default class NecesitaMantenimiento extends Estado{
    distanciaRecorrida:number;

    constructor(distanciaRecorrida:number, fechaInicio:number, fechaFin:number){
        super(fechaInicio, fechaFin)
        this.distanciaRecorrida=distanciaRecorrida;
    }

    public setdistanciaRecorrida(value:number){
        this.distanciaRecorrida=value;
    }

}