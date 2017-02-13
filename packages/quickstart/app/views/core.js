import React, { Component, PropTypes } from 'react';
import {ScrollView, StyleSheet, TouchableHighlight, View, Text} from 'react-native';
import Firebase from '@native-firebase/core';

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
    fontSize: 14,
  },
});

export default class CoreView extends Component {
  componentWillMount() {
    this.firebase = new Firebase();
  }

  goto(error, data) {
    this.props.navigator.push({
      component: ResponseView,
      passProps: { error, data }
    });
  }

  renderProp(prop) {
    return (
      <View style={styles.row}>
        <Text style={styles.rowText}>
          {prop}:
        </Text>
        <Text style={styles.rowText}>
          {Firebase[prop]}
        </Text>
      </View>
    );
  }

  renderMethod(method, callback) {
    return (
      <View>
        <TouchableHighlight onPress={() => callback()}>
          <View style={styles.row}>
            <Text style={styles.rowText}>
              {method}()
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator}/>
      </View>
    );
  }

  render() {
    console.log('core.render', this.props);
    return (
      <ScrollView style={styles.container}>
        {this.renderProp('DEFAULT_APP_NAME')}

        {this.renderMethod('Firebase.getApps()', async() => {
          try {
            this.goto(null, await Firebase.getApps());
          } catch (e) {
            this.goto(e);
          }
        })}

        {this.renderMethod('Firebase.getInstance()', async() => {
          try {
            this.goto(null, await Firebase.getInstance());
          } catch (e) {
            this.goto(e);
          }
        })}

        {this.renderMethod('Firebase.initializeApp()', async() => {
          try {
            this.goto(null, await Firebase.initializeApp());
          } catch (e) {
            this.goto(e);
          }
        })}


        {this.renderMethod('getName', async() => {
          try {
            this.goto(null, await this.firebase.getName());
          } catch (e) {
            this.goto(e);
          }
        })}

        {this.renderMethod('getOptions', async() => {
          try {
            this.goto(null, await this.firebase.getOptions());
          } catch (e) {
            this.goto(e);
          }
        })}

        {this.renderMethod('hashCode', async() => {
          try {
            this.goto(null, await this.firebase.hashCode());
          } catch (e) {
            this.goto(e);
          }
        })}

        {this.renderMethod('setAutomaticResourceManagementEnabled', async() => {
          try {
            this.goto(null, await this.firebase.setAutomaticResourceManagementEnabled());
          } catch (e) {
            this.goto(e);
          }
        })}

      </ScrollView>
    );
  }
}
