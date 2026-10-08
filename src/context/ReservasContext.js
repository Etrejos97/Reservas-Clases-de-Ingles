import React, {useCallback, useMemo, createContext} from 'react';
import useAlmacenamiento from '../hooks/useAlmacenamiento';
import { STORAGE_KEYS } from '../constants/storageKeys';
import usePerfil from '../hooks/usePerfil';

export const ReservasContext = createContext(null);

export function ReservasProvider({children}) {
    // El hook se encarga de leer y guardar las reservas, si no hay ninguna empieza con un array vacío
    const [reservas, setReservas, listo] = useAlmacenamiento(STORAGE_KEYS.RESERVAS, []);
    const cargando = !listo;
    const { perfil, completo } = usePerfil();

    const agregarReserva = useCallback((clase, horario) => {
        // Sin perfil completo no se crea la reserva, porque quedaría sin dueño
        if (!completo) {
            return {ok: false, motivo: 'sin-perfil'};
        }
        const id = clase.id + '-' + horario;
        if (reservas.some((r) => r.id === id)) {
            return {ok: false, motivo: 'duplicada'};
        }
        const nueva = {
            id,
            claseId: clase.id,
            documento: perfil.documento,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre,
            precio: clase.precio,
            horario,
            createdAt: new Date().toISOString(),
        };
        setReservas([nueva, ...reservas]);
        return {ok: true};
    },[reservas, setReservas, perfil, completo]);
    const valor = useMemo(
        () =>(
            {cargando, reservas, agregarReserva}),[cargando, reservas, agregarReserva]
        );
    return <ReservasContext.Provider value={valor}>{children}</ReservasContext.Provider>

}
