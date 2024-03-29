import React, { useState, useEffect, useContext } from 'react';
import { Platform, Text, View, StyleSheet, ActivityIndicator, Dimensions, Image, Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Circle } from 'react-native-maps';
import LightningMarker from '../LightningCall/MarkerLightning';
import LightningCalculate from '../LightningCall/CalculateLightning';
import { LocationsContext } from '../contexts/LocationsContext';

const LocationMap = () => {
    const { location, loading } = useContext(LocationsContext);
    //const [location, setLocation] = useState(null);
    //const [errorMsg, setErrorMsg] = useState(null);
    //const [loading, setLoading] = useState([]);
    let [data, setData] = useState([]);
    let host = (Platform.OS == 'android') ? '103.28.240.85' : 'localhost'

    useEffect(() => { 
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

    let newLat = location.coords.latitude + 0.045
    let newLat1 = location.coords.latitude + 0.090

    return (
        <View style={styles.containerMap}>
            {loading ? <ActivityIndicator size="large" /> : (
                <View >
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
                        <Marker 
                          coordinate={{latitude: newLat, 
                          longitude: location.coords.longitude}}
                          icon={require('../assets/51.png')}>
                        </Marker>
                        <Marker coordinate={{latitude: newLat1, 
                          longitude: location.coords.longitude}}
                          icon={require('../assets/101.png')}>
                        </Marker>
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

            <View style={styles.box}>
              <View style={styles.boxdetail}>
                <Text style={styles.boxtitle}> ห้วงเวลาเกิดฟ้าผ่า </Text>
                <Text style={styles.boxtext1}>
                <Image 
                    source={require('../image/lightning_icon/K_ICON_CR.png') } 
                    style={{ width: 20, height: 20 }}
                  /> {'> 0-5 นาที'}
                </Text>
            
            <Text style={styles.boxtext2}>
            <Image 
              source={require('../image/lightning_icon/K_ICON_CO.png') } 
              style={{ width: 20, height: 20 }} 
            /> {'> 5-10 นาที'} 
            </Text>

            <Text style={styles.boxtext3}>
            <Image 
              source={require('../image/lightning_icon/K_ICON_CY.png') } 
              style={{ width: 20, height: 20 }} 
            /> {'> 10-15 นาที'}
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
  box: {
    position: 'absolute',
    bottom: 30,
    left: 5,
  },
  boxdetail: {
    backgroundColor: '#fff',
    opacity: 0.8,
    padding: 10,
    borderRadius: 10,
  },
  boxtitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  boxtext1: {
    fontSize: 10,
  },
  boxtext2: {
    fontSize: 10,
  },
  boxtext3: {
    fontSize: 10,
  },
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
  }
})

export default LightningScreen;