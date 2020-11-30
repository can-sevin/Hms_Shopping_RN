import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ButtonProps {
  variant: 'default' | 'primary';
  title: string;
  onPress: () => void;
}

const Button = ({variant, title, onPress}: ButtonProps) => {
  const backgroundColor =
    variant === 'primary' ? '#e2c600' : 'rgba(12,13,52,0.05)';
  const color = variant === 'primary' ? 'white' : 'black';
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}]}
      {...{onPress}}>
      <Text style={{color}}> {title} </Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {variant: 'default'};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  title: {
    fontSize: 15,
    fontFamily: 'OpenSans-SemiBold',
  },
});

export default Button;
