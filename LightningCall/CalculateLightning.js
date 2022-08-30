import React, { useState, useEffect, useContext } from 'react';
import { getDistance } from 'geolib';
import { LocationsContext } from '../contexts/LocationsContext';
import { Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Noti from '../notifications/localNotifications';

const LightningCalculate = (props) => {

  const { location, loading } = useContext(LocationsContext);
  const { dataLightnings } = props;
  const [dist, setDist] = useState(0);

  // let tt = LightningWeather(dist);

  useEffect(() => {
    var item = [];
    for (let i = 0; i < dataLightnings.length; i++){
      let lat = parseFloat(dataLightnings[i].LAT)
      let lon = parseFloat(dataLightnings[i].LON)
      let dis = getDistance(
        { latitude: lat, longitude: lon },
        { latitude: location.coords.latitude, longitude: location.coords.longitude }
      );
      item.push(dis/1000)
    }
    setDist(parseInt(Math.min(...item)))
    console.log("Nearest lightning is", parseInt(Math.min(...item)), "kilometers.")
  },[])

  if (dist <= 5){
    return (
      <View style={styles.legendTopFive}>
        <Text style={styles.legendTopSubText}>ฟ้าผ่าในระยะ {dist} กม. 
        <Noti />
        </Text>
        
      </View>
    )
  }
  else if (dist <= 10) {
    return (
      <View style={styles.legendTopTen}>
        <Text style={styles.legendTopSubText}>ฟ้าผ่าในระยะ {dist} กม.
        <Noti />
        </Text>
    </View>
      
    )
  }
  else{
    return (
      <View style={styles.legendTop}>
        <Text style={styles.legendTopSubText}>ฟ้าผ่าในระยะ {dist} กม.
        </Text>
    </View>
    )
  }
}

  // return (
  //   <View style={styles.legendTop}>
  //   {dist > 1000 ? 
  //     (<View>
  //       <Noti/>
  //       <Text style={styles.legendTopSubText}>ฟ้าผ่าในระยะ {dist} กม.</Text>
  //     </View>) :
  //     (<Text style={styles.legendTopSubText}>ฟ้าผ่าในระยะ {dist} กม.</Text>)}
  //   </View>
   
  // )
//}

// export const LightningWeather = (valueMin) => {
//   if (valueMin <= 5){
//     return (
//       <View style={styles.lightningFive}>
//         <Text style={styles.title}
//               onPress={() => navigation.navigate('LightningAlarm')}
//         > 
//           <MaterialCommunityIcons 
//             name='lightning-bolt' 
//           size={30} />มีฟ้าผ่าในระยะ {valueMin} กม.
//         </Text>
//       </View>
//     )
//   }
//   else if (valueMin <= 10) {
//     return (
//       <View style={styles.lightningTen}>
//           <Text style={styles.title}
//                 onPress={() => navigation.navigate('LightningAlarm')}
//           > 
//             <MaterialCommunityIcons 
//               name='lightning-bolt' 
//             size={30} />มีฟ้าผ่าในระยะ {valueMin} กม.
//           </Text>
//       </View>
//     )
//   }
//   else{
//     return (
//       <View style={styles.lightning}>
//           <Text style={styles.title}
//                 onPress={() => navigation.navigate('LightningAlarm')}
//           > 
//             <MaterialCommunityIcons 
//               name='lightning-bolt' 
//             size={30} />มีฟ้าผ่าในระยะ {valueMin} กม.
//           </Text>
//       </View>
//     )
//   }
// }
export default LightningCalculate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendTopFive: {
    position: 'absolute',
    flexDirection: 'row',
    resizeMode: 'cover',
    left: 10,
    height: 50,
    top: 10,
    width: 200,
    borderRadius: 10,
    backgroundColor: '#8FBC8F',
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendTopTen: {
    position: 'absolute',
    flexDirection: 'row',
    resizeMode: 'cover',
    left: 10,
    height: 50,
    top: 10,
    width: 200,
    borderRadius: 10,
    backgroundColor: 'rgba(241, 142, 35, 0.8)',
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendTop: {
    position: 'absolute',
    flexDirection: 'row',
    resizeMode: 'cover',
    left: 10,
    height: 50,
    top: 10,
    width: 200,
    borderRadius: 10,
    backgroundColor: 'rgba(62, 160, 85,0.8)',
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendTopSubText: {
    fontWeight: 'bold',
    fontSize: 15,
    fontStyle: 'normal',
  },
  lightningFive:{
    height: 100,
    backgroundColor: 'rgba(237, 28, 36, 1)',
    borderRadius: 20,
    justifyContent: 'center',
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 3,
    marginBottom: 15,
    paddingLeft: 20,
    flexWrap: 'wrap',
  },
  lightningTen:{
    height: 100,
    backgroundColor: 'rgba(241, 142, 35, 1)',
    borderRadius: 20,
    justifyContent: 'center',
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 3,
    marginBottom: 15,
    paddingLeft: 20,
    flexWrap: 'wrap',
  },
  lightning:{
    height: 100,
    backgroundColor: 'rgba(0, 255, 0, 1)',
    borderRadius: 20,
    justifyContent: 'center',
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 3,
    marginBottom: 15,
    paddingLeft: 20,
    flexWrap: 'wrap',
  },
title: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: '300',
}
});