import EstadoError from "../../clasesDeError/EstadoError";
import GestorDeVehiculo from "../GestorDeVehiculo";
import Cliente from "../Personas/Cliente";
import EstadoMantenimiento from "./EstadoMantenimiento";
import EstadoNecesitaLimpieza from "./EstadoNecesitaLimpieza";
import Estados from "./Estados";

export default class EstadoReservado extends Estados {
    
    private cliente!: Cliente;
    private fechaInicio!: Date;
    private fechaFin!: Date;

    constructor(cliente: Cliente, fechaInicio: Date, fechaFin: Date) {
        super();
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

    public enviarMantenimiento(gestorVehiculo: GestorDeVehiculo, costo: number, fecha: Date): void {
        gestorVehiculo.setEstado(new EstadoMantenimiento(costo, fecha));
    }

    public enviarNecesitaLimpieza(gestorVehiculo: GestorDeVehiculo, distanciaRecorrida: number, fecha: Date): void {
        gestorVehiculo.setEstado(new EstadoNecesitaLimpieza(distanciaRecorrida, fecha));
    }

    public getCliente(): Cliente {
        return this.cliente;
    }

    public setCliente(cliente: Cliente): void {
        if (!cliente) {
            throw new EstadoError("El cliente no puede ser nulo");
        }
        this.cliente = cliente;
    }

    public setFechaInicio(data: Date): void {
        if (isNaN(data.getTime())) {
            throw new EstadoError("La fecha de inicio no es válida");
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