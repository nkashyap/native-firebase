import {NativeModules} from 'react-native';
import FirebaseOptions from './options';
import {isIOS, isAndroid, notSupported} from './util';

const FirebaseCore = NativeModules.FirebaseCore;

export default class FirebaseApp {

  static get DEFAULT_APP_NAME() {
    return FirebaseCore.DEFAULT_APP_NAME;
  }

  static async getApps() {
    const apps = await FirebaseCore.getApps();

    return apps.map((name) => new FirebaseApp(name));
  }

  static async getInstance(name = null) {
    await FirebaseCore.getInstance(name);
    return new FirebaseApp(name);
  }

  static async initializeApp(options = new FirebaseOptions(), name = null) {
    await FirebaseCore.initializeApp(options.settings, name);
    return new FirebaseApp(name);
  }

  constructor(name = null) {
    this.name = name || FirebaseCore.DEFAULT_APP_NAME;
  }

  async getName() {
    return await FirebaseCore.getName(this.name);
  }

  async getOptions() {
    const options = await FirebaseCore.getOptions(this.name);

    return FirebaseOptions.Builder(options).build();
  }

  // Android Only
  setAutomaticResourceManagementEnabled(enabled = false) {
    if (isAndroid) {
      FirebaseCore.setAutomaticResourceManagementEnabled(enabled, this.name);
    }

    throw notSupported;
  }

  // IOS only
  // async deleteApp() {
  //   if (isIOS) {
  //     return await FirebaseCore.deleteApp(this.name);
  //   }
  //
  //   throw notSupported;
  // }
};
