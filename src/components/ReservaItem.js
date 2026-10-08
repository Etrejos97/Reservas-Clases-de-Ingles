import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LabelLevel from './LabelLevel';
import { colors, spacing, radius } from '../theme';
import { formatearPrecio } from '../data/clases';

export default function ReservaItem({ reserva, onCancelar }) {
    const fechaTexto = new Date(reserva.createdAt).toLocaleDateString('es-CO');

    return (
        <View style={styles.tarjeta}>
            <LabelLevel level={reserva.nivel} />
            <Text style={styles.titulo}>{reserva.titulo}</Text>

            <View style={styles.fila}>
                <Ionicons name="person-outline" size={16} color={colors.textoSuave} />
                <Text style={styles.dato}>{reserva.profesor}</Text>
            </View>
            <View style={styles.fila}>
                <Ionicons name="time-outline" size={16} color={colors.textoSuave} />
                <Text style={styles.dato}>{reserva.horario}</Text>
            </View>
            <View style={styles.fila}>
                <Ionicons name="calendar-outline" size={16} color={colors.textoSuave} />
                <Text style={styles.dato}>Reservada el {fechaTexto}</Text>
            </View>

            <View style={styles.pie}>
                <Text style={styles.precio}>{formatearPrecio(reserva.precio)}</Text>
                <Pressable
                    onPress={onCancelar}
                    style={({ pressed }) => [styles.botonCancelar, pressed && { opacity: 0.7 }]}
                >
                    <Ionicons name="trash-outline" size={16} color={colors.peligro} />
                    <Text style={styles.botonCancelarTexto}>Cancelar reserva</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tarjeta: {
        backgroundColor: colors.superficie,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.borde,
        padding: spacing.lg,
        marginBottom: spacing.lg,
        gap: spacing.sm,
    },
    titulo: { fontSize: 16, fontWeight: '700', color: colors.texto },
    fila: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    dato: { fontSize: 13, color: colors.textoSuave },
    pie: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing.sm,
    },
    precio: { fontSize: 14, fontWeight: '800', color: colors.primario },
    botonCancelar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.peligro,
    },
    botonCancelarTexto: { fontSize: 13, fontWeight: '600', color: colors.peligro },
});
