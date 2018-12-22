import React,{Component} from 'react';
import {Platform, StyleSheet, Text, View, KeyboardAvoidingView, Image, AsyncStorage} from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
        }
    }

    componentDidMount() {
        var user_id = this._getUserId();
        this.setState({
            'user_id': user_id,
        });

        console.log('user_id set in component state',this.state.user_id);
    }

    _getUserId = async () => {
        var value = await AsyncStorage.getItem('user_id');
        if (value == null) {
            alert('please login again')
            this.props.navigation.dispatch(navigateActionToLogin);
        }
        else {
            alert(value);
        }
        return value;
    }

    render() {
        return (
            <View>
                <Text>This is tracking scene you were already logged in</Text>
            </View>
        );
    }
}

const navigateActionToLogin = NavigationActions.navigate({
    routeName: 'Home',
  });