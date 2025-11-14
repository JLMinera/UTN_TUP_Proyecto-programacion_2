import EstadoError from "../../clasesDeError/EstadoError";
import GestorDeVehiculo from "../GestorDeVehiculo";
import Cliente from "../Personas/Cliente";
import EstadoDisponible from "./EstadoDisponible";
import Estados from "./Estados";

export default class EstadoNecesitaLimpieza extends Estados {
    
    private distanciaRecorrida!: number;
    private fechaInicio!: Date;
    private fechaFin!: Date;

    constructor(distanciaRecorrida: number, fecha: Date) {
        super();
        this.setDistanciaRecorrida(distanciaRecorrida);
        this.setFecha(fecha);
    }

    public enviarDisponible(gestorVehiculo: GestorDeVehiculo): void {
        gestorVehiculo.setEstado(new EstadoDisponible());
    }

    public enviarReservar(gestorVehiculo: GestorDeVehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {
        throw new EstadoError("Vehiculo debe ir a disponible");
    }

    public enviarMantenimiento(gestorVehiculo: GestorDeVehiculo, costo: number, fecha: Date): void {
        throw new EstadoError("Vehiculo debe ir a disponible");
    }

    public enviarNecesitaLimpieza(gestorVehiculo: GestorDeVehiculo, distanciaRecorrida: number, fecha: Date): void {
        throw new EstadoError("Vehiculo ya se encuentra en Necesita Limpieza");
    }

    public getDistanciaRecorrida(): number {
        return this.distanciaRecorrida;
    }

    public setDistanciaRecorrida(value: number): void {
        if (!Number.isFinite(value) || value < 0) {
            throw new EstadoError("La distancia recorrida debe ser un número positivo");
        }
        this.distanciaRecorrida = value;
    }

    public setFecha(data: Date): void {
        if (isNaN(data.getTime())) {
            throw new EstadoError("La fecha de inicio no es válida");
        }
        this.fecha = data;
    }

    public getFechaInicio(): Date {
        return this.fecha;
    }
}