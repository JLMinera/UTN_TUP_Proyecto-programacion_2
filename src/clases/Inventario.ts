import RegistroOperacion from "./RegistroOperacion";
import GestorDeReserva from "./GestorDeReserva";
import GestorDeVehiculo from "./GestorDeVehiculo";

export default class Inventario {
    private totalVehiculos: number;
	private vehiculosEnAlquiler;
	private vehiculosEnMantenimiento;
	
 
	constructor (totalVehiculos: number) {
		this.totalVehiculos = totalVehiculos;
		this.vehiculosEnAlquiler = new Map<string, RegistroOperacion[]>();
		this.vehiculosEnMantenimiento = new Map<string, RegistroOperacion[]>();
	}
	
    public registrarAlquiler(reserva: GestorDeReserva, vehiculo: GestorDeVehiculo): void {
		try {
			vehiculo.enviarReservar(reserva.getCliente(), reserva.getFechaInicio(), reserva.getFechaFin());
			
			const operacion = new RegistroOperacion(reserva.getFechaInicio(), reserva.tarifaFinalDeReserva());
			
			if (this.vehiculosEnAlquiler.has(reserva.getVehiculo().getVehiculo().getPatente()) == false) {
				this.vehiculosEnAlquiler.set(reserva.getVehiculo().getVehiculo().getPatente(), [operacion]);
			}
			else {
                let operaciones = this.vehiculosEnAlquiler.get(reserva.getVehiculo().getVehiculo().getPatente());

                if (!operaciones) {
                    operaciones = [];
                    this.vehiculosEnAlquiler.set(reserva.getVehiculo().getVehiculo().getPatente(), operaciones);
                }

                operaciones.push(operacion);
				
				this.vehiculosEnAlquiler.set(reserva.getVehiculo().getVehiculo().getPatente(), operaciones);
			}
			
		} catch(error) {
			
		}
        
    }

    public registrarMantenimiento(vehiculo: GestorDeVehiculo, costo: number, distanciaRecorrida: number, fecha: Date) {
        try {
			vehiculo.dispararMantenimiento(costo, distanciaRecorrida, fecha);
			
			const operacion = new RegistroOperacion(fecha, costo);

			if (this.vehiculosEnMantenimiento.has(vehiculo.getVehiculo().getPatente()) == false) {
				this.vehiculosEnMantenimiento.set(vehiculo.getVehiculo().getPatente(), [operacion]);
			}
			else {
				let operaciones = this.vehiculosEnMantenimiento.get(vehiculo.getVehiculo().getPatente());
				
                if (!operaciones) {
                    operaciones = [];
                    this.vehiculosEnAlquiler.set(vehiculo.getVehiculo().getPatente(), operaciones);
                }    

                operaciones.push(operacion);
				
				this.vehiculosEnMantenimiento.set(vehiculo.getVehiculo().getPatente(), operaciones);
			}
			
		} catch(error) {
			
		}
    }
	
	public porcentajeVehiculosAlquilados(fechaInicio: Date, fechaFin: Date) {
        let totalVehiculosAlquilados = 0;
        let encontrado = false;

        for (const [patente, operaciones] of this.vehiculosEnAlquiler) {
            for(const operacion of operaciones){
                let fechaOperacion = operacion.getFecha();
                if(fechaOperacion >= fechaInicio && fechaOperacion <= fechaFin && encontrado === false) {
                    totalVehiculosAlquilados ++;
                    encontrado = true; 
                }
            }
            encontrado = false;
        }

        return (totalVehiculosAlquilados / this.totalVehiculos) * 100;
    } 


    public vehiculoMenosAlquilado(fechaInicio: Date, fechaFin: Date): string {
        let minPatente: string = "";
        let minCantidad = Infinity;

        for (const [patente, operaciones] of this.vehiculosEnAlquiler) {
            const cantidad = operaciones.filter(op =>
                op.getFecha() >= fechaInicio && op.getFecha() <= fechaFin
            ).length;

            if (cantidad <= minCantidad) {
                minCantidad = cantidad;
                minPatente = patente;
            }
        }

        return minPatente;
    }

    public vehiculoMasAlquilado(fechaInicio: Date, fechaFin: Date): string {
        let maxPatente: string = "";
        let maxCantidad = 0;

        for (const [patente, operaciones] of this.vehiculosEnAlquiler) {
            const cantidad = operaciones.filter(op =>
                op.getFecha() >= fechaInicio && op.getFecha() <= fechaFin
            ).length;

            if (cantidad > maxCantidad) {
                maxCantidad = cantidad;
                maxPatente = patente;
            }
        }

        return maxPatente;
    }

    private calcularRentabilidadPatente(patente: string): number {
        let ingresos = 0;
        let egresos = 0;

        const alquileres = this.vehiculosEnAlquiler.get(patente) ?? [];
        const mantenimientos = this.vehiculosEnMantenimiento.get(patente) ?? [];

        ingresos = alquileres.reduce((acc, op) => acc + op.getCosto(), 0);
        egresos = mantenimientos.reduce((acc, op) => acc + op.getCosto(), 0);

        return ingresos - egresos;
    }

    public vehiculoMayorRentabilidad(): string {
        let maxPatente: string = "";
        let maxValor = 0;

        for (const patente of this.vehiculosEnAlquiler.keys()) {
            const rentabilidad = this.calcularRentabilidadPatente(patente);
            if (rentabilidad > maxValor) {
                maxValor = rentabilidad;
                maxPatente = patente;
            }
        }

        return maxPatente;
    }  

    public vehiculoMenorRentabilidad(): string {
        let minPatente: string = "";
        let minValor = 0;

        for (const patente of this.vehiculosEnAlquiler.keys()) {
            const rentabilidad = this.calcularRentabilidadPatente(patente);
            if (minValor === 0 || rentabilidad < minValor) {
                minValor = rentabilidad;
                minPatente = patente;
            }
        }

        return minPatente;
    }    
}