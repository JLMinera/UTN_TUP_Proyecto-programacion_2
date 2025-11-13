import GestorDeVehiculoError from "../clasesDeError/GestorDeVehiculoError";
import GestorDeReserva from "./GestorDeReserva";
import Vehiculo from "./Vehiculos/Vehiculo";
import GestorDeEstado from "./GestorDeEstado";
import CalculadoraDeTarifa from "./Calculadoras/CalculadoraDeTarifa";
import EstadoVehiculo from "../interfaz/EstadoVehiculo";
import EstadoDisponible from "./Estados/EstadoDisponible";
import Cliente from "./Personas/Cliente";

export default class GestorDeVehiculo {
    private vehiculo!: Vehiculo;
    private estado!: EstadoVehiculo;
    private ultimoKmMantenimiento!: number;
    private fechaUltimoMantenimiento!: Date;
    private contador: number;
    private calculadora!: CalculadoraDeTarifa;
    private tarifaBase!: number;
    private adicionalPorKm!: number;
    private limiteDiarioKm!: number;
    private seguro!: number;

    constructor(vehiculo: Vehiculo, calculadora: CalculadoraDeTarifa, tarifaBase: number, adicionalPorKm: number, limiteDiarioKm: number, seguro: number) {
        this.contador = 0;
        this.setEstado(new EstadoDisponible());
        this.setVehiculo(vehiculo);
        this.setCalculadora(calculadora);
        this.setTarifaBase(tarifaBase);
        this.setAdicionalPorKm(adicionalPorKm);
        this.setLimiteDiarioKm(limiteDiarioKm);
        this.setSeguro(seguro);
    }

    public enviarDisponible(): void {
        this.estado.enviarDisponible(this);
    }

    public enviarReservar(cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {
        this.estado.enviarReservar(this, cliente, fechaInicio, fechaFin);
    }

    public dispararMantenimiento(costo: number, distanciaRecorrida: number, fechaInicio: Date, fechaFin: Date): void {
        const ultimoMantenimientoKm = this.getKilometrajeActual() - this.getUltimoKmMantenimiento();
        const fechaActual = new Date();
        const meses = (fechaActual.getFullYear() - this.getFechaUltimoMantenimiento().getFullYear()) * 12
                    + (fechaActual.getMonth() - this.getFechaUltimoMantenimiento().getMonth());
        const alquileres = this.getContadorAcumulado() % 5;
        
        if (ultimoMantenimientoKm > 10000 || meses > 12 || alquileres === 0) {
            this.estado.enviarMantenimiento(this, costo, fechaInicio, fechaFin);
        }
        else {
            this.estado.enviarNecesitaLimpieza(this, distanciaRecorrida, fechaInicio, fechaFin);
        }
    }
    

    public setUltimoKmMantenimiento(data: GestorDeReserva): void {
        const kmMantenimiento = data.getKmFinal();
        if (!Number.isInteger(kmMantenimiento) || kmMantenimiento <= 0) {
            throw new GestorDeVehiculoError("El valor del kilometraje obtenido es incorrecto");
        }
        this.ultimoKmMantenimiento = kmMantenimiento;
    }

    public getUltimoKmMantenimiento(): number {
        return this.ultimoKmMantenimiento;
    }

    public setFechaUltimoMantenimiento(fecha: Date): void {
        const fechaUltimoMantenimiento = this.estado.getFechaFin();
        if (Number.isNaN(fechaUltimoMantenimiento.getTime())) {
            throw new GestorDeVehiculoError("La fecha proporcionada no es válida");
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
        if (!Number.isFinite(data) || data < 0) {
            throw new GestorDeVehiculoError("La tarifa base debe ser un número mayor o igual a 0");
        }
        this.tarifaBase = data;
    }

    public setAdicionalPorKm(data: number) {
        if (!Number.isFinite(data) || data < 0) {
            throw new GestorDeVehiculoError("El adicional por km debe ser un número mayor o igual a 0");
        }
        this.adicionalPorKm = data;
    }

    public setLimiteDiarioKm(data: number) {
        if (!Number.isFinite(data) || data < 0) {
            throw new GestorDeVehiculoError("El límite diario de km debe ser un número mayor o igual a 0");
        }
        this.limiteDiarioKm = data;
    }

    public setSeguro(data: number) {
        if (!Number.isFinite(data) || data < 0) {
            throw new GestorDeVehiculoError("El seguro debe ser un número mayor o igual a 0");
        }
        this.seguro = data;
    }

    public setVehiculo(data: Vehiculo) {
        if (!data) throw new GestorDeVehiculoError("El vehículo no puede ser null");
        this.vehiculo = data;
    }

    public setCalculadora(data: CalculadoraDeTarifa) {
        if (!data) throw new GestorDeVehiculoError("La calculadora no puede ser null");
        this.calculadora = data;
    }

    public setEstado(data: EstadoVehiculo) {
        if (!data) throw new GestorDeVehiculoError("El estado no puede ser null");
        this.estado = data;
    }

    public getTarifaBase(): number { 
        return this.tarifaBase; 
    }

    public getAdicionalPorKm(): number { 
        return this.adicionalPorKm; 
    }

    public getLimiteDiarioKm(): number { 
        return this.limiteDiarioKm; 
    }

    public getSeguro(): number { 
        return this.seguro; 
    }

    public getVehiculo(): Vehiculo { 
        return this.vehiculo; 
    }

    public getCalculadora(): CalculadoraDeTarifa { 
        return this.calculadora; 
    }

    public getKilometrajeActual(): number {
         return this.vehiculo.getKilometraje(); 
    }
}
