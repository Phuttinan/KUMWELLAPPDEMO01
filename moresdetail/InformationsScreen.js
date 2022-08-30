import * as React from 'react';
import { Button, View, Text,StyleSheet, ScrollView } from 'react-native';


const InformationScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.warp}>
      <View style={styles.information}>
        <Text style={styles.title}>วิธีการใช้งาน</Text>
      </View>
      <View style={styles.details1}>
        <Text style={styles.textheader}>1. เปิด/ปิด ระบบแจ้งเตือน</Text>
        <Text style={styles.textdetails}>
          - เลือกเปิด ไม่สามารถเลือกการใช้งานปิดระบบแจ้งเตือน 15 นาที, 30 นาที, 60 นาที เป็นต้น
        </Text>
        <Text style={styles.textdetails}>
          - เลือกเปิด สามารถเลือกการใช้งานปิดระบบแจ้งเตือน 15 นาที, 30 นาที, 60 นาที เป็นต้น
        </Text>
      </View>
      <View style={styles.details2}>
        <Text style={styles.textheader}>2. All เลือกเปิด (on) สามารถแสดงผลข้อมูลฟ้าผ่า Clound to clound, clound to Ground</Text>
        <Text style={styles.textdetails}>
           - Cound to Cound เลือกเปิด สามารถแสดงผลข้อมูลเฉพาะฟ้าผ่า Clound to Clound
        </Text>
        <Text style={styles.textdetails}>
           - Cound to Ground เลือกเปิด สามารถแสดงผลข้อมูลเฉพาะฟ้าผ่า Clound to Ground
        </Text>
      </View>
      <View style={styles.details3}>
        <Text style={styles.textheader34}>3. ปิดระบบแจ้งเตือน 15 นาที, 30 นาที, 60 นาที จะปิดการเตือนตามระยะเวลาที่เลือก</Text>
      </View>
      <View style={styles.details4}>
        <Text style={styles.textheader34}>4. เปิด/ปิด แจ้งเตือนเสียง</Text>
      </View>
      <View style={styles.spach}>
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
    information: {
      paddingTop: 10,
      marginBottom: 15,
      alignItems: 'center',
     
    },
    title: {
      fontSize: 20,
      fontWeight: '500',
    },
    details1: {
      marginBottom: 10,
      padding: 15,
      paddingLeft: 30,
      backgroundColor: '#fff',
      borderRadius: 30,
    },
    details2: {
      marginBottom: 10,
      padding: 15,
      paddingLeft: 30,
      backgroundColor: '#fff',
      borderRadius: 30,
    },
    details3: {
      marginBottom: 10,
      padding: 15,
      paddingLeft: 30,
      backgroundColor: '#fff',
      borderRadius: 30,
    },
    details4: {
      marginBottom: 10,
      padding: 15,
      paddingLeft: 30,
      backgroundColor: '#fff',
      borderRadius: 30,
    },
    textheader: {
      fontSize: 18,
      fontWeight: '300',
      marginBottom: 10,
      borderBottomColor: '#D3D3D3',
      borderBottomWidth: 1,
      paddingBottom: 10,
    },
    textheader34: {
      fontSize: 18,
      fontWeight: '300',
      marginBottom: 10,
      paddingBottom: 10,
    },
    textdetails: {
      paddingLeft: 25,
      fontSize: 16,
      fontWeight: '300',
      marginBottom: 10,
    },
    spach:{
      height: 200,
      
    }
    
  })

export default InformationScreen;