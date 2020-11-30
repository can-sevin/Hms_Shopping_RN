import React from 'react';
import Animated, {Extrapolate, interpolate} from 'react-native-reanimated';

interface DotProps {
  index: number;
  currentIndex: Animated.Node<number>;
}

const Dot = ({index, currentIndex}: DotProps) => {
  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });

  const scale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={{
        opacity,
        backgroundColor: '#e2c600',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 2,
        transform: [{scale}],
      }}
    />
  );
};

export default Dot;
