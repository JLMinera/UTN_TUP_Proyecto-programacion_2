import CalculadoraSuv from "../src/clases/Calculadoras/CalculadoraSuv";
import CalculadoraError from "../src/clasesDeError/CalculadoraError";
import GestorDeVehiculo from "../src/clases/Gestores/GestorDeVehiculo";
import VehiculoSuv from "../src/clases/Vehiculos/VehiculoSuv";

describe("CalculadoraSuv", () => {

    let calculadora: CalculadoraSuv;
    let gestorVehiculo: GestorDeVehiculo;
    let fechaInicio: Date;
    let fechaFin: Date;
    let vehiculo: VehiculoSuv;

    beforeEach(() => {
        calculadora = new CalculadoraSuv();
        vehiculo =  new VehiculoSuv("ABC123", 0);
            vehiculo.setKilometraje(1000);
        gestorVehiculo = new GestorDeVehiculo(vehiculo, calculadora, 500, 50, 200, 100);
        fechaInicio = new Date("2025-01-01");
        fechaFin = new Date("2025-01-06");
    });

    it("Calcula la tarifa correctamente sin cargo extra por km", () => {
        const kmTotales = 100;
        const recargoTemporada = 0.2;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, gestorVehiculo, recargoTemporada
        );

        expect(tarifa).toBe(1000);
    });

    it("Calcula tarifa con cargo extra por km", () => {
        const kmTotales = 500;
        const recargoTemporada = 0.1;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, gestorVehiculo, recargoTemporada
        );


        expect(tarifa).toBe(25750);
    });

    it("Cobra un día completo cuando las fechas son iguales", () => {
        const fecha = new Date("2025-01-01");
        const kmTotales = 50;
        const recargoTemporada = 0.3;

        const tarifa = calculadora.calcularTarifaTotal(
            fecha, fecha, kmTotales, gestorVehiculo, recargoTemporada
        );


        expect(tarifa).toBe(250);
    });

    it("Lanza error cuando la fecha fin es anterior", () => {
        const fechaInicio = new Date("2025-01-10");
        const fechaFin = new Date("2025-01-05");

        expect(() =>
            calculadora.calcularTarifaTotal(
                fechaInicio, fechaFin, 100, gestorVehiculo, 0.1
            )
        ).toThrow(CalculadoraError);
    });

    it("Calcula correctamente cuando kmTotales es 0", () => {
        const kmTotales = 0;
        const recargoTemporada = 0.15;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, gestorVehiculo, recargoTemporada
        );

        expect(tarifa).toBe(875);
    });
});