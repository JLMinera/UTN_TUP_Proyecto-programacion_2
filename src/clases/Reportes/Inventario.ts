import RegistroOperacion from "./RegistroOperacion";
import GestorDeReserva from "../Gestores/GestorDeReserva";
import GestorDeVehiculo from "../Gestores/GestorDeVehiculo";

/**
 * Clase que representa el inventario de vehículos de la empresa.
 * Se encarga de registrar operaciones de alquiler y mantenimiento,
 * y de calcular estadísticas sobre los vehículos como porcentaje de alquiler,
 * vehículos más/menos alquilados y mayor/menor rentabilidad.
 */
export default class Inventario {
    /** Cantidad total de vehículos registrados en el inventario */
    private totalVehiculos: number;

    /** Mapa de vehículos actualmente en alquiler, con su historial de operaciones */
    private vehiculosEnAlquiler: Map<string, RegistroOperacion[]>;

    /** Mapa de vehículos actualmente en mantenimiento, con su historial de operaciones */
    private vehiculosEnMantenimiento: Map<string, RegistroOperacion[]>;

    /**
     * Crea una nueva instancia del inventario.
     * Inicializa los mapas de vehículos en alquiler y mantenimiento.
     * @param totalVehiculos - Número total de vehículos que forman parte del inventario.
     */
    constructor(totalVehiculos: number) {
        this.totalVehiculos = totalVehiculos;
        this.vehiculosEnAlquiler = new Map<string, RegistroOperacion[]>();
        this.vehiculosEnMantenimiento = new Map<string, RegistroOperacion[]>();
    }

    /**
     * Registra un alquiler de vehículo en el inventario.
     * Llama al método enviarReservar del gestor de vehículo para que el estado
     * del vehículo se actualice y guarda la operación en el historial.
     * @param reserva - Instancia de GestorDeReserva que contiene información de la reserva.
     * @param vehiculo - Instancia de GestorDeVehiculo correspondiente al vehículo alquilado.
     */
    public registrarAlquiler(reserva: GestorDeReserva, vehiculo: GestorDeVehiculo): void {
        try {
            vehiculo.enviarReservar(reserva.getCliente(), reserva.getFechaInicio(), reserva.getFechaFin());

            const operacion = new RegistroOperacion(reserva.getFechaInicio(), reserva.tarifaFinalDeReserva());

            if (!this.vehiculosEnAlquiler.has(reserva.getVehiculo().getVehiculo().getPatente())) {
                this.vehiculosEnAlquiler.set(reserva.getVehiculo().getVehiculo().getPatente(), [operacion]);
            } else {
                let operaciones = this.vehiculosEnAlquiler.get(reserva.getVehiculo().getVehiculo().getPatente());
                if (!operaciones) {
                    operaciones = [];
                    this.vehiculosEnAlquiler.set(reserva.getVehiculo().getVehiculo().getPatente(), operaciones);
                }
                operaciones.push(operacion);
                this.vehiculosEnAlquiler.set(reserva.getVehiculo().getVehiculo().getPatente(), operaciones);
            }
        } catch (error) {
            // Ignora errores internos para no detener el flujo
        }
    }

    /**
     * Registra un mantenimiento de vehículo en el inventario.
     * Llama al método dispararMantenimiento del gestor de vehículo y
     * agrega la operación al historial de mantenimientos del vehículo.
     * @param vehiculo - Instancia de GestorDeVehiculo que recibe mantenimiento.
     * @param costo - Costo del mantenimiento.
     * @param distanciaRecorrida - Kilometraje recorrido hasta el mantenimiento.
     * @param fecha - Fecha en la que se realiza el mantenimiento.
     */
    public registrarMantenimiento(vehiculo: GestorDeVehiculo, costo: number, distanciaRecorrida: number, fecha: Date) {
        try {
            vehiculo.enviarMantenimiento(costo, fecha);

            const operacion = new RegistroOperacion(fecha, costo);

            if (!this.vehiculosEnMantenimiento.has(vehiculo.getVehiculo().getPatente())) {
                this.vehiculosEnMantenimiento.set(vehiculo.getVehiculo().getPatente(), [operacion]);
            } else {
                let operaciones = this.vehiculosEnMantenimiento.get(vehiculo.getVehiculo().getPatente());
                if (!operaciones) {
                    operaciones = [];
                    this.vehiculosEnAlquiler.set(vehiculo.getVehiculo().getPatente(), operaciones);
                }
                operaciones.push(operacion);
                this.vehiculosEnMantenimiento.set(vehiculo.getVehiculo().getPatente(), operaciones);
            }
        } catch (error) {
            // Ignora errores internos para no detener el flujo
        }
    }

