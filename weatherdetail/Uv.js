import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  DevSettings,
  Image,
  ListViewBase,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

//http://api.weatherapi.com/v1/current.json?key=7b0c693be52f4d02b4e104427233001&q=13.7563309,100.5017651

const RainValu = () => {
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([null]);
  const [dt, setDt] = useState(new Date().toLocaleString());

  let date = String(new window.Date());
  date = date.slice(3, 21);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setLocation(location);

      fetch(
        `http://api.weatherapi.com/v1/current.json?key=7b0c693be52f4d02b4e104427233001&q=${location.coords.latitude},${location.coords.longitude}`
      )
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    })();

    let secTimer = setInterval(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access location was denied");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setLocation(location);

        fetch(
          `http://api.weatherapi.com/v1/current.json?key=7b0c693be52f4d02b4e104427233001&q=${location.coords.latitude},${location.coords.longitude}`
        )
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      })();
    }, 7200000);
    return () => clearInterval(secTimer);
  }, []);
  return (
    <View>
      {isLoading ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../image/weather/UV.png")}
            style={{ width: 60, height: 60 }}
          />
          <Text style={{ fontSize: 15, fontWeight: "10" }}>ดัชนี UV</Text>
          <Text style={{ fontSize: 15, fontWeight: "10" }}>1</Text>
        </View>
      ) : (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../image/weather/UV.png")}
            style={{ width: 60, height: 60 }}
          />
          <Text style={{ fontSize: 12 }}>ดัชนี UV</Text>
          <Text style={{ fontSize: 12 }}>{data.current.uv}</Text>
        </View>
      )}
    </View>
  );
};
export default RainValu;
