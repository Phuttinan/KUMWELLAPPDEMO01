import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LocationsContextProvider from './contexts/LocationsContext';
import AppNavigator from './Navigation/AppNavigator';

const App = () => {
    return (
        <LocationsContextProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </LocationsContextProvider>   
    )
}

export default App;
