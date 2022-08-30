import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, View,SafeAreaView} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const WeatherShow = () => {

  const [isLoading, setLoading] = useState(true);
  const [data,setData] = useState([]);
  const [dt,setDt] = useState(new Date().toLocaleString());

  let date = String(new window.Date());
  date = date.slice(3, 21);

  
  useEffect(() => {
      fetch('http://api.weatherapi.com/v1/current.json?key=6d18282f399c41eebe2144736220908&q=13.7563309,100.5017651')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [])
  
  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString())
    }, 1000)

    return () => clearInterval(secTimer);
  }, []);

    return(
        <View style={styles.wrap}>
        {isLoading ? <Text style={{ alignItems: 'center', justifyContent: 'center' }}>Loading...</Text> : (
            <View style={styles.wrap}>
                <View style={styles.uv}>
                    <MaterialCommunityIcons name='weather-sunny' size={30}/>
                    <Text style={styles.title} > ดัชนี UV </Text>
                    <Text style={styles.title} > {data.current.uv} </Text>
                </View>
                <View style={styles.wind}>
                    <MaterialCommunityIcons name='weather-windy' size={30}/>
                    <Text style={styles.title} > ลม </Text>
                    <Text style={styles.title}> {Math.round(data.current.wind_kph)} กม./ชม. </Text> 
                </View>
                <View style={styles.humidity}>
                    <MaterialCommunityIcons name='water' size={30}  />
                    <Text style={styles.title} > ความชื้น </Text>
                    <Text style={styles.title}> {data.current.humidity} % </Text>
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
        flexDirection: 'row',

    },
    uv: {
        height: 90,
        width: '30%',
        backgroundColor: '#fff',
        padding: 7,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 3,
    },
    wind: {
        height: 90,
        width: '30%',
        backgroundColor: '#fff',
        padding: 7,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 3,
    },
    humidity: {
        height: 90,
        width: '30%',
        backgroundColor: '#fff',
        padding: 7,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 3,
    },
    title: {
        fontSize: 15,
        fontWeight: '10',
    },

})

export default WeatherShow;