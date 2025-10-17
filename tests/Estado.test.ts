import Disponible from "../src/clases/Disponible";
import Estado from "../src/clases/Estado";
import Vehiculo from "../src/clases/Vehiculo";

class VehiculoTest extends Vehiculo{}
class EstadoConcreto extends Estado {}



describe("tests de la clase Estado", () =>{
    let vehiculo1: VehiculoTest;
    let disponible: Disponible;
    let fechaInicio: Date;
    let fechaFin: Date;
    let estado: EstadoConcreto;

    beforeEach(() => {
        fechaInicio = new Date(2025, 10, 16);
        fechaFin = new Date(2025, 10, 17);
        estado = new EstadoConcreto(fechaInicio, fechaFin);
        vehiculo1 = new VehiculoTest("ABC123", 500, 24000);
        disponible = new Disponible(fechaInicio, fechaFin);
    });


test("El constructor de la clase debe instanciar un objeto del tipo Mantenimiento", () => {
    const estado2 = new EstadoConcreto(fechaInicio, fechaFin);
    expect(estado2).toBeInstanceOf(EstadoConcreto);
});

test ("Debe devolver fecha inicio", () => {
    expect(estado.getFechaInicio().getTime()).toBe(fechaInicio.getTime());
})

test ("Debe devolver fecha fin", () => {
    expect(estado.getFechaFin().getTime()).toBe(fechaFin.getTime());
})


test ("Debe setear y devolver fecha inicio", () => {
    fechaInicio = new Date(2025, 10, 18);
    estado.setFechaInicio(fechaInicio)
    expect(estado.getFechaInicio().getTime()).toBe(fechaInicio.getTime());
})

test ("Debe setear y devolver fecha fin", () => {
    fechaFin = new Date(2025, 10, 19);
    estado.setFechaFin(fechaFin)
    expect(estado.getFechaFin().getTime()).toBe(fechaFin.getTime());
})

test (" agregarVehiculo() - Debe agregar un vehiculo al MAP de estado", () => {
    estado.agregarVehiculo("ABC123", vehiculo1);
    expect(estado.getVehiculos().has("ABC123")).toBe(true);
})

test (" quitarVehiculo() - Debe quitar un vehiculo al MAP de estado", () => {
    estado.agregarVehiculo("ABC123", vehiculo1);
    estado.quitarVehiculo("ABC123");
    expect(estado.vehiculos.size).toBe(0);    
})


})