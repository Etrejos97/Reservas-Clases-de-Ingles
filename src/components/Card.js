import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import LabelLevel from "./LabelLevel";
import { colors, spacing, radius, typography } from '../theme';
import {formatearPrecio, CLASES} from '../data/clases';

export default function Card({clase, onPress, ancho}){
    return (
        <Pressable
            onPress={onPress}>
            <Image source={{ uri: clase.image }}/>
            <View>
                <LabelLevel level={clase.nivel} />
            </View>
            <text style={estilos.titulo} numberOfLines={2}>
                {clase.titulo}
            </text>
            <View>
                <Text style={estilos.profesor}>
                    {clase.profesor.nombre}
                </Text>
                <Text style={estilos.horario}>
                    {clase.horarios[0]}
                </Text>
                <Text style={estilos.precio}> 
                    {formatearPrecio(clase.precio)}
                </Text>
            </View>


        </Pressable>
    )
}

const style = StyleSheet.create({
  tarjeta: {
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
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
  filaProfesor: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  avatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.borde },
  profesor: { fontSize: 13, color: colors.textoSuave, flexShrink: 1 },
  pie: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  filaCentro: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  meta: { fontSize: 12, color: colors.textoSuave },
  punto: { color: colors.borde, marginHorizontal: 2 },
  precio: { fontSize: 14, fontWeight: '800', color: colors.primario },
});