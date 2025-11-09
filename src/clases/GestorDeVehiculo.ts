import GestorDeVehiculoError from "../clasesDeError/GestorDeVehiculoError";
import GestorDeReserva from "./GestorDeReserva";
import Vehiculo from "./Vehiculo";
import GestorDeEstado from "./GestorDeEstado";

export default class GestorDeVehiculo {
    private vehiculo: Vehiculo;
    private estado: GestorDeEstado;
    private ultimoKmMantenimiento!: number;
    private fechaUltimoMantenimiento!: Date;
    private contador: number;


    constructor(vehiculo: Vehiculo) {
        this.vehiculo = vehiculo;
        this.estado = GestorDeEstado;
        this.contador = 0;
    }

    public setUltimoKmMantenimiento(data: GestorDeReserva): void {
        const kmMantenimiento = data.getKilometrajeFinal();
        if (!Number.isInteger(kmMantenimiento) || kmMantenimiento <= 0) {
            throw new GestorDeVehiculoError("El valor del kilometraje obtenido es incorrecto")
        }
        this.ultimoKmMantenimiento = kmMantenimiento;

    }

    public getUltimoKmMantenimiento(): number {
        return this.ultimoKmMantenimiento;
    }

      public setFechaUltimoMantenimiento(): void {
        const fechaUltimoMantenimiento = this.estado.fechaFinMantenimiento();
        if(Number.isNaN(fechaUltimoMantenimiento)){
            throw new GestorDeVehiculoError("La fecha proporcionada no es valida")
        }
        this.fechaUltimoMantenimiento = fechaUltimoMantenimiento;

    }

    public getFechaUltimoMantenimiento(): Date {
        return this.fechaUltimoMantenimiento;
    }

    public contadorAcumulado(): void{
        this.contador ++;
    }

    public getContadorAcumulado(): number{
        return this.contador;
    }
    


}