import Estado from "./Estado";

export default class Disponible extends Estado{

    constructor(fechaInicio:number, fechaFin:number){
        super(fechaInicio, fechaFin)
    }
}