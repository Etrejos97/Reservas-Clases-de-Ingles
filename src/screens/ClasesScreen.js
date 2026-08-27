import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import LabelLevel from "./LabelLevel";
import { colors, spacing, radius, typography } from '../theme';
import {formatearPrecio, CLASES} from '../data/clases';
import { TextInput } from "react-native/types_generated/index";

export default function ClasesScreen({navigation}) {
    const [nivel, setNivel] = React.useState();
    const[busqueda, setBusqueda] = React.useState('');

    return(
        <View>
            <Text>Aplicación Para clases de inglés</Text>
            <Ionicons name="search" size={24} color={colors.textoSuave} />
            <TextInput
                style={estilos.input}
                placeholder="Buscar por nivel"
                value={busqueda}
                onChangeText={setBusqueda}
                autoCorrect={false}
            />
        </View>
        
    )
}