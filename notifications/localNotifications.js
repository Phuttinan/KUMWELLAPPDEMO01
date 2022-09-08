import React, { useState, useEffect, useRef } from 'react';
import {Text, View, Button, StyleSheet, Image} from 'react-native';
import * as Notifications from "expo-notifications"



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
        body: "There is lightning near your location⚡⚡⚡",
    },
    trigger: { seconds: 1 },
    })


//     return (
//     <View style={styles.container}>
//       <Text>Hi, I am notification.</Text>
//     </View>
//   )
}

export default Noti;