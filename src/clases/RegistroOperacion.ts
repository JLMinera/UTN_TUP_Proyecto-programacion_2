/**
 * Clase que representa una operación registrada sobre un vehículo.
 * Puede ser un alquiler o un mantenimiento, y almacena la fecha y el costo asociado.
 */
export default class RegistroOperacion {
    /** Fecha en la que se realizó la operación */
    private fecha!: Date;

    /** Costo de la operación */
    private costo!: number;

    /**
     * Crea una nueva instancia de RegistroOperacion.
     * @param fecha - Fecha en la que se realizó la operación.
     * @param costo - Costo asociado a la operación.
     */
    constructor(fecha: Date, costo: number) {
        this.setFecha(fecha);
        this.setCosto(costo);
    }

    /**
     * Establece la fecha de la operación.
     * @param data - Fecha de la operación.
     */
    public setFecha(data: Date): void {
        this.fecha = data;
    }

    /**
     * Devuelve la fecha de la operación.
     * @returns Fecha en la que se realizó la operación.
     */
    public getFecha(): Date {
        return this.fecha;
    }

    /**
     * Establece el costo de la operación.
     * @param data - Valor numérico del costo.
     */
    public setCosto(data: number): void {
        this.costo = data;
    }

    /**
     * Devuelve el costo de la operación.
     * @returns Costo asociado a la operación.
     */
    public getCosto(): number {
        return this.costo;
    }
}