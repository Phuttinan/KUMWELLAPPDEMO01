import * as React from 'react';
import { View, Text,StyleSheet,ScrollView } from 'react-native';

//DetailsSetting
import Set1 from './SettingDetail/1';
import Set2 from './SettingDetail/2';
import Set3 from './SettingDetail/3';
import Set4 from './SettingDetail/4';
import Set5 from './SettingDetail/5';
import Set6 from './SettingDetail/6';
import Set7 from './SettingDetail/7';
import Set8 from './SettingDetail/8';

const SettingScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.warp}>
        <View style={styles.setting}>
            <Text style={styles.title}>การตั้งค่า</Text>
        </View>
        <View style={styles.setting1}>
            <Set1 />
            <Set2 />
            <Set3 />
            <Set4 />
        </View>
        <View style={styles.setting2}>
            <Set5 />
            <Set6 />
            <Set7 />
            <Set8 />
        </View>
        <View style={styles.splace}>
          <Text></Text>
        </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    warp: {
        flex: 1,
        alignSelf: 'stretch',
        paddingTop: 10,
        paddingBottom: 10,
    },
    setting: {
        paddingTop: 10,
        marginBottom: 15,
        alignItems: 'center',

    },
    setting1: {
        backgroundColor: '#fff',
        paddingTop: 10,
        borderRadius: 30,
        marginBottom: 15,
      },
      setting2: {
        backgroundColor: '#fff',
        paddingTop: 10,
        borderRadius: 30,
        marginBottom: 15,
      },
    title: {
        fontSize: 20,
        fontWeight: '500',
    },
    splace: {
      height: 100,
    },

  })

export default SettingScreen;