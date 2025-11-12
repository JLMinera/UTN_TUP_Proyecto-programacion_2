import Estado from "../src/clases/Estados/Estado";
import Vehiculo from "../src/clases/Vehiculos/Vehiculo";
import EstadoError from "../src/clasesDeError/EstadoError";

class EstadoTest extends Estado {
    private vehiculos: Map<string, Vehiculo> = new Map();

    public getVehiculos(): Map<string, Vehiculo> {
        return this.vehiculos;
    }

    public quitarVehiculo(patente: string): boolean {
        return this.vehiculos.delete(patente);
    }

    public consultarEstado(patente: string): boolean {
        return this.vehiculos.has(patente);
    }

    public agregarVehiculo(patente: string, vehiculo: Vehiculo): void {
        this.vehiculos.set(patente, vehiculo);
    }
}

describe("Test de la clase Estado", () => {
    let estado: EstadoTest;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {
        fechaInicio = new Date("2025-01-01");
        fechaFin = new Date("2025-01-10");
        estado = new EstadoTest(fechaInicio, fechaFin);
    });

    test("Debe instanciar un objeto del tipo Estado", () => {
        expect(estado).toBeInstanceOf(EstadoTest);
    });

    test("Debe devolver las fechas correctamente", () => {
        expect(estado.getFechaInicio()).toEqual(fechaInicio);
        expect(estado.getFechaFin()).toEqual(fechaFin);
    });

    test("Debe lanzar error si fechaInicio no es válida", () => {
        expect(() => estado.setFechaInicio(new Date("invalid-date"))).toThrow(EstadoError);
        expect(() => estado.setFechaInicio(new Date("invalid-date"))).toThrow("La fecha de inicio no es válida");
    });

    test("Debe lanzar error si fechaFin no es válida", () => {
        expect(() => estado.setFechaFin(new Date("invalid-date"))).toThrow(EstadoError);
        expect(() => estado.setFechaFin(new Date("invalid-date"))).toThrow("La fecha de fin no es válida");
    });

    test("Debe lanzar error si fechaFin es anterior a fechaInicio", () => {
        expect(() => estado.setFechaFin(new Date("2024-12-31"))).toThrow(EstadoError);
        expect(() => estado.setFechaFin(new Date("2024-12-31"))).toThrow("La fecha de fin no puede ser anterior a la fecha de inicio");
    });

    test("Debe lanzar error si fechaInicio es posterior a fechaFin", () => {
        expect(() => estado.setFechaInicio(new Date("2025-12-31"))).toThrow(EstadoError);
        expect(() => estado.setFechaInicio(new Date("2025-12-31"))).toThrow("La fecha de inicio no puede ser posterior a la fecha de fin");
    });
});
