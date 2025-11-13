import EstadoError from "../../clasesDeError/EstadoError";
import NecesitaLimpiezaError from "../../clasesDeError/NecesitaLimpiezaError";
import EstadoVehiculo from "../../interfaz/EstadoVehiculo";
import GestorDeVehiculo from "../GestorDeVehiculo";
import Cliente from "../Personas/Cliente";
import EstadoDisponible from "./EstadoDisponible";


export default class EstadoNecesitaLimpieza implements EstadoVehiculo {
    private distanciaRecorrida!: number;
    private fechaInicio!: Date;
    private fechaFin!: Date;

    constructor(distanciaRecorrida: number, fechaInicio: Date, fechaFin: Date){
        this.setDistanciaRecorrida(distanciaRecorrida);
        this.setFechaInicio(fechaInicio);
        this.setFechaFin(fechaFin);
    }

    public enviarDisponible(gestorVehiculo: GestorDeVehiculo): void {
        gestorVehiculo.setEstado(new EstadoDisponible());
    }

    public enviarReservar(gestorVehiculo: GestorDeVehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {
        throw new EstadoError("Vehiculo debe ir a disponible");
    }

    public enviarMantenimiento(gestorVehiculo: GestorDeVehiculo, costo: number, fechaInicio: Date, fechaFin: Date): void {
        throw new EstadoError("Vehiculo debe ir a disponible");
    }

    public enviarNecesitaLimpieza(gestorVehiculo: GestorDeVehiculo, distanciaRecorrida: number, fechaInicio: Date, fechaFin: Date): void {
        throw new EstadoError("Vehiculo ya se encuentra en Necesita Limpieza");
    }

    public getDistanciaRecorrida(): number {
        return this.distanciaRecorrida;
    }
    
    public setDistanciaRecorrida(value: number): void {
        if (!Number.isFinite(value) || value < 0) {
            throw new NecesitaLimpiezaError("La distancia recorrida debe ser un número positivo");
        }
        this.distanciaRecorrida = value;
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