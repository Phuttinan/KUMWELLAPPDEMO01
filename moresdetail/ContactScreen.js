import * as React from 'react';
import { ScrollView, View, Text,StyleSheet,Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const ContactScreen = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.warp}>
        <View style={styles.header}>
          <Image source={require('../image/new_logo_kml1.png')} style={styles.image}/>
        </View>
        <Text></Text>
        <View style={styles.detail1}>
          <Text style={styles.textdetail}> <MaterialCommunityIcons name="phone-classic" size={25}/>  029543455</Text>
          <Text></Text>
          <Text style={styles.textdetail}> <MaterialCommunityIcons name="calendar" size={25} />  วันทำการ จันทร์ - ศุกร์
          </Text>
          <Text></Text>
          <Text style={styles.textdetail}> <MaterialCommunityIcons name="clock" size={25} />  เวลา 08.00 - 18.00 น.
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.spacetext}></Text>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    warp: {
      flex: 1,
      alignSelf: 'stretch',
      padding: 20,
      alignItems: 'center',
      backgroundColor: '#fff'
    },
    image: {
      width: 300,
      height: 70,

    },
    header: {
      width: 350,
      height: 90,
      borderBottomColor: '#D3D3D3',
      borderBottomWidth: 1,
      paddingLeft: 10,
      paddingRight: 250,
      marginBottom: 15,
    },
    detail1: {
      alignSelf: 'stretch',
      borderBottomColor: '#D3D3D3',
      borderBottomWidth: 1,
      paddingBottom: 20,
 
    },
    textdetail: {
      fontSize: 20,
      fontWeight: '300',
      
    },
    space: {
      borderStartColor: '#fff',
      height: 400,
    },
  })

export default ContactScreen;