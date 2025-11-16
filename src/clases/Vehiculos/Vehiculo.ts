import VehiculoError from "../../clasesDeError/VehiculoError";

/**
 * Clase abstracta que representa un vehículo.
 * Proporciona métodos para manejar la patente y el kilometraje.
 * @abstract
 */
export default abstract class Vehiculo {

    /** @protected La patente del vehículo */
    protected patente!: string;

    /** @protected El kilometraje del vehículo */
    protected kilometraje!: number;

    /**
     * Crea una instancia de Vehiculo.
     * @param {string} patente - La patente del vehículo.
     * @param {number} kilometraje - El kilometraje inicial del vehículo.
     * @throws {VehiculoError} Si la patente está vacía o el kilometraje es inválido.
     */
    constructor(patente: string, kilometraje: number) {
        this.setPatente(patente);
        this.setKilometraje(kilometraje);
    }

    /**
     * Establece la patente del vehículo.
     * @param {string} data - La nueva patente.
     * @throws {VehiculoError} Si la patente está vacía o solo contiene espacios.
     */
    public setPatente(data: string): void {
        if (!data || data.trim() === "") {
            throw new VehiculoError("La patente no puede estar vacía");
        }
        this.patente = data;
    }

    /**
     * Obtiene la patente del vehículo.
     * @returns {string} La patente del vehículo.
     */
    public getPatente(): string {
        return this.patente;
    }

    /**
     * Establece el kilometraje del vehículo.
     * @param {number} data - El nuevo kilometraje.
     * @throws {VehiculoError} Si el kilometraje no es un número finito o es menor que 0.
     */
    public setKilometraje(data: number): void {
        if (!Number.isFinite(data) || data < 0) {
            throw new VehiculoError("El kilometraje debe ser un número mayor o igual a 0");
        }
        this.kilometraje = data;
    }

    /**
     * Obtiene el kilometraje del vehículo.
     * @returns {number} El kilometraje actual del vehículo.
     */
    public getKilometraje(): number {
        return this.kilometraje;
    }
}