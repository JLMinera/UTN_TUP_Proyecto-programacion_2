import EstadoError from "../../clasesDeError/EstadoError";
import GestorDeVehiculo from "../GestorDeVehiculo";
import Cliente from "../Personas/Cliente";
import EstadoMantenimiento from "./EstadoMantenimiento";
import EstadoNecesitaLimpieza from "./EstadoNecesitaLimpieza";
import Estados from "./Estados";

/**
 * Representa el estado **Reservado** de un vehículo.
 *
 * Un vehículo en este estado:
 * - Está asociado a un cliente que lo ha reservado.
 * - Tiene una fecha de inicio y una fecha de fin de reserva.
 * - **No puede volver directamente a Disponible**.
 * - Al finalizar la reserva puede pasar a:
 *    - **Mantenimiento** si presenta fallas o requiere revisión técnica.
 *    - **Necesita Limpieza**, si corresponde según el uso.
 * 
 * Forma parte del *Patrón State* para controlar el ciclo de vida y disponibilidad de los vehículos.
 */
export default class EstadoReservado extends Estados {
    
    /** Cliente que realizó la reserva. */
    private cliente!: Cliente;

    /** Fecha de inicio de la reserva. */
    private fechaInicio!: Date;

    /** Fecha de finalización de la reserva. */
    private fechaFin!: Date;

    /**
     * Crea un estado Reservado.
     * 
     * @param cliente - Cliente que realiza la reserva.
     * @param fechaInicio - Fecha en que inicia la reserva.
     * @param fechaFin - Fecha en que finaliza la reserva.
     * @throws EstadoError Si algún dato es inválido.
     */
    constructor(cliente: Cliente, fechaInicio: Date, fechaFin: Date) {
        super();
        this.setFechaInicio(fechaInicio);
        this.setFechaFin(fechaFin);
        this.setCliente(cliente);
    }

    /**
     * Un vehículo reservado **no puede** pasar directamente a Disponible,
     * ya que debe verificarse si necesita mantenimiento o limpieza tras la devolución.
     *
     * @throws EstadoError Siempre.
     */
    public enviarDisponible(gestorVehiculo: GestorDeVehiculo): void {
        throw new EstadoError("Vehiculo debe evaluarse si necesita mantenimiento o limpieza");
    }

    /**
     * No se puede reservar un vehículo que ya está reservado.
     *
     * @throws EstadoError Siempre.
     */
    public enviarReservar(gestorVehiculo: GestorDeVehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {
        throw new EstadoError("Vehiculo ya se encuentra en Reservado");
    }

    /**
     * Transición válida: cambia el estado del vehículo a **Mantenimiento**.
     * 
     * @param gestorVehiculo - Gestor que administra el vehículo.
     * @param costo - Costo del mantenimiento.
     * @param fecha - Fecha en que se registra la entrada a mantenimiento.
     */
    public enviarMantenimiento(gestorVehiculo: GestorDeVehiculo, costo: number, fecha: Date): void {
        gestorVehiculo.setEstado(new EstadoMantenimiento(costo, fecha));
    }

    /**
     * Transición válida: cambia el estado del vehículo a **Necesita Limpieza**.
     * 
     * @param gestorVehiculo - Gestor que administra el vehículo.
     * @param distanciaRecorrida - Kilómetros recorridos durante la reserva.
     * @param fecha - Fecha de registro.
     */
    public enviarNecesitaLimpieza(gestorVehiculo: GestorDeVehiculo, distanciaRecorrida: number, fecha: Date): void {
        gestorVehiculo.setEstado(new EstadoNecesitaLimpieza(distanciaRecorrida, fecha));
    }

    /**
     * Obtiene el cliente asociado a la reserva.
     * 
     * @returns Cliente que reservó el vehículo.
     */
    public getCliente(): Cliente {
        return this.cliente;
    }

    /**
     * Establece el cliente de la reserva.
     * 
     * @param cliente - Cliente válido.
     * @throws EstadoError Si el cliente es nulo.
     */
    public setCliente(cliente: Cliente): void {
        if (!cliente) {
            throw new EstadoError("El cliente no puede ser nulo");
        }
        this.cliente = cliente;
    }

    /**
     * Establece la fecha de inicio de la reserva.
     * 
     * @param data - Fecha válida.
     * @throws EstadoError Si la fecha es inválida.
     */
    public setFechaInicio(data: Date): void {
        if (isNaN(data.getTime())) {
            throw new EstadoError("La fecha de inicio no es válida");
        }
        this.fechaInicio = data;
    }

    /**
     * Obtiene la fecha de inicio de la reserva.
     * 
     * @returns Fecha inicio.
     */
    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    /**
     * Establece la fecha de fin de la reserva.
     * Debe ser posterior a la fecha de inicio.
     * 
     * @param data - Fecha válida.
     * @throws EstadoError Si la fecha es inválida o anterior a la de inicio.
     */
    public setFechaFin(data: Date): void {
        if (isNaN(data.getTime())) {
            throw new EstadoError("La fecha de fin no es válida");
        }
        if (this.fechaInicio && data < this.fechaInicio) {
            throw new EstadoError("La fecha de fin no puede ser anterior a la fecha de inicio");
        }
        this.fechaFin = data;
    }

    /**
     * Obtiene la fecha de fin de la reserva.
     * 
     * @returns Fecha fin.
     */
    public getFechaFin(): Date {
        return this.fechaFin;
    }
}
