import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from './Button';

interface SubslideProps {
  subtitle: string;
  desc?: string;
  last?: boolean;
  onPress: () => void;
}

const Subslide = ({subtitle, desc, last, onPress}: SubslideProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.desc}>{desc}</Text>
      <Button
        title={last ? 'Get Started' : 'Next'}
        variant={last ? 'primary' : 'default'}
        {...{onPress}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 44,
    flex: 1,
  },
  subtitle: {
    color: '#000',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 30,
  },
  desc: {
    color: '#000',
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default Subslide;
