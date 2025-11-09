import Temporada from "./Temporada";

export default class TemporadaBaja extends Temporada {
    constructor(fechaInicio: Date, fechaFin: Date){
        super(fechaInicio, fechaFin, 0.9);
    }
}