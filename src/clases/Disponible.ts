import Estado from "./Estado";
import Vehiculo from "./Vehiculo";

export default class Disponible extends Estado {

    private static vehiculosDisponibles: Map<string, Vehiculo> = new Map();

    constructor(fechaInicio: Date, fechaFin: Date) {
        super(fechaInicio, fechaFin);
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }
}
