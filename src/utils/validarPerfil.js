// Reglas del perfil en un solo lugar: el formulario las usa para avisar qué falta
// y el contexto para saber si el perfil está completo

// Devuelve el mensaje de lo que está mal, o null si el perfil es válido
export function errorDePerfil(datos) {
    if (!datos) {
        return 'Completa tu perfil.';
    }
    const { nombre, apellido, nivelIngles, telefono, documento } = datos;
    if (!nombre || !apellido || !nivelIngles || !telefono || !documento) {
        return 'Completa todos los campos para guardar tu perfil.';
    }
    if (!/^\d{7,}$/.test(telefono)) {
        return 'El teléfono debe tener solo números y mínimo 7 dígitos.';
    }
    if (!/^\d{5,}$/.test(documento)) {
        return 'El documento debe tener solo números y mínimo 5 dígitos.';
    }
    return null;
}

export function perfilValido(datos) {
    return errorDePerfil(datos) === null;
}
