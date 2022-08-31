import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

//screen
import WeatherScreen from '../screens/WeatherScreen';
import LightningScreen from '../screens/LightningScreen';
import KumwellNewsScreen from '../screens/KumwellNewsScreen';
import MoresScreen from '../screens/MoresScreen';

//screendetail
import InformationScreen from '../moresdetail/InformationsScreen';
import SettingScreen from '../moresdetail/SettingScreen';
import ContactScreen from '../moresdetail/ContactScreen';

//screenweatherdetail
import WeatherShow from '../weatherdetail/WeatherShow';
import LightningAlarm from '../weatherdetail/LightningAlarm';

function LogoTitle() {
    return (
      <Image
        style={{ width: 170, height: 40 }}
        source={require('../image/HeaderNavigatorNew.png')}
      />
    );
  }

const WeatherStack = createNativeStackNavigator();

function WeatherStackScreen() {
  return (
    <WeatherStack.Navigator >
      <WeatherStack.Screen name="WeatherScreen" component={WeatherScreen} 
      options={{
        headerTitle: (props) => <LogoTitle {...props} />}}
      />
      <WeatherStack.Screen name="LightningAlarm" component={LightningAlarm} />
    </WeatherStack.Navigator>
  );
}

const LightningStack = createNativeStackNavigator();

function LightningStackScreen() {
    return (
      <LightningStack.Navigator >
        <LightningStack.Screen name="LightningScreen" component={LightningScreen} 
        options={{
          headerTitle: (props) => <LogoTitle {...props} />}}
        />
        <WeatherStack.Screen name="LightningAlarm" component={LightningAlarm} />
      </LightningStack.Navigator>
    );
  }

const KumwellNewsStack = createNativeStackNavigator();

function KumwellNewsStackScreen() {
    return (
    <KumwellNewsStack.Navigator >
        <KumwellNewsStack.Screen name="KumwellNewsScreen" component={KumwellNewsScreen} 
          options={{
            headerTitle: (props) => <LogoTitle {...props} />}}
        />
        <KumwellNewsStack.Screen name="LightningAlarm" component={LightningAlarm} />
    </KumwellNewsStack.Navigator>
    );
}  

const MoresStack = createNativeStackNavigator();

function MoresStackScreen() {
    return (
    <MoresStack.Navigator >
        <MoresStack.Screen name="MoresScreen" component={MoresScreen} 
          options={{
            headerTitle: (props) => <LogoTitle {...props} />}}
        />
        <MoresStack.Screen name="LightningAlarm" component={LightningAlarm} />
        <MoresStack.Screen name="Informations" component={InformationScreen} />
        <MoresStack.Screen name="Setting" component={SettingScreen} />
        <MoresStack.Screen name="Contact" component={ContactScreen} />
    </MoresStack.Navigator>
    );
}  


  
const Tab = createBottomTabNavigator();

const  AppNavigator = () => {
    return (
        <Tab.Navigator
          screenOptions={{ headerShown: false, 
          tabBarActiveTintColor: '#ED1B24',
          tabBarInactiveTintColor: '#949599',
        }}
        >
          <Tab.Screen name="Weather" component={WeatherStackScreen}  
          options={{
            tabBarIcon: () => (  
                <Ionicons name="ios-cloud-circle" size={25} />    
            )
        }}
          />
          <Tab.Screen name="Lightning Alarm" component={LightningStackScreen} 
            options={{
                tabBarIcon: () => (  
                    <Ionicons name="flash" size={25} />    
                ),
                tabBarActiveTintColor: '#ED1B24' ,
                tabBarInactiveTintColor: '#949599',
            }}
          />
          <Tab.Screen name="Kumwell News" component={KumwellNewsStackScreen} 
            options={{
                tabBarIcon: () => (  
                    <Ionicons name="md-checkbox" size={25} />    
                ),
                tabBarActiveTintColor: '#ED1B24' ,
                tabBarInactiveTintColor: '#949599',
            }}
          />
          <Tab.Screen name="Mores" component={MoresStackScreen} 
            options={{
                tabBarIcon: () => (  
                    <Ionicons name="ios-list" size={25} />    
                ),
                tabBarActiveTintColor: '#ED1B24' ,
                tabBarInactiveTintColor: '#949599',
            }}
          />
        </Tab.Navigator>
    );
}
export default AppNavigator;