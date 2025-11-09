import Estado from "./Estado";
import Vehiculo from "./Vehiculo";

export default class Disponible extends Estado {
    private static vehiculosDisponibles: Map<string, Vehiculo> = new Map();

    constructor(fechaInicio: Date, fechaFin: Date) {
        super(fechaInicio, fechaFin);
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    public getVehiculos(): Map<string, Vehiculo> {
        return Disponible.vehiculosDisponibles;
    }

    public quitarVehiculo(patente: string): boolean {
        if (this.getVehiculos().has(patente)) {
            this.getVehiculos().delete(patente);
            //console.log(`Vehículo con patente ${patente} eliminado correctamente.`);
            return true;
        } else {
            throw new Error(`No se encontró ningún vehículo con patente ${patente} para eliminar.`);
        }
    }

    public consultarEstado(patente: string): boolean {
        return this.getVehiculos().has(patente);
    }

    public agregarVehiculo(patente: string, vehiculo: Vehiculo): void {
        this.getVehiculos().set(patente, vehiculo);
    }
}
