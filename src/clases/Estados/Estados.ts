import EstadoError from "../../clasesDeError/EstadoError";
import GestorDeVehiculo from "../GestorDeVehiculo";
import Cliente from "../Personas/Cliente";

export default abstract class Estados {
    
    protected fecha!: Date;

    public abstract enviarDisponible(vehiculo: GestorDeVehiculo): void

    public abstract enviarReservar(gestorVehiculo: GestorDeVehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void

    public abstract enviarMantenimiento(gestorVehiculo: GestorDeVehiculo, costo: number, fecha: Date): void

    public abstract enviarNecesitaLimpieza(gestorVehiculo: GestorDeVehiculo, distanciaRecorrida: number, fecha: Date): void

    public setFecha(data: Date): void {
        if (isNaN(data.getTime())) {
            throw new EstadoError("La fecha de inicio no es válida");
        }
        this.fecha = data;
    }

    public getFecha(): Date {
        return this.fecha;
    }

}