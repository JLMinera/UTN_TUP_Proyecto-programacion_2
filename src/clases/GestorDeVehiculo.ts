import GestorDeVehiculoError from "../clasesDeError/GestorDeVehiculoError";
import GestorDeReserva from "./GestorDeReserva";
import Vehiculo from "./Vehiculo";
import GestorDeEstado from "./GestorDeEstado";
import CalculadoraDeTarifa from "./CalculadoraDeTarifa";

export default class GestorDeVehiculo {
    private vehiculo: Vehiculo;
    private estado!: GestorDeEstado;
    private ultimoKmMantenimiento!: number;
    private fechaUltimoMantenimiento!: Date;
    private contador: number;
    private calculadora: CalculadoraDeTarifa;
    private tarifaBase: number;
    private adicionalPorKm: number;
    private limiteDiarioKm: number;
    private seguro: number;

    constructor(vehiculo: Vehiculo, calculadora: CalculadoraDeTarifa, tarifaBase: number, adicionalPorKm: number, limiteDiarioKm: number, seguro: number) {
        this.vehiculo = vehiculo;
        this.contador = 0;
        this.calculadora =  calculadora;        
        this.tarifaBase = tarifaBase;
        this.adicionalPorKm = adicionalPorKm;
        this.seguro = seguro;
        this.limiteDiarioKm = limiteDiarioKm;
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

    public setFechaUltimoMantenimiento(fecha: Date): void {
        const fechaUltimoMantenimiento = this.estado.actualizarFechaMantenimiento(fecha);
        if (Number.isNaN(fechaUltimoMantenimiento)) {
            throw new GestorDeVehiculoError("La fecha proporcionada no es valida")
        }
        this.fechaUltimoMantenimiento = fechaUltimoMantenimiento;

    }

    public getFechaUltimoMantenimiento(): Date {
        return this.fechaUltimoMantenimiento;
    }

    public contadorAcumulado(): void {
        this.contador++;
    }

    public getContadorAcumulado(): number {
        return this.contador;
    }

    public setTarifaBase(data: number) {
        this.tarifaBase = data;
    }
    public getTarifaBase(): number {
        return this.tarifaBase;
    }

    public setSeguro(data: number) {
        this.seguro = data;
    }
    public getSeguro(): number {
        return this.seguro;
    }

    public setVehiculo(data: Vehiculo) {
        this.vehiculo = data;
    }
    public getVehiculo(): Vehiculo {
        return this.vehiculo;
    }

    public setAdicionalPorKm(data: number) {
        this.seguro = data;
    }
    public getAdicionalPorKm(): number {
        return this.seguro;
    }
    
    public setLimiteDiarioKm(data: number) {
        this.seguro = data;
    }
    public getLimiteDiarioKm(): number {
        return this.seguro;
    }
    
    public setCalculadora(data: CalculadoraDeTarifa) {
        this.calculadora = data;
    }
    public getCalculadora(): CalculadoraDeTarifa {
        return this.calculadora;
    }

      public getKilometrajeActual(): number {
        return this.getVehiculo().getKilometraje();
    }

}