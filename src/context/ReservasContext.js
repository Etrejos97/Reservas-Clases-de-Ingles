import React, {useState, useEffect, useCallback, useMemo, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_RESERVAS = '@reserva_ingles';

export const ReservasContext = createContext(null);

export function ReservasProvider({children}) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Cargar reservas que tengo guardadas, si no tengo ninguna, entonces se inicializa con un array vacío
    useEffect(() => {
        const cargar = async () => {
            try {
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS);
                if (guardado) {
                    setReservas(JSON.parse(guardado));
                }
            } catch (error) {
                console.log('Error leyendo reservas: ', error);
            }finally{
                setCargando(false);
            }
        }
        cargar();
},[])

    // Guardar reservas en AsyncStorage
    useEffect(() => {
        if (!cargando) {
            AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch((error) => {
                console.log('Error guardando reservas: ', error);
            });
        }
    },[reservas,cargando]);

    const agregarReserva = useCallback((clase, horario) => {
        const nueva = {
            id: clase.id + '-' + horario,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre,
            precio: clase.precio,
            horario,
            createdAt: new Date().toISOString(),
        }
        let resultado = {ok: true};
        setReservas((previas) => {
            if (previas.some((r) => r.id === nueva.id)) {
                resultado = {ok: false};
                return previas;
            }
            return [nueva, ...previas];
        });
        return resultado;
    },[]);
    const valor = useMemo(
        () =>(
            {cargando, reservas, agregarReserva}),[cargando, reservas, agregarReserva]
        );
    return <ReservasContext.Provider>{children}</ReservasContext.Provider>
}
