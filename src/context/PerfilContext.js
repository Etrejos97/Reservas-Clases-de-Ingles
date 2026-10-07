import React, {useMemo, createContext} from 'react';
import useAlmacenamiento from '../hooks/useAlmacenamiento';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { perfilValido } from '../utils/validarPerfil';

export const PerfilContext = createContext(null);

export function PerfilProvider({children}) {
    
    const [perfil, setPerfil, listo] = useAlmacenamiento(STORAGE_KEYS.PERFIL, null);
    const cargando = !listo;

    const completo = perfilValido(perfil);

    const valor = useMemo(
        () => ({cargando, perfil, completo, guardarPerfil: setPerfil}),
        [cargando, perfil, completo, setPerfil]
    );
    return <PerfilContext.Provider value={valor}>{children}</PerfilContext.Provider>
}
