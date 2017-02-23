import {NativeModules} from 'react-native';

export default class FirebaseRemoteConfigSettings {
  constructor(enabled) {
    this.enabled = enabled;
  }

  isDeveloperModeEnabled() {
    return this.enabled;
  }
}
