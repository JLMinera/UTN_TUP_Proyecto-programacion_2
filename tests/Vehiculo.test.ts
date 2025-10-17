import Vehiculo from "../src/clases/Vehiculo";
import Estado from "../src/clases/Estado";
import Disponible from "../src/clases/Disponible";
import Mantenimiento from "../src/clases/Mantenimiento";


class VehiculoTest extends Vehiculo{}

describe("test de la clase Vehiculo", () => {
  let vehiculo1: VehiculoTest;
  let disponible: Disponible;
  let mantenimiento: Mantenimiento;

beforeEach(() => {
    disponible = new Disponible(20250101, 20251231);
    mantenimiento = new Mantenimiento(25000, 20250101, 20251231);
    vehiculo1 = new VehiculoTest("ABC123", 500, 24000, true, disponible);
  });

test("El constructor de la clase debe instanciar un objeto del tipo Vehiculo", () => {
    const vehiculo2 = new VehiculoTest("ABC123", 500, 24000, true, disponible);
    expect(vehiculo2).toBeInstanceOf(VehiculoTest);
});

test("Debe devolver patente", () => {
    expect(vehiculo1.getPatente()).toBe("ABC123");

});

test("Debe devolver kilometraje", () => {
    expect(vehiculo1.getKilometraje()).toBe(500);
});

test("Debe devolver tarifa base", () => {
    expect(vehiculo1.getTarifaBase()).toBe(24000);
});


test("Debe setear y devolver patente", () => {
    vehiculo1.setPatente("DEF456")
    expect(vehiculo1.getPatente()).toBe("DEF456");
});

test("Debe setear y devolver kilometraje", () => {
    vehiculo1.setKilometraje(1)
    expect(vehiculo1.getKilometraje()).toBe(1);
});

test("Debe setear y devolver tarifa base", () => {
    vehiculo1.setTarifaBase(70);
    expect(vehiculo1.getTarifaBase()).toBe(70);
});

});