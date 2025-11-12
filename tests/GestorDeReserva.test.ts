import GestorDeReserva from "../src/clases/GestorDeReserva";
import GestorDeReservaError from "../src/clasesDeError/GestorDeReservaError";
import Reserva from "../src/clases/Estados/Reserva";
import Temporada from "../src/clases/Temporadas/Temporada";
import Cliente from "../src/clases/Personas/Cliente";
import GestorDeVehiculo from "../src/clases/GestorDeVehiculo";

class VehiculoMock extends GestorDeVehiculo {
    private kmActual: number;
    private calculadoraMock: any;

    constructor(km: number) {
        super({patente: "ABC123", kilometraje: km
        } as any, 
        {
          calcularTarifaTotal: jest.fn().mockReturnValue(1000)
        } as any, 
        100, 10, 500, 200);
        this.kmActual = km;
        this.calculadoraMock = {
            calcularTarifaTotal: jest.fn().mockReturnValue(1000)
        };
    }

    getKilometrajeActual(): number {
        return this.kmActual;
    }

    getCalculadora() {
        return this.calculadoraMock;
    }

    setKilometrajeActual(km: number) {
        this.kmActual = km;
    }
}

class TemporadaMock extends Temporada {
    constructor(fechaInicio: Date, fechaFin: Date, recargo: number) {
        super(new Date("2025-01-01"), new Date("2025-01-10"), 0.90);
    }
}

describe("GestorDeReserva", () => {
    let cliente: Cliente;
    let reserva: Reserva;
    let vehiculo: VehiculoMock;
    let temporada: Temporada;
    let gestor: GestorDeReserva;

    beforeEach(() => {
        cliente = new Cliente("Juan", "Perez", 123);
        reserva = new Reserva(cliente, new Date("2025-01-01"), new Date("2025-01-10"));
        vehiculo = new VehiculoMock(1000);
        temporada = new TemporadaMock(new Date("2025-01-01"), new Date("2025-01-10"), 0.90);
        gestor = new GestorDeReserva(vehiculo, reserva, temporada);
    });

    test("Debe instanciar correctamente el gestor de reserva", () => {
        expect(gestor.getCliente()).toBe(cliente);
        expect(gestor.getVehiculo()).toBe(vehiculo);
        expect(gestor.getTemporada()).toBe(temporada);
        expect(gestor.getKmInicial()).toBe(1000);
    });

    test("No se puede asignar kilometraje inicial negativo", () => {
        expect(() => gestor.setKmInicial(-5)).toThrow(GestorDeReservaError);
        expect(() => gestor.setKmInicial(-5)).toThrow("El kilometraje inicial no puede ser negativo");
    });

    test("No se puede asignar kilometraje final menor al inicial", () => {
        expect(() => gestor.setKmFinal(900)).toThrow(GestorDeReservaError);
        expect(() => gestor.setKmFinal(900)).toThrow("El kilometraje final no puede ser menor que el inicial");
    });

    test("Devuelve correctamente la distancia recorrida después de devolver vehículo", () => {
        vehiculo.setKilometrajeActual(1200);
        gestor.setVehiculoDevuelto();
        expect(gestor.getKmFinal()).toBe(1200);
        expect(gestor.getDistanciaRecorrida()).toBe(200);
    });

    test("No se puede calcular tarifa antes de devolver vehículo", () => {
        expect(() => gestor.tarifaFinalDeReserva()).toThrow(GestorDeReservaError);
        expect(() => gestor.tarifaFinalDeReserva()).toThrow("No se puede calcular la tarifa antes de devolver el vehículo");
    });

    test("Calculo de tarifa después de devolver vehículo", () => {
        vehiculo.setKilometrajeActual(1200);
        gestor.setVehiculoDevuelto();
        const total = gestor.tarifaFinalDeReserva();
        expect(total).toBe(1000);
    });

    test("No se puede devolver el vehículo dos veces", () => {
        gestor.setVehiculoDevuelto();
        expect(() => gestor.setVehiculoDevuelto()).toThrow(GestorDeReservaError);
        expect(() => gestor.setVehiculoDevuelto()).toThrow("El vehículo ya fue devuelto");
    });
});
