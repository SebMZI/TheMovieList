import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('watchlist', jsonValue);
    
  } catch (e) {
    console.log("Error saving value", e);
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('watchlist');
    const parsed = jsonValue != null ? JSON.parse(jsonValue) : [];
    return Array.isArray(parsed) ? parsed : []; 
  } catch (e) {
    console.log("Error reading value", e);
    return [];
  }
};
