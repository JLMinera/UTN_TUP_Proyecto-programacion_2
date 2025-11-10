import Sedan from "../src/clases/Sedan";
import VehiculoError from "../src/clasesDeError/VehiculoError";

describe("Sedan", () => {
    let vehiculo: Sedan;

    beforeEach(() => {
        vehiculo = new Sedan("DEF456", 2000);
    });

    test("Debe instanciar correctamente el vehículo", () => {
        expect(vehiculo).toBeInstanceOf(Sedan);
    });

    test("Debe devolver y setear la patente correctamente", () => {
        expect(vehiculo.getPatente()).toBe("DEF456");
        vehiculo.setPatente("UVW123");
        expect(vehiculo.getPatente()).toBe("UVW123");
        expect(() => vehiculo.setPatente("")).toThrow(VehiculoError);
    });

    test("Debe devolver y setear el kilometraje correctamente", () => {
        expect(vehiculo.getKilometraje()).toBe(2000);
        vehiculo.setKilometraje(2500);
        expect(vehiculo.getKilometraje()).toBe(2500);
        expect(() => vehiculo.setKilometraje(-10)).toThrow(VehiculoError);
        expect(() => vehiculo.setKilometraje(NaN)).toThrow(VehiculoError);
    });
});
