import React, {Component, useEffect, useState} from 'react';
import {Text, View, ActivityIndicator, SafeAreaView} from 'react-native';
import HMSLocation from '@hmscore/react-native-hms-location';
import MapView, {Marker, InfoWindow} from '@hmscore/react-native-hms-map';
import RNHMSSite from '@hmscore/react-native-hms-site';
import {SearchBar, ListItem} from 'react-native-elements';

let mapView, nearbySearchReq;

const config = {
  apiKey:
    'CgB6e3x9E9lEe4O/CdaX1h+C2S+QLwq/R0Az4n2Y/u0GVolMPF+kTp3FqGknfYViO3mVTlqXCNNaYIbFlcde3E3s',
};

const SetMap = () => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [position, setPosition] = useState();
  const [site, setSite] = useState([]);
  const [search, setSearch] = useState(null);
  const [searchList, setSearchList] = useState([]);
  let updateSearch;

  updateSearch = (Getsearch) => {
    setSearch(Getsearch);
    RNHMSSite.querySuggestion(nearbySearchReq)
      .then((res) => {
        setSearchList(res);
        setSite(res.sites);
        mapView.setCameraPosition({
          target: {
            latitude: res.sites[0].location.lat,
            longitude: res.sites[0].location.lng,
          },
          zoom: 17,
        });
      })
      .catch((err) => {
        console.log(JSON.stringify(err) + 'Suggestion Error');
      });
  };

  useEffect(() => {
    HMSLocation.FusedLocation.Native.hasPermission()
      .then((result) => setHasLocationPermission(result))
      .catch(HMSLocation.FusedLocation.Native.requestPermission());
  }, []);
  if (hasLocationPermission) {
    HMSLocation.FusedLocation.Native.getLastLocation()
      .then((pos) => (position ? null : setPosition(pos)))
      .catch((err) => console.log('Failed to get last location', err));
    position
      ? RNHMSSite.initializeService(config)
          .then(() => {
            nearbySearchReq = {
              query: search,
              location: {
                lat: position.latitude,
                lng: position.longitude,
              },
              radius: 1000,
              poiType: RNHMSSite.LocationType.SHOPPING_MALL,
              countryCode: 'TR',
              language: 'tr',
              pageIndex: 1,
              pageSize: 8,
              politicalView: 'tr',
            };
            site.length === 0
              ? RNHMSSite.nearbySearch(nearbySearchReq)
                  .then((res) => {
                    setSite(res.sites);
                    mapView.setCameraPosition({
                      target: {
                        latitude: site[0].location.lat,
                        longitude: site[0].location.lng,
                      },
                      zoom: 17,
                    });
                  })
                  .catch((err) => {
                    console.log(JSON.stringify(err));
                  })
              : null;
          })
          .catch((err) => {
            console.log('Error : ' + err);
          })
      : null;
  } else {
    HMSLocation.FusedLocation.Native.requestPermission();
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <SearchBar
        platform="android"
        clearIcon="none"
        searchIcon="none"
        cancelIcon="none"
        round={true}
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        lightTheme={true}
      />
      {search
        ? Object.keys(searchList).map(function (l, i) {
            return (
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{searchList.sites[i].name}</ListItem.Title>
                  <ListItem.Subtitle>
                    {searchList.sites[i].formatAddress}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          })
        : null}

      {position ? (
        <MapView
          camera={{
            target: {
              latitude: position.latitude,
              longitude: position.longitude,
            },
            zoom: 15,
          }}
          ref={(e) => (mapView = e)}
          myLocationEnabled={true}
          markerClustering={true}
          myLocationButtonEnabled={true}
          rotateGesturesEnabled={true}
          scrollGesturesEnabled={true}
          tiltGesturesEnabled={true}
          zoomGesturesEnabled={true}>
          {site != null
            ? Object.keys(site).map(function (key, i) {
                return (
                  <Marker
                    visible={true}
                    coordinate={{
                      latitude: site[i].location.lat,
                      longitude: site[i].location.lng,
                    }}
                    key={i}
                    icon={{
                      asset: 'shopping.png',
                    }}
                    clusterable>
                    <InfoWindow
                      style={{
                        alignContent: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                      }}>
                      <View style={style.markerSelectedHms}>
                        <Text
                          style={style.titleSelected}>{`${site[i].name}`}</Text>
                      </View>
                    </InfoWindow>
                  </Marker>
                );
              })
            : null}
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </SafeAreaView>
  );
};

export default class MapPage extends Component {
  render() {
    return <SetMap />;
  }
}

const style = (base) => ({
  markerSelectedHms: {
    flexDirection: 'row',
    height: 50,
    borderRadius: base.radius.default,
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});
