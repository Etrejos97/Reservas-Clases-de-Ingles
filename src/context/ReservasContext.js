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
}
