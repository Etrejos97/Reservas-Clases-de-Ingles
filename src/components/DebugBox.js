import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Muestra lo que REALMENTE hay guardado en AsyncStorage, como texto sin convertir.
// Sirve para ver en vivo que los datos se guardan como texto JSON
export default function DebugBox({ entradas }) {
    return (
        <View style={styles.caja}>
            <View style={styles.encabezado}>
                <Ionicons name="bug-outline" size={18} color="#FACC15" />
                <Text style={styles.titulo}>AsyncStorage (contenido guardado)</Text>
            </View>

            {entradas.length === 0 ? (
                <Text style={styles.linea}>(vacío: no hay llaves guardadas)</Text>
            ) : (
                entradas.map(([llave, valor]) => (
                    <Text key={llave} style={styles.linea}>
                        <Text style={styles.llave}>{llave}</Text>
                        {' → '}
                        {valor}
                    </Text>
                ))
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    caja: {
        backgroundColor: '#1E293B',
        borderRadius: 10,
        padding: 12,
        marginTop: 16,
    },
    encabezado: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 6,
    },
    titulo: { color: '#FACC15', fontWeight: 'bold' },
    linea: {
        color: '#E2E8F0',
        fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
        fontSize: 12,
        marginBottom: 4,
    },
    llave: { color: '#5EEAD4' },
});
