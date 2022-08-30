import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, View,DevSettings,Image} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

import Latitude from './Latitude';
import Longitude from './Longitude';

const data_default = {"coords": {"accuracy": 12.904999732971191, "altitude": -21.5, "altitudeAccuracy": 1, "heading": 0, "latitude": 13.7030669, "longitude": 100.527521, "speed": 0}, "mocked": false, "timestamp": 1661354333565};

const MoreWeather = () => {
    const [location, setLocation] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [data,setData] = useState([null]);
    const [dt,setDt] = useState(new Date().toLocaleString());

    let date = String(new window.Date());
    date = date.slice(3, 21);  

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
            setLocation(location); 
            
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=9811bbec32fc5d94d09f486c06d15a35`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
          })();
    }, []) 


    useEffect(() => {
        let secTimer = setInterval(() => {
        setDt(new Date().toLocaleString())
        }, 1000)

        return () => clearInterval(secTimer);
    }, []);
    
    return(
        <View style={styles.wrap} >
        {isLoading 
            ? <View style={styles.weather}>
                <Text style={styles.temp}>
                    <Image
                        source={{ uri: 'http://openweathermap.org/img/wn/02d@2x.png' }}
                        style={{ width: 60, height: 60 }}
                    /> 
                    32°
                </Text>
                <Text style={styles.name}><Ionicons name='ios-location' size={30}/> Krungthep 
                    <Text style={styles.region}>  /TH</Text>
                </Text>
                <Text style={styles.main}> 35° / 26° </Text>
                <Text style={styles.date}> {date}</Text> 
            </View> : (
            <View style={styles.weather}>
                <Text style={styles.temp}>
                    <Image
                        source={{ uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` }}
                        style={{ width: 60, height: 60 }}
                    /> 
                    {Math.round(data.main.temp - 273)}°</Text>
                <Text style={styles.name}><Ionicons name='ios-location' size={30}/> {data.name} 
                    <Text style={styles.region}>  /{data.sys.country}</Text>
                </Text>
                <Text style={styles.main}> {Math.round(data.main.temp_max - 273)}° / {Math.round(data.main.temp_min - 273)}° </Text>
                <Text style={styles.date}> {date}</Text> 
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
    weather:{

        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 30,
        borderRadius: 30,
        alignItems: 'center',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 3, 
        flexWrap: 'nowrap',
    },
    temp: {
        fontSize: 50,
        fontWeight: '200', 
        marginBottom: 5,    
    },
    name: {
        fontSize: 20,
        fontWeight: '200',
        marginBottom: 10,
    },
    region: {
        fontSize: 15,
        fontWeight: '100',
        
    },
    date: {
        fontSize: 15,
        fontWeight: '100',
        paddingBottom: 10,

    },
    main: {
        fontSize: 15,
        fontWeight: '100',
        
    }
})

export default MoreWeather;