import React, {Component} from 'react';
import {SafeAreaView, Text, Animated, Easing} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
export default class SplashPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const {navigate} = this.props.navigation;
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(({finished}) => {
      if (finished) {
        navigate('OnBoarding');
      }
    });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#040404',
        }}>
        <Text
          style={{
            color: '#FFF',
            alignItems: 'center',
            alignContent: 'center',
            fontFamily: 'OpenSans-Regular',
            fontSize: 20,
            top: 220,
          }}>
          WELCOME
        </Text>
        <AnimatedLottieView
          source={require('../raw/HishoppingIconnewblack.json')}
          progress={this.state.progress}
        />
      </SafeAreaView>
    );
  }
}
