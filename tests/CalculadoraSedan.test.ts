import CalculadoraSedan from "../src/clases/Calculadoras/CalculadoraSedan";
import GestorDeVehiculo from "../src/clases/GestorDeVehiculo";

class GestorDeVehiculoDummy {
    getTarifaBase() { return 100; }
    getAdicionalPorKm() { return 2; }
}

describe("Test de CalculadoraSedan", () => {
    let calculadora: CalculadoraSedan;
    let vehiculo: GestorDeVehiculo;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {
        calculadora = new CalculadoraSedan();
        vehiculo = {} as GestorDeVehiculo;
        vehiculo = new Proxy(vehiculo, {
            get: (_, prop) => {
                const dummy = new GestorDeVehiculoDummy();
                return (dummy as any)[prop];
            }
        });
        fechaInicio = new Date("2025-01-01");
        fechaFin = new Date("2025-01-06");
    });

    test("Calcula la tarifa correctamente con kmTotales y recargoTemporada", () => {
        const kmTotales = 500;
        const recargoTemporada = 0.1;
        const tarifa = calculadora.calcularTarifaTotal(fechaInicio, fechaFin, kmTotales, vehiculo, recargoTemporada);
        expect(tarifa).toBe(1050);
    });

    test("Calcula la tarifa correctamente con kmTotales mayores", () => {
        const kmTotales = 1200;
        const recargoTemporada = 0.2;
        const tarifa = calculadora.calcularTarifaTotal(fechaInicio, fechaFin, kmTotales, vehiculo, recargoTemporada);
        expect(tarifa).toBe(2500);
    });
});
