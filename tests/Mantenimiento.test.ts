import Disponible from "../src/clases/Disponible";
import Estado from "../src/clases/Estado";
import Mantenimiento from "../src/clases/Mantenimiento";
import Vehiculo from "../src/clases/Vehiculo";

class VehiculoTest extends Vehiculo{}


describe("tests de la clase Mantenimiento", () =>{
    let vehiculo1: VehiculoTest;
    let disponible: Disponible;
    let mantenimiento: Mantenimiento;


beforeEach(() => {
    mantenimiento = new Mantenimiento(200000, 20250101, 20251231)
    vehiculo1 = new VehiculoTest("ABC123", 500, 24000, true, mantenimiento);
    disponible = new Disponible(20250101, 20251231);
})

test("El constructor de la clase debe instanciar un objeto del tipo Mantenimiento", () => {
    const mantenimiento2 = new Mantenimiento(2233, 20250101, 20251231);
    expect(mantenimiento2).toBeInstanceOf(Mantenimiento);
});

test ("testeo de getters", () => {
    expect(mantenimiento.getFechaInicio()).toBe(20250101);
    expect(mantenimiento.getFechaFin()).toBe(20251231);
    expect(mantenimiento.getCosto()).toBe(200000);
})

test ("testeo de setters", () => {
    mantenimiento.setFechaInicio(20250505)
    expect(mantenimiento.getFechaInicio()).toBe(20250505);

    mantenimiento.setFechaFin(20250510)
    expect(mantenimiento.getFechaFin()).toBe(20250510);

    mantenimiento.setCosto(300000)
    expect(mantenimiento.getCosto()).toBe(300000);
})

})