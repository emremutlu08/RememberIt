import React from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';

import { TextInput, Button } from 'react-native-paper';
import { Picker } from "native-base";


export default class AddScreen extends React.Component {

    state = {
        name: '',
        dataTxt: '',
        type: ''
    };

    onTypeChanged(value) {
        this.setState({
            type: value
        })
    }

    async rememberData() {
        const name = this.state.name
        const dataTxt = this.state.dataTxt
        const type = this.state.type

        if(name !== "" && dataTxt !== "" & type !== "") {

            const data = {
                name,
                dataTxt,
                type
            }
            console.log(data)

            await AsyncStorage.setItem(
                Date.now().toString(),
                JSON.stringify(data)
            )
            .then(()=>{
                this.props.navigation.goBack()
            })
            .catch(error=>console.log(error))


        } else {
            alert("Please enter some data")
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput
                    label='Name'
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                />

                <TextInput
                    label='Data'
                    value={this.state.dataTxt}
                    onChangeText={dataTxt => this.setState({ dataTxt })}
                    style={{
                        marginTop: 20
                    }}
                />

                <Text
                    style={{
                        marginTop: 20,
                    }}
                >Type</Text>
                <Picker
                    style={{
                        marginTop: 20,
                    }}
                    placeholder="Select type"
                    note
                    mode="dropdown"
                    style={{ width: 200 }}
                    selectedValue={this.state.type}
                    onValueChange={this.onTypeChanged.bind(this)}
                >
                    <Picker.Item label="Links" value="links" />
                    <Picker.Item label="Location" value="location" />
                    <Picker.Item label="Phone" value="phone" />
                    <Picker.Item label="Website" value="website" />
                    <Picker.Item label="EMail" value="email" />
                </Picker>

                <Button 
                    mode="contained" 
                    style={{
                        marginTop: 20
                    }}
                    onPress={() =>{this.rememberData()}}
                >
                    Remember this
                </Button>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },

});
