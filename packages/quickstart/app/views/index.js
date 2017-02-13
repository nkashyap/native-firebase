import React, { Component, PropTypes } from 'react';
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
    { title: 'List', hidden: true},
    { component: ResponseView, title: 'Response', hidden: true},
    { component: CoreView, title: 'Firebase Core'},
    { component: ConfigView, title: 'Firebase RemoteConfig'},
  ];

  onPressButton = (route) => {
    console.log('click', route);
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
    console.log('list.render', this.props);
    return (
      <ScrollView style={styles.container}>
        {this.renderList()}
      </ScrollView>
    );
  }
}
