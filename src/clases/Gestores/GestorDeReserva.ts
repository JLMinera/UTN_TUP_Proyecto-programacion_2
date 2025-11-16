
import Temporada from "../Temporadas/Temporada";
import GestorDeVehiculo from "../Gestores/GestorDeVehiculo";
import Cliente from "../Personas/Cliente";
import EstadoReservado from "../Estados/EstadoReservado";
import GestorDeReservaError from "../../clasesDeError/GestorDeReservaError";

/**
 * Clase encargada de gestionar una reserva de un vehículo.
 * Registra kilometrajes, calcula costos totales y controla la devolución 
 * del vehículo, asegurando la coherencia de la información.
 */
export default class GestorDeReserva {

    /** Kilometraje inicial al iniciar la reserva. */
    private kmInicial!: number;
    /** Kilometraje final al devolver el vehículo. */
    private kmFinal!: number;
    /** Gestor del vehículo reservado. */
    private vehiculo: GestorDeVehiculo;
    /** Indica si el vehículo ya fue devuelto. */
    private vehiculoDevuelto: boolean = false;
    /** Estado de reserva que contiene fechas y cliente. */
    private reserva: EstadoReservado;
    /** Temporada vigente al momento de la reserva. */
    private temporada: Temporada;
    /** Costo total acumulado/calculado. */
    private costoTotal: number = 0;

    /**
     * Crea el gestor de una reserva asociada a un vehículo, un estado de reserva y una temporada.
     * Se toma automáticamente el kilometraje inicial del vehículo.
     * 
     * @throws GestorDeReservaError si el kilometraje inicial es inválido.
     */
    constructor(vehiculo: GestorDeVehiculo, reserva: EstadoReservado, temporada: Temporada) {
        this.vehiculo = vehiculo;
        this.reserva = reserva;
        this.temporada = temporada;
        this.setKmInicial(vehiculo.getKilometrajeActual());
    }

    /**
     * Establece el kilometraje inicial.
     * @throws GestorDeReservaError si es negativo.
     */
    public setKmInicial(data: number) {
        if (data < 0) {
            throw new GestorDeReservaError("El kilometraje inicial no puede ser negativo");
        }
        this.kmInicial = data;
    }

    /** @returns Kilometraje inicial. */
    public getKmInicial(): number {
        return this.kmInicial;
    }

    /**
     * Establece el kilometraje final.
     * @throws GestorDeReservaError si es menor al inicial.
     */
    public setKmFinal(data: number) {
        if (data < this.kmInicial) {
            throw new GestorDeReservaError("El kilometraje final no puede ser menor que el inicial");
        }
        this.kmFinal = data;
    }

    /** @returns Kilometraje final. */
    public getKmFinal(): number {
        return this.kmFinal;
    }

    /**
     * Calcula la distancia recorrida durante la reserva.
     * @throws GestorDeReservaError si aún no se registró el km final.
     */
    public getDistanciaRecorrida(): number {
        if (this.kmFinal === undefined) {
            throw new GestorDeReservaError("El kilometraje final aún no fue registrado");
        }
        return this.kmFinal - this.kmInicial;
    }

    /** @returns Cliente asociado a la reserva. */
    public getCliente(): Cliente {
        return this.reserva.getCliente();
    }

    /** @returns El vehículo reservado. */
    public getVehiculo(): GestorDeVehiculo {
        return this.vehiculo;
    }

    /** Establece el vehículo asociado. */
    public setVehiculo(data: GestorDeVehiculo) {
        this.vehiculo = data;
    }

    /** @returns true si el vehículo ya fue devuelto. */
    public getVehiculoDevuelto(): boolean {
        return this.vehiculoDevuelto;
    }

    /** @returns Fecha de inicio de la reserva. */
    public getFechaInicio(): Date {
        return this.reserva.getFechaInicio();
    }

    /** @returns Fecha de fin de la reserva. */
    public getFechaFin(): Date {
        return this.reserva.getFechaFin();
    }

    /** Establece la temporada vigente. */
    public setTemporada(data: Temporada) {
        this.temporada = data;
    }

    /** @returns Temporada asociada a la reserva. */
    public getTemporada(): Temporada {
        return this.temporada;
    }

    /**
     * Establece el costo total acumulado.
     * @throws GestorDeReservaError si es negativo.
     */
    public setCostoTotal(data: number) {
        if (data < 0) {
            throw new GestorDeReservaError("El costo total no puede ser negativo");
        }
        this.costoTotal = data;
    }

    /** @returns Costo total calculado. */
    public getCostoTotal(): number {
        return this.costoTotal;
    }

    /**
     * Marca al vehículo como devuelto.
     * Registra automáticamente el kilometraje final desde el vehículo actual.
     * 
     * @throws GestorDeReservaError si ya fue devuelto previamente.
     */
    public setVehiculoDevuelto(): void {
        if (this.vehiculoDevuelto) {
            throw new GestorDeReservaError("El vehículo ya fue devuelto");
        }
        this.vehiculoDevuelto = true;

        this.setKmFinal(this.vehiculo.getKilometrajeActual());
    }

    /**
     * Calcula la tarifa total de la reserva utilizando la calculadora del vehículo.
     * 
     * @returns Tarifa final obtenida por la calculadora.
     * @throws GestorDeReservaError si se intenta calcular antes de la devolución del vehículo.
     */
    public tarifaFinalDeReserva(): number {
        if (!this.vehiculoDevuelto) {
            throw new GestorDeReservaError("No se puede calcular la tarifa antes de devolver el vehículo");
        }

        return this.vehiculo.getCalculadora().calcularTarifaTotal(
            this.getFechaInicio(),
            this.getFechaFin(),
            this.getDistanciaRecorrida(),
            this.getVehiculo(),
            this.getTemporada().getRecargo()
        );
    }
}
