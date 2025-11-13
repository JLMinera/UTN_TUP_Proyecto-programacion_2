import EstadoError from "../../clasesDeError/EstadoError";
import ReservaError from "../../clasesDeError/ReservaError";
import EstadoVehiculo from "../../interfaz/EstadoVehiculo";
import GestorDeVehiculo from "../GestorDeVehiculo";
import Cliente from "../Personas/Cliente";
import EstadoMantenimiento from "./EstadoMantenimiento";
import EstadoNecesitaLimpieza from "./EstadoNecesitaLimpieza";

export default class EstadoReservado implements EstadoVehiculo {

    private cliente!: Cliente;
    private fechaInicio!: Date;
    private fechaFin!: Date;
    
    constructor(cliente: Cliente, fechaInicio: Date, fechaFin: Date) {
        this.setFechaInicio(fechaInicio);
        this.setFechaFin(fechaFin);    
        this.setCliente(cliente);
    }


    public enviarDisponible(gestorVehiculo: GestorDeVehiculo): void {
        throw new EstadoError("Vehiculo debe evaluarse si necesita mantenimiento o limpieza");
    }

    public enviarReservar(gestorVehiculo: GestorDeVehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {
        throw new EstadoError("Vehiculo ya se encuentra en Reservado");
    }

    public enviarMantenimiento(gestorVehiculo: GestorDeVehiculo, costo: number, fechaInicio: Date, fechaFin: Date): void {
        gestorVehiculo.setEstado(new EstadoMantenimiento(costo, fechaInicio, fechaFin));
    }   
 
    public enviarNecesitaLimpieza(gestorVehiculo: GestorDeVehiculo, distanciaRecorrida: number, fechaInicio: Date, fechaFin: Date): void {
        gestorVehiculo.setEstado(new EstadoNecesitaLimpieza(distanciaRecorrida, fechaInicio, fechaFin));
    }

    public getCliente(): Cliente {
        return this.cliente;
    }
    
    public setCliente(cliente: Cliente): void {
        if (!cliente) {
                throw new ReservaError("El cliente no puede ser nulo");
        }
        this.cliente = cliente;
    }

    public setFechaInicio(data: Date): void {
        if (isNaN(data.getTime())) {
            throw new EstadoError("La fecha de inicio no es válida");
        }
            
        if (this.fechaFin && data > this.fechaFin) {
            throw new EstadoError("La fecha de inicio no puede ser posterior a la fecha de fin");
        }
        this.fechaInicio = data;
    }
    
    public getFechaInicio(): Date {
        return this.fechaInicio;
    }
    
    public setFechaFin(data: Date): void {
        if (isNaN(data.getTime())) {
            throw new EstadoError("La fecha de fin no es válida");
        }
        if (this.fechaInicio && data < this.fechaInicio) {
            throw new EstadoError("La fecha de fin no puede ser anterior a la fecha de inicio");
        }
        this.fechaFin = data;
    }
    
    public getFechaFin(): Date {
            return this.fechaFin;
    }
}