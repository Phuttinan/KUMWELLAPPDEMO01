import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, ActivityIndicator, Dimensions, Image, Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Circle } from 'react-native-maps';
import LightningMarker from '../LightningCall/MarkerLightning';
import LightningCalculate from '../LightningCall/CalculateLightning';

const LocationMap = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState([]);
    let [data, setData] = useState([])
    let host = (Platform.OS == 'android') ? '58.97.57.113' : 'localhost'

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission to access location was denied',
            'go to setting',
            [
              {text: 'setting', onPress: () => {Linking.openSettings()}},
              {text: 'close', onPress: () => {}}
            ]
          );
          return;
        }
        
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setLoading(false);
  
      })();
    }, []);

    useEffect(() => { //
      fetch(`http://${host}/LLSApp/jgetlast1hr.php`)
            .then(response => response.json())
            .then(result => setData(result))
            .catch(err => Alert.alert(err));
      let secTimer = setInterval(() => {
        fetch(`http://${host}/LLSApp/jgetlast1hr.php`)
            .then(response => response.json())
            .then(result => setData(result))
            .catch(err => Alert.alert(err));
      }, 30000)
      return () => clearInterval(secTimer);
    }, []);

    const lightningElement = data.map((dataLightnings, index) => {
      return <LightningMarker key={index} dataLightnings={dataLightnings} />;
    });

    const LightningCal = () => {
      return <LightningCalculate dataLightnings={data} />;
    };

    return (
        <View style={styles.containerMap}>
            {loading ? <ActivityIndicator size="large" /> : (
                <View>
                    <MapView 
                        style={styles.map} 
                        initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.25,
                        longitudeDelta: 0.25
                        }}
                        showsUserLocation={true}
                        followsUserLocation={false}
                        showsMyLocationButton={true}
                        zoomControlEnabled={true}
                        toolbarEnabled={false}
                        rotateEnabled={false}
                        >
                        {lightningElement}
                        
                        <Circle 
                        center={{ 
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude }}
                        radius={10000} 
                        strokeWidth={2}
                        strokeColor={'rgba(255, 0, 0, 0.5)'} 
                        fillColor={'rgba(255, 0, 0, 0.1)'}
                        />
                        <Circle
                        center={{ 
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude }} 
                        radius={5000} 
                        strokeWidth={2}
                        strokeColor={'rgba(255, 0, 0, 0.5)'}
                        fillColor={'rgba(255, 0, 0, 0.1)'}
                        />
                    </MapView>
                    <LightningCal/>
                </View>
            )}

            <View style={styles.legendContainer}>
              <View style={styles.legendContainer0}>
                <Text style={styles.legendText0}> ห้วงเวลาเกิดฟ้าผ่า </Text>
                <Text style={styles.legendText}> 
                  <Image 
                    source={require('../image/lightning_icon/K_ICON_CR.png') } 
                    style={styles.legend} 
                    resizeMode='contain' 
                  /> {'> 0-5 นาที'}
                </Text>
            
            <Text style={styles.legendText2}>
            <Image 
              source={require('../image/lightning_icon/K_ICON_CO.png') } 
              style={styles.legend} 
              resizeMode='contain' 
            /> 
            {'> 5-10 นาที'}
            </Text>

            <Text style={styles.legendText3}>
            <Image 
              source={require('../image/lightning_icon/K_ICON_CY.png') } 
              style={styles.legend} 
              resizeMode='contain' 
            /> 
            {'> 10-15 นาที'}
            </Text>
            </View>
            </View>
        </View>
      );
    }
  
const LightningScreen = ({navigation}) => {
    return(
        <LocationMap/>
    )
  }

const loca = {
  latitude : 13.8383084,
  longitude : 100.5496514
};

const styles = StyleSheet.create({
  legendTop: {
    position: 'absolute',
    flexDirection: 'row',
    resizeMode: 'cover',
    left: 10,
    height: 70,
    opacity: 0.85,
    top: 10,
    width: 180,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  legendTopSubText: {
    top: 25,
    height: 50,
    width: 150,
    left: 20,
    right: 0,
    fontWeight: "900",
  },
  legendTopImage: {
    top: 10,
    height: 45,
    width: 55,
},
  container: {
      flex: 1,
      marginTop: 5,
      padding: 10,
      alignSelf: 'stretch',
  },
  containerMap: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
        
  },
  map: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
  },
  markerImage: {
      width: 35,
      height: 35
  },
  legendContainer: {
      position: 'absolute',
      left: 10,
      bottom: 35,
      height: 110,
      width: 110,
      backgroundColor: "white",
      opacity: 0.9,
      borderRadius: 15

  },
  legendContainer0: {
    padding: 10,

    
},
  legend: {
      height: 23,
      width: 23,
      flexDirection: 'row',
      resizeMode: 'cover'
  },
  legendText0: {
    position: 'absolute', 
    fontSize: 10,
    left: 10,
    top: 10,
    fontWeight: "bold",
    flexDirection: 'row',
    resizeMode: 'cover',

},
  legendText: {
      position: 'absolute', 
      fontSize: 10,
      left: 20,
      top: 25,
      fontWeight: "bold",
      flexDirection: 'row',
      resizeMode: 'cover'
  },
  legendText2: {
      position: 'absolute', 
      fontSize: 10,
      left: 20,
      top: 45,
      fontWeight: "bold",
  },
  legendText3: {
      position: 'absolute', 
      fontSize: 10,
      left: 20,
      top: 65,
      fontWeight: "bold",
  },
  legendText4: {
      position: 'absolute', 
      fontSize: 10,
      left: 25,
      top: 72,
      fontWeight: "bold",
  },
  legendText5: {
    position: 'absolute', 
    fontSize: 10,
    left: 25,
    top: 95,
    fontWeight: "bold",
  },
  legendText6: {
    position: 'absolute', 
    fontSize: 10,
    left: 25,
    top: 120,
    fontWeight: "bold",
  }
})

export default LightningScreen;