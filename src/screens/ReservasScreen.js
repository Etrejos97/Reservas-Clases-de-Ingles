import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function ReservasScreen() {
    return <View style={styles.pantalla} />;
}

const styles = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.fondo },
});
