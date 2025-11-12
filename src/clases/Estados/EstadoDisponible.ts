import EstadoError from "../../clasesDeError/EstadoError";
import EstadoVehiculo from "../../interfaz/EstadoVehiculo";
import GestorDeVehiculo from "../GestorDeVehiculo";
import EstadoReservado from "./EstadoReservado";


export default class EstadoDisponible implements EstadoVehiculo {

    enviarDisponible(gestorVehiculo: GestorDeVehiculo): void {
        throw new EstadoError("Vehiculo ya se encuentra en Disponible");
    }

    enviarReservar(gestorVehiculo: GestorDeVehiculo): void {
        gestorVehiculo.setEstado(new EstadoReservado());
    }

    disparadorMantenimiento(gestorVehiculo: GestorDeVehiculo): void {
        
    }
    
}