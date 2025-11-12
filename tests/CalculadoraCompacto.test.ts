import CalculadoraCompacto from "../src/clases/Calculadoras/CalculadoraCompacto";
import GestorDeVehiculo from "../src/clases/GestorDeVehiculo";

class GestorDeVehiculoDummy {
    getTarifaBase() { return 100; }
    getLimiteDiarioKm() { return 200; }
    getAdicionalPorKm() { return 2; }
}

describe("Test de CalculadoraCompacto", () => {
    let calculadora: CalculadoraCompacto;
    let vehiculo: GestorDeVehiculo;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {
        calculadora = new CalculadoraCompacto();
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

    test("Calcula la tarifa correctamente sin recargo por km", () => {
        const kmTotales = 900;
        const recargoTemporada = 0.1;
        const tarifa = calculadora.calcularTarifaTotal(fechaInicio, fechaFin, kmTotales, vehiculo, recargoTemporada);
        expect(tarifa).toBe(50);
    });

    test("Calcula la tarifa correctamente con recargo por km", () => {
        const kmTotales = 1200;
        const recargoTemporada = 0.1;
        const tarifa = calculadora.calcularTarifaTotal(fechaInicio, fechaFin, kmTotales, vehiculo, recargoTemporada);
        expect(tarifa).toBe(2450);
    });

    test("Calcula la tarifa correctamente con km justo en el límite", () => {
        const kmTotales = 1000;
        const recargoTemporada = 0.2;
        const tarifa = calculadora.calcularTarifaTotal(fechaInicio, fechaFin, kmTotales, vehiculo, recargoTemporada);
        expect(tarifa).toBe(100);
    });
});
