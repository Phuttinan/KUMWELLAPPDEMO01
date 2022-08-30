import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, View,DevSettings,Image} from 'react-native';
import * as Location from 'expo-location';

const Latitude = () => {
    const [location, setLocation] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              alert('Permission to access location was denied');
              return;
            }
            let location = await Location.getCurrentPositionAsync({}); 
            setLatitude(location.coords.latitude)
            setLongitude(location.coords.longitude);
            setLocation(location.coords);   
          })();
    }, []) 
    return (
        <View>
            <Text>{latitude}</Text>
        </View>
    )
}
export default Latitude;