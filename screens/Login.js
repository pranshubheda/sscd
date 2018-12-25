import React,{Component} from 'react';
import {Platform, StyleSheet, Text, View, KeyboardAvoidingView, Image, AsyncStorage} from 'react-native';
import LoginForm from '../components/LoginForm.js';
import { NavigationActions } from 'react-navigation';

const baseURL = 'http://6b3f8e87.ngrok.io/';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.loginHandler = this.loginHandler.bind(this);
    }

    loginHandler(username, password) {
        console.log(username, password)
        var loginCredentials = JSON.stringify({username:username,password:password});
        console.log(loginCredentials);
        //make api call and retrieve user_id
        fetch(baseURL+'api/login', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json',
            },
            body: loginCredentials,
        })
        .then((response) => {
            if(response.status == 200) {
                this.handleLoginSuccess(response);
            }
            else {
                this.handleLoginFailure(response);
            }
        });
    }

    handleLoginSuccess(response) {
        response.json().then((responseJson) => {
            this._setUserIdOfLoggedInUser(responseJson._id);
            this.props.navigation.dispatch(navigateAction);
        });
    }
    
    handleLoginFailure(response) {
        response.json().then((responseJson) => {
            alert(responseJson.error_msg);
        });
    }

    componentDidMount() {
        this._checkIfLoggedIn().done();
    }

    _checkIfLoggedIn = async () => {
        var value = await AsyncStorage.getItem('user_id');
        console.log('async storage value:-',value);
        if (value !== null) {
            this.props.navigation.dispatch(navigateAction);
        }
    }

    _setUserIdOfLoggedInUser = async (user_id) => {
        try {
            await AsyncStorage.setItem('user_id', user_id);
        } catch (error) {
            console.error('some error occured while stored user_id: ', error);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View style={styles.loginContainer}>
                    {/* <Image resizeMode="contain" style={styles.logo} source={require('../../components/images/logo-dark-bg.png')} /> */}
                  
                   </View>
               <View style={styles.formContainer}>
                   <LoginForm loginHandler={this.loginHandler} />
               </View>
           </KeyboardAvoidingView>
        );
    }
}

const navigateAction = NavigationActions.navigate({
    routeName: 'Tracking',
  });

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    }
});