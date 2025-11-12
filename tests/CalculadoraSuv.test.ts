import CalculadoraSuv from "../src/clases/Calculadoras/CalculadoraSuv";
import GestorDeVehiculo from "../src/clases/GestorDeVehiculo";

class GestorDeVehiculoDummy {
    getTarifaBase() { return 100; }
    getSeguro() { return 50; }
    getLimiteDiarioKm() { return 200; }
    getAdicionalPorKm() { return 2; }
}

describe("Test de CalculadoraSuv", () => {
    let calculadora: CalculadoraSuv;
    let vehiculo: GestorDeVehiculo;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {
        calculadora = new CalculadoraSuv();
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

    test("Calcula la tarifa correctamente dentro del límite diario de km", () => {
        const kmTotales = 100;
        const recargoTemporada = 0.1;
        const tarifa = calculadora.calcularTarifaTotal(fechaInicio, fechaFin, kmTotales, vehiculo, recargoTemporada);
        expect(tarifa).toBe(300);
    });

    test("Calcula la tarifa correctamente superando el límite diario de km", () => {
        const kmTotales = 500;
        const recargoTemporada = 0.2;
        const tarifa = calculadora.calcularTarifaTotal(fechaInicio, fechaFin, kmTotales, vehiculo, recargoTemporada);
        expect(tarifa).toBe(1350);
    });
});
