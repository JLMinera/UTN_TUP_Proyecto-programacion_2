import Estado from "./Estado";
import Vehiculo from "./Vehiculo";

export default class Reserva extends Estado {
    private vehiculos: Map<string, Vehiculo>;
    public fechaInicio: Date;
    public fechaFin: Date;

    constructor(fechaInicio: Date, fechaFin: Date) {
        super(fechaInicio, fechaFin);
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.vehiculos = new Map<string, Vehiculo>();
    }

    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    public setFechaInicio(value: Date): void {
        this.fechaInicio = value;
    }

    public getFechaFin(): Date {
        return this.fechaFin;
    }

    public setFechaFin(value: Date): void {
        this.fechaFin = value;
    }

    public agregarVehiculo(patente: string, vehiculo: Vehiculo): void {
        this.vehiculos.set(patente, vehiculo);
    }

    public quitarVehiculo(patente: string): void {
        this.vehiculos.delete(patente);
    }
}