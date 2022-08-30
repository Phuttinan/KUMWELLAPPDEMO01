import React, { useContext} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Dimensions,ScrollView, ActivityIndicator} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { LocationsContext } from '../contexts/LocationsContext';
import LightningCalculate from '../LightningCall/CalculateLightning';

const KumwellNewsScreen = ({navigation}) => {
  const { location, loading } = useContext(LocationsContext)

  //const getLoca = new getLocations()
  // return (
    
  //   <View style={styles.container}>
  //     <Text>Locations = {location.coords.latitude},{location.coords.longitude} </Text>
  //   </View>
  // );

    return (
        <SafeAreaView style={{ flex: 1 }}>
          <WebView 
            source={{ uri: 'https://www.kumwell.com/Home.aspx' }} 
          />
        </SafeAreaView>
    )
  }

  
export default KumwellNewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});