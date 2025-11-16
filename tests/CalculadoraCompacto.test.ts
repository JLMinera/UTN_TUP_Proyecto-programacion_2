import CalculadoraCompacto from "../src/clases/Calculadoras/CalculadoraCompacto";
import CalculadoraError from "../src/clasesDeError/CalculadoraError";
import GestorDeVehiculo from "../src/clases/Gestores/GestorDeVehiculo";
import VehiculoCompacto from "../src/clases/Vehiculos/VehiculoCompacto";

describe("CalculadoraCompacto", () => {
    let calculadora: CalculadoraCompacto;
    let gestorVehiculo: GestorDeVehiculo;
    let fechaInicio: Date;
    let fechaFin: Date;
    let vehiculo: VehiculoCompacto;

    beforeEach(() => {
        calculadora = new CalculadoraCompacto();
        vehiculo = new VehiculoCompacto("ABC123", 0);
            vehiculo.setKilometraje(1000);
        gestorVehiculo = new GestorDeVehiculo(vehiculo, calculadora, 100, 200, 2, 100);
        fechaInicio = new Date("2025-01-01");
        fechaFin = new Date("2025-01-06");
    });

    test("Calcula la tarifa correctamente sin recargo por km", () => {
        const kmTotales = 900;
        const recargoTemporada = 0.1;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, gestorVehiculo, recargoTemporada
        );

        expect(tarifa).toBe(180050);
    });

    test("Calcula la tarifa correctamente con recargo por km", () => {
        const kmTotales = 1200;
        const recargoTemporada = 0.1;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, gestorVehiculo, recargoTemporada
        );

        expect(tarifa).toBe(240050);
    });

    test("No cobra extra cuando el km diario está justo en el límite", () => {
        const kmTotales = 1000;
        const recargoTemporada = 0.2;

        const tarifa = calculadora.calcularTarifaTotal(
            fechaInicio, fechaFin, kmTotales, gestorVehiculo, recargoTemporada
        );

        expect(tarifa).toBe(200100);
    });

    test("Cobra un día completo cuando la diferencia de fechas es 0", () => {
        const fecha = new Date("2025-01-01");
        const recargoTemporada = 0.5;

        const tarifa = calculadora.calcularTarifaTotal(
            fecha, fecha, 0, gestorVehiculo, recargoTemporada
        );

        expect(tarifa).toBe(50);
    });

    test("Lanza error cuando la fecha fin es anterior", () => {
        const fechaInicio = new Date("2025-01-10");
        const fechaFin = new Date("2025-01-05");

        expect(() =>
            calculadora.calcularTarifaTotal(
                fechaInicio, fechaFin, 100, gestorVehiculo, 0.1
            )
        ).toThrow(CalculadoraError);
    });
});