import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {PropTypes} from 'prop-types';

export default class MyButton extends Component {
  render() {
    const {color, backgroundColor} = this.props;
    return (
      <TouchableOpacity style={[styles.button, {backgroundColor}]}>
        <Text style={[styles.text, {color}]}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

MyButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 3,
  },
  text: {
    fontSize: 12,
  },
});