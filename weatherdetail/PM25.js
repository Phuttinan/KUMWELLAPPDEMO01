import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import PMICON from './PMICON';

//http://api.openweathermap.org/data/2.5/air_pollution?lat=13.7527296&lon=100.5682688&appid=9811bbec32fc5d94d09f486c06d15a35

const PM25 = () => {
    const [isLoading, setLoading] = useState(true);
    const [data,setData] = useState([null]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [location, setLocation] = useState(null);

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
            
            fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=9811bbec32fc5d94d09f486c06d15a35`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
          })();
    }, [])          
    return(
        <View style={styles.wrap} >
        {isLoading 
        ? <View style={styles.PM25}>
            <View style={styles.PM25details}>
                <PMICON />
                <Text style={styles.pm25text}> 225</Text>
                <Text style={styles.pm25text2}>   ไมครอน</Text>
            </View>
        </View>
        : (
            <View style={styles.PM25}>
                <View style={styles.PM25details}>
                    <PMICON />
                    <Text style={styles.pm25text}> {Math.round(data.list[0].components.pm2_5)}</Text>
                    <Text style={styles.pm25text2}>   ไมครอน</Text>
                </View> 
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
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 30,
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 3,
    },
    PM25details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        

    },
    pm25text: {
        fontSize: 20,
        fontWeight: '10',
    },
    pm25text2: {
        fontSize: 15,
        fontWeight: '10',
    }
});
export default PM25;