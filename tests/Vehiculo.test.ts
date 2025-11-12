import Vehiculo from "../src/clases/Vehiculos/Vehiculo";
import VehiculoError from "../src/clasesDeError/VehiculoError";

class VehiculoDummy extends Vehiculo {
    constructor(patente: string, kilometraje: number) {
        super(patente, kilometraje);
    }
}

describe("Vehiculo", () => {
    let vehiculo: Vehiculo;

    beforeEach(() => {
        vehiculo = new VehiculoDummy("ABC123", 1000);
    });

    test("Debería crear un vehículo correctamente", () => {
        expect(vehiculo.getPatente()).toBe("ABC123");
        expect(vehiculo.getKilometraje()).toBe(1000);
    });

    test("Debería setear y obtener la patente correctamente", () => {
        vehiculo.setPatente("XYZ789");
        expect(vehiculo.getPatente()).toBe("XYZ789");
    });

    test("Debería lanzar error si la patente es vacía", () => {
        expect(() => vehiculo.setPatente("")).toThrow(VehiculoError);
        expect(() => vehiculo.setPatente("")).toThrow("La patente no puede estar vacía");
    });

    test("Debería setear y obtener el kilometraje correctamente", () => {
        vehiculo.setKilometraje(5000);
        expect(vehiculo.getKilometraje()).toBe(5000);
    });

    test("Debería lanzar error si el kilometraje es negativo", () => {
        expect(() => vehiculo.setKilometraje(-10)).toThrow(VehiculoError);
        expect(() => vehiculo.setKilometraje(-10)).toThrow("El kilometraje debe ser un número mayor o igual a 0");
    });

    test("Debería lanzar error si el kilometraje no es un número finito", () => {
        expect(() => vehiculo.setKilometraje(Number.POSITIVE_INFINITY)).toThrow(VehiculoError);
        expect(() => vehiculo.setKilometraje(Number.POSITIVE_INFINITY)).toThrow("El kilometraje debe ser un número mayor o igual a 0");
    });
});