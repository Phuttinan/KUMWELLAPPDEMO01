import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, View,DevSettings,Image, ListViewBase} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

//screen
import Humidity from './humidity';

//https://api.openweathermap.org/data/2.5/forecast?lat=13.7527296&lon=100.5682688&appid=7029932189870dc55f82f2589f285b4d

const Rain = () => {
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
            
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=d192eba2efb364a2b3335c9cfb003726`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
          
          })();
          
        let secTimer = setInterval(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              alert('Permission to access location was denied');
              return;
            }
            let location = await Location.getCurrentPositionAsync({}); 
            setLatitude(location.coords.latitude)
            setLongitude(location.coords.longitude); 
            
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=d192eba2efb364a2b3335c9cfb003726`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
          
          })();
        }, 7200000)
      return () => clearInterval(secTimer);
    }, [])          
    return(
        <View style={styles.wrap} >
        {isLoading 
        ? <View style={styles.rain}>
           <View style={styles.humid} >
                    <Image
                        source={require('../image/weather/Humidity.png')}
                        style={{ width: 50, height: 50 }}
                            
                    />
                    <Text style={styles.humiditydetails}> ความชื้นสัมพัทธ์ </Text> 
                    <Text style={styles.humiditydetails}> 63 %</Text>
                </View>
                <View style={styles.rainy}>
                    <Image
                            source={require('../image/weather/Rainper.png')}
                            style={{ width: 50, height: 50 }}
                            
                    />
                    <Text style={styles.raindetails}> เปอร์เซ็นต์ฝนตก</Text> 
                    <Text style={styles.raindetails}> 34 %</Text>  
                </View>
                <View style={styles.rainvalu}>
                    <Image
                            source={require('../image/weather/Nice_today.png')}
                            style={{ width: 50, height: 50 }}            
                    />
                    <Text style={styles.rainvaludetails}> ปริมาณน้ำฝน </Text> 
                    <Text style={styles.rainvaludetails}> 3 ชม. : 4 มม. </Text>
                </View>
        </View> 
        : (
           <View style={styles.rain}>
                <View style={styles.humid} >
                    <Image
                        source={require('../image/weather/Humidity.png')}
                        style={{ width: 50, height: 50 }}
                            
                    />
                    <Text style={styles.humiditydetails}> ความชื้นสัมพัทธ์ </Text> 
                    <Text style={styles.humiditydetails}> {Math.round(data.list[0].main.humidity)} %</Text>
                </View>
                <View style={styles.rainy}>
                    <Image
                            source={require('../image/weather/Rainper.png')}
                            style={{ width: 50, height: 50 }}
                            
                    />
                    <Text style={styles.raindetails}> เปอร์เซ็นต์ฝนตก</Text> 
                    <Text style={styles.raindetails}> {Math.round(data.list[0].pop * 100)} %</Text>  
                </View>
                <View style={styles.rainvalu}>
                    <Image
                            source={require('../image/weather/Nice_today.png')}
                            style={{ width: 50, height: 50 }}            
                    />
                    <Text style={styles.rainvaludetails}> ปริมาณน้ำฝน </Text> 
                    <Text style={styles.rainvaludetails}> 3 ชม. : 4 มม. </Text>
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
    rain: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 30,
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 3, 
        flexWrap: 'wrap'
    },
    humid: {
        flexGrow: 1,
        borderRightColor: '#D3D3D3',
        borderRightWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 5,
    },
    rainy: {
        flexGrow: 1,
        borderRightColor: '#D3D3D3',
        borderRightWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 5,
        paddingLeft: 5,

    },
    rainvalu: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5,
        
    },
    humiditydetails: {
        fontSize: 15,
        fontWeight: '10',
        marginTop: 5,
    },
    raindetails: {
        fontSize: 15,
        fontWeight: '10',
        marginTop: 5,

    },
    rainvaludetails: {
        fontSize: 15,
        fontWeight: '10',
        marginTop: 5,
    },


});


export default Rain;