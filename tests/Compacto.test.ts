import Compacto from "../src/clases/Compacto";
import VehiculoError from "../src/clasesDeError/VehiculoError";

describe("Compacto", () => {
    let vehiculo: Compacto;

    beforeEach(() => {
        vehiculo = new Compacto("ABC123", 1000);
    });

    test("Debe instanciar correctamente el vehículo", () => {
        expect(vehiculo).toBeInstanceOf(Compacto);
    });

    test("Debe devolver y setear la patente correctamente", () => {
        expect(vehiculo.getPatente()).toBe("ABC123");
        vehiculo.setPatente("XYZ789");
        expect(vehiculo.getPatente()).toBe("XYZ789");
        expect(() => vehiculo.setPatente("")).toThrow(VehiculoError);
    });

    test("Debe devolver y setear el kilometraje correctamente", () => {
        expect(vehiculo.getKilometraje()).toBe(1000);
        vehiculo.setKilometraje(1500);
        expect(vehiculo.getKilometraje()).toBe(1500);
        expect(() => vehiculo.setKilometraje(-1)).toThrow(VehiculoError);
        expect(() => vehiculo.setKilometraje(NaN)).toThrow(VehiculoError);
    });
});
