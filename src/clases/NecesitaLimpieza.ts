import Estado from "./Estado";
import Vehiculo from "./Vehiculo";

export default class NecesitaLimpieza extends Estado {

    private distanciaRecorrida: number;
    private static vehiculosNecesitaLimpieza: Map<string, Vehiculo> = new Map();

    constructor(distanciaRecorrida: number, fechaInicio: Date, fechaFin: Date) {
        super(fechaInicio, fechaFin);
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.distanciaRecorrida = distanciaRecorrida;
    }

    public getDistanciaRecorrida(): number {
        return this.distanciaRecorrida;
    }

    public setDistanciaRecorrida(value: number): void {
        this.distanciaRecorrida = value;
    }

    /* public agregarVehiculo(patente: string, vehiculo: Vehiculo): void {
        NecesitaLimpieza.vehiculos.set(patente, vehiculo);
    } */
}
