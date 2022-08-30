import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Dimensions} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const LightningAlarm = () => {

    return(
        <View style={styles.container} >
            <View style={styles.lightning}>
                <Text style={styles.title}>Lightning Alarm</Text>
            </View>
        </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
       flex: 1,
       marginTop: 5,
       padding: 10,
       alignItems: 'center',
       justifyContent: 'center',
       
    },
    lightning:{

    },
    title: {
        fontSize: 30,
        fontWeight: '300',
    }
})

export default LightningAlarm;