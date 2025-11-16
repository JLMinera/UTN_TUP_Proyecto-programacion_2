import EstadoError from "../../clasesDeError/EstadoError";
import GestorDeVehiculo from "../GestorDeVehiculo";
import Cliente from "../Personas/Cliente";
import EstadoDisponible from "./EstadoDisponible";
import Estados from "./Estados";

/**
 * Representa el estado **Necesita Limpieza** de un vehículo.
 *
 * Un vehículo llega a este estado luego de haber sido utilizado por un cliente.
 * Desde aquí:
 * - **Puede volver a Disponible** una vez realizada la limpieza.
 * - **No puede ser reservado**.
 * - **No puede enviarse a mantenimiento**.
 * - **No puede volver a este mismo estado**.
 *
 * Forma parte del *Patrón State* usado para controlar el ciclo de vida del vehículo.
 */
export default class EstadoNecesitaLimpieza extends Estados {

    /** Distancia recorrida durante el alquiler anterior. */
    private distanciaRecorrida!: number;

    // 🔎 ACLARACIÓN:
    // Tenías "fechaInicio" y "fechaFin", pero nunca se usan.
    // Esta clase solo maneja UNA fecha (cuando se marcó como sucio).
    // Los mantuve declarados porque estaban en tu código, pero están sin uso.
    private fechaInicio!: Date;
    private fechaFin!: Date;

    /**
     * Crea un estado Necesita Limpieza.
     * 
     * @param distanciaRecorrida - Distancia recorrida durante el uso.
     * @param fecha - Fecha en la que se registró la necesidad de limpieza.
     * @throws EstadoError Si la distancia o la fecha no son válidas.
     */
    constructor(distanciaRecorrida: number, fecha: Date) {
        super();
        this.setDistanciaRecorrida(distanciaRecorrida);
        this.setFecha(fecha);
    }

    /**
     * Transición válida: cambia el estado del vehículo a **Disponible**.
     * 
     * @param gestorVehiculo - Controlador del vehículo cuyo estado se modifica.
     */
    public enviarDisponible(gestorVehiculo: GestorDeVehiculo): void {
        gestorVehiculo.setEstado(new EstadoDisponible());
    }

    /**
     * Intenta reservar un vehículo que necesita limpieza.
     * 
     * No está permitido hasta que vuelva a Disponible.
     *
     * @throws EstadoError Siempre.
     */
    public enviarReservar(gestorVehiculo: GestorDeVehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {
        throw new EstadoError("Vehiculo debe ir a disponible");
    }

    /**
     * Intenta enviar el vehículo a Mantenimiento.
     * 
     * No es posible mientras está en estado de limpieza pendiente.
     *
     * @throws EstadoError Siempre.
     */
    public enviarMantenimiento(gestorVehiculo: GestorDeVehiculo, costo: number, fecha: Date): void {
        throw new EstadoError("Vehiculo debe ir a disponible");
    }

    /**
     * Intenta volver a marcar el vehículo como Necesita Limpieza.
     * 
     * Ya está en este estado, por lo que lanzar error.
     *
     * @throws EstadoError Siempre.
     */
    public enviarNecesitaLimpieza(gestorVehiculo: GestorDeVehiculo, distanciaRecorrida: number, fecha: Date): void {
        throw new EstadoError("Vehiculo ya se encuentra en Necesita Limpieza");
    }

    /**
     * Obtiene la distancia recorrida registrada en este estado.
     * 
     * @returns Distancia recorrida.
     */
    public getDistanciaRecorrida(): number {
        return this.distanciaRecorrida;
    }

    /**
     * Establece la distancia recorrida del vehículo.
     * 
     * @param value - Distancia recorrida. Debe ser un número positivo.
     * @throws EstadoError Si el número no es válido.
     */
    public setDistanciaRecorrida(value: number): void {
        if (!Number.isFinite(value) || value < 0) {
            throw new EstadoError("La distancia recorrida debe ser un número positivo");
        }
        this.distanciaRecorrida = value;
    }

    /**
     * Establece la fecha en la que se registró este estado.
     * 
     * @param data - Fecha válida.
     * @throws EstadoError Si la fecha no es válida.
     */
    public setFecha(data: Date): void {
        if (isNaN(data.getTime())) {
            throw new EstadoError("La fecha de inicio no es válida");
        }
        this.fecha = data;
    }

    /**
     * Obtiene la fecha en la que el vehículo pasó a Necesita Limpieza.
     * 
     * @returns Fecha del evento.
     */
    public getFechaInicio(): Date {
        return this.fecha;
    }
}
