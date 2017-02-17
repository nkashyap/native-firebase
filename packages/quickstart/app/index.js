import React, {Component} from 'react';
import {StyleSheet, Navigator, TouchableHighlight, View, Text} from 'react-native';
import ListView from './views/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    backgroundColor: '#bbbbbb',
    flex: 1,
    flexDirection: 'column',
  },
  navigationButton: {
    flex: .25,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  navigationButtonBgColor: {
    backgroundColor: '#bbbbbb',
  },
  navigationButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  navigationTitle: {
    flex: .75,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  navigationTitleText: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export default class Quickstart extends Component {
  renderScene = (route, navigator) => {
    const props = route.passProps || {};

    if (route.component) {
      return <route.component navigator={navigator} {...props} />;
    }
    return <ListView navigator={navigator} {...props} />;
  };

  configureScene = () => {
    return Navigator.SceneConfigs.FloatFromRight;
  };

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={ListView.routes[0]}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
          navigationBar={
            <Navigator.NavigationBar
              style={styles.navigation}
              routeMapper={{
                LeftButton: (route, navigator, index, navState) => {
                  {/*if (index === 0) {*/
                  }
                  {/*return false;*/
                  }
                  {/*}*/
                  }

                  return (
                    <View style={styles.navigationButton}>
                      <TouchableHighlight onPress={() => navigator.pop()}>
                        <View style={styles.navigationButtonBgColor}>
                          <Text style={styles.navigationButtonText}>
                            Back
                          </Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  );
                },
                RightButton: (route, navigator, index, navState) => {
                  return null;
                },
                Title: (route, navigator, index, navState) => {
                  return (
                    <View style={styles.navigationTitle}>
                      <Text style={styles.navigationTitleText}>
                        {route.title}
                      </Text>
                    </View>
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
