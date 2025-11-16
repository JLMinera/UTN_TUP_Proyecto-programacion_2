import EstadoError from "../src/clasesDeError/EstadoError";
import EstadoReservado from "../src/clases/Estados/EstadoReservado";
import EstadoMantenimiento from "../src/clases/Estados/EstadoMantenimiento";
import EstadoNecesitaLimpieza from "../src/clases/Estados/EstadoNecesitaLimpieza";
import GestorDeVehiculo from "../src/clases/Gestores/GestorDeVehiculo";
import VehiculoSedan from "../src/clases/Vehiculos/VehiculoSedan";
import CalculadoraSedan from "../src/clases/Calculadoras/CalculadoraSedan";
import Cliente from "../src/clases/Personas/Cliente";

describe("EstadoReservado", () => {
  let cliente: Cliente;
  let vehiculo: VehiculoSedan;
  let calculadora: CalculadoraSedan;
  let gestor: GestorDeVehiculo;
  let fechaInicio: Date;
  let fechaFin: Date;

  beforeEach(() => {
    cliente = new Cliente("Juan", "Perez", 12345678);
    vehiculo = new VehiculoSedan("ABC123", 0);
    calculadora = new CalculadoraSedan();
    gestor = new GestorDeVehiculo(vehiculo, calculadora, 500, 50, 200, 100);

    fechaInicio = new Date("2025-01-01");
    fechaFin = new Date("2025-01-10");
  });

  it("se instancia correctamente y guarda cliente y fechas", () => {
    const estado = new EstadoReservado(cliente, fechaInicio, fechaFin);

    expect(estado.getCliente()).toBe(cliente);
    expect(estado.getFechaInicio()).toEqual(fechaInicio);
    expect(estado.getFechaFin()).toEqual(fechaFin);
  });

  it("enviarDisponible lanza EstadoError", () => {
    const estado = new EstadoReservado(cliente, fechaInicio, fechaFin);

    expect(() => estado.enviarDisponible(gestor)).toThrow(EstadoError);
  });

  it("enviarReservar lanza EstadoError", () => {
    const estado = new EstadoReservado(cliente, fechaInicio, fechaFin);

    expect(() => estado.enviarReservar(gestor, cliente, fechaInicio, fechaFin))
      .toThrow(EstadoError);
  });

  it("enviarMantenimiento cambia el estado a EstadoMantenimiento", () => {
    const estado = new EstadoReservado(cliente, fechaInicio, fechaFin);
    gestor.setEstado(estado);

    const fechaMantenimiento = new Date("2025-02-01");
    estado.enviarMantenimiento(gestor, 500, fechaMantenimiento);

    expect(gestor.getEstado()).toBeInstanceOf(EstadoMantenimiento);
    expect(gestor.getEstado().getFecha()).toEqual(fechaMantenimiento);
  });

  it("enviarNecesitaLimpieza cambia el estado a EstadoNecesitaLimpieza", () => {
    const estado = new EstadoReservado(cliente, fechaInicio, fechaFin);
    gestor.setEstado(estado);

    const fechaLimpieza = new Date("2025-02-01");
    estado.enviarNecesitaLimpieza(gestor, 100, fechaLimpieza);

    expect(gestor.getEstado()).toBeInstanceOf(EstadoNecesitaLimpieza);
    expect(gestor.getEstado().getFecha()).toEqual(fechaLimpieza);
  });

  it("setCliente lanza error si cliente es nulo", () => {
    const estado = new EstadoReservado(cliente, fechaInicio, fechaFin);
    expect(() => estado.setCliente(null as unknown as Cliente)).toThrow(EstadoError);
  });

  it("setFechaInicio lanza error si fecha inválida", () => {
    const estado = new EstadoReservado(cliente, fechaInicio, fechaFin);
    expect(() => estado.setFechaInicio(new Date("invalid date"))).toThrow(EstadoError);
  });

  it("setFechaFin lanza error si fecha inválida o anterior a inicio", () => {
    const estado = new EstadoReservado(cliente, fechaInicio, fechaFin);

    expect(() => estado.setFechaFin(new Date("invalid date"))).toThrow(EstadoError);
    expect(() => estado.setFechaFin(new Date("2024-12-31"))).toThrow(EstadoError);
  });
});
