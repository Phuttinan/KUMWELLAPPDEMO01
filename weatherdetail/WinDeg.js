import React,{useState,useEffect}  from 'react';
import { View, Text, Image,StyleSheet } from 'react-native';
import * as Location from 'expo-location';

//https://api.openweathermap.org/data/2.5/weather?lat=13.7527296&lon=100.5682688&appid=9811bbec32fc5d94d09f486c06d15a35

const WindDeg = () => {
    const [isLoading, setLoading] = useState(true);
    const [data,setData] = useState([null]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              alert('Permission to access location was denied');
              return;
            }
            let location = await Location.getCurrentPositionAsync({}); 
            setLatitude(location.coords.latitude)
            setLongitude(location.coords.longitude); 
            
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=d192eba2efb364a2b3335c9cfb003726`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
          
          })();
          
        let secTimer = setInterval(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              alert('Permission to access location was denied');
              return;
            }
            let location = await Location.getCurrentPositionAsync({}); 
            setLatitude(location.coords.latitude)
            setLongitude(location.coords.longitude); 
            
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=d192eba2efb364a2b3335c9cfb003726`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
          
          })();
        }, 7200000)
        return () => clearInterval(secTimer);
    }, [])     

    return(
        <View style={styles.warp}>
        {isLoading 
        ? <View style={styles.winddegs}>
            <View style={styles.windd}>
                <Image 
                    source={require('../image/windegnew/N.png')}
                    style={{ width: 50, height: 50 }} 
                /> 
            </View>
            <View style={styles.detail0}>
                <Text style={styles.text}> ทิศทางลม</Text>
                <Text style={styles.text} > 360°  </Text>
            </View>
        </View>
        : (
            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.winddegs} >
                    <Text style={styles.detail}>{data.wind.deg > 337.5 && data.wind.deg <= 360 || data.wind.deg >= 0 && data.wind.deg <= 22.5
                        ? <Image 
                            source={require('../image/windegnew/N.png')}
                            style={{ width: 50, height: 50 }} 
                            /> 
                        : <Text style={styles.detail}> {data.wind.deg > 22.5 && data.wind.deg <= 67.5
                            ? <Image 
                                source={require('../image/windegnew/NE.png')}
                                style={{ width: 50, height: 50 }} 
                            />
                            : <Text style={styles.detail}> {data.wind.deg > 67.5 && data.wind.deg <= 112.5
                                ? <Image 
                                    source={require('../image/windegnew/E.png')}
                                    style={{ width: 50, height: 50 }} 
                                />
                                : <Text style={styles.detail}> {data.wind.deg >112.5 && data.wind.deg <= 157.5
                                    ? <Image 
                                        source={require('../image/windegnew/SE.png')}
                                        style={{ width: 50, height: 50 }} 
                                    />
                                    : <Text style={styles.detail}> {data.wind.deg >157.5 && data.wind.deg <= 202.5
                                        ? <Image 
                                            source={require('../image/windegnew/S.png')}
                                            style={{ width: 50, height: 50 }} 
                                        />
                                        : <Text style={styles.detail}> {data.wind.deg >202.5 && data.wind.deg <= 247.5
                                            ? <Image 
                                                source={require('../image/windegnew/SW.png')}
                                                style={{ width: 50, height: 50 }} 
                                            />
                                            : <Text style={styles.detail}> {data.wind.deg >247.5 && data.wind.deg <= 292.5
                                                ? <Image 
                                                    source={require('../image/windegnew/W.png')}
                                                    style={{ width: 50, height: 50 }} 
                                                />
                                                : <Image 
                                                    source={require('../image/windegnew/NW.png')}
                                                    style={{ width: 50, height: 50 }} 
                                                />
                                            }
                                            </Text>
                                        }
                                        </Text>
                                    }
                                    </Text>
                                }
                                </Text>
                            }
                            </Text>
                        }

                        </Text>
                    }</Text>
                </View>
                <View style={styles.detail1}>
                    <Text style={styles.text}>ทิศทางลม</Text>
                    <Text style={styles.text} >      {data.wind.deg}°  </Text>
                </View>
            </View>
        )}
      </View>
    )  
}
const styles = StyleSheet.create({
    winddegs: {
        // marginBottom: 15
        
    },
    detail: {
        marginBottom: 10,
        paddingBottom: 10,
    },
    detail1: {
        marginTop: 2,
    },
    detail0: {
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 12,
    }
  })
export default WindDeg;
