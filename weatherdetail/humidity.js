import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, View,SafeAreaView,Image} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const Humidity = () => {
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
        <View>
        {isLoading 
        ? <View style={styles.humidity}>
            <View style={styles.humiditydetail}>
                        <Image 
                            source={require('../image/weather/Humidity.png')}
                            style={{ width: 60, height: 60 }}
                            
                        />
                    <Text style={styles.title} > ความชื้นสัมพัทธ์ : 65 % </Text>   
                </View> 
        </View>
        : (
            <View style={styles.humidity}>
                <View style={styles.humiditydetail}>
                        <Image 
                            source={require('../image/weather/Humidity.png')}
                            style={{ width: 60, height: 60 }}
                            
                        />
                    <Text style={styles.title} > ความชื้นสัมพัทธ์ : {Math.round(data.main.humidity)} % </Text>
                    
                </View>            
            </View>
        )}
        </View>
    )
  }
  const styles = StyleSheet.create({
    humidity: {
        flex: 1,
        alignSelf: 'stretch',
        marginTop: 5,
        padding: 5,
        

    },
    humiditydetail: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center', 
        justifyContent: 'center', 
        
   

        
    },
    title: {
        fontSize: 15,
        fontWeight: '10',
        marginTop: 5,
        marginBottom: 10,

    },
});

export default Humidity;