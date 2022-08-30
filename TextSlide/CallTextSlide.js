import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import {firebase} from '../config'
import MarqueeText from 'react-native-marquee';

const Fetch = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState([]);
    const todoRef = firebase.firestore().collection('todos');

    useEffect(() => {
        todoRef
       .onSnapshot(
        querySnapshot => {
            const users = []
            querySnapshot.forEach((doc) => {
                const {heading, text} = doc.data()
                users.push({
                    id: doc.id,
                    heading,
                    text,
                })
            })
            setUsers(users),
            setLoading(false)
        }
       )
    }, []);

    return (
        <View style={styles.slide}>
        {loading ? <ActivityIndicator size="large" /> : (
            <FlatList 
                data={users}
                numColumn={1}
                renderItem={({item}) => (
                    <View style={styles.textslide}>
                        {/* <Text>Heading : {item.heading}</Text>
                        <Text>Decriptions : {item.text}</Text> */}
                        <MarqueeText
                            style={{ 
                                fontSize: 20 ,
                                color: 'red'}}
                            speed={0.1}
                            marqueeOnStart={true}
                            loop={true}
                            delay={1000}
                            >
                            {item.text}
                        </MarqueeText>
                    </View>
                )}>
            </FlatList>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:'70%',
    },
    slide: {
        marginBottom: 15,
        marginTop: 10,
        alignSelf: 'stretch',
    },
    textslide: {
        fontWeight: '300',
    }
  });

export default Fetch;