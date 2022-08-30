import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, View,DevSettings,Image, ListViewBase} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const Sun = () => {
    const [isLoading, setLoading] = useState(true);
    const [data,setData] = useState([]);

    useEffect(() => {

        fetch('https://api.openweathermap.org/data/2.5/weather?lat=13.7527296&lon=100.5682688&appid=d192eba2efb364a2b3335c9cfb003726')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
        
        let secTimer = setInterval(() => {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=13.7527296&lon=100.5682688&appid=d192eba2efb364a2b3335c9cfb003726')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
        }, 7200000)
      return () => clearInterval(secTimer);
    }, [])
    //console.log(data.sys.sunrise);
    return(
        <View style={styles.wrap} >
        {isLoading ? <Text style={{ alignItems: 'center', justifyContent: 'center' }}>Loading...</Text> : (
            <View style={styles.Sun}>
                <Text style={styles.sunrise}>{data}</Text>
                
            </View>
        )}
      </View>
    )
    
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        alignSelf: 'stretch',
        marginTop: 5,
        padding: 5,

    },
    PM25: {
        flex: 1,
        

    },
    pm25details: {

    }
});
export default Sun;