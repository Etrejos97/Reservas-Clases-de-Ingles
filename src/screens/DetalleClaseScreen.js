import react, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useResponsive from "../hooks/useResponsive";
import { colors, spacing, radius, typography, sombra } from '../theme/index.js';
import { formatearPrecio } from '../data/clases';
import LabelLevel from "../components/LabelLevel";

export default function DetalleClase({ route, navigation }) {
    const insets = useSafeAreaInsets();
    const { clase } = route.params;
    const { paddingHorizontal, isTablet } = useResponsive();
    const [cuposDisponibles, setCuposDisponibles] = useState(clase.cupos);

    function manejarReserva() {
        Alert.alert(
            'Confirmar reserva',
            `¿Deseas reservar "${clase.titulo}"?`,
            [
                { text: 'Rechazar', style: 'cancel' },
                {
                    text: 'Aceptar',
                    onPress: () => setCuposDisponibles((actuales) => actuales - 1),
                },
            ]
        );
    }

    return (
        <View style={estilos.pantalla}>
            <ScrollView contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                <Image source={{ uri: clase.imagen }}
                    resizeMode="cover"
                    style={[estilos.portada, { height: isTablet ? 400 : 200 }]}
                />
                <View style={{ paddingHorizontal, gap: spacing.lg }}>
                    <LabelLevel level={clase.nivel} />
                    <Text style={estilos.descripcion}>{clase.descripcion}</Text>
                    <View style={estilos.profesor}>
                        <Image source={{ uri: clase.profesor.foto }}
                            style={estilos.avatar}
                        />
                        <Text style={estilos.profesorNombre}>{clase.profesor.nombre}</Text>
                    </View>
                    <View style={estilos.datos}>
                        <View style={estilos.dato}>
                            <Text style={estilos.datoValor}>{clase.modalidad}</Text>
                        </View>
                        <View style={estilos.dato}>
                            <Text style={estilos.datoValor}>{`${clase.duracion} min`}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={typography.subtitulo}>Horarios disponibles</Text>
                        {clase.horarios.map((horario) => (
                            <Text key={horario} style={estilos.descripcion}>{horario}</Text>
                        ))}
                    </View>
                    <Text style={estilos.descripcion}>{`${cuposDisponibles} cupos disponibles`}</Text>
                </View>
            </ScrollView>
            <View style={[estilos.barra, { paddingHorizontal }]}>
                <Text style={estilos.precio}>{formatearPrecio(clase.precio)}</Text>
                <Pressable
                    disabled={cuposDisponibles <= 0}
                    onPress={manejarReserva}
                    style={({ pressed }) => [
                        estilos.boton,
                        cuposDisponibles <= 0 && estilos.botonDeshabilitado,
                        pressed && { opacity: 0.7 },
                    ]}
                >
                    <Text style={estilos.botonTexto}>
                        {cuposDisponibles <= 0 ? 'Sin cupos' : 'Reservar clase'}
                    </Text>
                </Pressable>
            </View>
        </View>
    )

}

const estilos = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.fondo },
    portada: { width: '100%', backgroundColor: colors.primarioSuave },
    datos: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.superficie,
        borderRadius: radius.lg,
        paddingVertical: spacing.lg,
    },
    dato: { alignItems: 'center', gap: 2 },
    datoValor: { fontSize: 16, fontWeight: '800', color: colors.texto },
    profesor: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: colors.superficie,
        borderRadius: radius.lg,
        padding: spacing.lg,
    },
    avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.borde },
    profesorNombre: { fontSize: 15, fontWeight: '700', color: colors.texto },
    descripcion: { ...typography.cuerpo, color: colors.textoSuave, lineHeight: 22, marginTop: spacing.sm },
    barra: {
        justifyContent: 'space-between',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.superficie,
        borderTopWidth: 1,
        borderTopColor: colors.borde,
        paddingVertical: spacing.lg,
        paddingTop: spacing.lg
    },
    precio: { fontSize: 18, fontWeight: '800', color: colors.primario },
    boton: {
        backgroundColor: colors.primario,
        borderRadius: radius.md,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
    },
    botonTexto: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    botonDeshabilitado: { backgroundColor: colors.borde },

});