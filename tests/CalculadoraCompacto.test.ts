import CalculadoraCompacto from "../src/clases/Calculadoras/CalculadoraCompacto";
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

describe("CalculadoraCompacto", () => {
    let calculadora: CalculadoraCompacto;
    let vehiculo: GestorDeVehiculo;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {
        calculadora = new CalculadoraCompacto();


        vehiculo = new GestorDeVehiculoDummy(100, 200, 2) as unknown as GestorDeVehiculo;

        fechaInicio = new Date("2025-01-01");
        fechaFin = new Date("2025-01-06")
    });

    test("Calcula la tarifa correctamente sin recargo por km", () => {
        const kmTotales = 900;
        const recargoTemporada = 0.1;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, vehiculo, recargoTemporada
        );

        expect(tarifa).toBe(50);
    });

    test("Calcula la tarifa correctamente con recargo por km", () => {
        const kmTotales = 1200;
        const recargoTemporada = 0.1;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, vehiculo, recargoTemporada
        );

        expect(tarifa).toBe(2450);
    });

    test("No cobra extra cuando el km diario está justo en el límite", () => {
        const kmTotales = 1000;
        const recargoTemporada = 0.2;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, vehiculo, recargoTemporada
        );

        expect(tarifa).toBe(100);
    });

    test("Cobra un día completo cuando la diferencia de fechas es 0", () => {
        const fecha = new Date("2025-01-01");
        const recargoTemporada = 0.5;

        const tarifa = calculadora.calcularTarifaTotal(
            fecha, fecha, 0, vehiculo, recargoTemporada
        );

        expect(tarifa).toBe(50);
    });

    test("Lanza error cuando la fecha fin es anterior", () => {
        const fechaInicio = new Date("2025-01-10");
        const fechaFin = new Date("2025-01-05");

        expect(() =>
            calculadora.calcularTarifaTotal(
                fechaInicio, fechaFin, 100, vehiculo, 0.1
            )
        ).toThrow(CalculadoraError);
    });
});