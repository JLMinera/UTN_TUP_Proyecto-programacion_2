import Estado from "./Estado";
import Vehiculo from "./Vehiculo";

export default class Mantenimiento extends Estado {
    private costo: number;
    private static vehiculosEnMantenimiento: Map<string, Vehiculo> = new Map();

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

    public getVehiculos(): Map<string, Vehiculo> {
        return Mantenimiento.vehiculosEnMantenimiento;
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

    public getUltimoMantenimientoKm(): number {
        return 1;
    }

    public getUltimoMantenimientoFecha(): Date {
        return new Date;
    }
}