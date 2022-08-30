import React, { useState, createContext, useEffect } from 'react'
import * as Location from 'expo-location';

export const LocationsContext = createContext()

const data_default = {"coords": {"accuracy": 12.904999732971191, "altitude": -21.5, "altitudeAccuracy": 1, "heading": 0, "latitude": 13.7030669, "longitude": 100.527521, "speed": 0}, "mocked": false, "timestamp": 1661354333565};

function LocationsContextProvider(props) {
    const [location, setLocation] = useState(data_default);
    const [loading, setLoading] = useState([]);
    const value = { location, loading };

    const getLoca = async () => {
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
            }

    useEffect(() => { //
        getLoca()
        let secTimer = setInterval(() => {
            getLoca()
            }, 5000)
            return () => clearInterval(secTimer);
        }, []);
    
    /*function permissionLocation() {
        let { status } = Location.requestForegroundPermissionsAsync();
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
    }

    function getCurrentLocation() {
        let location = Location.getCurrentPositionAsync({});
        setLocation(location);
        setLoading(false);
    }*/

    return(
        <LocationsContext.Provider value={value}>
            {props.children}
        </LocationsContext.Provider>
    )

}

export default LocationsContextProvider;