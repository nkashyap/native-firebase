import {NativeModules} from 'react-native';
import FirebaseRemoteConfigSettings from './settings';

export default class FirebaseRemoteConfigInfo {
  constructor(info) {
    this.info = info;
  }

  getConfigSettings() {
    return new FirebaseRemoteConfigSettings(this.info.isDeveloperModeEnabled);
  }

  getFetchTimeMillis() {
    // In Android value comes back as String
    return Number(this.info.lastFetchTime);
  }

  getLastFetchStatus() {
    return this.info.lastFetchStatus;
  }

  toJSON() {
    return this.info;
  }

  toString() {
    return JSON.stringify(this.info);
  }
}
