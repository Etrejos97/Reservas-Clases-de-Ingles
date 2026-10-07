import React, { useState } from 'react';
import {
    View, Text, TextInput, Pressable, ScrollView,
    KeyboardAvoidingView, Platform, Alert, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LevelChip from '../components/LevelChip';
import usePerfil from '../hooks/usePerfil';
import { errorDePerfil } from '../utils/validarPerfil';
import { NIVELES_INGLES } from '../data/nivelesIngles';
import { colors, spacing, radius } from '../theme';

function FormularioPerfil({ perfil, onTerminar }) {
    const { guardarPerfil } = usePerfil();
    const [nombre, setNombre] = useState(perfil ? perfil.nombre : '');
    const [apellido, setApellido] = useState(perfil ? perfil.apellido : '');
    const [nivel, setNivel] = useState(perfil ? perfil.nivelIngles : '');
    const [telefono, setTelefono] = useState(perfil ? perfil.telefono : '');
    const [documento, setDocumento] = useState(perfil ? perfil.documento : '');

    function guardar() {
        const datos = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            nivelIngles: nivel,
            telefono: telefono.trim(),
            documento: documento.trim(),
        };
        const error = errorDePerfil(datos);
        if (error) {
            Alert.alert('Revisa tus datos', error);
            return;
        }
        guardarPerfil(datos);
        Alert.alert('Perfil guardado', 'Ya puedes reservar tus clases.');
        onTerminar();
    }

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.formulario} keyboardShouldPersistTaps="handled">
                <Text style={styles.titulo}>{perfil ? 'Editar perfil' : 'Registra tu perfil'}</Text>

                <Text style={styles.etiqueta}>Nombre</Text>
                <TextInput
                    style={styles.input}
                    value={nombre}
                    onChangeText={setNombre}
                    placeholder="Ej: Laura"
                    autoCapitalize="words"
                />

                <Text style={styles.etiqueta}>Apellido</Text>
                <TextInput
                    style={styles.input}
                    value={apellido}
                    onChangeText={setApellido}
                    placeholder="Ej: Gómez"
                    autoCapitalize="words"
                />

                <Text style={styles.etiqueta}>Nivel de inglés</Text>
                <ScrollView horizontal style={styles.niveles} showsHorizontalScrollIndicator={false}>
                    {NIVELES_INGLES.map((item) => (
                        <LevelChip
                            key={item}
                            label={item}
                            active={nivel === item}
                            onPress={() => setNivel(item)}
                        />
                    ))}
                </ScrollView>

                <Text style={styles.etiqueta}>Teléfono</Text>
                <TextInput
                    style={styles.input}
                    value={telefono}
                    onChangeText={setTelefono}
                    placeholder="Ej: 3001234567"
                    keyboardType="phone-pad"
                />

                <Text style={styles.etiqueta}>Documento</Text>
                <TextInput
                    style={styles.input}
                    value={documento}
                    onChangeText={setDocumento}
                    placeholder="Ej: 1020304050"
                    keyboardType="number-pad"
                />

                <Pressable
                    onPress={guardar}
                    style={({ pressed }) => [styles.boton, pressed && { opacity: 0.7 }]}
                >
                    <Text style={styles.botonTexto}>Guardar</Text>
                </Pressable>
                {perfil && (
                    <Pressable
                        onPress={onTerminar}
                        style={({ pressed }) => [styles.botonSecundario, pressed && { opacity: 0.7 }]}
                    >
                        <Text style={styles.botonSecundarioTexto}>Cancelar</Text>
                    </Pressable>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

function FilaDato({ icono, titulo, valor }) {
    return (
        <View style={styles.fila}>
            <Ionicons name={icono} size={22} color={colors.primario} />
            <View style={styles.filaTextos}>
                <Text style={styles.filaTitulo}>{titulo}</Text>
                <Text style={styles.filaValor}>{valor}</Text>
            </View>
        </View>
    );
}

function VistaPerfil({ perfil, onEditar }) {
    return (
        <ScrollView contentContainerStyle={styles.vista}>
            <View style={styles.avatar}>
                <Ionicons name="person" size={36} color={colors.primario} />
            </View>
            <Text style={styles.nombreCompleto}>{perfil.nombre} {perfil.apellido}</Text>
            <FilaDato icono="school-outline" titulo="Nivel de inglés" valor={perfil.nivelIngles} />
            <FilaDato icono="call-outline" titulo="Teléfono" valor={perfil.telefono} />
            <FilaDato icono="card-outline" titulo="Documento" valor={perfil.documento} />
            <Pressable
                onPress={onEditar}
                style={({ pressed }) => [styles.boton, pressed && { opacity: 0.7 }]}
            >
                <Text style={styles.botonTexto}>Editar</Text>
            </Pressable>
        </ScrollView>
    );
}

export default function PerfilScreen() {
    const { cargando, perfil } = usePerfil();
    const [editando, setEditando] = useState(false);

    if (cargando) {
        return (
            <View style={styles.centro}>
                <Text style={styles.filaTitulo}>Cargando...</Text>
            </View>
        );
    }
    if (!perfil || editando) {
        return <FormularioPerfil perfil={perfil} onTerminar={() => setEditando(false)} />;
    }
    return <VistaPerfil perfil={perfil} onEditar={() => setEditando(true)} />;
}

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: colors.fondo },
    centro: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.fondo },
    formulario: { padding: spacing.lg, paddingBottom: spacing.xxl },
    titulo: { fontSize: 20, fontWeight: '800', color: colors.texto, marginBottom: spacing.lg },
    etiqueta: { fontSize: 13, fontWeight: '600', color: colors.textoSuave, marginBottom: spacing.xs },
    input: {
        backgroundColor: colors.superficie,
        borderWidth: 1,
        borderColor: colors.borde,
        borderRadius: radius.md,
        paddingHorizontal: spacing.lg,
        height: 46,
        fontSize: 14,
        color: colors.texto,
        marginBottom: spacing.lg,
    },
    niveles: { flexGrow: 0, marginBottom: spacing.lg },
    boton: {
        backgroundColor: colors.primario,
        borderRadius: radius.md,
        paddingVertical: spacing.md,
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    botonTexto: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
    botonSecundario: {
        borderRadius: radius.md,
        paddingVertical: spacing.md,
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    botonSecundarioTexto: { color: colors.textoSuave, fontSize: 15, fontWeight: '700' },
    vista: { padding: spacing.lg, alignItems: 'stretch', backgroundColor: colors.fondo, flexGrow: 1 },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: colors.primarioSuave,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    nombreCompleto: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.texto,
        textAlign: 'center',
        marginTop: spacing.md,
        marginBottom: spacing.xl,
    },
    fila: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: colors.superficie,
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginBottom: spacing.sm,
    },
    filaTextos: { flex: 1 },
    filaTitulo: { fontSize: 12, color: colors.textoSuave },
    filaValor: { fontSize: 15, fontWeight: '700', color: colors.texto },
});
