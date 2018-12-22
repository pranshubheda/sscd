import React,{Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
        }
    }

    onButtonPress = () => {
        this.props.loginHandler(this.state.username, this.state.password);
    }

    render() {
        return (
            <View>
                <TextInput style = {styles.input} 
                    autoCapitalize="none" 
                    onSubmitEditing={() => this.passwordInput.focus()} 
                    autoCorrect={false} 
                    keyboardType='email-address' 
                    returnKeyType="next" 
                    placeholder='Username' 
                    placeholderTextColor='rgba(225,225,225,0.7)'
                    onChangeText={(text) => this.setState({'username': text})}
                />

                <TextInput style = {styles.input}   
                    returnKeyType="go" 
                    ref={(input)=> this.passwordInput = input} 
                    placeholder='Password' 
                    placeholderTextColor='rgba(225,225,225,0.7)' 
                    secureTextEntry
                    onChangeText={(text) => this.setState({'password': text})}
                />

                <TouchableOpacity style={styles.buttonContainer} 
                                    onPress={this.onButtonPress}>
                            <Text  style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
     padding: 20
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});