    /**
     * Calcula el porcentaje de vehículos alquilados en un rango de fechas.
     * @param fechaInicio - Fecha inicial del período a evaluar.
     * @param fechaFin - Fecha final del período a evaluar.
     * @returns Porcentaje de vehículos alquilados respecto del total del inventario.
     */
    public porcentajeVehiculosAlquilados(fechaInicio: Date, fechaFin: Date) {
        let totalVehiculosAlquilados = 0;
        let encontrado = false;

        for (const [patente, operaciones] of this.vehiculosEnAlquiler) {
            for (const operacion of operaciones) {
                let fechaOperacion = operacion.getFecha();
                if (fechaOperacion >= fechaInicio && fechaOperacion <= fechaFin && !encontrado) {
                    totalVehiculosAlquilados++;
                    encontrado = true;
                }
            }
            encontrado = false;
        }

        return (totalVehiculosAlquilados / this.totalVehiculos) * 100;
    }

    /**
     * Devuelve la patente del vehículo menos alquilado en un rango de fechas.
     * @param fechaInicio - Fecha inicial del período.
     * @param fechaFin - Fecha final del período.
     * @returns Patente del vehículo con menor número de alquileres.
     */
    public vehiculoMenosAlquilado(fechaInicio: Date, fechaFin: Date): string {
        let minPatente: string = "";
        let minCantidad = Infinity;

        for (const [patente, operaciones] of this.vehiculosEnAlquiler) {
            const cantidad = operaciones.filter(op =>
                op.getFecha() >= fechaInicio && op.getFecha() <= fechaFin
            ).length;

            if (cantidad <= minCantidad) {
                minCantidad = cantidad;
                minPatente = patente;
            }
        }

        return minPatente;
    }

    /**
     * Devuelve la patente del vehículo más alquilado en un rango de fechas.
     * @param fechaInicio - Fecha inicial del período.
     * @param fechaFin - Fecha final del período.
     * @returns Patente del vehículo con mayor número de alquileres.
     */
    public vehiculoMasAlquilado(fechaInicio: Date, fechaFin: Date): string {
        let maxPatente: string = "";
        let maxCantidad = 0;

        for (const [patente, operaciones] of this.vehiculosEnAlquiler) {
            const cantidad = operaciones.filter(op =>
                op.getFecha() >= fechaInicio && op.getFecha() <= fechaFin
            ).length;

            if (cantidad > maxCantidad) {
                maxCantidad = cantidad;
                maxPatente = patente;
            }
        }

        return maxPatente;
    }

    /**
     * Calcula la rentabilidad de un vehículo, definida como la diferencia
     * entre ingresos por alquiler y egresos por mantenimiento.
     * @param patente - Patente del vehículo a evaluar.
     * @returns Rentabilidad calculada (ingresos - egresos).
     */
    private calcularRentabilidadPatente(patente: string): number {
        let ingresos = 0;
        let egresos = 0;

        const alquileres = this.vehiculosEnAlquiler.get(patente) ?? [];
        const mantenimientos = this.vehiculosEnMantenimiento.get(patente) ?? [];

        ingresos = alquileres.reduce((acc, op) => acc + op.getCosto(), 0);
        egresos = mantenimientos.reduce((acc, op) => acc + op.getCosto(), 0);

        return ingresos - egresos;
    }

    /**
     * Determina el vehículo con mayor rentabilidad.
     * @returns Patente del vehículo más rentable.
     */
    public vehiculoMayorRentabilidad(): string {
        let maxPatente: string = "";
        let maxValor = 0;

        for (const patente of this.vehiculosEnAlquiler.keys()) {
            const rentabilidad = this.calcularRentabilidadPatente(patente);
            if (rentabilidad > maxValor) {
                maxValor = rentabilidad;
                maxPatente = patente;
            }
        }

        return maxPatente;
    }

    /**
     * Determina el vehículo con menor rentabilidad.
     * @returns Patente del vehículo menos rentable.
     */
    public vehiculoMenorRentabilidad(): string {
        let minPatente: string = "";
        let minValor = 0;

        for (const patente of this.vehiculosEnAlquiler.keys()) {
            const rentabilidad = this.calcularRentabilidadPatente(patente);
            if (minValor === 0 || rentabilidad < minValor) {
                minValor = rentabilidad;
                minPatente = patente;
            }
        }

        return minPatente;
    }
}