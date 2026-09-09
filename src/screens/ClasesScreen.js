import React, {useState, useMemo} from "react";
import { View, Text, StyleSheet, Pressable, Image, TextInput, ScrollView } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';;
import {Ionicons} from '@expo/vector-icons';
import LabelLevel from "../components/LabelLevel";
import Card from "../components/Card.js";
import LevelChip  from "../components/LevelChip";
import useResponsive from "../hooks/useResponsive.js";
import { colors, spacing, radius, typography } from '../theme/index.js';
import {formatearPrecio, CLASES, NIVELES} from '../data/clases';
import { FlatList } from "react-native/types_generated/index";

export default function ClasesScreen({navigation}) {
    const insets = useSafeAreaInsets();
    const [columnas, paddingHorizontal] = useResponsive();
    const [nivel, setNivel] = useState();
    const[busqueda, setBusqueda] = useState('');
    const resultados = useMemo(() => {
        const textoBusqueda = busqueda.trim().toLowerCase()
    return CLASES.filter((clase) => {
        const coincidenciaNivel = nivel === 'Todos' || clase.nivel === nivel;
        const coincidenciaTexto = textoBusqueda || 
        clase.titulo.toLowerCase().includes(textoBusqueda) ||
        clase.profesor.nombre.toLowerCase().includes(textoBusqueda);
        return coincidenciaNivel && coincidenciaTexto
    })
}, [nivel, busqueda]);

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
            <FlatList
                data={resultados}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card clase={item} 
                        onPress = {() => navigation.navigate('DetalleClaseScreen', {clase: item})}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal,
                    flexGrow: 1,
                }}
            />
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