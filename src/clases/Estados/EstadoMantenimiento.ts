import EstadoError from "../../clasesDeError/EstadoError";
import EstadoVehiculo from "../../interfaz/EstadoVehiculo";
import GestorDeVehiculo from "../GestorDeVehiculo";


export default class EstadoDisponible implements EstadoVehiculo {

    enviarDisponible(gestorVehiculo: GestorDeVehiculo): void {
        gestorVehiculo.setEstado(new EstadoDisponible());
    }

    enviarReservar(gestorVehiculo: GestorDeVehiculo): void {
        throw new EstadoError("Vehiculo debe ir a Disponible");
    }

    disparadorMantenimiento(gestorVehiculo: GestorDeVehiculo): void {
        throw new EstadoError("Vehiculo ya se encuentra en Mantenimiento");
    }
    
}