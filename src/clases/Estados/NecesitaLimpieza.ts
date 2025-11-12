import Estado from "./Estado";
import Vehiculo from "../Vehiculos/Vehiculo";
import NecesitaLimpiezaError from "../../clasesDeError/NecesitaLimpiezaError";

export default class NecesitaLimpieza extends Estado {
    private distanciaRecorrida!: number;
    private static vehiculosNecesitaLimpieza: Map<string, Vehiculo> = new Map();

    constructor(distanciaRecorrida: number, fechaInicio: Date, fechaFin: Date) {
        super(fechaInicio, fechaFin);
        this.setDistanciaRecorrida(distanciaRecorrida);
    }

    public getDistanciaRecorrida(): number {
        return this.distanciaRecorrida;
    }

    public setDistanciaRecorrida(value: number): void {
        if (!Number.isFinite(value) || value < 0) {
            throw new NecesitaLimpiezaError("La distancia recorrida debe ser un número positivo");
        }
        this.distanciaRecorrida = value;
    }

    public getVehiculos(): Map<string, Vehiculo> {
        return NecesitaLimpieza.vehiculosNecesitaLimpieza;
    }

    public quitarVehiculo(patente: string): boolean {
        if (this.getVehiculos().has(patente)) {
            this.getVehiculos().delete(patente);
            return true;
        } else {
            throw new NecesitaLimpiezaError(`No se encontró ningún vehículo con patente ${patente} para eliminar`);
        }
    }

    public consultarEstado(patente: string): boolean {
        return this.getVehiculos().has(patente);
    }

    public agregarVehiculo(patente: string, vehiculo: Vehiculo): void {
        this.getVehiculos().set(patente, vehiculo);
    }
}
