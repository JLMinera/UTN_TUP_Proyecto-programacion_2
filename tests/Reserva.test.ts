import Disponible from "../src/clases/Disponible";
import Reserva from "../src/clases/Reserva";
import Vehiculo from "../src/clases/Vehiculo";

class VehiculoTest extends Vehiculo{}


describe("tests de la clase Reserva", () =>{
    let vehiculo1: VehiculoTest;
    let disponible: Disponible;
    let reserva: Reserva;
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {
        fechaInicio = new Date(2025, 10, 16);
        fechaFin = new Date(2025, 10, 17);
        reserva = new Reserva(fechaInicio, fechaFin);
        vehiculo1 = new VehiculoTest("ABC123", 500, 24000);
        disponible = new Disponible(fechaInicio, fechaFin);
    });


test("El constructor de la clase debe instanciar un objeto del tipo Mantenimiento", () => {
    const reserva2 = new Reserva(fechaInicio, fechaFin);
    expect(reserva2).toBeInstanceOf(Reserva);
});

test ("Debe devolver fecha inicio", () => {
    expect(reserva.getFechaInicio().getTime()).toBe(fechaInicio.getTime());
})

test ("Debe devolver fecha fin", () => {
    expect(reserva.getFechaFin().getTime()).toBe(fechaFin.getTime());
})


test ("Debe setear y devolver fecha inicio", () => {
    fechaInicio = new Date(2025, 10, 18);
    reserva.setFechaInicio(fechaInicio)
    expect(reserva.getFechaInicio().getTime()).toBe(fechaInicio.getTime());
})

test ("Debe setear y devolver fecha fin", () => {
    fechaFin = new Date(2025, 10, 19);
    reserva.setFechaFin(fechaFin)
    expect(reserva.getFechaFin().getTime()).toBe(fechaFin.getTime());
})


})