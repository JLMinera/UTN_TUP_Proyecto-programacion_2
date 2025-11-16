import Temporada from "./Temporada";

export default class TemporadaMedia extends Temporada {

    constructor(fechaInicio: Date, fechaFin: Date) {
        super(fechaInicio, fechaFin, 1);
    }
}