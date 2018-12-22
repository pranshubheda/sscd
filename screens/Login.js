import React,{Component} from 'react';
import {Platform, StyleSheet, Text, View, KeyboardAvoidingView, Image, AsyncStorage} from 'react-native';
import LoginForm from '../components/LoginForm.js';
import { NavigationActions } from 'react-navigation';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.loginHandler = this.loginHandler.bind(this);
    }

    loginHandler(username, password) {
        var loginCredentials = {
            'username': username,
            'password': password,
        }
        //make api call and retrieve user_id

        //store the user_id to async storage
        this._setUserIdOfLoggedInUser()
        //redirect to the Tracking page
        this.props.navigation.dispatch(navigateAction);
    }

    componentDidMount() {
        this._checkIfLoggedIn().done();
    }

    _checkIfLoggedIn = async () => {
        var value = await AsyncStorage.getItem('user_id');
        if (value !== null) {
            
            this.props.navigation.dispatch(navigateAction);
        }
    }

    _setUserIdOfLoggedInUser = async () => {
        try {
            await AsyncStorage.setItem('user_id', '9999');
        } catch (error) {
        console.error('some error occure while stored user_id: ', error);
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