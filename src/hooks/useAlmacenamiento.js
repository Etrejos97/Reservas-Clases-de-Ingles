import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAlmacenamiento(key, valorInicial) {
    const [valor, setValor] = useState(valorInicial);
    const [listo, setListo] = useState(false);

    useEffect(() => {
        let activo = true; // Variable para controlar si el componente sigue montado

        AsyncStorage.getItem(key)
            .then((guardando) => {
                if (activo && guardando !== null) {
                    setValor(JSON.parse(guardando));
                }
            })
            .catch((error) => console.error('Error leyendo ' + key, error))
            .finally(() => activo && setListo(true));

        return () => {
            activo = false; // Marcar como inactivo al desmontar el componente
        }
    }, [key]);

    const actualizar = useCallback(
        async(nuevoValor) => {
            setValor(nuevoValor);
            try {
                await AsyncStorage.setItem(key, JSON.stringify(nuevoValor));
            } catch (error) {
                console.log('Error guardando ' + key, error);
            }
        }, [key]
    );
};