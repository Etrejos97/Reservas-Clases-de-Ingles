import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar: AsyncStorage solo guarda texto, por eso paso el valor a JSON antes de guardarlo.
// Devuelve true si se guardó y false si falló, para que quien la llame lo sepa
export const saveData = async (key, value) => {
    try {
        const json = JSON.stringify(value);
        await AsyncStorage.setItem(key, json);
        return true;
    } catch (error) {
        console.log('Error guardando:', error);
        return false;
    }
};

// Leer: si la clave no existe devuelve null, si existe convierte el texto JSON otra vez a objeto
export const getData = async (key) => {
    try {
        const json = await AsyncStorage.getItem(key);
        return json !== null ? JSON.parse(json) : null;
    } catch (error) {
        console.log('Error leyendo:', error);
        return null;
    }
};

// Eliminar UNA llave
export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        console.log('Error eliminando:', error);
        return false;
    }
};

// Borrar TODO el almacenamiento de la app
export const clearAll = async () => {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (error) {
        console.log('Error limpiando:', error);
        return false;
    }
};

// Ver TODO lo guardado tal cual, como texto: [['@llave', 'valor'], ...]
export const getAllRaw = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        return await AsyncStorage.multiGet(keys);
    } catch (error) {
        console.log('Error leyendo todo:', error);
        return [];
    }
};
