import GestorDeVehiculo from "../src/clases/GestorDeVehiculo";
import EstadoDisponible from "../src/clases/Estados/EstadoDisponible";
import EstadoReservado from "../src/clases/Estados/EstadoReservado";
import Cliente from "../src/clases/Personas/Cliente";
import CalculadoraSedan from "../src/clases/Calculadoras/CalculadoraSedan";
import GestorDeVehiculoError from "../src/clasesDeError/GestorDeVehiculoError";
import VehiculoSedan from "../src/clases/Vehiculos/VehiculoSedan";

describe("GestorDeVehiculo - Tests completos", () => {
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

  it("inicializa correctamente los campos", () => {
    expect(gestor.getEstado()).toBeInstanceOf(EstadoDisponible);
    expect(gestor.getVehiculo()).toBe(vehiculo);
    expect(gestor.getCalculadora()).toBe(calculadora);
    expect(gestor.getTarifaBase()).toBe(500);
    expect(gestor.getAdicionalPorKm()).toBe(50);
    expect(gestor.getLimiteDiarioKm()).toBe(200);
    expect(gestor.getSeguro()).toBe(100);
    expect(gestor.getContadorAcumulado()).toBe(0);
  });

  it("setters y validaciones lanzan errores cuando corresponden", () => {
    expect(() => gestor.setEstado(null as any)).toThrow(GestorDeVehiculoError);
    expect(() => gestor.setVehiculo(null as any)).toThrow(GestorDeVehiculoError);
    expect(() => gestor.setCalculadora(null as any)).toThrow(GestorDeVehiculoError);
    expect(() => gestor.setTarifaBase(-1)).toThrow(GestorDeVehiculoError);
    expect(() => gestor.setAdicionalPorKm(-1)).toThrow(GestorDeVehiculoError);
    expect(() => gestor.setLimiteDiarioKm(-1)).toThrow(GestorDeVehiculoError);
    expect(() => gestor.setSeguro(-1)).toThrow(GestorDeVehiculoError);
    expect(() => gestor.setUltimoKmMantenimiento(0)).toThrow(GestorDeVehiculoError);
    expect(() => gestor.setFechaUltimoMantenimiento(new Date("invalid"))).toThrow(GestorDeVehiculoError);
  });

  it("getKilometrajeActual devuelve valor realista", () => {
    expect(gestor.getKilometrajeActual()).toBe(1000);
    vehiculo.setKilometraje(1200);
    expect(gestor.getKilometrajeActual()).toBe(1200);
  });

  it("contadorAcumulado incrementa correctamente", () => {
    gestor.contadorAcumulado();
    gestor.contadorAcumulado();
    expect(gestor.getContadorAcumulado()).toBe(2);
  });

  it("enviarReservar llama al estado y aumenta contador", () => {
    const fechaInicio = new Date("2025-11-10");
    const fechaFin = new Date("2025-11-15");
    const enviarReservarSpy = jest.spyOn(gestor.getEstado(), "enviarReservar");

    gestor.enviarReservar(cliente, fechaInicio, fechaFin);

    expect(enviarReservarSpy).toHaveBeenCalledWith(gestor, cliente, fechaInicio, fechaFin);
    expect(gestor.getContadorAcumulado()).toBe(1);
  });

  it("dispararMantenimiento llama a enviarMantenimiento si km alto y estado Reservado", () => {
    const fechaInicio = new Date("2025-01-01");
    const fechaFin = new Date("2025-01-10");
    const estadoReservado = new EstadoReservado(cliente, fechaInicio, fechaFin);
    gestor.setEstado(estadoReservado);

    const enviarMantenimientoSpy = jest.spyOn(estadoReservado, "enviarMantenimiento");

    vehiculo.setKilometraje(15000);
    gestor.setUltimoKmMantenimiento(1000);
    gestor.setFechaUltimoMantenimiento(new Date("2024-01-01"));
    for (let i = 0; i < 5; i++) gestor.contadorAcumulado();

    const fecha = new Date();
    gestor.dispararMantenimiento(500, 100, fecha);

    expect(enviarMantenimientoSpy).toHaveBeenCalled();
  });

  it("dispararMantenimiento llama a enviarNecesitaLimpieza si no se cumplen condiciones de mantenimiento", () => {
    const fechaInicio = new Date("2025-01-01");
    const fechaFin = new Date("2025-01-10");
    const estadoReservado = new EstadoReservado(cliente, fechaInicio, fechaFin);
    gestor.setEstado(estadoReservado);

    const enviarNecesitaLimpiezaSpy = jest.spyOn(estadoReservado, "enviarNecesitaLimpieza");

    vehiculo.setKilometraje(5000);
    gestor.setUltimoKmMantenimiento(1000);
    gestor.setFechaUltimoMantenimiento(new Date());
    gestor.contadorAcumulado();

    const fecha = new Date();
    gestor.dispararMantenimiento(500, 100, fecha);

    expect(enviarNecesitaLimpiezaSpy).toHaveBeenCalled();
  });
});
