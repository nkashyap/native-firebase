import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Firebase from '@native-firebase/core';
import Renderer from  '../renderer';
import ResponseView from './response';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    marginTop: 70,
  }
});

export default class CoreView extends Component {
  componentWillMount() {
    this.firebase = new Firebase();
  }

  renderResponse(label, error, data) {
    this.props.navigator.push({
      component: ResponseView,
      passProps: {label, error, data}
    });
  }

  onPress = async(key) => {
    try {
      let response = true;

      switch (key) {
        case 'Firebase.getApps()':
          response = await Firebase.getApps();
          break;
        case 'Firebase.getInstance()':
          response = await Firebase.getInstance();
          break;
        case 'Firebase.initializeApp()':
          response = await Firebase.initializeApp();
          break;
        case 'getName()':
          response = await this.firebase.getName();
          break;
        case 'getOptions()':
          response = await this.firebase.getOptions();
          break;
        // case 'deleteApp()':
        //   response = await this.firebase.deleteApp();
        //   break;
        case 'hashCode()':
          response = await this.firebase.hashCode();
          break;
        case 'setAutomaticResourceManagementEnabled()':
          await this.firebase.setAutomaticResourceManagementEnabled();
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
        {Renderer.property('DEFAULT_APP_NAME', Firebase.DEFAULT_APP_NAME)}

        {Renderer.label('Static Methods')}
        {Renderer.method('Firebase.getApps()', this.onPress)}
        {Renderer.method('Firebase.getInstance()', this.onPress)}
        {Renderer.method('Firebase.initializeApp()', this.onPress)}

        {Renderer.label('Methods')}
        {Renderer.method('getName()', this.onPress)}
        {Renderer.method('getOptions()', this.onPress)}

        {/*{Renderer.label('IOS Only')}*/}
        {/*{Renderer.method('deleteApp()', this.onPress)}*/}

        {Renderer.label('Android Only')}
        {Renderer.method('hashCode()', this.onPress)}
        {Renderer.method('setAutomaticResourceManagementEnabled()', this.onPress)}
      </ScrollView>
    );
  }
}
