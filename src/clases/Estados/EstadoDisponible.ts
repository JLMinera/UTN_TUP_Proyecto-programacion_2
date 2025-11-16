import EstadoError from "../../clasesDeError/EstadoError";
import GestorDeVehiculo from "../GestorDeVehiculo";
import Cliente from "../Personas/Cliente";
import EstadoReservado from "./EstadoReservado";
import Estados from "./Estados";

/**
 * Representa el estado **Disponible** de un vehículo.
 * 
 * Un vehículo en este estado:
 * - **Puede ser reservado** por un cliente.
 * - **No puede** ser enviado a mantenimiento directamente.
 * - **No puede** pasar a estado "Necesita Limpieza", ya que nunca estuvo en uso.
 * - **No puede** volver a "Disponible" porque ya se encuentra en este estado.
 * 
 * Forma parte del *Patrón State* para gestionar los estados de los vehículos.
 */
export default class EstadoDisponible extends Estados {

    /**
     * Intenta enviar el vehículo nuevamente al estado Disponible.
     * 
     * Como el vehículo **ya está** disponible, se lanza un error.
     * 
     * @param gestorVehiculo - Gestor que administra el vehículo.
     * @throws EstadoError Siempre, porque el vehículo ya está disponible.
     */
    public enviarDisponible(gestorVehiculo: GestorDeVehiculo): void {
        throw new EstadoError("Vehiculo ya se encuentra en Disponible");
    }

    /**
     * Cambia el estado del vehículo a **Reservado**.
     * 
     * Este es el único cambio válido desde el estado Disponible.
     * 
     * @param gestorVehiculo - Gestor que administra el vehículo.
     * @param cliente - Cliente que realiza la reserva.
     * @param fechaInicio - Fecha de inicio de la reserva.
     * @param fechaFin - Fecha de fin de la reserva.
     */
    public enviarReservar(gestorVehiculo: GestorDeVehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {
        gestorVehiculo.setEstado(new EstadoReservado(cliente, fechaInicio, fechaFin));
    }

    /**
     * Intenta enviar el vehículo a Mantenimiento.
     * 
     * Esto no está permitido cuando el vehículo está Disponible,
     * ya que debe haber sido usado o reservado previamente.
     * 
     * @param gestorVehiculo - Gestor que administra el vehículo.
     * @param costo - Costo del mantenimiento.
     * @param fecha - Fecha en la que se registra el mantenimiento.
     * @throws EstadoError Siempre, porque no se puede enviar desde Disponible.
     */
    public enviarMantenimiento(gestorVehiculo: GestorDeVehiculo, costo: number, fecha: Date): void {
        throw new EstadoError("Vehiculo debe reservarse antes de enviar a mantenimiento");
    }

    /**
     * Intenta enviar el vehículo al estado Necesita Limpieza.
     * 
     * Un vehículo Disponible no puede necesitar limpieza,
     * ya que no ha sido utilizado recientemente.
     * 
     * @param gestorVehiculo - Gestor que administra el vehículo.
     * @param distanciaRecorrida - Kilómetros recorridos (irrelevante en este estado).
     * @param fecha - Fecha del registro.
     * @throws EstadoError Siempre, porque el vehículo no puede ir a limpieza desde Disponible.
     */
    public enviarNecesitaLimpieza(gestorVehiculo: GestorDeVehiculo, distanciaRecorrida: number, fecha: Date): void {
        throw new EstadoError("Vehiculo debe reservarse antes de enviar a necesita limpieza");
    }

}