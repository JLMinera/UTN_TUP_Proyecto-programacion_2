import Cliente from "../Personas/Cliente";
import Estado from "./Estado";
import Vehiculo from "../Vehiculos/Vehiculo";
import ReservaError from "../../clasesDeError/ReservaError";

export default class Reserva extends Estado {
    private cliente!: Cliente;
    private static vehiculosEnReserva: Map<string, Vehiculo> = new Map();

    constructor(cliente: Cliente, fechaInicio: Date, fechaFin: Date) {
        super(fechaInicio, fechaFin);
        this.setCliente(cliente);
    }

    public getCliente(): Cliente {
        return this.cliente;
    }

    public setCliente(cliente: Cliente): void {
        if (!cliente) {
            throw new ReservaError("El cliente no puede ser nulo");
        }
        this.cliente = cliente;
    }

    public getVehiculos(): Map<string, Vehiculo> {
        return Reserva.vehiculosEnReserva;
    }

    public agregarVehiculo(patente: string, vehiculo: Vehiculo): void {
        if (!vehiculo || !patente) {
            throw new ReservaError("No se puede agregar un vehículo inválido");
        }
        Reserva.vehiculosEnReserva.set(patente, vehiculo);
    }

    public quitarVehiculo(patente: string): boolean {
        if (Reserva.vehiculosEnReserva.has(patente)) {
            Reserva.vehiculosEnReserva.delete(patente);
            return true;
        } else {
            throw new ReservaError(
                `No se encontró ningún vehículo con patente ${patente}`
            );
        }
    }

    public consultarEstado(patente: string): boolean {
        return Reserva.vehiculosEnReserva.has(patente);
    }
}
