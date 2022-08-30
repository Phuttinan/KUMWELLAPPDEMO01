import React from 'react';
import {StyleSheet, Text, View, ScrollView,DevSettings,RefreshControl} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//screenweatherdetail
import MoreWeather from '../weatherdetail/MoreWeather';
import WeatherShow from '../weatherdetail/WeatherShow';
import Fetch from '../TextSlide/CallTextSlide';
import PM25 from '../weatherdetail/PM25';
import Sun from '../weatherdetail/Sun';
import Rain from '../weatherdetail/rain';
import RainValu from '../weatherdetail/RainValu';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const WeatherScreen = ({navigation}) => {

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(DevSettings.reload()));
    }, []);

    return(
        <View style={styles.weatherScreen}>
            <Fetch />
            <ScrollView style={styles.container} 
            refreshControl={
                <RefreshControl 
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />    
              }
            >
                <View style={styles.lightning}>
                    <Text style={styles.title}
                    onPress={() => navigation.navigate('LightningAlarm')}
                    > <MaterialCommunityIcons name='lightning-bolt' size={30} /> Lightning Alarm!</Text>
                </View>
                <View>
                    <MoreWeather />
                </View>
                <View>
                    <WeatherShow />
                </View> 
                <View>
                    <Rain />
                </View>
                <View>
                    <PM25 />
                </View>
                
                <View>
                    <Text style={{height: 300}}></Text>
                </View>
                
            </ScrollView>
        </View>
        
    )
  }

  const styles = StyleSheet.create({
    weatherScreen:{
        flex: 1,
        padding: 10,
        alignSelf: 'stretch',
    },
    container: {
       flex: 1,
       
    },
    lightning:{
        height: 100,
        backgroundColor: '#ED1B24',
        borderRadius: 20,
        justifyContent: 'center',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 3,
        marginBottom: 15,
        paddingLeft: 20,
        flexWrap: 'wrap',
    },
    title: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: '300',
          
    }
})

export default WeatherScreen;
