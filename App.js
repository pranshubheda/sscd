import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './screens/Login' 
import Tracking from './screens/Tracking' 

const ApplicationNavigator = createStackNavigator(
  {
    Home: Login,
    Tracking: Tracking
  }, {
    defaultNavigationOptions: {
    },
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(ApplicationNavigator);

export default class App extends Component {

  render() {
    return(
      <AppContainer/>
    );
  }
}

