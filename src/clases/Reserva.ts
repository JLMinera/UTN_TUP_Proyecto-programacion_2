import Cliente from "./Cliente";
import Estado from "./Estado";
import Vehiculo from "./Vehiculo";

export default class Reserva extends Estado {
    public cliente: Cliente;
    private static vehiculosEnReserva: Map<string, Vehiculo> = new Map();

    constructor(cliente: Cliente, fechaInicio: Date, fechaFin: Date) {
        super(fechaInicio, fechaFin);
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.cliente = cliente;
    }

    public getVehiculos(): Map<string, Vehiculo> {
        return Reserva.vehiculosEnReserva;
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
