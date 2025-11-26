
import Vehiculo from "../Vehiculos/Vehiculo";
import CalculadoraDeTarifa from "../Calculadoras/CalculadoraDeTarifa";
import EstadoDisponible from "../Estados/EstadoDisponible";
import Cliente from "../Personas/Cliente";
import Estados from "../Estados/Estados";
import GestorDeVehiculoError from "../../clasesDeError/GestorDeVehiculoError";

/**
 * Gestor responsable del control del estado, mantenimiento y tarifas de un vehículo.
 * 
 * Encapsula la lógica de transición de estados, los datos necesarios para el cálculo
 * de tarifas y el registro de mantenimientos.
 */
export default class GestorDeVehiculo {

    /** Vehículo gestionado. */
    private vehiculo!: Vehiculo;

    /** Estado actual del vehículo (Disponible, Reservado, Mantenimiento, etc.). */
    private estado!: Estados;

    /** Kilómetros desde el último mantenimiento. */
    private ultimoKmMantenimiento: number = 0;

    /** Fecha del último mantenimiento realizado. */
    private fechaUltimoMantenimiento: Date = new Date();

    /** Contador de reservas realizadas (para activar mantenimiento cada 5). */
    private contador: number;

    /** Calculadora utilizada para calcular la tarifa final. */
    private calculadora!: CalculadoraDeTarifa;

    /** Tarifa base diaria del vehículo. */
    private tarifaBase!: number;

    /** Costo adicional por kilómetro extra. */
    private adicionalPorKm!: number;

    /** Límite de kilómetros permitidos por día antes de aplicar adicionales. */
    private limiteDiarioKm!: number;

    /** Costo del seguro aplicado a la reserva. */
    private seguro!: number;

    /**
     * Crea un gestor de vehículo con los valores y políticas de cálculo correspondientes.
     * 
     * @throws GestorDeVehiculoError si algún parámetro es inválido.
     */
    constructor(
        vehiculo: Vehiculo,
        calculadora: CalculadoraDeTarifa,
        tarifaBase: number,
        adicionalPorKm: number,
        limiteDiarioKm: number,
        seguro: number
    ) {
        this.contador = 0;
        this.setEstado(new EstadoDisponible());
        this.setVehiculo(vehiculo);
        this.setCalculadora(calculadora);
        this.setTarifaBase(tarifaBase);
        this.setAdicionalPorKm(adicionalPorKm);
        this.setLimiteDiarioKm(limiteDiarioKm);
        this.setSeguro(seguro);
    }

    /** Transición de estado → Disponible. */
    public enviarDisponible(): void {
        try {
            this.estado.enviarDisponible(this);
        } catch(error) {
            throw new GestorDeVehiculoError("Vehiculo no se puede enviar a Disponible");
        }
        
    }

