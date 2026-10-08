import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {colors, spacing, radius} from '../theme/index.js';

export default function EstadoVacio({titulo, mensaje, icono='calendar-outline', onAccion, textoAccion='Limpiar filtros'}) {
    return (
        <View style={styles.contenedor}>
            <View style={styles.circulo}>
                <Ionicons name={icono} size={30} color={colors.primario} />                
            </View>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.mensaje}>{mensaje}</Text>
            {onAccion && (
                <Pressable
                    onPress={onAccion}
                    style={({pressed}) => [styles.boton, pressed && {opacity: 0.7}]}
                >
                    <Text style={styles.botonTexto}>{textoAccion}</Text>
                </Pressable>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  circulo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primarioSuave,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  titulo: { fontSize: 17, fontWeight: '700', color: colors.texto, textAlign: 'center' },
  mensaje: {
    fontSize: 14,
    color: colors.textoSuave,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 20,
  },
    boton: {
    marginTop: spacing.lg,
    backgroundColor: colors.primario,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  botonTexto: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },

});