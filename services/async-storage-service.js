import { AsyncStorage } from 'react-native';

export default {
    setItem: async function setItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch(error) {
            console.log("Error while saving data to async storage.", error);
        }
    },

    getItem: async function getItem(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch(error) {
            console.log("Error while getting data from async storage.", error);
        }
    },

    removeItem: async function removeItem(key) {
        try {
            await AsyncStorage.removeItem(key);
        } catch(error) {
            console.log("Error while removing data from async storage.", error);
        }
    }
}