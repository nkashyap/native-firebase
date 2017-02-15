import React, {Component, PropTypes} from 'react';
import {ScrollView, StyleSheet, TouchableHighlight, View, Text} from 'react-native';

import CoreView from './core';
import ConfigView from './config';
import ResponseView from './response';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    marginTop: 70,
  },
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
  },
  rowText: {
    fontSize: 17,
  },
});

export default class ListView extends Component {
  static routes = [
    {path: 'list', title: 'List', hidden: true},
    {path: 'response', component: ResponseView, title: 'Response', hidden: true},
    {path: 'core', component: CoreView, title: 'Firebase Core'},
    {path: 'config', component: ConfigView, title: 'Firebase RemoteConfig'},
  ];

  static getRoute(path) {
    return ListView.routes.find((r) => r.path === path);
  }

  onPressButton = (route) => {
    this.props.navigator.push(route);
  };

  renderList() {
    return ListView.routes.filter((r) => !r.hidden).map((route, index) => (
      <View key={index}>
        <TouchableHighlight onPress={() => this.onPressButton(route)}>
          <View style={styles.row}>
            <Text style={styles.rowText}>
              {route.title}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator}/>
      </View>
    ));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderList()}
      </ScrollView>
    );
  }
}
