import EstadoError from "../../clasesDeError/EstadoError";
import EstadoVehiculo from "../../interfaz/EstadoVehiculo";
import GestorDeVehiculo from "../GestorDeVehiculo";
import EstadoMantenimiento from "./EstadoMantenimiento";
import EstadoNecesitaLimpieza from "./EstadoNecesitaLimpieza";

export default class EstadoReservado implements EstadoVehiculo {

    enviarDisponible(gestorVehiculo: GestorDeVehiculo): void {
        throw new EstadoError("Vehiculo debe evaluarse si necesita mantenimiento o limpieza");
    }

    enviarReservar(gestorVehiculo: GestorDeVehiculo): void {
        throw new EstadoError("Vehiculo ya se encuentra en Reservado");
    }

    disparadorMantenimiento(gestorVehiculo: GestorDeVehiculo): void {
        const ultimoMantenimientoKm = gestorVehiculo.getKilometrajeActual() - gestorVehiculo.getUltimoKmMantenimiento();
        const fechaActual = new Date();
        const meses = (fechaActual.getFullYear() - gestorVehiculo.getFechaUltimoMantenimiento().getFullYear()) * 12
            + (fechaActual.getMonth() - gestorVehiculo.getFechaUltimoMantenimiento().getMonth());
        const alquileres = gestorVehiculo.getContadorAcumulado() % 5;

        if (ultimoMantenimientoKm > 10000 || meses > 12 || alquileres === 0) {
            gestorVehiculo.setEstado(new EstadoMantenimiento());
        }
        else {
            gestorVehiculo.setEstado(new EstadoNecesitaLimpieza());
        }
    }
    
}