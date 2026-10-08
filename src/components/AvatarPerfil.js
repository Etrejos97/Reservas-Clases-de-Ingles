import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';


// Muestra la foto si hay; si no, las iniciales del nombre; y si tampoco hay nombre, un ícono
export default function AvatarPerfil({ uri, nombre, apellido, size = 72 }) {
    const medidas = { width: size, height: size, borderRadius: size / 2 };
    const [fallo, setFallo] = useState(false);

    // Si la foto cambia, vuelvo a intentar cargarla
    useEffect(() => {
        setFallo(false);
    }, [uri]);

    // Si la foto ya no existe en el teléfono (por ejemplo, porque se limpió el caché),
    // en lugar de dejar un hueco en blanco muestro las iniciales o el ícono
    if (uri && !fallo) {
        return (
            <Image
                source={{ uri }}
                style={[styles.base, medidas]}
                onError={() => setFallo(true)}
            />
        );
    }
    if (nombre && apellido) {
        const iniciales = (nombre[0] + apellido[0]).toUpperCase();
        return (
            <View style={[styles.base, styles.fondo, medidas]}>
                <Text style={[styles.iniciales, { fontSize: size / 2.5 }]}>{iniciales}</Text>
            </View>
        );
    }
    return (
        <View style={[styles.base, styles.fondo, medidas]}>
            <Ionicons name="person" size={size / 2} color={colors.primario} />
        </View>
    );
}

const styles = StyleSheet.create({
    base: { alignItems: 'center', justifyContent: 'center' },
    fondo: { backgroundColor: colors.primarioSuave },
    iniciales: { fontWeight: '800', color: colors.primario },
});
