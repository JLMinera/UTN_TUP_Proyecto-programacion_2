import EstadoDisponible from "../src/clases/Estados/EstadoDisponible";
import EstadoReservado from "../src/clases/Estados/EstadoReservado";
import VehiculoSedan from "../src/clases/Vehiculos/VehiculoSedan";
import CalculadoraSedan from "../src/clases/Calculadoras/CalculadoraSedan";
import EstadoError from "../src/clasesDeError/EstadoError";
import Cliente from "../src/clases/Personas/Cliente";
import GestorDeVehiculo from "../src/clases/GestorDeVehiculo";

describe("EstadoDisponible", () => {
  let vehiculo: VehiculoSedan;
  let calculadora: CalculadoraSedan;
  let gestor: GestorDeVehiculo;
  let cliente: Cliente;

  beforeEach(() => {
    vehiculo = new VehiculoSedan("ABC123", 0);
    vehiculo.setKilometraje(1000);
    calculadora = new CalculadoraSedan();
    gestor = new GestorDeVehiculo(vehiculo, calculadora, 500, 50, 200, 100);
    cliente = new Cliente("Maria", "Elena", 1234567);
  });

  it("enviarDisponible debe lanzar EstadoError", () => {
    const estado = new EstadoDisponible();
    expect(() => estado.enviarDisponible(gestor)).toThrow(EstadoError);
  });

  it("enviarReservar debe cambiar el estado a EstadoReservado", () => {
    const estado = new EstadoDisponible();
    const fechaInicio = new Date("2025-01-01");
    const fechaFin = new Date("2025-01-10");

    estado.enviarReservar(gestor, cliente, fechaInicio, fechaFin);

    expect(gestor.getEstado()).toBeInstanceOf(EstadoReservado);
    const nuevoEstado = gestor.getEstado() as EstadoReservado;
    expect(nuevoEstado.getCliente()).toBe(cliente);
    expect(nuevoEstado.getFechaInicio()).toEqual(fechaInicio);
    expect(nuevoEstado.getFechaFin()).toEqual(fechaFin);
  });

  it("enviarMantenimiento debe lanzar EstadoError", () => {
    const estado = new EstadoDisponible();
    expect(() => estado.enviarMantenimiento(gestor, 500, new Date())).toThrow(EstadoError);
  });

  it("enviarNecesitaLimpieza debe lanzar EstadoError", () => {
    const estado = new EstadoDisponible();
    expect(() => estado.enviarNecesitaLimpieza(gestor, 100, new Date())).toThrow(EstadoError);
  });
});
