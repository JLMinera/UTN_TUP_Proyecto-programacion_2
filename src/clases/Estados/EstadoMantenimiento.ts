import EstadoError from "../../clasesDeError/EstadoError";
import MantenimientoError from "../../clasesDeError/MantenimientoError";
import EstadoVehiculo from "../../interfaz/EstadoVehiculo";
import GestorDeVehiculo from "../GestorDeVehiculo";
import Cliente from "../Personas/Cliente";
import EstadoDisponible from "./EstadoDisponible";


export default class EstadoMantenimiento implements EstadoVehiculo {
    private costo: number;
    private fechaInicio!: Date;
    private fechaFin!: Date;


    constructor(costo: number, fechaInicio: Date, fechaFin: Date) {
        if (!Number.isFinite(costo) || costo < 0) {
            throw new MantenimientoError("El costo debe ser un número positivo");
        }
        this.costo = costo;
        this.setFechaInicio(fechaInicio);
        this.setFechaFin(fechaFin);
    }

    
    public enviarDisponible(gestorVehiculo: GestorDeVehiculo): void {
        gestorVehiculo.setEstado(new EstadoDisponible());
    }

    public enviarReservar(gestorVehiculo: GestorDeVehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {
        throw new EstadoError("Vehiculo debe ir a Disponible");
    }

    public enviarMantenimiento(gestorVehiculo: GestorDeVehiculo, costo: number, fechaInicio: Date, fechaFin: Date): void {
        throw new EstadoError("Vehiculo ya se encuentra en Mantenimiento");
    }

    public enviarNecesitaLimpieza(gestorVehiculo: GestorDeVehiculo, distanciaRecorrida: number, fechaInicio: Date, fechaFin: Date): void {
        throw new EstadoError("Vehiculo debe ir a Disponible");
    }
    
    public setCosto(value: number): void {
        if (!Number.isFinite(value) || value < 0) {
            throw new MantenimientoError("El costo debe ser un número positivo");
        }
        this.costo = value;
    }

    public getCosto(): number {
        return this.costo;
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