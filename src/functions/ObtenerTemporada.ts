import Temporada from "../clases/Temporada";
import TemporadaAlta from "../clases/TemporadaAlta";
import TemporadaBaja from "../clases/TemporadaBaja";
import TemporadaMedia from "../clases/TemporadaMedia";
import TemporadaError from "../clasesDeError/TemporadaError";

export default function obtenerTemporada(fechaInicioReserva: Date): Temporada {
    const temporadas: Array<Temporada> =
        [
            new TemporadaAlta(new Date(2025, 11, 17), new Date(2025, 2, 17)),
            new TemporadaMedia(new Date(2025, 8, 17), new Date(2025, 11, 16)),
            new TemporadaBaja(new Date(2025, 2, 18), new Date(2025, 8, 16))
        ];

    for (const temp of temporadas) {
        if (temp.reservaEnTemporada(fechaInicioReserva)) {
            return temp;
        }
    }
    throw new TemporadaError("Debe ingresar una fecha valida.");
}



