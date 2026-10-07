import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import LabelLevel from "./LabelLevel";
import { colors, spacing, radius } from '../theme';
import { formatearPrecio } from '../data/clases';

export default function Card({ clase, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [estilos.tarjeta, pressed && { opacity: 0.85 }]}
        >
            <Image source={{ uri: clase.imagen }} style={estilos.imagen} />
            <View style={estilos.cuerpo}>
                <LabelLevel level={clase.nivel} />
                <Text style={estilos.titulo} numberOfLines={2}>
                    {clase.titulo}
                </Text>
                <Text style={estilos.profesor}>
                    {clase.profesor.nombre}
                </Text>
                <View style={estilos.pie}>
                    <Text style={estilos.meta}>
                        {clase.horarios[0]}
                    </Text>
                    <Text style={estilos.precio}>
                        {formatearPrecio(clase.precio)}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borde,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  imagen: {
    width: '100%',
    height: 130,
    backgroundColor: colors.primarioSuave,
  },
  cuerpo: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  titulo: { fontSize: 16, fontWeight: '700', color: colors.texto },
  profesor: { fontSize: 13, color: colors.textoSuave },
  pie: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  meta: { fontSize: 12, color: colors.textoSuave },
  precio: { fontSize: 14, fontWeight: '800', color: colors.primario },
});
