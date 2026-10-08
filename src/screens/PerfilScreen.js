import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, Pressable, ScrollView, ActivityIndicator,
    KeyboardAvoidingView, Platform, Alert, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AvatarPerfil from '../components/AvatarPerfil';
import DebugBox from '../components/DebugBox';
import LevelChip from '../components/LevelChip';
import usePerfil from '../hooks/usePerfil';
import useReserva from '../hooks/useReserva';
import { removeData, getAllRaw } from '../services/storage';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { errorDePerfil, perfilValido } from '../utils/validarPerfil';
import { NIVELES_INGLES } from '../data/nivelesIngles';
import { colors, spacing, radius } from '../theme';

function FormularioPerfil({ perfil, onTerminar }) {
    const { guardarPerfil } = usePerfil();
    const [nombre, setNombre] = useState(perfil ? perfil.nombre : '');
    const [apellido, setApellido] = useState(perfil ? perfil.apellido : '');
    const [nivel, setNivel] = useState(perfil ? perfil.nivelIngles : '');
    const [telefono, setTelefono] = useState(perfil ? perfil.telefono : '');
    const [documento, setDocumento] = useState(perfil ? perfil.documento : '');
    const [foto, setFoto] = useState((perfil && perfil.foto) || '');
    // El documento solo se bloquea cuando el perfil guardado ya es válido
    const documentoBloqueado = perfilValido(perfil);

    async function elegirFoto() {
        try {
            const resultado = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
            });
            // Si la persona cierra la galería sin elegir, no cambio la foto
            if (resultado.canceled) {
                return;
            }
            setFoto(resultado.assets[0].uri);
        } catch (error) {
            Alert.alert('No se pudo abrir la galería', 'Intenta de nuevo.');
        }
    }

    function guardar() {
        const datos = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            nivelIngles: nivel,
            telefono: telefono.trim(),
            documento: documento.trim(),
            foto,
        };
        const error = errorDePerfil(datos);
        if (error) {
            Alert.alert('Revisa tus datos', error);
            return;
        }
        guardarPerfil(datos);
        if (perfil) {
            Alert.alert('Perfil actualizado', 'Tus datos quedaron al día.');
        } else {
            Alert.alert('Perfil guardado', 'Ya puedes reservar tus clases.');
        }
        onTerminar();
    }

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.formulario} keyboardShouldPersistTaps="handled">
                <Text style={styles.titulo}>{perfil ? 'Editar perfil' : 'Registra tu perfil'}</Text>

                <Pressable onPress={elegirFoto} style={styles.fotoContenedor}>
                    <AvatarPerfil uri={foto} nombre={nombre.trim()} apellido={apellido.trim()} size={96} />
                    <Text style={styles.fotoTexto}>{foto ? 'Cambiar foto' : 'Elegir foto'}</Text>
                </Pressable>

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
                <Text style={styles.ayuda}>
                    {documentoBloqueado
                        ? 'El documento no se puede cambiar después de registrarlo.'
                        : 'Revísalo bien: después no podrás cambiarlo.'}
                </Text>
                <TextInput
                    style={[styles.input, documentoBloqueado && styles.inputBloqueado]}
                    value={documento}
                    onChangeText={setDocumento}
                    placeholder="Ej: 1020304050"
                    keyboardType="number-pad"
                    editable={!documentoBloqueado}
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
    const { guardarPerfil } = usePerfil();
    const { reservas, borrarReservas } = useReserva();
    const [entradas, setEntradas] = useState([]);

    // Cada vez que cambia el perfil o las reservas, vuelvo a leer lo que hay guardado
    useEffect(() => {
        const leer = async () => {
            setEntradas(await getAllRaw());
        };
        leer();
    }, [perfil, reservas]);

    function confirmarBorrado() {
        Alert.alert(
            'Borrar mis datos',
            '¿Seguro que quieres borrar tu perfil y tus reservas? No se puede deshacer.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Borrar',
                    style: 'destructive',
                    onPress: async () => {
                        // Borro solo las dos llaves de mi app, y luego vacío lo que la app tiene en memoria
                        await removeData(STORAGE_KEYS.PERFIL);
                        await removeData(STORAGE_KEYS.RESERVAS);
                        guardarPerfil(null);
                        borrarReservas();
                    },
                },
            ]
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.vista}>
            <View style={styles.fotoVista}>
                <AvatarPerfil uri={perfil.foto} nombre={perfil.nombre} apellido={perfil.apellido} size={96} />
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
            <Pressable
                onPress={confirmarBorrado}
                style={({ pressed }) => [styles.botonBorrar, pressed && { opacity: 0.7 }]}
            >
                <Ionicons name="trash-outline" size={16} color={colors.peligro} />
                <Text style={styles.botonBorrarTexto}>Borrar mis datos</Text>
            </Pressable>
            {__DEV__ && <DebugBox entradas={entradas} />}
        </ScrollView>
    );
}

export default function PerfilScreen() {
    const { cargando, perfil } = usePerfil();
    const [editando, setEditando] = useState(false);

    if (cargando) {
        return (
            <View style={styles.centro}>
                <ActivityIndicator color={colors.primario} />
                <Text style={[styles.filaTitulo, { marginTop: spacing.sm }]}>Cargando...</Text>
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
    inputBloqueado: { backgroundColor: colors.borde, color: colors.textoSuave },
    ayuda: { fontSize: 12, color: colors.textoSuave, marginBottom: spacing.xs },
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
    botonBorrar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.peligro,
        paddingVertical: spacing.md,
        marginTop: spacing.md,
    },
    botonBorrarTexto: { color: colors.peligro, fontSize: 15, fontWeight: '700' },
    vista: { padding: spacing.lg, alignItems: 'stretch', backgroundColor: colors.fondo, flexGrow: 1 },
    fotoVista: { alignSelf: 'center' },
    fotoContenedor: { alignItems: 'center', marginBottom: spacing.xl },
    fotoTexto: { fontSize: 13, fontWeight: '600', color: colors.primario, marginTop: spacing.sm },
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
