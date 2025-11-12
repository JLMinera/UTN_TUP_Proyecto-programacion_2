import CalculadoraCompacto from "../clases/Calculadoras/CalculadoraCompacto";
import CalculadoraSedan from "../clases/Calculadoras/CalculadoraSedan";
import CalculadoraSuv from "../clases/Calculadoras/CalculadoraSuv";
import Compacto from "../clases/Vehiculos/Compacto";
import GestorDeVehiculo from "../clases/GestorDeVehiculo";
import Sedan from "../clases/Vehiculos/Sedan";
import Suv from "../clases/Vehiculos/Suv";

export function instanciarSuv(patente: string, kilometraje: number, tarifaBase: number, adicionalPorKm: number, limiteDiarioKm: number, seguro: number): GestorDeVehiculo {

    const vehiculo = new Suv(patente, kilometraje);
    const calculadoraSuv = new CalculadoraSuv();
    const gestorVehiculo = new GestorDeVehiculo(vehiculo, calculadoraSuv, tarifaBase, adicionalPorKm, limiteDiarioKm, seguro);

    return gestorVehiculo;
}

export function instanciarCompacto(patente: string, kilometraje: number, tarifaBase: number, adicionalPorKm: number, limiteDiarioKm: number, seguro: number): GestorDeVehiculo {

    const vehiculo = new Compacto(patente, kilometraje);
    const calculadoraCompacto = new CalculadoraCompacto();
    const gestorVehiculo = new GestorDeVehiculo(vehiculo, calculadoraCompacto, tarifaBase, adicionalPorKm, limiteDiarioKm, seguro);

    return gestorVehiculo;
}

export function instanciarSedan(patente: string, kilometraje: number, tarifaBase: number, adicionalPorKm: number, limiteDiarioKm: number, seguro: number): GestorDeVehiculo {

    const vehiculo = new Sedan(patente, kilometraje);
    const calculadoraSedan = new CalculadoraSedan();
    const gestorVehiculo = new GestorDeVehiculo(vehiculo, calculadoraSedan, tarifaBase, adicionalPorKm, limiteDiarioKm, seguro);

    return gestorVehiculo;
}