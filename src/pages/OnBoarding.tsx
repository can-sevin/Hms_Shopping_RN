import React, {useRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Slide, {SLIDE_HEIGHT, BORDER_RADIUS} from './Slide';
import Animated, {multiply, divide} from 'react-native-reanimated';
import Subslide from './Subslide';
import {
  useScrollHandler,
  interpolateColor,
} from 'react-native-redash/lib/module/v1';
import Dot from '../components/Dot';
import {StackNavigationProp} from '@react-navigation/stack';
import {Routes} from 'react-native-safe-area-context/lib/typescript/example/src/types/Navigation';

const OnBoarding = ({
  navigation,
}: StackNavigationProp<Routes, 'OnBoarding'>) => {
  const scroll = useRef<Animated.ScrollView>(null);
  const {scrollHandler, x} = useScrollHandler();
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.descColor),
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, {backgroundColor}]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          {...scrollHandler}>
          {slides.map(({title, picture}, index) => (
            <Slide key={index} right={!!(index % 2)} {...{title, picture}} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{...StyleSheet.absoluteFillObject, backgroundColor}}
        />
        <View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot
                key={index}
                currentIndex={divide(x, width)}
                {...{index, x}}
              />
            ))}
          </View>
          <Animated.View
            style={{
              flex: 1,
              width: width * slides.length,
              flexDirection: 'row',
              transform: [{translateX: multiply(x, -1)}],
            }}>
            {slides.map(({subtitle, desc}, index) => {
              const last = index === slides.length - 1;
              return (
                <Subslide
                  key={index}
                  onPress={() => {
                    if (last) {
                      navigation.navigate('Login');
                    } else if (scroll.current) {
                      scroll.current
                        .getNode()
                        .scrollTo({x: width * (index + 1), animated: true});
                    }
                  }}
                  {...{subtitle, desc, last}}
                />
              );
            })}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: BORDER_RADIUS,
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const slides = [
  {
    title: 'Welcome',
    subtitle: 'Welcome to HiShopping',
    desc: 'Welcome to HiShopping Description',
    descColor: '#FFF',
    picture: require('../assets/1.jpeg'),
  },
  {
    title: 'Intro',
    subtitle: 'Introduction HiShopping',
    desc: 'Introduction HiShopping',
    descColor: '#FFF',
    picture: require('../assets/2.jpg'),
  },
  {
    title: 'Tutorial',
    subtitle: 'Tutorial HiShopping',
    desc: 'Tutorial HiShopping',
    descColor: '#FFF',
    picture: require('../assets/3.jpg'),
  },
  {
    title: 'Shopping',
    subtitle: 'Shopping HiShopping',
    desc: 'Description HiShopping',
    descColor: '#FFF',
    picture: require('../assets/4.jpg'),
  },
];

export default OnBoarding;
