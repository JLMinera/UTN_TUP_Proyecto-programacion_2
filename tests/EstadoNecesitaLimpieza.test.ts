import EstadoNecesitaLimpieza from "../src/clases/Estados/EstadoNecesitaLimpieza";
import GestorDeVehiculo from "../src/clases/GestorDeVehiculo";
import Cliente from "../src/clases/Personas/Cliente";
import CalculadoraSedan from "../src/clases/Calculadoras/CalculadoraSedan";
import EstadoDisponible from "../src/clases/Estados/EstadoDisponible";
import EstadoError from "../src/clasesDeError/EstadoError";
import VehiculoSedan from "../src/clases/Vehiculos/VehiculoSedan";

describe("EstadoNecesitaLimpieza", () => {
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

  it("debe crear el estado con distancia y fecha válidas", () => {
    const estado = new EstadoNecesitaLimpieza(100, new Date());
    expect(estado.getDistanciaRecorrida()).toBe(100);
    expect(estado.getFechaInicio()).toBeInstanceOf(Date);
  });

  it("lanza error si se setea distancia negativa", () => {
    expect(() => new EstadoNecesitaLimpieza(-10, new Date())).toThrow(EstadoError);
  });

  it("lanza error si se setea fecha inválida", () => {
    expect(() => new EstadoNecesitaLimpieza(100, new Date("invalid"))).toThrow(EstadoError);
  });

  it("enviarDisponible cambia el estado del gestor a EstadoDisponible", () => {
    const estado = new EstadoNecesitaLimpieza(50, new Date());
    const setEstadoSpy = jest.spyOn(gestor, "setEstado");
    estado.enviarDisponible(gestor);
    expect(setEstadoSpy).toHaveBeenCalled();
    expect(gestor.getEstado()).toBeInstanceOf(EstadoDisponible);
  });

  it("enviarReservar lanza EstadoError", () => {
    const estado = new EstadoNecesitaLimpieza(50, new Date());
    expect(() => estado.enviarReservar(gestor, cliente, new Date(), new Date())).toThrow(EstadoError);
  });

  it("enviarMantenimiento lanza EstadoError", () => {
    const estado = new EstadoNecesitaLimpieza(50, new Date());
    expect(() => estado.enviarMantenimiento(gestor, 500, new Date())).toThrow(EstadoError);
  });

  it("enviarNecesitaLimpieza lanza EstadoError", () => {
    const estado = new EstadoNecesitaLimpieza(50, new Date());
    expect(() => estado.enviarNecesitaLimpieza(gestor, 50, new Date())).toThrow(EstadoError);
  });
});