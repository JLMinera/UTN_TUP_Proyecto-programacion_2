import EstadoError from "../../clasesDeError/EstadoError";
import EstadoVehiculo from "../../interfaz/EstadoVehiculo";
import GestorDeVehiculo from "../GestorDeVehiculo";
import EstadoDisponible from "./EstadoDisponible";
import EstadoReservado from "./EstadoReservado";


export default class EstadoNecesitaLimpieza implements EstadoVehiculo {

    enviarDisponible(gestorVehiculo: GestorDeVehiculo): void {
        gestorVehiculo.setEstado(new EstadoDisponible());
    }

    enviarReservar(gestorVehiculo: GestorDeVehiculo): void {
        gestorVehiculo.setEstado(new EstadoReservado());
    }

    disparadorMantenimiento(gestorVehiculo: GestorDeVehiculo): void {
        throw new EstadoError("Vehiculo ya se encuentra en Necesita Limpieza");
    }
    
}