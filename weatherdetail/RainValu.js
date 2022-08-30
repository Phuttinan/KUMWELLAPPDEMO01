import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, View,DevSettings,Image, ListViewBase} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const RainValu = () => {
    const [isLoading, setLoading] = useState(true);
    const [data,setData] = useState([null]);

    useEffect(() => {
        fetch('https://api.openweathermap.org/data/2.5/forecast?lat=13.7527296&lon=100.5682688&appid=7029932189870dc55f82f2589f285b4d')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, [])
    if (data  === null) {
        setData(json)
    }
    return(
        <View style={styles.wrap} >
        {isLoading ? <Text style={{ alignItems: 'center', justifyContent: 'center' }}>Loading...</Text> : (
            <View style={styles.rainvalu}>
                <Text style={styles.rainvaluicon}> <MaterialCommunityIcons name='water' size={45} /> </Text>
                <Text style={styles.rainvaludetails}> ปริมาณน้ำฝนในช่วง 3 ชั่วโมงที่ผ่านมา  </Text> 
                <Text style={styles.rainvaludetails}> 4 mm </Text> 
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
    rainvalu: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 30,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 3, 
        flexWrap: 'nowrap',

        

    },
    rainvaludetails: {
        fontSize: 15,


    },
    rainvaluicon: {
        marginBottom: 15
    }
});
export default RainValu;