import React from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import EstadoVacio from '../components/EstadoVacio';
import ReservaItem from '../components/ReservaItem';
import useReserva from '../hooks/useReserva';
import usePerfil from '../hooks/usePerfil';
import { formatearPrecio } from '../data/clases';
import { colors, spacing } from '../theme';

export default function ReservasScreen({ navigation }) {
    const { cargando, misReservas, cancelarReserva } = useReserva();
    const { cargando: cargandoPerfil, completo } = usePerfil();

    function confirmarCancelacion(reserva) {
        Alert.alert(
            'Cancelar reserva',
            `¿Quieres cancelar "${reserva.titulo}" el ${reserva.horario}?`,
            [
                { text: 'Mantener', style: 'cancel' },
                {
                    text: 'Cancelar reserva',
                    style: 'destructive',
                    onPress: () => cancelarReserva(reserva.id),
                },
            ]
        );
    }

    // Estado 1: todavía se está leyendo lo guardado
    if (cargando || cargandoPerfil) {
        return (
            <View style={styles.centro}>
                <Text style={styles.cargando}>Cargando...</Text>
            </View>
        );
    }

    // Estado 2: no hay perfil completo
    if (!completo) {
        return (
            <View style={styles.pantalla}>
                <EstadoVacio
                    icono="person-outline"
                    titulo="Aún no tienes perfil"
                    mensaje="Registra tu perfil para ver tus reservas."
                    textoAccion="Ir a mi perfil"
                    onAccion={() => navigation.navigate('Perfil')}
                />
            </View>
        );
    }

    // Estado 3: hay perfil pero todavía no hay reservas
    if (misReservas.length === 0) {
        return (
            <View style={styles.pantalla}>
                <EstadoVacio
                    icono="calendar-outline"
                    titulo="Aún no tienes reservas"
                    mensaje="Cuando reserves una clase, la verás en esta pantalla."
                    textoAccion="Ver clases"
                    onAccion={() => navigation.navigate('Clases')}
                />
            </View>
        );
    }

    // Estado 4: la lista de reservas y el total a pagar
    let total = 0;
    for (const reserva of misReservas) {
        total = total + reserva.precio;
    }

    return (
        <View style={styles.pantalla}>
            <FlatList
                data={misReservas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ReservaItem reserva={item} onCancelar={() => confirmarCancelacion(item)} />
                )}
                contentContainerStyle={styles.lista}
                showsVerticalScrollIndicator={false}
            />
            <View style={styles.barraTotal}>
                <Text style={styles.totalTitulo}>Total a pagar</Text>
                <Text style={styles.totalValor}>{formatearPrecio(total)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.fondo },
    centro: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.fondo },
    cargando: { fontSize: 13, color: colors.textoSuave },
    lista: { padding: spacing.lg },
    barraTotal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.superficie,
        borderTopWidth: 1,
        borderTopColor: colors.borde,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    totalTitulo: { fontSize: 14, fontWeight: '600', color: colors.texto },
    totalValor: { fontSize: 18, fontWeight: '800', color: colors.primario },
});
