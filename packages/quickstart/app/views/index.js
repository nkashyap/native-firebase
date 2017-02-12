import React, { Component, PropTypes } from 'react';
import {ScrollView, StyleSheet, TouchableHighlight, View, Text} from 'react-native';

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
    {path: 'response', title: 'Response', hidden: true},
    {path: 'core', title: 'Firebase Core'},
    {path: 'config', title: 'Firebase RemoteConfig'},
  ];

  onPressButton = (route, index) => {
    this.props.navigator.push(route);
  };

  renderList() {
    return ListView.routes.filter((r) => !r.hidden).map((route, index) => (
      <View key={index}>
        <TouchableHighlight onPress={() => this.onPressButton(route, index)}>
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
