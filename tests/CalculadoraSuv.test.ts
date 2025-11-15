import CalculadoraSuv from "../src/clases/Calculadoras/CalculadoraSuv";
import CalculadoraError from "../src/clasesDeError/CalculadoraError";
import GestorDeVehiculo from "../src/clases/GestorDeVehiculo";

class GestorDeVehiculoDummy {
    constructor(
        private tarifaBase: number,
        private limiteKm: number,
        private adicionalKm: number,
        private seguro: number
    ) { }

    getTarifaBase() { return this.tarifaBase; }
    getLimiteDiarioKm() { return this.limiteKm; }
    getAdicionalPorKm() { return this.adicionalKm; }
    getSeguro() { return this.seguro; }
}

describe("CalculadoraSuv", () => {

    let calculadora: CalculadoraSuv;
    let vehiculo: GestorDeVehiculo;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {
        calculadora = new CalculadoraSuv();
        vehiculo = new GestorDeVehiculoDummy(200, 300, 5, 50) as unknown as GestorDeVehiculo;
        fechaInicio = new Date("2025-01-01");
        fechaFin = new Date("2025-01-06");
    });

    it("Calcula la tarifa correctamente sin cargo extra por km", () => {
        const kmTotales = 100;
        const recargoTemporada = 0.2;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, vehiculo, recargoTemporada
        );

        expect(tarifa).toBe(450);
    });

    it("Calcula tarifa con cargo extra por km", () => {
        const kmTotales = 500;
        const recargoTemporada = 0.1;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, vehiculo, recargoTemporada
        );


        expect(tarifa).toBe(2850);
    });

    it("Cobra un día completo cuando las fechas son iguales", () => {
        const fecha = new Date("2025-01-01");
        const kmTotales = 50;
        const recargoTemporada = 0.3;

        const tarifa = calculadora.calcularTarifaTotal(
            fecha, fecha, kmTotales, vehiculo, recargoTemporada
        );


        expect(tarifa).toBe(110);
    });

    it("Lanza error cuando la fecha fin es anterior", () => {
        const fechaInicio = new Date("2025-01-10");
        const fechaFin = new Date("2025-01-05");

        expect(() =>
            calculadora.calcularTarifaTotal(
                fechaInicio, fechaFin, 100, vehiculo, 0.1
            )
        ).toThrow(CalculadoraError);
    });

    it("Calcula correctamente cuando kmTotales es 0", () => {
        const kmTotales = 0;
        const recargoTemporada = 0.15;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, vehiculo, recargoTemporada
        );

        expect(tarifa).toBe(400);
    });
});
