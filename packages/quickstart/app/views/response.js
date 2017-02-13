import React, { Component, PropTypes } from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  error: {
    fontSize: 15,
    color: 'red',
  },
  text: {
    fontSize: 15,
  },
});

export default class ResponseView extends Component {
  render() {
    console.log('response.render', this.props);
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>
          {
            this.props.error ? 'Error:': 'Response:'
          }
          </Text>

          {
            this.props.error ?
              <Text style={styles.error}>{this.props.error}</Text> : false
          }

          {
            this.props.data ?
              <Text style={styles.text}>{this.props.data}</Text> : false
          }
        </View>
      </ScrollView>
    );
  }
}
