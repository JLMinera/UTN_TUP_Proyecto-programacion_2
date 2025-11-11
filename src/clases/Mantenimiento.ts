import Estado from "./Estado";
import Vehiculo from "./Vehiculo";
import MantenimientoError from "../clasesDeError/MantenimientoError";

export default class Mantenimiento extends Estado {
    private costo: number;
    private static vehiculosEnMantenimiento: Map<string, Vehiculo> = new Map();

    constructor(costo: number, fechaInicio: Date, fechaFin: Date) {
        super(fechaInicio, fechaFin);
        if (!Number.isFinite(costo) || costo < 0) {
            throw new MantenimientoError("El costo debe ser un número positivo");
        }
        this.costo = costo;
    }

    public setCosto(value: number): void {
        if (!Number.isFinite(value) || value < 0) {
            throw new MantenimientoError("El costo debe ser un número positivo");
        }
        this.costo = value;
    }

    public getCosto(): number {
        return this.costo;
    }

    public getVehiculos(): Map<string, Vehiculo> {
        return Mantenimiento.vehiculosEnMantenimiento;
    }

    public quitarVehiculo(patente: string): boolean {
        if (this.getVehiculos().has(patente)) {
            this.getVehiculos().delete(patente);
            return true;
        } else {
            throw new MantenimientoError(`No se encontró ningún vehículo con patente ${patente} para eliminar.`);
        }
    }

    public consultarEstado(patente: string): boolean {
        return this.getVehiculos().has(patente);
    }

    public agregarVehiculo(patente: string, vehiculo: Vehiculo): void {
        this.getVehiculos().set(patente, vehiculo);
    }

}
