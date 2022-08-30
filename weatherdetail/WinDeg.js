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
            
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=9811bbec32fc5d94d09f486c06d15a35`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
          
          })();
    }, [])     

    return(
        <View style={styles.warp}>
        {isLoading 
        ? <View style={styles.winddeg}>
            <View style={styles.windd}>
                <Image 
                    source={require('../image/windeg/N.png')}
                    style={{ width: 60, height: 60 }} 
                /> 
            </View>
            <View style={styles.detail}>
                <Text style={styles.text}>      ทิศทางลม</Text>
                <Text style={styles.text} >          360°  </Text>
            </View>
        </View>
        : (
            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.winddegs} >
                    <Text style={styles.detail}>{data.wind.deg > 337.5 && data.wind.deg <= 360 || data.wind.deg >= 0 && data.wind.deg <= 22.5
                        ? <Image 
                            source={require('../image/windeg/N.png')}
                            style={{ width: 60, height: 60 }} 
                            /> 
                        : <Text style={styles.detail}> {data.wind.deg > 22.5 && data.wind.deg <= 67.5
                            ? <Image 
                                source={require('../image/windeg/NE.png')}
                                style={{ width: 60, height: 60 }} 
                            />
                            : <Text style={styles.detail}> {data.wind.deg > 67.5 && data.wind.deg <= 112.5
                                ? <Image 
                                    source={require('../image/windeg/E.png')}
                                    style={{ width: 60, height: 60 }} 
                                />
                                : <Text style={styles.detail}> {data.wind.deg >112.5 && data.wind.deg <= 157.5
                                    ? <Image 
                                        source={require('../image/windeg/SE.png')}
                                        style={{ width: 60, height: 60 }} 
                                    />
                                    : <Text style={styles.detail}> {data.wind.deg >157.5 && data.wind.deg <= 202.5
                                        ? <Image 
                                            source={require('../image/windeg/S.png')}
                                            style={{ width: 60, height: 60 }} 
                                        />
                                        : <Text style={styles.detail}> {data.wind.deg >202.5 && data.wind.deg <= 247.5
                                            ? <Image 
                                                source={require('../image/windeg/SW.png')}
                                                style={{ width: 60, height: 60 }} 
                                            />
                                            : <Text style={styles.detail}> {data.wind.deg >247.5 && data.wind.deg <= 292.5
                                                ? <Image 
                                                    source={require('../image/windeg/W.png')}
                                                    style={{ width: 60, height: 60 }} 
                                                />
                                                : <Image 
                                                    source={require('../image/windeg/NW.png')}
                                                    style={{ width: 60, height: 60 }} 
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
                <View style={styles.detail}>
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
        marginBottom: 15
        
    },
    detail: {
        marginBottom: 10,
        paddingBottom: 10,
    }
  })
export default WindDeg;
