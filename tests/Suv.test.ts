import Suv from "../src/clases/Vehiculos/Suv";
import VehiculoError from "../src/clasesDeError/VehiculoError";

describe("Suv", () => {
    let vehiculo: Suv;

    beforeEach(() => {
        vehiculo = new Suv("GHI789", 3000);
    });

    test("Debe instanciar correctamente el vehículo", () => {
        expect(vehiculo).toBeInstanceOf(Suv);
    });

    test("Debe devolver y setear la patente correctamente", () => {
        expect(vehiculo.getPatente()).toBe("GHI789");
        vehiculo.setPatente("RST456");
        expect(vehiculo.getPatente()).toBe("RST456");
        expect(() => vehiculo.setPatente("")).toThrow(VehiculoError);
    });

    test("Debe devolver y setear el kilometraje correctamente", () => {
        expect(vehiculo.getKilometraje()).toBe(3000);
        vehiculo.setKilometraje(3500);
        expect(vehiculo.getKilometraje()).toBe(3500);
        expect(() => vehiculo.setKilometraje(-5)).toThrow(VehiculoError);
        expect(() => vehiculo.setKilometraje(NaN)).toThrow(VehiculoError);
    });
});
