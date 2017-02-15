import React, {Component, PropTypes} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import JSONTree from 'react-native-json-tree';

import Renderer from  '../renderer';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    marginTop: 65,
  },
});

export default class ResponseView extends Component {
  renderError() {
    return (
      <View>
        {Renderer.label(this.props.error.name)}
        {Renderer.message(this.props.error.message)}
        {Renderer.message(this.props.error.stack)}
      </View>
    );
  }

  renderResponse() {
    const data = typeof this.props.data === 'object' ?
      <JSONTree data={this.props.data}/> : this.props.data;
    return (
      <View>
        {Renderer.message(data)}
      </View>
    );
  }

  render() {
    const children = this.props.error ? this.renderError() : this.renderResponse();
    return (
      <ScrollView style={styles.container}>
        {Renderer.label(this.props.label)}
        {children}
      </ScrollView>
    );
  }
}
