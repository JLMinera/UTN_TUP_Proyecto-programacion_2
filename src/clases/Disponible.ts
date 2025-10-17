import Estado from "./Estado";
import Vehiculo from "./Vehiculo";

export default class Disponible extends Estado {

    constructor(fechaInicio: Date, fechaFin: Date) {
        super(fechaInicio, fechaFin);
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.vehiculos = new Map<string, Vehiculo>();
    }


    }
