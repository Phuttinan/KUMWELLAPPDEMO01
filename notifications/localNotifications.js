import React, { useState, useEffect, useRef } from 'react';
import {Text, View, Button, StyleSheet, Image} from 'react-native';
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

Notifications.setNotificationChannelAsync('sound', {
  name: 'sound',
  importance: Notifications.AndroidImportance.HIGH,
  sound: 'newmessage.wav'
})

const Noti = () => { 
    Notifications.scheduleNotificationAsync({
    content: {
        title: "Lightning Warning!",
        body: "Hello this is a local notification!",
    },
    trigger: { seconds: 1 },
    })

//     return (
//     <View style={styles.container}>
//       <Text>Hi, I am notification.</Text>
//     </View>
//   )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default Noti;