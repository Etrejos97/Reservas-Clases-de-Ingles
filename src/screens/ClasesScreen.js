import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Pressable, Image, TextInput, ScrollView } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';;
import {Ionicons} from '@expo/vector-icons';
import LabelLevel from "../components/LabelLevel";
import LevelChip  from "../components/LevelChip";
import { colors, spacing, radius, typography } from '../theme/index.js';
import {formatearPrecio, CLASES, NIVELES} from '../data/clases';

export default function ClasesScreen({navigation}) {
    const insets = useSafeAreaInsets();
    const [nivel, setNivel] = useState();
    const[busqueda, setBusqueda] = useState('');

    return(
        <View style={[style.pantalla, { paddingTop: insets.top + spacing.md}]}>            
                <Text style={typography.titulo}>
                    Reserva Clases de Inglés
                </Text>
            <View style={style.buscador}>
                <Ionicons name="search" size={18} color={colors.textoSuave} />
                <TextInput
                    style={style.input}
                    placeholder="Buscar por nivel"
                    value={busqueda}
                    onChangeText={setBusqueda}
                    autoCorrect={false}
                />                
                {
                    busqueda.length > 0 && (
                        <Ionicons
                            name="close-circle"
                            size={18}
                            color={colors.textoSuave}
                            onPress={() => setBusqueda('')}
                        />
                    )
                }
            </View>
            <ScrollView
                style={{flexGrow: 0}}
                horizontal
            >
                {
                    NIVELES.map((item) => (
                        <LevelChip
                            key={item}
                            label={item}
                            active={item}
                            onPress={() => setNivel(item)}
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 46,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  input: { flex: 1, fontSize: 14, color: colors.texto, paddingVertical: 0 },
});