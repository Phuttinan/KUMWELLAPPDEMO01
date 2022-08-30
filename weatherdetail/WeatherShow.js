import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, View,SafeAreaView,Image} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

import Uv from './Uv';
import WindDeg from './WinDeg';

//API
//http://api.weatherapi.com/v1/current.json?key=963ce7739c164d51abe144003222308&q=13.7563309,100.5017651

const WeatherShow = () => {
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
            
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=9811bbec32fc5d94d09f486c06d15a35`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
          
          })();
    }, [])

    return(
        <View style={styles.wrap}>
        {isLoading 
        ? <View style={styles.weathershow}>
            <View style={styles.uv}>
                    <Text>
                        <Uv />
                    </Text> 
                </View>
                <View style={styles.wind}>
                    <Image
                            source={require('../image/weather/Wind.png')}
                            style={{ width: 60, height: 60 }}
                            
                        />
                    <Text style={styles.title} > ความเร็วลมลม </Text>
                    <Text style={styles.title}> 9 กม./ชม. </Text> 
                </View>
                <View style={styles.windd}>
                    <Text style={styles.winddeg}>
                        <WindDeg />
                    </Text>           
                </View>            
            </View>
        : (
            <View style={styles.weathershow}>
                <View style={styles.uv}>
                    <Text>
                        <Uv />
                    </Text> 
                </View>
                <View style={styles.wind}>
                    <Image
                            source={require('../image/weather/Wind.png')}
                            style={{ width: 60, height: 60 }}
                            
                        />
                    <Text style={styles.title} > ความเร็วลมลม </Text>
                    <Text style={styles.title}> {Math.round(data.wind.speed)} กม./ชม. </Text> 
                </View>
                <View style={styles.windd}>
                    <Text style={styles.winddeg}>
                        <WindDeg />
                    </Text>           
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
    weathershow: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 30,
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 3, 

    },
    uv: {
        flexGrow: 1,
        borderRightColor: '#D3D3D3',
        borderRightWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    wind: {
        flexGrow: 1,
        borderRightColor: '#D3D3D3',
        borderRightWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    windd: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    winddeg: {
        marginTop: 5,
        paddingBottom: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: '10',
    },

})

export default WeatherShow;