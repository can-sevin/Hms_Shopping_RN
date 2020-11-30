import React, {Component, Button} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapPage from './src/pages/MapPage';
import LoginPage from './src/pages/LoginPage';
import NavigationContainer from '@react-navigation/native/src/NavigationContainer';
import SplashPage from './src/pages/SplashPage';
import OnBoarding from './src/pages/OnBoarding';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashPage} />
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Map" component={MapPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
