import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, AsyncStorage, FlatList, Dimensions } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

import { Linking } from "expo";

export default class HomeScreen extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        this.getAllData()
    }

    async getAllData() {
        

        await AsyncStorage.getAllKeys()
        .then(async keys=>{
            try {
                const data = await AsyncStorage.multiGet(keys);
                this.setState({
                    data
                });
            }
            catch (error) {
                return console.log(error);
            }
        })
        .catch(error=>console.log(error))

        console.log(this.state.data)
    }

    render() {
        return (
            <View style={styles.container}>



                <FlatList 
                    data={this.state.data}
                    keyExtractor={ (item, index) => item[0].toString() }
                    renderItem={ ({item}) => {
                        
                        const rememberData = JSON.parse(item[1]);
                        
                        return(
                            <TouchableOpacity
                                onPress={()=>{

                                    if(rememberData.type == "links") {
                                        Linking.openURL(rememberData.dataTxt)
                                    } else if (rememberData.type == "location") {

                                        // https://www.google.com/maps/place/callifornia
                                        Linking.openURL(`https://www.google.com/maps/place/${rememberData.dataTxt}`)

                                    } else if (rememberData.type == "phone") {
                                        Linking.openURL(`tel:${rememberData.dataTxt}`)
                                    } else if (rememberData.type == "website") {
                                        Linking.openURL(rememberData.dataTxt)
                                    } else if (rememberData.type == "email") {
                                        Linking.openURL(`mailto:${rememberData.dataTxt}`)
                                    }

                                }}
                            >
                                <View style={styles.listItem}>
                                    <Text>{rememberData.name}</Text>
                                    <Text
                                    style={{
                                        color: "#2980b9"
                                    }}
                                    >{rememberData.dataTxt}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    } }
                />
               


                <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate("Add")
                    }}
                    style={styles.fab}
                >

                    <MaterialIcons
                        name="add"
                        size={30}
                    />

                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    fab: {
        backgroundColor: "#f1c40f",
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: {
            height: 2,
            width: 2
        },
        position: "absolute",
        right: 40,
        bottom: 40
    },
    listItem: {
        flexDirection: "column",
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: "#EFEFEF",
        marginTop: 10,
        borderRadius: 8
    }
});
