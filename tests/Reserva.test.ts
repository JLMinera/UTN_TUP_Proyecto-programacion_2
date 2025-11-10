import Cliente from "../src/clases/Cliente";
import Reserva from "../src/clases/Reserva";

describe("tests de la clase Reserva", () =>{
    let reserva: Reserva;
    let fechaInicio: Date;
    let fechaFin: Date;
    let cliente: Cliente;

    beforeEach(() => {
        cliente = new Cliente("Maria", "Del Carmen", 12345678)
        fechaInicio = new Date(2025, 10, 16);
        fechaFin = new Date(2025, 10, 17);
        reserva = new Reserva(cliente, fechaInicio, fechaFin);
    });


test("El constructor de la clase debe instanciar un objeto del tipo Mantenimiento", () => {
    expect(reserva).toBeInstanceOf(Reserva);
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