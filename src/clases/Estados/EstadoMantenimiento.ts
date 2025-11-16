import EstadoError from "../../clasesDeError/EstadoError";
import GestorDeVehiculo from "../GestorDeVehiculo";
import Cliente from "../Personas/Cliente";
import EstadoDisponible from "./EstadoDisponible";
import Estados from "./Estados";

/**
 * Representa el estado **Mantenimiento** de un vehículo.
 *
 * Un vehículo en este estado:
 * - Se encuentra siendo reparado o inspeccionado.
 * - **Solo puede** volver al estado Disponible una vez finalizado el proceso.
 * - **No puede** ser reservado.
 * - **No puede** pasar a limpieza.
 * - **No puede** volver a Mantenimiento.
 *
 * Forma parte del *Patrón State* que gestiona el ciclo de vida de los vehículos.
 */
export default class EstadoMantenimiento extends Estados {

    /** Costo total del mantenimiento realizado. */
    private costo: number;

    /**
     * Crea un estado de Mantenimiento.
     * 
     * @param costo - Costo asociado al mantenimiento. Debe ser un número positivo.
     * @param fecha - Fecha en la que se inició o registró el mantenimiento.
     * @throws EstadoError Si el costo no es válido.
     */
    constructor(costo: number, fecha: Date) {
        super();
        if (!Number.isFinite(costo) || costo < 0) {
            throw new EstadoError("El costo debe ser un número positivo");
        }
        this.costo = costo;
        this.setFecha(fecha);
    }

    /**
     * Transición válida: cambia el estado del vehículo a **Disponible**.
     * 
     * @param gestorVehiculo - Gestor encargado de controlar el estado del vehículo.
     */
    public enviarDisponible(gestorVehiculo: GestorDeVehiculo): void {
        gestorVehiculo.setEstado(new EstadoDisponible());
    }

    /**
     * Intenta reservar el vehículo.
     * 
     * No está permitido reservar un vehículo que está en Mantenimiento.
     * 
     * @throws EstadoError Siempre.
     */
    public enviarReservar(gestorVehiculo: GestorDeVehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {
        throw new EstadoError("Vehiculo debe ir a Disponible");
    }

    /**
     * Intenta enviar nuevamente el vehículo a Mantenimiento.
     * 
     * Ya se encuentra en este estado, por lo que arroja error.
     * 
     * @throws EstadoError Siempre.
     */
    public enviarMantenimiento(gestorVehiculo: GestorDeVehiculo, costo: number, fecha: Date): void {
        throw new EstadoError("Vehiculo ya se encuentra en Mantenimiento");
    }

    /**
     * Intenta enviar el vehículo al estado Necesita Limpieza.
     * 
     * Esto no está permitido mientras está en mantenimiento.
     * 
     * @throws EstadoError Siempre.
     */
    public enviarNecesitaLimpieza(gestorVehiculo: GestorDeVehiculo, distanciaRecorrida: number, fecha: Date): void {
        throw new EstadoError("Vehiculo debe ir a Disponible");
    }

    /**
     * Actualiza el costo del mantenimiento.
     * 
     * @param value - Nuevo costo. Debe ser un número positivo.
     * @throws EstadoError Si el costo no es válido.
     */
    public setCosto(value: number): void {
        if (!Number.isFinite(value) || value < 0) {
            throw new EstadoError("El costo debe ser un número positivo");
        }
        this.costo = value;
    }

    /**
     * Obtiene el costo total del mantenimiento.
     * 
     * @returns Costo del mantenimiento.
     */
    public getCosto(): number {
        return this.costo;
    }
}
