import CalculadoraSedan from "../src/clases/Calculadoras/CalculadoraSedan";
import CalculadoraError from "../src/clasesDeError/CalculadoraError";
import GestorDeVehiculo from "../src/clases/GestorDeVehiculo";

class GestorDeVehiculoDummy {
    constructor(
        private tarifaBase: number,
        private limiteKm: number,
        private adicionalKm: number
    ) { }

    getTarifaBase() {
        return this.tarifaBase;
    }

    getLimiteDiarioKm() {
        return this.limiteKm;
    }

    getAdicionalPorKm() {
        return this.adicionalKm;
    }
}

describe("CalculadoraSedan", () => {
    let calculadora: CalculadoraSedan;
    let vehiculo: GestorDeVehiculo;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {
        calculadora = new CalculadoraSedan();
        vehiculo = new GestorDeVehiculoDummy(100, 200, 5) as unknown as GestorDeVehiculo;
        fechaInicio = new Date("2025-01-01");
        fechaFin = new Date("2025-01-06");
    });

    it("Calcula la tarifa correctamente con valores típicos", () => {
        const kmTotales = 300;
        const recargoTemporada = 0.2;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, vehiculo, recargoTemporada
        );

        expect(tarifa).toBe((5 * (0.2 * 100)) + (5 * 300));
    });

    it("Calcula correctamente con recargoTemporada bajo", () => {
        const kmTotales = 150;
        const recargoTemporada = 0.05;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, vehiculo, recargoTemporada
        );

        expect(tarifa).toBe((5 * (0.05 * 100)) + (5 * 150));
    });

    it("Cobra un día cuando las fechas son iguales", () => {
        const fecha = new Date("2025-01-01");
        const kmTotales = 50;
        const recargoTemporada = 0.3;

        const tarifa = calculadora.calcularTarifaTotal(
            fecha, fecha, kmTotales, vehiculo, recargoTemporada
        );

        expect(tarifa).toBe((1 * (0.3 * 100)) + (5 * 50));
    });

    it("Lanza error cuando la fecha fin es anterior a la fecha inicio", () => {
        const fechaInicio = new Date("2025-01-10");
        const fechaFin = new Date("2025-01-05");

        expect(() =>
            calculadora.calcularTarifaTotal(
                fechaInicio, fechaFin, 120, vehiculo, 0.1
            )
        ).toThrow(CalculadoraError);
    });

    it("Calcula correctamente cuando kmTotales es 0", () => {
        const kmTotales = 0;
        const recargoTemporada = 0.15;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, vehiculo, recargoTemporada
        );

        expect(tarifa).toBe(5 * (0.15 * 100));
    });
});