import GestorDeVehiculo from "../src/clases/GestorDeVehiculo";
import GestorDeVehiculoError from "../src/clasesDeError/GestorDeVehiculoError";
import GestorDeReserva from "../src/clases/GestorDeReserva";
import CalculadoraDeTarifa from "../src/clases/Calculadoras/CalculadoraDeTarifa";
import Vehiculo from "../src/clases/Vehiculos/Vehiculo";
import GestorDeEstado from "../src/clases/GestorDeEstado";

class VehiculoMock extends Vehiculo {
    constructor(patente: string, kilometraje: number) {
        super(patente, kilometraje);
    }

    setKilometraje(km: number) {
        super.setKilometraje(km);
    }

    getKilometraje(): number {
        return super.getKilometraje();
    }
}

class MantenimientoMock {
    actualizarFechaMantenimiento(fecha: Date): Date {
        return fecha;
    }
}

class EstadoMock extends GestorDeEstado {
    constructor() {
        super(new MantenimientoMock() as any);
    }

    actualizarFechaMantenimiento(fecha: Date): Date {
        return fecha;
    }
}

class CalculadoraMock extends CalculadoraDeTarifa {
    calcularTarifaTotal = jest.fn().mockReturnValue(500);
}

describe("GestorDeVehiculo", () => {
    let vehiculo: VehiculoMock;
    let calculadora: CalculadoraMock;
    let gestor: GestorDeVehiculo;
    let estado: EstadoMock;

    beforeEach(() => {
        vehiculo = new VehiculoMock("ABC123", 1000);
        calculadora = new CalculadoraMock();
        gestor = new GestorDeVehiculo(
            vehiculo,
            calculadora,
            100, 
            10,  
            500, 
            200  
        );
        estado = new EstadoMock();
        gestor.setEstado(estado);
    });

    test("Debe instanciar correctamente el gestor de vehículo", () => {
        expect(gestor.getVehiculo()).toBe(vehiculo);
        expect(gestor.getCalculadora()).toBe(calculadora);
        expect(gestor.getTarifaBase()).toBe(100);
        expect(gestor.getAdicionalPorKm()).toBe(10);
        expect(gestor.getLimiteDiarioKm()).toBe(500);
        expect(gestor.getSeguro()).toBe(200);
        expect(gestor.getKilometrajeActual()).toBe(1000);
    });

    test("Validación de setters: tarifaBase, adicionalPorKm, limiteDiarioKm y seguro", () => {
        expect(() => gestor.setTarifaBase(-1)).toThrow(GestorDeVehiculoError);
        expect(() => gestor.setAdicionalPorKm(-5)).toThrow(GestorDeVehiculoError);
        expect(() => gestor.setLimiteDiarioKm(-10)).toThrow(GestorDeVehiculoError);
        expect(() => gestor.setSeguro(-100)).toThrow(GestorDeVehiculoError);
    });

    test("Validación de setVehiculo y setCalculadora", () => {
        expect(() => gestor.setVehiculo(null as any)).toThrow(GestorDeVehiculoError);
        expect(() => gestor.setCalculadora(null as any)).toThrow(GestorDeVehiculoError);
    });

    test("setUltimoKmMantenimiento y getUltimoKmMantenimiento", () => {
        const reservaMock = {
            getKmFinal: () => 1200
        } as GestorDeReserva;

        gestor.setUltimoKmMantenimiento(reservaMock);
        expect(gestor.getUltimoKmMantenimiento()).toBe(1200);

        const reservaMal = {
            getKmFinal: () => -5
        } as GestorDeReserva;
        expect(() => gestor.setUltimoKmMantenimiento(reservaMal)).toThrow(GestorDeVehiculoError);
    });

    test("setFechaUltimoMantenimiento y getFechaUltimoMantenimiento", () => {
        const fecha = new Date("2025-01-01");
        gestor.setFechaUltimoMantenimiento(fecha);
        expect(gestor.getFechaUltimoMantenimiento()).toEqual(fecha);
    });

    test("contadorAcumulado incrementa correctamente", () => {
        expect(gestor.getContadorAcumulado()).toBe(0);
        gestor.contadorAcumulado();
        gestor.contadorAcumulado();
        expect(gestor.getContadorAcumulado()).toBe(2);
    });
});
