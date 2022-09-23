import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import { getDistance } from "geolib";
import { LocationsContext } from "../contexts/LocationsContext";
import { Text, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Noti from "../notifications/localNotifications";

const LightningCalculate = (props) => {
  const { location, loading } = useContext(LocationsContext);
  const { dataLightnings } = props;
  const [dist, setDist] = useState(0);
  const [state, setState] = useState(0);
  const [notify, setNotify] = useState("kkk");
  const prevDist = useRef();
  let item = [];
  let itemTimes = [];
  let itemm = "";

  useEffect(() => {
    
    for (let i = 0; i < dataLightnings.length; i++) {
      let lat = parseFloat(dataLightnings[i].LAT);
      let lon = parseFloat(dataLightnings[i].LON);
      let dateLightnings = new Date(dataLightnings[i].DAT);
      let uTimeLightning = Math.floor(dateLightnings.getTime()/1000);
      let fifteenMinCount = uTimeLightning + 900;
      let uTimeNow = (Date.now()/1000);
      //let uTimeFifteen = ((Date.now()/1000)-900);
      let dis = getDistance(
        { latitude: lat, longitude: lon },
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }
      );
      if (dataLightnings[i].TYP === "1" && fifteenMinCount > uTimeNow){
        item.push(dis / 1000);
        itemTimes.push(dateLightnings);
      }
      
    }
    //prevDist.current = parseInt(Math.min(...item));
    setDist(parseInt(Math.min(...item)));
    //setDist(parseInt(Math.min.apply(null, item)));
    setNotify(itemTimes[item.indexOf(Math.min(...item))]);
    //setDist(0);
    setState(dist);
    
  },[]);

  //console.log(dist);
  
  //console.log(location.coords.latitude


  if (dist > 10) {
    return (
      <View style={styles.legendTop}>
        <Text style={styles.legendTopSubText}>ฟ้าผ่าในระยะ {dist} กม.</Text>
      </View>
    );
  } else if (dist > 5 && dist <= 10) {
    console.log("dist:",dist);
    console.log("state:",state);
    if(state !== 0) {
      if( state !== dist) {
        console.log("Noti");
        Noti();
      }
    }
    else {
      console.log("else");
    }
    return (
      <View style={styles.legendTopTen}>
        <Text style={styles.legendTopSubText}>
          ฟ้าผ่าในระยะ {dist} กม.
          </Text>
      </View>
    );
  } else if (dist => 0 && dist <= 5) {
    console.log("dist:",dist);
    console.log("state:",state);
    if(state !== 0) {
      if( state !== dist) {
        console.log("Noti");
        Noti();
      }
    }
    else {
      console.log("else");
    }
    return (
      <View style={styles.legendTopFive}> 
        <Text style={styles.legendTopSubText}> { dist === 0 
        ? <Text>ฟ้าผ่าในระยะน้อยกว่า 1 กม.</Text>  
        : <Text>ฟ้าผ่าในระยะ {dist} กม.</Text>}
        </Text>
      </View>
    );
  }
};

export default LightningCalculate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  legendTopFive: {
    position: "absolute",
    left: 10,
    top: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(237, 28, 36, 0.8)",
    opacity: 1,
  },
  legendTopTen: {
    position: "absolute",
    left: 10,
    top: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255, 140, 0,0.8)",
    opacity: 1,
  },
  legendTop: {
    flex: 1,
    position: "absolute",
    left: 10,
    top: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(51, 204, 0, 0.8)",
    opacity: 1,
  },
  legendTopSubText: {
    fontWeight: "bold",
    color:"white",
    fontSize: 14,
    fontStyle: "normal",
  },
  lightningFive: {
    height: 100,
    backgroundColor: "rgba(237, 28, 36, 1)",
    borderRadius: 20,
    justifyContent: "center",
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 3,
    marginBottom: 15,
    paddingLeft: 20,
    flexWrap: "wrap",
  },
  lightningTen: {
    height: 100,
    backgroundColor: "rgba(241, 142, 35, 1)",
    borderRadius: 20,
    justifyContent: "center",
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 3,
    marginBottom: 15,
    paddingLeft: 20,
    flexWrap: "wrap",
  },
  lightning: {
    height: 100,
    backgroundColor: "rgba(0, 255, 0, 1)",
    borderRadius: 20,
    justifyContent: "center",
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 3,
    marginBottom: 15,
    paddingLeft: 20,
    flexWrap: "wrap",
  },
  title: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "300",
  },
});
