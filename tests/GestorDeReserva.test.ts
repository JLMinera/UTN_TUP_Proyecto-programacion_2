import GestorDeReserva from "../src/clases/GestorDeReserva";
import GestorDeVehiculo from "../src/clases/GestorDeVehiculo";
import EstadoReservado from "../src/clases/Estados/EstadoReservado";
import Cliente from "../src/clases/Personas/Cliente";
import Temporada from "../src/clases/Temporadas/Temporada";
import TemporadaAlta from "../src/clases/Temporadas/TemporadaAlta";
import GestorDeReservaError from "../src/clasesDeError/GestorDeReservaError";
import VehiculoSedan from "../src/clases/Vehiculos/VehiculoSedan";
import CalculadoraSedan from "../src/clases/Calculadoras/CalculadoraSedan";

describe("GestorDeReserva", () => {
  let cliente: Cliente;
  let vehiculo: VehiculoSedan;
  let calculadora: CalculadoraSedan;
  let gestorVehiculo: GestorDeVehiculo;
  let reserva: EstadoReservado;
  let temporada: Temporada;
  let gestorReserva: GestorDeReserva;

  beforeEach(() => {
    cliente = new Cliente("Maria", "Elena", 1234567);

    vehiculo = new VehiculoSedan("ABC123", 0);
    vehiculo.setKilometraje(5000);
    calculadora = new CalculadoraSedan();
    gestorVehiculo = new GestorDeVehiculo(vehiculo, calculadora, 500, 50, 200, 100);

    const fechaInicio = new Date(Date.UTC(2025, 0, 9));
    const fechaFin = new Date(Date.UTC(2025, 0, 10));
    reserva = new EstadoReservado(cliente, fechaInicio, fechaFin);

    temporada = new TemporadaAlta(fechaInicio, fechaFin);

    gestorReserva = new GestorDeReserva(gestorVehiculo, reserva, temporada);
  });

  it("setup correcto de GestorDeReserva", () => {
    expect(gestorReserva.getCliente()).toBe(cliente);
    expect(gestorReserva.getVehiculo()).toBe(gestorVehiculo);
    expect(gestorReserva.getTemporada()).toBe(temporada);
    expect(gestorReserva.getKmInicial()).toBe(vehiculo.getKilometraje());
    expect(gestorReserva.getVehiculoDevuelto()).toBe(false);
    expect(gestorReserva.getCostoTotal()).toBe(0);
  });

  it("setKmInicial lanza error si es negativo", () => {
    expect(() => gestorReserva.setKmInicial(-1)).toThrow(GestorDeReservaError);
  });

  it("setKmFinal lanza error si es menor al km inicial", () => {
    expect(() => gestorReserva.setKmFinal(4000)).toThrow(GestorDeReservaError);
  });

  it("getDistanciaRecorrida lanza error si kmFinal no definido", () => {
    expect(() => gestorReserva.getDistanciaRecorrida()).toThrow(GestorDeReservaError);
  });

  it("setVehiculoDevuelto actualiza vehiculoDevuelto y kmFinal", () => {
    vehiculo.setKilometraje(5200);
    gestorReserva.setVehiculoDevuelto();
    expect(gestorReserva.getVehiculoDevuelto()).toBe(true);
    expect(gestorReserva.getKmFinal()).toBe(5200);
  });

  it("setVehiculoDevuelto lanza error si ya fue devuelto", () => {
    vehiculo.setKilometraje(5200);
    gestorReserva.setVehiculoDevuelto();
    expect(() => gestorReserva.setVehiculoDevuelto()).toThrow(GestorDeReservaError);
  });

  it("getDistanciaRecorrida devuelve diferencia correcta", () => {
    vehiculo.setKilometraje(5200);
    gestorReserva.setVehiculoDevuelto();
    expect(gestorReserva.getDistanciaRecorrida()).toBe(200);
  });

  it("tarifaFinalDeReserva lanza error si vehículo no devuelto", () => {
    expect(() => gestorReserva.tarifaFinalDeReserva()).toThrow(GestorDeReservaError);
  });

  it("tarifaFinalDeReserva devuelve valor calculado correctamente", () => {
    const fechaInicio = new Date("2025-11-09");
    const fechaFin = new Date("2025-11-15");
    reserva.setFechaInicio(fechaInicio);
    reserva.setFechaFin(fechaFin);

    vehiculo.setKilometraje(6200);
    gestorReserva.setVehiculoDevuelto();

    const distanciaRecorrida = gestorReserva.getDistanciaRecorrida();

    const recargo = temporada.getRecargo();

    const expected = calculadora.calcularTarifaTotal(
      gestorReserva.getFechaInicio(),
      gestorReserva.getFechaFin(),
      distanciaRecorrida,
      gestorReserva.getVehiculo(),
      recargo
    );
    const tarifa = gestorReserva.tarifaFinalDeReserva();

    expect(tarifa).toBeCloseTo(expected, 2);
  });


  it("setCostoTotal lanza error si valor negativo", () => {
    expect(() => gestorReserva.setCostoTotal(-10)).toThrow(GestorDeReservaError);
  });

  it("setCostoTotal y getCostoTotal funcionan correctamente", () => {
    gestorReserva.setCostoTotal(1000);
    expect(gestorReserva.getCostoTotal()).toBe(1000);
  });

  it("setVehiculo y getVehiculo funcionan correctamente", () => {
    const nuevoVehiculo = new VehiculoSedan("XYZ999", 0);
    nuevoVehiculo.setKilometraje(2000);
    gestorReserva.setVehiculo(new GestorDeVehiculo(nuevoVehiculo, calculadora, 500, 50, 200, 100));
    expect(gestorReserva.getVehiculo().getVehiculo()).toBe(nuevoVehiculo);
  });

  it("setTemporada y getTemporada funcionan correctamente", () => {
    const nuevaTemporada = new TemporadaAlta(new Date("2025-02-01"), new Date("2025-02-10"));
    gestorReserva.setTemporada(nuevaTemporada);
    expect(gestorReserva.getTemporada()).toBe(nuevaTemporada);
  });

  it("getFechaInicio y getFechaFin devuelven las fechas de la reserva", () => {
    expect(gestorReserva.getFechaInicio().toISOString().slice(0, 10)).toBe("2025-01-08");
    expect(gestorReserva.getFechaFin().toISOString().slice(0, 10)).toBe("2025-01-10");
  });
});
