import Estado from "./Estado";

export default abstract class Vehiculo {

    protected patente: string;
    protected kilometraje: number;
    protected tarifaBase: number;
    protected adicionalPorKm: number;
    protected limiteDiarioKm: number;
    protected seguro: number;

    constructor(patente: string, kilometraje: number, tarifaBase: number, adicionalPorKm: number, limiteDiarioKm: number, seguro: number) {
        this.patente = patente;
        this.kilometraje = kilometraje;
        this.tarifaBase = tarifaBase;
        this.adicionalPorKm = adicionalPorKm;
        this.seguro = seguro;
        this.limiteDiarioKm = limiteDiarioKm;
    }

    public setPatente(data: string) {
        this.patente = data;
    }
    public getPatente(): string {
        return this.patente;
    }

    public setKilometraje(data: number) {
        this.kilometraje = data;
    }
    public getKilometraje(): number {
        return this.kilometraje;
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

}