import EstadoError from "../../clasesDeError/EstadoError";
import GestorDeVehiculo from "../GestorDeVehiculo";
import Cliente from "../Personas/Cliente";
import EstadoDisponible from "./EstadoDisponible";
import Estados from "./Estados";

export default class EstadoMantenimiento extends Estados {

    private costo: number;

    constructor(costo: number, fecha: Date) {
        super();
        if (!Number.isFinite(costo) || costo < 0) {
            throw new EstadoError("El costo debe ser un número positivo");
        }
        this.costo = costo;
        this.setFecha(fecha);
    }

    public enviarDisponible(gestorVehiculo: GestorDeVehiculo): void {
        gestorVehiculo.setEstado(new EstadoDisponible());
    }

    public enviarReservar(gestorVehiculo: GestorDeVehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {
        throw new EstadoError("Vehiculo debe ir a Disponible");
    }

    public enviarMantenimiento(gestorVehiculo: GestorDeVehiculo, costo: number, fecha: Date): void {
        throw new EstadoError("Vehiculo ya se encuentra en Mantenimiento");
    }

    public enviarNecesitaLimpieza(gestorVehiculo: GestorDeVehiculo, distanciaRecorrida: number, fecha: Date): void {
        throw new EstadoError("Vehiculo debe ir a Disponible");
    }

    public setCosto(value: number): void {
        if (!Number.isFinite(value) || value < 0) {
            throw new EstadoError("El costo debe ser un número positivo");
        }
        this.costo = value;
    }

    public getCosto(): number {
        return this.costo;
    }
}