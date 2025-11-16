import CalculadoraDeTarifa from "../src/clases/Calculadoras/CalculadoraDeTarifa";
import GestorDeVehiculo from "../src/clases/Gestores/GestorDeVehiculo";
import CalculadoraError from "../src/clasesDeError/CalculadoraError";

class CalculadoraDeTarifaTest extends CalculadoraDeTarifa {
    public calcularTarifaTotal(
        fechaInicio: Date,
        fechaFin: Date,
        kmTotales: number,
        vehiculo: GestorDeVehiculo,
        recargoTemporada: number
    ): number {
        return 0;
    }
}

describe("Test de la clase CalculadoraDeTarifa", () => {
    let calculadora: CalculadoraDeTarifaTest;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {
        calculadora = new CalculadoraDeTarifaTest();
        fechaInicio = new Date("2025-01-01");
        fechaFin = new Date("2025-01-11");
    });

    test("Debe instanciar un objeto del tipo CalculadoraDeTarifa", () => {
        expect(calculadora).toBeInstanceOf(CalculadoraDeTarifaTest);
    });

    test("getDiasTotales devuelve correctamente la cantidad de días entre dos fechas", () => {
        const dias = calculadora.getDiasTotales(fechaInicio, fechaFin);
        expect(dias).toBe(10);
    });

    test("getDiasTotales devuelve error si fechaInicio es inválida", () => {
        const fechaInvalida = new Date("2025-01-00");
        expect(() => calculadora.getDiasTotales(fechaInvalida, fechaFin)).toThrow(CalculadoraError);
        expect(() => calculadora.getDiasTotales(fechaInvalida, fechaFin)).toThrow("Fecha de inicio no válida");
    });

    test("getDiasTotales devuelve error si fechaFin es inválida", () => {
        const fechaInvalida = new Date("2025-01-32");
        expect(() => calculadora.getDiasTotales(fechaInicio, fechaInvalida)).toThrow(CalculadoraError);
        expect(() => calculadora.getDiasTotales(fechaInicio, fechaInvalida)).toThrow("Fecha de fin no válida");
    });

    test("getDiasTotales devuelve error si fechaFin < fechaInicio", () => {
        expect(() => calculadora.getDiasTotales(fechaFin, fechaInicio)).toThrow(CalculadoraError);
        expect(() => calculadora.getDiasTotales(fechaFin, fechaInicio)).toThrow("La fecha de fin no puede ser anterior a la fecha de inicio");
    });
});