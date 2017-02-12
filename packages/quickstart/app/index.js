import React, {Component} from 'react';
import {StyleSheet, Navigator, TouchableHighlight, View, Text} from 'react-native';

import ListView from './views/index';
import ResponseView from './views/response';
import CoreView from './views/core';
import ConfigView from './views/config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    backgroundColor: '#bbbbbb',
    height: 70,
  },
  navigationButton: {
    backgroundColor: '#bbbbbb',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  navigationButtonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navigationTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 5,
  },
});

export default class Quickstart extends Component {
  renderScene = (route, navigator) => {
    const props = {navigator, route};

    switch (route.path) {
      case 'core':
        return <CoreView {...props} />;
      case 'config':
        return <ConfigView {...props} />;
      case 'response':
        return <ResponseView {...props} />;
      default:
        return (<ListView {...props} />);
    }
  };

  configureScene = () => {
    return Navigator.SceneConfigs.FloatFromRight;
  };

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={ListView.routes[0]}
          initialRouteStack={ListView.routes}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
          navigationBar={
            <Navigator.NavigationBar
              style={styles.navigation}
              routeMapper={{
                LeftButton: (route, navigator, index, navState) => {
                  if (index === 0) {
                    return false;
                  }

                  return (
                    <TouchableHighlight onPress={() => navigator.pop()}>
                      <View style={styles.navigationButton}>
                        <Text style={styles.navigationButtonText}>
                          Back
                        </Text>
                      </View>
                    </TouchableHighlight>
                  );
                },
                RightButton: (route, navigator, index, navState) => {
                  return null;
                },
                Title: (route, navigator, index, navState) => {
                  return (
                    <Text style={styles.navigationTitle}>
                      {route.title}
                    </Text>
                  );
                },
              }}
            />
          }
        />
      </View>
    );
  }
}
