import Estado from "./Estado";
import Vehiculo from "./Vehiculo";
import DisponibleError from "../clasesDeError/DisponibleError";

export default class Disponible extends Estado {
    private static vehiculosDisponibles: Map<string, Vehiculo> = new Map();

    public getVehiculos(): Map<string, Vehiculo> {
        return Disponible.vehiculosDisponibles;
    }

    public quitarVehiculo(patente: string): boolean {
        if (this.getVehiculos().has(patente)) {
            this.getVehiculos().delete(patente);
            return true;
        } else {
            throw new DisponibleError(`No se encontró ningún vehículo con patente ${patente} para eliminar.`);
        }
    }

    public consultarEstado(patente: string): boolean {
        return this.getVehiculos().has(patente);
    }

    public agregarVehiculo(patente: string, vehiculo: Vehiculo): void {
        if (!vehiculo) {
            throw new DisponibleError("Vehículo inválido proporcionado.");
        }
        this.getVehiculos().set(patente, vehiculo);
    }
}
