import Temporada from "./Temporada";

export default class TemporadaAlta extends Temporada {
    constructor(fechaInicio: Date, fechaFin: Date){
        super(fechaInicio, fechaFin, 1.2);
    }
}