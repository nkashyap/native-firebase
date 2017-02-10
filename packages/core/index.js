import { NativeModules } from 'react-native';

const FirebaseCore = NativeModules.FirebaseCore;

export default class Firebase {
  static get DEFAULT_APP_NAME() {
    return FirebaseCore.DEFAULT_APP_NAME;
  }

  async initializeApp(settings = {}, name = null) {
    return await FirebaseCore.initializeApp(settings, name);
  }

  setAutomaticResourceManagementEnabled(enabled = false) {
    FirebaseCore.setAutomaticResourceManagementEnabled(enabled);
  }
}
