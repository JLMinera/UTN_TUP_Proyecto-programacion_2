import GestorDeVehiculoError from "../clasesDeError/GestorDeVehiculoError";
import Vehiculo from "./Vehiculos/Vehiculo";
import CalculadoraDeTarifa from "./Calculadoras/CalculadoraDeTarifa";
import EstadoDisponible from "./Estados/EstadoDisponible";
import Cliente from "./Personas/Cliente";
import Estados from "./Estados/Estados";

export default class GestorDeVehiculo {
    private vehiculo!: Vehiculo;
    private estado!: Estados;
    private ultimoKmMantenimiento: number = 0;
    private fechaUltimoMantenimiento: Date = new Date();
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
        this.contadorAcumulado();
    }

    public dispararMantenimiento(costo: number, distanciaRecorrida: number, fecha: Date): void {
        const ultimoMantenimientoKm = this.getKilometrajeActual() - this.getUltimoKmMantenimiento();
        const fechaActual = new Date();
        const meses = (fechaActual.getFullYear() - this.getFechaUltimoMantenimiento().getFullYear()) * 12
            + (fechaActual.getMonth() - this.getFechaUltimoMantenimiento().getMonth());
        const alquileres = this.getContadorAcumulado() % 5;

        if (ultimoMantenimientoKm > 10000 || meses > 12 || alquileres === 0) {
            this.estado.enviarMantenimiento(this, costo, fecha);
            this.setFechaUltimoMantenimiento(this.estado.getFecha());
            this.setUltimoKmMantenimiento(this.getKilometrajeActual())
        }
        else {
            this.estado.enviarNecesitaLimpieza(this, distanciaRecorrida, fecha);
        }
    }

    public setEstado(data: Estados) {
        if (!data) throw new GestorDeVehiculoError("El estado no puede ser null");
        this.estado = data;
    }
    public getEstado(): Estados {
        return this.estado;
    }

    public setUltimoKmMantenimiento(data: number): void {
        if (!Number.isInteger(data) || data <= 0) {
            throw new GestorDeVehiculoError("El valor del kilometraje obtenido es incorrecto");
        }
        this.ultimoKmMantenimiento = data;
    }

    public getUltimoKmMantenimiento(): number {
        return this.ultimoKmMantenimiento;
    }

    public setFechaUltimoMantenimiento(fecha: Date): void {
        if (Number.isNaN(fecha.getTime())) {
            throw new GestorDeVehiculoError("La fecha proporcionada no es válida");
        }
        this.fechaUltimoMantenimiento = fecha;
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

    public getTarifaBase(): number {
        return this.tarifaBase;
    }

    public setLimiteDiarioKm(data: number) {
        if (!Number.isFinite(data) || data < 0) {
            throw new GestorDeVehiculoError("El límite diario de km debe ser un número mayor o igual a 0");
        }
        this.limiteDiarioKm = data;
    }

    public getLimiteDiarioKm(): number {
        return this.limiteDiarioKm;
    }

    public setSeguro(data: number) {
        if (!Number.isFinite(data) || data < 0) {
            throw new GestorDeVehiculoError("El seguro debe ser un número mayor o igual a 0");
        }
        this.seguro = data;
    }

    public getSeguro(): number {
        return this.seguro;
    }

    public setVehiculo(data: Vehiculo) {
        if (!data) throw new GestorDeVehiculoError("El vehículo no puede ser null");
        this.vehiculo = data;
    }
    public getVehiculo(): Vehiculo {
        return this.vehiculo;
    }

    public setCalculadora(data: CalculadoraDeTarifa) {
        if (!data) throw new GestorDeVehiculoError("La calculadora no puede ser null");
        this.calculadora = data;
    }

    public getCalculadora(): CalculadoraDeTarifa {
        return this.calculadora;
    }

    public setAdicionalPorKm(data: number) {
        if (!Number.isFinite(data) || data < 0) {
            throw new GestorDeVehiculoError("El adicional por km debe ser un número mayor o igual a 0");
        }
        this.adicionalPorKm = data;
    }

    public getAdicionalPorKm(): number {
        return this.adicionalPorKm;
    }

    public getKilometrajeActual(): number {
        return this.vehiculo.getKilometraje();
    }
}
