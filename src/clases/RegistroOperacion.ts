export default class RegistroOperacion {
    private fecha!: Date;
    private costo!: number;

    constructor(fecha: Date, costo: number) {
        this.setFecha(fecha);
        this.setCosto(costo);
    }


    public setFecha(data: Date): void {
        this.fecha = data;
    }

    public getFecha(): Date {
        return this.fecha;
    }

    public setCosto(data: number): void {
        this.costo = data;
    }

    public getCosto(): number {
        return this.costo;
    }
}