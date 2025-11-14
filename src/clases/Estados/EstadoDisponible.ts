import EstadoError from "../../clasesDeError/EstadoError";
import GestorDeVehiculo from "../GestorDeVehiculo";
import Cliente from "../Personas/Cliente";
import EstadoReservado from "./EstadoReservado";
import Estados from "./Estados";


export default class EstadoDisponible extends Estados {

    public enviarDisponible(gestorVehiculo: GestorDeVehiculo): void {
        throw new EstadoError("Vehiculo ya se encuentra en Disponible");
    }

    public enviarReservar(gestorVehiculo: GestorDeVehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {
        gestorVehiculo.setEstado(new EstadoReservado(cliente, fechaInicio, fechaFin));
    }

    public enviarMantenimiento(gestorVehiculo: GestorDeVehiculo, costo: number, fecha: Date): void {
        throw new EstadoError("Vehiculo debe reservarse antes de enviar a mantenimiento");
    }

    public enviarNecesitaLimpieza(gestorVehiculo: GestorDeVehiculo, distanciaRecorrida: number, fecha: Date): void {
        throw new EstadoError("Vehiculo debe reservarse antes de enviar a necesita limpieza");
    }

}