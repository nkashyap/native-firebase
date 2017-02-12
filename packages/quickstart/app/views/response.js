import React, { Component, PropTypes } from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
  rowTitle: {
    fontSize: 17,
    fontWeight: '500',
  },
  rowText: {
    fontSize: 17,
  },
});

export default class ResponseView extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.rowTitle}>{this.props.type}</Text>
          <Text style={styles.rowText}>{this.props.response}</Text>
        </View>
      </ScrollView>
    );
  }
}
