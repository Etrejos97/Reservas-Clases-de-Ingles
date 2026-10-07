import { useState, useEffect, useCallback, useRef } from 'react';
import { getData, saveData } from '../services/storage';

export default function useAlmacenamiento(key, valorInicial) {
    const [valor, setValor] = useState(valorInicial);
    const [listo, setListo] = useState(false);
    const ultimoGuardado = useRef(valorInicial); // Lo último que sí quedó guardado en el teléfono

    useEffect(() => {
        let activo = true; // Variable para controlar si el componente sigue montado

        const cargar = async () => {
            const guardado = await getData(key);
            if (activo) {
                if (guardado !== null) {
                    setValor(guardado);
                    ultimoGuardado.current = guardado;
                }
                setListo(true);
            }
        };
        cargar();

        return () => {
            activo = false; // Marcar como inactivo al desmontar el componente
        }
    }, [key]);

    // Actualiza lo que se ve en pantalla y lo que queda guardado
    const actualizar = useCallback(
        async (nuevoValor) => {
            setValor(nuevoValor);
            const guardado = await saveData(key, nuevoValor);
            if (guardado) {
                ultimoGuardado.current = nuevoValor;
            } else {
                // Si no se pudo guardar, la pantalla vuelve a lo que sí está guardado
                setValor(ultimoGuardado.current);
            }
        }, [key]
    );

    return [valor, actualizar, listo];
}
