import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import FirebaseRemoteConfig from '@native-firebase/config';
import Renderer from  '../renderer';
import ListView from './';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    marginTop: 65,
  }
});

export default class ConfigView extends Component {
  componentWillMount() {
    FirebaseRemoteConfig.setConfigSettings(true);
  }

  renderResponse(label, error, data) {
    const config = ListView.getRoute('response');
    const route = Object.assign({}, config, {passProps: {label, error, data}});

    this.props.navigator.push(route);
  }

  onPress = async(key) => {
    try {
      let value;
      let response = true;
      switch (key) {
        case 'Properties':
          response = {
            'DEFAULT_VALUE_FOR_BOOLEAN': FirebaseRemoteConfig.DEFAULT_VALUE_FOR_BOOLEAN,
            'DEFAULT_VALUE_FOR_DOUBLE': FirebaseRemoteConfig.DEFAULT_VALUE_FOR_DOUBLE,
            'DEFAULT_VALUE_FOR_LONG': FirebaseRemoteConfig.DEFAULT_VALUE_FOR_LONG,
            'DEFAULT_VALUE_FOR_STRING': FirebaseRemoteConfig.DEFAULT_VALUE_FOR_STRING,

            'LAST_FETCH_STATUS_SUCCESS': FirebaseRemoteConfig.LAST_FETCH_STATUS_SUCCESS,
            'LAST_FETCH_STATUS_FAILURE': FirebaseRemoteConfig.LAST_FETCH_STATUS_FAILURE,
            'LAST_FETCH_STATUS_THROTTLED': FirebaseRemoteConfig.LAST_FETCH_STATUS_THROTTLED,
            'LAST_FETCH_STATUS_NO_FETCH_YET': FirebaseRemoteConfig.LAST_FETCH_STATUS_NO_FETCH_YET,

            'VALUE_SOURCE_DEFAULT': FirebaseRemoteConfig.VALUE_SOURCE_DEFAULT,
            'VALUE_SOURCE_REMOTE': FirebaseRemoteConfig.VALUE_SOURCE_REMOTE,
            'VALUE_SOURCE_STATIC': FirebaseRemoteConfig.VALUE_SOURCE_STATIC,
          };
          break;
        case 'fetch()':
          response = await FirebaseRemoteConfig.fetch(0);
          break;
        case 'activateFetched()':
          response = await FirebaseRemoteConfig.activateFetched();
          break;
        case 'getBoolean()':
          response = await FirebaseRemoteConfig.getBoolean('app_boolean');
          break;
        case 'getByteArray()':
          response = await FirebaseRemoteConfig.getByteArray('app_byte');
          break;
        case 'getDouble()':
          response = await FirebaseRemoteConfig.getDouble('app_double');
          break;
        case 'getLong()':
          response = await FirebaseRemoteConfig.getLong('app_long');
          break;
        case 'getString()':
          response = await FirebaseRemoteConfig.getString('app_author');
          break;
        case 'getValue()':
          value = await FirebaseRemoteConfig.getValue('app_author');
          response = value.toJSON();
          break;
        case 'getKeysByPrefix()':
          response = await FirebaseRemoteConfig.getKeysByPrefix('app');
          break;
        case 'getInfo()':
          value = await FirebaseRemoteConfig.getInfo();
          response = value.toJSON();
          break;
        case 'setConfigSettings()':
          FirebaseRemoteConfig.setConfigSettings();
          value = await FirebaseRemoteConfig.getInfo();
          response = value.getConfigSettings().isDeveloperModeEnabled();
          break;
        case 'setDefaults()':
          FirebaseRemoteConfig.setDefaults({ 'app_author': 'quickstart' });
          response = await FirebaseRemoteConfig.getString('app_author');
          break;
        case 'setDefaultsFromFile()':
          FirebaseRemoteConfig.setDefaultsFromFile('config');
          response = await FirebaseRemoteConfig.getString('app_author');
          break;
        case 'getByKey()':
          value = await FirebaseRemoteConfig.getByKey('app_author');
          response = value.toJSON ? value.toJSON() : value;
          break;
        case 'getAllKeys()':
          response = await FirebaseRemoteConfig.getAllKeys(FirebaseRemoteConfig.VALUE_SOURCE_REMOTE);
          break;
        case 'getDefaultValue()':
          value = await FirebaseRemoteConfig.getDefaultValue('app_author');
          response = value.toJSON ? value.toJSON() : value;
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
        {Renderer.method('Properties', this.onPress)}

        {Renderer.label('Static Methods')}
        {Renderer.method('fetch()', this.onPress)}
        {Renderer.method('activateFetched()', this.onPress)}

        {Renderer.method('getBoolean()', this.onPress)}
        {Renderer.method('getByteArray()', this.onPress)}
        {Renderer.method('getDouble()', this.onPress)}
        {Renderer.method('getLong()', this.onPress)}
        {Renderer.method('getString()', this.onPress)}
        {Renderer.method('getValue()', this.onPress)}
        {Renderer.method('getKeysByPrefix()', this.onPress)}

        {Renderer.method('getInfo()', this.onPress)}

        {Renderer.method('setConfigSettings()', this.onPress)}

        {Renderer.method('setDefaults()', this.onPress)}
        {Renderer.method('setDefaultsFromFile()', this.onPress)}

        {Renderer.label('IOS Only')}
        {Renderer.method('getByKey()', this.onPress)}
        {Renderer.method('getAllKeys()', this.onPress)}
        {Renderer.method('getDefaultValue()', this.onPress)}
      </ScrollView>
    );
  }
}