    /**
     * Transición de estado → Reservado.
     * Incrementa el contador de reservas.
     */
    public enviarReservar(cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {
        try {
           this.estado.enviarReservar(this, cliente, fechaInicio, fechaFin);
            this.contadorAcumulado();
        } catch(error) {
            throw new GestorDeVehiculoError("Vehiculo no se puede enviar a Reservado");
        }
    }

    /**
     * Transición de estado → Mantenimiento.
     */
    public enviarMantenimiento(costo: number, fecha: Date): void {
        try {
            this.estado.enviarMantenimiento(this, costo, fecha);
            this.setFechaUltimoMantenimiento(this.estado.getFecha());
            this.setUltimoKmMantenimiento(this.getKilometrajeActual());
        } catch(error) {
            throw new GestorDeVehiculoError("Vehiculo no se puede enviar a Mantenimiento");
        }
    }

    /**
     * Transición de estado → Necesita Limpieza.
     */
    public enviarNecesitaLimpieza(distanciaRecorrida: number, fecha: Date) {
        try {
           this.estado.enviarNecesitaLimpieza(this, distanciaRecorrida, fecha);
        } catch(error) {
            throw new GestorDeVehiculoError("Vehiculo no se puede enviar a Necesita Limpieza");
        }
    }

    /** Establece el estado actual del vehículo. */
    public setEstado(data: Estados) {
        if (!data) throw new GestorDeVehiculoError("El estado no puede ser null");
        this.estado = data;
    }

    /** @returns Estado actual del vehículo. */
    public getEstado(): Estados {
        return this.estado;
    }

    /** Registra el kilometraje en el último mantenimiento. */
    public setUltimoKmMantenimiento(data: number): void {
        if (!Number.isInteger(data) || data <= 0) {
            throw new GestorDeVehiculoError("El valor del kilometraje obtenido es incorrecto");
        }
        this.ultimoKmMantenimiento = data;
    }

    /** @returns Kilometraje del último mantenimiento. */
    public getUltimoKmMantenimiento(): number {
        return this.ultimoKmMantenimiento;
    }

    /** Establece la fecha del último mantenimiento. */
    public setFechaUltimoMantenimiento(fecha: Date): void {
        if (Number.isNaN(fecha.getTime())) {
            throw new GestorDeVehiculoError("La fecha proporcionada no es válida");
        }
        this.fechaUltimoMantenimiento = fecha;
    }

    /** @returns Fecha del último mantenimiento. */
    public getFechaUltimoMantenimiento(): Date {
        return this.fechaUltimoMantenimiento;
    }

    /** Incrementa el contador de reservas realizadas. */
    public contadorAcumulado(): void {
        this.contador++;
    }

    /** @returns Cantidad de reservas acumuladas. */
    public getContadorAcumulado(): number {
        return this.contador;
    }

    /** Establece la tarifa base diaria. */
    public setTarifaBase(data: number) {
        if (!Number.isFinite(data) || data < 0) {
            throw new GestorDeVehiculoError("La tarifa base debe ser un número mayor o igual a 0");
        }
        this.tarifaBase = data;
    }

    /** @returns Tarifa base diaria. */
    public getTarifaBase(): number {
        return this.tarifaBase;
    }

    /** Establece el límite diario de kilómetros permitidos. */
    public setLimiteDiarioKm(data: number) {
        if (!Number.isFinite(data) || data < 0) {
            throw new GestorDeVehiculoError("El límite diario de km debe ser un número mayor o igual a 0");
        }
        this.limiteDiarioKm = data;
    }

    /** @returns Límite diario de kilómetros. */
    public getLimiteDiarioKm(): number {
        return this.limiteDiarioKm;
    }

    /** Establece el costo del seguro. */
    public setSeguro(data: number) {
        if (!Number.isFinite(data) || data < 0) {
            throw new GestorDeVehiculoError("El seguro debe ser un número mayor o igual a 0");
        }
        this.seguro = data;
    }

    /** @returns Costo del seguro. */
    public getSeguro(): number {
        return this.seguro;
    }

    /** Establece el vehículo gestionado. */
    public setVehiculo(data: Vehiculo) {
        if (!data) throw new GestorDeVehiculoError("El vehículo no puede ser null");
        this.vehiculo = data;
    }

    /** @returns Vehículo actual. */
    public getVehiculo(): Vehiculo {
        return this.vehiculo;
    }

    /** Establece la calculadora de tarifas. */
    public setCalculadora(data: CalculadoraDeTarifa) {
        if (!data) throw new GestorDeVehiculoError("La calculadora no puede ser null");
        this.calculadora = data;
    }

    /** @returns Calculadora de tarifas. */
    public getCalculadora(): CalculadoraDeTarifa {
        return this.calculadora;
    }

    /** Establece el adicional por kilómetro. */
    public setAdicionalPorKm(data: number) {
        if (!Number.isFinite(data) || data < 0) {
            throw new GestorDeVehiculoError("El adicional por km debe ser un número mayor o igual a 0");
        }
        this.adicionalPorKm = data;
    }

    /** @returns Adicional por kilómetro. */
    public getAdicionalPorKm(): number {
        return this.adicionalPorKm;
    }

    /** @returns Kilometraje actual del vehículo. */
    public getKilometrajeActual(): number {
        return this.vehiculo.getKilometraje();
    }
}
