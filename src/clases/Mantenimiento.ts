import Estado from "./Estado";
import Vehiculo from "./Vehiculo";

export default class Mantenimiento extends Estado {

    private costo: number;
    private vehiculosEnMantenimiento: Map<string, Vehiculo> = new Map();

    constructor(costo: number, fechaInicio: Date, fechaFin: Date) {
        super(fechaInicio, fechaFin);
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.costo = costo;
    }

    public setCosto(value: number): void {
        this.costo = value;
    }

    public getCosto(): number {
        return this.costo;
    }
}