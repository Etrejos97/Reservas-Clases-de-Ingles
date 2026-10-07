import { useContext } from 'react';
import { PerfilContext } from '../context/PerfilContext';

export default function usePerfil() {
    const contexto = useContext(PerfilContext);
    if (!contexto) {
        throw new Error('usePerfil debe usarse dentro de <PerfilProvider>');
    }
    return contexto;
}
