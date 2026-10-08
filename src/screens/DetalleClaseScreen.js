import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image, Pressable } from 'react-native';
import useResponsive from "../hooks/useResponsive";
import { colors, spacing, radius, typography } from '../theme/index.js';
import { formatearPrecio } from '../data/clases';
import useReserva from '../hooks/useReserva';
import usePerfil from '../hooks/usePerfil';
import LabelLevel from "../components/LabelLevel";

export default function DetalleClase({ route, navigation }) {
    const { clase } = route.params;
    const { paddingHorizontal, isTablet } = useResponsive();
    const { cargando, reservas, agregarReserva } = useReserva();
    const { completo, cargando: cargandoPerfil } = usePerfil();
    const [horarioElegido, setHorarioElegido] = useState(null);

    const reservasDeLaClase = reservas.filter((r) => r.claseId === clase.id);
    const cuposDisponibles = clase.cupos - reservasDeLaClase.length;
    const horariosReservados = reservasDeLaClase.map((r) => r.horario);
    // El botón se deshabilita mientras carga, si no hay cupos, o si ya hay perfil y falta elegir horario.
    // Sin perfil queda habilitado para llevar a la pestaña Perfil
    const botonActivo = !cargando && !cargandoPerfil && cuposDisponibles > 0 && (!completo || horarioElegido !== null);

    function manejarBoton() {
        if (!completo) {
            navigation.navigate('Perfil');
        } else {
            manejarReserva();
        }
    }

    // Texto del botón, en el orden en que se revisa cada caso
    function textoDelBoton() {
        if (cuposDisponibles <= 0) {
            return 'Sin cupos';
        }
        if (!completo) {
            return 'Completa tu perfil';
        }
        if (horarioElegido === null) {
            return 'Elige un horario';
        }
        return 'Reservar clase';
    }

    function manejarReserva() {
        Alert.alert(
            'Confirmar reserva',
            `¿Deseas reservar "${clase.titulo}" el ${horarioElegido}?`,
            [
                { text: 'Rechazar', style: 'cancel' },
                {
                    text: 'Aceptar',
                    onPress: () => {
                        const resultado = agregarReserva(clase, horarioElegido);
                        if (resultado.ok) {
                            setHorarioElegido(null);
                            Alert.alert('Reserva confirmada', 'Te esperamos en la clase.');
                        } else if (resultado.motivo === 'sin-perfil') {
                            Alert.alert('Falta tu perfil', 'Completa tu perfil para poder reservar.');
                        } else {
                            Alert.alert('Ya reservada', 'Ya tienes reservado ese horario.');
                        }
                    },
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
                <View style={{ paddingHorizontal, paddingTop: spacing.lg, gap: spacing.lg }}>
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
                        <View style={estilos.horarios}>
                            {clase.horarios.map((horario) => {
                                const reservado = horariosReservados.includes(horario);
                                const activo = horarioElegido === horario;
                                return (
                                    <Pressable
                                        key={horario}
                                        disabled={reservado}
                                        onPress={() => setHorarioElegido(horario)}
                                        style={[
                                            estilos.horario,
                                            activo && estilos.horarioActivo,
                                            reservado && estilos.horarioReservado,
                                        ]}
                                    >
                                        <Text style={[estilos.horarioTexto, activo && estilos.horarioTextoActivo]}>
                                            {reservado ? `${horario} · Reservado` : horario}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>

                    <Text style={estilos.descripcion}>{`${cuposDisponibles} cupos disponibles`}</Text>
                </View>
            </ScrollView>
            <View style={[estilos.barra, { paddingHorizontal }]}>
                <Text style={estilos.precio}>{formatearPrecio(clase.precio)}</Text>
                <Pressable
                    disabled={!botonActivo}
                    onPress={manejarBoton}
                    style={({ pressed }) => [
                        estilos.boton,
                        !botonActivo && estilos.botonDeshabilitado,
                        pressed && { opacity: 0.7 },
                    ]}
                    >
                    <Text style={estilos.botonTexto}>{textoDelBoton()}</Text>
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
        horarios: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
    horario: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: radius.full,
        backgroundColor: colors.superficie,
        borderWidth: 1,
        borderColor: colors.borde,
    },
    horarioActivo: { backgroundColor: colors.primario, borderColor: colors.primario },
    horarioReservado: { opacity: 0.5 },
    horarioTexto: { fontSize: 13, fontWeight: '600', color: colors.textoSuave },
    horarioTextoActivo: { color: '#FFFFFF' },

});