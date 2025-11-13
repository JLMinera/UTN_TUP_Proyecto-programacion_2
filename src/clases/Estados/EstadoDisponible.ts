import EstadoError from "../../clasesDeError/EstadoError";
import EstadoVehiculo from "../../interfaz/EstadoVehiculo";
import GestorDeVehiculo from "../GestorDeVehiculo";
import Cliente from "../Personas/Cliente";
import EstadoReservado from "./EstadoReservado";


export default class EstadoDisponible implements EstadoVehiculo {

    public enviarDisponible(gestorVehiculo: GestorDeVehiculo): void {
        throw new EstadoError("Vehiculo ya se encuentra en Disponible");
    }

    public enviarReservar(gestorVehiculo: GestorDeVehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {
        gestorVehiculo.setEstado(new EstadoReservado(cliente, fechaInicio, fechaFin));
    }

    public enviarMantenimiento(gestorVehiculo: GestorDeVehiculo, costo: number, fechaInicio: Date, fechaFin: Date): void {
        throw new EstadoError("Vehiculo debe reservarse antes de enviar a mantenimiento");
    }

    public enviarNecesitaLimpieza(gestorVehiculo: GestorDeVehiculo, distanciaRecorrida: number, fechaInicio: Date, fechaFin: Date): void {
        throw new EstadoError("Vehiculo debe reservarse antes de enviar a necesita limpieza");
    }
    
}