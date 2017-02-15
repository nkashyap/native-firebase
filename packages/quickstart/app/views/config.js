import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import FirebaseRemoteConfig from '@native-firebase/config';
import Renderer from  '../renderer';
import ListView from './';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    marginTop: 70,
  }
});

export default class ConfigView extends Component {
  renderResponse(label, error, data) {
    const config = ListView.getRoute('response');
    const route = Object.assign({}, config, {passProps: {label, error, data}});

    this.props.navigator.push(route);
  }

  onPress = async(key) => {
    try {
      let response = true;
      switch (key) {
        case 'FirebaseRemoteConfig.fetch()':
          response = await FirebaseRemoteConfig.fetch();
          break;
        case 'FirebaseRemoteConfig.getFetchTimeMillis()':
          response = await FirebaseRemoteConfig.getFetchTimeMillis();
          break;
        case 'FirebaseRemoteConfig.getLastFetchStatus()':
          response = await FirebaseRemoteConfig.getLastFetchStatus();
          break;
        case 'FirebaseRemoteConfig.getString()':
          response = await FirebaseRemoteConfig.getString('app_author');
          break;
        case 'FirebaseRemoteConfig.getBoolean()':
          response = await FirebaseRemoteConfig.getBoolean('app_boolean');
          break;
        case 'FirebaseRemoteConfig.getDouble()':
          response = await FirebaseRemoteConfig.getDouble('app_double');
          break;
        case 'FirebaseRemoteConfig.getLong()':
          response = await FirebaseRemoteConfig.getLong('app_long');
          break;
        case 'FirebaseRemoteConfig.getSource()':
          response = await FirebaseRemoteConfig.getSource('app_author');
          break;
        case 'FirebaseRemoteConfig.getKeysByPrefix()':
          response = await FirebaseRemoteConfig.getKeysByPrefix('app');
          break;
        case 'FirebaseRemoteConfig.setDefaults()':
          response = await FirebaseRemoteConfig.setDefaults();
          break;
        case 'FirebaseRemoteConfig.setDefaultsFromFile()':
          response = await FirebaseRemoteConfig.setDefaultsFromFile('config');
          break;
        case 'FirebaseRemoteConfig.setDeveloperModeEnabled()':
          response = await FirebaseRemoteConfig.setDeveloperModeEnabled(true);
          break;
        case 'FirebaseRemoteConfig.isDeveloperModeEnabled()':
          response = await FirebaseRemoteConfig.isDeveloperModeEnabled();
          break;
      }

      this.renderResponse(key, null, response);
    } catch (error) {
      this.renderResponse(key, error);
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {Renderer.label('Static Properties')}
        {Renderer.property('LAST_FETCH_STATUS_SUCCESS', FirebaseRemoteConfig.LAST_FETCH_STATUS_SUCCESS)}
        {Renderer.property('LAST_FETCH_STATUS_FAILURE', FirebaseRemoteConfig.LAST_FETCH_STATUS_FAILURE)}
        {Renderer.property('LAST_FETCH_STATUS_THROTTLED', FirebaseRemoteConfig.LAST_FETCH_STATUS_THROTTLED)}
        {Renderer.property('LAST_FETCH_STATUS_NO_FETCH_YET', FirebaseRemoteConfig.LAST_FETCH_STATUS_NO_FETCH_YET)}

        {Renderer.property('VALUE_SOURCE_DEFAULT', FirebaseRemoteConfig.VALUE_SOURCE_DEFAULT)}
        {Renderer.property('VALUE_SOURCE_REMOTE', FirebaseRemoteConfig.VALUE_SOURCE_REMOTE)}
        {Renderer.property('VALUE_SOURCE_STATIC', FirebaseRemoteConfig.VALUE_SOURCE_STATIC)}

        {Renderer.label('Static Methods')}
        {Renderer.method('FirebaseRemoteConfig.fetch()', this.onPress)}

        {Renderer.method('FirebaseRemoteConfig.getFetchTimeMillis()', this.onPress)}
        {Renderer.method('FirebaseRemoteConfig.getLastFetchStatus()', this.onPress)}

        {Renderer.method('FirebaseRemoteConfig.getString()', this.onPress)}
        {Renderer.method('FirebaseRemoteConfig.getBoolean()', this.onPress)}
        {Renderer.method('FirebaseRemoteConfig.getDouble()', this.onPress)}
        {Renderer.method('FirebaseRemoteConfig.getLong()', this.onPress)}
        {Renderer.method('FirebaseRemoteConfig.getSource()', this.onPress)}
        {Renderer.method('FirebaseRemoteConfig.getKeysByPrefix()', this.onPress)}

        {Renderer.method('FirebaseRemoteConfig.setDefaults()', this.onPress)}
        {Renderer.method('FirebaseRemoteConfig.setDefaultsFromFile()', this.onPress)}
        {Renderer.method('FirebaseRemoteConfig.setDeveloperModeEnabled()', this.onPress)}

        {Renderer.method('FirebaseRemoteConfig.isDeveloperModeEnabled()', this.onPress)}

      </ScrollView>
    );
  }
}
