import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from '@hmscore/react-native-hms-map';

export default class MapPage extends Component {
  render() {
    return (
      <View>
        <MapView camera={{target: {latitude: 41, longitude: 29}, zoom: 11}}>
          <Marker // Simple example
            coordinate={{latitude: 41, longitude: 29}}
            title="Hello Huawei Map"
            snippet="This is a snippet!"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
