
import EstadoDisponible from "../src/clases/Estados/EstadoDisponible";
import EstadoMantenimiento from "../src/clases/Estados/EstadoMantenimiento";
import EstadoError from "../src/clasesDeError/EstadoError";
import GestorDeVehiculo from "../src/clases/GestorDeVehiculo";
import VehiculoSedan from "../src/clases/Vehiculos/VehiculoSedan";
import CalculadoraSedan from "../src/clases/Calculadoras/CalculadoraSedan";
import Cliente from "../src/clases/Personas/Cliente";

describe("Estados - Tests completos", () => {
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

  describe("EstadoMantenimiento", () => {
    it("constructor y getter/setter de costo funcionan correctamente", () => {
      const estado = new EstadoMantenimiento(500, new Date());
      expect(estado.getCosto()).toBe(500);
      estado.setCosto(1000);
      expect(estado.getCosto()).toBe(1000);
    });

    it("constructor lanza error si costo inválido", () => {
      expect(() => new EstadoMantenimiento(-50, new Date())).toThrow(EstadoError);
      expect(() => new EstadoMantenimiento(NaN, new Date())).toThrow(EstadoError);
    });

    it("setCosto lanza error si valor negativo", () => {
      const estado = new EstadoMantenimiento(500, new Date());
      expect(() => estado.setCosto(-100)).toThrow(EstadoError);
    });

    it("enviarDisponible cambia el estado a EstadoDisponible", () => {
      const estado = new EstadoMantenimiento(500, new Date());
      const setEstadoSpy = jest.spyOn(gestor, "setEstado");
      estado.enviarDisponible(gestor);
      expect(setEstadoSpy).toHaveBeenCalled();
      expect(gestor.getEstado()).toBeInstanceOf(EstadoDisponible);
    });

    it("enviarReservar, enviarMantenimiento, enviarNecesitaLimpieza lanzan EstadoError", () => {
      const estado = new EstadoMantenimiento(500, new Date());
      expect(() => estado.enviarReservar(gestor, cliente, new Date(), new Date())).toThrow(EstadoError);
      expect(() => estado.enviarMantenimiento(gestor, 500, new Date())).toThrow(EstadoError);
      expect(() => estado.enviarNecesitaLimpieza(gestor, 100, new Date())).toThrow(EstadoError);
    });
  })
});