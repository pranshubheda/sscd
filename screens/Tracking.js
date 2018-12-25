import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { NavigationActions } from "react-navigation";
import BackgroundTimer from "react-native-background-timer";

const baseURL = "http://52.14.62.158:5656/";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      user_id: null
    };
    this.startTracking = this.startTracking.bind(this);
    this.stopTracking = this.stopTracking.bind(this);
  }

  componentDidMount() {
    this._getUserId();
  }

  componentWillUnmount() {
    this.stopTracking();
  }

  startTracking() {
    this.runBackgroundTask();
  }

  stopTracking() {
    alert("Tracking has been Stopped ");
    navigator.geolocation.stopObserving();
    this.stopBackgroundTask();
  }

  _getUserId = async () => {
    var value = await AsyncStorage.getItem("user_id");
    if (value == null) {
      alert("please login again");
      this.props.navigation.dispatch(navigateActionToLogin);
    } else {
      console.log("logged in user_id :" + value);
      this.setState({
        user_id: value
      });
    }
  };

  getGeoLocationAndUpdate() {
    navigator.geolocation.getCurrentPosition(
      position => {
        if (position.coords.latitude != this.state.latitude ||
          position.coords.longitude != this.state.longitude)
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null
            });
        this.updateLocation(this.state.latitude, this.state.longitude);
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  updateLocation(latitude, longitude) {
    console.log("updating location to:- " + latitude + "/" + longitude);
    var location = {
      user_id: this.state.user_id,
      latitude: latitude,
      longitude: longitude
    };

    fetch(baseURL + "api/location/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(location)
    }).then(response => {
      if (response.status == 200) {
        // this.handleLoginSuccess(response);
        console.log("location updated successfully");
      } else {
        console.log("error occurred while updating location");
      }
    });
  }

  backgroundTask = () => {
    this.getGeoLocationAndUpdate();
  };

  stopBackgroundTask = () => {
    console.log("stopping background task timer");
    BackgroundTimer.stopBackgroundTimer();
  };

  runBackgroundTask = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      this.backgroundTask();
    }, 60000);
  };

  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.startTracking}
        >
          <Text style={styles.buttonText}>START TRACKING</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.stopTracking}
        >
          <Text style={styles.buttonText}>STOP TRACKING</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const navigateActionToLogin = NavigationActions.navigate({
  routeName: "Home"
});

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50",
    padding: 20,
    justifyContent: "center"
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    color: "#fff"
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15,
    margin: 50
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});
