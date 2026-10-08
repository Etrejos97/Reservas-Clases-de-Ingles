export function esDeLaPersona(reserva, perfil) {
    if (!perfil) {
        return false;
    }
    return reserva.documento === perfil.documento;
}
