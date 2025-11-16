import CalculadoraSedan from "../src/clases/Calculadoras/CalculadoraSedan";
import CalculadoraError from "../src/clasesDeError/CalculadoraError";
import GestorDeVehiculo from "../src/clases/Gestores/GestorDeVehiculo";
import VehiculoSedan from "../src/clases/Vehiculos/VehiculoSedan";

describe("CalculadoraSedan", () => {
    let calculadora: CalculadoraSedan;
    let gestorVehiculo: GestorDeVehiculo;
    let fechaInicio: Date;
    let fechaFin: Date;
    let vehiculo: VehiculoSedan;

    beforeEach(() => {
        calculadora = new CalculadoraSedan();
        vehiculo = new VehiculoSedan("ABC123", 0);
            vehiculo.setKilometraje(1000);
        gestorVehiculo = new GestorDeVehiculo(vehiculo, calculadora, 100, 200, 5, 100);
        fechaInicio = new Date("2025-01-01");
        fechaFin = new Date("2025-01-06");
    });

    it("Calcula la tarifa correctamente con valores típicos", () => {
        const kmTotales = 300;
        const recargoTemporada = 0.2;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, gestorVehiculo, recargoTemporada
        );

        expect(tarifa).toBe(60100);
    });

    it("Calcula correctamente con recargoTemporada bajo", () => {
        const kmTotales = 150;
        const recargoTemporada = 0.05;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, gestorVehiculo, recargoTemporada
        );

        expect(tarifa).toBe(30025);
    });

    it("Cobra un día cuando las fechas son iguales", () => {
        const fecha = new Date("2025-01-01");
        const kmTotales = 50;
        const recargoTemporada = 0.3;

        const tarifa = calculadora.calcularTarifaTotal(
            fecha, fecha, kmTotales, gestorVehiculo, recargoTemporada
        );

        expect(tarifa).toBe(10030);
    });

    it("Lanza error cuando la fecha fin es anterior a la fecha inicio", () => {
        const fechaInicio = new Date("2025-01-10");
        const fechaFin = new Date("2025-01-05");

        expect(() =>
            calculadora.calcularTarifaTotal(
                fechaInicio, fechaFin, 120, gestorVehiculo, 0.1
            )
        ).toThrow(CalculadoraError);
    });

    it("Calcula correctamente cuando kmTotales es 0", () => {
        const kmTotales = 0;
        const recargoTemporada = 0.15;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, gestorVehiculo, recargoTemporada
        );

        expect(tarifa).toBe(75);
    });
});