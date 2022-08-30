import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View,Image} from 'react-native';
import * as Location from 'expo-location';

const PMICON = () => {
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
            setLocation(location) 
            
            fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=9811bbec32fc5d94d09f486c06d15a35`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
        })();
    }, []) 
    return (
        <View>
            {isLoading 
            ? <View>
                <View>
                    <Image 
                        source={require('../image/pm2_5/pm2.png')}
                        style={{ width: 60, height: 60 }} 
                    /> 
                </View>
            </View>
            : (
                <View>
                    <View>
                        {data.list[0].components.pm2_5 >= 0 && data.list[0].components.pm2_5 <= 50
                        ? <Image 
                            source={require('../image/pm2_5/pm1.png')}
                            style={{ width: 80, height: 80 }} 
                        />
                        : <View>
                            {data.list[0].components.pm2_5 >= 51 && data.list[0].components.pm2_5 <= 100
                            ? <Image 
                                source={require('../image/pm2_5/pm2.png')}
                                style={{ width: 80, height: 80 }} 
                            />
                            : <View>
                                {data.list[0].components.pm2_5 >= 101 && data.list[0].components.pm2_5 <= 150
                                ? <Image 
                                    source={require('../image/pm2_5/pm3.png')}
                                    style={{ width: 80, height: 80 }} 
                                />
                                : <View>
                                    {data.list[0].components.pm2_5 >= 151 && data.list[0].components.pm2_5 <= 200
                                    ? <Image 
                                        source={require('../image/pm2_5/pm4.png')}
                                        style={{ width: 80, height: 80 }} 
                                    />
                                    : <View>
                                        {data.list[0].components.pm2_5 >= 201 && data.list[0].components.pm2_5 <= 300
                                        ? <Image 
                                            source={require('../image/pm2_5/pm5.png')}
                                            style={{ width: 80, height: 80 }} 
                                        />
                                        : <View>
                                            {data.list[0].components.pm2_5 >= 301 && data.list[0].components.pm2_5 <= 500
                                            ? <Image 
                                                source={require('../image/pm2_5/pm6.png')}
                                                style={{ width: 80, height: 80 }} 
                                            />
                                            : <Image 
                                                source={require('../image/pm2_5/pm6.png')}
                                                style={{ width: 80, height: 80 }} 
                                            />
                                            }
                                        </View>
                                        }
                                    </View>
                                    }
                                </View>
                                }
                            </View>
                            }
                        </View>
                        }
                    </View>
                </View>
            )
        }
        </View>
        

    )
}

export default PMICON;