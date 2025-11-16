import Inventario from "../src/clases/Reportes/Inventario";
import GestorDeVehiculo from "../src/clases/Gestores/GestorDeVehiculo";
import GestorDeReserva from "../src/clases/Gestores/GestorDeReserva";
import VehiculoSedan from "../src/clases/Vehiculos/VehiculoSedan";
import VehiculoSuv from "../src/clases/Vehiculos/VehiculoSuv";
import VehiculoCompacto from "../src/clases/Vehiculos/VehiculoCompacto";
import Cliente from "../src/clases/Personas/Cliente";
import CalculadoraSedan from "../src/clases/Calculadoras/CalculadoraSedan";
import CalculadoraSuv from "../src/clases/Calculadoras/CalculadoraSuv";
import EstadoReservado from "../src/clases/Estados/EstadoReservado";
import TemporadaAlta from "../src/clases/Temporadas/TemporadaAlta";

describe("Inventario - Tests con gestores y vehículos", () => {
  let inventario: Inventario;

  let cliente: Cliente;
  let vehiculoSedan: VehiculoSedan;
  let vehiculoSuv: VehiculoSuv;
  let vehiculoCompacto: VehiculoCompacto;
  let gestorSedan: GestorDeVehiculo;
  let gestorSuv: GestorDeVehiculo;
  let gestorCompacto: GestorDeVehiculo;
  let reservaSedan: EstadoReservado;
  let reservaSuv: EstadoReservado;
  let reservaCompacto: EstadoReservado;
  let gestorReservaSedan: GestorDeReserva;
  let gestorReservaSuv: GestorDeReserva;
  let gestorReservaCompacto: GestorDeReserva;
  let temporada: TemporadaAlta;

  const fechaInicio1 = new Date("2025-11-01");
  const fechaFin1 = new Date("2025-11-05");
  const fechaInicio2 = new Date("2025-11-10");
  const fechaFin2 = new Date("2025-11-15");
  const fechaMantenimiento = new Date("2025-11-20");

  beforeEach(() => {
    inventario = new Inventario(3);
    
    cliente = new Cliente("Juan", "Perez", 12345678);

    vehiculoSedan = new VehiculoSedan("AAA111", 1000);
    vehiculoSuv = new VehiculoSuv("BBB222", 5000);
    vehiculoCompacto = new VehiculoCompacto("CCC333", 200);

    gestorSedan = new GestorDeVehiculo(vehiculoSedan, new CalculadoraSedan(), 500, 50, 200, 100);
    gestorSuv = new GestorDeVehiculo(vehiculoSuv, new CalculadoraSuv(), 1000, 100, 300, 200);
    gestorCompacto = new GestorDeVehiculo(vehiculoCompacto, new CalculadoraSedan(), 300, 30, 150, 50);

    reservaSedan = new EstadoReservado(cliente, fechaInicio1, fechaFin1);
    reservaSuv = new EstadoReservado(cliente, fechaInicio2, fechaFin2);
    reservaCompacto = new EstadoReservado(cliente, fechaInicio1, fechaFin1);

    temporada = new TemporadaAlta(fechaInicio1, fechaFin2);

    gestorReservaSedan = new GestorDeReserva(gestorSedan, reservaSedan, temporada);
    gestorReservaSuv = new GestorDeReserva(gestorSuv, reservaSuv, temporada);
    gestorReservaCompacto = new GestorDeReserva(gestorCompacto, reservaCompacto, temporada);
  });

  it("registrarAlquiler funciona con gestores reales y registra operación", () => {
    const spyEnviar = jest.spyOn(gestorSedan, "enviarReservar");
    inventario.registrarAlquiler(gestorReservaSedan, gestorSedan);
    expect(spyEnviar).toHaveBeenCalledWith(cliente, fechaInicio1, fechaFin1);
  });

  it("registrarMantenimiento funciona con gestores reales y registra operación", () => {
    const spyMantenimiento = jest.spyOn(gestorSedan, "dispararMantenimiento");
    inventario.registrarMantenimiento(gestorSedan, 500, 100, fechaMantenimiento);
    expect(spyMantenimiento).toHaveBeenCalledWith(500, 100, fechaMantenimiento);
  });

  it("porcentajeVehiculosAlquilados calcula correctamente con múltiples vehículos y fechas hardcodeadas", () => {
    gestorReservaSedan.setVehiculoDevuelto();
    inventario.registrarAlquiler(gestorReservaSedan, gestorSedan);
    
    gestorReservaSuv.setVehiculoDevuelto();
    inventario.registrarAlquiler(gestorReservaSuv, gestorSuv);
    
    const porcentaje = inventario.porcentajeVehiculosAlquilados(fechaInicio1, fechaFin2);
    expect(porcentaje).toBeCloseTo((2 / 3) * 100);
  });

  it("vehiculoMasAlquilado y vehiculoMenosAlquilado funcionan correctamente con múltiples operaciones", () => {
    gestorReservaSedan.setVehiculoDevuelto();
    inventario.registrarAlquiler(gestorReservaSedan, gestorSedan);
    
    inventario.registrarAlquiler(gestorReservaSedan, gestorSedan); // doble operación
    gestorReservaSuv.setVehiculoDevuelto();
    inventario.registrarAlquiler(gestorReservaSuv, gestorSuv);

    expect(inventario.vehiculoMasAlquilado(fechaInicio1, fechaFin2)).toBe("AAA111");
    expect(inventario.vehiculoMenosAlquilado(fechaInicio1, fechaFin2)).toBe("BBB222");
  });

  it("vehiculoMayorRentabilidad y vehiculoMenorRentabilidad calculan correctamente ingresos - egresos", () => {
    gestorReservaSedan.setVehiculoDevuelto();
    inventario.registrarAlquiler(gestorReservaSedan, gestorSedan); // 500 tarifa base + adicionales según calculadora
    
    gestorReservaSuv.setVehiculoDevuelto();
    inventario.registrarAlquiler(gestorReservaSuv, gestorSuv);
    

    inventario.registrarMantenimiento(gestorSedan, 200, 100, fechaMantenimiento);
    inventario.registrarMantenimiento(gestorSuv, 1000, 200, fechaMantenimiento);

    expect(inventario.vehiculoMayorRentabilidad()).toBe("BBB222"); 
    expect(inventario.vehiculoMenorRentabilidad()).toBe("AAA111");
  });

  it("maneja errores internos de enviarReservar sin fallar", () => {
    jest.spyOn(gestorSedan, "enviarReservar").mockImplementation(() => { throw new Error("Fallo interno"); });
    expect(() => inventario.registrarAlquiler(gestorReservaSedan, gestorSedan)).not.toThrow();
  });
});