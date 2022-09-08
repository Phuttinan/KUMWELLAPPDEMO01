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
<<<<<<< HEAD
=======


//     return (
//     <View style={styles.container}>
//       <Text>Hi, I am notification.</Text>
//     </View>
//   )
>>>>>>> bd20574a92f9e3f2f622f44d2c7a59defd94d2b2
}

export default Noti;