import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Dimensions,ScrollView} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const MoresScreen = ({navigation}) => {

    return(
        <ScrollView style={styles.container} >
            <View style={styles.information}>
                <Text style={styles.textinformation} onPress={() => navigation.navigate('Informations')}>
                    <MaterialCommunityIcons name='information-outline' size={25} />    Informations
                </Text>
            </View>
            <View style={styles.setting}>
                <Text style={styles.textsetting} onPress={() => navigation.navigate('Setting')}>
                    <MaterialCommunityIcons name='cog-outline' size={25} />    Setting
                </Text>
            </View>
            <View style={styles.contact}>
                <Text style={styles.textcontact} onPress={() => navigation.navigate('Contact')}>
                    <MaterialCommunityIcons name='contacts-outline' size={25} />    Contact
                </Text>
            </View>
            <View style={styles.splace}>
          <Text></Text>
        </View>
        </ScrollView>
    )
  }

  const styles = StyleSheet.create({
    container: {
       flex: 1,
       paddingTop: 10,
       paddingBottom: 10,
       alignSelf: 'stretch',
       
    },
    information:{
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        marginBottom: 15,
        paddingLeft: 20,
        flexWrap: 'wrap',
    },
    textinformation: {
        fontSize: 20,
        fontWeight: '300',
          
    },
    setting:{
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        marginBottom: 15,
        paddingLeft: 20,
        flexWrap: 'wrap',
    },
    textsetting: {
        fontSize: 20,
        fontWeight: '300',
          
    },
    contact:{
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        marginBottom: 15,
        paddingLeft: 20,
        flexWrap: 'wrap',
    },
    textcontact: {
        fontSize: 20,
        fontWeight: '300',
          
    },
    splace: {
        height: 500,
      },
})

export default MoresScreen;
